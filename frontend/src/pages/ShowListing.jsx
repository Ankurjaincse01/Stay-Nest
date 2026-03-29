import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

import BookingCard from "../components/booking/BookingCard";
import ReviewForm from "../components/review/ReviewForm";
import ReviewsList from "../components/review/ReviewsList";
import ListingHero from "../components/listing/ListingHero";
import ListingMap from "../components/listing/ListingMap";

const ShowListing = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  // Fetch listing on mount
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listings/${id}`);
        if (res.data.success) setListing(res.data.listing);
      } catch {
        setError("Listing not found.");
      }
    };
    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await axios.delete(`/listings/${id}`);
      navigate("/listings");
    } catch (err) {
      console.log(err);
    }
  };

  // Loading / Error states
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!listing) return <div className="text-center my-5"><div className="spinner-border text-dark"></div></div>;

  const isOwner =
    currentUser &&
    listing.owner &&
    String(listing.owner._id || listing.owner) === String(currentUser._id);

  return (
    <div className="row justify-content-center pt-2">
      <div className="col-12 col-md-10 col-lg-8">

        <ListingHero listing={listing} />

        {/* ── Booking Card ── */}
        <BookingCard listing={listing} listingId={id} currentUser={currentUser} />

        {/* ── Owner Edit/Delete Controls ── */}
        {isOwner && (
          <div className="d-flex gap-2 mb-4">
            <Link to={`/listings/${id}/edit`} className="btn btn-dark px-4 py-2 fw-semibold">
              Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger px-4 py-2 fw-semibold">
              Delete
            </button>
          </div>
        )}

        <hr className="my-5 border-secondary border-opacity-25" />

        {/* ── Map ── */}
        <ListingMap listing={listing} />

        {/* ── Leave a Review (logged-in users only) ── */}
        {currentUser && (
          <>
            <hr className="my-5 border-secondary border-opacity-25" />
            <div className="mb-5">
              <h4 className="fw-semibold mb-4 text-dark" style={{ fontSize: "1.25rem" }}>
                Leave a Review
              </h4>
              <ReviewForm
                listingId={id}
                onReviewAdded={(rev) =>
                  setListing((prev) => ({ ...prev, reviews: [...(prev.reviews || []), rev] }))
                }
              />
            </div>
          </>
        )}

        {/* ── All Reviews ── */}
        <hr className="my-5 border-secondary border-opacity-25" />
        <div className="mb-5">
          <h4 className="fw-semibold mb-4 text-dark" style={{ fontSize: "1.25rem" }}>
            Reviews
          </h4>
          <ReviewsList
            reviews={listing.reviews}
            currentUser={currentUser}
            listingId={id}
            onReviewDeleted={(deletedId) =>
              setListing((prev) => ({
                ...prev,
                reviews: prev.reviews.filter((r) => r._id !== deletedId),
              }))
            }
          />
        </div>

      </div>
    </div>
  );
};

export default ShowListing;
