import { configureStore } from '@reduxjs/toolkit';

// TODO: use slicing to optimize store

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

export const setFavoriteOpen = (isOpen) => ({
  type: 'SET_FAVORITE_OPEN',
  payload: isOpen,
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
        return { ...state, favorites: state.favorites.filter(movie => movie.properties.title !== action.payload.properties.title) };
    case 'SET_SELECTED_MOVIE':
        return { ...state, selectedMovie: action.payload };
    case 'TOGGLE_FAVORITE_OPEN':
        return { ...state, favoriteOpen: !state.favoriteOpen };
    case 'SET_FAVORITE_OPEN':
        return { ...state, favoriteOpen: action.payload };  
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
