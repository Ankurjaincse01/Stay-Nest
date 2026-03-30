import { useState } from "react";
import axios from "../../api/axios";

const ReviewForm = ({ listingId, onReviewAdded }) => {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return setMsg({ type: "error", text: "Please select a star rating." });
    if (!comment.trim()) return setMsg({ type: "error", text: "Please write a comment." });

    setSubmitting(true);
    try {
      const res = await axios.post(`/listings/${listingId}/reviews`, {
        review: { rating, comment },
      });
      if (res.data.success) {
        onReviewAdded(res.data.review);
        setRating(0);
        setComment("");
        setMsg({ type: "success", text: "Review submitted successfully!" });
      }
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Failed to submit review." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Star Rating */}
      <div className="d-flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            style={{
              fontSize: "2rem",
              cursor: "pointer",
              color: star <= (hovered || rating) ? "#FFB400" : "#d9d9d9",
              transition: "color 0.15s",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Comment Textarea */}
      <label className="form-label text-dark mb-2" style={{ fontSize: "0.9rem" }}>
        Comments
      </label>
      <textarea
        className="form-control mb-4"
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{ borderColor: "#d0d0d0", borderRadius: "0.5rem", fontSize: "0.9rem", resize: "vertical" }}
      />

      {/* Status Message */}
      {msg && (
        <div
          className={`mb-3 px-3 py-2 rounded-3 ${
            msg.type === "success"
              ? "text-success bg-success bg-opacity-10"
              : "text-danger bg-danger bg-opacity-10"
          }`}
          style={{ fontSize: "0.85rem" }}
        >
          {msg.text}
        </div>
      )}

      <button
        type="submit"
        className="btn btn-dark px-4 py-2 fw-semibold"
        style={{ borderRadius: "0.4rem" }}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
};

export default ReviewForm;
