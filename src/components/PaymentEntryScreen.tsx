import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface PaymentEntryScreenProps {
  paymentMethod: string;
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number) => void;
}

export const PaymentEntryScreen = ({
  paymentMethod,
  totalDue,
  onBack,
  onCharge
}: PaymentEntryScreenProps) => {
  const [amount, setAmount] = useState(totalDue.toFixed(2));

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setAmount('0.00');
      return;
    }

    // Remove the decimal and leading zeros for manipulation
    let cleanAmount = amount.replace('.', '').replace(/^0+/, '');
    
    if (num === '.') {
      // Decimal is handled by fixed position
      return;
    }

    // Add the new digit
    cleanAmount = cleanAmount + num;
    
    // Pad with zeros if needed
    while (cleanAmount.length < 3) {
      cleanAmount = '0' + cleanAmount;
    }

    // Insert decimal point
    const dollars = cleanAmount.slice(0, -2);
    const cents = cleanAmount.slice(-2);
    setAmount(`${dollars || '0'}.${cents}`);
  };

  const getMethodTitle = (method: string) => {
    const titles: { [key: string]: string } = {
      'Card': 'Pay by Card',
      'Cash': 'Pay by Cash',
      'Gift Card': 'Pay by Gift Card',
      'Split Check': 'Split Check',
      'Pay by Link': 'Pay by Link',
      'QR Code': 'QR Code Payment',
      'Account': 'Pay by Account',
      'Loyalty': 'Pay by Loyalty',
      'Manual CC': 'Manual Card Entry',
      'Manual Card': 'Manual Card',
      'External CC': 'External CC'
    };
    return titles[method] || `Pay by ${method}`;
  };

  return (
    <div 
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-2">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">
          {getMethodTitle(paymentMethod)}
        </span>
      </div>

      {/* Amount Display */}
      <div className="mx-2 mb-2">
        <div className="bg-white rounded-lg border border-gray-200 py-3 px-4 flex items-center justify-center">
          <span className="text-[22px] font-bold text-[#C8102E]">
            $ {amount}
          </span>
        </div>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-2 pb-2 flex flex-col">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white rounded-lg border border-gray-200 flex items-center justify-center text-[18px] font-semibold transition-colors active:bg-gray-100"
              style={{ 
                color: num === 'C' ? '#C8102E' : '#1a1a1a',
                minHeight: '42px'
              }}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Charge Button */}
        <button
          onClick={() => onCharge(parseFloat(amount))}
          className="mt-2 w-full py-3 rounded-full text-white text-[12px] font-semibold transition-colors"
          style={{ backgroundColor: '#4A4A4A' }}
        >
          CHARGE $ {amount}
        </button>
      </div>
    </div>
  );
};
