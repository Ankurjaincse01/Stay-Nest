const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError");
const { sanitizeReview } = require("../utils/serializers");

// Create new review for a property listing
module.exports.createReview = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }

  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  await newReview.populate("author");

  res.status(201).json({
    success: true,
    message: "Review created!",
    review: sanitizeReview(newReview),
  });
};

// Delete existing review from a property listing
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  const review = await Review.findByIdAndDelete(reviewId);

  if (!listing || !review) {
    throw new ExpressError(404, "Review not found.");
  }

  res.json({ success: true, message: "Review deleted successfully." });
};
