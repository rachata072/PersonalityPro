import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 p-4">
      <div className="absolute top-0 left-0 w-full overflow-hidden">
        <svg className="relative block w-full h-12" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                className="fill-white"></path>
        </svg>
      </div>
      
      <div className="container mx-auto text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-bounce">
            <span className="text-2xl font-bold text-white">🎨</span>
          </div>
          <p className="text-white text-lg font-semibold">
            Created with ❤️ by Trey
          </p>
          <div className="flex items-center space-x-2 text-white text-sm">
            <span className="animate-pulse">✨</span>
            <span>Discover Your True Self</span>
            <span className="animate-pulse">✨</span>
          </div>
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} Personality WebApp
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 