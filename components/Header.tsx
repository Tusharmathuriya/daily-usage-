
import React from 'react';

const PotIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 4h-3.5a1 1 0 0 0-.8.4L13 6H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a4 4 0 0 0-4-4zM8 12a1 1 0 0 1-2 0V9h2v3zm4 0a1 1 0 0 1-2 0V9h2v3zm4 0a1 1 0 0 1-2 0V9h2v3zM4 6h7l-1.5 2H4V6zm15 13H4a1 1 0 0 1-1-1V9h17v9a1 1 0 0 1-1 1z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
            <PotIcon className="w-8 h-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-800">Daily Meals</span>
        </div>
        <button className="hidden md:block bg-amber-500 text-white font-bold py-2 px-4 rounded-full hover:bg-amber-600 transition-colors duration-300">
            Order Now
        </button>
      </div>
    </header>
  );
};

export default Header;
