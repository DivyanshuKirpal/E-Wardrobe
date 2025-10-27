import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: "50,000+", label: "Active Users", color: "text-indigo-600" },
    { number: "2M+", label: "Outfits Created", color: "text-purple-600" },
    { number: "95%", label: "Satisfaction Rate", color: "text-cyan-600" },
    { number: "24/7", label: "AI Support", color: "text-indigo-600" }
  ];

  return (
    <section id="stats" className="bg-white py-16 border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
