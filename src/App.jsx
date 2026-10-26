import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ItemDetails from "./pages/ItemDetails";
import ReportFoundItem from "./pages/ReportFoundItem";
import ClaimItem from "./pages/ClaimItem";
import MyClaims from "./pages/MyClaims";
import MyReports from "./pages/MyReports";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

import { UserProvider, useUser } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { FilterProvider } from "./context/FilterContext";
import { AppDataProvider } from "./context/AppDataContext";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  const location = useLocation();

  if (!user) {
    // Preserve current location to redirect back after successful login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <ReportFoundItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-report/:id"
            element={
              <ProtectedRoute>
                <ReportFoundItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/claim/:id"
            element={
              <ProtectedRoute>
                <ClaimItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-claim/:claimId"
            element={
              <ProtectedRoute>
                <ClaimItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-claims"
            element={
              <ProtectedRoute>
                <MyClaims />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-reports"
            element={
              <ProtectedRoute>
                <MyReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <UserProvider>
          <AppDataProvider>
            <FilterProvider>
              <AppRoutes />
            </FilterProvider>
          </AppDataProvider>
        </UserProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;