import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NeedyDash = ({ needyEmail }) => { // Added needyEmail prop for display/logout
  const navigate = useNavigate();

  const doNavigate = (url) => {
    navigate("/" + url);
  };

  //Email Autofill
      const [email, setEmail] = useState('');
      useEffect(() => {
          const storedEmail = localStorage.getItem("emailid");
          setEmail(storedEmail);
        }, []);

  const handleLogout = () => {
    // --- Placeholder for actual needy user logout logic ---
    // In a real application, you would:
    // 1. Clear authentication tokens (e.g., from localStorage, sessionStorage)
    // 2. Clear any user-related state in your application
    alert("Do you want to logout ?");
    console.log("Logging out needy user:", needyEmail);

    // Simulate a delay for logout process
    setTimeout(() => {
      // Redirect to the login page or home page
      navigate('/login'); // Assuming /login is your main login route
      // Optionally, you might want to reload the page to ensure all state is reset
      // window.location.reload();
    }, 300);
  };

  // Define card data for Needy Dashboard
  const cards = [
    {
      title: "Needy Profile",
      description: "Manage your personal and contact information.",
      image: "https://cdn-icons-png.flaticon.com/128/16485/16485990.png", // User profile icon
      buttonText: "View/Edit Profile",
      path: "needydata" // Assuming this is the path to your needy details form
    },
    {
      title: "Find Medicine",
      description: "Search for available medicines in your area.",
      image: "https://cdn-icons-png.flaticon.com/128/4435/4435779.png", // Search medicine icon
      buttonText: "Search Medicines",
      path: "medicinefinder" // Assuming this is the path to your medicine finder component
    },
    {
      title: "Find Equipment",
      description: "Look for available medical equipment.",
      image: "https://cdn-icons-png.flaticon.com/128/603/603248.png", // Search equipment icon
      buttonText: "Search Equipment",
      path: "eqpfinder" // Placeholder path, you'll need to define this route
    },
    {
      title: "Logout",
      description: "Sign out of your needy account.",
      image: "https://cdn-icons-png.flaticon.com/128/1828/1828490.png", // Logout icon
      
      buttonText: "Logout",
      action: handleLogout // Special action for logout button
    }
  ];

  const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 flex flex-col items-center justify-center font-sans mt-3"style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-6xl border border-gray-100 transform transition-all duration-300 hover:shadow-2xl">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
          Needy Dashboard
        </h1>

        {needyEmail && (
          <p className="text-center text-lg text-gray-700 mb-8">
            Welcome, <span className="font-semibold text-purple-700">{email}</span>
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="w-24 h-24 mb-4 rounded-full border-4 border-purple-200 shadow-md"
              />
              <h2 className="text-xl font-bold text-gray-800 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm mb-6 flex-grow">{card.description}</p>
              <input
                type="button"
                value={card.buttonText}
                onClick={card.action ? card.action : () => doNavigate(card.path)} // Use action if defined, else navigate
                className="w-full px-4 py-2 rounded-lg shadow-md text-base font-semibold text-white
                           bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400
                           transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NeedyDash;
