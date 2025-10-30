import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import wardrobeDB from "../services/wardrobeDB.js";
import HuggingFaceAPI from "../services/huggingFaceAPI.js";

const ClosetPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [trashedItems, setTrashedItems] = useState([]);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [selectedOutfitItems, setSelectedOutfitItems] = useState({
    upper: null,
    lower: null,
    bottom: null
  });
  
  // State for AI processing
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState("");
  const [showStyleModal, setShowStyleModal] = useState(false);
  const [styleResolver, setStyleResolver] = useState(null);

  // Load items from database
  useEffect(() => {
    loadItems();
    loadTrashedItems();
  }, []);

  const loadItems = () => {
    const username = "PID18";
    const upper = wardrobeDB.getWardrobeItems(username, 'upper');
    const lower = wardrobeDB.getWardrobeItems(username, 'lower');
    const bottom = wardrobeDB.getWardrobeItems(username, 'bottom');
    const accessories = wardrobeDB.getWardrobeItems(username, 'accessories');
    
    setItems([...upper, ...lower, ...bottom, ...accessories]);
  };

  const loadTrashedItems = () => {
    const trashed = JSON.parse(localStorage.getItem("trashedItems")) || [];
    setTrashedItems(trashed);
  };

  const handleMenuClick = (page) => {
    navigate(`/${page}`);
  };

  // Enhanced add item with AI processing
  const handleAddItem = (category) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const originalImage = event.target.result;

          // Ask user for style
          const styleChoice = await showStyleSelection();

          if (styleChoice === 'original') {
            // Save without processing
            saveToWardrobe(category, originalImage, file.name);
            return;
          }

          // Process with AI
          setIsProcessing(true);
          setProcessingProgress(`Converting to ${styleChoice}...`);

          let processedImage;
          try {
            switch (styleChoice) {
              case 'cartoon':
                processedImage = await HuggingFaceAPI.transformToCartoon(file);
                break;
              case 'anime':
                processedImage = await HuggingFaceAPI.transformToAnime(file);
                break;
              case 'remove-bg':
                processedImage = await HuggingFaceAPI.removeBackground(file);
                break;
              default:
                processedImage = originalImage;
            }

            saveToWardrobe(category, processedImage, file.name);
          } catch (error) {
            console.error("AI processing failed:", error);
            alert("AI processing failed. Saving original image instead.");
            saveToWardrobe(category, originalImage, file.name);
          } finally {
            setIsProcessing(false);
            setProcessingProgress("");
          }
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error("Upload error:", error);
        setIsProcessing(false);
      }
    };
    
    input.click();
  };

  // Helper function to save to wardrobe
  const saveToWardrobe = (category, imageUrl, fileName) => {
    const username = "PID18";
    wardrobeDB.addItemToWardrobe(username, category, {
      name: `${category.charAt(0).toUpperCase() + category.slice(1)} - ${fileName}`,
      image: imageUrl,
      category: category
    });
    loadItems();
  };

  // Show style selection modal
  const showStyleSelection = () => {
    setShowStyleModal(true);
    return new Promise((resolve) => {
      setStyleResolver(() => resolve);
    });
  };

  // Handle style selection
  const handleStyleSelect = (style) => {
    if (styleResolver) {
      styleResolver(style);
    }
    setShowStyleModal(false);
  };

  const handleMoveToTrash = (item) => {
    const trashed = JSON.parse(localStorage.getItem("trashedItems")) || [];
    trashed.push({...item, trashedAt: new Date().toISOString()});
    localStorage.setItem("trashedItems", JSON.stringify(trashed));
    
    const username = "PID18";
    wardrobeDB.removeItemFromWardrobe(username, item.category, item.id);
    
    loadItems();
    loadTrashedItems();
  };

  const handleRestoreItem = (item) => {
    const trashed = trashedItems.filter(t => t.id !== item.id);
    localStorage.setItem("trashedItems", JSON.stringify(trashed));
    
    const username = "PID18";
    const itemWithoutTrash = {...item};
    delete itemWithoutTrash.trashedAt;
    
    wardrobeDB.addItemToWardrobe(username, item.category, itemWithoutTrash);
    
    loadItems();
    loadTrashedItems();
  };

  const handlePermanentDelete = (item) => {
    if (confirm("Are you sure you want to permanently delete this item?")) {
      const trashed = trashedItems.filter(t => t.id !== item.id);
      localStorage.setItem("trashedItems", JSON.stringify(trashed));
      loadTrashedItems();
    }
  };

  const handleClearTrash = () => {
    if (confirm("Are you sure you want to permanently delete all items in trash?")) {
      localStorage.setItem("trashedItems", JSON.stringify([]));
      loadTrashedItems();
    }
  };

  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("item", JSON.stringify(item));
  };

  const handleReset = () => {
    setSelectedOutfitItems({ upper: null, lower: null, bottom: null });
  };

  const handleSaveOutfit = () => {
    if (selectedOutfitItems.upper || selectedOutfitItems.lower || selectedOutfitItems.bottom) {
      const outfits = JSON.parse(localStorage.getItem("savedOutfits")) || [];
      outfits.push({
        id: Date.now(),
        items: selectedOutfitItems,
        createdAt: new Date().toISOString()
      });
      localStorage.setItem("savedOutfits", JSON.stringify(outfits));
      alert("Outfit saved successfully!");
    }
  };

  const getCategoryItems = (category) => {
    return items.filter(item => item.category?.toLowerCase() === category.toLowerCase());
  };

  const totalOutfits = JSON.parse(localStorage.getItem("savedOutfits"))?.length || 0;
  const favoritesCount = items.filter(item => item.isFavorite).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <ClosetHeader onMenuClick={handleMenuClick} onLogout={onLogout} />
      
      <div className="flex gap-6 p-6 max-w-[1600px] mx-auto">
        {/* Left Section - Try-On Avatar */}
        <div className="w-[380px] flex-shrink-0">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-purple-700 mb-4">Try-On Avatar</h2>
            
            <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl h-[500px] flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <p className="text-gray-400 text-sm">Drag items here to try on</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset
              </button>
              <button
                onClick={handleSaveOutfit}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all font-medium shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Outfit
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{items.length}</div>
                <div className="text-sm text-gray-500 mt-1">Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{totalOutfits}</div>
                <div className="text-sm text-gray-500 mt-1">Outfits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">{favoritesCount}</div>
                <div className="text-sm text-gray-500 mt-1">Favorites</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - My Wardrobe */}
        <div className="flex-1">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-purple-700">My Wardrobe</h2>
              <p className="text-sm text-gray-500">Click + on each category to add items</p>
            </div>

            {/* Upper Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium shadow-md">
                  Upper
                </button>
                <button
                  onClick={() => handleAddItem('upper')}
                  className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {getCategoryItems("upper").map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="bg-gray-50 rounded-2xl overflow-hidden cursor-move hover:shadow-lg transition-all group relative"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image || "/placeholder-shirt.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <button
                      onClick={() => handleMoveToTrash(item)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium shadow-md">
                  Lower
                </button>
                <button
                  onClick={() => handleAddItem('lower')}
                  className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {getCategoryItems("lower").map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="bg-gray-50 rounded-2xl overflow-hidden cursor-move hover:shadow-lg transition-all group relative"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image || "/placeholder-pants.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <button
                      onClick={() => handleMoveToTrash(item)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full font-medium shadow-md">
                  Bottom
                </button>
                <button
                  onClick={() => handleAddItem('bottom')}
                  className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {getCategoryItems("bottom").map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    className="bg-gray-50 rounded-2xl overflow-hidden cursor-move hover:shadow-lg transition-all group relative"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image || "/placeholder-shoes.jpg"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <button
                      onClick={() => handleMoveToTrash(item)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                    <div className="p-3">
                      <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Trash Button */}
      <button 
        onClick={() => setShowTrashModal(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full shadow-2xl flex flex-col items-center justify-center hover:scale-110 transition-transform group"
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
        </svg>
        {trashedItems.length > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 text-black text-xs font-bold rounded-full flex items-center justify-center">
            {trashedItems.length}
          </span>
        )}
      </button>

      {/* Trash Modal */}
      {showTrashModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Trash</h2>
              <div className="flex gap-3">
                {trashedItems.length > 0 && (
                  <button
                    onClick={handleClearTrash}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={() => setShowTrashModal(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {trashedItems.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                  </svg>
                  <p className="text-gray-500 text-lg">Trash is empty</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {trashedItems.map((item) => (
                    <div key={item.id} className="bg-gray-50 rounded-2xl overflow-hidden relative group">
                      <div className="aspect-square overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-medium text-sm text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(item.trashedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => handleRestoreItem(item)}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handlePermanentDelete(item)}
                          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Help Button */}
      <button className="fixed bottom-8 right-28 w-12 h-12 bg-gray-800 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
        <span className="text-xl font-bold">?</span>
      </button>

      {/* Processing Modal - Shows while AI is working */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-semibold text-gray-800">{processingProgress}</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Style Selection Modal - User chooses AI style */}
      {showStyleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Choose Image Style</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleStyleSelect('original')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="text-4xl mb-3">📸</div>
                <div className="font-semibold text-gray-800">Original</div>
                <div className="text-sm text-gray-500 mt-1">Keep as is</div>
              </button>

              <button
                onClick={() => handleStyleSelect('cartoon')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="text-4xl mb-3">🎨</div>
                <div className="font-semibold text-gray-800">Cartoon</div>
                <div className="text-sm text-gray-500 mt-1">Comic book style</div>
              </button>

              <button
                onClick={() => handleStyleSelect('anime')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="text-4xl mb-3">✨</div>
                <div className="font-semibold text-gray-800">Anime</div>
                <div className="text-sm text-gray-500 mt-1">Japanese animation</div>
              </button>

              <button
                onClick={() => handleStyleSelect('remove-bg')}
                className="p-6 border-2 border-gray-200 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="text-4xl mb-3">🗑️</div>
                <div className="font-semibold text-gray-800">Remove BG</div>
                <div className="text-sm text-gray-500 mt-1">Transparent background</div>
              </button>
            </div>

            <button
              onClick={() => handleStyleSelect('original')}
              className="w-full mt-6 px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosetPage;
