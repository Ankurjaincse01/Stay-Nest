import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const categories = [
  { name: "Trending", icon: "fa-fire", val: "Trending" },
  { name: "Villa", icon: "fa-house", val: "Villa" },
  { name: "Farm House", icon: "fa-tractor", val: "Farm House" },
  { name: "Pool House", icon: "fa-person-swimming", val: "Pool House" },
  { name: "Rooms", icon: "fa-bed", val: "Rooms" },
  { name: "Flat", icon: "fa-building", val: "Flat" },
  { name: "PG", icon: "fa-user-group", val: "PG" },
  { name: "Cabin", icon: "fa-campground", val: "Cabin" },
  { name: "Beachfront", icon: "fa-umbrella-beach", val: "Beachfront" },
];

const NewListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "", description: "", price: "", location: "", country: "", category: "Trending", ownerType: ""
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error("Please select a place description.");

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        formPayload.append(`listing[${key}]`, formData[key]);
      });
      if (file) {
        formPayload.append("listing[image]", file);
      }
      
      const res = await axios.post("/listings", formPayload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (res.data.success) {
        toast.success("Listing created successfully!");
        navigate("/listings");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create listing");
      console.log(err);
    }
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-12 col-md-10 col-lg-8">
        <h2 className="mb-4" style={{fontSize: "1.7rem", color: "#222"}}>Create New Listing</h2>
        
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Owner Type</label>
            <select name="ownerType" className="form-select py-2" value={formData.ownerType} onChange={handleChange} required>
              <option value="" disabled>Select owner type</option>
              <option value="Individual">Individual</option>
              <option value="Property Manager">Property Manager</option>
              <option value="Real Estate Agency">Real Estate Agency</option>
              <option value="Hotel/Resort">Hotel/Resort</option>
              <option value="Business Owner">Business Owner</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label text-dark mb-3" style={{fontSize: "0.95rem"}}>Which of these best describes your place?</label>
            <div className="row g-3">
              {categories.map(cat => (
                <div className="col-4" key={cat.val}>
                   <div 
                     className={`border rounded p-3 d-flex flex-column align-items-center justify-content-center ${formData.category === cat.val ? 'border-dark shadow-sm bg-light fw-medium' : 'text-muted'}`}
                     onClick={() => setFormData({...formData, category: cat.val})}
                     style={{ cursor: "pointer", height: "90px", transition: "all 0.2s" }}
                   >
                      <i className={`fa-solid ${cat.icon} fs-4 mb-2 ${formData.category === cat.val ? 'text-dark' : 'text-dark'}`}></i>
                      <span style={{ fontSize: "0.80rem", textAlign: "center" }}>{cat.name}</span>
                   </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Tittle</label>
            <input name="title" className="form-control py-2" placeholder="enter your title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="mb-4">
            <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Description</label>
            <textarea name="description" className="form-control" rows="3" placeholder="enter your description" value={formData.description} onChange={handleChange} required></textarea>
          </div>

          <div className="mb-4">
            <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Upload Listing Image</label>
            <input type="file" name="listingImage" className="form-control bg-light" onChange={handleFileChange} accept="image/*" />
          </div>

          <div className="row mb-4">
            <div className="col-md-6 mb-4 mb-md-0">
              <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Price</label>
              <input type="number" name="price" className="form-control py-2" placeholder="enter price" value={formData.price} onChange={handleChange} min="0" required />
            </div>
            <div className="col-md-6">
              <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Location</label>
              <input name="location" className="form-control py-2" placeholder="enter location" value={formData.location} onChange={handleChange} required />
            </div>
          </div>

          <div className="mb-5">
            <label className="form-label text-dark mb-1" style={{fontSize: "0.95rem"}}>Country</label>
            <input name="country" className="form-control py-2" placeholder="enter country" value={formData.country} onChange={handleChange} required />
          </div>

          <button type="submit" className="btn btn-dark px-4 py-2" style={{borderRadius: "0.4rem"}}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default NewListing;
