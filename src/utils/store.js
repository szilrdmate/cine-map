import { configureStore } from '@reduxjs/toolkit';

// Redux State
const initialState = {
  location: {
    type: 'default', // 'coordinates' or 'movie'
    coordinates: { lat: 0, lng: 0 },
  },
  favorites: [] // Array to store favorite movies
};

// Action Types
const ADD_FAVORITE_MOVIE = 'ADD_FAVORITE_MOVIE';
const REMOVE_FAVORITE_MOVIE = 'REMOVE_FAVORITE_MOVIE';
const SET_SELECTED_MOVIE = 'SET_SELECTED_MOVIE';

// Action Creators
export const addFavoriteMovie = (movie) => ({
  type: ADD_FAVORITE_MOVIE,
  payload: movie,
});

export const removeFavoriteMovie = (movie) => ({
  type: REMOVE_FAVORITE_MOVIE,
  payload: movie,
});

export const setMapCoordinates = (coordinates) => ({
  type: 'SET_COORDINATES',
  payload: coordinates,
});

export const setSelectedMovie = (movie) => ({
  type: SET_SELECTED_MOVIE,
  payload: movie,
});

// Reducer
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_COORDINATES':
      return { ...state, location: { type: 'coordinates', coordinates: action.payload }};
    case 'SET_MOVIE_LOCATION':
      return { ...state, location: { type: 'movie', movieId: action.payload }};
    case 'SET_DEFAULT_LOCATION':
      return { ...state, location: { type: 'default', coordinates: action.payload }};
    case ADD_FAVORITE_MOVIE:
        return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE_MOVIE:
        return { ...state, favorites: state.favorites.filter(movie => movie.title !== action.payload.title) };
    case SET_SELECTED_MOVIE:
        return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
}

// Configure and export the store
const store = configureStore({
  reducer: {
    city: mapReducer,
  },
});

export default store;
