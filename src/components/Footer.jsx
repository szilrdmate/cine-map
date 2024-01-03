import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setSelectedMovie, toggleFavoriteOpen, setFavorites } from '../redux/store.js';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import useLocalStorage from "../hooks/useLocalStorage.js";

const Footer = () => {
  const dispatch = useDispatch();
  const reduxFavorites = useSelector((state) => state.city.favorites);
  const [localFavorites, setLocalFavorites] = useLocalStorage('favorites', []);

    // Synchronize Redux state with local storage on component mount
    useEffect(() => {
      if (localFavorites.length > 0) {
        // Dispatch an action to update Redux state with data from local storage
        // Make sure to implement `setFavorites` action in your Redux store
        dispatch(setFavorites(localFavorites));
      }
    }, [localFavorites, dispatch]);

  const handleToggleFavorites = () => {
    dispatch(toggleFavoriteOpen());
  }

  const handleMovieSelect = (movie) => {
    dispatch(setSelectedMovie(movie));
  };

  // Calculate the number of skeletons needed to fill up to three items
  const skeletonCount = Math.max(10 - reduxFavorites.length, 0);

  return (
    <div className="w-screen absolute z-10 left-0">
      <div className="w-screen absolute bottom-0 duration-300 delay-300 transition-all">
        <div className="w-40 h-10 left-0 bg-teal-950 z-10 rounded-tr-2xl md:flex items-center justify-center">
          <Link className="text-white font-semibold text-2xl" onClick={handleToggleFavorites}>Favorites <FontAwesomeIcon className="text-base" icon={faChevronRight} /></Link>
        </div>
        <div className="bg-teal-950 overflow-x-scroll flex items-center space-x-4 pt-4 px-4">
          {reduxFavorites.map((movie) => (
            <div key={movie.properties.title} onClick={() => handleMovieSelect(movie)} className="w-32 cursor-pointer">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1 overflow-hidden">
                <img className="h-full object-cover" src={movie.properties.imageUrl} alt={movie.properties.title} />
              </div>
              <h1 className="text-white font-medium text-center truncate">{movie.properties.title}</h1>
            </div>
          ))}
  
          {/* Render additional skeletons if needed */}
          {Array.from({ length: skeletonCount }, (_, index) => (
            <div key={`skeleton-${index}`} className="w-32">
              <div className="h-20 w-32 bg-teal-900 rounded-xl"></div>
              <div className="h-5 bg-teal-900 rounded mt-2 mx-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Footer;
