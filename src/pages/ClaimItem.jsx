import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addClaim, updateClaim } from "../redux/claimsSlice";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import "./Forms.css";

const emptyForm = {
  studentName: "",
  rollNumber: "",
  contact: "",
  lostLocation: "",
  lostDate: new Date().toISOString().slice(0, 10),
  lostTime: "",
  description: "",
  identifyingMark: "",
  additionalInfo: ""
};

function ClaimItem() {
  const { id, claimId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useUser();

  const items = useSelector((state) => state.items.items);
  const claims = useSelector((state) => state.claims.claims);

  const editing = Boolean(claimId);
  const existingClaim = editing
    ? claims.find((c) => c.claimId === Number(claimId))
    : null;

  const targetItemId = editing ? existingClaim?.itemId : Number(id);
  const item = items.find((i) => i.id === targetItemId);

  const [formData, setFormData] = useState({
    ...emptyForm,
    studentName: user?.name || "",
    rollNumber: user?.rollNumber || "23AI045"
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (existingClaim) {
      setFormData({
        ...emptyForm,
        ...(existingClaim.formData || {}),
        studentName: existingClaim.studentName || user?.name || "",
        rollNumber: existingClaim.rollNumber || user?.rollNumber || "23AI045",
        contact: existingClaim.contact || ""
      });
    }
  }, [existingClaim, user]);

  function validateField(name, value) {
    let error = "";
    if (name === "studentName" && (!value.trim() || value.trim().length < 2)) {
      error = "Full student name is required.";
    }
    if (name === "rollNumber" && !value.trim()) {
      error = "Campus roll number / Student ID is required.";
    }
    if (name === "contact" && (!value.trim() || value.trim().length < 6)) {
      error = "Valid phone number or contact is required.";
    }
    if (name === "lostLocation" && !value.trim()) {
      error = "Approximate lost location is required.";
    }
    if (name === "lostDate") {
      if (!value) error = "Date lost is required.";
      else if (value > todayStr) error = "Date cannot be in the future.";
    }
    if (name === "description" && (!value.trim() || value.trim().length < 10)) {
      error = "Description should be at least 10 characters.";
    }
    if (name === "identifyingMark" && (!value.trim() || value.trim().length < 4)) {
      error = "Please provide a specific identifying mark (sticker, contents, code).";
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

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {
      studentName: validateField("studentName", formData.studentName),
      rollNumber: validateField("rollNumber", formData.rollNumber),
      contact: validateField("contact", formData.contact),
      lostLocation: validateField("lostLocation", formData.lostLocation),
      lostDate: validateField("lostDate", formData.lostDate),
      description: validateField("description", formData.description),
      identifyingMark: validateField("identifyingMark", formData.identifyingMark)
    };

    setErrors(newErrors);
    setTouched({
      studentName: true,
      rollNumber: true,
      contact: true,
      lostLocation: true,
      lostDate: true,
      description: true,
      identifyingMark: true
    });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("Please fill in all verification fields accurately.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      if (editing) {
        if (!existingClaim || existingClaim.email !== user.email) {
          toast.error("You can only modify claims submitted by your account.");
          setIsSubmitting(false);
          return;
        }

        dispatch(
          updateClaim({
            claimId: Number(claimId),
            updates: {
              formData,
              studentName: formData.studentName.trim(),
              rollNumber: formData.rollNumber.trim(),
              contact: formData.contact.trim(),
              description: formData.description.trim()
            }
          })
        );
        toast.success("Claim verification details updated.");
      } else {
        const newClaimPayload = {
          itemId: item?.id || 0,
          itemTitle: item?.title || "Campus Item",
          studentName: formData.studentName.trim(),
          rollNumber: formData.rollNumber.trim(),
          contact: formData.contact.trim(),
          email: user.email,
          description: formData.description.trim(),
          formData
        };

        dispatch(addClaim(newClaimPayload));
        toast.success("Claim submitted! Review status in My Claims.");
      }

      setIsSubmitting(false);
      setSubmitted(true);
    }, 300);
  }

  if (!editing && !item) {
    return (
      <div className="container form-page">
        <div className="empty-claims">
          <h3>Item Not Found</h3>
          <p>The item you are attempting to claim is no longer available.</p>
          <Link to="/browse" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Return to Browse
          </Link>
        </div>
      </div>
    );
  }

  if (editing && !existingClaim) {
    return (
      <div className="container form-page">
        <div className="empty-claims">
          <h3>Claim Record Not Found</h3>
          <p>The claim you are attempting to edit could not be found.</p>
          <Link to="/my-claims" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Return to My Claims
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container form-page">
        <div className="success-box">
          <div className="success-icon">📋</div>
          <h2>
            {editing
              ? "Claim Details Updated"
              : "Claim Submitted — Under Verification"}
          </h2>
          <p>
            {editing
              ? "Your verification edits have been saved to the campus queue."
              : "Your claim has been submitted to campus security. Our team will verify your identifying marks."}
          </p>
          <div className="form-actions" style={{ justifyContent: "center", marginTop: "24px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/my-claims")}
            >
              Track in My Claims
            </button>
            <Link to="/browse" className="btn btn-outline">
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container form-page">
      <h1 className="section-title">{editing ? "Edit Claim" : "Claim Item"}</h1>
      <p className="section-subtitle">
        {editing
          ? "Update your claim details. Verified claims cannot be deleted to preserve audit trails."
          : "Provide details that only the authentic owner would know to prove ownership."}
      </p>

      {item && (
        <div className="claim-item-preview-banner">
          <img src={item.image} alt={item.title} className="claim-thumb" />
          <div className="claim-preview-info">
            <span className="item-card-category">{item.category}</span>
            <h3>{item.title}</h3>
            <p>
              📍 Found at: <strong>{item.location}</strong> on 📅 {item.date}
            </p>
          </div>
        </div>
      )}

      <form className="form-box" onSubmit={handleSubmit} noValidate>
        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="studentName">
              Full Name <span className="req-star">*</span>
            </label>
            <input
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.studentName && errors.studentName ? "input-error" : ""}
            />
            {touched.studentName && errors.studentName && (
              <p className="error-text">{errors.studentName}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">
              Campus Roll / Student ID <span className="req-star">*</span>
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
        </div>

        <div className="form-group">
          <label htmlFor="contact">
            Contact Number / WhatsApp <span className="req-star">*</span>
          </label>
          <input
            id="contact"
            name="contact"
            placeholder="e.g. +91 98765 43210"
            value={formData.contact}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.contact && errors.contact ? "input-error" : ""}
          />
          {touched.contact && errors.contact && (
            <p className="error-text">{errors.contact}</p>
          )}
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label htmlFor="lostLocation">
              Where do you think you lost it? <span className="req-star">*</span>
            </label>
            <input
              id="lostLocation"
              name="lostLocation"
              placeholder="e.g. Near Library 2nd floor desks"
              value={formData.lostLocation}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.lostLocation && errors.lostLocation ? "input-error" : ""}
            />
            {touched.lostLocation && errors.lostLocation && (
              <p className="error-text">{errors.lostLocation}</p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lostDate">
              Approximate Lost Date <span className="req-star">*</span>
            </label>
            <input
              id="lostDate"
              name="lostDate"
              type="date"
              max={todayStr}
              value={formData.lostDate}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.lostDate && errors.lostDate ? "input-error" : ""}
            />
            {touched.lostDate && errors.lostDate && (
              <p className="error-text">{errors.lostDate}</p>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">
            Describe the Item in Detail <span className="req-star">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            placeholder="Provide details of appearance, brands, scratches, and contents."
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.description && errors.description ? "input-error" : ""}
          />
          {touched.description && errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="identifyingMark">
            Unique Identifying Mark (Crucial for Verification) <span className="req-star">*</span>
          </label>
          <textarea
            id="identifyingMark"
            name="identifyingMark"
            rows="2"
            placeholder="e.g., Specific stickers, engraved initials, unique scratch on bottom, internal card numbers, or passcode pattern."
            value={formData.identifyingMark}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.identifyingMark && errors.identifyingMark ? "input-error" : ""}
          />
          {touched.identifyingMark && errors.identifyingMark && (
            <p className="error-text">{errors.identifyingMark}</p>
          )}
          <p className="form-hint">
            This information is private and reviewed only by security administrators.
          </p>
        </div>

        <div className="form-group">
          <label htmlFor="additionalInfo">Any Additional Supporting Information</label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows="2"
            placeholder="e.g. Class schedule when lost, witnesses, approximate time of day."
            value={formData.additionalInfo}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Submitting Verification..."
              : editing
              ? "Save Claim Edits"
              : "Submit Ownership Claim"}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/my-claims")}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ClaimItem;