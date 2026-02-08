const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// GET collection
router.get('/trips', ctrlTrips.tripsList);

// GETT single trip by code
router.get('/trips/:tripCode', ctrlTrips.tripsFindByCode);

module.exports = router;

