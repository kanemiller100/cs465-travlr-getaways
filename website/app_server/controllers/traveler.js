/* GET Travel page (MVC) - now consumes the REST API */
const axios = require("axios");

const apiOptions = {
  server: process.env.API_SERVER || "http://localhost:3000"
};

const renderTravel = (req, res, trips) => {
  res.render("travel", {
    title: "Travlr Getaways",
    pageHeader: {
      title: "Travlr Getaways",
      strapline: "Find your next adventure"
    },
    trips: trips
  });
};

const travel = async (req, res) => {
  try {
    const response = await axios.get(`${apiOptions.server}/api/trips`);
    return renderTravel(req, res, response.data);
  } catch (err) {
    // MVC should not crash if the API is down
    console.error("API error:", err.message);
    return renderTravel(req, res, []);
  }
};

module.exports = { travel };
