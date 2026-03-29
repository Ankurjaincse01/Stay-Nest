// ─── Props ───────────────────────────────────────────────────────────────────
// listing : { title, location, country, image, owner, description, price }
const ListingHero = ({ listing }) => {
  const imageUrl =
    listing.image?.url ||
    "https://via.placeholder.com/800x600?text=No+Image";

  const ownerName = listing.owner?.name || "StayNest Host";

  return (
    <>
      {/* ── Title & Location ──────────────────────────────────────────── */}
      <h3
        className="fw-semibold mb-2"
        style={{ color: "#222", fontSize: "1.6rem" }}
      >
        {listing.title}
      </h3>

      <p
        className="fw-medium mb-4"
        style={{ color: "#222", fontSize: "0.95rem" }}
      >
        <i className="fa-solid fa-location-dot me-2" />
        {listing.location}, {listing.country}
      </p>

      {/* ── Hero Image ───────────────────────────────────────────────── */}
      <div className="mb-4">
        <img
          src={imageUrl}
          alt={listing.title}
          className="w-100 shadow-sm"
          style={{
            height: "480px",
            objectFit: "cover",
            borderRadius: "1.2rem",
          }}
        />
      </div>

      {/* ── Host & Description ───────────────────────────────────────── */}
      <div className="mb-4">
        <h4
          className="fw-semibold mb-3"
          style={{ fontSize: "1.3rem", color: "#222" }}
        >
          Entire place hosted by {ownerName}
        </h4>

        <p
          className="text-dark mb-4"
          style={{ fontSize: "0.95rem", lineHeight: "1.6" }}
        >
          {listing.description}
        </p>
      </div>
    </>
  );
};

export default ListingHero;
