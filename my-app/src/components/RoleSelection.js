import React from "react";
import { useNavigate } from "react-router-dom";
import "./RoleSelection.css";

const RoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/${role}/login`);
  };

  return (
    <div className="role-selection-container">
      <div className="role-selection-content">
        <div className="role-selection-header">
          <div className="medical-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <h1 className="app-title">Sample EMR</h1>
          <p className="role-selection-subtitle">
            Choose your role to continue
          </p>
        </div>

        <div className="role-cards">
          <div
            className="role-card provider-card"
            onClick={() => handleRoleSelect("provider")}
          >
            <div className="role-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 8H17c-.8 0-1.54.37-2.01 1l-1.7 2.26V16h-1.5v6h6z" />
              </svg>
            </div>
            <h2 className="role-title">Healthcare Provider</h2>
            <p className="role-description">
              Doctors, nurses, and medical staff can access patient records,
              manage appointments, and provide care services.
            </p>
            <div className="role-features">
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Patient Management
              </div>
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Medical Records
              </div>
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Appointment Scheduling
              </div>
            </div>
            <button className="role-select-button">Continue as Provider</button>
          </div>

          <div
            className="role-card patient-card"
            onClick={() => handleRoleSelect("patient")}
          >
            <div className="role-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
            <h2 className="role-title">Patient</h2>
            <p className="role-description">
              Patients can view their medical records, schedule appointments,
              and communicate with healthcare providers.
            </p>
            <div className="role-features">
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                View Medical Records
              </div>
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Book Appointments
              </div>
              <div className="feature">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                Message Providers
              </div>
            </div>
            <button className="role-select-button">Continue as Patient</button>
          </div>
        </div>

        <div className="role-selection-footer">
          <p className="footer-text">Need help? Contact our support team</p>
          <div className="footer-links">
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <span className="separator">•</span>
            <a href="/terms" className="footer-link">
              Terms of Service
            </a>
            <span className="separator">•</span>
            <a href="/support" className="footer-link">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
