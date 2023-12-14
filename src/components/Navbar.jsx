import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const menuIcon = (
    <svg
      className="w-10 h-10"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16m-7 6h7"
      ></path>
    </svg>
  );

  const dropdownIcon = isDropdownOpen ? "▲" : "▼";

  return (
    <nav className="bg-white shadow-2xl rounded-3xl absolute z-10 w-full h-24">
      <div className="px-8 w-full h-full flex justify-between items-center">
        <div className="flex space-x-7">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
          >
            Home
          </Link>

          {/* Explore Dropdown */}
          <div className="relative flex items-center">
            <button
              className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              Explore{" "}
              <span className="text-gray-800 text-sm ml-1">{dropdownIcon}</span>
            </button>
            {isDropdownOpen && (
              <div
                className="absolute top-8 w-full shadow-xl bg-white rounded-md py-1"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  to="/paris"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                >
                  Paris
                </Link>
                <Link
                  to="/london"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                >
                  London
                </Link>
                <Link
                  to="/budapest"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                >
                  Budapest
                </Link>
                <Link
                  to="/newyork"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                >
                  New York
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            to="/favorites"
            className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
          >
            Favorites
          </Link>
          <Link
            to="/settings"
            className="text-2xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
          >
            Settings
          </Link>
        </div>

        {/* Secondary Navbar items */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/account"
            className="py-2 px-6 font-semibold text-gray-900 rounded-full transition duration-300 border-2 border-solid border-teal-950"
          >
            My Account
          </Link>
          <Link
            to="/upgrade"
            className="py-2 px-6 font-semibold text-white rounded-full transition duration-300 border-2 border-solid border-teal-950 bg-teal-950"
          >
            Upgrade Plan
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            className="outline-none mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            {menuIcon}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <Link to="/" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Home
        </Link>
        {/* Mobile Explore Dropdown */}
        <div className="block py-2 px-4 text-sm hover:bg-gray-200">
          <button
            onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
          >
            Explore{" "}
            <span className="text-sm">{isMobileDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {isMobileDropdownOpen && (
            <div className="py-1">
              <Link
                to="/paris"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Paris
              </Link>
              <Link
                to="/london"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                London
              </Link>
              <Link
                to="/budapest"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                Budapest
              </Link>
              <Link
                to="/newyork"
                className="block py-2 px-4 text-sm hover:bg-gray-200"
              >
                New York
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/favorites"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Favorites
        </Link>
        <Link
          to="/settings"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Settings
        </Link>
        <Link
          to="/account"
          className="block py-2 px-4 text-sm hover:bg-gray-200"
        >
          Account
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
