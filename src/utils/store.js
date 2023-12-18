import { configureStore } from '@reduxjs/toolkit';


// Redux State
const initialState = {
  location: {
    type: 'default', // 'coordinates' or 'movie'
    coordinates: { lat: 0, lng: 0 },
    movieId: null
  },
};

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
