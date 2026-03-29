const ExpressError = require("../utils/ExpressError.js");

// Handle 404 errors
module.exports.notFoundHandler = (req, res, next) => {
  next(new ExpressError(404, "Route not found."));
};

// Handle all errors
module.exports.errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    err = new ExpressError(404, "Resource not found.");
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong.";

  res.status(statusCode).json({ success: false, message });
};
