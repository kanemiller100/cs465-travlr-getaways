/* GET Travel page */
const travel = (req, res) => {
  res.render('travel', {
    title: 'Travlr Getaways',
    pageHeader: {
      title: 'Travlr Getaways',
      strapline: 'Find your next adventure'
    },
    trips: [
      { name: 'Bali Escape', description: 'Beaches, temples, and food—7 days in Bali.', duration: '7 days', price: '$1,499' },
      { name: 'Iceland Northern Lights', description: 'Winter tour chasing auroras and hot springs.', duration: '5 days', price: '$1,899' },
      { name: 'Sedona Weekend', description: 'Hikes, red rocks, and relaxing views.', duration: '3 days', price: '$799' }
    ]
  });
};

module.exports = { travel };
