import { motion } from 'framer-motion';
import { Upload, Palette, Heart } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Upload,
      title: 'Easy Upload',
      description: 'Snap photos of your clothes and upload them instantly. Organize by category, color, season, or occasion.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Outfit Creator',
      description: 'Mix and match items to create perfect outfits. Save your favorite combinations for quick access.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Heart,
      title: 'Smart Collections',
      description: 'Create collections, mark favorites, and get AI-powered suggestions based on your style preferences.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            An Unmatched Fashion Experience
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to manage your wardrobe digitally
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="card group hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
