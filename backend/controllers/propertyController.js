const Listing = require("../models/listing");
const https = require("https");
const ExpressError = require("../utils/ExpressError");
const { sanitizeListing, sanitizeListingSummary } = require("../utils/serializers");

// Help map location name to coordinates using free Nominatim API (OpenStreetMap)
const geocodeLocation = (location) => {
  return new Promise((resolve, reject) => {
    if (!location) return resolve([77.209, 28.6139]); // Default to New Delhi
    
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`;
    const options = {
      headers: { 'User-Agent': 'StayNest/1.0' }
    };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result && result.length > 0) {
            // Nominatim returns [lat, lon], we need [lon, lat] for GeoJSON
            resolve([parseFloat(result[0].lon), parseFloat(result[0].lat)]);
          } else {
            resolve([77.209, 28.6139]); // Fallback
          }
        } catch (e) {
          resolve([77.209, 28.6139]);
        }
      });
    }).on('error', () => {
      resolve([77.209, 28.6139]);
    });
  });
};

// List all property listings with category filter and search
module.exports.index = async (req, res) => {
  const category = req.query.category;
  const searchQuery = req.query.q;
  let filter = {};
  
  // Apply category filter if provided
  if (category && category.trim() !== "") {
    filter.category = category;
  }
  
  // Apply search filter if provided
  if (searchQuery && searchQuery.trim() !== "") {
    filter.$or = [
      { title: { $regex: searchQuery, $options: "i" } },
      { location: { $regex: searchQuery, $options: "i" } },
      { description: { $regex: searchQuery, $options: "i" } }
    ];
  }
  
  const alllisting = await Listing.find(filter);
  res.json({ success: true, listings: alllisting.map(sanitizeListingSummary) });
};

// Show single property details
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }

  res.json({ success: true, listing: sanitizeListing(listing) });
};

// Create new property listing
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) newListing.image = { url: req.file.path, filename: req.file.filename };
  
  // Geocode location
  const coordinates = await geocodeLocation(req.body.listing.location);
  newListing.geometry = { type: "Point", coordinates: coordinates };
  
  await newListing.save();
  res.status(201).json({
    success: true,
    message: "Listing created successfully.",
    listing: sanitizeListingSummary(newListing),
  });
};

// Update property listing
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const oldListing = await Listing.findById(id);

  if (!oldListing) {
    throw new ExpressError(404, "Listing not found.");
  }

  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
  
  // Update geometry if location changed
  if (req.body.listing.location && req.body.listing.location !== oldListing.location) {
    const coordinates = await geocodeLocation(req.body.listing.location);
    listing.geometry = { type: "Point", coordinates: coordinates };
  }
  
  if (req.file) listing.image = { url: req.file.path, filename: req.file.filename };
  await listing.save();
  res.json({
    success: true,
    message: "Listing updated successfully.",
    listing: sanitizeListingSummary(listing),
  });
};

// Delete property listing
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    throw new ExpressError(404, "Listing not found.");
  }

  res.json({ success: true, message: "Listing deleted successfully." });
};
