import React from 'react';
import AddNewPatient from './AddNewPatient'; // Import your form component
import { Container } from 'react-bootstrap';
import './AddNewPatientPage.css'; // Import any specific CSS for this page

const AddNewPatientPage = () => {
  const handlePatientAdded = () => {
    // Handle the logic when a patient is added, e.g., redirect or show a success message
    console.log('Patient added!');
  };

  return (
    <Container className="full-page-container d-flex align-items-center justify-content-center">
      <AddNewPatient onPatientAdded={handlePatientAdded} />
    </Container>
  );
};

export default AddNewPatientPage;
