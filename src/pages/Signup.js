import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { auth } from '../FirebaseConfig'; // Ensure this is the correct path
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase function

const Signup = () => {
  const navigate = useNavigate();

  // State to store form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [specialty, setSpecialty] = useState('');

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Firebase signup with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);

      // Optionally, you can save additional info like firstName, lastName, etc., to Firestore

      // Navigate to a different page after successful signup
      navigate('/dashboard'); // Adjust the route as necessary
    } catch (error) {
      console.error('Error during sign up:', error.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              placeholder="Enter your doctor ID"
              required
            />
          </div>
          <div className="specialty">
            <label>Specialty:</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
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
