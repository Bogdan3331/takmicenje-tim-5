import { useState, useEffect, useRef } from "react";
import VehicleFilters from "./VehiclesFilters";
import AvailableVehicles from "./AvailableVehicles";
import ApiService from "../../Shared/api"; // Assuming this is where you handle user fetching
import { Pagination } from "antd";

const VehicleList = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    manufacturer: "",
    type: "",
    gear: "",
    fuel: "",
    passengers: "",
  });
  const [isAdmin, setIsAdmin] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await ApiService.getUserData();
        setIsAdmin(userResponse.data.data.admin);
        console.log(userResponse);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

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
          page={currentPage}
        />
      </div>
      <AvailableVehicles
        filters={filters}
        isAdmin={isAdmin}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        lastPage={lastPage}
        setLastPage={setLastPage}
      />

      <Pagination
        current={currentPage}
        total={lastPage * 6}
        onChange={(page) => setCurrentPage(page)}
        pageSize={6}
      />
    </div>
  );
};

export default VehicleList;
