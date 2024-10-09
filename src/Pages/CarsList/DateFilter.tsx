import React, { useState } from "react";
import { DatePicker, Button, message, Pagination } from "antd";
import { Dayjs } from "dayjs";
import ApiService from "../../Shared/api";

interface DateFilterProps {
  setAvailableCars: React.Dispatch<React.SetStateAction<Car[]>>;
}

interface Car {
  id: number;
  type: string;
  brand: string;
  price: number;
  description: string;
  fuelType: string;
  image: string;
  gear?: string;
  passengers?: number;
}

const PAGE_SIZE = 10; // Set the page size for pagination

const DateFilter: React.FC<DateFilterProps> = ({ setAvailableCars }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = () => {
    setAvailableCars([]);
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1); // Reset to first page
  };

  const handleSearch = async () => {
    if (!startDate || !endDate) {
      message.warning("Please select both start and end dates");
      return;
    }

    const dates = {
      startDate: startDate.format("YYYY-MM-DD HH:mm"),
      endDate: endDate.format("YYYY-MM-DD HH:mm"),
      available: true,
      page: currentPage, // Pass current page for pagination
    };

    setLoading(true);

    try {
      const response = await ApiService.avaliableVehicles(dates);
      if (response.data) {
        setAvailableCars(response.data.data || []); // Set available cars from response
        setLastPage(Math.ceil(response.data.totalCars / PAGE_SIZE)); // Calculate last page based on total cars
      }
    } catch (error: any) {
      console.error("Error fetching available vehicles:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    handleSearch(); // Fetch data for the new page
  };

  return (
    <div className="date-filter">
      <div className="date-picker">
        <DatePicker
          showTime
          placeholder="Select start date and time"
          value={startDate}
          onChange={(value) => setStartDate(value)}
          format="YYYY-MM-DD HH:mm"
          style={{ marginRight: "1rem" }}
        />
        <DatePicker
          showTime
          placeholder="Select end date and time"
          value={endDate}
          onChange={(value) => setEndDate(value)}
          format="YYYY-MM-DD HH:mm"
        />
      </div>
      <Button
        type="primary"
        onClick={handleSearch}
        style={{ marginTop: "1rem" }}
      >
        Search
      </Button>
      <Button
        type="primary"
        onClick={handleRefresh}
        style={{ marginTop: "1rem", marginLeft: "1rem" }}
      >
        Refresh
      </Button>

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

      {/* Conditional Pagination Controls */}
      {lastPage > 1 && (
        <div style={{ marginTop: "1rem" }}>
          <Pagination
            current={currentPage}
            total={lastPage * PAGE_SIZE} // Calculate total items based on lastPage and PAGE_SIZE
            pageSize={PAGE_SIZE} // Set the page size
            onChange={handlePageChange} // Handle page change
          />
        </div>
      )}
    </div>
  );
};

export default DateFilter;
