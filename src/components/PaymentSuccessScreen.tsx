import { X } from 'lucide-react';
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
  return (
    <div className="w-[186px] h-[186px] bg-white flex flex-col mx-auto overflow-hidden" style={{
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Close Button */}
      <div className="flex justify-end pt-[6px] pr-[6px]">
        <button onClick={onClose} className="p-0">
          <X size={16} className="text-gray-900" />
        </button>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[8px]">
        <img src={iconSuccessCheck} alt="Success" className="w-[48px] h-[48px]" />
      </div>

      {/* Success Message */}
      <div className="text-center mt-[8px] px-3">
        <p className="text-[11px] text-gray-600 leading-tight">
          <span className="font-bold text-gray-900">${amount.toFixed(2)}</span> has been successfully
        </p>
        <p className="text-[11px] text-gray-600">processed</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mt-[8px]" />

      {/* Receipt Heading */}
      <h2 className="text-center text-[12px] font-bold text-gray-900 mt-[8px] mb-[6px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="flex justify-center gap-2 px-[12px]">
        <button className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptPrint} alt="Print" className="w-[24px] h-[24px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Print</span>
        </button>

        <button className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptText} alt="Text" className="w-[24px] h-[24px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Text</span>
        </button>

        <button className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptEmail} alt="Email" className="w-[24px] h-[24px] mb-[4px]" />
          <span className="text-[10px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

      {/* NO RECEIPT Button */}
      <div className="px-[12px] mt-[8px]">
        <button 
          onClick={onClose}
          className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors"
        >
          NO RECEIPT
        </button>
      </div>
    </div>
  );
};
