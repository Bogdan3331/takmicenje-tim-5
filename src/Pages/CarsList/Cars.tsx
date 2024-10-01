import React, { useState, useEffect } from "react";
import Header from "../Header";
import ApiService from "../../Shared/api";

interface Car {
  id: number;
  name: string;
  price: number;
  image: string;
  specifications: string;
  dateAdded: string; // Pretpostavljam da postoji datum dodavanja automobila
}

const Cars: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [sortOption, setSortOption] = useState<string>("latest"); // "latest" ili "expensive"

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await ApiService.getCars(); // Pretpostavljam da ovo vraća listu automobila
        if (response.data) {
          setCars(response.data); // Prilagodi ovo prema strukturi podataka
          setFilteredCars(response.data);
        } else {
          console.error("Nema podataka:", response);
        }
      } catch (error) {
        console.error("Greška pri preuzimanju automobila:", error);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let sortedCars = [...cars];
    
    // Sortiranje prema izabranom filteru
    if (sortOption === "latest") {
      sortedCars.sort((a, b) => (new Date(b.dateAdded) > new Date(a.dateAdded) ? 1 : -1));
    } else if (sortOption === "expensive") {
      sortedCars.sort((a, b) => b.price - a.price);
    }
    
    setFilteredCars(sortedCars);
  }, [sortOption, cars]);

  return (
    <div>
      <Header />
      <div className="p-4">
        <div className="mb-4">
          <label className="mr-2">Sortiraj po:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded p-1"
          >
            <option value="latest">Najnoviji</option>
            <option value="expensive">Najskuplji</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredCars.length > 0 ? (
            filteredCars.map((car) => (
              <div key={car.id} className="border rounded-lg overflow-hidden shadow-lg">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{car.name}</h3>
                  <p className="text-gray-600">Cena: ${car.price}</p>
                  <p className="text-gray-600">{car.specifications}</p>
                  <p className="text-gray-500">{new Date(car.dateAdded).toLocaleDateString()}</p>
                </div>
              </div>
            ))
          ) : (
            <p>Nema automobila za prikaz.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cars;
