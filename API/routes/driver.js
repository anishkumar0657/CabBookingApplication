var express = require('express');
var router = express.Router();
const { body } = require('express-validator');

const driverController = require('../controllers/driver');

//route for registring the drivers location
router.post('/:id/updateLocation', [
    body('latitude').trim().notEmpty(),
    body('latitude').trim().isNumeric(),
    body('longitude').trim().notEmpty(),
    body('longitude').trim().isNumeric(),
],
    driverController.shareDriverLocation);

//route to switch drivers availability
router.put('/switchAvailability', driverController.shareDriverLocation);

//router for registring the driver
router.post('/register', [
    body('email').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('phoneNumber').trim().notEmpty(),
    body('phoneNumber').trim().isNumeric(),
    body('phoneNumber').trim().isLength(10),
    body('name').trim().notEmpty(),
    body('name').trim().isString(),
    body('licenseNumber').trim().notEmpty(),
    body('licenseNumber').trim().isString(),
    body('carNumber').trim().notEmpty(),
    body('carNumber').trim().isString()
],
    driverController.registerDriver);

module.exports = router;