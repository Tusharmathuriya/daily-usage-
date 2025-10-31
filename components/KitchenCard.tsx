
import React from 'react';
import { Kitchen } from '../types';

interface KitchenCardProps {
  kitchen: Kitchen;
  onSelectKitchen: (kitchen: Kitchen) => void;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const KitchenCard: React.FC<KitchenCardProps> = ({ kitchen, onSelectKitchen }) => {
  return (
    <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
        onClick={() => onSelectKitchen(kitchen)}
    >
      <div className="relative">
        <img className="w-full h-48 object-cover" src={kitchen.imageUrl} alt={kitchen.name} />
        <div className="absolute top-0 right-0 bg-amber-500 text-white px-3 py-1 m-2 rounded-full text-sm font-bold flex items-center">
            <StarIcon className="w-4 h-4 mr-1"/>
            <span>{kitchen.rating}</span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors">{kitchen.name}</h3>
        <p className="text-sm text-gray-500 mb-2">by {kitchen.chefName}</p>
        <p className="text-gray-700 text-sm">{kitchen.specialty}</p>
      </div>
       <div className="px-4 pb-4">
            <button className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded-lg group-hover:bg-amber-500 transition-colors duration-300">
                View Menu
            </button>
        </div>
    </div>
  );
};

export default KitchenCard;
