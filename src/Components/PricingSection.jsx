import React from 'react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with wardrobe management",
      features: [
        "Up to 50 clothing items",
        "Basic outfit suggestions",
        "Mobile app access",
        "Community support",
        "Basic analytics"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "bg-gray-200 hover:bg-gray-300 text-gray-700",
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "per month",
      description: "Most popular choice for fashion enthusiasts",
      features: [
        "Unlimited clothing items",
        "Advanced AI recommendations",
        "Weather-based suggestions",
        "Outfit calendar planning",
        "Detailed analytics & insights",
        "Priority support",
        "Export capabilities"
      ],
      buttonText: "Start Free Trial",
      buttonStyle: "bg-indigo-600 hover:bg-indigo-700 text-white",
      popular: true
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "per month",
      description: "For fashion professionals and power users",
      features: [
        "Everything in Pro",
        "Custom AI training",
        "Brand integration",
        "Shopping recommendations",
        "Team collaboration",
        "API access",
        "White-label options",
        "Dedicated account manager"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-purple-600 hover:bg-purple-700 text-white",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-xl p-8 shadow-lg pricing-card border-2 ${
                plan.popular ? 'border-indigo-500 relative' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600 ml-2">/{plan.period}</span>
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <i className="fa-solid fa-check text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h3>
            <p className="text-gray-600 mb-6">
              Need a custom solution for your organization? We offer enterprise plans with advanced features, 
              dedicated support, and custom integrations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Contact Enterprise Sales
              </button>
              <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            <i className="fa-solid fa-shield-check mr-2 text-green-500" />
            All plans include 30-day money-back guarantee • Cancel anytime • No setup fees
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
