import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/forgot-password", { email });
      if (res.data.success) {
        setSubmitted(true);
        toast.success("Reset link sent! Check your inbox.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-12 col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-2">Forgot Password?</h2>
        <p className="text-center text-muted mb-4" style={{ fontSize: "0.95rem" }}>
          Enter your registered email and we'll send you a reset link.
        </p>

        {submitted ? (
          <div className="border p-4 rounded bg-white shadow-sm text-center">
            <div className="mb-3" style={{ fontSize: "3rem" }}>📬</div>
            <h5 className="fw-bold">Check your email</h5>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              If <strong>{email}</strong> is registered with us, you'll receive a
              password reset link shortly. The link expires in <strong>1 hour</strong>.
            </p>
            <Link to="/login" className="btn btn-dark w-100 mt-2">
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="border p-4 rounded bg-white shadow-sm">
            <div className="mb-4">
              <label className="form-label fw-semibold">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 fw-bold py-2 mb-3"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                  Sending...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <p className="text-center mb-0">
              <Link to="/login" className="text-dark fw-semibold">
                ← Back to Login
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
