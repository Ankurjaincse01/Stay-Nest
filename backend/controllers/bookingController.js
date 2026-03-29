const Booking = require("../models/booking");
const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// Create new booking for a property listing
module.exports.createBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, guests } = req.body;
  
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found.");
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

  if (nights <= 0) {
    throw new ExpressError(400, "Check-out date must be after check-in date.");
  }

  const subtotal = listing.price * nights;
  const serviceFee = subtotal * 0.1;
  const totalPrice = subtotal + serviceFee;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn: checkInDate,
    checkOut: checkOutDate,
    guests: guests,
    totalPrice: totalPrice,
  });

  await booking.save();
  res.status(201).json({
    success: true,
    message: "Booking confirmed successfully.",
    booking,
  });
};

// Get all bookings for current user
module.exports.showMyBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate("listing", "title location image price country")
    .sort({ createdAt: -1 });

  res.json({ success: true, bookings });
};

// Cancel an existing booking
module.exports.cancelBooking = async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { status: "cancelled" },
    { new: true }
  );

  if (!booking) {
    throw new ExpressError(404, "Booking not found.");
  }

  res.json({ success: true, message: "Booking cancelled successfully.", booking });
};
