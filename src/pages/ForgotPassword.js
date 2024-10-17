import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Optional: CSS for styling

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    
    try {
      // Your API call to send a password reset email goes here
      const response = await fetch('/api/forgot-password', { // Adjust your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('Check your email for a password reset link!');
      } else {
        throw new Error('Failed to send password reset email');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="forgot-password-page">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        
        <button type="submit">Send Reset Link</button>
      </form>
      <p>
        Remembered your password? <button onClick={() => navigate('/login')}>Login here!</button>
      </p>
    </div>
  );
};

export default ForgotPassword;
