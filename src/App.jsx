import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useSelector } from "react-redux";

function App() {

  const favoriteOpen = useSelector(state => state.city.favoriteOpen);

  return (
    <Router>
      <div className='App'>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:city' element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        {favoriteOpen && <Favorites />}
      </div>
    </Router>
  );
}

export default App;
