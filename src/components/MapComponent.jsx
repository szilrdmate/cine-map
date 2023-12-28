import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/geoJson.json";
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
      mapRef.current.on("load", () => {
        mapRef.current.setConfigProperty("basemap", "lightPreset", "dusk");
        mapRef.current.setConfigProperty("basemap", "showPlaceLabels", false);
        mapRef.current.setConfigProperty("basemap", "showRoadLabels", false);
        mapRef.current.setConfigProperty("basemap", "showPointOfInterestLabels", false);
        mapRef.current.setConfigProperty("basemap", "showTransitLabels", false);
  
        mapRef.current.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
          if (error) {
              console.error("Error loading pin image:", error);
              return;
          }
          mapRef.current.addImage('cat', image);
      });
            // Add markers and popups for movie locations
        mapRef.current.addSource('movie-location', {
            type: 'geojson',
            data: movieLocations
          });
  
    
        mapRef.current.addLayer({
          id: 'movie-location',
          type: 'symbol',
          source: 'movie-location',
          layout: {
            'icon-image': 'cat',
            'icon-size': 0.25,
          }
        });

        mapRef.current.on('styleimagemissing', function(e) {
          var id = e.id;
          if (id === 'cat') {
              mapRef.current.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/cat.png', (error, image) => {
                  if (error) {
                      console.error("Error loading pin image:", error);
                      return;
                  }
                  mapRef.current.addImage('cat', image);
              });
          }
      });
    
        // Handle click event on the layer
        mapRef.current.on('click', 'movie-locations', (e) => {
          const properties = e.features[0].properties;
          dispatch(setSelectedMovie(properties));
        });
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('Navigating useEffect')
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
}
export default MapComponent;