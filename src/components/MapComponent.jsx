import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/movieLocations.json";
import MovieCard from "./MovieCard";
import { setSelectedMovie } from "../utils/store.js";
import { useMediaQuery } from "react-responsive";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const { type, coordinates } = useSelector((state) => state.city.location);
  const city = useSelector((state) => state.city.city);
  const selectedMovie = useSelector((state) => state.city.selectedMovie); // Use selected movie from Redux
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery({query: '(min-width: 768px)'});

  const toggleView = () => {
    const map = mapRef.current;
    console.log('Pitch to 60')
    if (map.getPitch() === 0) {
      map.easeTo({ pitch: 60, bearing: -20 });
    } else {
      console.log('Pitch to 0')
      map.easeTo({ pitch: 0, bearing: 0 });
    }
  };

  const handleStyleLoad = useCallback(() => {
    console.log("Styles loading");
      mapRef.current.setConfigProperty("basemap", "lightPreset", "dusk");
      mapRef.current.setConfigProperty("basemap", "showPlaceLabels", false);
      mapRef.current.setConfigProperty("basemap", "showRoadLabels", false);
      mapRef.current.setConfigProperty("basemap", "showPointOfInterestLabels", false);
      mapRef.current.setConfigProperty("basemap", "showTransitLabels", false);

      // Add markers and popups for movie locations
      movieLocations.forEach((movie) => {
        movie.locations.forEach((location) => {
          const markerEl = document.createElement("div");
          markerEl.className = "cursor-pointer";
          markerEl.textContent = "📍";
          markerEl.style.fontSize = "2.5em";

          new mapboxgl.Marker(markerEl)
            .setLngLat([location.lng, location.lat])
            .addTo(mapRef.current);

          markerEl.addEventListener("click", () => {
            dispatch(setSelectedMovie({
              ...movie,
              name: location.name,
              lat: location.lat,
              lng: location.lng,
              imageUrl: location.imageUrl,
              locationImg: location.locationImg,
            }));
          });
        });
      });
  }, []);

  useEffect(() => {
    console.log("useEffect running");      
    // Initialize the map only if it's not already created
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-beta",
        zoom: 14,
        pitch: 62,
        center: [2.29392, 48.85934],
      });
      mapRef.current.on("style.load", handleStyleLoad);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    switch (type) {
      case "coordinates":
        mapRef.current.flyTo({ center: [coordinates.lng, coordinates.lat], zoom: 16 });
        break;
      default:
        mapRef.current.flyTo({ center: [2.29392, 48.85934], zoom: 16 });
    }
  },[type, coordinates, city])

  return (
    <div>
      <div ref={mapContainerRef} className="w-screen h-screen" />
      {selectedMovie && <MovieCard movie={selectedMovie} onClose={() => dispatch(setSelectedMovie(null))} />}
      {isDesktop && (<button
        onClick={toggleView}
        className='absolute z-[19] top-28 right-6 bg-white rounded-lg px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold'>
        2D / 3D
      </button>)}
    </div>
  );
};

export default MapComponent;