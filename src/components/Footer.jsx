import { useDispatch, useSelector } from "react-redux";
import { setSelectedMovie } from '../utils/store.js';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.city.favorites);

  const handleMovieSelect = (movie) => {
    dispatch(setSelectedMovie(movie));
  };

  // Calculate the number of skeletons needed to fill up to three items
  const skeletonCount = Math.max(10 - favorites.length, 0);

  return (
    <div className="md:flex justify-center bg-white w-screen z-10 absolute bottom-0 left-0 h-12 hidden">
      <div className="w-8 h-screen bg-white absolute right-0 bottom-0 z-10"></div>
      <div className="w-8 h-screen bg-white absolute left-0 bottom-0 z-10"></div>

      <div className="absolute z-20 bottom-0 left-8 duration-300 delay-200 transition-all">
        <div className="w-[calc(100vw-64px)] bg-teal-950 absolute bottom-8 h-32 rounded-b-2xl md:overflow-x-scroll md:flex items-center space-x-4 px-4">
          {favorites.map((movie) => (
            <div key={movie.title} onClick={() => handleMovieSelect(movie)} className="w-32 cursor-pointer">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1 overflow-hidden">
                <img className="h-full object-cover" src={movie.locationImg} alt={movie.title} />
              </div>
              <h1 className="text-white font-medium text-center truncate">{movie.title}</h1>
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
        <div className="w-40 h-10 left-0 bottom-40 bg-teal-950 absolute z-10 rounded-tr-2xl md:flex items-center justify-center">
          <Link className="text-white font-semibold text-2xl" to="/favorites">Favorites <FontAwesomeIcon className="text-base" icon={faChevronRight} /></Link>
        </div>
      </div>

      <div className="w-screen z-10 absolute bottom-0 bg-white left-0 h-12"></div>

    </div>
  );
};

export default Footer;
