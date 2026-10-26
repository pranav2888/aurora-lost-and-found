import React, { useState, useRef } from "react";
import "./ImageUpload.css";

export default function ImageUpload({
  label = "Upload Image",
  hint = "PNG, JPG, WEBP up to 2MB",
  value = "",
  onChange,
  aspectRatio = "4/3",
  placeholderText = "Click or drag image here"
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef(null);

  function processFile(file) {
    setErrorMsg("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (PNG, JPG, WEBP).");
      return;
    }

    // 2 MB limit
    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg(`Image size is ${(file.size / (1024 * 1024)).toFixed(1)}MB. Max allowed is 2MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (onChange) {
        onChange(e.target.result);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file.");
    };
    reader.readAsDataURL(file);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  }

  function handleRemove(e) {
    e.stopPropagation();
    if (inputRef.current) inputRef.current.value = "";
    if (onChange) onChange("");
  }

  return (
    <div className="image-upload-wrapper">
      {label && <label className="image-upload-label">{label}</label>}

      {value ? (
        <div className="image-preview-container">
          <div className="image-preview-card" style={{ aspectRatio }}>
            <img src={value} alt="Uploaded preview" className="image-preview-img" />
            <div className="image-preview-overlay">
              <button
                type="button"
                className="btn-overlay change-btn"
                onClick={() => inputRef.current?.click()}
              >
                Change Photo
              </button>
              <button
                type="button"
                className="btn-overlay remove-btn"
                onClick={handleRemove}
              >
                Remove
              </button>
            </div>
          </div>
          <span className="image-status-tag">Photo attached ✓</span>
        </div>
      ) : (
        <div
          className={`image-dropzone ${isDragging ? "dragging" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
          }}
        >
          <div className="dropzone-icon">📷</div>
          <p className="dropzone-title">{placeholderText}</p>
          <p className="dropzone-hint">{hint}</p>
          <button type="button" className="btn btn-outline dropzone-btn">
            Browse File
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg, image/webp"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {errorMsg && <p className="image-upload-error">{errorMsg}</p>}
    </div>
  );
}