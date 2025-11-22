// src/Components/StatsWidget.jsx
import React from "react";

const StatsWidget = ({ items = [], trashedCount = 0 }) => {
  const totalItems = items.length;
  const favorites = items.filter(item => item.isFavorite).length;
  const savedOutfits = JSON.parse(localStorage.getItem("savedOutfits"))?.length || 0;
  
  // Calculate category breakdown
  const categories = {
    upper: items.filter(i => (i.category || "").toLowerCase() === "upper").length,
    lower: items.filter(i => (i.category || "").toLowerCase() === "lower").length,
    bottom: items.filter(i => (i.category || "").toLowerCase() === "bottom").length,
  };

  const stats = [
    { label: "Total Items", value: totalItems, icon: "👔", color: "purple" },
    { label: "Outfits", value: savedOutfits, icon: "✨", color: "pink" },
    { label: "Favorites", value: favorites, icon: "❤️", color: "red" },
    { label: "In Trash", value: trashedCount, icon: "🗑️", color: "gray" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Stats</h3>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">{stat.icon}</div>
            <div className="text-2xl font-bold text-purple-700">{stat.value}</div>
            <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown</h4>
        <div className="space-y-2">
          {Object.entries(categories).map(([cat, count]) => (
            <div key={cat} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 capitalize">{cat}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all"
                    style={{ width: `${totalItems > 0 ? (count / totalItems) * 100 : 0}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 w-6">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsWidget;
