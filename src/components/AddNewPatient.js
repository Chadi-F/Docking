import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddNewPatient.css';

const AddNewPatient = ({ onPatientAdded, isDarkMode }) => {
  const [rammqId, setRammqId] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [dob, setDob] = useState('');

  const handleNewPatientSubmit = async (e) => {
    e.preventDefault();

    const newPatientData = { rammqId, newFullName, dob };

    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPatientData),
      });

      if (response.ok) {
        onPatientAdded();
        setRammqId('');
        setNewFullName('');
        setDob('');
      } else {
        console.error('Failed to add patient:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div className="add-patient-background">
      <form onSubmit={handleNewPatientSubmit} className={`p-3 ${isDarkMode ? 'form-dark' : 'form-light'}`}>
        <h2 className="mb-4">Add New Patient</h2>
        <div className="form-group mb-3">
          <label htmlFor="rammqId" className="form-label">RAMMQ ID:</label>
          <input
            type="text"
            className="form-control"
            id="rammqId"
            value={rammqId}
            onChange={(e) => setRammqId(e.target.value)}
            placeholder="Enter RAMMQ ID"
            required
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="fullName" className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="dob" className="form-label">Date of Birth:</label>
          <input
            type="date"
            className="form-control"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Patient</button>
      </form>
    </div>
  );
};

export default AddNewPatient;
