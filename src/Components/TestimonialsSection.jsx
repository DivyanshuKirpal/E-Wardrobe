import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Fashion Blogger",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "e-Wardrobe has completely transformed how I organize my closet. The AI suggestions are spot-on and I've discovered so many new outfit combinations I never thought of!",
      rating: 5,
      location: "New York, NY"
    },
    {
      name: "Michael Chen",
      role: "Tech Professional",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "As someone who travels frequently, e-Wardrobe helps me pack efficiently and ensures I always have the right outfits for different occasions. It's a game-changer!",
      rating: 5,
      location: "San Francisco, CA"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "The analytics feature is incredible. I can see exactly what I wear most and make smarter shopping decisions. It's saved me so much money!",
      rating: 5,
      location: "Austin, TX"
    },
    {
      name: "David Kim",
      role: "Student",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Perfect for college students on a budget. The app helps me maximize my wardrobe and always look put-together without spending a fortune.",
      rating: 5,
      location: "Boston, MA"
    },
    {
      name: "Lisa Thompson",
      role: "Event Planner",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Planning outfits for events is so much easier now. The seasonal recommendations and event-specific suggestions are incredibly helpful.",
      rating: 5,
      location: "Miami, FL"
    },
    {
      name: "James Wilson",
      role: "Consultant",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "The color matching feature is amazing. I've learned so much about color theory and my outfits look more professional and cohesive.",
      rating: 5,
      location: "Chicago, IL"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            What Our Users Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have transformed their wardrobe management with e-Wardrobe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg testimonial-card border border-gray-200">
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-yellow-400 mr-1" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <p className="text-sm text-gray-500">
                <i className="fa-solid fa-map-marker-alt mr-1" />
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">4.9/5</div>
                <div className="text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">50K+</div>
                <div className="text-gray-600">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">98%</div>
                <div className="text-gray-600">Would Recommend</div>
              </div>
            </div>
            <p className="text-gray-600">
              Rated #1 wardrobe management app in the App Store and Google Play
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
