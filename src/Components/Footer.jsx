import React from 'react';

const Footer = () => {
  const footerLinks = {
    Product: [
      "Features",
      "How It Works", 
      "Pricing",
      "Mobile App",
      "API Documentation"
    ],
    Company: [
      "About Us",
      "Careers",
      "Press",
      "Blog",
      "Contact"
    ],
    Support: [
      "Help Center",
      "Community",
      "Tutorials",
      "Status",
      "Report Bug"
    ],
    Legal: [
      "Privacy Policy",
      "Terms of Service",
      "Cookie Policy",
      "GDPR",
      "Accessibility"
    ]
  };

  const socialLinks = [
    { icon: "fa-facebook", href: "#" },
    { icon: "fa-twitter", href: "#" },
    { icon: "fa-instagram", href: "#" },
    { icon: "fa-linkedin", href: "#" },
    { icon: "fa-youtube", href: "#" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center mr-3">
                <i className="fa-solid fa-shirt text-white text-lg" />
              </div>
              <h3 className="text-2xl font-bold">e-Wardrobe</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Transform your wardrobe management with AI-powered outfit recommendations, 
              smart organization, and style insights. Join thousands of users who have 
              revolutionized their fashion game.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-indigo-600 rounded-lg flex items-center justify-center transition-colors"
                >
                  <i className={`fa-brands ${social.icon}`} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links], index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 e-Wardrobe. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center">
                <i className="fa-solid fa-globe mr-2" />
                English
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-dollar-sign mr-2" />
                USD
              </div>
              <div className="flex items-center">
                <i className="fa-solid fa-shield-check mr-2 text-green-500" />
                Secure & Private
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
