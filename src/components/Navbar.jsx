import React from "react";

const Navbar = ({ onCitySelect }) => {
  const cities = [
    { name: "Paris", coordinates: [2.2943506, 48.8588443] },
    { name: "Budapest", coordinates: [19.040235, 47.497912] },
    { name: "London", coordinates: [-0.1278, 51.5074] },
    { name: "New York", coordinates: [-74.0060, 40.7128] },
  ];

  const handleCityClick = (coordinates) => {
    onCitySelect(coordinates);
  };

  return (
    <div className="bg-white p-5 flex justify-between items-center rounded-b-2xl shadow-2xl shadow-slate-950 absolute z-50 w-screen px-50">
      <div className="logo">
        {/* Add your logo image here */}
        <img src="./src/public/logo.svg" alt="App Logo" className="h-10" />
      </div>
      <div className="space-x-4">
        {cities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCityClick(city.coordinates)}
            className="text-slate-950 px-2 text-lg font-semibold hover:text-blue-600"
          >
            {city.name}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search other cities"
          className="border rounded-l-2xl px-2 py-1 bg-white"
        />
        <button className="bg-blue-600 text-white rounded-r-2xl px-3 py-1 border-2 border-blue-600">
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;