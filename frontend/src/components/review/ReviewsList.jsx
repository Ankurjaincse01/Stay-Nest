import axios from "../../api/axios";

const ReviewsList = ({ reviews, currentUser, listingId, onReviewDeleted }) => {
  const handleDelete = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await axios.delete(`/listings/${listingId}/reviews/${reviewId}`);
      onReviewDeleted(reviewId);
    } catch (err) {
      alert("Failed to delete review.");
    }
  };

  if (!reviews || reviews.length === 0) {
    return <p className="text-muted">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="row g-4">
      {reviews.map((review) => {
        const isAuthor =
          currentUser &&
          review.author &&
          String(review.author._id || review.author) === String(currentUser._id);

        return (
          <div className="col-md-6" key={review._id}>
            <div
              className="p-4"
              style={{
                backgroundColor: "#fafafa",
                borderRadius: "0.8rem",
                border: "1px solid #eaeaea",
              }}
            >
              {/* Header: username + stars + delete */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-semibold text-dark" style={{ fontSize: "0.9rem" }}>
                  @{review.author?.username || review.author?.name || "user"}
                </span>

                <div className="d-flex align-items-center gap-2">
                  {/* Star Rating Display */}
                  <span style={{ fontSize: "1rem", letterSpacing: "2px" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <span
                        key={s}
                        style={{ color: s <= review.rating ? "#FFB400" : "#e0e0e0" }}
                      >
                        ★
                      </span>
                    ))}
                  </span>

                  {/* Delete Button — only for review author */}
                  {isAuthor && (
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm p-0 border-0 bg-transparent"
                      title="Delete review"
                      style={{ lineHeight: 1, color: "#222" }}
                    >
                      <i className="fa-solid fa-trash" style={{ fontSize: "0.85rem", color: "#222" }}></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Review Comment */}
              <p className="mb-0 text-dark" style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
                {review.comment}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsList;
