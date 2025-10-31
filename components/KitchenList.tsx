
import React from 'react';
import { Kitchen } from '../types';
import KitchenCard from './KitchenCard';

interface KitchenListProps {
  kitchens: Kitchen[];
  onSelectKitchen: (kitchen: Kitchen) => void;
}

const KitchenList: React.FC<KitchenListProps> = ({ kitchens, onSelectKitchen }) => {
  return (
    <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-amber-500 pl-4">Today's Kitchens</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {kitchens.map((kitchen) => (
                <KitchenCard key={kitchen.id} kitchen={kitchen} onSelectKitchen={onSelectKitchen} />
            ))}
        </div>
    </div>
  );
};

export default KitchenList;
