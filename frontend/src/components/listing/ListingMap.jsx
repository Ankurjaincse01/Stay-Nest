import { useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// ─── Custom red location pin icon ───────────────────────────────────────────
const customIcon = L.divIcon({
  className: "custom-pin",
  html: `<div style="transform: translate(-50%, -100%);">
           <i class="fa-solid fa-location-dot text-danger"
              style="font-size: 2.2rem; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3));">
           </i>
         </div>`,
  iconSize: [0, 0],
  iconAnchor: [0, 0],
  popupAnchor: [0, -38],
});

// ─── Props ───────────────────────────────────────────────────────────────────
// listing    : { title, location, geometry }
const ListingMap = ({ listing }) => {
  const markerRef = useRef(null);
  
  const coordinates = listing.geometry?.coordinates || [75.7873, 26.9124];
  const mapCenter = [coordinates[1], coordinates[0]];

  // Auto-open the popup once the marker mounts
  useEffect(() => {
    if (markerRef.current) {
      markerRef.current.openPopup();
    }
  }, []);

  return (
    <div className="mb-5">
      <h4 className="fw-semibold mb-4 text-dark" style={{ fontSize: "1.35rem" }}>
        Where you'll be
      </h4>

      {/* Map Container */}
      <div
        style={{
          height: "420px",
          borderRadius: "1rem",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <MapContainer
          center={mapCenter}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={mapCenter} icon={customIcon} ref={markerRef}>
            <Popup closeButton={true} minWidth={220}>
              <div className="text-center py-2 px-1">
                {/* Listing title */}
                <h6
                  className="text-danger fw-normal mb-2"
                  style={{ fontSize: "1.1rem" }}
                >
                  {listing.title}
                </h6>

                {/* Location */}
                <div
                  className="fw-bold text-dark mb-2"
                  style={{ fontSize: "0.9rem" }}
                >
                  <i className="fa-solid fa-location-dot me-1 text-danger" />
                  {listing.location}
                </div>

                {/* Disclaimer */}
                <div className="text-muted" style={{ fontSize: "0.75rem" }}>
                  Exact location provided after booking
                </div>
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ListingMap;
