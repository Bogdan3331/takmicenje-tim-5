// src/components/VehicleList.tsx
import React, { useState } from "react";
import VehicleListTable from "./CarsTable";
//import { FaSearch } from "react-icons/fa"; // Import search icon

const VehicleList = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add search logic here
    console.log("Search:", searchQuery);
  };

  const filterOptions = {
    class: ["Hatchback", "Sedan", "SUV"],
    manufacturer: ["BMW", "Audi", "Renault"],
    gear: ["Manual", "Automatic"],
    fuel: ["Diesel", "Petrol", "Electric"],
    passengers: ["2", "4", "5", "7"],
  };

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Vehicle List</h2>

      {/* Filters and search button */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex space-x-4">
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Show All
          </button>

          {/* Filters */}
          {/* Filter by Class */}
          <div className="relative">
            <button
              className="border border-gray-300 rounded p-2"
              onClick={() => toggleFilter("class")}
            >
              Class
            </button>
            {openFilter === "class" && (
              <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
                {filterOptions.class.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenFilter(null)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Other filters ... */}

          {/* Filter by Manufacturer */}
          <div className="relative">
            <button
              className="border border-gray-300 rounded p-2"
              onClick={() => toggleFilter("manufacturer")}
            >
              Manufacturer
            </button>
            {openFilter === "manufacturer" && (
              <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
                {filterOptions.manufacturer.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenFilter(null)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter by Gear */}
          <div className="relative">
            <button
              className="border border-gray-300 rounded p-2"
              onClick={() => toggleFilter("gear")}
            >
              Gear
            </button>
            {openFilter === "gear" && (
              <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
                {filterOptions.gear.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenFilter(null)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter by Fuel */}
          <div className="relative">
            <button
              className="border border-gray-300 rounded p-2"
              onClick={() => toggleFilter("fuel")}
            >
              Fuel
            </button>
            {openFilter === "fuel" && (
              <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
                {filterOptions.fuel.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenFilter(null)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Filter by Max Passengers */}
          <div className="relative">
            <button
              className="border border-gray-300 rounded p-2"
              onClick={() => toggleFilter("passengers")}
            >
              Max Passengers
            </button>
            {openFilter === "passengers" && (
              <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
                {filterOptions.passengers.map((option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setOpenFilter(null)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Search button with search icon */}
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            className="border border-transparent bg-transparent focus:border-gray-300 rounded p-1 w-40 outline-none mr-2"
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit" className="text-gray-500 hover:text-gray-800">
            <p>se</p>
          </button>
        </form>
      </div>

      {/* Vehicle list */}

      <VehicleListTable searchQuery={searchQuery} />
    </div>
  );
};

export default VehicleList;
