import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

const ForgotPassword = () => {
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

      // Simulate successful password reset request
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/login", {
          state: {
            message: "Password reset email sent! Please check your inbox.",
          },
        });
      }, 3000);
    } catch (error) {
      setError("Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-background">
        <div className="medical-pattern"></div>
      </div>

      <div className="forgot-password-card">
        <div className="forgot-password-header">
          <div className="logo-section">
            <div className="medical-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
            </div>
            <h1 className="app-title">Sample EMR</h1>
          </div>
          <h2 className="forgot-password-title">Forgot Password</h2>
          <p className="forgot-password-subtitle">
            Enter your email address and we'll send you a link to reset your
            password
          </p>
        </div>

        <form className="forgot-password-form" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              {error}
            </div>
          )}

          {isSuccess && (
            <div className="success-message">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Password reset email sent! Please check your inbox.
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="form-input"
              placeholder="Enter your email address"
              disabled={isLoading || isSuccess}
              autoComplete="email"
            />
          </div>

          <button
            type="submit"
            className={`reset-button ${isLoading ? "loading" : ""} ${
              isSuccess ? "success" : ""
            }`}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                <span>Sending Reset Email...</span>
              </>
            ) : isSuccess ? (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="success-icon"
                >
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>Email Sent!</span>
              </>
            ) : (
              <span>Send Reset Email</span>
            )}
          </button>
        </form>

        <div className="forgot-password-footer">
          <p className="footer-text">
            Remember your password?{" "}
            <Link to="/login" className="back-to-login-link">
              Back to Login
            </Link>
          </p>

          <p className="footer-text">
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              Register as Provider
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
