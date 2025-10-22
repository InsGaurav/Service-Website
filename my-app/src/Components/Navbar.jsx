import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";  // Add this to decode token
import "./../styles/Navbar.css";


function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();


  useEffect(() => {
    // Token expiration check on mount
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          handleLogout();
        }
      } catch {
        handleLogout();
      }
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");  // redirect to login after logout
  };


  const displayName = user?.username || user?.name || user?.email || "Guest";


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src="/assets/images/img_social_media_twitch.svg" alt="Logo" />
          <span>Logo Here</span>
        </div>

        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/career">Career</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/about-us">About Us</Link>
        </div>

        <div className="dropdown-wrapper" ref={dropdownRef}>
          <button
            className="navbar-button"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="navbar-icon">
              <img src="/assets/images/img_vector.svg" alt="Arrow Icon" />
            </div>
            <span>Hi, {displayName}</span>
          </button>

          {showDropdown && (
            <div className="dropdown-menu">
              {user ? (
                <>
                  <Link to="/profile">Profile</Link>
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/change-password">Change Password</Link>
                  <Link to="/contact">Contact Us</Link>
                  <Link to="/help">Help Center</Link>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Sign Up</Link>
                  <Link to="/contact">Contact Us</Link>
                  <Link to="/help">Help Center</Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
