import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file

const Login = () => {
  const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');  // Redirect to signup page
  };

  return (
    <div className="login-page">
      <div className="signin-container">
        <h2>Login</h2>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" required />
          
          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required />
          
          <button type="submit">Login</button>
        </form>

        <p>
          Don't have an account? 
          <button onClick={navigateToSignup} className="signup-button">
            Sign up here!
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
