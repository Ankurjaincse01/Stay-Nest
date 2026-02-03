const Listing = require("../models/listing.js");
const NodeGeocoder = require("node-geocoder");

const geocoder = NodeGeocoder({ provider: "openstreetmap" });
const DEFAULT_COORDS = [77.209, 28.6139]; // Delhi

// Index - all listings
module.exports.index = async (req, res) => {
  const { category } = req.query;
  let filter = {};
  
  if (category) {
    filter.category = category;
  }
  
  const alllisting = await Listing.find(filter);
  res.render("listings/index.ejs", { alllisting });
};

// Render new form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show single listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create listing
module.exports.createListing = async (req, res, next) => {
  const { path: url, filename } = req.file;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };

  try {
    const geoData = await geocoder.geocode(`${newlisting.location}, ${newlisting.country}`);
    if (geoData && geoData.length > 0) {
      newlisting.geometry = {
        type: "Point",
        coordinates: [geoData[0].longitude, geoData[0].latitude],
      };
    } else {
      newlisting.geometry = { type: "Point", coordinates: DEFAULT_COORDS };
    }
  } catch (err) {
    newlisting.geometry = { type: "Point", coordinates: DEFAULT_COORDS };
  }

  await newlisting.save();
  req.flash("success", "Listing created!");
  res.redirect("/listings");
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  const originalImageUrl = listing.image.url.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

  if (req.body.listing.location || req.body.listing.country) {
    try {
      const newLocation = req.body.listing.location || listing.location;
      const newCountry = req.body.listing.country || listing.country;
      const geoData = await geocoder.geocode(`${newLocation}, ${newCountry}`);

      if (geoData && geoData.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [geoData[0].longitude, geoData[0].latitude],
        };
        await listing.save();
      }
    } catch (err) {
      console.log("Geocoding error:", err);
    }
  }

  if (req.file) {
    const { path: url, filename } = req.file;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};