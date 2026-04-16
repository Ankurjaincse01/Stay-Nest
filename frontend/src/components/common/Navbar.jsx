import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../api/axios";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <i className="fa-solid fa-compass text-2xl text-gray-900"></i>
          </Link>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <form onSubmit={(e) => { e.preventDefault(); const q = e.target.search.value.trim(); if(q) navigate(`/listings?q=${encodeURIComponent(q)}`); else navigate('/listings'); }} className="w-full max-w-md">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white shadow-sm hover:shadow-md transition">
                <input type="search" name="search" placeholder="Search destinations" className="flex-1 outline-none bg-transparent text-sm" />
                <button type="submit" className="ml-2 text-gray-700 hover:text-gray-900">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Right Menu - Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-900 font-medium hover:text-gray-600 transition">
              Explore
            </Link>
            <Link to="/listings/new" className="text-gray-900 font-medium hover:text-gray-600 transition">
              StayNest your home
            </Link>
            {currentUser && (
              <Link to="/bookings/my-bookings" className="text-gray-900 font-medium hover:text-gray-600 transition">
                My Bookings
              </Link>
            )}
            {!currentUser ? (
              <>
                <Link to="/signup" className="text-gray-900 font-bold hover:text-gray-600 transition">
                  Sign up
                </Link>
                <Link to="/login" className="text-gray-900 font-bold hover:text-gray-600 transition">
                  Log in
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="text-gray-900 font-bold hover:text-gray-600 transition bg-transparent border-0 cursor-pointer">
                Log out
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-900">
            <i className={`fa-solid fa-${isMenuOpen ? 'times' : 'bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-3">
            <Link to="/" className="block text-gray-900 font-medium py-2 hover:bg-gray-100 px-2 rounded transition">
              Explore
            </Link>
            <Link to="/listings/new" className="block text-gray-900 font-medium py-2 hover:bg-gray-100 px-2 rounded transition">
              StayNest your home
            </Link>
            {currentUser && (
              <Link to="/bookings/my-bookings" className="block text-gray-900 font-medium py-2 hover:bg-gray-100 px-2 rounded transition">
                My Bookings
              </Link>
            )}
            {!currentUser ? (
              <>
                <Link to="/signup" className="block text-gray-900 font-bold py-2 hover:bg-gray-100 px-2 rounded transition">
                  Sign up
                </Link>
                <Link to="/login" className="block text-gray-900 font-bold py-2 hover:bg-gray-100 px-2 rounded transition">
                  Log in
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="w-full text-left text-gray-900 font-bold py-2 hover:bg-gray-100 px-2 rounded transition bg-transparent border-0 cursor-pointer">
                Log out
              </button>
            )}
            {/* Mobile Search */}
            <form onSubmit={(e) => { e.preventDefault(); const q = e.target.search.value.trim(); if(q) navigate(`/listings?q=${encodeURIComponent(q)}`); else navigate('/listings'); }} className="pt-3">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
                <input type="search" name="search" placeholder="Search destinations" className="flex-1 outline-none bg-transparent text-sm" />
                <button type="submit" className="ml-2 text-gray-700">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
