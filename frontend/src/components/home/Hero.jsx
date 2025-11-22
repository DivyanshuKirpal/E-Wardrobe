import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-block"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              New: AI-Powered Outfit Suggestions
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Organize & Style
            <br />
            <span className="gradient-text">Your Digital Wardrobe</span>
          </h1>

          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            A wardrobe management platform designed for fashion enthusiasts to organize,
            style, and showcase their clothing collection.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary inline-flex items-center justify-center">
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/demo" className="btn-secondary inline-flex items-center justify-center">
              Watch Demo
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
