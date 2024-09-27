// src/components/AddNewPatient.js
import React, { useState } from 'react';
import './AddNewPatient.css';

const AddNewPatient = () => {
  const [newPatientId, setNewPatientId] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [dob, setDob] = useState('');

  const handleNewPatientSubmit = (e) => {
    e.preventDefault();

    // You can call an API here to add the new patient
    const newPatientData = {
      newPatientId,
      newFullName,
      dob,
    };

    // For now, log the new patient data to the console
    console.log('New Patient Submitted', newPatientData);

    // Reset the form after submission
    setNewPatientId('');
    setNewFullName('');
    setDob('');
  };

  return (
    <form onSubmit={handleNewPatientSubmit}>
      <h2>Add New Patient</h2>
      <div>
        <label>Patient ID:</label>
        <input 
          type="text" 
          value={newPatientId} 
          onChange={(e) => setNewPatientId(e.target.value)} 
          placeholder="Enter new patient ID" 
          required 
        />
      </div>
      <div>
        <label>Full Name:</label>
        <input 
          type="text" 
          value={newFullName} 
          onChange={(e) => setNewFullName(e.target.value)} 
          placeholder="Enter full name" 
          required 
        />
      </div>
      <div>
        <label>Date of Birth:</label>
        <input 
          type="date" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default AddNewPatient;
