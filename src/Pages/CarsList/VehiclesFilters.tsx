import React, { useEffect, useState } from "react";
import ApiService from "../../Shared/api";

interface Vehicle {
  brand: string;
  type: string;
  gear: string;
  fuelType: string;
  passengers: number;
}

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
  page: number;
}

const VehicleFilters: React.FC<VehicleFiltersProps> = ({
  openFilter,
  setOpenFilter,
  setFilters,
  handleShowAll,
  page,
}) => {
  const [filterOptions, setFilterOptions] = useState<{
    manufacturer: string[];
    type: string[];
    gear: string[];
    fuel: string[];
    passengers: string[];
  }>({
    manufacturer: [],
    type: [],
    gear: [],
    fuel: [],
    passengers: [],
  });

  const fetchFilterOptions = async () => {
    try {
      console.log(page);
      const response = await ApiService.getVehiclesList(page);
      const data: Vehicle[] = response.data.data;

      const uniqueManufacturers = Array.from(
        new Set(data.map((vehicle) => vehicle.brand))
      );
      const uniqueTypes = Array.from(
        new Set(data.map((vehicle) => vehicle.type))
      );
      const uniqueGears = Array.from(
        new Set(data.map((vehicle) => vehicle.gear))
      );
      const uniqueFuels = Array.from(
        new Set(data.map((vehicle) => vehicle.fuelType))
      );
      const uniquePassengers = Array.from(
        new Set(data.map((vehicle) => vehicle.passengers.toString()))
      );

      setFilterOptions({
        manufacturer: uniqueManufacturers,
        type: uniqueTypes,
        gear: uniqueGears,
        fuel: uniqueFuels,
        passengers: uniquePassengers,
      });
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
    setOpenFilter(null);
  };

  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="flex space-x-4">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={handleShowAll}
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
