import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import "./Forms.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useUser();
  const toast = useToast();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter both email address and password.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const success = login(formData.email, formData.password);
      if (!success) {
        setError("Invalid email or password. Please check your credentials or Sign Up.");
        setIsLoading(false);
        return;
      }

      toast.success("Welcome back to Aurora!");
      setIsLoading(false);
      const destination = location.state?.from || "/dashboard";
      navigate(destination, { replace: true });
    }, 250);
  }

  return (
    <div className="container form-page auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <span className="auth-logo-badge">Aurora</span>
          <h1 className="section-title">Welcome Back</h1>
          <p className="section-subtitle">
            Login to manage your campus reports and track claims.
          </p>
        </div>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <form className="form-box" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Campus Email</label>
            <input
              id="login-email"
              type="email"
              placeholder="e.g. pranav@aurora.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              autoComplete="email"
            />
          </div>

          <div className="form-group password-group">
            <label htmlFor="login-password">Password</label>
            <div className="password-input-wrap">
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            className="btn btn-primary full-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <p className="auth-switch">
            Don't have an account yet?{" "}
            <Link to="/signup" className="inline-link">
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;