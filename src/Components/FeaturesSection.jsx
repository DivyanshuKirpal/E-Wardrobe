import React from 'react';

const FeaturesSection = () => {
  const features = [
    {
      icon: "fa-wand-magic-sparkles",
      title: "AI Outfit Suggestions",
      description: "Get personalized outfit recommendations based on weather, occasion, and your style preferences. Our AI learns your taste and suggests perfect combinations.",
      benefits: [
        "Weather-based recommendations",
        "Occasion-specific styling",
        "Personal style learning"
      ],
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      icon: "fa-closet",
      title: "Smart Inventory Management",
      description: "Organize your entire wardrobe digitally with smart categorization, tagging, and search functionality. Never lose track of your clothes again.",
      benefits: [
        "Auto-categorization by type, color, brand",
        "Advanced search and filtering",
        "Condition and care tracking"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "fa-calendar-days",
      title: "Seasonal & Event Planning",
      description: "Plan your outfits for upcoming events, seasons, and special occasions. Create outfit calendars and never be unprepared again.",
      benefits: [
        "Event-specific outfit planning",
        "Seasonal wardrobe transitions",
        "Outfit calendar integration"
      ],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: "fa-chart-line",
      title: "Wear Analytics & Insights",
      description: "Discover your wearing patterns, most and least worn items, and get insights to optimize your wardrobe and shopping decisions.",
      benefits: [
        "Wear frequency tracking",
        "Cost-per-wear analysis",
        "Shopping recommendations"
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "fa-camera",
      title: "Visual Outfit Capture",
      description: "Take photos of your outfits, save your favorite combinations, and build a visual diary of your style evolution over time.",
      benefits: [
        "Outfit photo capture and storage",
        "Style evolution timeline",
        "Social sharing capabilities"
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "fa-palette",
      title: "Color & Style Matching",
      description: "Advanced color theory and style matching algorithms help you create harmonious outfits and discover new combinations you never thought of.",
      benefits: [
        "Color harmony analysis",
        "Style compatibility matching",
        "Trend-based suggestions"
      ],
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for Your Style Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how e-Wardrobe transforms the way you manage, style, and enjoy your clothing collection with cutting-edge technology
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg card-hover border border-gray-200">
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6`}>
                <i className={`fa-solid ${feature.icon} text-white text-2xl`} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {feature.description}
              </p>
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center text-sm text-gray-500">
                    <i className="text-green-500 mr-2 fa-solid fa-check" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
