import { useState, useRef } from "react";
import VehicleFilters from "./VehiclesFilters";
import AvailableVehicles from "./AvailableVehicles";

const VehicleList = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    manufacturer: "",
    type: "",
    gear: "",
    fuel: "",
    passengers: "",
  });

  const filterRef = useRef<HTMLDivElement | null>(null);

  const handleShowAll = () => {
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
      <div className="flex flex-col space-y-4 mb-4">
        <VehicleFilters
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
          filters={filters}
          setFilters={setFilters}
          handleShowAll={handleShowAll}
        />
      </div>
      <AvailableVehicles filters={filters} />
    </div>
  );
};

export default VehicleList;
