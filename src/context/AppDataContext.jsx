import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem as addItemAction,
  updateItem as updateItemAction,
  toggleSaveItem as toggleSaveItemAction,
  changeItemOwnerEmail
} from "../redux/itemSlice";
import {
  addClaim as addClaimAction,
  updateClaim as updateClaimAction,
  changeClaimOwnerEmail
} from "../redux/claimsSlice";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);
  const savedItems = useSelector((state) => state.items.savedItemIds);
  const claims = useSelector((state) => state.claims.claims);

  const addItem = useCallback(
    (item) => {
      const newItem = {
        ...item,
        id: Date.now(),
        status: "Not Claimed",
        createdBy: item.createdBy || ""
      };
      dispatch(addItemAction(newItem));
      return newItem;
    },
    [dispatch]
  );

  const updateItem = useCallback(
    (id, updates) => {
      dispatch(updateItemAction({ id, updates }));
    },
    [dispatch]
  );

  const addClaim = useCallback(
    (claim) => {
      const newClaim = {
        ...claim,
        claimId: Date.now(),
        submittedDate: new Date().toISOString().slice(0, 10),
        status: "Under Verification"
      };
      dispatch(addClaimAction(newClaim));
      return newClaim;
    },
    [dispatch]
  );

  const updateClaim = useCallback(
    (claimId, updates) => {
      dispatch(updateClaimAction({ claimId, updates }));
    },
    [dispatch]
  );

  const changeOwnerEmail = useCallback(
    (oldEmail, newEmail) => {
      dispatch(changeItemOwnerEmail({ oldEmail, newEmail }));
      dispatch(changeClaimOwnerEmail({ oldEmail, newEmail }));
    },
    [dispatch]
  );

  const toggleSaved = useCallback(
    (itemId) => {
      dispatch(toggleSaveItemAction(itemId));
    },
    [dispatch]
  );

  const value = useMemo(
    () => ({
      items,
      claims,
      savedItems,
      addItem,
      updateItem,
      addClaim,
      updateClaim,
      changeOwnerEmail,
      toggleSaved
    }),
    [items, claims, savedItems, addItem, updateItem, addClaim, updateClaim, changeOwnerEmail, toggleSaved]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}