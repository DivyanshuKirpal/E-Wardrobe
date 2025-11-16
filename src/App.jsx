// src/App.jsx (modified)
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext";

import LandingPage from "./pages/LandingPage.jsx";
import ClosetPage from "./pages/ClosetPage.jsx";
// ... other imports

function App() {
  const { token } = useContext(AppContext);

  const handleLogin = () => {}; // not needed now
  const handleLogout = () => {
    // clear token + user via context
    // import setToken/setUser via context if needed for logout button
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/closet" element={token ? <ClosetPage /> : <Navigate to="/" replace />} />
        <Route path="/favorites" element={token ? <FavoritesPage /> : <Navigate to="/" replace />} />
        <Route path="/stats" element={token ? <StatsPage /> : <Navigate to="/" replace />} />
        <Route path="/outfits" element={token ? <OutfitsPage /> : <Navigate to="/" replace />} />
        <Route path="/js-demo" element={<JSBasicsDemo />} />
      </Routes>
    </Router>
  );
}

export default App;