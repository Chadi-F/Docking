import React, { useState, useEffect } from 'react';
import './BillingHistoryList.css';
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BillingHistoryList = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigation

  const retrieveBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/history', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch bills history');
      }
      const data = await response.json();
      setBills(data.bills);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setError('Could not fetch bills. Please try again later.');
    }
  };

  useEffect(() => {
    retrieveBills();
  }, []);

  return (
    <div className="container mt-5">
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-4">
        Back to Dashboard
      </button>
      
      <h2>Billing History</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Patient ID</th>
            <th>Service ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.patient_id}</td>
              <td>{bill.service_id}</td>
              <td>{bill.amount}</td>
              <td>{bill.status}</td>
              <td>{bill.created_at}</td>
              <td>{bill.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BillingHistoryList;
