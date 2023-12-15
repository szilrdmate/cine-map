import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/movieLocations.json";
import cityCoordinates from "../utils/cities";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ city }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/standard-beta",
        zoom: 14,
      });
    }

    if (!cityCoordinates[city]) return;
    const { lat, lng } = cityCoordinates[city];

    const map = mapRef.current;
    map.jumpTo({ center: [lng, lat], zoom: 16, pitch: 62, bearing: -20 });
    
  
    map.on('style.load', () => {
      map.setConfigProperty("basemap", "lightPreset", "dusk")
      map.setConfigProperty('basemap', "showPlaceLabels", false)
      map.setConfigProperty('basemap', "showRoadLabels", false)
      map.setConfigProperty('basemap', "showPointOfInterestLabels", false)
      map.setConfigProperty('basemap', "showTransitLabels", false)

      // Add markers and popups for movie locations
      movieLocations.forEach((movie) => {
        movie.locations.forEach((location) => {
          const markerEl = document.createElement('div');
          markerEl.textContent = '📍';
          markerEl.style.fontSize = '2.5em';
  
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([location.lng, location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 0 })
                .setHTML(`<h3 style="color: black;">${location.name}</h3>`)
            )
            .addTo(map);
        });
      });
    });

    return () => {
      if (mapRef.current) {
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

  return (
    <div>
      <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />
      <button onClick={toggleView} className="absolute bottom-44 right-12 bg-white rounded-full px-4 py-2 shadow-xl border-[1px] border-solid border-gray-400 font-bold">
        2D/3D
      </button>
    </div>
  );
};

export default MapComponent;
