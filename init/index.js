const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

require("dotenv").config({ path: __dirname + "/../.env" });
const MONGO_URL = process.env.ATLAS_DB;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "677275e20f72a54f65b90d8b",
      geometry: obj.geometry || {
        type: "Point",
        coordinates: [77.209, 28.6139]
      }
    }));
    await Listing.insertMany(initData.data);
    console.log("✅ " + initData.data.length + " listings added successfully!");
  } catch (err) {
    console.log("Error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

initDB();