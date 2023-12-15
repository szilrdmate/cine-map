import React from "react";

const MovieCard = ({ movie, onClose }) => {
  if (!movie) return null;


  return (
    <div className="movie-card absolute top-3 left-3 p-8 text-white bg-teal-950 shadow-xl z-20 rounded-xl">
      <button onClick={onClose} className="close-btn absolute top-2 right-2 bg-none border-none text-xl cursor-pointer">X</button>
      <img src="" />
      <h2 className="font-bold text-2xl">{movie.title}</h2>
      <p>Location: {movie.name}</p>
      <p>Latitude: {movie.lat}°</p>
      <p>Longitude: {movie.lng}°</p>
    </div>
  );
};


export default MovieCard;