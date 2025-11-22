import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Play } from 'lucide-react';

export default function Demo() {
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
              See E-Wardrobe
              <br />
              <span className="gradient-text">In Action</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Watch how easy it is to organize your wardrobe and create stunning outfits
            </p>
          </motion.div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-video bg-gradient-to-br from-primary-100 to-purple-100 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Play className="w-12 h-12 text-primary-500 ml-2" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg">
              <p className="font-semibold">Full Product Demo - 3:45</p>
              <p className="text-sm text-gray-600">Learn how to get the most out of E-Wardrobe</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Quick Feature Highlights</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Upload & Organize',
                time: '0:30',
                description: 'See how quickly you can add items to your wardrobe'
              },
              {
                title: 'Create Outfits',
                time: '1:45',
                description: 'Mix and match to create the perfect look'
              },
              {
                title: 'Get AI Suggestions',
                time: '2:30',
                description: 'Let AI help you discover new combinations'
              }
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">{highlight.time}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Try It Yourself?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start your free trial today and experience the future of wardrobe management
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
