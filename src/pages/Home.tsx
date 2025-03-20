import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12">
      <h1 className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500">
        Discover Your True Personality
      </h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Link
          to="/mbti"
          className="transform hover:scale-105 transition-all duration-300"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border-2 border-purple-100 hover:border-purple-300 transition-all">
            <h2 className="text-2xl font-bold text-purple-600 mb-4">MBTI Test</h2>
            <p className="text-gray-600">Discover your personality type based on Carl Jung's theory of psychological types.</p>
          </div>
        </Link>

        <Link
          to="/enneagram"
          className="transform hover:scale-105 transition-all duration-300"
        >
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border-2 border-pink-100 hover:border-pink-300 transition-all">
            <h2 className="text-2xl font-bold text-pink-600 mb-4">Enneagram Test</h2>
            <p className="text-gray-600">Explore your core motivations and personality patterns with the Enneagram system.</p>
          </div>
        </Link>
      </div>

    
    </div>
  );
};

export default Home; 