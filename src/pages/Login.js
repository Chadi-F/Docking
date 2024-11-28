import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import backgroundImage from '../assets/login.jpg';
import './Login.css';
import AdminBills from './AdminBills';

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
        console.log(data);
        debugger;
        if(data.user.role === 'admin')
       {
          navigate('/adminbills');
        } else {
          navigate('/dashboard');}
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

  // Outer container style (for background and centering)
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
  };

  // Inner container style (for the login box)
  const containerStyle = {
    width: '350px',
    height: '400px', // Fixed height for the box
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: isDarkMode ? 'rgba(51, 51, 51, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    color: isDarkMode ? '#fff' : '#000',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Distribute content evenly
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '25px',
    padding: '10px 20px',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
  };

  return (
    <div style={pageStyle}>
      <Container style={containerStyle}>
        <Row className="justify-content-center">
          <Col>
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
                  style={{ padding: '15px', fontSize: '16px', borderRadius: '10px' }}
                />
              </Form.Group>
              <Form.Group controlId="formPassword" className="mt-3">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ padding: '15px', fontSize: '16px', borderRadius: '10px' }}
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mt-4"
                style={buttonStyle}
                onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
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
