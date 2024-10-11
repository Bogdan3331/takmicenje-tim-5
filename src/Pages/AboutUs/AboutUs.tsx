// src/Pages/AboutUs/AboutUs.tsx
import React from "react";
import { FaCar, FaHandHoldingUsd, FaHeadset, FaStar } from "react-icons/fa";

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white p-10">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8 text-blue-500">About Rentify</h1>
        <p className="text-lg mb-12">
          At Rentify, we are committed to providing the best car rental service
          tailored to meet all your transportation needs. Whether you're
          traveling for business or leisure, Rentify offers reliable vehicles at
          affordable rates. We strive to make car rental simple, efficient, and
          stress-free.
        </p>

        {/* Icons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <FaCar className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Wide Vehicle Selection</h2>
            <p className="text-gray-300">
              Choose from a variety of cars, ranging from economy to luxury,
              for any occasion or budget.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaHandHoldingUsd className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Affordable Pricing</h2>
            <p className="text-gray-300">
              Our transparent pricing ensures you get the best deal without any
              hidden fees or surprises.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaHeadset className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">24/7 Support</h2>
            <p className="text-gray-300">
              Our dedicated customer support team is available around the clock
              to assist you with any inquiries or issues.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <FaStar className="text-6xl text-blue-500 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Top-Rated Service</h2>
            <p className="text-gray-300">
              We pride ourselves on offering the highest level of service,
              ensuring customer satisfaction every step of the way.
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-12">
          <h2 className="text-4xl font-bold mb-6 text-blue-500">Why Choose Rentify?</h2>
          <p className="text-lg mb-4">
            At Rentify, we believe that renting a car should be a seamless experience.
            With our user-friendly platform, affordable prices, and reliable vehicles,
            we aim to make your journey smoother. Whether you need a car for a weekend
            getaway or a long business trip, Rentify has got you covered.
          </p>
          <p className="text-lg mb-4">
            Our fleet is regularly maintained to ensure the highest safety standards.
            We are constantly expanding our selection to offer you the latest models and
            top-tier service. With flexible pick-up and drop-off locations, we cater to
            your convenience.
          </p>
          <p className="text-lg">
            Join the thousands of satisfied customers who have trusted Rentify for their
            transportation needs. Drive with confidence, drive with Rentify.
          </p>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-500">Get in Touch</h2>
          <p className="text-lg mb-2">Have questions or need assistance?</p>
          <p className="text-lg mb-6">Contact us at <a href="mailto:support@rentify.com" className="text-blue-500">support@rentify.com</a></p>
          <p className="text-lg">We are here to help you make the most of your rental experience!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
