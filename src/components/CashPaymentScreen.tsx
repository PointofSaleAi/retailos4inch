import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import iconNumberPad from '@/assets/icon-number-pad.png';

interface CashPaymentScreenProps {
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number) => void;
}

interface SelectedAmount {
  amount: number;
  quantity: number;
}

export const CashPaymentScreen = ({
  totalDue,
  onBack,
  onCharge
}: CashPaymentScreenProps) => {
  const [showNumberPad, setShowNumberPad] = useState(false);
  const [selectedAmounts, setSelectedAmounts] = useState<SelectedAmount[]>([]);
  const [customAmount, setCustomAmount] = useState('0.00');

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

  const tenderedAmount = selectedAmounts.reduce(
    (sum, item) => sum + item.amount * item.quantity,
    0
  );

  const handlePresetClick = (amount: number) => {
    const existingIndex = selectedAmounts.findIndex(
      (item) => item.amount === amount
    );
    if (existingIndex >= 0) {
      // Increase quantity if already selected
      const updated = [...selectedAmounts];
      updated[existingIndex].quantity += 1;
      setSelectedAmounts(updated);
    } else {
      // Add new selection
      setSelectedAmounts([...selectedAmounts, { amount, quantity: 1 }]);
    }
  };

  const handleRemove = (amount: number) => {
    const existingIndex = selectedAmounts.findIndex(
      (item) => item.amount === amount
    );
    if (existingIndex >= 0) {
      const updated = [...selectedAmounts];
      if (updated[existingIndex].quantity > 1) {
        updated[existingIndex].quantity -= 1;
        setSelectedAmounts(updated);
      } else {
        updated.splice(existingIndex, 1);
        setSelectedAmounts(updated);
      }
    }
  };

  const getQuantity = (amount: number): number => {
    const item = selectedAmounts.find((i) => i.amount === amount);
    return item ? item.quantity : 0;
  };

  const isSelected = (amount: number): boolean => {
    return selectedAmounts.some((item) => item.amount === amount);
  };

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setCustomAmount('0.00');
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
  };

  const toggleView = () => {
    setShowNumberPad(!showNumberPad);
  };

  return (
    <div
      className="w-[186px] h-full bg-white flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[32px] relative">
        <button onClick={onBack} className="absolute left-0 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[14px] h-[14px]" />
        </button>
        <span className="text-[10px] font-semibold text-gray-900">
          Pay by Cash
        </span>
      </div>

      {/* Amount Display with Number Pad Toggle */}
      <div className="flex gap-1 mb-0.5">
        <div className="flex-1 rounded-lg border border-gray-200 py-2 flex items-center justify-center bg-[#F8F8F8]">
          <span className="text-[18px] font-bold text-[#C8102E]">
            $ {tenderedAmount.toFixed(2)}
          </span>
        </div>
        <button
          onClick={toggleView}
          className={`w-[40px] h-[40px] rounded-lg border flex items-center justify-center transition-colors ${
            showNumberPad
              ? 'bg-[#4A4A4A] border-[#4A4A4A]'
              : 'bg-white border-gray-200'
          }`}
        >
          <img
            src={iconNumberPad}
            alt="Number Pad"
            className="w-[18px] h-[18px]"
            style={{ filter: showNumberPad ? 'invert(1)' : 'none' }}
          />
        </button>
      </div>

      {/* Tendered Amount Label */}
      <div className="flex justify-between items-center py-0.5 mb-0.5">
        <span className="text-[8px] text-gray-500">Tendered Amount</span>
        <span className="text-[9px] font-semibold text-gray-900">
          $ {tenderedAmount.toFixed(2)}
        </span>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {!showNumberPad ? (
          /* Preset Tender Amounts */
          <div className="grid grid-cols-3 gap-[3px]">
            {presetAmounts.map((amount, index) => {
              const qty = getQuantity(amount);
              const selected = isSelected(amount);
              return (
                <div
                  key={index}
                  className={`relative rounded-md border flex items-center justify-center text-[9px] font-semibold transition-colors h-[32px] ${
                    selected
                      ? 'bg-white text-gray-900 border-[#1A1A1A] border-2'
                      : 'bg-white text-gray-600 border-gray-200'
                  }`}
                >
                  {/* Remove button */}
                  {selected && (
                    <button
                      onClick={() => handleRemove(amount)}
                      className="absolute top-0 left-0 w-[14px] h-[14px] bg-[#1A1A1A] rounded-tl-sm rounded-br-sm flex items-center justify-center"
                    >
                      <span className="text-white text-[8px] font-bold leading-none">
                        –
                      </span>
                    </button>
                  )}

                  {/* Quantity badge */}
                  {selected && (
                    <div className="absolute top-0 right-0 w-[14px] h-[14px] bg-[#1A1A1A] rounded-tr-sm rounded-bl-sm flex items-center justify-center">
                      <span className="text-white text-[7px] font-bold leading-none">
                        x{qty}
                      </span>
                    </div>
                  )}

                  {/* Amount button */}
                  <button
                    onClick={() => handlePresetClick(amount)}
                    className="w-full h-full flex items-center justify-center"
                  >
                    $ {amount.toFixed(2)}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          /* Number Pad */
          <div className="grid grid-cols-3 gap-[3px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'].map(
              (num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num)}
                  className="bg-[#F5F5F5] rounded-md border border-gray-200 flex items-center justify-center text-[14px] font-semibold transition-colors active:bg-gray-200 h-[32px]"
                  style={{
                    color: num === 'C' ? '#C8102E' : '#1a1a1a'
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
          className="mt-auto mb-1 w-full py-2 rounded-full text-white text-[10px] font-semibold transition-colors"
          style={{ backgroundColor: '#4A4A4A' }}
        >
          CHARGE $ {tenderedAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};
