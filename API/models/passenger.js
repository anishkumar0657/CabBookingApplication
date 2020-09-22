//empty array to store the Passenger details
const passengerDetail = [];

//Passenger class to define the driver model
module.exports = class Passenger {
    constructor(id, name, email, phoneNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }

    //method to add the entry in the array
    save() {
        passengerDetail.push(this);
        return passengerDetail.find(passenger => passenger.id == this.id);
    }

    //static method to fetch / return all the Passenger details present in the array
    static fetchAll() {
        return passengerDetail;
    }
}