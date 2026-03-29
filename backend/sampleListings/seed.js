/*
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data: sampleListings } = require("./index");
require("dotenv").config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.ATLAS_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    await Listing.deleteMany({});
    await Listing.insertMany(sampleListings);
    console.log("Sample listings inserted!");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    mongoose.connection.close();
  }
}

seedDB();

*/