const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// GEt collection
router.get('/trips', ctrlTrips.tripsList);

// GEt single trip by code
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

// POST create new trip
router.post('/trips', ctrlTrips.tripsAddTrip);

// PUT update trip by code
router.put('/trips/:tripCode', ctrlTrips.tripsUpdateTrip);

// DELETE remove trip by code
router.delete('/trips/:tripCode', ctrlTrips.tripsDeleteTrip);

module.exports = router;
