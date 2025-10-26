import React, { useState } from "react";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import { useNavigate } from "react-router-dom";

const StatsPage = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const stats = [
    { label: "Total Items", value: "127", icon: "fa-tshirt", color: "#8b5cf6" },
    { label: "Outfits Created", value: "45", icon: "fa-palette", color: "#7c3aed" },
    { label: "Favorites", value: "23", icon: "fa-heart", color: "#ec4899" },
    { label: "Categories", value: "8", icon: "fa-tags", color: "#06b6d4" },
  ];

  const categoryStats = [
    { name: "Tops", count: 35, percentage: 28, color: "#CFC8F3" },
    { name: "Bottoms", count: 22, percentage: 17, color: "#A78BFA" },
    { name: "Shoes", count: 18, percentage: 14, color: "#C084FC" },
    { name: "Accessories", count: 15, percentage: 12, color: "#E879F9" },
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
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
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-full text-left px-4 py-3 rounded-lg bg-purple-100 text-purple-600 transition"
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
          Wardrobe Statistics
        </h1>
        <p className="text-gray-600 mb-8">Insights into your clothing collection</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
              style={{ borderColor: "#CFC8F3" }}
            >
              <div className="flex items-center mb-4">
                <div
                  className="p-3 rounded-xl"
                  style={{ backgroundColor: stat.color + "20" }}
                >
                  <i className={`fa-solid ${stat.icon} text-2xl`} style={{ color: stat.color }} />
                </div>
              </div>
              <div className="text-4xl font-bold mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border-2 rounded-2xl p-8 shadow-lg" style={{ borderColor: "#CFC8F3" }}>
          <h2 className="text-2xl font-bold mb-6" style={{ color: "#8b5cf6" }}>
            Category Breakdown
          </h2>
          <div className="space-y-4">
            {categoryStats.map((cat, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-700">{cat.name}</span>
                  <span className="text-gray-600">{cat.count} items</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${cat.percentage}%`,
                      backgroundColor: cat.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
