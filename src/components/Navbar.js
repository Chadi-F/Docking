import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Navbar.css';
import { AuthContext } from '../utils/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    const element = document.getElementById('bg-app');
    if (isDarkMode) {
      element.classList.add('dark-mode');
    } else {
      element.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout(); // Update authentication state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <>
      {/* Header */}
      <nav className="navbar navbar-dark fixed-top">
        <div className="container-fluid">
          <button
            className="btn btn-outline-secondary me-2"
            data-bs-toggle="offcanvas"
            data-bs-target="#sidebar"
            aria-controls="sidebar"
          >
            ☰
          </button>
          <Link to="/" className="navbar-brand">
            DocInc
          </Link>

          <div className="d-flex align-items-center">
            <img
              src={logo}
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: '30px', height: '30px' }}
            />

{isAuthenticated ? (
            <div className="theme-toggle">
            <i
              className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'}`}
              onClick={toggleTheme}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            ></i>
            <input
              type="checkbox"
              className="slider"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
          </div>
            ) : (
             <></>
            )}

            {isAuthenticated ? (
              <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
              </button>
            ) : (
             <></>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className={`offcanvas offcanvas-start ${
          isDarkMode ? 'bg-dark text-white' : 'bg-light text-dark'
        }`}
        tabIndex="-1"
        id="sidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/billing" className="nav-link">
                    Start Billing
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/billing-history" className="nav-link">
                    Billing History
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/help" className="nav-link">
                  Help
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
