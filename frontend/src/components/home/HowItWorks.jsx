import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    { step: '01', title: 'Upload', description: 'Add your clothing items by uploading photos from your device' },
    { step: '02', title: 'Organize', description: 'Tag items by category, color, season, and create custom collections' },
    { step: '03', title: 'Style', description: 'Create outfits, get AI suggestions, and plan your looks ahead' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-6xl font-bold text-primary-200 mb-4">{item.step}</div>
              <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
