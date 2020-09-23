var express = require('express');
var router = express.Router();
const passengerController = require('../controllers/passenger');
const { body } = require('express-validator');

//route to get the available cabs
router.post('/available_cabs', [
    body('latitude').trim().notEmpty(),
    body('latitude').trim().isNumeric(),
    body('latitude').isLength({ min: 1 }),
    body('longitude').trim().notEmpty(),
    body('longitude').trim().isNumeric(),
    body('longitude').isLength({ min: 1 }),
],
    passengerController.getNearByCabs);

//route for registring the passenger
router.post('/register', [
    body('email').trim().notEmpty(),
    body('email').trim().isEmail(),
    body('phoneNumber').trim().notEmpty(),
    body('phoneNumber').trim().isNumeric(),
    body('phoneNumber').trim().isLength(10),
    body('name').trim().notEmpty(),
    body('name').trim().isString()
],
    passengerController.registerPassenger);


//route for getting the passengers travell history
router.get('/getRideHistory/:id', passengerController.getRiderHistory);

//route to add recent travel history
router.post('/addCurrentTravelDetail/:id', passengerController.addRecentTravell);

//route for passenger login
router.post('/signin', passengerController.passengerSignin);

module.exports = router; 