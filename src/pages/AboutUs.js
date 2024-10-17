import React, { useState } from 'react';
import './AboutUs.css'; 

const CollapsibleSection = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="collapsible-section">
            <div className="collapsible-header" onClick={toggle}>
                {title}
            </div>
            <div className={`collapsible-content ${isOpen ? 'open' : ''}`}>
                {content}
            </div>
        </div>
    );
};


const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            
            <CollapsibleSection 
                title="Our Mission"
                content={
                    <>
                        <p>
                            At DocInc, we understand the challenges that healthcare providers face
                            daily. That's why we have created a modern, user-friendly web portal that
                            enhances efficiency, performance, and security. Our goal is to simplify
                            administrative tasks, allowing healthcare providers to focus on what
                            matters most: patient care.
                        </p>
                    </>
                }
            />
            <CollapsibleSection 
                title="Our Features"
                content={
                    <>
                        <p>Our features include:</p>
                        <ul>
                            <li>Easy patient information retrieval</li>
                            <li>Streamlined billing services through a secure API</li>
                            <li>User roles for doctors and assistants to manage tasks efficiently</li>
                            <li>Form submission for services offered to patients</li>
                            <li>Capability to add new patients and review past submissions</li>
                        </ul>
                    </>
                }
            />
            <CollapsibleSection 
                title="Join Us"
                content={
                    <>
                        <p>
                            As we transform the way healthcare is delivered. Our
                            commitment to innovation ensures that you have the tools needed to provide
                            the best care possible.
                        </p>
                        <p>
                            Thank you for choosing DocInc. We are excited to be part of your healthcare journey!
                        </p>
                    </>
                }
            />
        </div>
    );
};

export default AboutUs;
