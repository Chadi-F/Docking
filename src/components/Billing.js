import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Billing.css';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const [ramqNumber, setRamqNumber] = useState('');
  const [service_code, setServiceId] = useState('');
  const [bills, setBills] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [serviceInfo, setServiceInfo] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearchPatient = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient/${ramqNumber}`);
      if (response.ok) {
        const data = await response.json();
        setPatientInfo(data.patient);
        setError('');
      } else throw new Error('Patient not found');
    } catch {
      setPatientInfo(null);
      setError('Patient not found. Please check the RAMQ ID.');
    }
  };

  const handleSearchService = async () => {
    try {
      const response = await fetch(`http://localhost:5000/service/${service_code}`);
      if (response.ok) {
        const data = await response.json();
        setServiceInfo(data.serviceValue);
        setError('');
      } else throw new Error('Service not found');
    } catch {
      setServiceInfo(null);
      setError('Service not found. Please check the Service ID.');
    }
  };

  const handleSubmitBill = (e) => {
    e.preventDefault();
    const newBill = {
      ramqId: ramqNumber,
      serviceId: service_code,
      patient: patientInfo,
      service: serviceInfo,
      amount: serviceInfo?.monetary_value || 0,
    };

    if (isEditing !== null) {
      const updatedBills = [...bills];
      updatedBills[isEditing] = newBill;
      setBills(updatedBills);
      setIsEditing(null);
    } else {
      setBills((prevBills) => [...prevBills, newBill]);
    }

    setRamqNumber('');
    setServiceId('');
    setPatientInfo(null);
    setServiceInfo(null);
  };

  const handleEditClick = (index) => {
    const billToEdit = bills[index];
    setRamqNumber(billToEdit.ramqId);
    setServiceId(billToEdit.serviceId);
    setPatientInfo(billToEdit.patient);
    setServiceInfo(billToEdit.service);
    setIsEditing(index);
  };

  const handleDeleteRow = (index) => {
    setBills((prevBills) => prevBills.filter((_, i) => i !== index));
  };

  const handleDeleteAllBills = () => {
    setBills([]);
  };

  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }
  

  const handleSubmitAllBills = async () => {
    try {
      const response = await fetch('http://localhost:5000/submit-bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bills.map((bill) => ({
          user_id: 1,
          service_id: bill.service.id,
          patient_id: bill.patient.id,
          amount: bill.amount,
          status: 'sent',
          created_at: getTodayDate(),
          updated_at: getTodayDate(),
        })))
      });

      if (!response.ok) throw new Error('Failed to submit bills');
      setBills([]);
      setError('');
    } catch {
      setError('Could not submit the bills. Please try again.');
    }
  };

  // New function to handle the cancel action
  const handleCancel = () => {
    setRamqNumber('');
    setServiceId('');
    setPatientInfo(null);
    setServiceInfo(null);
    setIsEditing(null);
    setError('');
  };

  return (
    <div className="container mt-5">
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-4">Back to Dashboard</button>
      <h2 className="mb-4 text-center">Billing Session</h2>

      <div className="form-group mb-4">
        <label htmlFor="searchRammqId">Search by RAMQ ID:</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="searchRammqId"
            value={ramqNumber}
            onChange={(e) => setRamqNumber(e.target.value)}
            placeholder="Enter RAMQ ID"
          />
          <button onClick={handleSearchPatient} className="btn btn-primary">Search</button>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {patientInfo && (
        <div className="patient-info mb-4">
          <h4>Patient Information</h4>
          <input type="hidden" value={patientInfo.id} />
          <div className="mb-4">
            <p><strong>First Name:</strong> {patientInfo.first_name}</p>
          </div>
          <div className="mb-4">
            <p><strong>Last Name:</strong> {patientInfo.last_name}</p>
          </div>
          <div className="mb-4">
            <p><strong>Date of Birth:</strong> {patientInfo.date_of_birth}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmitBill} className="mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="serviceId">Service ID:</label>
            <input
              type="text"
              className="form-control"
              id="serviceId"
              value={service_code}
              onChange={(e) => setServiceId(e.target.value)}
              placeholder="Enter Service ID"
              required
            />
          </div>
          <button type="button" onClick={handleSearchService} className="btn btn-primary">Search Service</button>
        </div>

        {serviceInfo && (
          <div className="service-info mb-4">
            <h4>Service Information</h4>
            <input type="hidden" value={serviceInfo.id} />
            <div className="mb-4">
              <p><strong>Title:</strong> {serviceInfo.title}</p>
            </div>
            <div className="mb-4">
              <p><strong>Description:</strong> {serviceInfo.description}</p>
            </div>
            <div className="mb-4">
              <p><strong>Monetary Value:</strong> ${serviceInfo.monetary_value}</p>
            </div>
          </div>
        )}

        { serviceInfo && patientInfo && (
          <div className="">

                  <button type="submit" className="btn btn-primary mt-3">{isEditing !== null ? 'Update Bill' : 'Add Bill'}</button>
                  <button type="button" onClick={handleCancel} className="btn btn-secondary mt-3 ml-2">Cancel</button>
                  </div>
        )}
        
      </form>

      <h3 className="mb-3">Submitted Bills</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>RAMQ ID</th>
            <th>Service ID</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill, index) => (
            <tr key={`${bill.ramqId}-${index}`}>
              <td>{bill.ramqId}</td>
              <td>{bill.serviceId}</td>
              <td>{bill.amount}</td>
              <td>
                <span onClick={() => handleEditClick(index)} style={{ cursor: 'pointer', marginRight: '10px' }}>
                  <i className="bi bi-pencil-square"></i>
                </span>
                <span onClick={() => handleDeleteRow(index)} style={{ cursor: 'pointer', color: 'red' }}>
                  <i className="bi bi-trash"></i>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bills.length > 0 && (
      <div>
      <button className="btn btn-danger" onClick={handleDeleteAllBills}>
        Delete All Bills
      </button>

      {/* Submit Bill Button at the end */}
      <button onClick={handleSubmitAllBills} className="btn btn-primary mt-3">Submit All Bills</button>
      </div>        
      )}



    </div>
  );
};

export default Billing;
