import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";
import RoleSelection from "./components/RoleSelection";
import ProviderLogin from "./components/ProviderLogin";
import ProviderRegistration from "./components/ProviderRegistration";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import PatientLogin from "./components/PatientLogin";
import PatientRegistration from "./components/PatientRegistration";
import PatientDashboard from "./components/PatientDashboard";
import PatientForgotPassword from "./components/PatientForgotPassword";
import ProviderAvailability from "./components/ProviderAvailability";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: "#4caf50",
                secondary: "#fff",
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: "#f44336",
                secondary: "#fff",
              },
            },
          }}
        />
        <Routes>
          <Route path="/" element={<RoleSelection />} />

          {/* Provider Routes */}
          <Route path="/provider/login" element={<ProviderLogin />} />
          <Route path="/provider/register" element={<ProviderRegistration />} />
          <Route
            path="/provider/forgot-password"
            element={<ForgotPassword />}
          />
          <Route path="/provider/dashboard" element={<Dashboard />} />
          <Route
            path="/provider/availability"
            element={<ProviderAvailability />}
          />

          {/* Patient Routes */}
          <Route path="/patient/login" element={<PatientLogin />} />
          <Route path="/patient/register" element={<PatientRegistration />} />
          <Route
            path="/patient/forgot-password"
            element={<PatientForgotPassword />}
          />
          <Route path="/patient/dashboard" element={<PatientDashboard />} />

          {/* Legacy routes for backward compatibility */}
          <Route
            path="/login"
            element={<Navigate to="/provider/login" replace />}
          />
          <Route
            path="/register"
            element={<Navigate to="/provider/register" replace />}
          />
          <Route
            path="/forgot-password"
            element={<Navigate to="/provider/forgot-password" replace />}
          />
          <Route
            path="/dashboard"
            element={<Navigate to="/provider/dashboard" replace />}
          />

          {/* Static Pages */}
          <Route path="/privacy" element={<div>Privacy Policy Page</div>} />
          <Route path="/terms" element={<div>Terms of Service Page</div>} />
          <Route path="/support" element={<div>Support Page</div>} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
