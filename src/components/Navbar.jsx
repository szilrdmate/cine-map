import { useState } from "react";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import cityCoordinates from "../data/cities";
import { setMapCoordinates } from "../redux/store.js";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useMediaQuery } from 'react-responsive';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({
    query: '(min-width: 768px)'
  });
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });


  // Function to manage search bar
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

  // Function for dropdown menu and links
  const handleExploreLinkClick = (cityCoordinates) => {
    // Dispatch the action to update coordinates in Redux store
    dispatch(setMapCoordinates(cityCoordinates));
  };

  return (
    <div>
      {isDesktop && (<DesktopNav
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleExploreLinkClick={handleExploreLinkClick}
        cityCoordinates={cityCoordinates}
      />)}
      {isMobile && (<MobileNav
        searchQuery={searchQuery}
        handleSearchInputChange={handleSearchInputChange}
        handleSearchSubmit={handleSearchSubmit}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleExploreLinkClick={handleExploreLinkClick}
        cityCoordinates={cityCoordinates}
      />)}
    </div>
  );
};

export default Navbar;
