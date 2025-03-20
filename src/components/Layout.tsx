import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-purple-50">
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link 
              to="/"
              className="flex items-center space-x-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 hover:scale-105 transition-transform duration-200"
            >
              <span className="animate-spin-slow">🎭</span>
              <span>PersonalityPro</span>
            </Link>

            <div className="flex space-x-6">
              <Link
                to="/mbti"
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive('/mbti')
                    ? 'text-white bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                MBTI Quiz
                {isActive('/mbti') && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                  </span>
                )}
              </Link>
              
              <Link
                to="/enneagram"
                className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive('/enneagram')
                    ? 'text-white bg-gradient-to-r from-pink-500 to-orange-500'
                    : 'text-gray-600 hover:text-pink-600'
                }`}
              >
                Enneagram Quiz
                {isActive('/enneagram') && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Fun floating shapes in the background */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-56 -left-16 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-16 right-48 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
        
        {children}
      </main>

      <Footer />
    </div>
  );
};

export default Layout; 