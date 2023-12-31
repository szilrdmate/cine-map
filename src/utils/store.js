import { configureStore } from '@reduxjs/toolkit';

// Redux State
const initialState = {
  location: {
    type: 'default', // 'coordinates' or 'movie'
    coordinates: { lat: 48.85934, lng: 2.29392 },
  },
  favorites: [], // Array to store favorite movies
  favoriteOpen: false,
};

// Action Creators
export const addFavoriteMovie = (movie) => ({
  type: 'ADD_FAVORITE_MOVIE',
  payload: movie,
});

export const removeFavoriteMovie = (movie) => ({
  type: 'REMOVE_FAVORITE_MOVIE',
  payload: movie,
});

export const setMapCoordinates = (coordinates) => ({
  type: 'SET_COORDINATES',
  payload: coordinates,
});

export const setSelectedMovie = (movie) => ({
  type: 'SET_SELECTED_MOVIE',
  payload: movie,
});

export const toggleFavoriteOpen = () => ({
  type: 'TOGGLE_FAVORITE_OPEN',
});


// Reducer
function mapReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_COORDINATES':
      return { ...state, location: { type: 'coordinates', coordinates: action.payload }};
    case 'ADD_FAVORITE_MOVIE':
        return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE_MOVIE':
        return { ...state, favorites: state.favorites.filter(movie => movie.title !== action.payload.title) };
    case 'SET_SELECTED_MOVIE':
        return { ...state, selectedMovie: action.payload };
    case 'TOGGLE_FAVORITE_OPEN':
        return { ...state, favoriteOpen: !state.favoriteOpen }; 
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
