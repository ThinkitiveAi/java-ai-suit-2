import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    navigate("/");
  };

  const handleBackToRoleSelection = () => {
    navigate("/");
  };

  return (
    <div className="patient-dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <button
            onClick={handleBackToRoleSelection}
            className="back-button"
            aria-label="Back to role selection"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
            </svg>
          </button>
          <div className="patient-icon">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h1 className="app-title">Patient Portal</h1>
        </div>
        <button onClick={handleLogout} className="logout-button">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
          </svg>
          Logout
        </button>
      </nav>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="welcome-section">
            <h2 className="welcome-title">Welcome to Your Patient Portal</h2>
            <p className="welcome-subtitle">
              Manage your healthcare journey with ease and convenience.
            </p>
            {location.state?.message && (
              <div className="success-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                {location.state.message}
              </div>
            )}
          </div>

          <div className="dashboard-cards">
            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                </svg>
              </div>
              <h3 className="card-title">Medical Records</h3>
              <p className="card-description">
                View your complete medical history, test results, and treatment
                plans.
              </p>
              <button className="card-button">View Records</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
              </div>
              <h3 className="card-title">Appointments</h3>
              <p className="card-description">
                Schedule, reschedule, or cancel appointments with your
                healthcare providers.
              </p>
              <button className="card-button">Manage Appointments</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                </svg>
              </div>
              <h3 className="card-title">Messages</h3>
              <p className="card-description">
                Communicate securely with your healthcare team and receive
                important updates.
              </p>
              <button className="card-button">Open Messages</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <h3 className="card-title">Prescriptions</h3>
              <p className="card-description">
                View and manage your current prescriptions and medication
                history.
              </p>
              <button className="card-button">View Prescriptions</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </div>
              <h3 className="card-title">Health Summary</h3>
              <p className="card-description">
                Get a comprehensive overview of your health status and recent
                activities.
              </p>
              <button className="card-button">View Summary</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <h3 className="card-title">Provider Directory</h3>
              <p className="card-description">
                Find and connect with healthcare providers in your network.
              </p>
              <button className="card-button">Find Providers</button>
            </div>
          </div>

          <div className="quick-actions">
            <h3 className="quick-actions-title">Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                </svg>
                Book New Appointment
              </button>
              <button className="action-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                Send Message
              </button>
              <button className="action-button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
