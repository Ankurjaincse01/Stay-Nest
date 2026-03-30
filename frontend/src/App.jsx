import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import "./assets/styles/App.css";
import "./assets/styles/index.css";
import axios from "./api/axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import ShowListing from "./pages/ShowListing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NewListing from "./pages/NewListing";
import EditListing from "./pages/EditListing";
import MyBookings from "./pages/MyBookings";

function App() {
  // 1. Initialize state IMMEDIATELY from localStorage to avoid flicker
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    if (token && savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    // 2. Background Verify: Check if the token is still valid with the server
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/auth/current-user")
        .then(res => {
          if (res.data.success && res.data.user) {
            // Keep the user state (optionally update with fresh data from server)
            setCurrentUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));
          } else {
            // Token was invalid on server-side
            handleLogout();
          }
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar theme="dark" />
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      
      <main className="container flex-grow-1 my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Home />} />
          <Route path="/listings/new" element={<NewListing />} />
          <Route path="/listings/:id" element={<ShowListing currentUser={currentUser} />} />
          <Route path="/listings/:id/edit" element={<EditListing />} />
          <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
          <Route path="/signup" element={<Signup setCurrentUser={setCurrentUser} />} />
          <Route path="/bookings/my-bookings" element={<MyBookings />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
