const Listing = require("../models/listing");
const https = require("https");
const ExpressError = require("../utils/ExpressError");
const { sanitizeListing, sanitizeListingSummary } = require("../utils/serializers");

// Geocode location using Nominatim API (OpenStreetMap)
const geocodeLocation = (location) => {
  return new Promise((resolve) => {
    if (!location) return resolve([77.209, 28.6139]); 
    
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(location)}`;
    const options = { headers: { 'User-Agent': 'StayNest/1.0' } };
    
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result && result.length > 0) {
            resolve([parseFloat(result[0].lon), parseFloat(result[0].lat)]);
          } else {
            resolve([77.209, 28.6139]); 
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

// List all property listings
module.exports.index = async (req, res) => {
  try {
    const { category, q: searchQuery } = req.query;
    let filter = {};
    
    if (category?.trim()) filter.category = category;
    
    if (searchQuery?.trim()) {
      filter.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { location: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } }
      ];
    }
    
    const listings = await Listing.find(filter);
    res.json({ success: true, listings: listings.map(sanitizeListingSummary) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Show single property
module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) throw new ExpressError(404, "Listing not found.");
  res.json({ success: true, listing: sanitizeListing(listing) });
};

// Create property
module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  if (req.file) newListing.image = { url: req.file.path, filename: req.file.filename };
  
  const coordinates = await geocodeLocation(req.body.listing.location);
  newListing.geometry = { type: "Point", coordinates };
  
  await newListing.save();
  res.status(201).json({ success: true, message: "Listing created!", listing: sanitizeListingSummary(newListing) });
};

// Update property
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
  if (!listing) throw new ExpressError(404, "Listing not found.");

  if (req.file) listing.image = { url: req.file.path, filename: req.file.filename };
  await listing.save();
  res.json({ success: true, message: "Listing updated!", listing: sanitizeListingSummary(listing) });
};

// Delete property
module.exports.deleteListing = async (req, res) => {
  const deletedListing = await Listing.findByIdAndDelete(req.params.id);
  if (!deletedListing) throw new ExpressError(404, "Listing not found.");
  res.json({ success: true, message: "Listing deleted!" });
};
