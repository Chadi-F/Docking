import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Navbar as BootstrapNavbar,
  Nav,
  Container,
  NavDropdown
} from 'react-bootstrap';
import logo from '../assets/logo.webp';
import './Navbar.css'; // Ensure you import your CSS file for custom styles

const Navbar = ({ toggleTheme, isDarkMode, isLoggedIn }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <BootstrapNavbar
      expand="lg"
      bg={isDarkMode ? 'dark' : 'light'}
      variant={isDarkMode ? 'dark' : 'light'}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="py-1 small-navbar" // Custom class for reduced navbar height
    >
      <Container fluid>
        {/* Navbar Brand (left-aligned logo) */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" className="logo" />
          DocInc
        </Link>

        {/* Toggle Button for Mobile */}
        <BootstrapNavbar.Toggle aria-controls="navbar-content" />

        {/* Navbar Content */}
        <BootstrapNavbar.Collapse id="navbar-content">
          <Nav className="ms-auto align-items-center"> {/* Aligns items to the right */}
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            {isLoggedIn && (
              <NavDropdown title="Dashboard" id="dashboard-dropdown">
                <NavDropdown.Item as={Link} to="/add-patient">
                  Add New Patient
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/billing-history">
                  Billing History
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <Button onClick={toggleTheme} className="ms-3" aria-label="Toggle dark/light mode">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
