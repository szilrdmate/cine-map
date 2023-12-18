import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/movieLocations.json";
import cityCoordinates from "../utils/cities";
import MovieCard from "./MovieCard"

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ city }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map only once
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-beta",
        zoom: 16,
      });
    }

    if (!cityCoordinates[city]) return;
    const { lat, lng } = cityCoordinates[city];

    const map = mapRef.current;
    const navControl = new mapboxgl.NavigationControl();
    map.addControl(navControl);

    setTimeout(() => {
      const navControlContainer = map.getContainer().querySelector('.mapboxgl-ctrl-top-right');
      if (navControlContainer) {
        // Remove the default position class and apply Tailwind classes
        navControlContainer.classList.remove('mapboxgl-ctrl-top-right');
        navControlContainer.classList.add('absolute', 'bottom-60', 'right-12', 'md:block', 'hidden');
      }
    }, 0);

    map.jumpTo({ center: [lng, lat], zoom: 16, pitch: 62, bearing: -20 });

    const handleStyleLoad = () => {
      map.setConfigProperty("basemap", "lightPreset", "dusk")
      map.setConfigProperty('basemap', "showPlaceLabels", false)
      map.setConfigProperty('basemap', "showRoadLabels", false)
      map.setConfigProperty('basemap', "showPointOfInterestLabels", false)
      map.setConfigProperty('basemap', "showTransitLabels", false)

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
            .addTo(map);
      
          // Add a click event listener to the marker
          markerEl.addEventListener('click', () => {
            setSelectedMovie({
              title: movie.title,
              name: location.name,
              lat: location.lat,
              lng: location.lng,
              imageUrl: location.imageUrl
            });
          });
        });
      });
    }

    map.on('style.load', handleStyleLoad);

    return () => {
      if (mapRef.current) {
        mapRef.current.off('style.load', handleStyleLoad);
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [city]);

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
      <button onClick={toggleView} className="absolute bottom-2 right-2 z-20 md:bottom-44 md:right-12 bg-white rounded-lg px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold">
        2D / 3D
      </button>
    </div>
  );
};

export default MapComponent;