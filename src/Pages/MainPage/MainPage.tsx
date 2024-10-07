import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div className="flex flex-col bg-gray-900 text-white overflow-hidden">
      <div className="flex flex-1 justify-center items-center h-screen">
        <div className="w-1/2 flex justify-center">
          {/* Porsche image */}
          <img
            src="./Assets/Porsche.png"
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
          showSection ? "opacity-100" : "opacity-0"
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
            <p>
              Počeli smo 2016 godine, sa skromnim brojem vozila kao i izborom
              klasa. Sa samo četiri vozila u startu, naša flota se sada sastoji
              od 90 vozila. Posjedujemo sve kategorije putničkih vozila.
            </p>
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
            <p>
              Uživajte u svom putovanju bez razmišljanja koliko kilometara
              možete da vozite, jer imate neograničenu kilometražu da doživite
              zadovoljavajuće iskustvo.
            </p>
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
            <h3 className="text-lg font-semibold mb-2">
              Naš tim je uvijek tu za Vas
            </h3>
            <div className="border-b-2 border-red-500 mb-2 w-1/2 mx-auto"></div>
            <p>
              Naš tim je uvijek na raspolaganju. Možete nas kontaktirati putem
              telefona +38269810805 ili putem email-a na info@rentify.me
            </p>
          </div>
        </div>
      </div>

      {/* Additional Content Below */}
      <div className="bg-gray-800 text-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Additional Information</h2>
          <p className="mb-4">
            Here you can find more about our services, pricing, and special
            offers.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-400">
              Learn More
            </button>
            <button className="px-4 py-2 bg-red-500 rounded hover:bg-red-400">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Further Content */}
      <div className="bg-gray-700 text-white py-16 min-h-screen">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">User Reviews</h2>
          <p className="mb-4">Read what our guests are saying about us</p>

          {/* Slider Container */}
          <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-4">
              {/* Recenzija 1 */}
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  Top Abwicklung. Sehr nette Mitarbeiter. Problemlose
                  Korrespondenz per Email. Klare Empfehlung!
                </p>
                <p className="font-bold">Edmond Dantes</p>
              </div>
              {/* Recenzija 2 */}
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  I would like to recommend Respecta Renta Car in every segment.
                  The owner is professional, very human and friendly. The price
                  for this quality is. We received a new car and drove it
                  without any problems. Before we decided to take Respect Renta
                  Car, I took several offers. All of them were more expensive
                  for less quality car. I was so glad to take a Offer from
                  Respect Renta car.
                </p>
                <p className="font-bold">Kostic Katarina</p>
              </div>
              {/* Recenzija 3 */}
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  An extraordinary experience from start to finish - the prices
                  were fair and transparent, the pickup and drop-off easy, and
                  Milos was highly flexible, helpful and friendly throughout my
                  six weeks in Montenegro. I'm already looking forward to
                  returning and will certainly be contacting Milos again when I
                  do. Don't hesitate to rent from Respecta - you will be only
                  impressed at how a rental car comp...
                </p>
                <p className="font-bold">Eric Howden</p>
              </div>
              {/* Dodatni boksovi za komentare */}
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  Fantastic service! The car was spotless and the staff were
                  incredibly helpful. Will definitely rent again!
                </p>
                <p className="font-bold">Alice Johnson</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  Quick and easy rental process. The team went above and beyond
                  to ensure we had a great experience.
                </p>
                <p className="font-bold">Mark Smith</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg w-72 inline-block h-64 flex flex-col justify-between overflow-hidden">
                <p className="mb-2 whitespace-normal overflow-hidden overflow-ellipsis">
                  Amazing experience! The staff were friendly and the car was in
                  excellent condition. Highly recommend!
                </p>
                <p className="font-bold">Sophia Brown</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
