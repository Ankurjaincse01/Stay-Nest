import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/auth/logout");
      setCurrentUser(null);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/"><i className="fa-solid fa-compass"></i></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <Link className="nav-link d-flex align-items-center" to="/">
              <span className="ms-2">Explore</span>
            </Link>
          </div>
          
          <div className="navbar-nav mx-auto search-container">
            <form className="d-flex search-form" role="search" onSubmit={(e) => { e.preventDefault(); const q = e.target.search.value.trim(); if(q) navigate(`/listings?q=${encodeURIComponent(q)}`); else navigate('/listings'); }}>
              <div className="search-box">
                <input className="form-control search-input" type="search" name="search" placeholder="Search destinations" />
                <button className="btn btn-search" type="submit">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </form>
          </div>

          <div className="navbar-nav ms-auto gap-3">
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
              <button className="nav-link fw-bold bg-transparent border-0" onClick={handleLogout}>Log out</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
