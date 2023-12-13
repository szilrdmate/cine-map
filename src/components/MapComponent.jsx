import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../movieLocations.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = ({ coordinates, openMovieCard }) => {
  // Create state to hold movie details for the MovieCard
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v11",
      center: coordinates,
      zoom: 16.5,
      pitch: 45,
      bearing: -17.6,
    });
  
    map.on('load', () => {
      movieLocations.forEach((movie) => {
        movie.locations.forEach((location) => {
          // Create a marker element
          const markerEl = document.createElement('div');
          markerEl.textContent = '📍'; // iOS pin emoji
          markerEl.style.fontSize = '2.5em'; // Size of the emoji
  
          // Create a marker using the custom element
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([location.lng, location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 0 })
                .setHTML(`<h3 style="color: black;">${location.name}</h3>`) // Set font color to black
            )
            .addTo(map);
  
          // Add a click event listener to open the MovieCard when a pin is clicked
          markerEl.addEventListener('click', () => {
            openMovieCard({ title: movie.title, year: movie.year, location: location.name, image: movie.image });
          });
        });
      });
    });
  
    return () => map.remove();
  }, [coordinates, openMovieCard]);
  

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;
