const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const Review = require("../models/review");
const wrapAsync = require("../utils/wrapAsync");

// Check if user is property owner
module.exports.isOwner = wrapAsync(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }

  if (!listing.owner.equals(req.user._id)) {
    throw new ExpressError(403, "You don't have permission to manage this listing.");
  }

  next();
});

// Check if user is review author
module.exports.isReviewAuthor = wrapAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    throw new ExpressError(404, "Review not found.");
  }

  if (!review.author.equals(req.user._id)) {
    throw new ExpressError(403, "You don't have permission to manage this review.");
  }

  next();
});
