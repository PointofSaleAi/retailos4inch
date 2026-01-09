import { useState, useEffect } from 'react';

interface PayByQRCodeWaitingScreenProps {
  amount: number;
  sentTo: string;
  sentVia: 'whatsapp' | 'text' | 'email';
  onClose: () => void;
  onCheckStatus: () => void;
  onSendNewQR: () => void;
}

export const PayByQRCodeWaitingScreen = ({
  amount,
  sentTo,
  sentVia,
  onClose,
  onCheckStatus,
  onSendNewQR
}: PayByQRCodeWaitingScreenProps) => {
  const [countdown, setCountdown] = useState(60);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (countdown > 0 && !isExpired) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setIsExpired(true);
    }
  }, [countdown, isExpired]);

  const getSentViaLabel = () => {
    switch (sentVia) {
      case 'whatsapp':
        return 'WhatsApp';
      case 'text':
        return 'Text';
      case 'email':
        return 'Email';
      default:
        return '';
    }
  };

  const getDestinationLabel = () => {
    return sentVia === 'email' ? 'email' : 'number';
  };

  return (
    <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" style={{ fontFamily: 'Montserrat, sans-serif', width: '189px', height: '330px' }}>
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-2">
        <span className="text-[11px] font-semibold text-gray-900">Pay by QR Code</span>
        <button onClick={onClose} className="absolute right-2 w-[24px] h-[24px] rounded-full bg-gray-200 flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-3">
        {/* Amount */}
        <div className="text-center mb-3">
          <p className="text-[10px] text-gray-500">Total Amount</p>
          <p className="text-[24px] font-bold text-gray-900">
            <span className="text-[12px] align-top">$</span>{amount.toFixed(2)}
          </p>
        </div>

        {/* Countdown Circle */}
        <div className="relative w-[90px] h-[90px] mb-3">
          {/* Gradient Background Circle */}
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)',
              opacity: 0.9
            }}
          />
          
          {/* Inner circle with countdown */}
          <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 flex items-center justify-center">
            <span className="text-[28px] font-bold text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
              {isExpired ? '--' : countdown}
            </span>
          </div>
          
          {/* Progress ring */}
          {!isExpired && (
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="45"
                cy="45"
                r="43"
                fill="none"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="3"
                strokeDasharray={`${(countdown / 60) * 270.18} 270.18`}
              />
            </svg>
          )}
        </div>

        {/* Status Text */}
        <p className="text-[11px] font-semibold text-gray-900 mb-1 text-center">
          {isExpired ? 'QR Code Expired' : 'Waiting for payment'}
        </p>
        
        <p className="text-[8px] text-gray-500 text-center mb-2 px-2">
          {isExpired 
            ? 'This QR code is no longer active.' 
            : `QR has been sent to this ${getDestinationLabel()}.`
          }
        </p>

        {/* Sent To Info */}
        <div className="w-full bg-white rounded-lg p-2 mt-1">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[9px] text-gray-500">Sent via</span>
            <span className="text-[9px] font-medium text-gray-900">{getSentViaLabel()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[9px] text-gray-500">Sent to</span>
            <span className="text-[9px] font-medium text-gray-900 truncate max-w-[100px]">{sentTo}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-3 pb-3">
        <button 
          onClick={isExpired ? onSendNewQR : onCheckStatus}
          className="w-full py-2 rounded-full text-white text-[10px] font-semibold transition-colors"
          style={{ backgroundColor: '#4A4A4A' }}
        >
          {isExpired ? 'SEND NEW QR' : 'CHECK STATUS'}
        </button>
      </div>
    </div>
  );
};
