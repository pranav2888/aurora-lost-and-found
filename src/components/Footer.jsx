import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-col">
          <div className="footer-brand">
            <span className="footer-brand-title">Aurora</span>
          </div>
          <p>A campus lost and found platform built by students, for students.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <p><Link to="/browse">Browse Found Items</Link></p>
          <p><Link to="/report">Report Found Item</Link></p>
          <p><Link to="/my-claims">My Claims</Link></p>
        </div>

        <div className="footer-col">
          <h4>Contact</h4>
          <p>Campus Help Desk, Admin Block</p>
          <p><a href="mailto:Aurora.support@campus.edu">Aurora.support@campus.edu</a></p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner" style={{ justifyContent: "center" }}>
          <p className="footer-copy">© 2026 Aurora. A student project.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;