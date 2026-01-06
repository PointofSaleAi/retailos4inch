import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import iconCamera from '@/assets/icon-camera-black.png';

interface SellPlasticGiftCardScreenProps {
  onBack: () => void;
  onContinue: (cardNumber: string) => void;
  isEGift?: boolean;
}

export const SellPlasticGiftCardScreen = ({
  onBack,
  onContinue,
  isEGift = false
}: SellPlasticGiftCardScreenProps) => {
  const [cardNumber, setCardNumber] = useState('');

  const formatCardNumber = (num: string) => {
    // Format with spaces every 4 digits
    const groups = [];
    for (let i = 0; i < num.length; i += 4) {
      groups.push(num.slice(i, i + 4));
    }
    return groups.join(' ');
  };

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setCardNumber('');
      return;
    }
    if (num === '00') {
      if (cardNumber.length <= 14) {
        setCardNumber(prev => prev + '00');
      } else if (cardNumber.length === 15) {
        setCardNumber(prev => prev + '0');
      }
      return;
    }
    if (cardNumber.length < 16) {
      setCardNumber(prev => prev + num);
    }
  };

  const handleContinue = () => {
    if (cardNumber.length >= 10) {
      onContinue(cardNumber);
    }
  };

  const isValidCard = cardNumber.length >= 10;

  return (
    <div 
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center h-[40px] relative px-[6px]">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="flex-1 text-center text-[11px] font-semibold text-[#1A1A1A] pr-[24px]">
          {isEGift ? 'Sell eGift Card' : 'Sell Plastic Gift Card'}
        </span>
      </div>

      {/* Subtitle */}
      <p className="px-[6px] pb-2 text-left text-[9px] text-[#666666] leading-tight">
        Swipe or scan to sell, reload, or check balance. Enter card number if preferred.
      </p>

      {/* Card Number Input */}
      <div className="px-[6px] mb-1">
        <div className="flex items-center justify-between p-2.5 border border-gray-200 rounded-lg bg-white">
          <div className="flex items-center gap-2 flex-1">
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="4" width="16" height="10" rx="1" stroke="#666666" strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="9" r="2" stroke="#666666" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>
            <span className={`text-[10px] ${cardNumber ? 'text-[#1A1A1A] font-medium' : 'text-gray-400'}`}>
              {cardNumber ? formatCardNumber(cardNumber) : 'Card number'}
            </span>
          </div>
          <button className="p-1">
            <img src={iconCamera} alt="Scan" className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <p className="px-[6px] pb-2 text-left text-[8px] text-[#999999] leading-tight">
        You can scan gift cards with barcodes or QR codes if your device has a camera.
      </p>

      {/* Number Pad */}
      <div className="flex-1 flex flex-col px-[6px] pb-2">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '00', 'C'].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white rounded-lg border border-gray-200 flex items-center justify-center text-[16px] font-semibold transition-colors active:bg-gray-100"
              style={{
                color: num === 'C' ? '#C8102E' : '#1a1a1a',
                minHeight: '38px'
              }}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Continue Button - only shown when valid */}
        {isValidCard && (
          <button
            onClick={handleContinue}
            className="mt-2 w-full py-2.5 rounded-full text-white text-[11px] font-semibold bg-[#1A1A1A]"
          >
            CONTINUE
          </button>
        )}
      </div>
    </div>
  );
};
