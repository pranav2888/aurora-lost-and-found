import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../context/ToastContext";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useUser();
  const { isDark, toggleTheme } = useTheme();
  const toast = useToast();
  const navigate = useNavigate();

  // Read saved items and claims counts directly from Redux Toolkit!
  const savedItems = useSelector((state) => state.items.savedItemIds);
  const claims = useSelector((state) => state.claims.claims);
  const userClaimsCount = user ? claims.filter((c) => c.email === user.email).length : 0;

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
    toast.info("Logged out successfully.");
    navigate("/");
  }

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          <span>Aurora</span>
          <span className="logo-dot">.</span>
        </NavLink>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "navbar-links open" : "navbar-links"}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/browse"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            Browse
            {savedItems.length > 0 && (
              <span className="nav-badge" title={`${savedItems.length} saved items`}>
                {savedItems.length}
              </span>
            )}
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/report"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                Report Item
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/my-claims"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                My Claims
                {userClaimsCount > 0 && (
                  <span className="nav-badge badge-teal">{userClaimsCount}</span>
                )}
              </NavLink>
              <NavLink
                to="/my-reports"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                My Reports
              </NavLink>
            </>
          )}
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            onClick={closeMenu}
          >
            About
          </NavLink>
        </nav>

        <div className="navbar-actions">
          {/* Theme Toggle Button (Context API feature demonstration) */}
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle dark/light theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>

          <div className="navbar-user">
            {user ? (
              <div className="user-profile-menu">
                <button
                  className="profile-nav"
                  onClick={() => {
                    closeMenu();
                    navigate("/profile");
                  }}
                  title="View Profile"
                >
                  <span className="profile-avatar small">
                    {user.photo ? (
                      <img src={user.photo} alt={user.name} />
                    ) : (
                      <span>{initial}</span>
                    )}
                  </span>
                  <span className="profile-nav-name">{user.name}</span>
                </button>
                <button
                  className="nav-logout"
                  onClick={handleLogout}
                  title="Logout"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="auth-nav">
                <NavLink to="/login" onClick={closeMenu}>
                  Login
                </NavLink>
                <NavLink to="/signup" className="nav-signup" onClick={closeMenu}>
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;