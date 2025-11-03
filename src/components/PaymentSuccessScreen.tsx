import { X } from 'lucide-react';
import { useState } from 'react';
import iconSuccessCheck from '@/assets/icon-success-check.png';
import iconReceiptPrint from '@/assets/icon-receipt-print.png';
import iconReceiptText from '@/assets/icon-receipt-text.png';
import iconReceiptEmail from '@/assets/icon-receipt-email.png';

interface PaymentSuccessScreenProps {
  amount: number;
  onClose: () => void;
}

export const PaymentSuccessScreen = ({
  amount,
  onClose
}: PaymentSuccessScreenProps) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  const handlePrint = () => {
    // Print logic here
    console.log('Print receipt');
  };

  const handleText = () => {
    setShowTextInput(!showTextInput);
    setShowEmailInput(false);
  };

  const handleEmail = () => {
    setShowEmailInput(!showEmailInput);
    setShowTextInput(false);
  };

  const handleNoReceipt = () => {
    onClose();
  };

  return (
    <div className="w-[186px] min-h-[186px] bg-white flex flex-col mx-auto" style={{
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Close Button */}
      <div className="flex justify-end pt-[6px] pr-[6px]">
        <button onClick={onClose} className="p-0">
          <X size={16} className="text-gray-900" />
        </button>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[4px]">
        <img src={iconSuccessCheck} alt="Success" className="w-[48px] h-[48px]" />
      </div>

      {/* Success Message */}
      <div className="text-center mt-[6px] px-3">
        <p className="text-[11px] text-gray-600 leading-tight">
          <span className="font-bold text-gray-900">${amount.toFixed(2)}</span> has been successfully
        </p>
        <p className="text-[11px] text-gray-600">processed</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mt-[6px]" />

      {/* Receipt Heading */}
      <h2 className="text-center text-[12px] font-bold text-gray-900 mt-[6px] mb-[6px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="flex justify-center gap-2 px-[12px]">
        <button 
          onClick={handlePrint}
          className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <img src={iconReceiptPrint} alt="Print" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Print</span>
        </button>

        <button 
          onClick={handleText}
          className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <img src={iconReceiptText} alt="Text" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Text</span>
        </button>

        <button 
          onClick={handleEmail}
          className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
        >
          <img src={iconReceiptEmail} alt="Email" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

      {/* Conditional Input Fields */}
      {showTextInput && (
        <div className="px-[12px] mt-[6px]">
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="w-full h-[28px] px-[10px] border border-gray-200 rounded-lg text-[10px] focus:outline-none focus:border-gray-400"
          />
        </div>
      )}

      {showEmailInput && (
        <div className="px-[12px] mt-[6px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            className="w-full h-[28px] px-[10px] border border-gray-200 rounded-lg text-[10px] focus:outline-none focus:border-gray-400"
          />
        </div>
      )}

      {/* NO RECEIPT Button */}
      <div className="px-[12px] mt-[6px] mb-[6px]">
        <button 
          onClick={handleNoReceipt}
          className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors"
        >
          NO RECEIPT
        </button>
      </div>
    </div>
  );
};
