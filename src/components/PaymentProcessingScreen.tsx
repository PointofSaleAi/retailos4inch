import { X } from 'lucide-react';
import { useEffect } from 'react';
import iconPaymentProcessing from '@/assets/icon-payment-processing.png';

interface PaymentProcessingScreenProps {
  paymentMethod: string;
  amount: number;
  onClose: () => void;
  onComplete: () => void;
}

export const PaymentProcessingScreen = ({
  paymentMethod,
  amount,
  onClose,
  onComplete
}: PaymentProcessingScreenProps) => {
  useEffect(() => {
    // Simulate processing time
    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getMethodTitle = (method: string) => {
    const titles: { [key: string]: string } = {
      'Card': 'Pay by card',
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
      className="w-[186px] h-full bg-white flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-2">
        <span className="text-[11px] font-semibold text-gray-900">
          {getMethodTitle(paymentMethod)}
        </span>
        <button onClick={onClose} className="absolute right-2 p-1">
          <X size={16} className="text-gray-500" />
        </button>
      </div>

      {/* Total Amount */}
      <div className="text-center mt-2">
        <p className="text-[10px] text-gray-500">Total Amount</p>
        <div className="flex items-baseline justify-center">
          <span className="text-[10px] text-gray-900 align-top">$</span>
          <span className="text-[28px] font-bold text-gray-900">{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Processing Animation */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <img 
          src={iconPaymentProcessing} 
          alt="Processing" 
          className="w-[100px] h-[100px] animate-pulse" 
        />
        <p className="text-[14px] text-gray-900 mt-4">Payment is processing...</p>
      </div>
    </div>
  );
};
