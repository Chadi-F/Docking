// src/pages/AboutUs.js
import React from 'react';
import './AboutUs.css'; // Optional: Add some styling
import './AboutUs.css'; 
const AboutUs = () => {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to DocInc, your reliable partner in managing healthcare services.
        Our platform is designed to empower doctors and healthcare professionals
        by streamlining the process of patient management, billing, and service
        delivery.
      </p>
      <p>
        At DocInc, we understand the challenges that healthcare providers face
        daily. That's why we have created a modern, user-friendly web portal that
        enhances efficiency, performance, and security. Our goal is to simplify
        administrative tasks, allowing healthcare providers to focus on what
        matters most: patient care.
      </p>
      <p>
        Our features include:
      </p>
      <ul>
        <li>Easy patient information retrieval</li>
        <li>Streamlined billing services through a secure API</li>
        <li>User roles for doctors and assistants to manage tasks efficiently</li>
        <li>Form submission for services offered to patients</li>
        <li>Capability to add new patients and review past submissions</li>
      </ul>
      <p>
        Join us at DocInc as we transform the way healthcare is delivered. Our
        commitment to innovation ensures that you have the tools needed to provide
        the best care possible.
      </p>
      <p>
        Thank you for choosing DocInc. We are excited to be part of your healthcare journey!
      </p>
    </div>
  );
};

export default AboutUs;
