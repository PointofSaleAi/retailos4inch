import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface CustomAmountScreenProps {
  onBack: () => void;
  onDone: (amount: number) => void;
}

export const CustomAmountScreen = ({
  onBack,
  onDone
}: CustomAmountScreenProps) => {
  const [amount, setAmount] = useState('0.00');

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setAmount('0.00');
      return;
    }
    if (num === '00') {
      let cleanAmount = amount.replace('.', '').replace(/^0+/, '');
      cleanAmount = cleanAmount + '00';
      
      while (cleanAmount.length < 3) {
        cleanAmount = '0' + cleanAmount;
      }
      
      const dollars = cleanAmount.slice(0, -2);
      const cents = cleanAmount.slice(-2);
      const newAmount = parseFloat(`${dollars || '0'}.${cents}`);
      
      if (newAmount <= 2000) {
        setAmount(`${dollars || '0'}.${cents}`);
      }
      return;
    }

    let cleanAmount = amount.replace('.', '').replace(/^0+/, '');
    cleanAmount = cleanAmount + num;

    while (cleanAmount.length < 3) {
      cleanAmount = '0' + cleanAmount;
    }

    const dollars = cleanAmount.slice(0, -2);
    const cents = cleanAmount.slice(-2);
    const newAmount = parseFloat(`${dollars || '0'}.${cents}`);
    
    if (newAmount <= 2000) {
      setAmount(`${dollars || '0'}.${cents}`);
    }
  };

  const handleDone = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount >= 1 && numericAmount <= 2000) {
      onDone(numericAmount);
    }
  };

  const numericAmount = parseFloat(amount);
  const isValid = numericAmount >= 1 && numericAmount <= 2000;

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
          Custom Amount
        </span>
      </div>

      {/* Amount Display */}
      <div className="px-[6px] mb-1">
        <div className="flex items-center justify-center p-3 border border-gray-200 rounded-lg bg-white">
          <span className="text-[20px] font-semibold text-[#1A1A1A]">
            ${amount}
            <span className="animate-pulse">|</span>
          </span>
        </div>
      </div>

      {/* Helper Text */}
      <p className="px-[6px] pb-2 text-left text-[9px] text-[#666666]">
        Enter amount between $1 and $2,000
      </p>

      {/* Done Button */}
      <div className="px-[6px] mb-2">
        <button
          onClick={handleDone}
          disabled={!isValid}
          className="w-full py-2.5 rounded-full text-white text-[11px] font-semibold transition-colors"
          style={{ 
            backgroundColor: isValid ? '#1A1A1A' : '#ccc',
            cursor: isValid ? 'pointer' : 'not-allowed'
          }}
        >
          DONE
        </button>
      </div>

      {/* Number Pad */}
      <div className="flex-1 flex flex-col px-[6px] pb-2">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '00', 'C'].map(num => (
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
      </div>
    </div>
  );
};
