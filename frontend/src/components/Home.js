import React from 'react'
import css from "../index.css"




const Home = () => {
  return (
    <div className="flex min-h-screen bg-black font-sans text-white overflow-hidden">
  

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <section className="relative h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-900 to-black">
          {/* Animated Welcome Text */}
          <h1 className="text-6xl font-bold animate-breathing bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Welcome to AnomalyDetector
          </h1>
          <p className="mt-4 text-gray-300 text-lg">
            An AI-powered environment for detecting anomalies using deep learning & ML.
          </p>

          {/* Interactive Buttons */}
          <div className="mt-8 flex space-x-6">
            <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform hover:shadow-lg hover:shadow-cyan-500/50">
              Upload Data
            </button>
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform hover:shadow-lg hover:shadow-teal-500/50">
              Visualize Results
            </button>
            <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-lg hover:scale-105 transition-transform hover:shadow-lg hover:shadow-white/50">
              FAQ's
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-gray-800 to-black">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature Cards */}
              {[
                {
                  title: 'AI-Powered Anomaly Detection',
                  description: 'Uses deep learning & ML.',
                  icon: '🚀',
                },
                {
                  title: 'Advanced Data Visualization',
                  description: 'Converts data into interactive graphs.',
                  icon: '📊',
                },
                {
                  title: 'Secure & Scalable',
                  description: 'Ensures encrypted storage.',
                  icon: '🔒',
                },
                {
                  title: 'Flexible Data Input',
                  description: 'Accepts CSV, JSON, real-time streams.',
                  icon: '📁',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-800 hover:border-cyan-500 transition-all hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-5xl font-bold mb-6 animate-pulse bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Ready to Detect Anomalies?
            </h2>
            <p className="text-gray-300 mb-8">
              Upload your data and let our AI-powered system analyze it for anomalies.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-semibold rounded-lg hover:scale-105 transition-transform hover:shadow-lg hover:shadow-purple-500/50">
              Get Started
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
