import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface CashPaymentScreenProps {
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number) => void;
}

export const CashPaymentScreen = ({
  totalDue,
  onBack,
  onCharge
}: CashPaymentScreenProps) => {
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [tenderedAmount, setTenderedAmount] = useState(totalDue);
  const [customAmount, setCustomAmount] = useState(totalDue.toFixed(2));

  const presetAmounts = [
    totalDue,
    50.00,
    20.00,
    10.00,
    5.00,
    2.00,
    1.00,
    0.50,
    0.25,
    0.10,
    0.05,
    0.01
  ];

  const handlePresetClick = (amount: number) => {
    setTenderedAmount(amount);
    setCustomAmount(amount.toFixed(2));
  };

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setCustomAmount('0.00');
      setTenderedAmount(0);
      return;
    }

    let cleanAmount = customAmount.replace('.', '').replace(/^0+/, '');
    if (num === '.') {
      return;
    }

    cleanAmount = cleanAmount + num;

    while (cleanAmount.length < 3) {
      cleanAmount = '0' + cleanAmount;
    }

    const dollars = cleanAmount.slice(0, -2);
    const cents = cleanAmount.slice(-2);
    const newAmount = `${dollars || '0'}.${cents}`;
    setCustomAmount(newAmount);
    setTenderedAmount(parseFloat(newAmount));
  };

  const toggleView = () => {
    setShowNumberPad(!showNumberPad);
  };

  return (
    <div
      className="w-[186px] h-full bg-white flex flex-col mx-auto px-[6px]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative">
        <button onClick={onBack} className="absolute left-0 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">
          Pay by Cash
        </span>
      </div>

      {/* Amount Display with Number Pad Toggle */}
      <div className="flex gap-1 mb-1">
        <div className="flex-1 rounded-lg border border-gray-200 py-3 flex items-center justify-center bg-[#F8F8F8]">
          <span className="text-[22px] font-bold text-[#C8102E]">
            $ {tenderedAmount.toFixed(2)}
          </span>
        </div>
        <button
          onClick={toggleView}
          className={`w-[44px] h-[52px] rounded-lg border flex items-center justify-center transition-colors ${
            showNumberPad
              ? 'bg-[#4A4A4A] border-[#4A4A4A]'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="grid grid-cols-3 gap-[2px]">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className={`w-[4px] h-[4px] rounded-full ${
                  showNumberPad ? 'bg-white' : 'bg-gray-800'
                }`}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Tendered Amount Label */}
      <div className="flex justify-between items-center py-1 mb-1">
        <span className="text-[9px] text-gray-500">Tendered Amount</span>
        <span className="text-[10px] font-semibold text-gray-900">
          $ {tenderedAmount.toFixed(2)}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {!showNumberPad ? (
          /* Preset Tender Amounts */
          <div className="grid grid-cols-3 gap-1 flex-1">
            {presetAmounts.map((amount, index) => (
              <button
                key={index}
                onClick={() => handlePresetClick(amount)}
                className={`rounded-lg border flex items-center justify-center text-[11px] font-semibold transition-colors ${
                  tenderedAmount === amount
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
                style={{ minHeight: '38px' }}
              >
                $ {amount === totalDue ? amount.toFixed(2) : amount.toFixed(2)}
              </button>
            ))}
          </div>
        ) : (
          /* Number Pad */
          <div className="grid grid-cols-3 gap-1 flex-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'].map(
              (num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="bg-[#F5F5F5] rounded-lg border border-gray-200 flex items-center justify-center text-[18px] font-semibold transition-colors active:bg-gray-200"
                  style={{
                    color: num === 'C' ? '#C8102E' : '#1a1a1a',
                    minHeight: '38px'
                  }}
                >
                  {num}
                </button>
              )
            )}
          </div>
        )}

        {/* Charge Button */}
        <button
          onClick={() => onCharge(tenderedAmount)}
          className="mt-2 mb-1 w-full py-2.5 rounded-full text-white text-[11px] font-semibold transition-colors"
          style={{ backgroundColor: '#4A4A4A' }}
        >
          CHARGE $ {tenderedAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};
