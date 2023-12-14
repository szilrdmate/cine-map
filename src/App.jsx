import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Upgrade from "./pages/Upgrade";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:city" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/account" element={<Account />} />
          <Route path="/upgrade" element={<Upgrade />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
