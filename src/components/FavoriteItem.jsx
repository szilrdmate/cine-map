// src/components/FavoriteItem.jsx
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { removeFavoriteMovie, addFavoriteMovie } from '../redux/store';

const FavoriteItem = ({ favorite }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.city.favorites)

  const handleFavoriteClick = () => {
    if (favorite && favorite.properties) {
      dispatch(removeFavoriteMovie(favorite));
    } else {
      console.error("Invalid favorite object:", favorite);
    }
  
    const favoriteTitle = favorite.properties.title;
  
    // Check if the favorite is already in favorites
    const isFavorite = favorites.some(favMovie => favMovie.properties.title === favoriteTitle);
  
    if (isFavorite) {
      // Remove the favorite from favorites
      dispatch(removeFavoriteMovie(favorite));
    } else {
      // This else part may not be necessary if this component only deals with favorites
      // Add the favorite to favorites (consider if this is really needed)
      dispatch(addFavoriteMovie(favorite));
    }
  };

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  return (
    <div className="bg-teal-950 rounded-xl shadow-2xl overflow-hidden relative text-white max-w-xs mx-auto">
      <button onClick={handleFavoriteClick} className="absolute top-2 left-2 z-10">
        <FontAwesomeIcon icon={faStar} />
      </button>
      {favorite.properties.imageUrl && (
        <img src={favorite.properties.imageUrl} alt={favorite.properties.title} className="w-full h-auto aspect-video object-cover" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-xl mb-4">{truncate(favorite.properties.title, 20)}</h2>
        {favorite.properties.locationImg && (
          <img src={favorite.properties.locationImg} alt={favorite.properties.title} className="rounded-xl w-full h-48 object-cover mb-4 shadow-xl" />
        )}
        <div className="flex justify-between text-sm text-gray-200 font-medium">    
          <p>{favorite.properties.name}</p>
          <p>{parseFloat(favorite.geometry.coordinates[0]).toFixed(2)}° {parseFloat(favorite.geometry.coordinates[1]).toFixed(2)}°</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
