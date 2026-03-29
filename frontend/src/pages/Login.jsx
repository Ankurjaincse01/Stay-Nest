import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = ({ setCurrentUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", formData);
      if (res.data.success) {
        setCurrentUser(res.data.user);
        toast.success(res.data.message);
        navigate("/listings");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-4">Log in to StayNest</h2>
        
        {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
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
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn btn-dark w-100 fw-bold py-2 mb-3">Log in</button>
          
          <p className="text-center mb-0">
            Don't have an account? <Link to="/signup" className="text-dark fw-bold">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
