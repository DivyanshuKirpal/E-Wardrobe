import React, { useState } from "react";
import LandingPage from "./pages/LandingPage.jsx";
import ClosetPage from "./pages/ClosetPage.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('closet');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const handleNavigateToCloset = () => {
    if (isLoggedIn) {
      setCurrentPage('closet');
    }
  };

  return (
    <div className="App">
      {currentPage === 'landing' ? (
        <LandingPage 
          isLoggedIn={isLoggedIn} 
          onLogin={handleLogin} 
          onLogout={handleLogout}
          onNavigateToCloset={handleNavigateToCloset}
        />
      ) : (
        <ClosetPage 
          isLoggedIn={isLoggedIn} 
          onLogout={handleLogout}
          onBackToLanding={() => setCurrentPage('landing')}
        />
      )}
    </div>
  );
}

export default App;