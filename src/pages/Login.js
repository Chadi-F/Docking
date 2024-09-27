import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Import the CSS file
import { auth } from '../FirebaseConfig';  // Ensure correct Firebase import
import { signInWithEmailAndPassword } from 'firebase/auth';  // Import sign-in method

const Login = () => {
  const navigate = useNavigate();

  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // State for error handling

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);

      // Redirect to another page after successful login
      navigate('/dashboard'); // Adjust the route based on your app structure

    } catch (error) {
      console.error('Login error:', error.message);
      setError('Invalid email or password'); // Set error message to display to the user
    }
  };

  // Navigate to the signup page
  const navigateToSignup = () => {
    navigate('/signup');
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
      </div>
    </div>
  );
};

export default Login;
