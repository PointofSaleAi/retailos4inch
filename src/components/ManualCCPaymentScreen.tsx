import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import iconContactless from '@/assets/icon-contactless.png';

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
      <div className="h-[36px] relative flex items-center justify-center">
        <button 
          onClick={onBack} 
          className="absolute left-2 p-1"
          disabled={isProcessing}
        >
          <img src={iconBackArrow} alt="Back" className="w-[14px] h-[14px]" />
        </button>
        <h1 className="text-[11px] font-semibold text-gray-900">Pay by Manual CC</h1>
      </div>

      {/* Content - positioned to match reference */}
      <div className="flex-1 flex flex-col items-center pt-[50px]">
        {/* Contactless Icon */}
        <img 
          src={iconContactless} 
          alt="Contactless" 
          className="w-[60px] h-[60px] object-contain mb-[24px]"
        />

        {/* Instruction Text */}
        <p className="text-[10px] text-gray-800 text-center mb-[8px]">
          Please tap credit card on reader
        </p>

        {/* Total Amount */}
        <div className="flex items-baseline gap-[6px]">
          <span className="text-[11px] font-bold text-gray-900">Total Amount</span>
          <span className="text-[13px] font-bold text-gray-900">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="px-3 pb-[50px]">
        <button
          onClick={handleSimulateTap}
          disabled={isProcessing}
          className="w-full h-[36px] bg-[#1A1A1A] text-white rounded-full font-bold text-[10px] tracking-wide disabled:opacity-70"
        >
          {isProcessing ? 'PROCESSING' : 'SIMULATE CARD TAP'}
        </button>
      </div>
    </div>
  );
};
