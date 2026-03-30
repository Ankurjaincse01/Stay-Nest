import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/bookings/my-bookings")
      .then(res => { if (res.data.success) setBookings(res.data.bookings); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      const res = await axios.delete(`/bookings/${bookingId}`);
      if (res.data.success) {
        setBookings(prev => prev.map(b =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b
        ));
      }
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border text-dark"></div></div>;

  return (
    <div className="py-4">
      <h2 className="fw-bold mb-5" style={{ fontSize: "1.8rem", color: "#222" }}>My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="row g-4">
          {bookings.map(book => (
            <div className="col-md-6 col-lg-4" key={book._id}>
              <div className="card border-0 shadow-sm h-100" style={{ borderRadius: "1rem", overflow: "hidden" }}>

                {/* Property Image + Status Badge */}
                <div className="position-relative">
                  <img
                    src={book.listing?.image?.url || "https://via.placeholder.com/600x350?text=No+Image"}
                    alt={book.listing?.title}
                    style={{ width: "100%", height: "200px", objectFit: "cover" }}
                  />
                  <span
                    className="position-absolute top-0 end-0 m-3 px-3 py-1 fw-semibold"
                    style={{
                      borderRadius: "1rem",
                      fontSize: "0.8rem",
                      backgroundColor: book.status === "confirmed" ? "#00a699" : book.status === "cancelled" ? "#e74c3c" : "#f39c12",
                      color: "#fff"
                    }}
                  >
                    {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
                  </span>
                </div>

                <div className="card-body p-4">
                  {/* Title & Location */}
                  <h5 className="fw-bold mb-1" style={{ fontSize: "1rem", color: "#222" }}>{book.listing?.title}</h5>
                  <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>
                    <i className="fa-solid fa-location-dot me-1" style={{ fontSize: "0.75rem" }}></i>
                    {book.listing?.location}, {book.listing?.country}
                  </p>

                  {/* Check-in / Check-out Box */}
                  <div className="p-3 mb-3" style={{ backgroundColor: "#f7f7f7", borderRadius: "0.6rem" }}>
                    <div style={{ fontSize: "0.875rem", color: "#333" }}>
                      <span className="fw-semibold">Check-in:</span> {formatDate(book.checkIn)}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#333", marginTop: "0.3rem" }}>
                      <span className="fw-semibold">Check-out:</span> {formatDate(book.checkOut)}
                    </div>
                  </div>

                  {/* Guests + Total Price */}
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <span className="text-dark" style={{ fontSize: "0.875rem" }}>
                      <i className="fa-solid fa-user-group me-2 text-muted"></i>{book.guests || 1} guest{book.guests > 1 ? "s" : ""}
                    </span>
                    <span className="fw-bold text-dark" style={{ fontSize: "1rem" }}>
                      &#8377;{Math.round(book.totalPrice).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex gap-2">
                    <Link
                      to={`/listings/${book.listing?._id}`}
                      className="btn flex-grow-1 fw-medium"
                      style={{ borderRadius: "0.5rem", border: "1px solid #ddd", color: "#333", fontSize: "0.875rem", backgroundColor: "#fff" }}
                    >
                      View Listing
                    </Link>
                    {book.status === "confirmed" && (
                      <button
                        onClick={() => handleCancel(book._id)}
                        className="btn flex-grow-1 fw-medium"
                        style={{ borderRadius: "0.5rem", border: "1px solid #e74c3c", color: "#e74c3c", fontSize: "0.875rem", backgroundColor: "#fff" }}
                      >
                        Cancel Booking
                      </button>
                    )}
                    {book.status === "cancelled" && (
                      <span className="flex-grow-1 text-center text-muted d-flex align-items-center justify-content-center" style={{ fontSize: "0.85rem" }}>Cancelled</span>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <i className="fa-regular fa-calendar-xmark text-muted mb-3" style={{ fontSize: "3rem" }}></i>
          <p className="text-muted mt-3" style={{ fontSize: "1rem" }}>You haven't made any bookings yet.</p>
          <Link to="/listings" className="btn btn-dark mt-2 px-4 py-2 rounded-3 fw-semibold">Explore Listings</Link>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
