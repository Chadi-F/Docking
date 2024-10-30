import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Billing.css';
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const [ramqNumber, setRamqNumber] = useState('');
  const [service_code, setServiceId] = useState('');
  const [bills, setBills] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);
  const [serviceInfo, setServiceInfo] = useState(null); // State to store service info
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch patient information based on RAMQ ID
  const handleSearchPatient = async () => {
    try {
      const response = await fetch(`http://localhost:5000/patient/${ramqNumber}`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched patient data:", data); // Log the fetched data
        setPatientInfo(data.patient); // Store patient info if found
        setError(''); // Clear any previous error
      } else {
        throw new Error('Patient not found');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
      setPatientInfo(null); // Clear any previous patient info
      setError('Patient not found. Please check the RAMQ ID.');
    }
  };

  // Fetch service information based on Service ID
  const handleSearchService = async () => {
    try {
      const response = await fetch(`http://localhost:5000/service/${service_code}`, { 
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched service data:", data); // Log the fetched data
        setServiceInfo(data.serviceValue); // Store service info if found
        setError(''); // Clear any previous error
      } else {
        throw new Error('Service not found');
      }
    } catch (error) {
      console.error('Error fetching service:', error);
      setServiceInfo(null); // Clear any previous service info
      setError('Service not found. Please check the Service ID.');
    }
  };

  const handleSubmitBill = async (e) => {
    e.preventDefault();
    const billData = { rammqId: ramqNumber, serviceId: service_code };

    try {
      const response = await fetch('https://localhost:5000/submit-bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billData),
      });

      if (response.ok) {
        const data = await response.json();
        setBills((prevBills) => [...prevBills, { ...billData, amount: data.amount }]);
        setRamqNumber('');
        setServiceId('');
        setError(''); // Clear error if successful
      } else {
        throw new Error('Failed to submit bill');
      }
    } catch (error) {
      console.error('Error submitting bill:', error);
      setError('Could not submit the bill. Please try again.');
    }
  };

  const handleDeleteBills = () => {
    const remainingBills = bills.filter((bill) => !selectedBills.includes(bill.rammqId));
    setBills(remainingBills);
    setSelectedBills([]);
  };

  const handleSelectBill = (ramqId) => {
    setSelectedBills((prevSelected) =>
      prevSelected.includes(ramqId)
        ? prevSelected.filter((id) => id !== ramqId)
        : [...prevSelected, ramqId]
    );
  };

  return (
    <div className="container mt-5">
      {/* Back to Dashboard Button */}
      <button onClick={() => navigate('/dashboard')} className="btn btn-secondary mb-4">
        Back to Dashboard
      </button>

      <h2 className="mb-4 text-center">Billing Session</h2>

      {/* Search Field for RAMQ ID */}
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

      {/* Display Patient Information if Found */}
      {patientInfo && (
        <div className="patient-info mb-4">
          <h4>Patient Information</h4>
          <div className='row'>
            <div className='col-md-4'>
            <p><strong>First Name:</strong> {patientInfo.first_name}</p>
            </div>
            <div className='col-md-4'>
            <p><strong>Last Name:</strong> {patientInfo.last_name}</p>
            </div>
            <div className='col-md-4'>
            <p><strong>Date of Birth:</strong> {patientInfo.date_of_birth}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-4'>
            <p><strong>Phone Number:</strong> {patientInfo.phone_number}</p>
            </div>
            <div className='col-md-4'>
            <p><strong>Email:</strong> {patientInfo.email}</p>
            </div>
          </div>
            <div className='col-md-4'>
            <p><strong>Gender:</strong> {patientInfo.gender}</p>
            </div>
        </div>
      )}

      {/* Form to Submit a Bill */}
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
          <div className="form-group col-md-6">
            <button type="button" onClick={handleSearchService} className="btn btn-primary">Search Service</button>
          </div>
        </div>
        {serviceInfo && (
          <div className="service-info mb-4">
            <h4>Service Information</h4>
            <div className='row'>
            <div className='col-md-4'>
            <p><strong>Title:</strong> {serviceInfo.title}</p>
            </div>
            <div className='col-md-4'>
            <p><strong>Description:</strong> {serviceInfo.description}</p>
            </div>
            <div className='col-md-4'>
            <p><strong>Monetary Value:</strong> ${serviceInfo.monetary_value}</p>
            </div>
            </div>
          </div>
        )}
        <button type="submit" className="btn btn-primary">Submit Bill</button>
      </form>

      {/* Submitted Bills Table */}
      <h3 className="mb-3">Submitted Bills</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>RAMQ ID</th>
            <th>Service ID</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill.rammqId}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBills.includes(bill.rammqId)}
                  onChange={() => handleSelectBill(bill.rammqId)}
                />
              </td>
              <td>{bill.rammqId}</td>
              <td>{bill.serviceId}</td>
              <td>{bill.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn btn-danger" onClick={handleDeleteBills} disabled={selectedBills.length === 0}>
        Delete Selected Bills
      </button>
    </div>
  );
};

export default Billing;
