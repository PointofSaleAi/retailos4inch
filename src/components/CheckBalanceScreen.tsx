import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow.png';
import iconGiftCard from '@/assets/icon-gift-card.png';
import iconCamera from '@/assets/icon-camera-black.png';

interface CheckBalanceScreenProps {
  onBack: () => void;
  onCheckBalance: (cardNumber: string) => void;
}

export const CheckBalanceScreen = ({ onBack, onCheckBalance }: CheckBalanceScreenProps) => {
  const [cardNumber, setCardNumber] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setCardNumber('');
    } else if (key === '00') {
      setCardNumber(prev => prev + '00');
    } else {
      setCardNumber(prev => prev + key);
    }
  };

  const handleContinue = () => {
    if (cardNumber.length > 0) {
      onCheckBalance(cardNumber);
    }
  };

  return (
    <div 
      className="w-[189px] h-[330px] bg-white flex flex-col overflow-hidden" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center h-[36px] px-[6px] relative">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 text-[11px] font-semibold text-[#1A1A1A]">
          Check Balance
        </span>
      </div>

      {/* Subtitle */}
      <p className="px-[6px] pb-2 text-[8px] text-[#666666] leading-tight">
        You can scan, swipe, or enter the number found on your gift card.
      </p>

      {/* Card Number Input */}
      <div className="px-[6px] mb-2">
        <div 
          className="flex items-center gap-2 px-2 py-2 border border-gray-300 rounded-lg bg-white cursor-pointer"
          onClick={handleContinue}
        >
          <img src={iconGiftCard} alt="Card" className="w-[16px] h-[16px]" />
          <span className={`flex-1 text-[10px] ${cardNumber ? 'text-[#1A1A1A]' : 'text-gray-400'}`}>
            {cardNumber || 'Card number'}
          </span>
          <img src={iconCamera} alt="Scan" className="w-[16px] h-[16px]" />
        </div>
      </div>

      {/* Helper Text */}
      <p className="px-[6px] pb-2 text-[7px] text-[#999999] leading-tight">
        You can scan gift cards with barcodes or QR codes if your device has a camera.
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-[6px] mb-2" />

      {/* Number Pad */}
      <div className="flex-1 px-[6px] pb-[6px]">
        <div className="grid grid-cols-3 gap-1 h-full">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', 'C'].map((key) => (
            <button
              key={key}
              onClick={() => handleKeyPress(key)}
              className={`flex items-center justify-center rounded-lg text-[14px] font-medium transition-colors ${
                key === 'C' 
                  ? 'text-red-500 bg-gray-50 hover:bg-gray-100' 
                  : 'text-[#1A1A1A] bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
