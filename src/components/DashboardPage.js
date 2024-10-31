import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <Container className="dashboard-container" fluid>
      <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Link to="/billing" className="text-decoration-none">
            <Card className="start-billing-block text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Start Billing</Card.Title>
                <Card.Text>
                  Click here to start billing.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col xs={12} sm={6} md={3} className="mb-4">
          <Link to="/billing-history" className="text-decoration-none">
            <Card className="billing-history-block text-center">
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title>Billing History</Card.Title>
                <Card.Text>
                  Click here to view the billing history of patients.
                </Card.Text>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
