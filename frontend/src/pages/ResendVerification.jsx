import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResendVerification() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/resend-verification-email`,
        { email: email.toLowerCase().trim() }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setEmail("");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Resend Verification</h2>
        <p className="text-gray-600 mb-6">
          Enter your email address to receive a new verification link.
        </p>

        <form onSubmit={handleResend} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Already verified?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Go to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
