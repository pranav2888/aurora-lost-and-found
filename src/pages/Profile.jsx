import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import ImageUpload from "../components/ImageUpload";
import cartoonAvatars from "../data/cartoonAvatars";
import "./Forms.css";

function Profile() {
  const { user, updateProfile, changePassword } = useUser();
  const toast = useToast();

  const [editing, setEditing] = useState(false);
  const [passwordEditing, setPasswordEditing] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    rollNumber: user?.rollNumber || "23AI045",
    department: user?.department || "CSE - AI/ML",
    photo: user?.photo || cartoonAvatars[0]
  });

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: ""
  });

  const [error, setError] = useState("");

  function handlePhotoUpload(base64) {
    setProfile((prev) => ({ ...prev, photo: base64 }));
  }

  function handleSelectPreset(svgUri) {
    setProfile((prev) => ({ ...prev, photo: svgUri }));
  }

  function startEditing() {
    setProfile({
      name: user?.name || "",
      email: user?.email || "",
      rollNumber: user?.rollNumber || "23AI045",
      department: user?.department || "CSE - AI/ML",
      photo: user?.photo || cartoonAvatars[0]
    });
    setEditing(true);
    setPasswordEditing(false);
    setError("");
  }

  function startPasswordEditing() {
    setPasswords({ current: "", newPassword: "", confirm: "" });
    setPasswordEditing(true);
    setEditing(false);
    setError("");
  }

  function saveProfile(e) {
    e.preventDefault();
    setError("");

    if (!profile.name.trim() || profile.name.trim().length < 2) {
      setError("Please provide a valid full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      setError("Please enter a valid campus email address.");
      return;
    }

    const nextEmail = profile.email.trim().toLowerCase();
    updateProfile({
      name: profile.name.trim(),
      email: nextEmail,
      rollNumber: profile.rollNumber.trim(),
      department: profile.department.trim(),
      photo: profile.photo
    });

    setEditing(false);
    toast.success("Profile updated successfully!");
  }

  function savePassword(e) {
    e.preventDefault();
    setError("");

    if (passwords.current !== user.password) {
      setError("Current password entered is incorrect.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirm) {
      setError("New passwords do not match.");
      return;
    }

    changePassword(passwords.newPassword);
    setPasswordEditing(false);
    setPasswords({ current: "", newPassword: "", confirm: "" });
    toast.success("Account password changed successfully!");
  }

  const userAvatar = user?.photo || cartoonAvatars[0];

  return (
    <div className="container form-page profile-page-clean">
      <h1 className="section-title">My Profile</h1>
      <p className="section-subtitle">
        Manage your Aurora student account details and password.
      </p>

      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
        </div>
      )}

      <div className="profile-single-card-wrap">
        {!editing && !passwordEditing ? (
          <div className="profile-display-card">
            <div className="profile-avatar-wrap">
              <img
                src={userAvatar}
                alt={user?.name}
                className="profile-avatar-cartoon"
              />
            </div>
            <h2>{user?.name}</h2>
            <p className="profile-email-text">{user?.email}</p>

            <div className="profile-info-grid">
              <div className="profile-info-item">
                <span className="info-label">Roll Number</span>
                <strong className="info-value">{user?.rollNumber || "23AI045"}</strong>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Department</span>
                <strong className="info-value">{user?.department || "CSE - AI/ML"}</strong>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Semester</span>
                <strong className="info-value">{user?.semester || "3rd Semester"}</strong>
              </div>
              <div className="profile-info-item">
                <span className="info-label">Status</span>
                <span className="status-badge status-approved">Active Student</span>
              </div>
            </div>

            <div className="profile-cta-buttons">
              <button
                type="button"
                className="btn btn-primary"
                onClick={startEditing}
              >
                Edit Profile
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={startPasswordEditing}
              >
                Change Password
              </button>
            </div>
          </div>
        ) : editing ? (
          <form className="form-box profile-form-box" onSubmit={saveProfile}>
            <h2>Edit Profile Details</h2>

            {/* Cartoon Avatar Selector */}
            <div className="cartoon-avatar-picker">
              <label className="image-upload-label">Select Cartoon Avatar</label>
              <div className="cartoon-avatars-row">
                {cartoonAvatars.map((avatarUri, idx) => (
                  <div
                    key={idx}
                    className={`cartoon-avatar-option ${profile.photo === avatarUri ? "selected" : ""}`}
                    onClick={() => handleSelectPreset(avatarUri)}
                  >
                    <img src={avatarUri} alt={`Cartoon Avatar ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>

            <ImageUpload
              label="Or Upload Custom Photo"
              hint="Upload an image from your device (Max 2MB)"
              value={profile.photo.startsWith("data:image/svg+xml") ? "" : profile.photo}
              onChange={handlePhotoUpload}
              aspectRatio="1/1"
              placeholderText="Upload custom photo"
            />

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Campus Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Roll Number</label>
                <input
                  type="text"
                  value={profile.rollNumber}
                  onChange={(e) => setProfile({ ...profile, rollNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Department</label>
                <input
                  type="text"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                />
              </div>
            </div>

            <div className="form-actions" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form className="form-box profile-form-box" onSubmit={savePassword}>
            <h2>Change Password</h2>
            <p className="form-hint" style={{ marginBottom: "18px" }}>
              Must be at least 6 characters long.
            </p>

            <div className="form-group password-group">
              <label>Current Password</label>
              <div className="password-input-wrap">
                <input
                  type={showPass ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
                <button
                  type="button"
                  className="toggle-pass-btn"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type={showPass ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type={showPass ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
              />
            </div>

            <div className="form-actions" style={{ justifyContent: "center" }}>
              <button className="btn btn-primary" type="submit">
                Update Password
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => setPasswordEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;