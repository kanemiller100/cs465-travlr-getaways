const express = require('express');
const router = express.Router();

const ctrlTraveler = require('../controllers/traveler');

router.get('/', ctrlTraveler.travel);

module.exports = router;
