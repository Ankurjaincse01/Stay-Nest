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
        const response = await axios.get("/listings", {
           params: { category, q: searchQuery }
        });
        if (response.data.success) {
          setListings(response.data.listings);
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
      {/* Filter Section with Tailwind */}
      <div className="py-6 px-4 md:px-6">
        {/* Filters Horizontal Scroll */}
        <div className="flex overflow-x-auto gap-6 pb-4 mb-6 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {filters.map((f, i) => (
            <button
              key={i}
              onClick={() => handleFilterClick(f.val)}
              className={`flex flex-col items-center justify-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 flex-shrink-0 snap-center ${
                category === f.val || (f.val === "" && !category)
                  ? "text-black font-semibold border-b-2 border-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              style={{ minWidth: "70px" }}
            >
              <i className={`fa-solid ${f.icon}`} style={{ fontSize: "1.5rem" }}></i>
              <span className="text-xs font-medium text-center whitespace-nowrap">{f.name}</span>
            </button>
          ))}
        </div>

        {/* Tax Toggle */}
        <div className="flex items-center justify-between bg-white border border-gray-300 rounded-full px-6 py-3 mb-6">
          <span className="text-sm md:text-base text-gray-700 font-medium">Display total before taxes</span>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={showTaxTotal}
              onChange={() => setShowTaxTotal(!showTaxTotal)}
              className="w-5 h-5 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Listing Grid */}
      <div className="px-4 md:px-6 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map(listing => (
            <div key={listing._id}>
              <Link to={`/listings/${listing._id}`} className="text-decoration-none text-dark block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  <img 
                    src={listing.image?.url || "https://via.placeholder.com/800x600?text=No+Image"} 
                    className="w-full h-48 md:h-56 object-cover"
                    alt={listing.title} 
                  />
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2">{listing.title}</h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        ₹{showTaxTotal 
                          ? `${Math.round(listing.price * 1.18).toLocaleString("en-IN")} total before taxes` 
                          : `${listing.price?.toLocaleString("en-IN")} / night +18% GST`}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
