import React, { useState } from "react";
import Navbar from "./components/Navbar";
import MapComponent from "./components/MapComponent";
import Footer from "./components/Footer";
import MovieCard from "./components/MovieCard";

function App() {
  // State to store the map coordinates
  const [mapCoordinates, setMapCoordinates] = useState([48.8588443, 2.2943506]);

  // State to store favorite movies
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const [isMovieCardOpen, setIsMovieCardOpen] = useState(false);

  // State to store movie details
  const [movieDetails, setMovieDetails] = useState(null);

  // Function to update the map coordinates
  const updateMapCoordinates = (coordinates) => {
    setMapCoordinates(coordinates);
  };

  // Function to add a movie to favorites
  const addFavoriteMovie = (movie) => {
    setFavoriteMovies((prevFavorites) => [...prevFavorites, movie]);
  };

  // Function to open the MovieCard
  const openMovieCard = (details) => {
    setMovieDetails(details);
    setIsMovieCardOpen(true);
  };

  // Function to close the MovieCard
  const closeMovieCard = () => {
    setIsMovieCardOpen(false);
  };

  return (
    <div className="App">
      <Navbar onCitySelect={updateMapCoordinates} />
      <MapComponent
        coordinates={mapCoordinates}
        openMovieCard={openMovieCard}
      />
      {isMovieCardOpen && (
        <MovieCard
          title={movieDetails.title}
          year={movieDetails.year}
          location={movieDetails.location}
          image={movieDetails.image}
          isOpen={isMovieCardOpen}
          onClose={closeMovieCard}
        />
      )}
      <Footer
        favoriteMovies={favoriteMovies}
        onSaveFavorite={addFavoriteMovie}
      />
    </div>
  );
}

export default App;
