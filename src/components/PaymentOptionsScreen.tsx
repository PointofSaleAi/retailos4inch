import { useState } from 'react';
import { X, CreditCard, DollarSign, Gift, ArrowRightLeft } from 'lucide-react';

interface PaymentOptionsScreenProps {
  totalDue: number;
  onClose: () => void;
  onConfirmPayment: (paymentMethod: string, amount: number) => void;
}

type PaymentMethod = 'Card' | 'Cash' | 'Gift Card' | 'Other';

export const PaymentOptionsScreen = ({
  totalDue,
  onClose,
  onConfirmPayment
}: PaymentOptionsScreenProps) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('Card');
  const [amount, setAmount] = useState(totalDue.toFixed(2));

  const paymentMethods = [
    { id: 'Card', label: 'Card', icon: CreditCard },
    { id: 'Cash', label: 'Cash', icon: DollarSign },
    { id: 'Gift Card', label: 'Gift Card', icon: Gift },
    { id: 'Other', label: 'Other', icon: ArrowRightLeft }
  ];

  const handleNumberClick = (num: string) => {
    if (num === 'C') {
      setAmount('0.00');
      return;
    }
    
    if (num === '.') {
      if (!amount.includes('.')) {
        setAmount(amount + '.');
      }
      return;
    }

    // Remove leading zeros and format
    const currentAmount = amount.replace('.', '');
    const newAmount = currentAmount + num;
    const formattedAmount = (parseInt(newAmount) / 100).toFixed(2);
    setAmount(formattedAmount);
  };

  const handleCharge = () => {
    onConfirmPayment(selectedMethod, parseFloat(amount));
  };

  return (
    <div 
      className="w-[186px] h-full bg-white flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100">
        <div className="flex items-baseline gap-1.5">
          <span className="text-[14px] font-semibold text-gray-900">Total Due</span>
          <span className="text-[14px] font-bold text-red-500">${totalDue.toFixed(2)}</span>
        </div>
        <button onClick={onClose} className="p-0">
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Payment Methods */}
      <div className="px-3 py-4">
        <div className="grid grid-cols-4 gap-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            const isSelected = selectedMethod === method.id;
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors ${
                  isSelected 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isSelected ? 'bg-gray-800' : 'bg-white'
                }`}>
                  <Icon size={16} className={isSelected ? 'text-white' : 'text-gray-600'} />
                </div>
                <span className="text-[9px] font-medium">{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Amount Display */}
      <div className="px-3 pb-3">
        <div className="bg-gray-50 rounded-lg py-3 px-4 text-center">
          <input
            type="text"
            value={`$${amount}`}
            readOnly
            className="w-full text-center text-[24px] font-bold text-red-500 bg-transparent border-none outline-none"
          />
        </div>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-3 pb-3">
        <div className="grid grid-cols-3 gap-2">
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className={`h-12 rounded-lg font-semibold text-[18px] transition-colors ${
                num === 'C'
                  ? 'bg-gray-100 text-red-500 hover:bg-gray-200'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Charge Button */}
      <div className="px-3 pb-3">
        <button
          onClick={handleCharge}
          className="w-full h-12 bg-gray-900 text-white rounded-full font-bold text-[12px] tracking-wide"
        >
          CHARGE ${amount}
        </button>
      </div>
    </div>
  );
};
