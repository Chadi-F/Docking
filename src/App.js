import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './components/DashboardPage';

import Billing from './components/Billing'; // Import the new Billing component
import BillingHistoryList from './components/BillingHistoryList'; // Import the BillingHistory component
import ProtectedRoute from './utils/ProtectedRoute';
import AboutUs from './pages/AboutUs';
import ForgotPassword from './pages/ForgotPassword';
import './App.css'; // Import your CSS file that contains light and dark mode styles
import { AuthProvider } from './utils/AuthContext';

const App = () => {
  // Manage light/dark mode state
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load the theme from localStorage (optional)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    // Save the theme to localStorage (optional)
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
      <Router>
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          } />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={
            <AuthProvider>
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            </AuthProvider>
          } />
          <Route path="/billing" element={
            <AuthProvider>
              <ProtectedRoute>
                <Billing /> {/* New route for billing */}
              </ProtectedRoute>
            </AuthProvider>
          } />
          <Route path="/billing-history" element={
            <AuthProvider>
              <ProtectedRoute>
                <BillingHistoryList /> {/* New route for billing history */}
              </ProtectedRoute>
            </AuthProvider>
          } />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
