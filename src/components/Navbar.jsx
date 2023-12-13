import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuIcon = (
    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  );

  return (
    <nav className="bg-white shadow-2xl rounded-3xl absolute z-10 w-full h-24">

      <div className="px-8 w-full h-full flex justify-between items-center">

          <div className="flex space-x-7">
              <a href="#" className="flex items-center">
                <img src="/public/logo.svg" alt="Logo" className="h-10 w-auto"/>
              </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
              <a href="" className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300">Home</a>
              <a href="" className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300">Explore</a>
              <a href="" className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300">Favorites</a>
              <a href="" className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300">Settings</a>
          </div>

          {/* Secondary Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="" className="py-2 px-6 font-semibold text-gray-900 rounded-full transition duration-300 border-2 border-solid border-teal-950">My Account</a>
            <a href="" className="py-2 px-6 font-semibold text-white rounded-full transition duration-300 border-2 border-solid border-teal-950 bg-teal-950">Upgrade Plan</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              {menuIcon}
            </button>
          </div>

      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Home</a>
        <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Explore</a>
        <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Favorites</a>
        <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Settings</a>
        <a href="" className="block py-2 px-4 text-sm hover:bg-gray-200">Account</a>
      </div>
    </nav>
  );
};

export default Navbar;
