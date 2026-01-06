import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import { useState } from 'react';

interface ManualCardPaymentScreenProps {
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number, cardDetails: { cardNumber: string; expiry: string; cvv: string }) => void;
}

export const ManualCardPaymentScreen = ({
  totalDue,
  onBack,
  onCharge
}: ManualCardPaymentScreenProps) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [activeField, setActiveField] = useState<'card' | 'expiry' | 'cvv'>('card');
  const [showErrors, setShowErrors] = useState(false);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 2) {
      return digits.slice(0, 2) + ' /' + digits.slice(2);
    }
    return digits;
  };

  const handleNumberClick = (num: string) => {
    setShowErrors(false);
    if (activeField === 'card') {
      if (cardNumber.replace(/\s/g, '').length < 16) {
        setCardNumber(formatCardNumber(cardNumber.replace(/\s/g, '') + num));
      }
    } else if (activeField === 'expiry') {
      if (expiry.replace(/\D/g, '').length < 4) {
        setExpiry(formatExpiry(expiry.replace(/\D/g, '') + num));
      }
    } else if (activeField === 'cvv') {
      if (cvv.length < 3) {
        setCvv(cvv + num);
      }
    }
  };

  const handleBackspace = () => {
    setShowErrors(false);
    if (activeField === 'card') {
      const digits = cardNumber.replace(/\s/g, '');
      setCardNumber(formatCardNumber(digits.slice(0, -1)));
    } else if (activeField === 'expiry') {
      const digits = expiry.replace(/\D/g, '');
      setExpiry(formatExpiry(digits.slice(0, -1)));
    } else if (activeField === 'cvv') {
      setCvv(cvv.slice(0, -1));
    }
  };

  const handleClear = () => {
    setShowErrors(false);
    if (activeField === 'card') {
      setCardNumber('');
    } else if (activeField === 'expiry') {
      setExpiry('');
    } else if (activeField === 'cvv') {
      setCvv('');
    }
  };

  const getDisplayCardNumber = () => {
    if (!cardNumber) return 'XXXX XXXX XXXX XXXX';
    const digits = cardNumber.replace(/\s/g, '');
    const padded = digits.padEnd(16, 'X');
    return padded.replace(/(.{4})/g, '$1 ').trim();
  };

  const getDisplayExpiry = () => {
    if (!expiry) return 'MM /YY';
    return expiry || 'MM /YY';
  };

  const getDisplayCvv = () => {
    if (!cvv) return 'XXX';
    return cvv.padEnd(3, 'X');
  };

  // Validation functions
  const isCardNumberValid = () => cardNumber.replace(/\s/g, '').length === 16;
  
  const isExpiryValid = () => {
    const digits = expiry.replace(/\D/g, '');
    if (digits.length !== 4) return false;
    const month = parseInt(digits.slice(0, 2), 10);
    const year = parseInt(digits.slice(2, 4), 10);
    if (month < 1 || month > 12) return false;
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    if (year < currentYear || (year === currentYear && month < currentMonth)) return false;
    return true;
  };
  
  const isCvvValid = () => cvv.length === 3;

  const cardNumberError = showErrors && !isCardNumberValid();
  const expiryError = showErrors && !isExpiryValid();
  const cvvError = showErrors && !isCvvValid();

  const isValid = isCardNumberValid() && isExpiryValid() && isCvvValid();

  const handleCharge = () => {
    if (!isValid) {
      setShowErrors(true);
      return;
    }
    onCharge(totalDue, {
      cardNumber: cardNumber.replace(/\s/g, ''),
      expiry: expiry.replace(/\s/g, ''),
      cvv
    });
  };

  const numberPad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['backspace', '0', 'clear']
  ];

  return (
    <div className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="h-[32px] relative px-2 flex items-center justify-center flex-shrink-0">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[14px] h-[14px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">Manual Card</span>
      </div>

      {/* Total Due */}
      <div className="flex items-center justify-center gap-1 py-1 flex-shrink-0">
        <span className="text-[12px] font-semibold text-gray-900">Total Due</span>
        <span className="text-[14px] font-bold text-[#FF4D6A]">$ {totalDue.toFixed(2)}</span>
      </div>

      {/* Card Number Field */}
      <div className="px-2 mb-1 flex-shrink-0">
        <div className="flex items-center justify-between">
          <label className={`text-[8px] font-medium uppercase tracking-wide ${cardNumberError ? 'text-[#FF4D6A]' : 'text-gray-500'}`}>
            Card Number
          </label>
          {cardNumberError && (
            <span className="text-[7px] text-[#FF4D6A]">Invalid</span>
          )}
        </div>
        <button 
          onClick={() => setActiveField('card')}
          className={`w-full h-[28px] rounded-full border ${cardNumberError ? 'border-[#FF4D6A]' : activeField === 'card' ? 'border-gray-400' : 'border-gray-200'} bg-white flex items-center justify-center mt-0.5`}
        >
          <span className={`text-[11px] tracking-[2px] ${cardNumberError ? 'text-[#FF4D6A]' : cardNumber ? 'text-gray-800' : 'text-gray-400'}`}>
            {getDisplayCardNumber()}
          </span>
        </button>
      </div>

      {/* Expiry and CVV Fields */}
      <div className="flex gap-2 px-2 mb-2 flex-shrink-0">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <label className={`text-[8px] font-medium uppercase tracking-wide ${expiryError ? 'text-[#FF4D6A]' : 'text-gray-500'}`}>
              Expiry Date
            </label>
            {expiryError && (
              <span className="text-[6px] text-[#FF4D6A]">Invalid</span>
            )}
          </div>
          <button 
            onClick={() => setActiveField('expiry')}
            className={`w-full h-[26px] rounded-full border ${expiryError ? 'border-[#FF4D6A]' : activeField === 'expiry' ? 'border-gray-400' : 'border-gray-200'} bg-white flex items-center justify-center mt-0.5`}
          >
            <span className={`text-[10px] ${expiryError ? 'text-[#FF4D6A]' : expiry ? 'text-gray-800' : 'text-gray-400'}`}>
              {getDisplayExpiry()}
            </span>
          </button>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <label className={`text-[8px] font-medium uppercase tracking-wide ${cvvError ? 'text-[#FF4D6A]' : 'text-gray-500'}`}>
              CVV
            </label>
            {cvvError && (
              <span className="text-[6px] text-[#FF4D6A]">Invalid</span>
            )}
          </div>
          <button 
            onClick={() => setActiveField('cvv')}
            className={`w-full h-[26px] rounded-full border ${cvvError ? 'border-[#FF4D6A]' : activeField === 'cvv' ? 'border-gray-400' : 'border-gray-200'} bg-white flex items-center justify-center mt-0.5`}
          >
            <span className={`text-[10px] ${cvvError ? 'text-[#FF4D6A]' : cvv ? 'text-gray-800' : 'text-gray-400'}`}>
              {getDisplayCvv()}
            </span>
          </button>
        </div>
      </div>

      {/* Charge Button */}
      <div className="px-2 mb-2 flex-shrink-0">
        <button
          onClick={handleCharge}
          className="w-full h-[32px] rounded-full bg-[#4A4A4A] text-white text-[11px] font-semibold"
        >
          CHARGE $ {totalDue.toFixed(2)}
        </button>
      </div>

      {/* Number Pad */}
      <div className="flex-1 px-2 pb-1">
        <div className="grid grid-cols-3 gap-1.5 h-full">
          {numberPad.flat().map((key, index) => (
            <button
              key={index}
              onClick={() => {
                if (key === 'backspace') handleBackspace();
                else if (key === 'clear') handleClear();
                else handleNumberClick(key);
              }}
              className="bg-gray-100 rounded-lg flex items-center justify-center text-[16px] font-semibold text-gray-800 active:bg-gray-200"
            >
              {key === 'backspace' ? (
                <span className="text-[14px]">⌫</span>
              ) : key === 'clear' ? (
                <span className="text-[14px] text-[#FF4D6A] font-bold">C</span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
