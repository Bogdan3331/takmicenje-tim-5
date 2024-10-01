// src/components/VehicleCard.tsx
import React from 'react';

// Definišemo interfejs za podatke o vozilu
interface Vehicle {
  image: string;
  name: string;
  class: string;
  gear: string;
  passengers: number;
  fuel: string;
  fuelConsumption: number;
  price: number;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <div className="border rounded-lg shadow-md overflow-hidden bg-white">
      {/* Slika vozila */}
      <img src={vehicle.image} alt={vehicle.name} className="w-full h-48 object-cover" />
      
      <div className="p-4">
        <h3 className="text-xl font-semibold">{vehicle.name}</h3>
        
        {/* Detalji o vozilu */}
        <ul className="mt-2 text-gray-600">
          <li><strong>Klasa:</strong> {vehicle.class}</li>
          <li><strong>Menjač:</strong> {vehicle.gear}</li>
          <li><strong>Max putnici:</strong> {vehicle.passengers}</li>
          <li><strong>Gorivo:</strong> {vehicle.fuel}</li>
          <li><strong>Potrošnja goriva:</strong> {vehicle.fuelConsumption} l/100km</li>
        </ul>
        
        {/* Cena i dugme za najam */}
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">{vehicle.price} €</span>
            <p className="text-gray-500">Dan od</p>
          </div>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Najam
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleCard;
