const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication')
const { auth } = require('../config/jwt');                 

// PUBLIC
// GET collection
router.get('/trips', ctrlTrips.tripsList);

// GET single trip by code
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

// PROTECTED 
// POST create new trip
router.post('/trips', auth, ctrlTrips.tripsAddTrip);

// PUT update trip by code
router.put('/trips/:tripCode', auth, ctrlTrips.tripsUpdateTrip);

// DELETE remove trip by code
router.delete('/trips/:tripCode', auth, ctrlTrips.tripsDeleteTrip);

//AUTH 
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;