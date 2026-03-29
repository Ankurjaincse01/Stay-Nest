const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../validations/schemas.js");

const parseNestedJson = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

// Validate listing data
module.exports.validateListing = (req, res, next) => {
  req.body.listing = parseNestedJson(req.body.listing);

  const { error } = listingSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }

  next();
};

// Validate review data
module.exports.validateReview = (req, res, next) => {
  req.body.review = parseNestedJson(req.body.review);

  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, errMsg);
  }

  next();
};
