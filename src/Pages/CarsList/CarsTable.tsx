import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import MoreBtn from "../../Components/Buttons/MoreBtn";
import { MenuProps } from "antd";

interface Car {
  id: number;
  type: string;
  brand: string;
  price: number;
  description: string;
  fuelType: string;
  image: string;
}

interface VehicleListTableProps {
  searchQuery: string;
}

const VehicleListTable: React.FC<VehicleListTableProps> = ({ searchQuery }) => {
  const [VehicleList, setVehicleList] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const renderMenuItems = (car: Car) => {
    var menuItems: MenuProps["items"] = [
      {
        icon: <i className="bi bi-eye" style={{ fontSize: "1rem" }}></i>,
        label: <p style={{ margin: "0" }}>Detalji</p>,
        key: "0",
      },
      {
        icon: (
          <i className="bi bi-pencil-square" style={{ fontSize: "1rem" }}></i>
        ),
        label: <p style={{ margin: "0" }}>Rezervisi</p>,
        key: "1",
      },
    ];

    return menuItems;
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getVehicleList(searchQuery);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data)) {
        setVehicleList(response.data.filter((car: Car) => car));
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredVehicleList = VehicleList.filter((car) => {
    const fullName = `${car.brand}`.toLowerCase();
    return fullName.startsWith(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="wrapper">
      <div className="grid-container">
        <div className="grid-header">Image</div>
        <div className="grid-header">Type</div>
        <div className="grid-header">Brand</div>
        <div className="grid-header">Price</div>
        <div className="grid-header">Description</div>
        <div className="grid-header">Fuel Type</div>
        <div className="grid-header"></div>
        {filteredVehicleList.map((car) => (
          <React.Fragment key={car.id}>
            <div className="grid-item">
              <img
                src={car.image || "https://via.placeholder.com/100"}
                alt={`${car.brand || "Unknown"}`}
                className="user-photo"
              />
            </div>
            <div className="grid-item">{car.type || "No Name"}</div>
            <div className="grid-item">{car.brand || "N/A"}</div>
            <div className="grid-item">{car.price || "N/A"}</div>
            <div className="grid-item">{car.description || "N/A"}</div>
            <div className="grid-item">{car.fuelType || "N/A"}</div>
            <div className="grid-item action-column">
              <MoreBtn items={renderMenuItems(car)} />
            </div>
          </React.Fragment>
        ))}
      </div>
      <style>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 3rem;
          width: 100%;
          padding: 0 1rem;
          box-sizing: border-box;
        }

        .grid-container {
          display: grid;
          grid-template-columns: repeat(6, 1fr) 5rem;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
          overflow-x: auto;
        }

        .grid-header {
          font-weight: bold;
          border-bottom: 2px solid #ccc;
          padding: 0.75rem;
          text-align: center;
          background-color: #f4f4f4;
          text-transform: uppercase;
        }

        .grid-item {
          border-bottom: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          background-color: #fff;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .user-photo {
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          object-fit: cover;
        }

        .action-column {
          display: flex;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr) 5rem;
          }

          .grid-header:nth-child(3),
          .grid-item:nth-child(5n + 3) {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .grid-container {
            grid-template-columns: repeat(3, 1fr) 0.3rem;
          }

          .grid-header:nth-child(4),
          .grid-item:nth-child(5n + 4),
          .grid-header:nth-child(3),
          .grid-item:nth-child(5n + 3) {
            display: none;
          }

          .grid-header:nth-child(5),
          .grid-item:nth-child(5n + 5) {
            grid-column: span 2;
          }
        }
      `}</style>
    </div>
  );
};

export default VehicleListTable;
