/*
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const { data: sampleListings } = require("./index");
require("dotenv").config();

async function seedDB() {
  try {
    // Port 4000 conflict solve karne ke baad DB connection check
    await mongoose.connect(process.env.ATLAS_DB);
    console.log("✅ Connected to MongoDB for Full Seeding");

    await Listing.deleteMany({});
    
    // Har listing mein ek owner ID hona chahiye (Agar aapne login kar liya hai, toh apna manual ID bhi daal sakte ho)
    const updatedData = sampleListings.map((obj) => ({
        ...obj,
    }));

    await Listing.insertMany(updatedData);
    console.log(`🚀 Success! ${updatedData.length} Sample listings inserted!`);
    
    process.exit();
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seedDB();
*/