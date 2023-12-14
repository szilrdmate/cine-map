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
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12,
    });
  
    map.on('load', () => {
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
            openMovieCard({ title: movie.title, year: movie.year, location: location.name, image: movie.image });
          });
        });
      });
    });
  
    return () => map.remove();
  }, [city]);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;