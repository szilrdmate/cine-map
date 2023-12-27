// src/components/FavoriteItem.jsx
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { /*setMapCoordinates,*/ removeFavoriteMovie, addFavoriteMovie } from '../utils/store';

const FavoriteItem = ({ favorite }) => {
  const dispatch = useDispatch();

  const truncate = (str, num) => {
    return str.length > num ? str.slice(0, num) + '...' : str;
  };

  /*const handleShowOnMap = () => {
    dispatch(setMapCoordinates({ lat: favorite.lat, lng: favorite.lng }))
  };*/

  const handleFavoriteClick = () => {
    const isFavorite = favorites.some(favMovie => favMovie.title === favorite.title);
    if (isFavorite) {
      dispatch(removeFavoriteMovie(favorite));
    } else {
      dispatch(addFavoriteMovie(favorite));
    }
  };

  return (
    <div className="bg-teal-950 rounded-xl shadow-2xl overflow-hidden relative text-white max-w-xs mx-auto">
      <button onClick={handleFavoriteClick} className="absolute top-2 left-2 z-10">
        <FontAwesomeIcon icon={faStar} />
      </button>
      {favorite.imageUrl && (
        <img src={favorite.imageUrl} alt={favorite.title} className="w-full h-auto aspect-video object-cover" />
      )}
      <div className="p-4">
        <h2 className="font-bold text-3xl mb-4">{truncate(favorite.title, 25)}</h2>
        {favorite.locationImg && (
          <img src={favorite.locationImg} alt={favorite.title} className="rounded-xl w-full h-48 object-cover mb-4 shadow-xl" />
        )}
        <div className="flex justify-between text-sm font-medium">    
          <p>{favorite.name}</p>
          <p>{parseFloat(favorite.lng).toFixed(2)}°, {parseFloat(favorite.lat).toFixed(2)}°</p>
        </div>
        {/*<button onClick={handleShowOnMap} className="w-full rounded-lg py-2 bg-gray-100 text-gray-800 font-medium mt-2">
          Show on Map
        </button>*/}
      </div>
    </div>
  );
};

export default FavoriteItem;
