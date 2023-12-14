import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../utils/movieLocations.json";
import cityCoordinates from "../utils/cities";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ city }) => {
  useEffect(() => {
    if (!cityCoordinates[city]) return;

    const { lat, lng } = cityCoordinates[city];
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/standard-beta", // You can use other styles that support 3D buildings
      center: [lng, lat],
      zoom: 12,
      pitch: 62, // Set pitch for 3D effect
      bearing: -20, // Optional: Adjust the bearing for the initial map load
      hash: true,
    });
  
    map.on('style.load', () => {
      // Add the 3D buildings layer

      map.setConfigProperty("basemap", "lightPreset", "dusk");
      map.setConfigProperty('basemap', "showPlaceLabels", false)
      map.setConfigProperty('basemap', "showRoadLabels", false)
      map.setConfigProperty('basemap', "showPointOfInterestLabels", false)
      map.setConfigProperty('basemap', "showTransitLabels", false)
      
      map.addLayer({
        'id': '3d-buildings',
        'source': 'composite',
        'source-layer': 'building',
        'filter': ['==', 'extrude', 'true'],
        'type': 'fill-extrusion',
        'minzoom': 15,
        'paint': {
          'fill-extrusion-color': '#aaa',
          'fill-extrusion-height': ["get", "height"],
          'fill-extrusion-base': ["get", "min_height"],
          'fill-extrusion-opacity': 0.6
        }
      });

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
  
          markerEl.addEventListener('click', () => {
            // Implement the openMovieCard functionality
            // openMovieCard({ title: movie.title, year: movie.year, location: location.name, image: movie.image });
          });
        });
      });
    });

    return () => map.remove();
  }, [city]);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;

