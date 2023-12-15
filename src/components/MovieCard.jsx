import React from "react";

const MovieCard = ({ movie, onClose }) => {
  if (!movie) return null;


  return (
    <div className="movie-card absolute top-[50%] translate-y-[-50%] left-12 text-white bg-teal-950 shadow-xl z-20 rounded-xl overflow-hidden">
      <button onClick={onClose} className="close-btn absolute top-2 right-2 bg-none border-none text-xl cursor-pointer z-10">X</button>
      <div>
        {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto max-w-[350px] aspect-video object-cover" />}
        <div className="absolute top-0 left-0 w-full h-[190px] bg-gradient-to-b from-black to-transparent bg-opacity-25"></div>
      </div>
      <div className="px-8 py-4">
        <h2 className="font-bold text-2xl">{movie.title}</h2>
        <p className="text-gray-300">Location: {movie.name}</p>
        <p className="text-gray-300">Latitude: {movie.lat}°</p>
        <p className="text-gray-300">Longitude: {movie.lng}°</p>
      </div>
    </div>
  );
};


export default MovieCard;