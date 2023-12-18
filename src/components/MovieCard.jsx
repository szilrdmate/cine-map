// src/components/MovieCards.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';


const MovieCard = ({ movie, onClose }) => {
  if (!movie) return null;

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      imageUrl: PropTypes.string
    }),
    onClose: PropTypes.func.isRequired
  };

  return (
    <div className="movie-card absolute top-[50%] translate-y-[-50%] left-12 text-white bg-teal-950 shadow-2xl z-20 rounded-xl overflow-hidden box-border">
      <button onClick={onClose} className="close-btn absolute top-2 right-2 bg-none border-none text-xl cursor-pointer z-10"><FontAwesomeIcon icon={faXmark} /></button>
      <div>
        {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="w-full h-auto max-w-[320px] aspect-video object-cover" />}
        <div className="absolute top-0 left-0 w-full h-[190px] bg-gradient-to-b from-black to-transparent bg-opacity-25"></div>
      </div>
      <div className="pt-4 px-2">
        <h2 className="font-bold text-3xl mb-4">{movie.title}</h2>
        <div>
          {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className="rounded-3xl w-full h-24 mx-auto object-cover mb-4 shadow-xl" />}
          <div className="flex justify-between font-medium">
            <p className="text-sm">{movie.name}</p>
            <p className="text-sm">{movie.lng}° {movie.lat}°</p>
          </div>
        </div>
        <button className="my-3 w-full rounded-lg py-2 bg-gray-100 text-gray-800 font-medium">Get more info on IMDB</button>
      </div>
    </div>
  );
};


export default MovieCard;
