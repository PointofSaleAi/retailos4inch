import { X, Check, Printer, MessageSquare, Mail } from 'lucide-react';

interface PaymentSuccessScreenProps {
  amount: number;
  onClose: () => void;
}

export const PaymentSuccessScreen = ({
  amount,
  onClose
}: PaymentSuccessScreenProps) => {
  return (
    <div className="w-[186px] h-full bg-white flex flex-col mx-auto" style={{
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Close Button */}
      <div className="flex justify-end pt-[8px] pr-[8px]">
        <button onClick={onClose} className="p-0">
          <X size={20} className="text-gray-900" />
        </button>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[20px]">
        <div className="w-[80px] h-[80px] rounded-full bg-emerald-500 flex items-center justify-center">
          <Check size={48} className="text-white" strokeWidth={3} />
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center mt-[20px] px-4">
        <p className="text-[14px] text-gray-600 leading-tight">
          <span className="font-bold text-gray-900">${amount.toFixed(2)}</span> has been successfully
        </p>
        <p className="text-[14px] text-gray-600">processed</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mt-[24px]" />

      {/* Receipt Heading */}
      <h2 className="text-center text-[16px] font-bold text-gray-900 mt-[16px] mb-[16px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="grid grid-cols-3 gap-3 px-[12px]">
        <button className="flex flex-col items-center py-[16px] px-[12px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <Printer size={32} className="text-gray-700 mb-[8px]" />
          <span className="text-[12px] font-semibold text-gray-900">Print</span>
        </button>

        <button className="flex flex-col items-center py-[16px] px-[12px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <MessageSquare size={32} className="text-gray-700 mb-[8px]" />
          <span className="text-[12px] font-semibold text-gray-900">Text</span>
        </button>

        <button className="flex flex-col items-center py-[16px] px-[12px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <Mail size={32} className="text-gray-700 mb-[8px]" />
          <span className="text-[12px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

      {/* NO RECEIPT Button */}
      <div className="px-[12px] mt-auto pb-[16px]">
        <button 
          onClick={onClose}
          className="w-full h-[44px] bg-gray-900 text-white rounded-full font-bold text-[14px] tracking-wide hover:bg-gray-800 transition-colors"
        >
          NO RECEIPT
        </button>
      </div>
    </div>
  );
};
