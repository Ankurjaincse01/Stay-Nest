import { Link } from "react-router-dom";

// ─── Props ───────────────────────────────────────────────────────────────────
// listingId    : string  — the listing's MongoDB _id
// onDelete     : fn()   — called when Delete is confirmed
const OwnerControls = ({ listingId, onDelete }) => {
  return (
    <div className="d-flex gap-2 mb-4">
      {/* Edit — navigates to edit page */}
      <Link
        to={`/listings/${listingId}/edit`}
        className="btn btn-dark px-4 py-2 fw-semibold"
      >
        Edit
      </Link>

      {/* Delete — triggers confirm → delete */}
      <button
        onClick={onDelete}
        className="btn btn-outline-danger px-4 py-2 fw-semibold"
      >
        Delete
      </button>
    </div>
  );
};

export default OwnerControls;
