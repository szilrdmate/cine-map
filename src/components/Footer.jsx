import React, { useState } from "react";

const Footer = ({ favoriteMovies, onSaveFavorite }) => {
  const [movieName, setMovieName] = useState("");

  const handleMovieNameChange = (e) => {
    setMovieName(e.target.value);
  };

  const handleSaveClick = () => {
    if (movieName.trim() !== "") {
      onSaveFavorite(movieName);
      setMovieName("");
    }
  };

  return (
    <div className="bg-gray-800 text-white p-20 absolute bottom-0 w-screen left-0 z-10">
      <h2 className="text-xl font-semibold mb-2">My Favorite Movies</h2>
      <ul>
        {favoriteMovies.map((movie, index) => (
          <li key={index}>{movie}</li>
        ))}
      </ul>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter a movie name"
          value={movieName}
          onChange={handleMovieNameChange}
          className="rounded-l p-2"
        />
        <button
          onClick={handleSaveClick}
          className="bg-blue-500 text-white rounded-r p-2"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Footer;
