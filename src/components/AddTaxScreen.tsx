import React, { useState } from 'react';
import iconClose from '@/assets/icon-close.png';

export interface Tax {
  id: string;
  name: string;
  rate: number; // Changed to number for calculations
  displayRate: string;
}

interface AddTaxScreenProps {
  onClose: () => void;
  onApply: (tax: Tax | null) => void;
}

const availableTaxes: Tax[] = [
  { id: '1', name: 'Sales Tax(All Products)', rate: 0.01, displayRate: '1%' },
  { id: '2', name: 'Value Added Tax', rate: 0.01, displayRate: '1%' },
  { id: '3', name: 'Import/Export Duties', rate: 0.01, displayRate: '1%' },
];

export const AddTaxScreen = ({ onClose, onApply }: AddTaxScreenProps) => {
  const [selectedTax, setSelectedTax] = useState<string | null>(null);

  const handleApply = () => {
    const tax = availableTaxes.find(t => t.id === selectedTax) || null;
    onApply(tax);
  };

  return (
    <div 
      className="flex h-full w-full flex-col bg-[#F8F8F8]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between pt-3 pb-1 px-[6px]">
        <div className="w-5" />
        <h1 className="text-[13px] font-semibold text-[#1A1A1A]">Taxes</h1>
        <button onClick={onClose} className="flex h-5 w-5 items-center justify-center">
          <img src={iconClose} alt="Close" className="h-2.5 w-2.5" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-[6px] pb-2 text-center text-[10px] text-[#666666]">
        Select a tax to apply to the current order
      </p>

      {/* Divider */}
      <div className="h-[1px] bg-[#E5E5E5]" />

      {/* Tax Options */}
      <div className="flex-1 pt-2 overflow-auto">
        <div className="flex flex-col gap-1.5">
          {availableTaxes.map((tax) => (
            <button
              key={tax.id}
              onClick={() => setSelectedTax(tax.id)}
              className="flex items-center justify-between bg-white px-2 py-2 shadow-sm mx-0"
            >
              <div className="flex items-center gap-2">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                  selectedTax === tax.id ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'
                }`}>
                  {selectedTax === tax.id && (
                    <div className="h-2 w-2 rounded-full bg-[#1A1A1A]" />
                  )}
                </div>
                <span className="text-[11px] text-[#1A1A1A] text-left">{tax.name}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#1A1A1A]">{tax.displayRate}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="pb-3 pt-2">
        <button
          onClick={handleApply}
          disabled={!selectedTax}
          className={`w-full rounded-full py-2.5 text-[11px] font-semibold uppercase tracking-wide ${
            selectedTax
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
