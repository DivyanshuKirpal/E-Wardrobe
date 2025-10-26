import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import StatsSection from "../Components/StatsSection.jsx";
import FeaturesSection from "../Components/FeaturesSection.jsx";
import HowItWorksSection from "../Components/HowItWorksSection.jsx";
import TestimonialsSection from "../Components/TestimonialsSection.jsx";
import PricingSection from "../Components/PricingSection.jsx";
import Footer from "../Components/Footer.jsx";

const LandingPage = ({ isLoggedIn, onLogin, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin();
    navigate("/closet");
  };

  const handleClosetClick = () => {
    if (isLoggedIn) {
      navigate("/closet");
    }
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={onLogout}
        onNavigateToCloset={handleClosetClick}
      />

      <section
        id="hero"
        className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 pt-24 pb-16 h-[800px] flex items-center"
      >
        <div className="absolute inset-0 bg-indigo-900/40"></div>

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center text-white relative z-10">
          <div>
            <h1 className="text-6xl font-bold mb-6 leading-tight text-white">
              Your Digital Wardrobe,{" "}
              <span className="text-purple-300">Simplified</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Organize, explore, and style your clothes effortlessly with AI-powered
              outfit recommendations and smart wardrobe management.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleLogin}
                className="bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
              >
                <i className="fa-solid fa-rocket mr-2" />
                Get Started Free
              </button>

              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors flex items-center justify-center">
                <i className="fa-solid fa-play mr-2" />
                See Demo
              </button>
            </div>

            <div className="flex items-center space-x-6 text-sm">
              {["Free 30-day trial", "No credit card required", "Cancel anytime"].map(
                (txt, i) => (
                  <div className="flex items-center" key={i}>
                    <i className="fa-solid fa-circle-check mr-2 text-purple-300" />
                    <span>{txt}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
              <img
                className="w-full h-auto max-h-96 object-cover rounded-xl"
                src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1faabd44ba-ddc53d17129113ffc953.png"
                alt="modern digital wardrobe interface"
              />
            </div>
            <div className="absolute -top-4 -right-4 bg-purple-500 text-white px-4 py-2 rounded-full font-semibold">
              <i className="fa-solid fa-star mr-1" /> 4.9/5 Rating
            </div>
            <div className="absolute -bottom-4 -left-4 bg-indigo-600 text-white px-4 py-2 rounded-full font-semibold">
              <i className="fa-solid fa-users mr-1" /> 25k+ Users
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </>
  );
};

export default LandingPage;
