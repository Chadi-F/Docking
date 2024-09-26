import React from 'react';
import { useNavigate } from 'react-router-dom'; // Correct hook for v6
import './Home.css';  // Import the CSS file

const Home = () => {
  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  const navigateToLogin = () => {
    navigate('/login');  // Use navigate instead of history.push
  };

  return (
    <div className="homepage">
      <h2>Welcome to Docinc</h2>
      <p>Your doctor and assistant billing solution starts here!</p>
      
      {/* Ready to Get Started Button */}
      <button className="btn" onClick={navigateToLogin}>
        Ready to get started? Click here!
      </button>
    </div>
  );
};

export default Home;
