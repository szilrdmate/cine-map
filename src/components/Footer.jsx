// src/components/Footer.jsx

const Footer = () => {

  {/*const handleFavoriteSelect = (movieId) => {
    const selectedMovie = movieLocations.find(movie => movie.id === movieId);
    if (selectedMovie) {
      dispatch({ type: 'SET_LOCATION', payload: { type: 'movie', coordinates: selectedMovie.locations[0] } });
    }
  }; */}


  return (
    <div className="md:flex justify-center bg-white w-screen z-10 absolute bottom-0 left-0 h-12 hidden">
      <div className="w-8 h-screen bg-white absolute right-0 bottom-0 z-10"></div>
      <div className="w-8 h-screen bg-white absolute left-0 bottom-0 z-10"></div>

      <div className="absolute -bottom-28 -z-10 hover:z-20 hover:bottom-0 left-8 duration-300 delay-200 transition-all">
        <div className="w-[calc(100vw-64px)] bg-teal-950 absolute bottom-8 h-32 rounded-b-2xl md:overflow-x-scroll md:flex items-center space-x-4 px-4">
          <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
            <div className="w-32">
              <div className="h-20 w-32 bg-teal-800 rounded-xl grid place-items-center mb-1">Movie</div>
              <h1 className="text-white font-medium text-center">Title of movie</h1>
            </div>
        </div>
        <div className="w-40 h-10 left-0 bottom-40 bg-teal-950 absolute z-10 rounded-tr-2xl md:flex items-center justify-center"><a className="text-white font-semibold text-2xl" href="#">Favorites</a></div>
      </div>

      <div className="w-screen z-10 absolute bottom-0 bg-white left-0 h-12"></div>

    </div>
  );
};

export default Footer;
