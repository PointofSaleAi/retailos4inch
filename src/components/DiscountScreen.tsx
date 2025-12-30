import React, { useState } from 'react';
import iconClose from '@/assets/icon-close.png';

export interface Discount {
  id: string;
  name: string;
  amount: number; // Changed to number for calculations
  displayAmount: string;
}

interface DiscountScreenProps {
  onClose: () => void;
  onApply: (discount: Discount | null) => void;
  subtotal: number;
}

const getAvailableDiscounts = (subtotal: number): Discount[] => [
  { id: '1', name: '$10 Bonus card', amount: 10, displayAmount: '-$10.00' },
  { id: '2', name: 'Buy 1 get 1 at 50% off.', amount: 12, displayAmount: '-$12.00' },
  { id: '3', name: '15% Off for members only', amount: subtotal * 0.15, displayAmount: `-$${(subtotal * 0.15).toFixed(2)}` },
  { id: '4', name: 'Flat 10% off your first purchase', amount: subtotal * 0.10, displayAmount: `-$${(subtotal * 0.10).toFixed(2)}` },
];

export const DiscountScreen = ({ onClose, onApply, subtotal }: DiscountScreenProps) => {
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const availableDiscounts = getAvailableDiscounts(subtotal);

  const handleApply = () => {
    const discount = availableDiscounts.find(d => d.id === selectedDiscount) || null;
    onApply(discount);
  };

  return (
    <div 
      className="flex h-full w-full flex-col bg-[#F8F8F8]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="w-6" />
        <h1 className="text-[14px] font-semibold text-[#1A1A1A]">Discount</h1>
        <button onClick={onClose} className="flex h-6 w-6 items-center justify-center">
          <img src={iconClose} alt="Close" className="h-3 w-3" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-4 pb-3 text-center text-[11px] text-[#666666]">
        Select a discount to apply to{'\n'}the current order
      </p>

      {/* Divider */}
      <div className="mx-4 h-[1px] bg-[#E5E5E5]" />

      {/* Discount Options */}
      <div className="flex-1 px-4 pt-3">
        <div className="flex flex-col gap-2">
          {availableDiscounts.map((discount) => (
            <button
              key={discount.id}
              onClick={() => setSelectedDiscount(discount.id)}
              className="flex items-center justify-between rounded-lg bg-white px-3 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selectedDiscount === discount.id ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'
                }`}>
                  {selectedDiscount === discount.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
                  )}
                </div>
                <span className="text-[12px] text-[#1A1A1A]">{discount.name}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#1A1A1A]">{discount.displayAmount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleApply}
          disabled={!selectedDiscount}
          className={`w-full rounded-full py-3 text-[12px] font-semibold uppercase tracking-wide ${
            selectedDiscount
              ? 'bg-[#1A1A1A] text-white'
              : 'bg-[#CCCCCC] text-white'
          }`}
        >
          Apply
        </button>
      </div>
    </div>
  );
};
