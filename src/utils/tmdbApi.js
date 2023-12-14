import axios from 'axios';

const tmdbApiKey = import.meta.env.VITE_TMDB_API_KEY;
const baseURL = 'https://api.themoviedb.org/3';

export const fetchMovieLocations = async (movieId) => {
  try {
    const response = await axios.get(`${baseURL}/movie/${movieId}`, {
      params: {
        api_key: tmdbApiKey,
        append_to_response: 'release_dates'
      }
    });
    // Process and return the data here
    return response.data;
  } catch (error) {
    console.error('Error fetching movie locations:', error);
    return null; // Handling errors
  }
};
