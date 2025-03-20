import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link 
            to="/Personality-WebApp/"
            className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-200"
          >
            <span className="animate-spin-slow">🎭</span>
            <span>PersonalityPro</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link
              to="/Personality-WebApp/mbti"
              className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/Personality-WebApp/mbti')
                  ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              MBTI Quiz
              {isActive('/Personality-WebApp/mbti') && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
              )}
            </Link>
            
            <Link
              to="/Personality-WebApp/enneagram"
              className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                isActive('/Personality-WebApp/enneagram')
                  ? 'text-white bg-gradient-to-r from-pink-500 to-orange-500'
                  : 'text-gray-600 hover:text-pink-600'
              }`}
            >
              Enneagram Quiz
              {isActive('/Personality-WebApp/enneagram') && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 