import React, { useState } from 'react';
import './App.css'; 
function App() {
  // State management
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' or 'home'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Sample wardrobe data
  const wardrobeItems = [
    { id: 1, name: 'Black Sweater', category: 'tops', image: '👕' },
    { id: 2, name: 'Black Pants', category: 'bottoms', image: '👖' },
    { id: 3, name: 'Khaki Shorts', category: 'bottoms', image: '🩳' },
    { id: 4, name: 'Blue Jeans', category: 'bottoms', image: '👖' },
    { id: 5, name: 'Navy Sneakers', category: 'shoes', image: '👟' },
    { id: 6, name: 'Black Cap', category: 'accessories', image: '🧢' },
    { id: 7, name: 'White Hoodie', category: 'tops', image: '👕' },
    { id: 8, name: 'Black Jacket', category: 'tops', image: '🧥' },
  ];

  // Filter items by category
  const filteredItems = selectedCategory === 'all' 
    ? wardrobeItems 
    : wardrobeItems.filter(item => item.category === selectedCategory);

  // Toggle item selection
  const toggleItemSelection = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  // Handle sign in
  const handleSignIn = (e) => {
    e.preventDefault();
    setCurrentPage('home');
  };

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white overflow-hidden relative">
      {/* Floating background elements */}
      <div className="absolute top-[20%] left-[10%] w-16 h-16 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-float"></div>
      <div className="absolute top-[60%] right-[15%] w-16 h-16 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-float-slow"></div>
      <div className="absolute top-[40%] left-[80%] w-16 h-16 bg-gradient-to-br from-white/10 to-white/20 rounded-xl animate-float-medium"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-3xl font-bold">E-WARDROBE</h1>
            <p className="text-purple-200">Your Digital Fashion Companion</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Character */}
            <div className="flex justify-center animate-slide-in">
              <div className="relative">
                <div className="w-52 h-72 bg-gradient-to-br from-white/20 to-white/10 rounded-3xl border-2 border-white/30 flex items-center justify-center backdrop-blur-lg overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-purple-400 rounded-full flex items-center justify-center text-6xl relative z-10">
                    👤
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center mt-6">Style Your Virtual Self</h2>
                <p className="text-purple-200 text-center mt-2">Mix and match outfits, discover new styles, and create the perfect look for any occasion.</p>
              </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl border border-white/20 p-8 animate-slide-in-delay">
              <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
              <p className="text-purple-200 mb-6">Sign in to access your wardrobe</p>

              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:-translate-y-0.5"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 focus:-translate-y-0.5"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4"
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-purple-300 hover:text-white">Forgot password?</a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-500 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
                >
                  Sign In
                </button>

                <div className="text-center my-4 text-purple-300">Or continue with</div>

                <div className="grid grid-cols-2 gap-4">
                  <button className="py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all">
                    Google
                  </button>
                  <button className="py-3 rounded-xl bg-white/10 border border-white/30 hover:bg-white/20 transition-all">
                    Facebook
                  </button>
                </div>

                <p className="text-center text-purple-300 mt-4">
                  Don't have an account? <a href="#" className="text-white font-semibold hover:underline">Sign up</a>
                </p>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-lg hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 animate-slide-in">
              <div className="text-4xl mb-4">👕</div>
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p className="text-purple-200">See how clothes look on your avatar before wearing them</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-lg hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 animate-slide-in-delay-2">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-bold mb-2">Style Mixer</h3>
              <p className="text-purple-200">Create unique outfits with our smart matching system</p>
            </div>
            <div className="p-6 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-lg hover:-translate-y-2 hover:bg-white/15 hover:shadow-2xl transition-all duration-300 animate-slide-in-delay-3">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Wardrobe Organizer</h3>
              <p className="text-purple-200">Keep track of all your clothes digitally</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );

  // Home Page Component
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 text-white pb-24 md:pb-8">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1.5 w-6 h-6 cursor-pointer bg-transparent border-none"
          >
            <div className={`w-6 h-0.5 bg-white rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-white rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
          </button>
          
          <h1 className="text-2xl font-bold">E-WARDROBE</h1>
          
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-white/10 transition-all">➕</button>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-all">❤️</button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <input
            type="text"
            placeholder="Search your wardrobe..."
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Character Display - Sticky on desktop */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 sticky top-24">
              <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 mb-5 min-h-[400px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                <div className="relative z-10 w-40 h-60 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center text-7xl shadow-xl animate-float">
                  🧑‍💼
                </div>
              </div>

              <div className="flex gap-3 justify-center">
                <button className="flex items-center gap-2 px-5 py-3 border border-white/30 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all backdrop-blur-md">
                  🔄 Reset
                </button>
                <button className="flex items-center gap-2 px-5 py-3 border border-white/30 rounded-xl hover:-translate-y-0.5 hover:shadow-lg transition-all backdrop-blur-md bg-gradient-to-r from-pink-500/30 to-purple-500/30">
                  💾 Save Look
                </button>
              </div>
            </div>
          </div>

          {/* Wardrobe Items */}
          <div className="lg:col-span-2">
            {/* Category Navigation */}
            <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
              {[
                { id: 'all', icon: '👕', label: 'All' },
                { id: 'tops', icon: '👔', label: 'Tops' },
                { id: 'bottoms', icon: '👖', label: 'Bottoms' },
                { id: 'shoes', icon: '👟', label: 'Shoes' },
                { id: 'accessories', icon: '🧢', label: 'Accessories' },
              ].map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border transition-all min-w-[100px] backdrop-blur-md ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-br from-pink-500 to-purple-500 border-white/40 shadow-lg shadow-pink-500/30'
                      : 'bg-white/10 border-white/20 hover:bg-white/20 hover:-translate-y-0.5'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>

            {/* Clothing Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 animate-fade-in">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  onClick={() => toggleItemSelection(item.id)}
                  className={`bg-white/10 backdrop-blur-lg border rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-white/15 hover:-translate-y-2 hover:shadow-xl ${
                    selectedItems.includes(item.id)
                      ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 border-pink-500 shadow-lg shadow-pink-500/50 relative'
                      : 'border-white/20'
                  }`}
                >
                  {selectedItems.includes(item.id) && (
                    <div className="absolute top-3 right-3 bg-pink-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold z-10">
                      ✓
                    </div>
                  )}
                  
                  <div className={`w-full h-40 rounded-xl mb-4 flex items-center justify-center text-6xl ${
                    item.category === 'tops' ? 'bg-gradient-to-br from-gray-700 to-gray-600' :
                    item.category === 'bottoms' ? 'bg-gradient-to-br from-blue-800 to-indigo-900' :
                    item.category === 'shoes' ? 'bg-gradient-to-br from-amber-900 to-yellow-700' :
                    'bg-gradient-to-br from-red-900 to-red-800'
                  }`}>
                    {item.image}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-white">{item.name}</h3>
                    <p className="text-sm text-white/70 uppercase tracking-wide">{item.category}</p>
                  </div>
                </div>
              ))}

              {/* Add Item Card */}
              <div className="bg-white/5 border-2 border-dashed border-white/30 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 h-60 hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 transition-all cursor-pointer">
                <div className="text-5xl transition-transform hover:scale-110">➕</div>
                <span className="font-semibold">Add Item</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 py-3 z-50">
        <div className="flex justify-around items-center max-w-md mx-auto px-5">
          {[
            { icon: '🏠', label: 'Home', active: true },
            { icon: '👔', label: 'Wardrobe', active: false },
            { icon: '🎨', label: 'Mixer', active: false },
            { icon: '❤️', label: 'Saved', active: false },
            { icon: '👤', label: 'Profile', active: false },
          ].map((navItem, index) => (
            <button
              key={index}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                navItem.active
                  ? 'bg-gradient-to-br from-pink-500 to-purple-500 shadow-lg shadow-pink-500/40'
                  : 'hover:bg-white/10 hover:-translate-y-0.5'
              }`}
            >
              <span className="text-xl">{navItem.icon}</span>
              <span className="text-xs font-medium">{navItem.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {currentPage === 'landing' ? <LandingPage /> : <HomePage />}
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          animation-duration: 6s;
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          animation-duration: 7s;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 7s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 3s linear infinite; }
        .animate-slide-in { animation: slide-in 1s ease-out; }
        .animate-slide-in-delay { animation: slide-in 1s ease-out 0.2s both; }
        .animate-slide-in-delay-2 { animation: slide-in 1s ease-out 0.2s both; }
        .animate-slide-in-delay-3 { animation: slide-in 1s ease-out 0.4s both; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.1); border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.5); }
      `}</style>
    </>
  );
}

export default App;