import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import iconClose from '@/assets/icon-close.png';
import qrCodeImage from '@/assets/qr-code-payment.png';
import { LoyaltyGuest } from './LoyaltyGuestListScreen';

interface LoyaltyPaymentScreenProps {
  amount: number;
  guest: LoyaltyGuest;
  onClose: () => void;
  onRedeem: (otp: string) => void;
}

export const LoyaltyPaymentScreen = ({
  amount,
  guest,
  onClose,
  onRedeem
}: LoyaltyPaymentScreenProps) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showKeypad, setShowKeypad] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Calculate points to be deducted (1 point = $1 for simplicity)
  const pointsToDeduct = Math.ceil(amount);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeypadPress = (key: string) => {
    if (key === 'backspace') {
      // Find the last filled input and clear it
      for (let i = 3; i >= 0; i--) {
        if (otp[i]) {
          const newOtp = [...otp];
          newOtp[i] = '';
          setOtp(newOtp);
          break;
        }
      }
    } else if (key === 'clear') {
      setOtp(['', '', '', '']);
    } else {
      // Find the first empty input and fill it
      const emptyIndex = otp.findIndex(v => !v);
      if (emptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[emptyIndex] = key;
        setOtp(newOtp);
      }
    }
  };

  const handleRedeem = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      onRedeem(otpValue);
    }
  };

  const handleOtpFocus = () => {
    setShowKeypad(true);
  };

  return (
    <div
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-0 flex-shrink-0">
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] font-semibold text-gray-900">Total Due</span>
          <span className="text-[14px] font-bold text-[#FF4D6A]">${amount.toFixed(2)}</span>
        </div>
        <button onClick={onClose} className="absolute right-2 p-1">
          <img src={iconClose} alt="Close" className="w-[16px] h-[16px]" />
        </button>
      </div>

      {/* Guest Info Card */}
      <div className="bg-white rounded-lg p-2 mx-0 border border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={guest.avatar} alt={guest.name} />
            <AvatarFallback className="bg-gray-400 text-white font-medium text-[12px]">
              {getInitials(guest.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-[11px] font-semibold text-gray-900 truncate">
              {guest.name}
            </h3>
            <p className="text-[8px] text-gray-500 truncate">
              {guest.phone} · {guest.email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-[10px] font-semibold text-gray-900">
              {guest.points?.toLocaleString() || '0'} Points
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#22C55E] font-semibold">{pointsToDeduct}</span>
            <p className="text-[7px] text-gray-500">Points to be deducted</p>
          </div>
        </div>
      </div>

      {/* QR Code Section - Scrollable */}
      <div className="flex-1 overflow-y-auto px-0 py-2">
        <p className="text-[8px] text-gray-600 text-center mb-2">
          Scan the QR code or enter the OTP sent to{' '}
          <span className="font-semibold">{guest.phone}</span>.
        </p>

        <div className="flex justify-center mb-2">
          <div className="bg-white p-2 rounded-lg border border-gray-200">
            <img
              src={qrCodeImage}
              alt="QR Code"
              className="w-[90px] h-[90px] object-contain"
            />
          </div>
        </div>

        {/* OTP Input */}
        <div className="px-0">
          <p className="text-[9px] text-gray-600 mb-1.5">OTP</p>
          <div className="flex gap-2 mb-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={e => handleOtpChange(index, e.target.value)}
                onFocus={handleOtpFocus}
                className="w-full h-[36px] text-center text-[14px] font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                placeholder="-"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Redeem Button */}
      <div className="px-0 pb-2 flex-shrink-0">
        <button
          onClick={handleRedeem}
          disabled={otp.some(d => !d)}
          className="w-full py-2.5 bg-[#4A4A4A] text-white rounded-full text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3A3A] transition-colors"
        >
          REDEEM
        </button>
      </div>

      {/* Numeric Keypad */}
      {showKeypad && (
        <div className="bg-[#EFEFEF] p-1.5 flex-shrink-0">
          <div className="grid grid-cols-3 gap-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
              <button
                key={key}
                onClick={() => handleKeypadPress(key)}
                className="h-[32px] bg-white rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-colors"
              >
                {key}
              </button>
            ))}
            <button
              onClick={() => handleKeypadPress('backspace')}
              className="h-[32px] bg-[#E0E0E0] rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="12" y2="15" />
                <line x1="12" y1="9" x2="18" y2="15" />
              </svg>
            </button>
            <button
              onClick={() => handleKeypadPress('0')}
              className="h-[32px] bg-white rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-colors"
            >
              0
            </button>
            <button
              onClick={() => handleKeypadPress('clear')}
              className="h-[32px] bg-[#E0E0E0] rounded-lg text-[12px] font-semibold text-[#EF4444] hover:bg-gray-300 transition-colors"
            >
              C
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
