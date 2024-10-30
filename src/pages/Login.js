import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImage from '../assets/login.jpg'; // Import the background image

const Login = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login();
        navigate('/dashboard');
      } else {
        setError(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again.');
    }
  };

  const navigateToSignup = () => navigate('/signup');
  const navigateToForgotPassword = () => navigate('/forgot-password');

  // Inline styling objects
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImage})`, // Apply background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  };

  const containerStyle = {
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: isDarkMode ? 'rgba(51, 51, 51, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    color: isDarkMode ? '#fff' : '#000',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  };

  return (
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100 mt-3" style={{ backgroundColor: '#007bff', border: 'none' }}>
                Login
              </Button>
            </Form>
            <div className="mt-3 text-center">
              <Button variant="link" onClick={navigateToSignup}>
                Don&apos;t have an account? Sign up here!
              </Button>
              <br />
              <Button variant="link" onClick={navigateToForgotPassword}>
                Forgot Password? Click here
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;

