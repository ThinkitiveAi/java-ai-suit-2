import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PatientForgotPassword.css";

const PatientForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful password reset
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/patient/login", {
          state: {
            message: "Password reset email sent! Please check your inbox.",
          },
        });
      }, 2000);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToRoleSelection = () => {
    navigate("/");
  };

  const handleBackToLogin = () => {
    navigate("/patient/login");
  };

  return (
    <div className="patient-forgot-password-container">
      <div className="forgot-password-card">
        <div className="forgot-password-header">
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
          <h1 className="forgot-password-title">Reset Your Password</h1>
          <p className="forgot-password-subtitle">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        {isSuccess ? (
          <div className="success-section">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 className="success-title">Email Sent!</h2>
            <p className="success-message">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions.
            </p>
            <div className="success-actions">
              <button
                onClick={handleBackToLogin}
                className="back-to-login-button"
              >
                Back to Login
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="forgot-password-form">
            {error && (
              <div className="error-message">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email address"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`reset-button ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <div className="forgot-password-footer">
          <p className="footer-text">
            Remember your password?{" "}
            <button
              onClick={handleBackToLogin}
              className="login-link"
              disabled={isLoading}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientForgotPassword;
