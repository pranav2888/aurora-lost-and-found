import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import ImageUpload from "../components/ImageUpload";
import cartoonAvatars from "../data/cartoonAvatars";
import "./Forms.css";

function Signup() {
  const navigate = useNavigate();
  const { signup } = useUser();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    department: "CSE - AI/ML",
    password: "",
    confirmPassword: "",
    photo: cartoonAvatars[0]
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validateField(name, value) {
    let error = "";
    if (name === "name" && (!value.trim() || value.trim().length < 2)) {
      error = "Full name must be at least 2 characters.";
    }
    if (name === "email") {
      if (!value.trim()) error = "Email address is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        error = "Please enter a valid email format.";
      }
    }
    if (name === "rollNumber" && !value.trim()) {
      error = "Roll number / Student ID is required.";
    }
    if (name === "password") {
      if (!value) error = "Password is required.";
      else if (value.length < 6) error = "Password must be at least 6 characters.";
    }
    if (name === "confirmPassword") {
      if (!value) error = "Please confirm your password.";
      else if (value !== formData.password) error = "Passwords do not match.";
    }
    return error;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const fieldError = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: fieldError }));
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const fieldError = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  }

  function handlePhotoChange(base64Uri) {
    setFormData((prev) => ({ ...prev, photo: base64Uri }));
  }

  function getPasswordStrength(pwd) {
    if (!pwd) return { label: "None", percent: 0, color: "#ccc" };
    if (pwd.length < 6) return { label: "Too Short", percent: 25, color: "#E76F6F" };
    if (pwd.length >= 6 && /[0-9]/.test(pwd) && /[A-Z]/.test(pwd)) {
      return { label: "Strong", percent: 100, color: "#4CAF7D" };
    }
    return { label: "Good", percent: 65, color: "#F2B84B" };
  }

  const pwdStrength = getPasswordStrength(formData.password);

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      rollNumber: validateField("rollNumber", formData.rollNumber),
      password: validateField("password", formData.password),
      confirmPassword: validateField("confirmPassword", formData.confirmPassword)
    };

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      rollNumber: true,
      password: true,
      confirmPassword: true
    });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("Please correct the form errors before submitting.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      signup(formData);
      toast.success("Account created successfully! Welcome to Aurora.");
      setIsSubmitting(false);
      navigate("/dashboard");
    }, 250);
  }

  return (
    <div className="container form-page auth-page">
      <div className="auth-card" style={{ maxWidth: "560px" }}>
        <div className="auth-header">
          <span className="auth-logo-badge">Aurora</span>
          <h1 className="section-title">Create Account</h1>
          <p className="section-subtitle">
            Join the campus lost-and-found community in seconds.
          </p>
        </div>

        <form className="form-box" onSubmit={handleSubmit} noValidate>
          {/* Cartoon Avatar Picker */}
          <div className="cartoon-avatar-picker">
            <label className="image-upload-label">Choose a Cartoon Avatar</label>
            <div className="cartoon-avatars-row">
              {cartoonAvatars.map((avatarUri, idx) => (
                <div
                  key={idx}
                  className={`cartoon-avatar-option ${formData.photo === avatarUri ? "selected" : ""}`}
                  onClick={() => setFormData((prev) => ({ ...prev, photo: avatarUri }))}
                >
                  <img src={avatarUri} alt={`Cartoon Avatar ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <ImageUpload
            label="Or Upload Custom Photo (Optional)"
            hint="Upload an image from your device (Max 2MB)"
            value={formData.photo.startsWith("data:image/svg+xml") ? "" : formData.photo}
            onChange={handlePhotoChange}
            aspectRatio="1/1"
            placeholderText="Upload your student photo"
          />

          <div className="form-group">
            <label htmlFor="name">
              Full Name <span className="req-star">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Pranav Sharma"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.name && errors.name ? "input-error" : ""}
            />
            {touched.name && errors.name && (
              <p className="error-text">{errors.name}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Campus Email Address <span className="req-star">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. student@aurora.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.email && errors.email ? "input-error" : ""}
            />
            {touched.email && errors.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="rollNumber">
                Roll Number / ID <span className="req-star">*</span>
              </label>
              <input
                id="rollNumber"
                name="rollNumber"
                placeholder="e.g. 23AI045"
                value={formData.rollNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.rollNumber && errors.rollNumber ? "input-error" : ""}
              />
              {touched.rollNumber && errors.rollNumber && (
                <p className="error-text">{errors.rollNumber}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="CSE - AI/ML">CSE - AI/ML</option>
                <option value="CSE - Core">CSE - Core</option>
                <option value="Information Tech">Information Tech</option>
                <option value="Electronics & Comm">Electronics & Comm</option>
                <option value="Mechanical Engg">Mechanical Engg</option>
              </select>
            </div>
          </div>

          <div className="form-group password-group">
            <label htmlFor="password">
              Password <span className="req-star">*</span>
            </label>
            <div className="password-input-wrap">
              <input
                id="password"
                name="password"
                type={showPass ? "text" : "password"}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.password && errors.password ? "input-error" : ""}
              />
              <button
                type="button"
                className="toggle-pass-btn"
                onClick={() => setShowPass(!showPass)}
                aria-label="Toggle password visibility"
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
            {formData.password && (
              <div className="pwd-strength-bar-wrap">
                <div
                  className="pwd-strength-bar"
                  style={{
                    width: `${pwdStrength.percent}%`,
                    backgroundColor: pwdStrength.color
                  }}
                ></div>
                <span className="pwd-strength-text" style={{ color: pwdStrength.color }}>
                  Strength: {pwdStrength.label}
                </span>
              </div>
            )}
            {touched.password && errors.password && (
              <p className="error-text">{errors.password}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password <span className="req-star">*</span>
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPass ? "text" : "password"}
              placeholder="Re-enter password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.confirmPassword && errors.confirmPassword ? "input-error" : ""}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            className="btn btn-primary full-button"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Complete Registration"}
          </button>

          <p className="auth-switch">
            Already have an Aurora account?{" "}
            <Link to="/login" className="inline-link">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;