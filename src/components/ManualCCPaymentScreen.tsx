import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface ManualCCPaymentScreenProps {
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number) => void;
}

export const ManualCCPaymentScreen = ({
  totalDue,
  onBack,
  onCharge
}: ManualCCPaymentScreenProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSimulateTap = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onCharge(totalDue);
    }, 2000);
  };

  return (
    <div 
      className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="h-[40px] relative flex items-center justify-center">
        <button 
          onClick={onBack} 
          className="absolute left-2 p-1"
          disabled={isProcessing}
        >
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <h1 className="text-[12px] font-semibold text-gray-900">Pay by Manual CC</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Contactless Icon */}
        <div className="w-[64px] h-[64px] rounded-full border-[2px] border-gray-900 flex items-center justify-center mb-6">
          <svg 
            width="32" 
            height="32" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-gray-900"
          >
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </div>

        {/* Instruction Text */}
        <p className="text-[11px] text-gray-700 text-center mb-4">
          Please tap credit card on reader
        </p>

        {/* Total Amount */}
        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-[12px] font-semibold text-gray-900">Total Amount</span>
          <span className="text-[14px] font-bold text-gray-900">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleSimulateTap}
          disabled={isProcessing}
          className="w-full h-[40px] bg-[#1A1A1A] text-white rounded-full font-bold text-[11px] tracking-wide disabled:opacity-70"
        >
          {isProcessing ? 'PROCESSING' : 'SIMULATE CARD TAP'}
        </button>
      </div>
    </div>
  );
};
