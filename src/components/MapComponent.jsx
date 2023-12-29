import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

const MapComponent = () => {
  const mapContainerRef = useRef(null);
  
  useEffect(() => {
    let map = null
    console.log('Init map')
    // Initialize map
     map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/standard-beta',
        zoom: 16,
        pitch: 62,
        center: [2.29392, 48.85934],
    });

    // Clean up on unmount
    return () => map && map.remove();

}, []);
  
  return <div ref={mapContainerRef} style={{ height: '100vh', width: '100vw' }} />
}

export default MapComponent;