/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFavoriteMovie } from "./utils/store";

// TODO: create functional local storage function
const useLocalStorage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    savedFavorites.forEach((movie) => {
      dispatch(addFavoriteMovie(movie));
    });
  }, [dispatch]);
};
