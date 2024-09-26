import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div className="name-fields">
          <div className="first-name">
            <label>First Name:</label>
            <input type="text" placeholder="Enter your first name" required />
          </div>
          <div className="last-name">
            <label>Last Name:</label>
            <input type="text" placeholder="Enter your last name" required />
          </div>
        </div>

        <div className="contact-fields">
          <div className="email">
            <label>Email:</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="phone">
            <label>Phone Number:</label>
            <input type="tel" placeholder="Enter your phone number" required />
          </div>
        </div>

        <div className="doctor-fields">
          <div className="doctor-id">
            <label>Doctor ID:</label>
            <input type="text" placeholder="Enter your doctor ID" required />
          </div>
          <div className="specialty">
            <label>Specialty:</label>
            <input type="text" placeholder="Enter your specialty" required />
          </div>
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
