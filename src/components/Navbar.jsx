import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBarsStaggered } from '@fortawesome/free-solid-svg-icons';
import cityCoordinates from "../utils/cities";
import { setMapCoordinates } from "../utils/mapActions";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${mapboxgl.accessToken}`);
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        if (coordinates) {
          dispatch({ type: 'SET_COORDINATES', payload: { lng: coordinates[0], lat: coordinates[1] } });
        }
      } else {
        console.log("No results found");
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }; 
  
  const handleExploreLinkClick = (cityCoordinates) => {
    // Dispatch the action to update coordinates in Redux store
    dispatch(setMapCoordinates(cityCoordinates));
  };

  const dropdownIcon = isDropdownOpen ? "▲" : "▼";

  return (
    <nav className="bg-white shadow-2xl rounded-b-3xl absolute z-20 w-full h-24">
      <div className="px-8 w-full h-full flex justify-between items-center">
        <div className="flex space-x-7">
          <Link to="/" className="flex items-center">
            <img src="/logo.svg" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        <div className="hidden md:flex items-center lg:space-x-8 space-x-2">
          <Link
            to="/"
            className="lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
          >
            Map
          </Link>

          {/* Explore Dropdown */}
          <div className="relative flex items-center">
            <button
              className="lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
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
                {/* Pass city coordinates to the handleExploreLinkClick function */}
                <Link
                  to="/paris"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={() => handleExploreLinkClick(cityCoordinates.paris)}
                >
                  Paris
                </Link>
                <Link
                  to="/london"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={() => handleExploreLinkClick(cityCoordinates.london)}
                >
                  London
                </Link>
                <Link
                  to="/budapest"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={() => handleExploreLinkClick(cityCoordinates.budapest)}
                >
                  Budapest
                </Link>
                <Link
                  to="/newyork"
                  className="block py-2 px-4 text-sm hover:bg-gray-200"
                  onClick={() => handleExploreLinkClick(cityCoordinates.newyork)}
                >
                  New York
                </Link>
              </div>
            )}
          </div>

          {/* Other Links */}
          <Link
            to="/favorites"
            className="lg:text-2xl text-xl px-2 text-gray-800 font-semibold hover:text-teal-900 transition duration-300"
          >
            Favorites
          </Link>
        </div>

        {/* Searchbar */}
        <div className="hidden md:flex items-center">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="py-2 px-6 font-semibold text-gray-900 rounded-full transition duration-300 border-2 border-solid border-teal-950 focus:outline-none"
              placeholder="Search other cities..."
              type="search"
              name="searchbar"
              id="searchbar"
              value={searchQuery}
              onChange={handleSearchInputChange}
            /> 
            <button className="h-[44px] w-[44px] absolute right-8 bg-transparent py-2 px-2 rounded-full text-teal-950 text-lg" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            className="outline-none mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FontAwesomeIcon className="text-3xl text-teal-950" icon={faBarsStaggered} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block bg-white overflow-hidden opacity-100 rounded-3xl border-[1px] border-gray-300 shadow-xl transition-all duration-300" : "hidden opacity-0"
        }`}
      >
          <form onSubmit={handleSearchSubmit} className="flex overflow-hidden px-2 justify-center">
            <input
              className="py-1 px-6 text-lg font-semibold text-gray-900 transition duration-300 focus:outline-none"
              placeholder="Search other cities..."
              type="search"
              name="searchbar"
              id="searchbar"
              value={searchQuery}
              onChange={handleSearchInputChange}
            /> 
            <button className="aspect-square h-[64px] bg-transparent py-2 px-2 rounded-full text-teal-950 text-lg" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
          </form>
          <hr />
        <Link
          to="/"
          className="block w-full text-center py-4 px-4 text-2xl font-semibold hover:bg-gray-200"
        >
          Map
        </Link>
        <hr />
        {/* Mobile Explore Dropdown */}
        <div className="block w-full text-center py-4 px-4 text-2xl font-semibold hover:bg-gray-200">
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
                className="block w-full text-center text-2xl hover:bg-gray-200"
              >
                Paris
              </Link>
              <Link
                to="/london"
                className="block w-full text-center text-lg hover:bg-gray-200"
              >
                London
              </Link>
              <Link
                to="/budapest"
                className="block w-full text-center text-lg hover:bg-gray-200"
              >
                Budapest
              </Link>
              <Link
                to="/newyork"
                className="block w-full text-center text-lg hover:bg-gray-200"
              >
                New York
              </Link>
            </div>
          )}
        </div>
        <hr />
        <Link
          to="/favorites"
          className="block w-full text-center py-4 px-4 text-2xl font-semibold hover:bg-gray-200"
        >
          Favorites
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
