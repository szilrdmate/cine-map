/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { removeFavoriteMovie, addFavoriteMovie } from '../utils/store';

const FavoriteItem = ({ favorite, movie }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.city.favorites);

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  const handleFavoriteClick = () => {
    const isFavorite = favorites.some(favMovie => favMovie.properties.title === movie.properties.title);
  
    if (isFavorite) {
      dispatch(removeFavoriteMovie(movie));
    } else {
      dispatch(addFavoriteMovie(movie));
    }
  };

  if (!favorite || !favorite.properties || !favorite.geometry) {
    return null;
  }

  return (
    <div className="bg-teal-950 rounded-xl shadow-2xl overflow-hidden relative text-white max-w-xs mx-auto">
      <button onClick={handleFavoriteClick} className="absolute top-2 left-2 z-10">
        <FontAwesomeIcon icon={faStar} />
      </button>
      {favorite.properties.imageUrl && (
        <img src={favorite.properties.imageUrl} alt={favorite.properties.title} className="w-full h-auto aspect-video object-cover" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-3xl mb-4">{truncate(favorite.properties.title, 25)}</h2>
        {favorite.properties.locationImg && (
          <img src={favorite.properties.locationImg} alt={favorite.properties.title} className="rounded-xl w-full h-48 object-cover mb-4 shadow-xl" />
        )}
        <div className="flex justify-between text-sm font-medium">    
          <p>{favorite.properties.name}</p>
          <p>{parseFloat(favorite.geometry.coordinates[0]).toFixed(2)}°, {parseFloat(favorite.geometry.coordinates[1]).toFixed(2)}°</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
