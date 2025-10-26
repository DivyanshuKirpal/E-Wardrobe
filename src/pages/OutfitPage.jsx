import React, { useState } from "react";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import { useNavigate } from "react-router-dom";

const OutfitsPage = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const outfits = [
    {
      id: 1,
      name: "Casual Friday",
      image: "https://via.placeholder.com/300x400",
      items: ["White T-Shirt", "Blue Jeans", "Sneakers"],
    },
    {
      id: 2,
      name: "Office Elegance",
      image: "https://via.placeholder.com/300x400",
      items: ["Black Blazer", "White Shirt", "Black Pants"],
    },
    {
      id: 3,
      name: "Weekend Vibes",
      image: "https://via.placeholder.com/300x400",
      items: ["Hoodie", "Cargo Pants", "Boots"],
    },
    {
      id: 4,
      name: "Summer Breeze",
      image: "https://via.placeholder.com/300x400",
      items: ["Linen Shirt", "Shorts", "Sandals"],
    },
    {
      id: 5,
      name: "Formal Night",
      image: "https://via.placeholder.com/300x400",
      items: ["Suit", "Dress Shirt", "Dress Shoes"],
    },
    {
      id: 6,
      name: "Sporty Look",
      image: "https://via.placeholder.com/300x400",
      items: ["Tank Top", "Athletic Shorts", "Running Shoes"],
    },
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
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50">
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
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/favorites");
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-purple-100 text-gray-700 hover:text-purple-600 transition"
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
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-purple-100 text-purple-600 transition"
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
              Your Outfits
            </h1>
            <p className="text-gray-600">Save and organize your favorite combinations</p>
          </div>
          <button
            className="px-6 py-3 rounded-xl font-semibold text-white transition shadow-lg hover:shadow-xl"
            style={{ backgroundColor: "#8b5cf6" }}
          >
            <i className="fa-solid fa-plus mr-2" />
            Create Outfit
          </button>
        </div>

        {/* Outfits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {outfits.map((outfit) => (
            <div
              key={outfit.id}
              className="bg-white border-2 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ borderColor: "#CFC8F3" }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-purple-100">
                <img
                  src={outfit.image}
                  alt={outfit.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-3 text-gray-900">{outfit.name}</h3>
                <div className="space-y-2 mb-4">
                  {outfit.items.map((item, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <i className="fa-solid fa-check-circle mr-2 text-purple-500" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex-1 px-4 py-2 rounded-lg font-medium transition"
                    style={{ backgroundColor: "#CFC8F3", color: "#8b5cf6" }}
                  >
                    View
                  </button>
                  <button className="px-4 py-2 rounded-lg text-gray-500 hover:text-red-500 transition">
                    <i className="fa-solid fa-trash" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OutfitsPage;
