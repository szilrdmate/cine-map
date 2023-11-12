import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapComponent from "./components/MapComponent"; // Import your MapComponent

function App() {
  // State to store the map coordinates
  const [mapCoordinates, setMapCoordinates] = useState([48.8588443, 2.2943506]);

  // Function to update the map coordinates
  const updateMapCoordinates = (coordinates) => {
    setMapCoordinates(coordinates);
  };

  return (
    <div className="App">
      <Navbar updateMapCoordinates={updateMapCoordinates} />
      {/* Render your map component here and pass mapCoordinates as a prop */}
      <MapComponent coordinates={mapCoordinates} />
    </div>
  );
}

export default App;