//empty array to store the Passenger'stravell history
const passengerTravelDetail = [];

//Passenger class to define the driver model
module.exports = class TravelHistory {
    constructor(customerID, driverID, travelDate) {
        this.customerID = customerID;
        this.driverID = driverID;
        this.travelDate = travelDate;
    }

    //method to add the entry in the array
    save() {
        passengerTravelDetail.push(this);
        return passengerTravelDetail.find(passenger => passenger.id == this.id);
    }

    //static method to fetch / return all the Passenger details present in the array
    static fetchAll() {
        return passengerTravelDetail;
    }
}