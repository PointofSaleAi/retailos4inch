import { useState } from 'react';
import { X, Link, QrCode, ArrowUpDown, User, Gift, CreditCard, Upload } from 'lucide-react';
import iconCard from '@/assets/icon-payment-card.png';
import iconCash from '@/assets/icon-payment-cash.png';
import iconGift from '@/assets/icon-payment-gift.png';
import iconOther from '@/assets/icon-payment-other.png';
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
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const paymentMethods = [{
    id: 'Card',
    label: 'Card',
    icon: iconCard
  }, {
    id: 'Cash',
    label: 'Cash',
    icon: iconCash
  }, {
    id: 'Gift Card',
    label: 'Gift Card',
    icon: iconGift
  }, {
    id: 'Other',
    label: 'Other',
    icon: iconOther
  }];
  const otherPaymentMethods = [{
    id: 'Pay By Link',
    label: 'Pay By Link',
    icon: Link
  }, {
    id: 'QR Code',
    label: 'QR Code',
    icon: QrCode
  }, {
    id: 'Split Payment',
    label: 'Split Payment',
    icon: ArrowUpDown
  }, {
    id: 'Account',
    label: 'Account',
    icon: User
  }, {
    id: 'Loyalty',
    label: 'Loyalty',
    icon: Gift
  }, {
    id: 'Manual CC',
    label: 'Manual CC',
    icon: CreditCard
  }, {
    id: 'Manual Card',
    label: 'Manual Card',
    icon: CreditCard
  }, {
    id: 'External CC',
    label: 'External CC',
    icon: Upload
  }];
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
  const handleMethodSelect = (methodId: PaymentMethod) => {
    setSelectedMethod(methodId);
    if (methodId === 'Other') {
      setShowOtherOptions(true);
    } else {
      setShowOtherOptions(false);
    }
  };
  return <div className="w-[186px] h-full bg-white flex flex-col mx-auto" style={{
    fontFamily: 'Montserrat, sans-serif'
  }}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-[6px]">
        <div className="flex-1 flex justify-center items-baseline gap-1.5">
          <span className="text-[12px] font-semibold text-gray-900">Total Due</span>
          <span className="text-[14px] font-bold text-red-500">${totalDue.toFixed(2)}</span>
        </div>
        <button onClick={onClose} className="p-0">
          <X size={18} className="text-gray-700" />
        </button>
      </div>

      {/* Payment Methods */}
      <div className="py-0 px-0">
        <div className="grid grid-cols-4 gap-2">
          {paymentMethods.map(method => {
          const isSelected = selectedMethod === method.id;
          return <button key={method.id} onClick={() => handleMethodSelect(method.id as PaymentMethod)} className="flex flex-col items-center transition-colors mx-0 px-[8px] py-[8px]">
                <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center border transition-colors ${isSelected ? 'bg-[#1A1A1A] border-[#1A1A1A]' : 'bg-white border-[#E8E8E8]'}`}>
                  <img src={method.icon} alt={method.label} className="w-[20px] h-auto" style={{
                filter: isSelected ? 'brightness(0) invert(1)' : 'none'
              }} />
                </div>
                <span className={`text-[8px] font-medium mt-[2px] whitespace-nowrap ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
                  {method.label}
                </span>
              </button>;
        })}
        </div>
      </div>

      {/* Other Payment Options */}
      {showOtherOptions && <div className="py-2 px-3">
          <div className="grid grid-cols-3 gap-2">
            {otherPaymentMethods.map(method => {
          const Icon = method.icon;
          return <button key={method.id} onClick={() => setSelectedMethod(method.id as PaymentMethod)} className="flex flex-col items-center transition-colors px-2 py-2">
                  <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-[#E8E8E8] bg-white">
                    <Icon size={20} className="text-gray-700" />
                  </div>
                  <span className="text-[8px] font-medium mt-[2px] whitespace-nowrap text-gray-600">
                    {method.label}
                  </span>
                </button>;
        })}
          </div>
        </div>}

      {/* Amount Display */}
      <div className="pb-3 px-0">
        <div className="bg-gray-50 rounded-lg h-[30px] w-[186px] mx-auto flex items-center justify-center border border-gray-200">
          <input type="text" value={`$${amount}`} readOnly className="w-full text-center text-[14px] font-semibold text-red-500 bg-transparent border-none outline-none" />
        </div>
      </div>

      {/* Number Pad */}
      <div className="flex-1 pb-2 px-0">
        <div className="grid grid-cols-3 gap-2">
          {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'].map(num => <button key={num} onClick={() => handleNumberClick(num)} className={`h-[32px] rounded-lg font-semibold text-[16px] transition-colors border border-[#E8E8E8] ${num === 'C' ? 'bg-gray-100 text-red-500 hover:bg-gray-200' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
              {num}
            </button>)}
        </div>
      </div>

      {/* Charge Button */}
      <div className="pb-3 mt-auto px-0">
        <button onClick={handleCharge} className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[12px] tracking-wide">
          CHARGE ${amount}
        </button>
      </div>
    </div>;
};