import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/verify-email`,
          { token }
        );

        if (response.data.success) {
          setVerified(true);
          toast.success("Email verified successfully!");
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Verification failed");
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <div>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verifying Email...
            </h2>
            <p className="text-gray-600">Please wait while we verify your email address.</p>
          </div>
        ) : verified ? (
          <div>
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Email Verified!
            </h2>
            <p className="text-gray-600 mb-4">
              Your email has been successfully verified. You can now log in to your account.
            </p>
            <p className="text-sm text-gray-500">Redirecting to login...</p>
          </div>
        ) : (
          <div>
            <div className="text-6xl mb-4">✗</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-4">
              The verification link is invalid or has expired.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Back to Signup
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
