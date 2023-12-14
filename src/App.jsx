import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
