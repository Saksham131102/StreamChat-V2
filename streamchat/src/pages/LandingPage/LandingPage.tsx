import { Play } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import LandingFooter from "./LandingFooter";
import { FaGlobe, FaShield, FaUsers } from "react-icons/fa6";
import { LuZap } from "react-icons/lu";

import bgImage from "../../assets/img/Home_Background.png";
import LandingNav from "./LandingNav";

const LandingPage = () => {
  const [isDark] = useState<boolean>(true);

  return (
    // Removed h-screen — the page needs to scroll past the hero into the features section
    <div className="min-h-screen bg-center bg-cover">

      {/* ── HERO ── */}
      <div
        className="relative bg-center bg-cover"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bgImage})`,
        }}
      >
        <LandingNav />

        {/* Removed negative -m-10; use pt to clear the fixed/sticky nav instead */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center min-h-[calc(100vh-4rem)] text-center py-20">
          <div className="max-w-4xl mx-auto w-full">

            {/* Main Headline — tighter sizing on xs screens */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Stream Together,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
                {" "}Experience More
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-xl md:text-2xl text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
              Join millions of viewers in synchronized streaming rooms. Watch
              movies, TV shows, and exclusive content together with friends,
              family, and communities worldwide.
            </p>

            {/* Feature Highlights — stack vertically on xs, row from sm */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-6 mb-8 sm:mb-10">
              <div className="flex items-center text-gray-300">
                <FaUsers className="w-5 h-5 mr-2 text-purple-400" />
                <span className="text-sm">Watch Together</span>
              </div>
              <span className="hidden sm:block text-white text-2xl">•</span>
              <div className="flex items-center text-gray-300">
                <LuZap className="w-5 h-5 mr-2 text-yellow-400" />
                <span className="text-sm">Real-time Chat</span>
              </div>
              <span className="hidden sm:block text-white text-2xl">•</span>
              <div className="flex items-center text-gray-300">
                <FaShield className="w-5 h-5 mr-2 text-green-400" />
                <span className="text-sm">HD Quality</span>
              </div>
            </div>

            {/* CTA Buttons — full-width on xs, auto from sm */}
            <div className="flex flex-row gap-4 justify-center items-center w-full">
              <Link
                to="/signin"
                className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Play
                  className="mr-3 group-hover:scale-110 transition-transform"
                  size={24}
                />
                Get Started
              </Link>
              <button className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg border border-white/20 hover:border-white/40 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll Indicator — anchored inside this relative section, not the clipped outer div */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section
        className={`py-16 sm:py-20 ${isDark ? "bg-black" : "bg-gray-50"} transition-colors duration-500`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl text-white font-bold mb-4">
              Why Choose StreamChat?
            </h2>
            <p className={`text-base sm:text-lg ${isDark ? "text-gray-400" : "text-gray-600"} max-w-2xl mx-auto px-2`}>
              Experience the future of social streaming with our innovative
              features designed for seamless entertainment.
            </p>
          </div>

          {/* Cards — single col → 3 col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div
              className={`${
                isDark ? "bg-transparent border-2 border-gray-400" : "bg-white"
              } p-6 sm:p-8 rounded-xl shadow-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <FaShield className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl text-white font-semibold mb-3 sm:mb-4">
                Ultra HD Streaming
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed text-sm sm:text-base`}>
                Experience crystal clear quality with our 4K HDR streaming
                technology. Every detail comes to life with stunning clarity and
                vibrant colors.
              </p>
            </div>

            <div
              className={`${
                isDark ? "bg-transparent border-2 border-gray-400" : "bg-white"
              } p-6 sm:p-8 rounded-xl shadow-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <FaUsers className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl text-white font-semibold mb-3 sm:mb-4">
                Social Viewing Rooms
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed text-sm sm:text-base`}>
                Create or join viewing rooms with friends and family. Chat,
                react, and share the experience in real-time, no matter where
                you are.
              </p>
            </div>

            {/* Third card spans full width on sm (2-col grid) to centre it */}
            <div
              className={`${
                isDark ? "bg-transparent border-2 border-gray-400" : "bg-white"
              } p-6 sm:p-8 rounded-xl shadow-gray-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 sm:col-span-2 lg:col-span-1`}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <FaGlobe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl text-white font-semibold mb-3 sm:mb-4">
                Global Content Library
              </h3>
              <p className={`${isDark ? "text-gray-400" : "text-gray-600"} leading-relaxed text-sm sm:text-base`}>
                Access thousands of movies, TV shows, and exclusive content from
                around the world. New releases added daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${bgImage})`,
        }}
      >
        <section className="relative py-16 sm:py-20 overflow-hidden">
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 max-w-2xl mx-auto">
              Ready to Transform Your Streaming Experience?
            </h2>
            <p className="text-base sm:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
              Join millions of users who have already discovered the joy of
              social streaming. Start your free trial today.
            </p>
            <Link
              to="/signin"
              className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full sm:w-auto max-w-xs sm:max-w-none mx-auto"
            >
              <Play className="mr-3 flex-shrink-0" size={24} />
              Start Today
            </Link>
          </div>
        </section>
      </div>

      {/* ── FOOTER ── */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;