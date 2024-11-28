npimport React, { useEffect, useState } from 'react';
import { Table, Container, Alert } from 'react-bootstrap';

const AdminBills = () => {
  const [bills, setBills] = useState([]);
  const [error, setError] = useState(null);

  const fetchBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/bills');
      if (!response.ok) throw new Error('Failed to fetch bills');
      const data = await response.json();
      setBills(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchBills();
}, []);


  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">All Bills</h1>
       <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Doctor</th>
            <th>Patient</th>
            <th>Service</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={bill.id}>
              <td>{index + 1}</td>
              <td>{bill.user_firstName + ' ' + bill.user_lastName}</td>
              <td>{bill.patient_first_name + ' ' + bill.patient_last_name}</td>
              <td>{bill.service_title}</td>
              <td>${bill.amount.toFixed(2)}</td>
              <td>{new Date(bill.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminBills;
