const express = require('express');

// to vaildate the req body content
const { validationResult } = require('express-validator');
const { changeStatus } = require('../models/driver');

//import driver and location models
const driverModel = require('../models/driver');
const driverLocation = require('../models/location');

//function to register the driver
exports.registerDriver = ((req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            "status": "failure",
            "reason": "failed to add driver, invalid entry"
        });
    }
    else {

        //extract all the driver details from the request body
        const driverName = req.body.name;
        const driverEmail = req.body.email;
        const phoneNumber = req.body.phoneNumber;
        const licenseNumber = req.body.licenseNumber;
        const carNumber = req.body.carNumber;

        //check if any driver with same email/phoneNumber/carNumber/licenseNumber is already registered or not.
        const found = isDriverAlreadyPresent(driverEmail, phoneNumber, licenseNumber, carNumber);

        //if unique driver then go ahead and register him/her
        if (!found) {
            const newDriver = new driverModel(new Date().valueOf(), driverName, driverEmail, phoneNumber, licenseNumber, carNumber, true);
            const result = newDriver.save();

            res.status(201);
            res.send(result);
        }

        //if duplicate entry is found, return 400 status code with failure message
        else {
            return res.status(400).json({
                "status": "failure",
                "reason": "driver already registered"
            });
        }
    }
});

//function to store the drivers location
exports.shareDriverLocation = ((req, res, next) => {

    //validity check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            "status": "failure",
            "reason": "empty lat or lon value"
        });
    }
    else {
        //extract all the details from the request body
        const id = parseInt(req.params.id);
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;

        const dLocations = driverLocation.fetchAll();
        if (dLocations.findIndex((obj => obj.id == id)) >= 0) {
            driverLocation.updateDriverLocation(id, latitude, longitude);
        }
        else {
            //add the driver location in the array
            const newLocation = new driverLocation(id, latitude, longitude);
            newLocation.save();
        }

        //send the response
        res.status(202);
        res.send(JSON.stringify({ "status": "successfully updated drivers location" }));
    }
});

//function to get all the available drivers
exports.getAllDrivers = ((req, res, next) => {
    //send the response
    res.status(200);
    res.send(driverModel.fetchAll());
});

//function to switch the driver's availability
exports.switchAvailability = ((req, res, next) => {
    const id = parseInt(req.params.id);
    driverModel.changeStatus(id);

    //send the response
    res.status(200);
    res.send(driverModel.fetchAll());
});

function isDriverAlreadyPresent(driverEmail, phoneNumber, licenseNumber, carNumber) {
    const existingDrivers = driverModel.fetchAll();
    const found = existingDrivers
        .some(
            driver => driver.email == driverEmail ||
                driver.phoneNumber == phoneNumber ||
                driver.carNumber == carNumber ||
                driver.licenseNumber == licenseNumber
        );
    return found;
}
