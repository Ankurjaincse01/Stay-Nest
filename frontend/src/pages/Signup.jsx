import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const Signup = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signup", formData);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setCurrentUser(res.data.user);
        toast.success(res.data.message);
        navigate("/listings");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-4">Sign up for StayNest</h2>
        
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input 
              type="text" 
              name="name" 
              className="form-control" 
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email address</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              placeholder="Secure password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold py-2 mb-3">Sign up</button>
          
          <p className="text-center mb-0">
            Already have an account? <Link to="/login" className="text-dark fw-bold">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
