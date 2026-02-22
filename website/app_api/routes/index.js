const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');

// trips collection routes
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(ctrlTrips.tripsAddTrip);

// single trip by code routes
router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindCode)
  .put(ctrlTrips.tripsUpdateTrip)
  .delete(ctrlTrips.tripsDeleteTrip);

module.exports = router;
