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
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="w-6" />
        <h1 className="text-[14px] font-semibold text-[#1A1A1A]">Taxes</h1>
        <button onClick={onClose} className="flex h-6 w-6 items-center justify-center">
          <img src={iconClose} alt="Close" className="h-3 w-3" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-4 pb-3 text-center text-[11px] text-[#666666]">
        Select a tax to apply to the{'\n'}current order
      </p>

      {/* Divider */}
      <div className="mx-4 h-[1px] bg-[#E5E5E5]" />

      {/* Tax Options */}
      <div className="flex-1 px-4 pt-3">
        <div className="flex flex-col gap-2">
          {availableTaxes.map((tax) => (
            <button
              key={tax.id}
              onClick={() => setSelectedTax(tax.id)}
              className="flex items-center justify-between rounded-lg bg-white px-3 py-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                  selectedTax === tax.id ? 'border-[#1A1A1A]' : 'border-[#CCCCCC]'
                }`}>
                  {selectedTax === tax.id && (
                    <div className="h-2.5 w-2.5 rounded-full bg-[#1A1A1A]" />
                  )}
                </div>
                <span className="text-[12px] text-[#1A1A1A]">{tax.name}</span>
              </div>
              <span className="text-[12px] font-semibold text-[#1A1A1A]">{tax.displayRate}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleApply}
          disabled={!selectedTax}
          className={`w-full rounded-full py-3 text-[12px] font-semibold uppercase tracking-wide ${
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
