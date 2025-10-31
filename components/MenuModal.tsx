
import React, { useState, useEffect, useCallback } from 'react';
import { Kitchen, MenuItem, BookingDetails } from '../types';
import { generateDishDescription } from '../services/geminiService';

interface MenuModalProps {
  kitchen: Kitchen;
  onClose: () => void;
}

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm6 0a1 1 0 011 1v1h1a1 1 0 010 2h-1v1a1 1 0 01-2 0V6h-1a1 1 0 010-2h1V3a1 1 0 011-1zM3 13a1 1 0 011 1v1h1a1 1 0 010 2H4v1a1 1 0 01-2 0v-1H1a1 1 0 010-2h1v-1a1 1 0 011-1zm12-2a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
);


const MenuModal: React.FC<MenuModalProps> = ({ kitchen, onClose }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [bookingDetails, setBookingDetails] = useState({ name: '', address: '', phone: '', date: '' });
  const [step, setStep] = useState<'menu' | 'form' | 'confirmed'>('menu');
  const [aiDescription, setAiDescription] = useState('');
  const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const handleItemSelect = (item: MenuItem) => {
    setSelectedItem(item);
    setStep('form');
    setAiDescription('');
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      console.log('Booking:', { ...bookingDetails, menuItem: selectedItem });
      setStep('confirmed');
    }
  };

  const handleGetDescription = useCallback(async (itemName: string) => {
    if (aiDescription) { // Clear if already exists
        setAiDescription('');
        return;
    }
    setIsDescriptionLoading(true);
    try {
        const description = await generateDishDescription(itemName);
        setAiDescription(description);
    } catch (error) {
        console.error('Error fetching AI description:', error);
        setAiDescription('Could not generate a description at this time.');
    } finally {
        setIsDescriptionLoading(false);
    }
  }, [aiDescription]);


  const renderMenu = () => (
    <div>
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">Today's Menu</h3>
        <div className="space-y-4">
            {kitchen.menu.map(item => (
                <div key={item.id} className="bg-gray-100 rounded-lg p-4 flex items-center justify-between hover:bg-amber-50 transition-colors">
                    <div className="flex items-center">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-md object-cover mr-4" />
                        <div>
                            <p className="font-bold text-gray-800">{item.name}</p>
                            <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                        </div>
                    </div>
                    <button onClick={() => handleItemSelect(item)} className="bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-amber-600 transition-colors">
                        Book
                    </button>
                </div>
            ))}
        </div>
    </div>
  );

  const renderForm = () => selectedItem && (
    <div>
      <button onClick={() => setStep('menu')} className="text-sm text-amber-600 hover:underline mb-4">&larr; Back to Menu</button>
      <h3 className="text-2xl font-bold mb-2 text-center text-gray-800">Book Your Meal</h3>
      <div className="text-center bg-amber-100 border-l-4 border-amber-500 text-amber-700 p-4 rounded-r-lg mb-6">
          <p className="font-bold">{selectedItem.name}</p>
          <p className="text-sm">{selectedItem.description}</p>
          <p className="font-bold mt-1">${selectedItem.price.toFixed(2)}</p>
          <button onClick={() => handleGetDescription(selectedItem.name)} disabled={isDescriptionLoading} className="mt-2 inline-flex items-center text-sm bg-amber-200 text-amber-800 px-3 py-1 rounded-full hover:bg-amber-300 disabled:opacity-50 transition-colors">
            <SparklesIcon className="w-4 h-4 mr-1"/>
            {isDescriptionLoading ? 'Thinking...' : (aiDescription ? 'Clear Description' : 'Tell me more!')}
          </button>
          {aiDescription && <p className="text-sm text-amber-900 mt-2 p-2 bg-amber-50 rounded-md italic">{aiDescription}</p>}
      </div>

      <form onSubmit={handleBookingSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={bookingDetails.name} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" required />
          <input type="text" name="address" placeholder="Delivery Address" value={bookingDetails.address} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={bookingDetails.phone} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" required />
          <input type="datetime-local" name="date" value={bookingDetails.date} onChange={handleInputChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none" required />
          <button type="submit" className="w-full bg-gray-800 text-white font-bold py-3 px-4 rounded-lg hover:bg-amber-600 transition-colors">Confirm Booking</button>
      </form>
    </div>
  );

  const renderConfirmation = () => selectedItem && (
    <div className="text-center p-6">
        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        <h3 className="text-2xl font-bold mt-4 text-gray-800">Booking Confirmed!</h3>
        <p className="text-gray-600 mt-2">
            Thank you, {bookingDetails.name}. Your order for <strong>{selectedItem.name}</strong> is confirmed.
        </p>
        <p className="text-gray-600">It will be delivered to {bookingDetails.address}.</p>
        <button onClick={onClose} className="mt-6 bg-amber-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-amber-600 transition-colors">
            Done
        </button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-auto relative transform transition-all" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <CloseIcon className="w-6 h-6" />
          </button>
          <div className="flex flex-col items-center border-b pb-4 mb-4">
              <img src={kitchen.imageUrl} alt={kitchen.name} className="w-24 h-24 rounded-full object-cover border-4 border-white -mt-16 shadow-lg"/>
              <h2 className="text-3xl font-bold text-gray-800 mt-2">{kitchen.name}</h2>
              <p className="text-gray-500">by {kitchen.chefName}</p>
          </div>
          {step === 'menu' && renderMenu()}
          {step === 'form' && renderForm()}
          {step === 'confirmed' && renderConfirmation()}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
