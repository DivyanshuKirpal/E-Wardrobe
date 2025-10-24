import React, { useState, useEffect } from 'react';
import { useWardrobe } from '../contexts/WardrobeContext';

const InteractiveCharacter = () => {
  const { state } = useWardrobe();
  const [mood, setMood] = useState('happy');
  const [isDancing, setIsDancing] = useState(false);
  const [selectedOutfit, setSelectedOutfit] = useState([]);

  // Update character based on selected items
  useEffect(() => {
    if (state.selectedItems.length > 0) {
      setMood('excited');
      setIsDancing(true);
      setSelectedOutfit(state.selectedItems);
      
      // Stop dancing after 3 seconds
      const timer = setTimeout(() => {
        setIsDancing(false);
        setMood('happy');
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setMood('neutral');
      setIsDancing(false);
      setSelectedOutfit([]);
    }
  }, [state.selectedItems]);

  const getCharacterEmoji = () => {
    if (isDancing) return '🕺';
    if (mood === 'excited') return '😍';
    if (mood === 'happy') return '😊';
    return '😐';
  };

  const getCharacterAnimation = () => {
    if (isDancing) return 'animate-wiggle';
    if (mood === 'excited') return 'animate-bounce-in';
    return 'animate-float';
  };

  const getOutfitPreview = () => {
    if (selectedOutfit.length === 0) return '🧑💼';
    
    const outfitEmojis = selectedOutfit.map(id => {
      const item = state.wardrobeItems.find(i => i.id === id);
      return item?.image || '👔';
    });

    return outfitEmojis.slice(0, 3).join('');
  };

  return (
    <div className="character-viewer bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 mb-6 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
      {/* Animated Background */}
      <div className="absolute inset-0 shimmer-effect" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-sparkle"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i}s`
            }}
          />
        ))}
      </div>

      {/* Character Model */}
      <div className="character-model relative z-10 text-center">
        <div className={`w-40 h-60 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-6xl shadow-2xl ${getCharacterAnimation()} transition-all duration-500`}>
          {getOutfitPreview()}
        </div>
        
        {/* Character Expression */}
        <div className="mt-4 text-4xl animate-bounce-in">
          {getCharacterEmoji()}
        </div>
        
        {/* Mood Indicator */}
        <div className="mt-2 text-sm text-white/70 capitalize">
          {mood} {isDancing && '& dancing'}
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
        <button
          onClick={() => setIsDancing(!isDancing)}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          🎵
        </button>
        <button
          onClick={() => setMood(mood === 'happy' ? 'excited' : 'happy')}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          😊
        </button>
        <button
          onClick={() => setMood('neutral')}
          className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 hover:scale-110"
        >
          😐
        </button>
      </div>

      {/* Outfit Status */}
      {selectedOutfit.length > 0 && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500/30 to-purple-600/30 rounded-full px-3 py-1 text-white text-xs border border-white/20 animate-bounce-in">
          {selectedOutfit.length} items selected
        </div>
      )}
    </div>
  );
};

export default InteractiveCharacter;
