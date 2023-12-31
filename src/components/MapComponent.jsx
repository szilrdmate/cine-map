// src/components/MapComponent.jsx

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleStyleLoad } from "../hooks/handleStyleLoad.js"
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../data/geoJson.json";
import MovieCard from "./MovieCard";
import { setSelectedMovie } from "../utils/store.js";

// Mapbox token stored in as a .env variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  // Redux selectors to obtain state data
  const { type, coordinates } = useSelector((state) => state.city.location);
  const city = useSelector((state) => state.city.city);
  const selectedMovie = useSelector((state) => state.city.selectedMovie); // Use selected movie from Redux

  // Refs for map container and map instance
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  // Hook to dispatch Redux actions
  const dispatch = useDispatch();


  // useEffect to initialize the map
  useEffect(() => {
    console.log("useEffect running");

    // Initialize the map only if it's not already created
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-beta",
      zoom: 14,
      pitch: 60,
      center: [2.29392, 48.85934],
    });

    // map.current.on("style.load", handleStyleLoad);
    map.current.on("style.load", () => {
      handleStyleLoad(map.current, movieLocations, dispatch);
    });

    // Cleanup function to remove the map
    return () => {
      console.log("Removing map instance")
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [dispatch]);

  // Handle city location changes
  useEffect(() => {
    switch (type) {
      case "coordinates":
        map.current.flyTo({
          center: [coordinates.lng, coordinates.lat],
          zoom: 16,
        });
        break;
      default:
        map.current.flyTo({
          center: [2.29392, 48.85934],
          zoom: 16,
        });
    }
  }, [type, coordinates, city]);

  return (
    <div>
      <div ref={mapContainerRef} className='w-screen h-screen' />
      {selectedMovie && (
        <MovieCard
          movie={selectedMovie}
          onClose={() => dispatch(setSelectedMovie(null))}
        />
      )}
    </div>
  );
};

export default MapComponent;
