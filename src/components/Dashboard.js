// src/components/Dashboard.js
import React from 'react';
import PatientForm from './PatientForm';
import AddNewPatient from './AddNewPatient';
import './Dashboard.css';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Doctor's Dashboard</h1>
      <PatientForm />  {/* Form to submit patient data */}
      <AddNewPatient />  {/* Form to add new patients */}
    </div>
  );
};

export default Dashboard;
