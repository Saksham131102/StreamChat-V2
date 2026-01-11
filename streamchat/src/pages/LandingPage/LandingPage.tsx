import { Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LandingFooter from "./LandingFooter";
import { FaGlobe, FaShield, FaUsers } from "react-icons/fa6";
import { LuZap } from "react-icons/lu";

import bgImage from "../../assets/img/Home_Background.png";
import audienceImg from "../../assets/img/audience.jpeg";
import LandingNav from "./LandingNav";

const LandingPage = () => {
  const [isDark] = useState<boolean>(true);
  return (
    <div
      className="h-screen bg-center bg-cover"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bgImage})`,
      }}
    >
      <LandingNav />

      <div className="relative z-10 container mx-auto px-4 flex flex-col justify-center items-center min-h-screen text-center -m-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Stream Together,
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-purple-600">
              {" "}
              Experience More
            </span>
          </h1>

          {/* Supporting Description */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join millions of viewers in synchronized streaming rooms. Watch
            movies, TV shows, and exclusive content together with friends,
            family, and communities worldwide.
          </p>

          {/* Feature Highlights */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center text-gray-300">
              <FaUsers className="w-5 h-5 mr-2 text-purple-400" />
              <span className="text-sm md:text-base">Watch Together</span>
            </div>
            <span className="text-white text-2xl">•</span>
            <div className="flex items-center text-gray-300">
              <LuZap className="w-5 h-5 mr-2 text-yellow-400" />
              <span className="text-sm md:text-base">Real-time Chat</span>
            </div>
            <span className="text-white text-2xl">•</span>
            <div className="flex items-center text-gray-300">
              <FaShield className="w-5 h-5 mr-2 text-green-400" />
              <span className="text-sm md:text-base">HD Quality</span>
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/browse"
              className="group bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Play
                className="mr-3 group-hover:scale-110 transition-transform"
                size={24}
              />
              Get Started Free
            </Link>
            <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300">
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          {/* <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-gray-400">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-sm">4.8/5 Rating</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 text-blue-400 mr-2" />
              <span className="text-sm">10M+ Users</span>
            </div>
            <div className="flex items-center">
              <Globe className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm">150+ Countries</span>
            </div>
          </div> */}

          {/* Scroll Incicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section
        className={`py-20 ${
          isDark ? "bg-black" : "bg-gray-50"
        } transition-colors duration-500`}
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl text-white font-bold mb-4">
              Why Choose StreamChat?
            </h2>
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              } max-w-2xl mx-auto`}
            >
              Experience the future of social streaming with our innovative
              features designed for seamless entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div
              className={`${
                isDark ? "bg-transparent border-2 border-white" : "bg-white"
              } p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="w-16 h-16 bg-linear-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <FaShield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-4">
                Ultra HD Streaming
              </h3>
              <p
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } leading-relaxed`}
              >
                Experience crystal clear quality with our 4K HDR streaming
                technology. Every detail comes to life with stunning clarity and
                vibrant colors.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className={`${
                isDark ? "bg-transparent border-2 border-white" : "bg-white"
              } p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-6">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-4">
                Social Viewing Rooms
              </h3>
              <p
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } leading-relaxed`}
              >
                Create or join viewing rooms with friends and family. Chat,
                react, and share the experience in real-time, no matter where
                you are.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className={`${
                isDark ? "bg-transparent border-2 border-white" : "bg-white"
              } p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="w-16 h-16 bg-linear-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-6">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-4">
                Global Content Library
              </h3>
              <p
                className={`${
                  isDark ? "text-gray-400" : "text-gray-600"
                } leading-relaxed`}
              >
                Access thousands of movies, TV shows, and exclusive content from
                around the world. New releases added daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={audienceImg}
            alt="Join StreamChat Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-purple-900/70 to-red-900/70"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Streaming Experience?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join millions of users who have already discovered the joy of social
            streaming. Start your free trial today.
          </p>
          <Link
            to="/browse"
            className="inline-flex items-center bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Play className="mr-3" size={24} />
            Start Today
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
