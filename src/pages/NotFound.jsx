import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container form-page">
      <div className="empty-claims" style={{ maxWidth: "540px", margin: "60px auto" }}>
        <div className="empty-icon" style={{ fontSize: "56px" }}>🔍</div>
        <h1 style={{ fontSize: "36px", color: "var(--teal-dark)", margin: "12px 0 6px" }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "24px" }}>
          The page or item route you are looking for does not exist on Aurora.
        </p>
        <div className="form-actions" style={{ justifyContent: "center" }}>
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link to="/browse" className="btn btn-outline">
            Browse Items
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;