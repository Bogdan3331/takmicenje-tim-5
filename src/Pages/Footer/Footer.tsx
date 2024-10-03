import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 shadow-lg rounded-3xl"> {/* Dodata klasa rounded-lg */}
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Leva kolona - Info */}
        <div>
          <h2 className="text-red-500 text-xl font-bold">PLANET RENT A CAR</h2>
          <p className="mt-4">
            Želja da damo maksimalni doprinos u sektoru prevoznih potreba definisala je kao:
          </p>
          <p>
            Najfleksibilniju rent a car agenciju u Crnoj Gori. Imamo pravila, ali smo uvek spremni da izađemo u susret posebnim potrebama.
          </p>
          <p>
            Vrši se dostava i preuzimanje vozila na bilo kojoj lokaciji sa teritorije Crne Gore, kao i iz zemalja u okruženju.
          </p>
        </div>

        {/* Srednja kolona - Online plaćanje */}
        <div>
          <h2 className="text-red-500 text-xl font-bold">Online plaćanje</h2>
          <div className="mt-4 space-y-4">
            <img
              src="path/to/visa.jpeg"
              alt="Visa"
              className="mx-auto w-32"
            />
            <img
              src="path/to/mastercard.jpg"
              alt="MasterCard"
              className="mx-auto w-32"
            />
          </div>
        </div>


        <div>
          <h2 className="text-red-500 text-xl font-bold">Kontakt</h2>
          <ul className="mt-4 space-y-2">
            <li>📍 Podgorica, Sarajevo, Tirana, Ljubljana, Skoplje</li>
            <li>📞 +38269810805</li>
            <li>💬 WhatsApp | Telegram | Viber</li>
            <li>✉️ info@planetrentacar.me</li>
            <li>🕒 07:00 - 21:00 | Svakim danom</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
