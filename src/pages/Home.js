import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Import the CSS file if you want to add custom styles

const Home = ({ isDarkMode }) => {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className={`homepage ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'} text-center p-5`}>
      <div className="container">
        <h2 className="display-4">Welcome to DocInc</h2>
        <p className="lead">Your doctor and assistant billing solution starts here!</p>
        
        {/* Ready to Get Started Button */}
        <button className="btn btn-primary mt-3" onClick={navigateToLogin}>
          Ready to get started? Click here!
        </button>
      </div>
    </div>
  );
};

export default Home;
