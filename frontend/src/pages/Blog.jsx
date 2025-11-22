import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function Blog() {
  const posts = [
    {
      title: '10 Tips for Building a Capsule Wardrobe',
      excerpt: 'Learn how to create a versatile wardrobe with fewer pieces that you absolutely love.',
      date: 'Nov 20, 2025',
      author: 'Sarah Johnson',
      category: 'Style Tips',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800'
    },
    {
      title: 'The Psychology of Color in Your Wardrobe',
      excerpt: 'Discover how different colors affect your mood and the impressions you make.',
      date: 'Nov 18, 2025',
      author: 'Michael Chen',
      category: 'Fashion Psychology',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800'
    },
    {
      title: 'Sustainable Fashion: Making Better Choices',
      excerpt: 'A guide to building an eco-friendly wardrobe without sacrificing style.',
      date: 'Nov 15, 2025',
      author: 'Emma Davis',
      category: 'Sustainability',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800'
    },
    {
      title: 'How to Organize Your Closet Like a Pro',
      excerpt: 'Expert tips and tricks for keeping your wardrobe neat and accessible.',
      date: 'Nov 12, 2025',
      author: 'James Wilson',
      category: 'Organization',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8ff4?w=800'
    },
    {
      title: 'Seasonal Wardrobe Transitions Made Easy',
      excerpt: 'Learn how to efficiently switch your wardrobe between seasons.',
      date: 'Nov 10, 2025',
      author: 'Lisa Anderson',
      category: 'Seasonal Tips',
      image: 'https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800'
    },
    {
      title: 'AI in Fashion: The Future is Here',
      excerpt: 'Explore how artificial intelligence is revolutionizing personal styling.',
      date: 'Nov 8, 2025',
      author: 'David Park',
      category: 'Technology',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c8ff4?w=800'
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
              Fashion, Style &
              <br />
              <span className="gradient-text">Wardrobe Insights</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Tips, trends, and expert advice to help you make the most of your wardrobe
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card group cursor-pointer hover:-translate-y-2"
              >
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary-600">
                      {post.category}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {post.author}
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 shadow-lg"
          >
            <h2 className="text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-8">
              Get the latest fashion tips, style guides, and exclusive content delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </div>
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
