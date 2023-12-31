import { setSelectedMovie } from "../utils/store";

export const handleStyleLoad = (map, movieLocations, dispatch) => {
  console.log("Styles loading");
  map.current.setConfigProperty("basemap", "lightPreset", "dusk");
  map.current.setConfigProperty("basemap", "showPlaceLabels", false);
  map.current.setConfigProperty("basemap", "showRoadLabels", false);
  map.current.setConfigProperty("basemap", "showPointOfInterestLabels", false);
  map.current.setConfigProperty("basemap", "showTransitLabels", false);

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
  })
};