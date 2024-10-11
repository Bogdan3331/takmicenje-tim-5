import React, { useState, useRef } from "react";
import VehicleFilters from "./VehiclesFilters";
import AvailableVehicles from "./AvailableVehicles";

const VehicleList = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState({
    manufacturer: "",
    type: "",
    gear: "",
    fuel: "",
    passengers: "",
  });

  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Search:", searchQuery);
  };

  const handleShowAll = () => {
    setSearchQuery("");
    setFilters({
      manufacturer: "",
      type: "",
      gear: "",
      fuel: "",
      passengers: "",
    });
  };

  return (
    <div className="container mx-auto p-4" ref={filterRef}>
      <h2 className="text-3xl font-semibold mb-4">Vehicle List</h2>

      {/* Filters and search button */}
      <div className="flex flex-col space-y-4 mb-4">
        {/* Vehicle Filters */}
        <VehicleFilters
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          filters={filters}
          setFilters={setFilters}
          handleShowAll={handleShowAll}
        />
        {/* Search button */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            className="border border-transparent bg-transparent focus:border-gray-300 rounded p-1 w-40 outline-none mr-2"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit" className="text-gray-500 hover:text-gray-800">
            Search
          </button>
        </form>
      </div>

      {/*  */}
      <AvailableVehicles filters={filters} />
    </div>
  );
};

export default VehicleList;
