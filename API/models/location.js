//array to store the drivers location
const driverLocation = [];

//location class to define the location model
module.exports = class DriverLocation {
    constructor(id, latitude, longitude) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    //method to push the location data in the array
    save() {
        driverLocation.push(this);
        return driverLocation.find(location => location.id == this.id);
    }

    //method to fetch/return all the location data
    static fetchAll() {
        return driverLocation;
    }

    static updateDriverLocation(id, lat, long) {
        const objIndex = driverLocation.findIndex((obj => obj.id == id));
        if (objIndex != null) {
            driverLocation[objIndex].latitude = lat;
            driverLocation[objIndex].longitude = long;
        }
    }
}