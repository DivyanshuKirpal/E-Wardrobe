import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import { Target, Users, Heart, Zap } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To revolutionize how people interact with their wardrobes through innovative technology and beautiful design.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build features based on real user feedback and needs, creating a platform that truly serves our community.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Sustainable Fashion',
      description: 'Helping users make conscious choices about their wardrobe, reducing waste and promoting mindful consumption.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly pushing boundaries with AI and machine learning to deliver the best wardrobe management experience.',
      color: 'from-orange-500 to-red-500'
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
              We're Transforming
              <br />
              <span className="gradient-text">Wardrobe Management</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              E-Wardrobe was born from a simple idea: managing your closet should be as easy and enjoyable as wearing your favorite outfit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700 text-left">
              <p>
                Founded in 2025, E-Wardrobe started when our team realized that despite having closets full of clothes, 
                people often felt like they had nothing to wear. The problem wasn't the clothes – it was organization.
              </p>
              <p>
                We set out to create a platform that would help people rediscover their wardrobe, make better fashion 
                choices, and ultimately feel more confident in what they wear every day.
              </p>
              <p>
                Today, thousands of users trust E-Wardrobe to manage their clothing, create outfits, and make sustainable 
                fashion choices. We're just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Users' },
              { number: '500K+', label: 'Items Organized' },
              { number: '1M+', label: 'Outfits Created' },
              { number: '4.9★', label: 'User Rating' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-3xl p-12 text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Community
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Be part of the wardrobe revolution and never have a "nothing to wear" moment again
            </p>
            <Link to="/signup" className="inline-flex items-center bg-white text-primary-600 px-8 py-4 rounded-lg font-bold hover:scale-105 transition-transform">
              Get Started Free
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
