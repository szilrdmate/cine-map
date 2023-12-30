// src/components/MapComponent.jsx

import { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import movieLocations from "../data/geoJson.json";
import MovieCard from "./MovieCard";
import { setSelectedMovie } from "../utils/store.js";

// Mapbox token stored in as a .env variable
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  // Redux selectors to obtain state data
  const { type, coordinates } = useSelector((state) => state.city.location);
  const city = useSelector((state) => state.city.city);
  const selectedMovie = useSelector((state) => state.city.selectedMovie); // Use selected movie from Redux

  // Refs for map container and map instance
  const mapContainerRef = useRef(null);
  const map = useRef(null);

  // Hook to dispatch Redux actions
  const dispatch = useDispatch();

  // Callback to handle style load event, also use callback so it only executes once
  const handleStyleLoad = useCallback(() => {
    console.log("Styles loading");
    map.current.setConfigProperty("basemap", "lightPreset", "dusk");
    map.current.setConfigProperty("basemap", "showPlaceLabels", false);
    map.current.setConfigProperty("basemap", "showRoadLabels", false);
    map.current.setConfigProperty(
      "basemap",
      "showPointOfInterestLabels",
      false
    );
    map.current.setConfigProperty("basemap", "showTransitLabels", false);
  }, []);

  const handleEventListeners = useCallback(() => {
    console.log('Handling event listener')
    // Event handler for clicking on a cluster
    map.current.on("click", "clusters", (e) => {
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map.current
        .getSource("movies")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.current.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
    });

    // Event handler for clicking on individual markers
    map.current.on("click", "unclustered-markers", (e) => {
      const feature = e.features[0];
      const serializableFeature = {
        // Copy only the properties you need
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: feature.properties, // Assuming these are serializable
      };
      console.log("Marker clicked, dispatching movie:", feature);
      dispatch(setSelectedMovie(serializableFeature));
    });

    // Add the 'pointer' cursor style on hover over the clusters
    map.current.on("mouseenter", "clusters", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseenter", "unclustered-markers", () => {
      map.current.getCanvas().style.cursor = "pointer";
    });
    map.current.on("mouseleave", "clusters", () => {
      map.current.getCanvas().style.cursor = "";
    });
    map.current.on("mouseleave", "unclustered-markers", () => {
      map.current.getCanvas().style.cursor = "";
    });
  }, [dispatch]);

  const handleLayerLoad = useCallback(() => {
    console.log('Handling layer load');
    map.current.loadImage("marker_red.png", (error, image) => {
      if (error) throw error;

      // Add the image to the map style
      map.current.addImage("custom-marker", image);
      console.log('Image added')

      map.current.addSource("movies", {
        type: "geojson",
        data: movieLocations,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom level to cluster points
        clusterRadius: 50, // Radius of each cluster when clustering points
      });

      // Add a layer for the clusters themselves
      map.current.addLayer({
        id: "clusters",
        type: "symbol",
        source: "movies",
        filter: ["has", "point_count"], // Filter for cluster points
        layout: {
          "icon-image": "custom-marker", // Use the same custom marker icon for clusters
          "icon-size": 1.5,
        },
      });

      // Add a layer for the unclustered markers
      map.current.addLayer({
        id: "unclustered-markers",
        type: "symbol",
        source: "movies",
        filter: ["!", ["has", "point_count"]], // Filter for non-cluster points
        layout: {
          "icon-image": "custom-marker", // Use a custom marker icon
          "icon-size": 1.5,
        },
      });
      handleEventListeners();
    });
  }, [handleEventListeners]);

  // useEffect to initialize the map
  useEffect(() => {
    console.log("useEffect running");

    // Initialize the map only if it's not already created
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/standard-beta",
      zoom: 14,
      pitch: 60,
      center: [2.29392, 48.85934],
    });

    // map.current.on("style.load", handleStyleLoad);
    map.current.on("style.load", () => {
      handleStyleLoad();
      handleLayerLoad();
    });

    // Cleanup function to remove the map
    return () => {
      console.log("Removing map instance")
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [handleLayerLoad, handleStyleLoad]);

  // Handle city location changes
  useEffect(() => {
    switch (type) {
      case "coordinates":
        map.current.flyTo({
          center: [coordinates.lng, coordinates.lat],
          zoom: 16,
        });
        break;
      default:
        map.current.flyTo({
          center: [2.29392, 48.85934],
          zoom: 16,
        });
    }
  }, [type, coordinates, city]);

  return (
    <div>
      <div ref={mapContainerRef} className='w-screen h-screen' />
      {selectedMovie && (
        <MovieCard
          movie={selectedMovie}
          onClose={() => dispatch(setSelectedMovie(null))}
        />
      )}
    </div>
  );
};

export default MapComponent;
