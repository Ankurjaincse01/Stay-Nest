const Listing = require("../models/listing.js");
const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'openstreetmap'
};
const geocoder = NodeGeocoder(options);

// Index - Show all listings
module.exports.index = async (req, res) => {
  const alllisting = await Listing.find({});
  res.render("listings/index.ejs", { alllisting });
};

// Render new listing form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show specific listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

// Create new listing
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id;
  newlisting.image = { url, filename };
  
  // Use geocoding to get coordinates from location
  try {
    const geoData = await geocoder.geocode(`${newlisting.location}, ${newlisting.country}`);
    if (geoData && geoData.length > 0) {
      newlisting.geometry = {
        type: "Point",
        coordinates: [geoData[0].longitude, geoData[0].latitude]
      };
    } else {
      // Fallback to default coordinates if geocoding fails
      newlisting.geometry = {
        type: "Point",
        coordinates: [77.2090, 28.6139] // Default: Delhi
      };
    }
  } catch (err) {
    console.log("Geocoding error:", err);
    // Use default coordinates on error
    newlisting.geometry = {
      type: "Point",
      coordinates: [77.2090, 28.6139]
    };
  }
  
  await newlisting.save();
  req.flash("success", "Listing created!");
  res.redirect("/listings");
};

// Render edit form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }
  
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  
  // Update coordinates if location or country changed
  if (req.body.listing.location || req.body.listing.country) {
    try {
      const geoData = await geocoder.geocode(`${req.body.listing.location || listing.location}, ${req.body.listing.country || listing.country}`);
      if (geoData && geoData.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [geoData[0].longitude, geoData[0].latitude]
        };
      }
    } catch (err) {
      console.log("Geocoding error:", err);
    }
  }
  
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  
  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete listing
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletelisting = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};