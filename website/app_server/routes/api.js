const express = require('express');
const router = express.Router();
const Trip = require('../models/travlr');

// GET /api/trips  -> return trips as JSON from MongoDB
router.get('/trips', async (req, res) => {
  try {
    const trips = await Trip.find({}).lean().exec();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trips', error: String(err) });
  }
});

module.exports = router;
