import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  // State to store form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [doctor_id, setDoctor_Id] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [error, setError] = useState(''); // State for error handling

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      console.log(JSON.stringify({
          firstName,
          lastName,
          email,
          password,
           phoneNumber,
           doctor_id,
           speciality,
        }))
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
         phoneNumber,
          doctor_id,
           speciality,
        }),
      });
  
      if (response.ok) {
        // Redirect to login page after successful signup
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage); // Handle the error message
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Signup failed. Please try again.');
    }
  };
  

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error if any */}
      <form onSubmit={handleSignup}>
        <div className="name-fields">
          <div className="first-name">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="last-name">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="contact-fields">
          <div className="email">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="phone">
            <label>Phone Number:</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="doctor-fields">
          <div className="doctor-id">
            <label>Doctor ID:</label>
            <input
              type="text"
              value={doctor_id}
              onChange={(e) => setDoctor_Id(e.target.value)}
              placeholder="Enter your doctor ID"
              required
            />
          </div>
          <div className="specialty">
            <label>Specialty:</label>
            <input
              type="text"
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              placeholder="Enter your specialty"
              required
            />
          </div>
        </div>

        <div className="password-field">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
