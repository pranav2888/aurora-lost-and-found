import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

function statusClass(status) {
  if (status === "Approved") return "status-approved";
  if (status === "Rejected") return "status-rejected";
  if (status === "Ready for Collection") return "status-ready";
  return "status-verification";
}

function ClaimStatusCard({ claim }) {
  const [showSlip, setShowSlip] = useState(false);

  // Prevent background scrolling and handle ESC key when slip is open
  useEffect(() => {
    if (showSlip) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") setShowSlip(false);
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [showSlip]);

  return (
    <div className="item-card claim-card">
      <div className="item-card-body">
        <div className="claim-card-header">
          <span className="item-card-category">Claim #{claim.claimId}</span>
          <span className={`status-badge ${statusClass(claim.status)}`}>
            {claim.status}
          </span>
        </div>

        <h3 className="item-card-title">{claim.itemTitle}</h3>
        <p className="item-card-meta">
          Submitted on <strong>{claim.submittedDate}</strong>
        </p>

        <p className="claim-summary">{claim.description}</p>

        <div className="claim-metadata-preview">
          <span><strong>Roll No:</strong> {claim.rollNumber || claim.formData?.rollNumber || "N/A"}</span>
          <span><strong>Contact:</strong> {claim.contact || "N/A"}</span>
        </div>

        <div className="item-card-actions" style={{ marginTop: "14px" }}>
          <Link to={`/edit-claim/${claim.claimId}`} className="btn btn-outline">
            Edit Claim
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowSlip(true)}
          >
            Verification Slip
          </button>
        </div>
      </div>

      {showSlip &&
        createPortal(
          <div
            className="claim-modal-overlay"
            onClick={() => setShowSlip(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="claim-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="claim-modal-header">
                <h3>Aurora Campus Security Verification Slip</h3>
                <button
                  type="button"
                  className="claim-modal-close"
                  onClick={() => setShowSlip(false)}
                  aria-label="Close verification slip"
                >
                  ×
                </button>
              </div>

              <div className="claim-slip-body">
                <div className="claim-slip-header-row">
                  <span className="claim-ref-tag">Ref: AUR-2026-{claim.claimId}</span>
                  <span className={`status-badge ${statusClass(claim.status)}`}>
                    {claim.status.toUpperCase()}
                  </span>
                </div>

                <div className="claim-slip-row">
                  <span>Item Name:</span>
                  <strong>{claim.itemTitle}</strong>
                </div>

                <div className="claim-slip-row">
                  <span>Claimant:</span>
                  <strong>{claim.studentName} ({claim.rollNumber || "23AI045"})</strong>
                </div>

                <div className="claim-slip-row">
                  <span>Submission Date:</span>
                  <strong>{claim.submittedDate}</strong>
                </div>

                <div className="claim-slip-row">
                  <span>Identifying Mark Provided:</span>
                  <p className="identifying-preview">
                    "{claim.formData?.identifyingMark || "Provided under private verification"}"
                  </p>
                </div>

                <div className="claim-slip-instructions">
                  <p>
                    📌 Present your College ID Card at the Campus Security Help Desk (Admin Block)
                    along with this Claim Slip to inspect and collect your item.
                  </p>
                </div>
              </div>

              <div className="claim-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => window.print()}
                >
                  Print Slip
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowSlip(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default ClaimStatusCard;