// src/components/VehicleList.tsx
import React, { useState } from 'react';
import VehicleCard from './VehicleCard';

const vehicles = [
  {
    image: 'https://via.placeholder.com/150', // Ovde zameniš sa pravim URL-om slike
    name: 'SEAT TOLEDO',
    class: 'Hatchback',
    gear: 'Manual 5 gears',
    passengers: 5,
    fuel: 'Diesel',
    fuelConsumption: 7,
    price: 24
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'BMW 118D',
    class: 'Hatchback',
    gear: 'Manual 6 gears',
    passengers: 5,
    fuel: 'Diesel',
    fuelConsumption: 6,
    price: 25
  },
  {
    image: 'https://via.placeholder.com/150',
    name: 'RENAULT CLIO',
    class: 'Hatchback',
    gear: 'Manual 5 gears',
    passengers: 5,
    fuel: 'Diesel',
    fuelConsumption: 6,
    price: 25
  }
];

const VehicleList = () => {
  const [openFilter, setOpenFilter] = useState<string | null>(null); // Stanje za praćenje koji filter je otvoren
  const filterOptions = {
    class: ['Hatchback', 'Sedan', 'SUV'],
    manufacturer: ['BMW', 'Audi', 'Renault'],
    gear: ['Manual', 'Automatic'],
    fuel: ['Diesel', 'Petrol', 'Electric'],
    passengers: ['2', '4', '5', '7'],
  };

  // Definisanje tipa za 'filter' parametar
  const toggleFilter = (filter: string) => {
    setOpenFilter(openFilter === filter ? null : filter);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-4">Lista Vozila</h2>

      {/* Filteri */}
      <div className="flex space-x-4 mb-4">
        <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">Prikaži Sve</button>

        {/* Filter za Klasa */}
        <div className="relative">
          <button className="border border-gray-300 rounded p-2" onClick={() => toggleFilter('class')}>
            Klasa
          </button>
          {openFilter === 'class' && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions.class.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenFilter(null)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter za Proizvođač */}
        <div className="relative">
          <button className="border border-gray-300 rounded p-2" onClick={() => toggleFilter('manufacturer')}>
            Proizvođač
          </button>
          {openFilter === 'manufacturer' && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions.manufacturer.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenFilter(null)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter za Menjač */}
        <div className="relative">
          <button className="border border-gray-300 rounded p-2" onClick={() => toggleFilter('gear')}>
            Menjač
          </button>
          {openFilter === 'gear' && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions.gear.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenFilter(null)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter za Gorivo */}
        <div className="relative">
          <button className="border border-gray-300 rounded p-2" onClick={() => toggleFilter('fuel')}>
            Gorivo
          </button>
          {openFilter === 'fuel' && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions.fuel.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenFilter(null)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter za Max Putnici */}
        <div className="relative">
          <button className="border border-gray-300 rounded p-2" onClick={() => toggleFilter('passengers')}>
            Max Putnici
          </button>
          {openFilter === 'passengers' && (
            <ul className="absolute bg-white shadow-lg rounded w-40 mt-2 z-10">
              {filterOptions.passengers.map((option, index) => (
                <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => setOpenFilter(null)}>
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Lista vozila */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vehicle, index) => (
          <VehicleCard key={index} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
