require('./db'); // connect + load schema

const Trip = require('./travlr');
const trips = require('../../data/trips.json');

async function seed() {
  try {
    await Trip.deleteMany({});
    const inserted = await Trip.insertMany(trips);

    const allTrips = await Trip.find({}).lean().exec();
    console.log(`Inserted ${inserted.length} trips.`);
    console.log(JSON.stringify(allTrips, null, 2));
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    const mongoose = require('mongoose');
    await mongoose.connection.close();
  }
}

seed();
