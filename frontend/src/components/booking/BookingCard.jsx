import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const BookingCard = ({ listing, listingId, currentUser }) => {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [bookingMsg, setBookingMsg] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Compute next day from checkIn for checkout min date
  const minCheckOut = checkIn
    ? (() => {
        const d = new Date(checkIn);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split("T")[0];
      })()
    : new Date().toISOString().split("T")[0];

  // Live price breakdown
  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
      : 0;
  const subtotal = nights * (listing.price || 0);
  const serviceFee = Math.round(subtotal * 0.1);
  const total = subtotal + serviceFee;

  const handleBooking = async () => {
    if (!currentUser) return navigate("/login");
    if (!checkIn) return setBookingMsg({ type: "error", text: "Please select a check-in date." });
    if (!checkOut) return setBookingMsg({ type: "error", text: "Please select a check-out date." });

    try {
      const res = await axios.post(`/bookings/listings/${listingId}/book`, {
        checkIn,
        checkOut,
        guests: parseInt(guests) || 1,
      });
      if (res.data.success) {
        setBookingMsg({
          type: "success",
          text: `🎉 Booking confirmed! Total: ₹${Math.round(res.data.booking.totalPrice).toLocaleString("en-IN")}`,
        });
        setBookingSuccess(true);
        setCheckIn("");
        setCheckOut("");
      }
    } catch (err) {
      setBookingMsg({
        type: "error",
        text: err.response?.data?.message || "Booking failed. Please try again.",
      });
    }
  };

  return (
    <div className="card shadow-sm p-4 mt-5 mb-5" style={{ borderColor: "#dfdfdf", borderRadius: "0.8rem" }}>
      {/* Price Per Night */}
      <div className="fw-semibold fs-4 text-dark mb-4">
        &#8377;{listing.price?.toLocaleString("en-IN")}{" "}
        <span className="fs-6 fw-normal text-muted">/ night</span>
      </div>

      {/* Date + Guests + Reserve Row */}
      <div className="d-flex flex-column flex-md-row gap-3 align-items-md-center">
        {/* Check-in / Checkout */}
        <div
          className="d-flex flex-row border rounded-3 overflow-hidden flex-grow-1"
          style={{ borderColor: "#c0c0c0" }}
        >
          {/* Check-in */}
          <div
            className="px-3 py-2 w-50 border-end d-flex flex-column"
            style={{ borderColor: "#c0c0c0" }}
          >
            <div style={{ fontSize: "0.60rem", fontWeight: "700", letterSpacing: "1px", color: "#444" }}>
              CHECK-IN
            </div>
            <input
              id="checkInInput"
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              max={checkOut || ""}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (checkOut && e.target.value >= checkOut) setCheckOut("");
              }}
              className="border-0 p-0 text-dark bg-transparent flex-grow-1"
              style={{ outline: "none", fontSize: "0.9rem", colorScheme: "light", minWidth: 0 }}
            />
          </div>

          {/* Checkout */}
          <div className="px-3 py-2 w-50 d-flex flex-column">
            <div style={{ fontSize: "0.60rem", fontWeight: "700", letterSpacing: "1px", color: "#444" }}>
              CHECKOUT
            </div>
            <input
              id="checkOutInput"
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="border-0 p-0 text-dark bg-transparent flex-grow-1"
              style={{ outline: "none", fontSize: "0.9rem", colorScheme: "light", minWidth: 0 }}
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div
          className="border rounded-3 px-3 py-2 flex-grow-1 position-relative"
          style={{ borderColor: "#c0c0c0" }}
        >
          <div style={{ fontSize: "0.60rem", fontWeight: "700", letterSpacing: "1px", color: "#444" }}>
            GUESTS
          </div>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border-0 w-100 p-0 text-dark bg-transparent"
            style={{ outline: "none", fontSize: "0.95rem", appearance: "none", cursor: "pointer" }}
          >
            <option value="1">1 guest</option>
            <option value="2">2 guests</option>
            <option value="3">3 guests</option>
            <option value="4">4+ guests</option>
          </select>
          <i
            className="fa-solid fa-chevron-down position-absolute text-dark"
            style={{ right: "15px", top: "50%", transform: "translateY(-50%)", fontSize: "0.8rem", pointerEvents: "none" }}
          ></i>
        </div>

        {/* Reserve Button */}
        <button
          className="btn btn-dark fw-semibold rounded-3 px-4 py-3"
          style={{ minWidth: "130px" }}
          onClick={handleBooking}
        >
          {currentUser ? "Reserve" : "Login to Book"}
        </button>
      </div>

      {/* Live Price Breakdown */}
      {nights > 0 && !bookingSuccess && (
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #eee" }}>
          <div className="d-flex justify-content-between mb-2" style={{ fontSize: "0.95rem" }}>
            <span className="text-dark">
              &#8377;{listing.price?.toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}
            </span>
            <span className="text-dark">&#8377;{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="d-flex justify-content-between mb-3" style={{ fontSize: "0.95rem" }}>
            <span className="text-dark">Service fee (10%)</span>
            <span className="text-dark">&#8377;{serviceFee.toLocaleString("en-IN")}</span>
          </div>
          <div
            className="d-flex justify-content-between fw-semibold"
            style={{ fontSize: "1rem", borderTop: "1px solid #eee", paddingTop: "0.75rem" }}
          >
            <span>Total</span>
            <span>&#8377;{total.toLocaleString("en-IN")}</span>
          </div>
        </div>
      )}

      {/* Booking Message */}
      {bookingMsg && (
        <div
          className={`mt-3 px-3 py-2 rounded-3 ${
            bookingMsg.type === "success"
              ? "text-success bg-success bg-opacity-10"
              : "text-danger bg-danger bg-opacity-10"
          }`}
          style={{ fontSize: "0.9rem" }}
        >
          {bookingMsg.text}
        </div>
      )}
    </div>
  );
};

export default BookingCard;
