import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Breadcrumbs.css";

const routeNames = {
  browse: "Browse Items",
  report: "Report Found Item",
  dashboard: "Dashboard",
  "my-claims": "My Claims",
  "my-reports": "My Reports",
  profile: "My Profile",
  about: "About Aurora",
  login: "Login",
  signup: "Sign Up"
};

export default function Breadcrumbs({ customTitle }) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't render breadcrumbs on homepage
  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumbs-container" aria-label="breadcrumb">
      <div className="container breadcrumbs-inner">
        <Link to="/" className="breadcrumb-link home-link">
          <span>Home</span>
        </Link>
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          let displayName = routeNames[value] || value;
          if (value === "item" || value === "claim" || value === "edit-report" || value === "edit-claim") {
            displayName = routeNames[value] || (value.startsWith("edit") ? "Edit" : "Details");
          } else if (isLast && customTitle) {
            displayName = customTitle;
          }

          return (
            <React.Fragment key={to}>
              <span className="breadcrumb-separator">/</span>
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={to} className="breadcrumb-link">
                  {displayName}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}