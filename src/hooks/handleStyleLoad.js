import { setSelectedMovie } from "../utils/store";
let isSourceAndLayersAdded = false;
let isHandleStyleLoadExecuted = false;

// TODO: refactor conditional statements for better performance

export const handleStyleLoad = (map, movieLocations, dispatch) => {
  console.log("Styles loading");
  // Set various configuration properties for the map
  map.setConfigProperty("basemap", "lightPreset", "dusk");
  map.setConfigProperty("basemap", "showPlaceLabels", false);
  map.setConfigProperty("basemap", "showRoadLabels", false);
  map.setConfigProperty("basemap", "showPointOfInterestLabels", false);
  map.setConfigProperty("basemap", "showTransitLabels", false);

  if (isHandleStyleLoadExecuted) return;
  console.log("Handling layer load");
  const imageName = "custom-marker";

  // Check if the image already exists on the map
  // New approach: using a promise to handle image loading
  loadImage(map, "marker_red.png", imageName)
    .then((image) => {
      // Add the image only if it's not already added
      if (!map.hasImage(imageName)) {
        map.addImage(imageName, image);
        console.log("Image added");
      }
      if (!isSourceAndLayersAdded) {
        addSourceAndLayers(map, movieLocations);
        isSourceAndLayersAdded = true;
      }
    })
    .catch((error) => {
      console.error("Error loading image:", error);
    });

  setupEventListeners(map, dispatch);
  console.log('event listeners added')

  isHandleStyleLoadExecuted = true;
};

const loadImage = (map, url, name) => {
  return new Promise((resolve, reject) => {
    if (map.hasImage(name)) {
      // Resolve immediately if the image already exists
      resolve();
    } else {
      map.loadImage(url, (error, image) => {
        if (error) {
          reject(error);
        } else {
          resolve(image);
        }
      });
    }
  });
};

const addSourceAndLayers = (map, movieLocations) => {
  const sourceId = "movies";
  // Check if the source already exists on the map
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: "geojson",
      data: movieLocations,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom level to cluster points
      clusterRadius: 50, // Radius of each cluster when clustering points
    });
  }

  // Add a layer for the clusters
  if (!map.getLayer("clusters")) {
    map.addLayer({
      id: "clusters",
      type: "symbol",
      source: sourceId,
      filter: ["has", "point_count"], // Filter for cluster points
      layout: {
        "icon-image": "custom-marker", // Use the same custom marker icon for clusters
        "icon-size": 1.5,
      },
    });
  }

  // Add a layer for the unclustered markers
  if (!map.getLayer("unclustered-markers")) {
    map.addLayer({
      id: "unclustered-markers",
      type: "symbol",
      source: sourceId,
      filter: ["!", ["has", "point_count"]], // Filter for non-cluster points
      layout: {
        "icon-image": "custom-marker", // Use a custom marker icon
        "icon-size": 1.5,
      },
    });
  }
};

// Object to keep track of whether event listeners have been added
const eventListenersAdded = {
  clustersClick: false,
  markersClick: false,
  clustersMouseEnter: false,
  markersMouseEnter: false,
  clustersMouseLeave: false,
  markersMouseLeave: false,
};

const setupEventListeners = (map, dispatch) => {
  // Event handler for clicking on a cluster
  if (!eventListenersAdded.clustersClick) {
    map.on("click", "clusters", (e) => {
      console.log("Cluster click");
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
    eventListenersAdded.clustersClick = true;
  }

  // Event handler for clicking on individual markers
  if (!eventListenersAdded.markersClick) {
    map.on("click", "unclustered-markers", (e) => {
      const feature = e.features[0];
      const serializableFeature = {
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: feature.properties,
      };
      console.log("Marker clicked, dispatching movie:", feature);
      dispatch(setSelectedMovie(serializableFeature));
    });
    eventListenersAdded.markersClick = true;
  }

  // Add the 'pointer' cursor style on hover over the clusters
  if (!eventListenersAdded.clustersMouseEnter) {
    map.on("mouseenter", "clusters", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    eventListenersAdded.clustersMouseEnter = true;
  }
  if (!eventListenersAdded.markersMouseEnter) {
    map.on("mouseenter", "unclustered-markers", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    eventListenersAdded.markersMouseEnter = true;
  }
  if (!eventListenersAdded.clustersMouseLeave) {
    map.on("mouseleave", "clusters", () => {
      map.getCanvas().style.cursor = "";
    });
    eventListenersAdded.clustersMouseLeave = true;
  }
  if (!eventListenersAdded.markersMouseLeave) {
    map.on("mouseleave", "unclustered-markers", () => {
      map.getCanvas().style.cursor = "";
    });
    eventListenersAdded.markersMouseLeave = true;
  }
};
