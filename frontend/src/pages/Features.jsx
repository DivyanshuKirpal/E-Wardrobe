import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Upload, Palette, Heart, Sparkles, Camera, Share2, Clock, BarChart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Snap photos of your clothes and upload them instantly. Our smart categorization helps organize everything automatically.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Camera,
      title: 'Smart Capture',
      description: 'AI-powered image recognition automatically tags colors, patterns, and clothing types for effortless organization.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Palette,
      title: 'Outfit Creator',
      description: 'Mix and match items to create perfect outfits. Save your favorite combinations and plan ahead for any occasion.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      title: 'Smart Collections',
      description: 'Create custom collections, mark favorites, and get AI-powered suggestions based on your personal style.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Sparkles,
      title: 'AI Recommendations',
      description: 'Get personalized outfit suggestions based on weather, occasion, and your style preferences.',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Share2,
      title: 'Share & Inspire',
      description: 'Share your favorite outfits with friends or the community. Get inspired by others style choices.',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: Clock,
      title: 'Wear History',
      description: 'Track how often you wear each item. Make better decisions about what to keep and what to donate.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: BarChart,
      title: 'Analytics',
      description: 'Get insights into your wardrobe usage, color preferences, and spending habits. Optimize your closet.',
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <br />
              <span className="gradient-text">Your Digital Wardrobe</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Everything you need to organize, style, and optimize your wardrobe in one beautiful platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group hover:-translate-y-2"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who have transformed their wardrobe management
            </p>
            <Link to="/signup" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform">
              Start Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">© 2025 E-Wardrobe. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
