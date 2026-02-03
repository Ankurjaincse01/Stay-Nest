const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn } = require("../middleware");
const bookingController = require("../controllers/booking");

// Create booking
router.post("/listings/:id/book", isLoggedIn, wrapAsync(bookingController.createBooking));

// Show user's bookings
router.get("/my-bookings", isLoggedIn, wrapAsync(bookingController.showMyBookings));

// Cancel booking
router.post("/:id/cancel", isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
