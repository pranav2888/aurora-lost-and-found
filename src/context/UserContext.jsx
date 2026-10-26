import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { changeItemOwnerEmail } from "../redux/itemSlice";
import { changeClaimOwnerEmail } from "../redux/claimsSlice";
import cartoonAvatars from "../data/cartoonAvatars";

const UserContext = createContext(null);

export const defaultUser = {
  name: "Pranav",
  email: "pranav@aurora.com",
  photo: cartoonAvatars[0],
  rollNumber: "23AI045",
  department: "CSE - Artificial Intelligence & Machine Learning",
  semester: "3rd Semester",
  password: "password123"
};

function readStorageUser(key) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    return null;
  }
}

export function UserProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(() => readStorageUser("auroraUser"));
  const [registeredUser, setRegisteredUser] = useState(
    () => readStorageUser("auroraRegisteredUser") || defaultUser
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("auroraUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("auroraUser");
    }
  }, [user]);

  const signup = useCallback((formData) => {
    const newUser = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      photo: formData.photo || cartoonAvatars[0],
      rollNumber: formData.rollNumber?.trim() || "23AI001",
      department: formData.department || "CSE - AI/ML",
      semester: "3rd Semester",
      password: formData.password
    };
    setRegisteredUser(newUser);
    setUser(newUser);
    localStorage.setItem("auroraRegisteredUser", JSON.stringify(newUser));
  }, []);

  const login = useCallback(
    (email, password) => {
      const normalizedEmail = email.trim().toLowerCase();
      if (
        (normalizedEmail === registeredUser.email && password === registeredUser.password) ||
        (normalizedEmail === defaultUser.email && password === defaultUser.password)
      ) {
        setUser(registeredUser);
        return true;
      }
      return false;
    },
    [registeredUser]
  );

  const updateProfile = useCallback(
    (updates) => {
      const oldEmail = registeredUser.email;
      const updatedUser = { ...registeredUser, ...updates };
      setRegisteredUser(updatedUser);
      setUser(updatedUser);
      localStorage.setItem("auroraRegisteredUser", JSON.stringify(updatedUser));

      if (updates.email && updates.email.toLowerCase() !== oldEmail.toLowerCase()) {
        dispatch(changeItemOwnerEmail({ oldEmail, newEmail: updates.email.toLowerCase() }));
        dispatch(changeClaimOwnerEmail({ oldEmail, newEmail: updates.email.toLowerCase() }));
      }
    },
    [registeredUser, dispatch]
  );

  const changePassword = useCallback(
    (newPassword) => {
      updateProfile({ password: newPassword });
    },
    [updateProfile]
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      registeredUser,
      signup,
      login,
      updateProfile,
      changePassword,
      logout
    }),
    [user, registeredUser, signup, login, updateProfile, changePassword, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}