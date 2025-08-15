import React from 'react';
import { useNavigate } from 'react-router-dom';

const DonorDash= () => {
  const navigate = useNavigate();

  const doNavigate = (url) => {
    navigate("/" + url);
  };

  // Define card data
  const cards = [
    {
      title: "Donor Profile",
      description: "Manage your personal and contact information.",
      image: "https://cdn-icons-png.flaticon.com/256/12340/12340246.png", // User profile icon
      buttonText: "View/Edit Profile",
      path: "donordata" // Assuming this is the path to your donor details form
    },
    {
      title: "Post Medicines",
      description: "List medicines you wish to donate.",
      image: "https://cdn-icons-png.flaticon.com/256/4861/4861715.png", // Medicine icon
      buttonText: "Add Medicine",
      path: "medicinedata" // Assuming this is the path to your medicine details form
    },
    {
      title: "Post Equipments",
      description: "Offer medical equipment for donation.",
      image: "https://cdn-icons-png.flaticon.com/256/9821/9821804.png", // Equipment icon (e.g., X-ray machine)
      buttonText: "Add Equipment",
      path: "eqpdetails" // Placeholder path, you'll need to define this route
    },
    {
      title: "Medicine Manager",
      description: "View and manage your donated medicine listings.",
      image: "https://cdn-icons-png.flaticon.com/128/10620/10620380.png", // List/clipboard icon
      buttonText: "Manage Medicines",
      path: "listedmedicines" // Assuming this is the path to your listed medicines component
    }
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-100 to-purple-100 p-4 sm:p-6 flex flex-col items-center justify-center font-sans mt-2">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-6xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
          Donor Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 "  >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100
                         flex flex-col items-center text-center
                         transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-24 h-24 mb-4 rounded-full border-4 border-blue-200 shadow-md"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{card.description}</p>
              <input
                type="button"
                value={card.buttonText}
                onClick={() => doNavigate(card.path)}
                className="w-full px-4 py-2 rounded-lg shadow-md text-base font-semibold text-white
                           bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400
                           transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonorDash;
