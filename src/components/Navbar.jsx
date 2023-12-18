import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import mapboxgl from "mapbox-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faCompass, faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";
import cityCoordinates from "../utils/cities";
import { setMapCoordinates } from "../utils/mapActions";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        if (coordinates) {
          dispatch({
            type: "SET_COORDINATES",
            payload: { lng: coordinates[0], lat: coordinates[1] },
          });
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
    <div>
      <nav className="bg-white shadow-2xl rounded-b-3xl absolute z-20 w-full h-24 hidden md:block">
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
                <span className="text-gray-800 text-sm ml-1">
                  {dropdownIcon}
                </span>
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
                    onClick={() =>
                      handleExploreLinkClick(cityCoordinates.paris)
                    }
                  >
                    Paris
                  </Link>
                  <Link
                    to="/london"
                    className="block py-2 px-4 text-sm hover:bg-gray-200"
                    onClick={() =>
                      handleExploreLinkClick(cityCoordinates.london)
                    }
                  >
                    London
                  </Link>
                  <Link
                    to="/budapest"
                    className="block py-2 px-4 text-sm hover:bg-gray-200"
                    onClick={() =>
                      handleExploreLinkClick(cityCoordinates.budapest)
                    }
                  >
                    Budapest
                  </Link>
                  <Link
                    to="/newyork"
                    className="block py-2 px-4 text-sm hover:bg-gray-200"
                    onClick={() =>
                      handleExploreLinkClick(cityCoordinates.newyork)
                    }
                  >
                    New York
                  </Link>
                </div>
              )}
            </div>

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
              <button
                className="h-[44px] w-[44px] absolute right-8 bg-transparent py-2 px-2 rounded-full text-teal-950 text-lg"
                type="submit"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </form>
          </div>
        </div>
      </nav>

      <div className="flex md:hidden items-center absolute z-20 pt-4 px-4 w-full">
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

export default Navbar;
