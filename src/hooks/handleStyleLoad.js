import { setSelectedMovie } from "../utils/store";

export const handleStyleLoad = (map, movieLocations, dispatch) => {
  console.log("Styles loading");
  map.setConfigProperty("basemap", "lightPreset", "dusk");
  map.setConfigProperty("basemap", "showPlaceLabels", false);
  map.setConfigProperty("basemap", "showRoadLabels", false);
  map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
  map.setConfigProperty("basemap", "showTransitLabels", false);

  console.log('Handling layer load');
  map.loadImage("marker_red.png", (error, image) => {
    if (error) throw error;

    // Add the image to the map style
    map.addImage("custom-marker", image);
    console.log('Image added')

    map.addSource("movies", {
      type: "geojson",
      data: movieLocations,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom level to cluster points
      clusterRadius: 50, // Radius of each cluster when clustering points
    });

    // Add a layer for the clusters themselves
    map.addLayer({
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
    map.addLayer({
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
  map.on("click", "clusters", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["clusters"],
    });
    const clusterId = features[0].properties.cluster_id;
    map
      .getSource("movies")
      .getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;
        map.easeTo({
          center: features[0].geometry.coordinates,
          zoom: zoom,
        });
      });
  });

  // Event handler for clicking on individual markers
  map.on("click", "unclustered-markers", (e) => {
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
  map.on("mouseenter", "clusters", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseenter", "unclustered-markers", () => {
    map.getCanvas().style.cursor = "pointer";
  });
  map.on("mouseleave", "clusters", () => {
    map.getCanvas().style.cursor = "";
  });
  map.on("mouseleave", "unclustered-markers", () => {
    map.getCanvas().style.cursor = "";
  });
  })
};