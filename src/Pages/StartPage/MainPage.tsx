import Header from "../../Components/Header";
import Pozadina from "./Pozadina1.jpg";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${Pozadina})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Providna boja preko pozadine */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Crna boja sa 50% providnosti
          position: "absolute", // Omogućava da se prostire preko pozadine
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1, // Stavi sloj boje iza sadržaja
        }}
      />

      {/* Header će biti prikazan iznad slike */}
      <Header />

      {/* Glavni sadržaj */}
      <div className="relative flex flex-col items-center justify-center flex-grow z-10 mt-16 text-center">
        <h1 className="text-6xl font-bold text-white mb-4">Rent-a-car</h1>
        <h3 className="text-2xl font-semibold text-white mb-6">
          Drive your dream car for a fraction of a cost
        </h3>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-transparent border-2 border-blue-500 text-blue-500 font-semibold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-blue-500 hover:text-white"
        >
          Order Cars
        </button>
      </div>
    </div>
  );
}

export default MainPage;
