import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "../api/axios";

const Home = () => {
  const [listings, setListings] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("q");
  const [showTaxTotal, setShowTaxTotal] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = new URLSearchParams();
        if (category) params.set("category", category);
        if (searchQuery) params.set("q", searchQuery);
        const url = `/listings${params.toString() ? `?${params}` : ""}`;
        const res = await axios.get(url);
        if (res.data.success) {
          setListings(res.data.listings);
        }
      } catch (err) {
        console.error("Error fetching listings:", err);
      }
    };
    fetchListings();
  }, [category, searchQuery]);

  const handleFilterClick = (cat) => {
    if (cat === category) {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filters = [
    { name: "All", icon: "fa-folder", val: "" },
    { name: "Trending", icon: "fa-fire", val: "Trending" },
    { name: "Rooms", icon: "fa-bed", val: "Rooms" },
    { name: "Villa", icon: "fa-house", val: "Villa" },
    { name: "Cabins", icon: "fa-campground", val: "Cabins" },
    { name: "Amazing Pools", icon: "fa-person-swimming", val: "Pool House" },
    { name: "PG", icon: "fa-user-group", val: "PG" },
    { name: "Farms", icon: "fa-tractor", val: "Farm House" },
    { name: "Flat", icon: "fa-building", val: "Flat" },
    { name: "Beachfront", icon: "fa-umbrella-beach", val: "Beachfront" },
  ];

  return (
    <>
      <div className="filter-section d-flex align-items-center justify-content-between my-4 gap-3">
        <div id="filters" className="d-flex overflow-auto gap-5 flex-grow-1 align-items-center px-1" style={{ scrollbarWidth: "none" }}>
          {filters.map((f, i) => (
            <div 
              key={i} 
              className={`filter d-flex flex-column align-items-center cursor-pointer ${category === f.val || (f.val === "" && !category) ? "active fw-semibold text-dark border-dark" : "text-muted border-transparent"}`} 
              onClick={() => handleFilterClick(f.val)}
              style={{ minWidth: "fit-content", cursor: "pointer", transition: "all 0.2s", paddingBottom: "0.6rem", borderBottomWidth: "2px", borderBottomStyle: "solid", borderColor: category === f.val || (f.val === "" && !category) ? "#000" : "transparent" }}
            >
              <i className={`fa-solid ${f.icon} mb-2`} style={{ fontSize: "1.35rem", opacity: category === f.val || (f.val === "" && !category) ? "1" : "0.7" }}></i>
              <span style={{ fontSize: "0.75rem", fontWeight: category === f.val || (f.val === "" && !category) ? "500" : "400" }}>{f.name}</span>
            </div>
          ))}
        </div>
        
        <div className="tax-toggle border rounded-pill d-flex align-items-center ms-auto bg-white mb-2" style={{ padding: "0.8rem 1.2rem", minWidth: "fit-content", borderColor: "#dddddd" }}>
          <span className="me-3 text-dark" style={{ fontSize: "0.85rem" }}>Display total before taxes</span>
          <div className="form-check form-switch m-0 p-0 d-flex align-items-center">
            <input className="form-check-input ms-0 cursor-pointer" type="checkbox" role="switch" id="taxSwitch" style={{ height: "1.3rem", width: "2.3rem", margin: 0 }} checked={showTaxTotal} onChange={() => setShowTaxTotal(!showTaxTotal)} />
          </div>
        </div>
      </div>

      <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 g-4 mt-4">
        {listings.map(listing => (
          <div className="col" key={listing._id}>
            <Link to={`/listings/${listing._id}`} className="text-decoration-none text-dark">
              <div className="card h-100 border-0 bg-transparent listing-card">
                <img 
                  src={listing.image?.url || "https://via.placeholder.com/800x600?text=No+Image"} 
                  className="card-img-top" 
                  alt={listing.title} 
                  style={{ height: "18rem", objectFit: "cover", borderRadius: "0.8rem" }} 
                />
                <div className="card-body px-0 pt-2 pb-0">
                  <div className="card-title fw-semibold m-0" style={{ fontSize: "0.95rem", color: "#222" }}>{listing.title}</div>
                  <p className="card-text m-0" style={{ fontSize: "0.95rem", color: "#555" }}>
                    &#8377; {showTaxTotal 
                       ? `${Math.round(listing.price * 1.18).toLocaleString("en-IN")} total before taxes` 
                       : `${listing.price?.toLocaleString("en-IN")} / night +18% GST`}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
