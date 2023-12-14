import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/movieLocations.json";
import cityCoordinates from "../utils/cities";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ city }) => {
  const mapContainerRef = useRef(null); // Create a ref for the map container
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize the map if it doesn't exist
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        // ... other map options ...
      });
    }
    if (!cityCoordinates[city]) return;

    const { lat, lng } = cityCoordinates[city];

    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-beta",
      center: [lng, lat],
      zoom: 12,
      pitch: 62,
      bearing: -20,
    });
  
    map.on('style.load', () => {

      map.setConfigProperty("basemap", "lightPreset", "dusk");
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
        map.remove();
        mapRef.current = null;
      }
    };
  }, [city]); // Depend on the city prop

  return <div ref={mapContainerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;

