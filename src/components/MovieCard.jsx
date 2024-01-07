/* eslint-disable react/prop-types */
// src/components/MovieCards.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularStar } from '@fortawesome/free-regular-svg-icons'; // Import the regular star
import { faHeart as solidStar } from '@fortawesome/free-solid-svg-icons'; // Import the solid star
import { useState } from 'react';
import { addFavoriteMovie, removeFavoriteMovie, setMapCoordinates } from '../redux/store';
import "../styles/keyframes.css"
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorage from '../hooks/useLocalStorage';

const MovieCard = ({ movie, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.city.favorites)
  const isFavorite = favorites.some(favMovie => favMovie.properties.title === movie.properties.title);

  const [localFavorites, setLocalFavorites] = useLocalStorage('favorites', []);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      const updatedFavorites = localFavorites.filter(favMovie => favMovie.properties.title !== movie.properties.title);
      setLocalFavorites(updatedFavorites); // Update local storage
      dispatch(removeFavoriteMovie(movie)); // Update Redux state
    } else {
      const updatedFavorites = [...localFavorites, movie];
      setLocalFavorites(updatedFavorites); // Update local storage
      dispatch(addFavoriteMovie(movie)); // Update Redux state
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };

  const handleShowOnMap = () => {
    const [lng, lat] = movie.geometry.coordinates;
    dispatch(setMapCoordinates({ lat, lng }));
    if(onClose) onClose(); // Optionally close the card
  };
  
  if (!movie || !movie.properties) {
    console.error("Invalid movie object:", movie);
    return null;
  }

  const animationClass = isClosing ? 'slide-out' : 'slide-in';

  return (
    <div className={`movie-card ${animationClass} mx-4 md:h-[unset] md:w-[unset] absolute md:m-[unset] top-24 left-0 md:top-[16%] md:translate-y-[-50%] md:left-12 text-white bg-teal-950 shadow-2xl z-[200] rounded-xl overflow-hidden box-border md:max-w-[320px]`}>
      <button onClick={handleClose} className="shadow-2xl close-btn absolute top-2 right-3 bg-none border-none text-2xl cursor-pointer z-10"><FontAwesomeIcon icon={faXmark} /></button>
      <button onClick={handleFavoriteClick} className="shadow-2xl close-btn absolute top-2 left-3 bg-none border-none text-2xl cursor-pointer z-10"><FontAwesomeIcon icon={isFavorite ? solidStar : regularStar} /></button>
      <div>
        {movie.properties.imageUrl && (
          <img src={movie.properties.imageUrl} alt={movie.properties.title} className="w-full h-auto aspect-video object-cover" />
        )}
      </div>
      <div className='absolute top-0 left-0 w-full aspect-video bg-gradient-to-b from-black to-transparent opacity-50'></div>
      <div className="pt-4 px-2">
        <h2 className="font-bold text-3xl mb-4">{movie.properties.title}</h2>
        <div>
          {movie.properties.locationImg && (
            <img src={movie.properties.locationImg} alt={movie.properties.title} className="rounded-xl w-full h-48 mx-auto object-cover mb-4 shadow-xl" />
          )}
          <div className="flex justify-between font-medium">    
            <p className="text-sm">{movie.properties.name}</p>
            <p className="text-sm">{parseFloat(movie.geometry.coordinates[0]).toFixed(2)}° {parseFloat(movie.geometry.coordinates[1]).toFixed(2)}°</p>
          </div>
        </div>
        <button onClick={handleShowOnMap} className="my-3 w-full rounded-lg py-2 bg-gray-100 text-gray-800 font-medium">Show on Map</button>
      </div>
    </div>
  );
};

export default MovieCard;
