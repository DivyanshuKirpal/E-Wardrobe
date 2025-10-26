import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Upload Your Clothes",
      description: "Take photos of your clothing items or upload existing images. Our AI automatically categorizes and tags each piece.",
      icon: "fa-camera",
      color: "from-blue-500 to-cyan-500"
    },
    {
      number: "02", 
      title: "AI Analysis & Organization",
      description: "Our smart system analyzes colors, styles, and patterns to create a comprehensive digital wardrobe catalog.",
      icon: "fa-brain",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "03",
      title: "Get Personalized Recommendations",
      description: "Receive outfit suggestions based on weather, occasion, and your personal style preferences.",
      icon: "fa-magic-wand-sparkles",
      color: "from-green-500 to-emerald-500"
    },
    {
      number: "04",
      title: "Plan & Track Your Style",
      description: "Create outfit calendars, track what you wear, and discover your style patterns with detailed analytics.",
      icon: "fa-chart-line",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            How e-Wardrobe Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your wardrobe management in just four simple steps. Our AI-powered platform makes styling effortless and fun.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white font-bold text-lg">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                    <i className="fa-solid fa-mobile-screen text-white text-xl" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">Mobile App</h4>
                    <p className="text-gray-600 text-sm">Available on iOS & Android</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fa-solid fa-check text-green-500 mr-2" />
                    Instant photo capture
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fa-solid fa-check text-green-500 mr-2" />
                    Offline mode support
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <i className="fa-solid fa-check text-green-500 mr-2" />
                    Sync across devices
                  </div>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm">
              <i className="fa-solid fa-download mr-1" />
              Download Now
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center">
            <i className="fa-solid fa-play mr-2" />
            Watch Demo Video
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
