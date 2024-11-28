import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`homepage ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="content-wrapper">
        {/* Image Section */}
        <img
          src={require('../assets/login.jpg')} // Update path to match your project's structure
          alt="Welcome Illustration"
          className="homepage-image"
        />

        {/* Text Section */}
        <div className="text-section">
          <h2 className="display-4">Welcome to DocInc</h2>
          <p className="lead">Your doctor and assistant billing solution starts here!</p>
          <button className="btn btn-primary mt-3" onClick={navigateToLogin}>
            Ready to get started? Click here!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
