import React, { useState, useEffect, useCallback } from "react";
import ApiService from "../../Shared/api";

// all data is random until we get backend.
interface Reservation {
  id: number;
  car: {
    id: number;
    name: string;
    photo: string;
  };
  user: {
    id: number;
    photoPath: string;
    name: string;
  } | null;
  status: string;
  action_date: string;
}

const RezervationsTable: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await ApiService.getReservations(); //auth token treba da se proslijedi

      if (response.error) {
        setError(response.error);
      }

      console.log("API Response:", response);

      if (response.data) {
        const activeReservations = response.data.active;
        setReservations(activeReservations);
      } else {
        setError("Failed to load data: " + response.error);
      }
    } catch (error: any) {
      console.error("There was a problem with the fetch operation:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="reservations">
      <div className="wrapper">
        <div className="content">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <div className="grid-container">
              <div className="grid-header">Slika</div>
              <div className="grid-header">Ime i Prezime</div>
              <div className="grid-header">Status</div>
              <div className="grid-header">Datum</div>
              <div className="grid-header">Odobri</div>
              {reservations.map((reservation) => (
                <React.Fragment key={reservation.id}>
                  <div className="grid-item">
                    <img
                      src={
                        reservation.car.photo ||
                        "https://via.placeholder.com/100"
                      }
                      alt={reservation.car.name}
                      className="book-photo"
                    />
                  </div>
                  <div className="grid-item">
                    {reservation.car?.name || "No Name"}{" "}
                  </div>
                  <div className="grid-item">{reservation.status}</div>
                  <div className="grid-item">{reservation.action_date}</div>
                  <div className="grid-item tick-x">
                    <i
                      className="bi bi-check-lg"
                      style={{ fontSize: "1.2rem", paddingRight: "1rem" }}
                    ></i>
                    <i className="bi bi-x-lg"></i>
                  </div>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      <style>{`
  .wrapper {
    display: flex;
    flex-direction: row;
  }

  .content {
    margin-top: 2rem;
    margin-left: 5rem;
    margin-right: 3rem;
    width: 100%;
  }

  .loading, .error {
    font-size: 1.5rem;
    margin: 2rem 0;
    text-align: center;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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

  .book-photo {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  }

  .grid-item {
    border-bottom: 1px solid #ccc;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  @media (max-width: 768px) {
    .grid-container {
      grid-template-columns: repeat(4, 1fr);
    }

    .grid-header:nth-child(5),
    .grid-item:nth-child(5n + 5) {
      display: none;
    }
  }

  @media (max-width: 576px) {
    .grid-container {
      grid-template-columns: repeat(3, 1fr);
    }

    .grid-header:nth-child(4),
    .grid-item:nth-child(4n + 4) {
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

export default RezervationsTable;
