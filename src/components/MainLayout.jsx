import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Breadcrumbs from "./Breadcrumbs";
import ScrollToTop from "./ScrollToTop";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <Breadcrumbs />
      <main className="app-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}