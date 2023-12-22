import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./utils/store";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";

function App() {

  return (

    <Router>
      <div className="App">
        <Provider store={store}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:city" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </Provider>
      </div>
    </Router>
  );
}

export default App;
