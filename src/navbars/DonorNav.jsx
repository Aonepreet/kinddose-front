import { useEffect,useState } from 'react';
import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom'; // Only useNavigate is needed for button clicks

const DonorNav = ({ donorEmail }) => {
  let navg = useNavigate(); // Initialize useNavigate hook

  // Function to handle navigation for buttons
  const doNavigate = (url) => {
    navg("/" + url);
  };


  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailid");
    setEmail(storedEmail);
  }, []);


  const handleLogout = () => {
    // --- Placeholder for actual logout logic ---
    // In a real application, you would:
    // 1. Clear authentication tokens (e.g., from localStorage, sessionStorage)
    //    Example: localStorage.removeItem('authToken');
    // 2. Clear any user-related state in your application (e.g., user context)
    console.log("Logging out donor:", donorEmail);

    // Simulate a delay for logout process (optional)
    setTimeout(() => {
      // 3. Redirect to the login page or home page
      doNavigate('login'); // Redirect to /login
      // Optionally, you might want to reload the page to ensure all state is reset
      // window.location.reload();
    }, 300);
  };

  return (
    <nav className="bg-gradient-to-r from-green-50 to-blue-50 shadow-lg p-4 font-sans relative z-10 mb-3">
      <div className="container mx-auto flex justify-between items-center">
        {/* Welcome / Brand */}
        {/* Brand/Logo - Now "Donor Dashboard" as text with a user cartoon image */}
        <div
          className="flex items-center cursor-pointer" // Make the whole div clickable
          onClick={() => doNavigate('')} // Navigates to '/' (home)
        >
         {/*} <img
            src="https://placehold.co/40x40/ADD8E6/000000?text=👤" // User cartoon logo image
            alt="User Logo"
            className="h-10 w-10 mr-3 rounded-full shadow-md"
          />*/}
          <span className="text-xl font-extrabold text-green-700 tracking-tight transition duration-300 hover:text-green-800">
           KindDose
          </span>
        </div>

        {/* Donor Email Display */}
        {email && (
          <div className="hidden md:block text-lg font-medium text-gray-700 px-4 py-2 bg-white shadow-sm">
            Welcome, <span className="text-green-700">{email}</span>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex space-x-4 lg:space-x-6 items-center">
          <input
            type="button"
           onClick={() => doNavigate('')}
           className="px-4 py-2 rounded-full text-base font-medium text-gray-700 bg-white shadow-sm
                       hover:bg-green-100 hover:text-green-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300
                       transition duration-300 ease-in-out transform hover:scale-105"
            
            value="Home" 
          />
          <input
            type="button"
            className="px-4 py-2 rounded-full text-base font-medium text-gray-700 bg-white shadow-sm
                       hover:bg-green-100 hover:text-green-700
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-300
                       transition duration-300 ease-in-out transform hover:scale-105"
            value="DonorDesk"
            onClick={() => doNavigate('donornav')} // Navigates to '/'
          />
          <input
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-full text-base font-medium text-white bg-red-500 shadow-md
                       hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300
                       transition duration-300 ease-in-out transform hover:scale-105"
            value="Logout"
          />
        </div>
      </div>
      <Outlet></Outlet>
    </nav>
  );
};

export default DonorNav;
