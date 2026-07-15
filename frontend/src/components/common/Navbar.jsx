import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const q = e.target.search.value.trim();
    if(q) navigate(`/listings?q=${encodeURIComponent(q)}`);
    else navigate('/listings');
    e.target.reset();
  };

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top px-2 px-md-4">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/"><i className="fa-solid fa-compass"></i></Link>

        {/* Hamburger Toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ boxShadow: 'none' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Desktop Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`} id="navbarNav">
          {/* Left Links */}
          <div className="navbar-nav">
            <Link className="nav-link" to="/">Explore</Link>
          </div>

          {/* Search */}
          <div className="search-container">
            <form onSubmit={handleSearch}>
              <div className="search-box">
                <input 
                  className="form-control search-input" 
                  type="search" 
                  name="search" 
                  placeholder="Search destinations" 
                />
                <button className="btn btn-search" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>

          {/* Right Links */}
          <div className="navbar-nav ms-auto gap-2">
            <Link className="nav-link fw-semibold" to="/listings/new">StayNest your home</Link>
            {currentUser && (
              <Link className="nav-link fw-semibold" to="/bookings/my-bookings">My Bookings</Link>
            )}
            {!currentUser ? (
              <>
                <Link className="nav-link fw-bold" to="/signup">Sign up</Link>
                <Link className="nav-link fw-bold" to="/login">Log in</Link>
              </>
            ) : (
              <button className="nav-link fw-bold bg-transparent border-0 p-0" onClick={handleLogout}>Log out</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="w-100 d-md-none mt-2 search-container-mobile">
        <form onSubmit={handleSearch}>
          <div className="search-box">
            <input 
              className="form-control search-input" 
              type="search" 
              name="search" 
              placeholder="Search destinations" 
            />
            <button className="btn btn-search" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
