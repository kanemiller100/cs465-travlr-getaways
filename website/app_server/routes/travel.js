const express = require("express");
const router = express.Router();

const ctrlTraveler = require("../controllers/traveler");

// MVC travel page
router.get("/travel", ctrlTraveler.travel);

module.exports = router;
