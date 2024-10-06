import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router";
import ApiService from "../../Shared/api";

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

const CarDetails: React.FC = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getVehicleData(id);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setCar(response.data.data);
      } else {
        setError("No data found");
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="book-details-page">
      {error && <div>Error: {error}</div>}
      {loading && <div>Loading...</div>}
      {car && (
        <div className="book-details-card">
          <div className="detail-item">
            <img src={car.image} alt={car.brand} />
          </div>
          <div className="detail-item">
            <p className="detail-label">Car Brand:</p>
            <p>{car.brand}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Type:</p>
            <p>{car.type}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Price:</p>
            <p>{car.price}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Fuel:</p>
            <p>{car.fuelType}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Description:</p>
            <p>{car.description}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Gear:</p>
            <p>{car.gear}</p>
          </div>
          <div className="detail-item">
            <p className="detail-label">Gear:</p>
            <p>{car.passengers}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
