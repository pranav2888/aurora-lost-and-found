import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext(null);

function FilterProvider({ children }) {
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");

  function clearFilters() {
    setSearchText("");
    setSelectedCategory("All");
    setSelectedStatus("All");
    setSelectedLocation("All");
  }

  return (
    <FilterContext.Provider
      value={{
        searchText,
        setSearchText,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        selectedLocation,
        setSelectedLocation,
        clearFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

function useFilters() {
  return useContext(FilterContext);
}

export { FilterProvider, useFilters };
