import { useState, useEffect, useRef } from "react";
import { useSelector } from 'react-redux';
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import cityCoordinates from "../utils/cities.js";
import movieLocations from "../utils/movieLocations.json";

import MovieCard from "./MovieCard";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const { type, coordinates, movieId } = useSelector((state) => state.city.location);
  const city = useSelector((state) => state.city.city);
  
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    console.log("useEffect running");

    // const map = mapRef.current;

    const handleStyleLoad = () => {
      console.log("Styles loading");
      mapRef.current.setConfigProperty("basemap", "lightPreset", "dusk");
      mapRef.current.setConfigProperty('basemap', "showPlaceLabels", false);
      mapRef.current.setConfigProperty('basemap', "showRoadLabels", false);
      mapRef.current.setConfigProperty('basemap', "showPointOfInterestLabels", false);
      mapRef.current.setConfigProperty('basemap', "showTransitLabels", false);

      const navControl = new mapboxgl.NavigationControl();
      mapRef.current.addControl(navControl);
    
      setTimeout(() => {
        const navControlContainer = mapRef.current.getContainer().querySelector('.mapboxgl-ctrl-top-right');
        if (navControlContainer) {
          // Remove the default position class and apply Tailwind classes
          navControlContainer.classList.remove('mapboxgl-ctrl-top-right');
          navControlContainer.classList.add('absolute', 'bottom-60', 'right-12', 'md:block', 'hidden');
        }
      }, 0);

      // Add markers and popups for movie locations
      movieLocations.forEach((movie) => {
        movie.locations.forEach((location) => {
          // Create a HTML element for each feature (marker)
          const markerEl = document.createElement('div');
          markerEl.className = 'cursor-pointer';
          markerEl.textContent = '📍';
          markerEl.style.fontSize = '2.5em';
    
          // Create a marker at the given location
          new mapboxgl.Marker(markerEl)
            .setLngLat([location.lng, location.lat])
            .addTo(mapRef.current);
    
          // Add a click event listener to the marker
          markerEl.addEventListener('click', () => {
            setSelectedMovie({
              title: movie.title,
              name: location.name,
              lat: location.lat,
              lng: location.lng,
              imageUrl: location.imageUrl,
              locationImg: location.locationImg
            });
          });
        });
      });
    }
    // Initialize the map only if it's not already created
    if (!mapRef.current) {
      console.log("Initializing map");
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-beta",
        zoom: 14,
        pitch: 62,
      })
      mapRef.current.on('style.load', handleStyleLoad);
    }

    switch (type) {
      case 'coordinates':
        mapRef.current.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 14 });
        console.log(`Going to ${coordinates.lng} ${coordinates.lat}`)
        break;
      case 'movie':
        // Logic to set map location based on movieId
        break;
      case 'default':
        mapRef.current.flyTo({ center: [2.293920, 48.85934], zoom: 16 });
        console.log(`Going to default coordinates`)
        break;
      default:
    }

    if (!cityCoordinates[city]) return;

    // Clean-up function
    return () => {
      if (mapRef.current) {
        console.log("Cleaning up");
        mapRef.current.off('load', handleStyleLoad);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [type, coordinates, movieId, city]);

  // Function to toggle between 2D and 3D
  const toggleView = () => {
    const map = mapRef.current;
    if (map.getPitch() === 0) {
      map.easeTo({ pitch: 60, bearing: -20 });
    } else {
      map.easeTo({ pitch: 0, bearing: 0 });
    }
  };

  const closeCard = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100vw", height: "100vh"}} />
      {selectedMovie && <MovieCard movie={selectedMovie} onClose={closeCard} />}
      <button onClick={toggleView} className="absolute bottom-2 right-2 z-[19] md:bottom-44 md:right-12 bg-white rounded-lg px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold">
        2D / 3D
      </button>
    </div>
  );
};

export default MapComponent;