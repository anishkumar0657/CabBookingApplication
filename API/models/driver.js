//empty array to store the driver details
const driverDetail = [];

//driver class to define the driver model
module.exports = class Driver {
    constructor(id, name, email, phoneNumber, licenseNumber, carNumber, isAvailable) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.licenseNumber = licenseNumber;
        this.carNumber = carNumber;
        this.isAvailable = isAvailable;
    }

    //method to add the entry in the array
    save() {
        driverDetail.push(this);
        return driverDetail.find(driver => driver.id == this.id);
    }

    //static method to fetch / return all the driver details present in the array
    static fetchAll() {
        return driverDetail;
    }

    static changeStatus(id) {
        const objIndex = driverDetail.findIndex((obj => obj.id == id));
        console.log(objIndex);
        if (objIndex != null) {
            console.log(driverDetail[objIndex].isAvailable);
            driverDetail[objIndex].isAvailable = !driverDetail[objIndex].isAvailable;
        }
    }
}