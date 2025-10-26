import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ClosetHeader from "../Components/ClosetHeader.jsx";
import UploadButton from "../Components/UploadButton.jsx";

const ClosetPage = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  // State for items in each category
  const [upperItems, setUpperItems] = useState([]);
  const [lowerItems, setLowerItems] = useState([]);
  const [bottomItems, setBottomItems] = useState([]);

  const handleUploadCloth = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Uploaded cloth:", file.name);
    }
  };

  const handleAddItem = (category) => {
    // Create a hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target.result;
          const newItem = {
            id: Date.now(),
            name: `Item ${category} ${(category === 'upper' ? upperItems : category === 'lower' ? lowerItems : bottomItems).length + 1}`,
            image: imageUrl
          };

          if (category === 'upper') {
            setUpperItems([...upperItems, newItem]);
          } else if (category === 'lower') {
            setLowerItems([...lowerItems, newItem]);
          } else if (category === 'bottom') {
            setBottomItems([...bottomItems, newItem]);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div 
      className="w-screen h-screen overflow-hidden font-sans relative"
      style={{ 
        background: "linear-gradient(135deg, #f5f0ff 0%, #e8e0ff 50%, #ddd0f0 100%)"
      }}
    >
      {/* Top Header */}
      <ClosetHeader onMenuClick={() => setIsSidebarOpen(true)} onLogout={onLogout} />

      {/* Sidebar Menu */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ backgroundColor: "rgba(139, 92, 246, 0.2)" }}
            onClick={() => setIsSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Close Button */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-4 text-gray-600 hover:text-purple-600 self-end"
              >
                <i className="fa-solid fa-x text-2xl" />
              </button>

              {/* Menu Items */}
              <nav className="flex-1 px-6 space-y-2">
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

              {/* Logout */}
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

      {/* Main Body */}
      <div className="flex w-full h-[calc(100vh-4rem)] pt-16 items-center justify-center max-w-screen-2xl mx-auto">
        {/* Left Panel: 3D Character */}
        <div className="w-1/3 h-full flex items-center justify-center p-6">
          <div className="relative w-full h-[90%] rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: "#f5f0ff" }}>
            <div 
              className="absolute inset-0 blur-3xl"
              style={{ backgroundColor: "#8b5cf6", opacity: 0.15 }}
            />
            <div className="relative h-full flex items-center justify-center">
            <img
              src="https://i.pinimg.com/736x/8b/e6/a5/8be6a536d461d8462d3e1b72f3e7b1e3.jpg"
              alt="Character"
              className="w-full h-full object-contain drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 60px rgba(139, 92, 246, 0.3))" }}
            />
            </div>
          </div>
        </div>

        {/* Right Panel: Scrollable Sections */}
        <div className="w-2/3 h-full p-6">
          {/* Container for all sections */}
          <div className="h-full flex flex-col gap-4">
            {/* Upper Section */}
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
                Upper
              </h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scroll-smooth h-40">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddItem('upper')}
                    className="w-32 h-32 flex-shrink-0 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105" 
                    style={{ backgroundColor: "#CFC8F3" }}
                  >
                    <div className="text-center">
                      <i className="fa-solid fa-plus text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                      <p className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>+ add item</p>
                    </div>
                  </button>
                  {upperItems.map(item => (
                    <div key={item.id} className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-grab hover:scale-105 active:cursor-grabbing relative" style={{ backgroundColor: "#CFC8F3" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <div className="text-center">
                            <i className="fa-solid fa-tshirt text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                            <p className="text-xs font-semibold truncate" style={{ color: "#8b5cf6" }}>{item.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lower Section */}
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
                Lower
              </h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scroll-smooth h-40">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddItem('lower')}
                    className="w-32 h-32 flex-shrink-0 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105" 
                    style={{ backgroundColor: "#CFC8F3" }}
                  >
                    <div className="text-center">
                      <i className="fa-solid fa-plus text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                      <p className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>+ add item</p>
                    </div>
                  </button>
                  {lowerItems.map(item => (
                    <div key={item.id} className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-grab hover:scale-105 active:cursor-grabbing relative" style={{ backgroundColor: "#CFC8F3" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <div className="text-center">
                            <i className="fa-solid fa-socks text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                            <p className="text-xs font-semibold truncate" style={{ color: "#8b5cf6" }}>{item.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
                Bottom
              </h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scroll-smooth h-40">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddItem('bottom')}
                    className="w-32 h-32 flex-shrink-0 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105" 
                    style={{ backgroundColor: "#CFC8F3" }}
                  >
                    <div className="text-center">
                      <i className="fa-solid fa-plus text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                      <p className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>+ add item</p>
                    </div>
                  </button>
                  {bottomItems.map(item => (
                    <div key={item.id} className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all cursor-grab hover:scale-105 active:cursor-grabbing relative" style={{ backgroundColor: "#CFC8F3" }}>
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-2">
                          <div className="text-center">
                            <i className="fa-solid fa-shoe-prints text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                            <p className="text-xs font-semibold truncate" style={{ color: "#8b5cf6" }}>{item.name}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Accessories Section */}
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
                Accessories
              </h2>
              <div className="flex space-x-3 overflow-x-auto pb-2 scroll-smooth h-40">
                <div className="flex space-x-3">
                  <button 
                    onClick={() => console.log("Add accessory")}
                    className="w-32 h-32 flex-shrink-0 rounded-xl flex items-center justify-center shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-105" 
                    style={{ backgroundColor: "#CFC8F3" }}
                  >
                    <div className="text-center">
                      <i className="fa-solid fa-plus text-3xl mb-1" style={{ color: "#8b5cf6" }} />
                      <p className="text-xs font-semibold" style={{ color: "#8b5cf6" }}>+ add item</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button with Panel */}
      <UploadButton
        onUploadCloth={handleUploadCloth}
        onSaveOutfit={() => console.log("Save outfit")}
        onSuggestion={() => console.log("Get suggestion")}
        onAccessories={() => console.log("View accessories")}
      />
    </div>
  );
};

export default ClosetPage;
