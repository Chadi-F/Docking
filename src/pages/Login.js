import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error handling

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/login', { // Update to your actual login endpoint
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCredentials),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the dashboard on successful login
        navigate('/dashboard');
      } else {
        // Handle errors
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  // Navigate to the signup page
  const navigateToSignup = () => {
    navigate('/signup');
  };

  // Navigate to the forgot password page
  const navigateToForgotPassword = () => {
    navigate('/forgot-password'); // Adjust this route to your actual forgot password page
  };

  return (
    <div className="login-page">
      <div className="signin-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>} {/* Display error if any */}
          
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          
          <label>Password:</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? 
          <button onClick={navigateToSignup} className="signup-button">
            Sign up here!
          </button>
        </p>
        <p>
          <button onClick={navigateToForgotPassword} className="forgot-password-button">
            Forgot Password? Click here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
