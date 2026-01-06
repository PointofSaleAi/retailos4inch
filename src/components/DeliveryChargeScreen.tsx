import React, { useState } from 'react';
import iconClose from '@/assets/icon-close.png';

interface DeliveryChargeScreenProps {
  onClose: () => void;
  onApply: (amount: number) => void;
}

export const DeliveryChargeScreen = ({ onClose, onApply }: DeliveryChargeScreenProps) => {
  const [amount, setAmount] = useState('0.00');

  const handleKeyPress = (key: string) => {
    if (key === 'C') {
      setAmount('0.00');
      return;
    }

    // This keypad always formats to 2 decimals, so '.' is a no-op
    if (key === '.') {
      return;
    }

    // Handle number input (always keep 2 decimal places)
    const currentDigits = amount.replace('.', ''); // e.g. "1234" for "12.34"
    const nextDigits = currentDigits === '000' ? key : currentDigits + key;

    const cents = nextDigits.padStart(3, '0');
    const dollars = cents.slice(0, -2) || '0';
    const centsStr = cents.slice(-2);

    setAmount(`${parseInt(dollars, 10)}.${centsStr}`);
  };

  const handleApply = () => {
    onApply(parseFloat(amount));
  };

  const numpadKeys = [
    ['9', '8', '7'],
    ['6', '5', '4'],
    ['3', '2', '1'],
    ['.', '0', 'C'],
  ];

  return (
    <div 
      className="flex h-full w-full flex-col bg-[#F8F8F8]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 pt-2 pb-0.5">
        <div className="w-6" />
        <h1 className="text-[13px] font-semibold text-[#1A1A1A]">Delivery Charge</h1>
        <button onClick={onClose} className="flex h-6 w-6 items-center justify-center">
          <img src={iconClose} alt="Close" className="h-3 w-3" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-3 pb-1.5 text-center text-[9px] text-[#666666]">
        Enter the delivery charge for this order.
      </p>

      {/* Amount Display */}
      <div className="mx-3 mb-1.5 rounded-lg bg-white py-2 shadow-sm">
        <p className="text-center text-[15px] font-semibold text-[#1A1A1A]">
          ${amount}
        </p>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-3">
        <div className="flex flex-col gap-1">
          {numpadKeys.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-1">
              {row.map((key) => (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`flex h-[34px] flex-1 items-center justify-center rounded-lg bg-white shadow-sm ${
                    key === 'C' ? 'text-[#CC0000]' : 'text-[#1A1A1A]'
                  }`}
                >
                  <span className="text-[13px] font-medium">{key}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="px-3 pb-2 pt-1.5">
        <button
          onClick={handleApply}
          disabled={parseFloat(amount) === 0}
          className={`w-full rounded-full py-2 text-[11px] font-semibold uppercase tracking-wide ${
            parseFloat(amount) > 0
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
