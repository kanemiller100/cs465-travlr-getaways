/* GET Travel page */
const fs = require('fs');

const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

const travel = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    pageHeader: {
      title: 'Travlr Getaways',
      strapline: 'Find your next adventure'
    },
    trips: trips
  });
};

module.exports = { travel };
