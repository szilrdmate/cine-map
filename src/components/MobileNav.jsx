/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faGlobe, faCompass, faHeart } from "@fortawesome/free-solid-svg-icons";

const MobileNav = ({ searchQuery, handleSearchInputChange, handleSearchSubmit, isDropdownOpen, setIsDropdownOpen, handleExploreLinkClick, cityCoordinates }) => {
  return (
    <div id="mobile-nav">
      <div className="flex items-center absolute z-20 pt-4 px-4 w-full">
        <img
          src="./icon.svg"
          alt="icon"
          className="absolute left-7 h-10 z-20"
        />
        <form onSubmit={handleSearchSubmit} className="w-full flex">
          <input
            className="py-4 px-16 w-full font-medium text-xl text-gray-100 rounded-full transition duration-300 border-[1px] border-solid border-gray-600 shadow-2xl focus:outline-none bg-black backdrop-blur-md bg-opacity-10 focus-within:bg-gray-100 focus-within:text-gray-900 focus-within:backdrop-blur-0 focus-within:bg-opacity-100"
            placeholder="Search for a city"
            type="search"
            name="searchbar"
            id="searchbar"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          <button
            className="aspect-square z-20 absolute right-7 top-6 bg-transparent py-2 px-2 rounded-full text-lg"
            type="submit"
          >
            <FontAwesomeIcon
              icon={faSearch}
              className="text-3xl text-gray-700"
            />
          </button>
        </form>
      </div>

      <div className="z-20 border-t-solid border-t-2 border-t-gray-300 absolute w-full h-20 bottom-0 left-0 text-4xl bg-white text-gray-900 flex justify-around md:hidden shadow-2xl  ">
        <Link to="/">
          <div className="h-full w-[33vw] flex justify-center items-center">
            <FontAwesomeIcon icon={faGlobe} />
          </div>
        </Link>

        <div className="h-full w-[33vw] flex justify-center items-center border-r-2 border-l-2 border-gray-300" onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}>
          <FontAwesomeIcon
            icon={faCompass}
  
          />
          {isDropdownOpen && (
            <div
              className="absolute bottom-20 text-center w-full bg-white rounded-t-md"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                to="/paris"
                className="block py-3 px-4 text-lg font-semibold hover:bg-gray-200"
                onClick={() => handleExploreLinkClick(cityCoordinates.paris)}
              >
                Paris
              </Link>
              <hr />
              <Link
                to="/london"
                className="block py-3 px-4 text-lg font-semibold hover:bg-gray-200"
                onClick={() => handleExploreLinkClick(cityCoordinates.london)}
              >
                London
              </Link>
              <hr />
              <Link
                to="/budapest"
                className="block py-3 px-4 text-lg font-semibold hover:bg-gray-200"
                onClick={() => handleExploreLinkClick(cityCoordinates.budapest)}
              >
                Budapest
              </Link>
              <hr />
              <Link
                to="/newyork"
                className="block py-3 px-4 text-lg font-semibold hover:bg-gray-200"
                onClick={() => handleExploreLinkClick(cityCoordinates.newyork)}
              >
                New York
              </Link>
            </div>
          )}
        </div>

        <Link to="/favorites">
          <div className="h-full w-[33vw] flex justify-center items-center">
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default MobileNav;
