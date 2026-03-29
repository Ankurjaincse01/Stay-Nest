const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }

  const source = typeof user.toObject === "function" ? user.toObject() : user;

  if (
    typeof source !== "object" ||
    (!("email" in source) && !("username" in source) && !("name" in source))
  ) {
    return typeof user.toString === "function" ? user.toString() : user;
  }

  return {
    _id: source._id,
    username: source.username,
    email: source.email,
    name: source.name,
  };
};

const sanitizeReview = (review) => {
  if (!review) {
    return null;
  }

  const source = typeof review.toObject === "function" ? review.toObject() : review;

  return {
    _id: source._id,
    comment: source.comment,
    rating: source.rating,
    author: sanitizeUser(source.author),
  };
};

const sanitizeListingSummary = (listing) => {
  if (!listing) {
    return null;
  }

  const source = typeof listing.toObject === "function" ? listing.toObject() : listing;

  return {
    _id: source._id,
    title: source.title,
    description: source.description,
    image: source.image,
    price: source.price,
    location: source.location,
    country: source.country,
    owner: sanitizeUser(source.owner),
    geometry: source.geometry,
    category: source.category,
    ownerType: source.ownerType,
  };
};

const sanitizeListing = (listing) => {
  if (!listing) {
    return null;
  }

  const source = typeof listing.toObject === "function" ? listing.toObject() : listing;

  return {
    ...sanitizeListingSummary(source),
    reviews: Array.isArray(source.reviews) ? source.reviews.map(sanitizeReview) : [],
  };
};

module.exports = {
  sanitizeListing,
  sanitizeListingSummary,
  sanitizeReview,
  sanitizeUser,
};
