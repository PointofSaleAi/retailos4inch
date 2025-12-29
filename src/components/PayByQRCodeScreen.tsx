import { useState } from "react";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";
import qrCodePayment from "@/assets/qr-code-payment.png";
import { Input } from "./ui/input";

interface PayByQRCodeScreenProps {
  amount: number;
  onBack: () => void;
  onShare: (method: 'whatsapp' | 'text' | 'email') => void;
}

export const PayByQRCodeScreen = ({ amount, onBack, onShare }: PayByQRCodeScreenProps) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'text' | 'email' | null>(null);
  const [showQuickSend, setShowQuickSend] = useState(false);
  const [quickSendInput, setQuickSendInput] = useState('');

  const handleTabClick = (tab: 'whatsapp' | 'text' | 'email') => {
    setActiveTab(tab);
    setShowQuickSend(true);
    setQuickSendInput('');
  };

  const handleQuickSend = () => {
    if (!quickSendInput.trim() || !activeTab) return;
    onShare(activeTab);
    setShowQuickSend(false);
    setQuickSendInput('');
  };

  const getQuickSendPlaceholder = () => {
    switch (activeTab) {
      case 'whatsapp':
        return 'Enter WhatsApp number...';
      case 'text':
        return 'Enter phone number...';
      case 'email':
        return 'Enter email address...';
      default:
        return '';
    }
  };

  return (
    <div
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto"
      style={{
        fontFamily: "Montserrat, sans-serif",
        width: "189px",
        height: "330px",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-3">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span
          className="text-[11px] font-semibold text-[#1A1A1A]"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Pay by QR Code
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-3 pt-2">
        {/* Total Amount */}
        <div className="text-center mb-3">
          <p className="text-[9px] text-[#666666]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            Total Amount
          </p>
          <p className="text-[22px] font-bold text-[#1A1A1A]" style={{ fontFamily: "Montserrat, sans-serif" }}>
            <span className="text-[12px] align-top">$</span>
            {amount.toFixed(2)}
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-lg p-2 mb-3">
          <img
            src={qrCodePayment}
            alt="QR Code"
            className="w-[130px] h-[130px] object-contain"
          />
        </div>
      </div>

      {/* Share Options - Fixed at bottom */}
      <div className="px-3 pb-3">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
          <button
            onClick={() => handleTabClick('whatsapp')}
            className={`flex-1 py-2 flex items-center justify-center ${activeTab === 'whatsapp' && showQuickSend ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <button
            onClick={() => handleTabClick('text')}
            className={`flex-1 py-2 flex items-center justify-center border-l border-r border-gray-200 ${activeTab === 'text' && showQuickSend ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button
            onClick={() => handleTabClick('email')}
            className={`flex-1 py-2 flex items-center justify-center ${activeTab === 'email' && showQuickSend ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>
        </div>

        {/* Quick Send Input - Shows when tab is clicked */}
        {showQuickSend && (
          <div className="mt-2">
            <div className="bg-white rounded-lg p-2 border border-gray-200">
              <Input
                type={activeTab === 'email' ? 'email' : 'tel'}
                placeholder={getQuickSendPlaceholder()}
                value={quickSendInput}
                onChange={e => setQuickSendInput(e.target.value)}
                className="border border-gray-200 bg-white mb-2"
                style={{
                  height: '28px',
                  fontSize: '9px',
                  borderRadius: '6px'
                }}
              />
              <button
                onClick={handleQuickSend}
                disabled={!quickSendInput.trim()}
                className="w-full py-1.5 bg-[#4A4A4A] text-white rounded-lg text-[9px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
