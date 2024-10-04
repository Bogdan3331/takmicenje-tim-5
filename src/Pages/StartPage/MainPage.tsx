import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Porsche from "../../assets/Porsche.png";

export default function MainPage() {
  const navigate = useNavigate();
  const [showSection, setShowSection] = useState(false);

  const handleButtonClick = () => {
    navigate("/vehicle-list");
  };

  const handleSignInClick = () => {
    navigate("/signin");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show section when user scrolls down 200px
      if (scrollPosition > 200) {
        setShowSection(true);
      } else {
        setShowSection(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white overflow-hidden">
      <div className="flex flex-1 justify-center items-center">
        <div className="w-1/2 flex justify-center">
          {/* Porsche image */}
          <img
            src={Porsche}
            alt="Porsche"
            className="w-1/2 h-auto animate-driveIn transform"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-start p-8">
          <h2 className="text-4xl animate-fadeIn font-bold mb-4">
            Welcome to Rent A Car
          </h2>
          <h6 className="text-lg mb-8 animate-fadeIn">
            We offer a wide range of luxury and sports vehicles for rent, 
            including the latest Porsche models.
          </h6>
          <div className="w-full flex justify-center mb-4">
            <button
              className="animate-fadeIn px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-500 hover:border-transparent transition duration-300"
              onClick={handleButtonClick}
            >
              View Our Vehicles
            </button>
          </div>

          {/* Updated buttons for Sign In and Register */}
          <div className="w-full flex justify-center gap-4">
            <button
              className="animate-fadeIn px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-500 hover:border-transparent transition duration-300"
              onClick={handleSignInClick}
            >
              Sign In
            </button>
            <button
              className="animate-fadeIn px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-500 hover:border-transparent transition duration-300"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </div>
      </div>

      {/* New Section: Initially hidden, visible after scrolling */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          showSection ? 'opacity-100' : 'opacity-0'
        } bg-gray-900 text-white py-16`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Column 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                {/* Icon 1 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.158 17.344l-4.158-2.603v-7.741h2v6.474l3.374 2.114-.792 1.756z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Agencija sa dugogodišnjim iskustvom
            </h3>
            <div className="border-b-2 border-red-500 mb-2 w-1/2 mx-auto"></div>
            <p>Počeli smo 2016 godine, sa skromnim brojem vozila kao i izborom klasa. Sa samo četiri vozila u startu, naša flota se sada sastoji od 90 vozila. Posjedujemo sve kategorije putničkih vozila.</p>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                {/* Icon 2 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path d="M19 13v-2h-14v2h14zm-14 3h14v-2h-14v2zm0 3h14v-2h-14v2zm6-16l-10 9h3v9h6v-6h2v6h6v-9h3l-10-9z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">
              Neograničena kilometraža za sva vozila
            </h3>
            <div className="border-b-2 border-red-500 mb-2 w-1/2 mx-auto"></div>
            <p>Uživajte u svom putovanju bez razmišljanja koliko kilometara možete da vozite, jer imate neograničenu kilometražu da doživite zadovoljavajuće iskustvo.</p>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center">
                {/* Icon 3 */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="white"
                  viewBox="0 0 24 24"
                  className="w-8 h-8"
                >
                  <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm3.158 17.344l-4.158-2.603v-7.741h2v6.474l3.374 2.114-.792 1.756z" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-2">Naš tim je uvijek tu za Vas</h3>
            <div className="border-b-2 border-red-500 mb-2 w-1/2 mx-auto"></div>
            <p>Naš tim je uvijek na raspolaganju. Možete nas kontaktirati putem telefona +38269810805 ili putem email-a na info@rentify.me</p>
          </div>
        </div>
      </div>
    </div>
  );
}
