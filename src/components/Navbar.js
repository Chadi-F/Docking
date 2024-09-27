// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';
import './Navbar.css'; // Adjust the path if necessary

const Navbar = () => {
  return (
    <nav>
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" /> {/* Add the logo image here */}
      </Link>
      <h1>DocInc</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>  {/* Add Dashboard Link */}
        <li><Link to="/about">About Us</Link></li> {/* Add About Us link */}
      </ul>
    </nav>
  );
};

export default Navbar;
