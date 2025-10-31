
import React, { useState } from 'react';
import { Kitchen, MenuItem } from './types';
import Header from './components/Header';
import KitchenList from './components/KitchenList';
import MenuModal from './components/MenuModal';

const KITCHEN_DATA: Kitchen[] = [
  {
    id: 1,
    name: "Susan's Kitchen",
    chefName: 'Susan Miller',
    specialty: 'Italian Comfort Food',
    rating: 4.8,
    imageUrl: 'https://picsum.photos/seed/susan/600/400',
    menu: [
      { id: 101, name: 'Classic Lasagna', description: 'Layers of pasta, rich meat sauce, and creamy béchamel.', price: 18, imageUrl: 'https://picsum.photos/seed/lasagna/600/400' },
      { id: 102, name: 'Chicken Parmesan', description: 'Breaded chicken breast, fried and topped with marinara and mozzarella.', price: 16, imageUrl: 'https://picsum.photos/seed/parmesan/600/400' },
      { id: 103, name: 'Garlic Bread Twists', description: 'Freshly baked bread with garlic butter and herbs.', price: 7, imageUrl: 'https://picsum.photos/seed/garlic/600/400' },
    ],
  },
  {
    id: 2,
    // Fix: Use double quotes to avoid syntax error from unescaped single quote in "Rajesh's".
    name: "Rajesh's Tandoor",
    chefName: 'Rajesh Kumar',
    specialty: 'Authentic Indian Curry',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/rajesh/600/400',
    menu: [
      { id: 201, name: 'Butter Chicken', description: 'Tender chicken in a creamy tomato-based sauce.', price: 15, imageUrl: 'https://picsum.photos/seed/butterchicken/600/400' },
      { id: 202, name: 'Paneer Tikka Masala', description: 'Grilled paneer cubes in a spicy, aromatic gravy.', price: 14, imageUrl: 'https://picsum.photos/seed/paneer/600/400' },
      { id: 203, name: 'Naan Bread', description: 'Soft and fluffy leavened bread, perfect for dipping.', price: 4, imageUrl: 'https://picsum.photos/seed/naan/600/400' },
    ],
  },
  {
    id: 3,
    name: 'Taco Fiesta',
    chefName: 'Maria Garcia',
    specialty: 'Mexican Street Food',
    rating: 4.7,
    imageUrl: 'https://picsum.photos/seed/maria/600/400',
    menu: [
        { id: 301, name: 'Carne Asada Tacos', description: 'Grilled steak tacos with fresh cilantro and onions.', price: 12, imageUrl: 'https://picsum.photos/seed/tacos/600/400' },
        { id: 302, name: 'Elote (Street Corn)', description: 'Grilled corn on the cob with cotija cheese, mayo, and chili.', price: 6, imageUrl: 'https://picsum.photos/seed/elote/600/400' },
        { id: 303, name: 'Horchata', description: 'A refreshing, sweet rice milk drink with cinnamon.', price: 5, imageUrl: 'https://picsum.photos/seed/horchata/600/400' },
    ],
  },
    {
    id: 4,
    name: 'Vietnamese Corner',
    chefName: 'Linh Nguyen',
    specialty: 'Hearty Vietnamese Pho',
    rating: 4.9,
    imageUrl: 'https://picsum.photos/seed/linh/600/400',
    menu: [
        { id: 401, name: 'Beef Pho', description: 'Aromatic beef broth with rice noodles, and tender beef slices.', price: 14, imageUrl: 'https://picsum.photos/seed/pho/600/400' },
        { id: 402, name: 'Spring Rolls', description: 'Fresh spring rolls with shrimp, pork, and vermicelli.', price: 8, imageUrl: 'https://picsum.photos/seed/springrolls/600/400' },
        { id: 403, name: 'Banh Mi', description: 'A savory Vietnamese sandwich with grilled pork and pickled vegetables.', price: 10, imageUrl: 'https://picsum.photos/seed/banhmi/600/400' },
    ],
  },
];

const App: React.FC = () => {
  const [kitchens] = useState<Kitchen[]>(KITCHEN_DATA);
  const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | null>(null);

  const handleSelectKitchen = (kitchen: Kitchen) => {
    setSelectedKitchen(kitchen);
  };

  const handleCloseModal = () => {
    setSelectedKitchen(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                Home-Cooked Meals, Delivered.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the taste of home. Browse daily menus from talented local chefs and get fresh meals delivered to your doorstep.
            </p>
        </div>

        <KitchenList kitchens={kitchens} onSelectKitchen={handleSelectKitchen} />
      </main>

      {selectedKitchen && (
        <MenuModal kitchen={selectedKitchen} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default App;