import React, { useState } from 'react';
import { useWardrobe } from '../contexts/WardrobeContext';

const ClothingItem = ({ item, index }) => {
  const { state, actions } = useWardrobe();
  const [isHovered, setIsHovered] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  
  const isSelected = state.selectedItems.includes(item.id);
  const isFavorite = state.favorites.includes(item.id);

  const handleToggleSelection = () => {
    actions.toggleSelection(item.id);
    setShowSparkles(true);
    setTimeout(() => setShowSparkles(false), 1000);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      actions.removeFromFavorites(item.id);
    } else {
      actions.addToFavorites(item.id);
    }
  };

  const getCardGradient = () => {
    if (isSelected) {
      return 'bg-gradient-to-br from-pink-500/40 via-purple-500/30 to-indigo-500/40';
    }
    if (isFavorite) {
      return 'bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20';
    }
    return 'bg-gradient-to-br from-white/10 via-white/5 to-transparent';
  };

  const getBorderColor = () => {
    if (isSelected) return 'border-pink-400 shadow-pink-400/50';
    if (isFavorite) return 'border-yellow-400 shadow-yellow-400/30';
    return 'border-white/20';
  };

  return (
    <div
      className="clothing-item animate-bounce-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        onClick={handleToggleSelection}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`clothing-card ${getCardGradient()} backdrop-blur-lg border rounded-2xl p-5 cursor-pointer h-full flex flex-col transition-all duration-500 hover:bg-white/15 hover:-translate-y-4 hover:shadow-2xl interactive-card ${
          isSelected ? 'scale-105 shadow-pink-500/50' : ''
        } ${isHovered ? 'animate-wiggle' : ''}`}
        style={{
          borderColor: isSelected ? '#f472b6' : isFavorite ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
          boxShadow: isSelected 
            ? '0 0 30px rgba(244, 114, 182, 0.5), 0 10px 25px rgba(0, 0, 0, 0.2)' 
            : isHovered 
            ? '0 20px 40px rgba(0, 0, 0, 0.3)' 
            : '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Sparkle Effects */}
        {showSparkles && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-sparkle"
                style={{
                  top: `${20 + i * 10}%`,
                  left: `${15 + i * 15}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        )}

        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold z-10 animate-pulse-glow">
            ✓
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 hover:scale-110 ${
            isFavorite 
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white animate-pulse-glow' 
              : 'bg-white/20 text-white/70 hover:bg-white/30 hover:text-yellow-300'
          }`}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>

        {/* Item Image with Enhanced Effects */}
        <div className="clothing-image w-full h-40 bg-gradient-to-br from-white/10 to-white/5 rounded-xl mb-4 overflow-hidden relative flex items-center justify-center group">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-indigo-500/10 animate-gradient-shift opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Item Emoji with Enhanced Animation */}
          <div className={`text-6xl transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 ${
            isSelected ? 'animate-bounce-in' : ''
          }`}>
            {item.image}
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Item Info with Enhanced Styling */}
        <div className="clothing-info flex flex-col gap-1 flex-grow">
          <h3 className={`clothing-name font-semibold text-base transition-all duration-300 ${
            isSelected ? 'text-pink-200 animate-pulse-glow' : 'text-white'
          }`}>
            {item.name}
          </h3>
          <p className="clothing-type text-purple-200 text-xs uppercase tracking-wider">
            {item.category}
          </p>
          {item.brand && (
            <p className="clothing-brand text-purple-300 text-xs">
              {item.brand}
            </p>
          )}
          {item.size && (
            <p className="clothing-size text-purple-300 text-xs">
              Size: {item.size}
            </p>
          )}
          
          {/* Color Indicator */}
          {item.color && (
            <div className="flex items-center gap-2 mt-2">
              <div 
                className="w-4 h-4 rounded-full border border-white/30"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-white/70 capitalize">{item.color}</span>
            </div>
          )}
        </div>

        {/* Interactive Hover Effects */}
        {isHovered && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/5 to-transparent animate-gradient-shift pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default ClothingItem;
