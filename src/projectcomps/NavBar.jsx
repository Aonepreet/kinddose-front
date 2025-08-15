import React, { useState } from 'react'; // useState is needed for mobile menu toggle
import { Outlet, useNavigate } from 'react-router-dom';
import MainCrousal from './MainCrousal';

const NavBar = () => {
  let navg = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
 const [showCarousel, setShowCarousel] = useState(true); 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const doNavigate = (url) => {
    navg("/" + url);
    setIsMenuOpen(false); // Close mobile menu after 
    setShowCarousel(url === '');
  };

  const backgroundImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5LaAC5GbHpM6eMRWFI-ajBwEpv4VRxRf3kA&s";


  const navItems = [
    { name: 'Home', path: '' },
    { name: 'Signup', path: 'signup' },
    { name: 'Login', path: 'login' },
    
   // { name: 'Donor', path: 'donornav' },
   // { name: 'Medicine', path: 'medicinedata' },
    //{ name: 'Needy', path: 'needynav' },
    

  ];

  return (
    <nav id="home" className="bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg p-4 font-sans relative z-10 " style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div
          className="flex items-center cursor-pointer" // Make the whole div clickable
          onClick={() => doNavigate('')} // Navigates to '/'
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/10543/10543669.png" // Placeholder logo image
            alt="KindDose Logo"
            className="h-15 w-15 mr-3 rounded-full shadow-md"
          />
          <span className="text-3xl font-extrabold text-black tracking-tight transition duration-300 hover:text-white">
            KindDose
          </span>
        </div>

        {/* Mobile menu button (hamburger icon) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg p-2 transition duration-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation links (desktop) */}
        <div className="hidden md:flex space-x-4 lg:space-x-6 items-center">
          {navItems.map((item) => (
            <input
              key={item.name}
              type="button"
              value={item.name}
              onClick={() => doNavigate(item.path)}
              className="px-4 py-2 rounded-full text-base font-medium text-gray-700 bg-white shadow-sm
                         hover:bg-blue-100 hover:text-blue-700
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300
                         transition duration-300 ease-in-out transform hover:scale-105"
            />
          ))}
        </div>
      </div>

      {/* Mobile menu (toggles visibility) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg py-2 mt-2 rounded-lg`}>
        <div className="flex flex-col space-y-2 px-4">
          {navItems.map((item) => (
            <input
              key={item.name}
              type="button"
              value={item.name}
              onClick={() => doNavigate(item.path)} // doNavigate will close the menu
              className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-gray-700
                         hover:bg-blue-50 hover:text-blue-600
                         transition duration-200 ease-in-out"
            />
          ))}
        </div>
      </div>
      {/*{showCarousel && <MainCrousal />}*/}
     
    </nav>
  );
};

export default NavBar;
