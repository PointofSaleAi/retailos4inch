import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow.png';

interface CardActivity {
  date: string;
  amount: number;
}

interface GiftCardBalanceScreenProps {
  cardNumber: string;
  balance: number;
  activity: CardActivity[];
  onBack: () => void;
  onAddValue: () => void;
}

export const GiftCardBalanceScreen = ({ 
  cardNumber, 
  balance, 
  activity, 
  onBack, 
  onAddValue 
}: GiftCardBalanceScreenProps) => {
  // Get last 4 digits of card number
  const lastFourDigits = cardNumber.slice(-4);

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
          Gift Card {lastFourDigits}
        </span>
      </div>

      {/* Balance Display */}
      <div className="mx-[6px] mb-2 bg-[#F5F5F5] rounded-lg py-4 flex items-center justify-center">
        <span className="text-[24px] font-semibold text-[#1A1A1A]">
          ${balance.toFixed(2)}
        </span>
      </div>

      {/* Add Value Button */}
      <div className="px-[6px] mb-3">
        <button
          onClick={onAddValue}
          className="w-full py-2 bg-[#1A1A1A] text-white text-[10px] font-semibold rounded-lg uppercase tracking-wide"
        >
          Add Value
        </button>
      </div>

      {/* Card Activity */}
      <div className="px-[6px] flex-1 overflow-auto">
        <p className="text-[9px] text-[#999999] font-medium mb-2">Card Activity</p>
        
        <div className="flex flex-col gap-2">
          {activity.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-1 border-b border-gray-100 last:border-0">
              <span className="text-[9px] text-[#1A1A1A]">{item.date}</span>
              <span className="text-[9px] font-medium text-[#1A1A1A]">${item.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
