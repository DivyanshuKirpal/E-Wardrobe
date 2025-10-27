// Import React hooks and routing components
import React, { useState } from "react";
// Import page components
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import ClosetPage from "./pages/ClosetPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import StatsPage from "./pages/StatsPage.jsx";
import OutfitsPage from "./pages/OutfitPage.jsx";

function App() {
  // Track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Login/logout handlers
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        {/* Landing page - public route */}
        <Route
          path="/"
          element={
            <LandingPage
              isLoggedIn={isLoggedIn}
              onLogin={handleLogin}
              onLogout={handleLogout}
            />
          }
        />

        {/* Protected routes - redirect to home if not logged in */}
        <Route
          path="/closet"
          element={
            isLoggedIn ? (
              <ClosetPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        <Route
          path="/favorites"
          element={
            isLoggedIn ? (
              <FavoritesPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        <Route
          path="/stats"
          element={
            isLoggedIn ? (
              <StatsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        <Route
          path="/outfits"
          element={
            isLoggedIn ? (
              <OutfitsPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
