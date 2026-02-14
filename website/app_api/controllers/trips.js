const mongoose = require("mongoose");

// model name from website/app_api/models/travlr.js
const Trip = mongoose.model("trips");

// GET /api/trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).lean().exec(); // FIND (rubric)
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({
      message: "Server error retrieving trips",
      error: err.message
    });
  }
};

// GET /api/trips/:code
const tripsFindByCode = async (req, res) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({ message: "code parameter is required" });
  }

  try {
    const trip = await Trip.findOne({ code }).lean().exec();

    if (!trip) {
      return res.status(404).json({ message: `Trip not found: ${code}` });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({
      message: "Server error retrieving trip",
      error: err.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
