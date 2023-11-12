import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../movieLocations.json";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v11",
      center: [2.294694, 48.858093],
      zoom: 16.5,
      pitch: 45,
      bearing: -17.6,
    });

    map.on("load", () => {
      map.addLayer({
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#808080",
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.8,
          "fill-extrusion-vertical-gradient": true,
        },
      });
      movieLocations.forEach((movie) => {
        movie.locations.forEach((location) => {
          // Create a marker element
          const markerEl = document.createElement("div");
          markerEl.textContent = "📍"; // iOS pin emoji
          markerEl.style.fontSize = "2.5em"; // Size of the emoji

          // Create a marker using the custom element
          const marker = new mapboxgl.Marker(markerEl)
            .setLngLat([location.lng, location.lat])
            .setPopup(
              new mapboxgl.Popup({ offset: 0 })
                .setHTML(`<h3 style="color: black;">${location.name}</h3>`) // Set font color to black
            )
            .addTo(map);

          // Add a zoom event listener to resize markers
          map.on("zoom", () => {
            const zoom = map.getZoom();
            const newSize = zoom * 0.3 // Adjust the size based on zoom level
            markerEl.style.fontSize = `${newSize}em`;
          });
        });
      });
    });

    return () => map.remove();
  }, []);

  return <div id="map" style={{ width: "100%", height: "100vh" }} />;
};

export default MapComponent;