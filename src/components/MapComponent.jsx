import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/geoJson.json";
import MovieCard from "./MovieCard";
import { setSelectedMovie } from "../utils/store.js";
import { useMediaQuery } from "react-responsive";

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

  // Media query to detect desktop screen size
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

  // Function to toggle between 2D and 3D views
  const toggleView = () => {
    if (map.getPitch() === 0) {
      console.log("Pitch to 60");
      map.easeTo({ pitch: 60, bearing: 0 });
    } else {
      console.log("Pitch to 0");
      map.easeTo({ pitch: 0, bearing: 0 });
    }
  };

  // Callback to handle style load event, also use callback so it only executes once
  const handleStyleLoad = useCallback(() => {
    console.log("Styles loading");
    map.current.setConfigProperty("basemap", "lightPreset", "dusk");
    map.current.setConfigProperty("basemap", "showPlaceLabels", false);
    map.current.setConfigProperty("basemap", "showRoadLabels", false);
    map.current.setConfigProperty("basemap", "showPointOfInterestLabels", false);
    map.current.setConfigProperty("basemap", "showTransitLabels", false);

    // Add markers and popups for movie locations
    movieLocations.features.forEach((feature) => {
      // Add markers and popups for movie locations
      const { geometry } = feature;
      const markerEl = document.createElement("div");
      markerEl.className = "cursor-pointer";
      markerEl.textContent = "📍";
      markerEl.style.fontSize = "2.5em";

      new mapboxgl.Marker(markerEl)
        .setLngLat(geometry.coordinates)
        .addTo(map.current);

      markerEl.addEventListener("click", () => {
        console.log("Marker clicked, dispatching movie:", feature);
        dispatch(setSelectedMovie(feature));
      });
    });
  }, [dispatch]);

  // useEffect to initialize the map
  useEffect(() => {
    console.log("useEffect running");
    
    // Initialize the map only if it's not already created
    if (map.current) return

    try {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-beta",
        zoom: 14,
        pitch: 60,
        center: [2.29392, 48.85934],
      });

      map.current.on("style.load", handleStyleLoad);

      map.current.on('error', (e) => {
        // Handle map errors
        console.error('Map error:', e);
        // Optionally, update state to show an error message to the user
      });
    
        // ... rest of the initialization code
    } catch (error) {
      console.error('Error initializing map:', error);
      // Handle initialization errors
      // Update state to inform user, if necessary
    }

    // Cleanup function to remove the map  
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [handleStyleLoad]);

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
        map.current.flyTo({ center: [2.29392, 48.85934], zoom: 16 });
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
      {isDesktop && (
        <button
          onClick={toggleView}
          className='absolute z-[19] top-28 right-6 bg-white rounded-lg px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold'>
          2D / 3D
        </button>
      )}
    </div>
  );
};

export default MapComponent;
