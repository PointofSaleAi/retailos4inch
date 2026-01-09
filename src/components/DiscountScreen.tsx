import React, { useState } from 'react';
import iconClose from '@/assets/icon-close.png';

export interface Discount {
  id: string;
  name: string;
  amount: number;
  displayAmount: string;
  type: 'fixed' | 'percentage';
  rate?: number; // Percentage rate (0.15 for 15%, etc.)
}

interface DiscountScreenProps {
  onClose: () => void;
  onApply: (discount: Discount | null) => void;
  subtotal: number;
  appliedDiscount?: Discount | null;
}

const getAvailableDiscounts = (subtotal: number): Discount[] => [
  { id: '1', name: '$10 Bonus card', amount: 10, displayAmount: '-$10.00', type: 'fixed' },
  { id: '2', name: 'Buy 1 get 1 at 50% off.', amount: 12, displayAmount: '-$12.00', type: 'fixed' },
  { id: '3', name: '15% Off for members only', amount: subtotal * 0.15, displayAmount: `-$${(subtotal * 0.15).toFixed(2)}`, type: 'percentage', rate: 0.15 },
  { id: '4', name: 'Flat 10% off your first purchase', amount: subtotal * 0.10, displayAmount: `-$${(subtotal * 0.10).toFixed(2)}`, type: 'percentage', rate: 0.10 },
];

export const DiscountScreen = ({ onClose, onApply, subtotal, appliedDiscount }: DiscountScreenProps) => {
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(appliedDiscount?.id || null);
  const availableDiscounts = getAvailableDiscounts(subtotal);

  const handleApply = () => {
    const discount = availableDiscounts.find(d => d.id === selectedDiscount) || null;
    onApply(discount);
  };


  const handleToggle = (discountId: string) => {
    setSelectedDiscount(prev => prev === discountId ? null : discountId);
  };

  return (
    <div 
      className="flex h-full w-full flex-col bg-[#F8F8F8]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-3 pb-1">
        <div className="w-6" />
        <h1 className="text-[14px] font-semibold text-[#1A1A1A]">Discount</h1>
        <button onClick={onClose} className="flex h-6 w-6 items-center justify-center">
          <img src={iconClose} alt="Close" className="h-3 w-3" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-3 pb-2 text-center text-[11px] text-[#666666]">
        Select a discount to apply to{'\n'}the current order
      </p>

      {/* Divider */}
      <div className="h-[1px] bg-[#E5E5E5]" />

      {/* Discount Options */}
      <div className="flex-1 overflow-auto pt-2">
        <div className="flex flex-col gap-1.5">
          {availableDiscounts.map((discount) => (
            <button
              key={discount.id}
              onClick={() => handleToggle(discount.id)}
              className="flex items-center justify-between bg-white px-3 py-2.5 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-5 w-5 items-center justify-center rounded-[50%] border-2 ${
                  selectedDiscount === discount.id ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'
                }`}>
                  {selectedDiscount === discount.id && (
                    <div className="h-2.5 w-2.5 rounded-[50%] bg-[#1A1A1A]" />
                  )}
                </div>
                <span className="text-[12px] text-[#1A1A1A] text-left">{discount.name}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#1A1A1A]">{discount.displayAmount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <div className="px-3 pb-3 pt-2">
        <button
          onClick={handleApply}
          className="w-full rounded-full py-2.5 text-[12px] font-semibold uppercase tracking-wide bg-[#1A1A1A] text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
};
