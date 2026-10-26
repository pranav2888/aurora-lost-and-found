import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ClaimStatusCard from "../components/ClaimStatusCard";
import { useUser } from "../context/UserContext";
import "./MyClaims.css";

function MyClaims() {
  const claims = useSelector((state) => state.claims.claims);
  const { user } = useUser();
  const myClaims = claims.filter((claim) => claim.email === user?.email);

  return (
    <div className="container form-page">
      <div className="dashboard-header-block">
        <div>
          <h1 className="section-title">My Submitted Claims</h1>
          <p className="section-subtitle">
            Track verification progress and view campus security release slips for your claims.
          </p>
        </div>
        <Link to="/browse" className="btn btn-primary">
          Browse More Items
        </Link>
      </div>

      {myClaims.length === 0 ? (
        <div className="empty-claims">
          <div className="empty-icon">🏷️</div>
          <h3>You haven't submitted any claims yet</h3>
          <p>
            Lost an item on campus? Browse the found listings and submit identifying details to reclaim it.
          </p>
          <Link to="/browse" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Browse Found Items
          </Link>
        </div>
      ) : (
        <div className="items-grid">
          {myClaims.map((claim) => (
            <ClaimStatusCard key={claim.claimId} claim={claim} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyClaims;