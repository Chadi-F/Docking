// src/components/PatientForm.js
import React, { useState } from 'react';
import { auth } from '../FirebaseConfig'; // Optional if using Firebase for authentication
import './PatientForm.css';

const PatientForm = () => {
  const [patientId, setPatientId] = useState('');
  const [fullName, setFullName] = useState('');
  const [serviceCode, setServiceCode] = useState('');
  const [submittedForms, setSubmittedForms] = useState([]);

  // Simulate fetching patient's full name based on Patient ID
  const fetchPatientName = async () => {
    // Simulate an API call to get the patient's full name
    // Replace with actual API call to get the patient details
    setFullName('John Doe'); // Example response
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Prepare data for API submission
    const formData = {
      patientId,
      fullName,
      serviceCode,
      submittedAt: new Date().toLocaleString(),
    };

    // Simulate sending data to API
    console.log("Submitting data to API", formData);
    
    // Update submitted forms list
    setSubmittedForms([...submittedForms, formData]);

    // Clear form
    setPatientId('');
    setFullName('');
    setServiceCode('');
  };

  const handleFormDelete = (index) => {
    const updatedForms = submittedForms.filter((_, i) => i !== index);
    setSubmittedForms(updatedForms);
  };

  return (
    <div className="patient-form">
      <h2>Submit Patient Service Information</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Patient ID:</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            onBlur={fetchPatientName} // Fetch the name when the user leaves the Patient ID field
            required
          />
        </div>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Service Code:</label>
          <input
            type="text"
            value={serviceCode}
            onChange={(e) => setServiceCode(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      <h3>Submitted Forms</h3>
      <ul>
        {submittedForms.map((form, index) => (
          <li key={index}>
            {form.fullName} - {form.serviceCode} (Submitted at: {form.submittedAt})
            <button onClick={() => handleFormDelete(index)}>Delete</button>
            {/* Add functionality for modification if needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientForm;
