// mapReducer in redux store
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

describe('mapReducer', () => {

    // should return the initial state when no action is provided
    it('should return the initial state when no action is provided', () => {
      const state = mapReducer(undefined, {});
      expect(state).toEqual(initialState);
    });

    // should update the location state when SET_LOCATION action is provided
    it('should update the location state when SET_LOCATION action is provided', () => {
      const newLocation = {
        type: 'new',
        coordinates: { lat: 40.7128, lng: -74.0060 },
      };
      const action = { type: 'SET_LOCATION', payload: newLocation };
      const state = mapReducer(initialState, action);
      expect(state.location).toEqual(newLocation);
    });

    // should update the location state with coordinates when SET_COORDINATES action is provided
    it('should update the location state with coordinates when SET_COORDINATES action is provided', () => {
      const newCoordinates = { lat: 37.7749, lng: -122.4194 };
      const action = { type: 'SET_COORDINATES', payload: newCoordinates };
      const state = mapReducer(initialState, action);
      expect(state.location).toEqual({ type: 'coordinates', coordinates: newCoordinates });
    });

    // should return the state unmodified when an unknown action is provided
    it('should return the state unmodified when an unknown action is provided', () => {
      const unknownAction = { type: 'UNKNOWN_ACTION' };
      const state = mapReducer(initialState, unknownAction);
      expect(state).toEqual(initialState);
    });

    // should return a new state object when modifying the favorites array
    it('should return a new state object when modifying the favorites array', () => {
      const newFavorite = { properties: { title: 'Movie 1' } };
      const action = { type: 'ADD_FAVORITE_MOVIE', payload: newFavorite };
      const state = mapReducer(initialState, action);
      expect(state.favorites).toContain(newFavorite);
      expect(state.favorites).not.toBe(initialState.favorites);
    });

    // should handle empty favorites array when REMOVE_FAVORITE_MOVIE action is provided
    it('should handle empty favorites array when REMOVE_FAVORITE_MOVIE action is provided', () => {
      const action = { type: 'REMOVE_FAVORITE_MOVIE', payload: { properties: { title: 'Movie 1' } } };
      const state = mapReducer(initialState, action);
      expect(state.favorites).toEqual([]);
    });
});
