//empty array to store the Passenger'stravell history
const passengerTravelDetail = [];

//Passenger class to define the driver model
module.exports = class TravelHistory {
    constructor(passengerID) {
        this.passengerID = passengerID;
        this.travelDetail = [];
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

    static addRecentTravel(passengerID, driverName, driverPhoneNumber, carNumber, travelDate) {
        const passengerIndex = passengerTravelDetail.findIndex((passenger => passenger.passengerID == passengerID));
        if (passengerIndex != null) {
            passengerTravelDetail[passengerIndex].travelDetail
                .push({
                    driverName: driverName,
                    driverPhoneNumber: driverPhoneNumber,
                    carNumber: carNumber,
                    travelDate: travelDate
                });
        }
    }
}