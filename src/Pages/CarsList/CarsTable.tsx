import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";
import MoreBtn from "../../Components/Buttons/MoreBtn";
import { MenuProps, message } from "antd";
import { useNavigate } from "react-router-dom";


interface Car {
  //props
}

interface CarsTableProps {
  searchQuery: string;
}

const CarsTable: React.FC<CarsTableProps> = ({ searchQuery }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

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
      const response = await ApiService.getCars(searchQuery);

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (Array.isArray(response.data?.data)) {
        setCars(response.data.filter((car: Car) => car));
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

  const filteredCars = cars.filter((car) => {
    // // const fullName = `${car.name}`.toLowerCase();
    // return fullName.startsWith(searchQuery.toLowerCase());
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
        <div className="grid-header">Slika</div>
        <div className="grid-header">Naziv</div>
        <div className="grid-header">Dostupnost</div>
        <div className="grid-header"></div>
        {filteredCars.map((car) => (
          <div className="this div is just until backend code arrives"></div>
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
          grid-template-columns: repeat(4, 1fr) 5rem;
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

export default CarsTable;
