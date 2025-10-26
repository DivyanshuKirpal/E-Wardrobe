import React, { useState } from "react";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import { useNavigate } from "react-router-dom";

const FavoritesPage = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const favoriteItems = [
    { id: 1, name: "Black Turtleneck", category: "Tops", image: "https://via.placeholder.com/200x250" },
    { id: 2, name: "Denim Jacket", category: "Outerwear", image: "https://via.placeholder.com/200x250" },
    { id: 3, name: "White Sneakers", category: "Shoes", image: "https://via.placeholder.com/200x250" },
    { id: 4, name: "Blue Jeans", category: "Bottoms", image: "https://via.placeholder.com/200x250" },
    { id: 5, name: "Leather Watch", category: "Accessories", image: "https://via.placeholder.com/200x250" },
    { id: 6, name: "Striped Shirt", category: "Tops", image: "https://via.placeholder.com/200x250" },
  ];

  return (
    <div 
      className="w-screen h-screen overflow-y-auto font-sans"
      style={{ 
        background: "linear-gradient(135deg, #f5f0ff 0%, #e8e0ff 50%, #ddd0f0 100%)"
      }}
    >
      <ClosetHeader onMenuClick={() => setIsSidebarOpen(true)} onLogout={onLogout} />

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white shadow-2xl z-50">
            <div className="flex flex-col h-full">
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-4 text-gray-600 hover:text-purple-600 self-end"
              >
                <i className="fa-solid fa-x text-2xl" />
              </button>
              <nav className="flex-1 px-6 space-y-2">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/closet");
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 text-gray-700 hover:text-purple-600 transition"
                >
                  <i className="fa-solid fa-tshirt mr-3" />
                  Closet
                </button>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-purple-100 text-purple-600 transition"
                >
                  <i className="fa-solid fa-heart mr-3" />
                  Favorites
                </button>
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/stats");
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 text-gray-700 hover:text-purple-600 transition"
                >
                  <i className="fa-solid fa-chart-bar mr-3" />
                  Stats
                </button>
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/outfits");
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 text-gray-700 hover:text-purple-600 transition"
                >
                  <i className="fa-solid fa-tshirt mr-3" />
                  Outfits
                </button>
              </nav>
              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsSidebarOpen(false);
                    onLogout();
                    setTimeout(() => {
                      navigate("/");
                    }, 0);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition"
                >
                  <i className="fa-solid fa-right-from-bracket mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="pt-20 px-8 py-8">
        <h1 className="text-4xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
          Your Favorites
        </h1>
        <p className="text-gray-600 mb-8">Items you've marked as favorites</p>

        {/* Grid of Favorite Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-white border-2 border-purple-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ borderColor: "#CFC8F3" }}
            >
              <div className="aspect-square overflow-hidden bg-purple-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <button className="text-red-500 hover:text-red-600">
                    <i className="fa-solid fa-heart" />
                  </button>
                </div>
                <p className="text-sm text-gray-500">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;
