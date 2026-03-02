const express = require('express');
const router = express.Router();
const ctrlTrips = require('../controllers/trips');
const ctrlAuth = require('../controllers/authentication');
const authenticateJWT = require('../middleware/auth');

// auth routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// public trip routes
router
  .route('/trips')
  .get(ctrlTrips.tripsList)
  .post(authenticateJWT, ctrlTrips.tripsAddTrip);

// single trip routes
router
  .route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindCode)
  .put(authenticateJWT, ctrlTrips.tripsUpdateTrip)
  .delete(authenticateJWT, ctrlTrips.tripsDeleteTrip);

module.exports = router;
