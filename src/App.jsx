// src/App.jsx
import React, { useContext, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "./Context/AppContext.jsx";

// lazy-load pages so missing pages don't crash the entire app
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const ClosetPage = lazy(() => import("./pages/ClosetPage.jsx"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage.jsx"));
const StatsPage = lazy(() => import("./pages/StatsPage.jsx"));
const OutfitsPage = lazy(() => import("./pages/OutfitPage.jsx"));
const JSBasicsDemo = lazy(() => import("./pages/JSBasicsDemo.jsx"));

function App() {
  const { token, setToken, setUser } = useContext(AppContext);

  const handleLogout = () => {
    // clear auth in context (AppContext persists to localStorage automatically)
    setToken(null);
    setUser(null);
  };

  return (
    <Router>
      {/* Suspense fallback ensures a loading UI while lazy chunks are fetched */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected routes (use token from AppContext) */}
          <Route
            path="/closet"
            element={token ? <ClosetPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/favorites"
            element={token ? <FavoritesPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/stats"
            element={token ? <StatsPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
          />
          <Route
            path="/outfits"
            element={token ? <OutfitsPage onLogout={handleLogout} /> : <Navigate to="/" replace />}
          />

          {/* Unprotected demo route */}
          <Route path="/js-demo" element={<JSBasicsDemo />} />

          {/* Catch-all: redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;