import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addItem, updateItem } from "../redux/itemSlice";
import { useUser } from "../context/UserContext";
import { useToast } from "../context/ToastContext";
import ImageUpload from "../components/ImageUpload";
import "./Forms.css";

const initialForm = {
  itemName: "",
  category: "Electronics",
  location: "",
  date: new Date().toISOString().slice(0, 10),
  time: "",
  condition: "Good",
  description: "",
  publicDetails: "",
  image: ""
};

const categoryFallbacks = {
  Electronics: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80",
  Bags: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  Stationery: "https://images.unsplash.com/photo-1648201637025-1c77b9be3013?auto=format&fit=crop&w=600&q=80",
  "ID Cards": "https://images.unsplash.com/photo-1671376354112-6de3d08b97af?auto=format&fit=crop&w=600&q=80",
  Books: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&q=80",
  Accessories: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
  "Personal Items": "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
  Other: "https://images.unsplash.com/photo-1636015856875-00ce4b89433d?auto=format&fit=crop&w=600&q=80"
};

function ReportFoundItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const { user } = useUser();

  const items = useSelector((state) => state.items.items);
  const editing = Boolean(id);
  const existingItem = editing ? items.find((item) => item.id === Number(id)) : null;

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const todayStr = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (existingItem) {
      setFormData({
        itemName: existingItem.title || "",
        category: existingItem.category || "Electronics",
        location: existingItem.location || "",
        date: existingItem.date || todayStr,
        time: existingItem.time || "",
        condition: existingItem.condition || "Good",
        description: existingItem.description || "",
        publicDetails: existingItem.publicDetails || "",
        image: existingItem.image || ""
      });
    }
  }, [id, existingItem, todayStr]);

  function validateField(name, value) {
    let error = "";
    if (name === "itemName") {
      if (!value.trim()) error = "Item name is required.";
      else if (value.trim().length < 2) error = "Item name must be at least 2 characters.";
    }
    if (name === "location") {
      if (!value.trim()) error = "Location where item was found is required.";
    }
    if (name === "date") {
      if (!value) error = "Date found is required.";
      else if (value > todayStr) error = "Date cannot be in the future.";
    }
    if (name === "description") {
      if (!value.trim()) error = "Item description is required.";
      else if (value.trim().length < 10) error = "Description should be at least 10 characters.";
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

  function handleImageChange(base64Uri) {
    setFormData((prev) => ({ ...prev, image: base64Uri }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      itemName: validateField("itemName", formData.itemName),
      location: validateField("location", formData.location),
      date: validateField("date", formData.date),
      description: validateField("description", formData.description)
    };

    setErrors(newErrors);
    setTouched({
      itemName: true,
      location: true,
      date: true,
      description: true
    });

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) {
      toast.error("Please fill in all required fields accurately.");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      title: formData.itemName.trim(),
      category: formData.category,
      location: formData.location.trim(),
      date: formData.date,
      time: formData.time || "Not specified",
      condition: formData.condition,
      description: formData.description.trim(),
      publicDetails:
        formData.publicDetails.trim() ||
        formData.description.trim().slice(0, 80) + "...",
      image:
        formData.image ||
        categoryFallbacks[formData.category] ||
        categoryFallbacks["Personal Items"],
      createdBy: user.email
    };

    setTimeout(() => {
      if (editing) {
        if (!existingItem || existingItem.createdBy !== user.email) {
          toast.error("You can only edit items reported by your account.");
          setIsSubmitting(false);
          return;
        }
        dispatch(updateItem({ id: Number(id), updates: payload }));
        toast.success("Item report updated successfully!");
      } else {
        dispatch(addItem(payload));
        toast.success("Found item reported to campus catalog!");
      }
      setIsSubmitting(false);
      setSubmitted(true);
    }, 300);
  }

  if (editing && !existingItem) {
    return (
      <div className="container form-page">
        <div className="empty-claims">
          <h3>Reported Item Not Found</h3>
          <p>The item you are attempting to edit does not exist.</p>
          <Link to="/my-reports" className="btn btn-primary" style={{ marginTop: "16px" }}>
            Return to My Reports
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container form-page">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h2>{editing ? "Report Updated Successfully" : "Item Successfully Catalogued!"}</h2>
          <p>
            {editing
              ? "Your modifications have been synchronized with the campus lost-and-found system."
              : "Thank you for reporting this found item. Other students can now find and claim it."}
          </p>
          <div className="form-actions" style={{ justifyContent: "center", marginTop: "24px" }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/my-reports")}
            >
              View My Reports
            </button>
            <Link to="/browse" className="btn btn-outline">
              Browse All Items
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const previewImage =
    formData.image || categoryFallbacks[formData.category] || categoryFallbacks.Electronics;

  return (
    <div className="container form-page">
      <h1 className="section-title">
        {editing ? "Edit Reported Item" : "Report a Found Item"}
      </h1>
      <p className="section-subtitle">
        {editing
          ? "Update the details of the item you handed over."
          : "Found an item on campus? Help reconnect it with its rightful owner."}
      </p>

      <div className="form-and-preview-layout">
        <form className="form-box-extended" onSubmit={handleSubmit} noValidate>
          {/* Photo Upload Section */}
          <ImageUpload
            label="Item Photograph (Recommended)"
            hint="Upload a clear photo. If omitted, a category image is assigned automatically."
            value={formData.image}
            onChange={handleImageChange}
            placeholderText="Drag & drop item photo here, or click to browse"
          />

          <div className="form-group">
            <label htmlFor="itemName">
              Item Name <span className="req-star">*</span>
            </label>
            <input
              id="itemName"
              name="itemName"
              type="text"
              placeholder="e.g. Scientific Calculator Casio fx-991EX"
              value={formData.itemName}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.itemName && errors.itemName ? "input-error" : ""}
            />
            {touched.itemName && errors.itemName && (
              <p className="error-text">{errors.itemName}</p>
            )}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Electronics">Electronics</option>
                <option value="Bags">Bags</option>
                <option value="Stationery">Stationery</option>
                <option value="ID Cards">ID Cards</option>
                <option value="Accessories">Accessories</option>
                <option value="Books">Books</option>
                <option value="Personal Items">Personal Items</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="condition">Physical Condition</label>
              <select
                id="condition"
                name="condition"
                value={formData.condition}
                onChange={handleChange}
              >
                <option value="Good">Good / Like New</option>
                <option value="Used">Used / Normal Wear</option>
                <option value="Damaged">Damaged / Scratched</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">
              Where was it found? <span className="req-star">*</span>
            </label>
            <input
              id="location"
              name="location"
              type="text"
              placeholder="e.g. Computer Lab 3, Workstation #14"
              value={formData.location}
              onChange={handleChange}
              onBlur={handleBlur}
              className={touched.location && errors.location ? "input-error" : ""}
            />
            {touched.location && errors.location && (
              <p className="error-text">{errors.location}</p>
            )}
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="date">
                Date Found <span className="req-star">*</span>
              </label>
              <input
                id="date"
                name="date"
                type="date"
                max={todayStr}
                value={formData.date}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.date && errors.date ? "input-error" : ""}
              />
              {touched.date && errors.date && (
                <p className="error-text">{errors.date}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="time">Approximate Time</label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              General Description <span className="req-star">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows="3"
              placeholder="Provide a general description of color, make, and where exactly it was sitting."
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
            <label htmlFor="publicDetails">
              Public Clue Hints (Optional)
            </label>
            <textarea
              id="publicDetails"
              name="publicDetails"
              rows="2"
              placeholder="e.g. 'Has a blue sticker on top'. Do NOT reveal confidential identifying marks here."
              value={formData.publicDetails}
              onChange={handleChange}
            />
            <p className="form-hint">
              Security Notice: Keep private passwords, roll numbers, or inside contents hidden so only the true owner can describe them when claiming.
            </p>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : editing ? "Save Modifications" : "Publish Found Report"}
            </button>
            {editing && (
              <Link to="/my-reports" className="btn btn-outline">
                Cancel
              </Link>
            )}
          </div>
        </form>

        {/* Live Card Preview Section */}
        <div className="live-preview-panel">
          <div className="preview-sticky-wrap">
            <div className="preview-label">
              <span>👁️ Live Catalog Preview</span>
              <span className="preview-tag">Real-Time Sync</span>
            </div>
            <div className="item-card">
              <span className="claim-tag">FOUND</span>
              <img
                className="item-card-image"
                src={previewImage}
                alt="Preview"
              />
              <div className="item-card-body">
                <span className="item-card-category">{formData.category}</span>
                <h3 className="item-card-title">
                  {formData.itemName || "Item Name Preview"}
                </h3>
                <p className="item-card-meta">
                  📍 {formData.location || "Campus Location"} • 📅 {formData.date || todayStr}
                </p>
                <span className="status-badge status-ready">Not Claimed</span>
                <div className="item-card-actions">
                  <span className="btn btn-outline" style={{ pointerEvents: "none" }}>
                    View Details
                  </span>
                  <span className="btn btn-primary" style={{ pointerEvents: "none" }}>
                    Claim Item
                  </span>
                </div>
              </div>
            </div>
            <p className="form-hint" style={{ textAlign: "center", marginTop: "12px" }}>
              This feature info: Live catalog preview of how your listing appears in Browse.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportFoundItem;