import React from "react";

interface Filters {
  manufacturer: string;
  type: string;
  gear: string;
  fuel: string;
  passengers: string;
}

interface VehicleFiltersProps {
  openFilter: string | null;
  setOpenFilter: React.Dispatch<React.SetStateAction<string | null>>;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  handleShowAll: () => void;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  openFilter,
  setOpenFilter,
  filters,
  setFilters,
  handleShowAll,
}) => {
  const filterOptions = {
    manufacturer: [
      "Alfa Romeo",
      "Mahindra",
      "Talbot",
      "Audi",
      "Saipa",
      "Fornasari",
      "Iveco",
      "GMC",
      "Acura",
      "Buick",
      "Secma",
      "MINI",
      "Scion",
      "Studebaker",
      "Ferrari",
      "Caterham",
      "Mitsubishi",
      "Dagger",
      "Aero",
    ],
    type: [
      "MPV",
      "convertible",
      "hatchback",
      "sedan",
      "coupe",
      "SUV",
      "station wagon",
      "small",
    ],
    gear: ["Manual", "Automatic"],
    fuel: ["diesel", "gasoline", "electric", "hybrid"],
    passengers: ["2", "4", "5", "7"],
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setOpenFilter(null); // Close the dropdown after selection
  };

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="flex space-x-4">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleShowAll} // Show all vehicles
      >
        Show All
      </button>

      {Object.keys(filterOptions).map((filterType) => (
        <div key={filterType} className="relative">
          <button
            className="border border-gray-300 rounded p-2"
            onClick={() => toggleFilter(filterType)}
          >
            {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
          </button>
          {openFilter === filterType && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions[filterType as keyof typeof filterOptions].map(
                (option, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleFilterChange(filterType as keyof Filters, option)
                    }
                  >
                    {option}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default VehicleFilters;
