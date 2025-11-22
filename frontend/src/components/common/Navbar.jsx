import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="text-2xl font-bold gradient-text">E-Wardrobe</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Pricing
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Blog
            </Link>
            <Link to="/login" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            <Link to="/features" className="block text-gray-700 hover:text-primary-500 font-medium">
              Features
            </Link>
            <Link to="/pricing" className="block text-gray-700 hover:text-primary-500 font-medium">
              Pricing
            </Link>
            <Link to="/blog" className="block text-gray-700 hover:text-primary-500 font-medium">
              Blog
            </Link>
            <Link to="/login" className="block text-gray-700 hover:text-primary-500 font-medium">
              Login
            </Link>
            <Link to="/signup" className="block btn-primary text-center">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
