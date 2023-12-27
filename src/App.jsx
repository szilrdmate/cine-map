import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addFavoriteMovie } from "./utils/store";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
      savedFavorites.forEach(movie => {
        dispatch(addFavoriteMovie(movie));
      });
  }, [dispatch])

  return (

    <Router>
      <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/:city" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
