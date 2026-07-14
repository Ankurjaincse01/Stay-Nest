import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`/auth/reset-password/${token}`, {
        password: formData.password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-2">Set New Password</h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Enter a strong new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
          <div className="mb-3">
            <label className="form-label fw-semibold">New Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              className="form-control"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <div className="text-danger mt-1" style={{ fontSize: "0.82rem" }}>
                Passwords do not match
              </div>
            )}
          </div>

          {/* Password strength indicator */}
          {formData.password.length > 0 && (
            <div className="mb-3">
              <div className="d-flex gap-1 mb-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className="rounded"
                    style={{
                      height: "4px",
                      flex: 1,
                      backgroundColor:
                        formData.password.length >= level * 3
                          ? level <= 1 ? "#ef4444"
                            : level <= 2 ? "#f59e0b"
                            : level <= 3 ? "#3b82f6"
                            : "#22c55e"
                          : "#e5e7eb",
                      transition: "background-color 0.3s",
                    }}
                  />
                ))}
              </div>
              <small className="text-muted">
                {formData.password.length < 4 ? "Weak" :
                 formData.password.length < 7 ? "Fair" :
                 formData.password.length < 10 ? "Good" : "Strong"}
              </small>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-dark w-100 fw-bold py-2 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </button>

          <p className="text-center mb-0">
            <Link to="/login" className="text-dark fw-semibold">
              ← Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
