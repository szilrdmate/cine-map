/* eslint-disable react/prop-types */
// src/components/MovieCards.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { addFavoriteMovie, removeFavoriteMovie } from '../utils/store';
import "./keyframes.css"
import { useDispatch, useSelector } from 'react-redux';

const MovieCard = ({ movie, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.city.favorites)

  const handleFavoriteClick = () => {
    // Check if the movie is already in favorites
    // eslint-disable-next-line no-undef
    const isFavorite = favorites.some(favMovie => favMovie.title === movie.title);

    if (isFavorite) {
      dispatch(removeFavoriteMovie(movie));
    } else {
      dispatch(addFavoriteMovie(movie));
    }
  }

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 500);
  };


  if (!movie) return null;

  const animationClass = isClosing ? 'slide-out' : 'slide-in';

  return (
    <div className={`movie-card ${animationClass} absolute top-[20%] translate-y-[-50%] left-12 text-white bg-teal-950 shadow-2xl z-20 rounded-xl overflow-hidden box-border`}>
      <button onClick={handleClose} className="shadow-2xl close-btn absolute top-2 right-2 bg-none border-none text-xl cursor-pointer z-10"><FontAwesomeIcon icon={faXmark} /></button>
      <button onClick={handleFavoriteClick} className="shadow-2xl close-btn absolute top-2 left-2 bg-none border-none text-xl cursor-pointer z-10"><FontAwesomeIcon icon={faStar} /></button>
      <div>
        {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto max-w-[320px] aspect-video object-cover" />}
       
      </div>
      <div className="pt-4 px-2">
        <h2 className="font-bold text-3xl mb-4">{movie.title}</h2>
        <div>
          {movie.locationImg && <img src={movie.locationImg} alt={movie.title} className="rounded-xl max-w-[304px] w-full max-w h-48 mx-auto object-cover mb-4 shadow-xl" />}
          <div className="flex justify-between font-medium">
            <p className="text-sm">{movie.name}</p>
            <p className="text-sm">{parseFloat(movie.lng).toFixed(2)}° {parseFloat(movie.lat).toFixed(2)}°</p>
          </div>
        </div>
        <button className="my-3 w-full rounded-lg py-2 bg-gray-100 text-gray-800 font-medium">Get more info on IMDB</button>
      </div>
    </div>
  );
};

export default MovieCard;
