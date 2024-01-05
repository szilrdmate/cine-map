// src/components/MapComponent.jsx

import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight, faRotateLeft, faCube, faMagnifyingGlassPlus, faMagnifyingGlassMinus } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { handleStyleLoad } from "../hooks/handleStyleLoad.js"
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../data/geoJson.json";
import MovieCard from "./MovieCard";
import { setSelectedMovie } from "../redux/store.js";
// import MapControls from "./MapControls.jsx";

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

  // functio to toggle between  2D and 3D
  const toggle3DView = () => {
    const currentPitch = map.current.getPitch();
    map.current.easeTo({pitch: currentPitch === 0 ? 60 : 0});
};

// Functon to handle bearing change on map
const rotateMap = (direction) => {
    const bearing = map.current.getBearing();
    map.current.easeTo({ bearing: bearing + (direction === 'right' ? -20 : 20) });
}

// Functon to handle pitch change on map
const handleZoom = (dir) => {
  const zoom = map.current.getZoom();
  map.current.easeTo({ zoom: zoom + (dir === 'out' ? -0.5 : 0.5) });
}

  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // useEffect to initialize the map
  useEffect(() => {
    // Initialize the map only if it's not already created
    if (map.current) return;

    console.log("useEffect running");

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-beta",
      zoom: 14,
      pitch: 60,
      center: [2.29392, 48.85934],
    });

    // Adding styling to the map
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
      <button onClick={toggle3DView} className="absolute bottom-40 right-80 bg-white p-4 z-50"><FontAwesomeIcon icon={faCube} /></button>
      <button onClick={() => rotateMap('left')} className="absolute bottom-40 right-40 bg-white p-4 z-50"><FontAwesomeIcon icon={faRotateRight} /></button>
      <button onClick={() => rotateMap('right')} className="absolute bottom-40 right-10 bg-white p-4 z-50"><FontAwesomeIcon icon={faRotateLeft} /></button>
      <button onClick={() => handleZoom('out')} className="absolute bottom-60 right-40 bg-white p-4 z-50"><FontAwesomeIcon icon={faMagnifyingGlassMinus} /></button>
      <button onClick={() => handleZoom('in')} className="absolute bottom-60 right-10 bg-white p-4 z-50"><FontAwesomeIcon icon={faMagnifyingGlassPlus} /></button>
    </div>
  );
};

export default MapComponent;
