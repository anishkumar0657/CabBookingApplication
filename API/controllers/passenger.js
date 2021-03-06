const express = require('express');
const { validationResult } = require('express-validator');

//import the location and driver model
const locationModel = require('../models/location');
const driverModel = require('../models/driver');
const passengerModel = require('../models/passenger');
const passengerTravelModel = require('../models/passengertravelhistory');


//function to register the passenger/rider
exports.registerPassenger = ((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "status": "failure",
            "reason": "failed to add passenger/rider, invalid entry"
        });
    }
    else {

        //extract all the passenger details from the request body
        const passengerName = req.body.name;
        const passengerEmail = req.body.email;
        const phoneNumber = req.body.phoneNumber;

        //check if any passenger with same email/phoneNumber is already registered or not.
        const found = isPassengerAlreadyRegistered(passengerEmail, phoneNumber);

        //if unique passenger then go ahead and register him/her
        if (!found) {
            const newPassenger = new passengerModel(new Date().valueOf(), passengerName, passengerEmail, phoneNumber);
            const result = newPassenger.save();

            //adding passenger entry in the travell model
            const trvelDetail = new passengerTravelModel(result.id);
            trvelDetail.save();

            res.status(201);
            res.send(result);
        }

        //if duplicate entry is found, return 400 status code with failure message
        else {
            return res.status(400).json({
                "status": "failure",
                "reason": "passenger already registered"
            });
        }
    }
});

//function to get all the nearby cabs present within 4km distance
exports.getNearByCabs = ((req, res, next) => {

    //validity check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            "status": "failure",
            "reason": "empty lattitude or longitude value"
        });
    }

    else {
        //extract all the data from request body
        const passengerLatitude = req.body.latitude;
        const passengerLongitude = req.body.longitude;

        //get location of already registered drivers
        const driversLocations = locationModel.fetchAll();

        //get all registered drivers
        const drivers = driverModel.fetchAll().filter(driver => driver.isAvailable === true);

        //filter all the driver/cab present in the distance of 4km.
        //this is done using simple distance calcuation method sqrt((x1-x2)^2 + (y1-y2)^2)
        const nearByDrivers = driversLocations.filter(driver => {
            var lat2 = driver.latitude;
            var long2 = driver.longitude;

            var lat1 = passengerLatitude;
            var long1 = passengerLongitude;

            var d = Math.sqrt(Math.pow((lat1 - lat2), 2) + Math.pow((long1 - long2), 2))

            if (d <= 4) {
                return driver;
            }
        });

        //merge if both the arrays have values
        if (typeof nearByDrivers !== 'undefined' && nearByDrivers.length > 0 && typeof drivers !== 'undefined' && drivers.length > 0) {
            const mergedList = mergeArrayObjects(nearByDrivers, drivers)
                .map(driver => ({
                    name: driver.name,
                    carNumber: driver.carNumber,
                    phoneNumber: driver.phoneNumber
                }));

            res.status(200);
            res.send(mergedList);
        }

        else {
            //result if no cab is found
            res.send({ "message": "No cabs available!" });
        }
    }
});


//function to get all the nearby cabs present within 4km distance
exports.getRiderHistory = ((req, res, next) => {

    //extract all the data from request body
    const passengerID = parseInt(req.params.id);
    console.log(passengerID);
    const travelDetail = passengerTravelModel.fetchAll().find(passenger => passenger.passengerID == passengerID);

    if (travelDetail) {
        res.status(200);
        res.send(travelDetail.travelDetail);
    }
    else {
        //result if no cab is found
        res.send({ "message": "No Travel History Found!" });
    }
});

//function to get all the nearby cabs present within 4km distance
exports.addRecentTravell = ((req, res, next) => {

    const passengerID = req.params.id;
    const driverName = req.body.name;
    const driverPhoneNumber = req.body.phoneNumber;
    const carNumber = req.body.carNumber;
    const travelDate = Date.now();
    console.log(travelDate);

    passengerTravelModel.addRecentTravel(passengerID, driverName, driverPhoneNumber, carNumber, travelDate);

    res.send({ "message": "added travel history" });
});

//function to get all the nearby cabs present within 4km distance
exports.passengerSignin = ((req, res, next) => {

    const passengerEmail = req.body.email;

    const user = passengerModel.fetchAll().find(passenger => passenger.email == passengerEmail);
    console.log(user);
    res.status(200);
    res.send(user);
});

//funstion to merge two array using a common key
function mergeArrayObjects(arr1, arr2) {
    return arr1.map(x => Object.assign(x, arr2.find(y => y.id == x.id)));
}

function isPassengerAlreadyRegistered(driverEmail, phoneNumber) {
    const existingPassengers = passengerModel.fetchAll();
    const found = existingPassengers
        .some(
            passenger => passenger.email == driverEmail ||
                passenger.phoneNumber == phoneNumber
        );
    return found;
}