import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import iconClose from '@/assets/icon-close.png';
import { LoyaltyGuest } from './LoyaltyGuestListScreen';

interface LoyaltyPaymentScreenProps {
  amount: number;
  guest: LoyaltyGuest;
  onClose: () => void;
  onRedeem: (otp: string, redeemAmount: number) => void;
}

export const LoyaltyPaymentScreen = ({
  amount,
  guest,
  onClose,
  onRedeem
}: LoyaltyPaymentScreenProps) => {
  const [step, setStep] = useState<'amount' | 'otp'>('amount');
  // Max redeemable is the lesser of available points or exact billing amount (no rounding)
  const maxRedeemable = Math.min(guest.points || 0, Math.floor(amount * 100) / 100);
  const [pointsInput, setPointsInput] = useState(Math.floor(maxRedeemable).toString());
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Calculate equivalent value ($1 per point)
  const equivalentValue = guest.points || 0;
  const pointsToRedeem = parseInt(pointsInput) || 0;
  // Charge amount cannot exceed the actual billing amount
  const chargeAmount = Math.min(pointsToRedeem, amount);

  const handleAmountKeypadPress = (key: string) => {
    if (key === 'C') {
      setPointsInput('');
    } else if (key === '00') {
      const newValue = pointsInput + '00';
      const parsedValue = parseInt(newValue) || 0;
      if (parsedValue <= maxRedeemable) {
        setPointsInput(newValue);
      } else {
        setPointsInput(maxRedeemable.toString());
      }
    } else {
      const newValue = pointsInput + key;
      const parsedValue = parseInt(newValue) || 0;
      if (parsedValue <= maxRedeemable) {
        setPointsInput(newValue);
      } else {
        setPointsInput(maxRedeemable.toString());
      }
    }
  };
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

  const handleOtpKeypadPress = (key: string) => {
    if (key === 'backspace') {
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
      const emptyIndex = otp.findIndex(v => !v);
      if (emptyIndex !== -1) {
        const newOtp = [...otp];
        newOtp[emptyIndex] = key;
        setOtp(newOtp);
      }
    }
  };

  const handleCharge = () => {
    if (pointsToRedeem > 0 && pointsToRedeem <= maxRedeemable) {
      setStep('otp');
    }
  };

  const handleRedeem = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 4) {
      onRedeem(otpValue, chargeAmount);
    }
  };
  if (step === 'amount') {
    return (
      <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {/* Header */}
        <div className="flex items-center justify-center h-[32px] relative px-0 flex-shrink-0">
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] font-semibold text-gray-900">Total Due</span>
            <span className="text-[13px] font-bold text-[#FF4D6A]">${amount.toFixed(2)}</span>
          </div>
          <button onClick={onClose} className="absolute right-2 p-0.5">
            <img src={iconClose} alt="Close" className="w-[14px] h-[14px]" />
          </button>
        </div>

        {/* Guest Info Card */}
        <div className="bg-white rounded-lg p-1.5 mx-0 border border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-1.5 mb-1">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={guest.avatar} alt={guest.name} />
              <AvatarFallback className="bg-gray-400 text-white font-medium text-[10px]">
                {getInitials(guest.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="text-[10px] font-semibold text-gray-900 truncate">{guest.name}</h3>
              <p className="text-[7px] text-gray-500 truncate">{guest.phone} · {guest.email}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <span className="text-[9px] font-semibold text-gray-900">{guest.points?.toLocaleString() || '0'} Points</span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-[#22C55E] font-semibold">${equivalentValue.toLocaleString()}.00</span>
              <p className="text-[6px] text-gray-500">Equivalent Value</p>
            </div>
          </div>
        </div>

        {/* Points to Redeem */}
        <div className="flex flex-col px-0 py-1">
          <p className="text-[8px] text-gray-600 mb-1">Points to redeem</p>
          <div className="bg-white rounded-lg border border-gray-200 py-2 px-3 mb-1">
            <span className="text-[20px] font-bold text-[#D4163C] block text-center">{pointsInput || '0'}</span>
          </div>

          {/* Number Pad - Fixed grid with explicit rows */}
          <div className="grid grid-cols-3 gap-1 px-0 py-[2px]">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
              <button
                key={key}
                onClick={() => handleAmountKeypadPress(key)}
                className="h-[28px] rounded-lg text-[14px] font-semibold transition-colors bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
              >
                {key}
              </button>
            ))}
          </div>
          {/* Last row with 00, 0, C */}
          <div className="grid grid-cols-3 gap-1 px-0 pt-1">
            <button
              onClick={() => handleAmountKeypadPress('00')}
              className="h-[28px] rounded-lg text-[14px] font-semibold transition-colors bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
            >
              00
            </button>
            <button
              onClick={() => handleAmountKeypadPress('0')}
              className="h-[28px] rounded-lg text-[14px] font-semibold transition-colors bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
            >
              0
            </button>
            <button
              onClick={() => handleAmountKeypadPress('C')}
              className="h-[28px] rounded-lg text-[14px] font-semibold transition-colors bg-white border border-gray-200 text-[#D4163C] hover:bg-gray-50"
            >
              C
            </button>
          </div>
        </div>

        {/* Charge Button - Separate from keypad */}
        <div className="mt-auto px-0 pb-1.5 flex-shrink-0">
          <button
            onClick={handleCharge}
            disabled={pointsToRedeem <= 0 || pointsToRedeem > maxRedeemable}
            className="w-full py-2 bg-[#4A4A4A] text-white rounded-full text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3A3A] transition-colors"
          >
            CHARGE $ {chargeAmount.toFixed(2)}
          </button>
        </div>
      </div>
    );
  }
  // OTP Screen
  return (
    <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-center h-[32px] relative px-0 flex-shrink-0">
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] font-semibold text-gray-900">Total Due</span>
          <span className="text-[13px] font-bold text-[#FF4D6A]">${chargeAmount.toFixed(2)}</span>
        </div>
        <button onClick={onClose} className="absolute right-2 p-0.5">
          <img src={iconClose} alt="Close" className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* Guest Info Card */}
      <div className="bg-white rounded-lg p-1.5 mx-0 border border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-1.5 mb-1">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarImage src={guest.avatar} alt={guest.name} />
            <AvatarFallback className="bg-gray-400 text-white font-medium text-[10px]">
              {getInitials(guest.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-[10px] font-semibold text-gray-900 truncate">{guest.name}</h3>
            <p className="text-[7px] text-gray-500 truncate">{guest.phone} · {guest.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span className="text-[9px] font-semibold text-gray-900">{guest.points?.toLocaleString() || '0'} Points</span>
          </div>
          <div className="text-right">
            <span className="text-[9px] text-[#22C55E] font-semibold">{pointsToRedeem}</span>
            <p className="text-[6px] text-gray-500">Points to be deducted</p>
          </div>
        </div>
      </div>

      {/* OTP Section */}
      <div className="flex flex-col px-0 py-2">
        <p className="text-[8px] text-gray-600 text-center mb-2">
          Enter the OTP sent to <span className="font-semibold">{guest.phone}</span>.
        </p>

        {/* OTP Input */}
        <div className="flex gap-2 mb-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleOtpChange(index, e.target.value)}
              className="w-full h-[32px] text-center text-[14px] font-semibold bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
              placeholder="-"
            />
          ))}
        </div>

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-1 px-0">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(key => (
            <button
              key={key}
              onClick={() => handleOtpKeypadPress(key)}
              className="h-[28px] bg-white rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-colors border border-gray-200"
            >
              {key}
            </button>
          ))}
        </div>
        {/* Last row */}
        <div className="grid grid-cols-3 gap-1 px-0 pt-1">
          <button
            onClick={() => handleOtpKeypadPress('backspace')}
            className="h-[28px] bg-[#E0E0E0] rounded-lg flex items-center justify-center hover:bg-gray-300 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
              <line x1="18" y1="9" x2="12" y2="15" />
              <line x1="12" y1="9" x2="18" y2="15" />
            </svg>
          </button>
          <button
            onClick={() => handleOtpKeypadPress('0')}
            className="h-[28px] bg-white rounded-lg text-[14px] font-semibold hover:bg-gray-100 transition-colors border border-gray-200"
          >
            0
          </button>
          <button
            onClick={() => handleOtpKeypadPress('clear')}
            className="h-[28px] bg-[#E0E0E0] rounded-lg text-[12px] font-semibold text-[#EF4444] hover:bg-gray-300 transition-colors"
          >
            C
          </button>
        </div>
      </div>

      {/* Redeem Button - Separate from keypad */}
      <div className="mt-auto px-0 pb-1.5 flex-shrink-0">
        <button
          onClick={handleRedeem}
          disabled={otp.some(d => !d)}
          className="w-full py-2 bg-[#4A4A4A] text-white rounded-full text-[11px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3A3A] transition-colors"
        >
          REDEEM
        </button>
      </div>
    </div>
  );
};