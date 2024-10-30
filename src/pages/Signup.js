import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [doctor_id, setDoctor_Id] = useState('');
  const [specialty, setspecialty] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
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
          specialty,
        }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container container">
      <h2 className="text-center">Sign Up</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <form onSubmit={handleSignup} className="bg-white p-4 rounded shadow-sm">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>First Name:</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Last Name:</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Phone Number:</label>
            <input
              type="tel"
              className="form-control"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Doctor ID:</label>
            <input
              type="text"
              className="form-control"
              value={doctor_id}
              onChange={(e) => setDoctor_Id(e.target.value)}
              placeholder="Enter your doctor ID"
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Specialty:</label>
            <input
              type="text"
              className="form-control"
              value={specialty}
              onChange={(e) => setspecialty(e.target.value)}
              placeholder="Enter your specialty"
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
