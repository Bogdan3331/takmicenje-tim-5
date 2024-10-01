import React from 'react';
import { useNavigate } from 'react-router-dom';
import Porsche from "../../assets/Porsche.png";


export default function MainPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/VehicleList');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">

      <div className="flex flex-1 justify-center items-center">
        <div className="w-1/2 flex justify-center">
          <img src={Porsche} alt="Porsche" className="w-1/2 h-auto" />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start p-8">
          <h2 className="text-4xl font-bold mb-4">Dobrodošli u Rent A Car</h2>
          <h6 className="text-lg mb-8">
            Nudimo širok spektar luksuznih i sportskih vozila za iznajmljivanje, uključujući najnovije modele poput Porsche-a.
          </h6>
          <div className="w-full flex justify-center">
            <button 
              className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-500 hover:border-transparent transition duration-300"
              onClick={handleButtonClick}
            >
              Pogledajte naša vozila
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
