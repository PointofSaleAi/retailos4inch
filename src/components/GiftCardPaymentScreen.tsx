import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import iconClose from '@/assets/icon-close.png';

interface GiftCardPaymentScreenProps {
  totalDue: number;
  onBack: () => void;
  onCharge: (amount: number, giftCardNumber: string) => void;
  onClose?: () => void;
}

type GiftCardStep = 'enter-card' | 'edit-amount';

export const GiftCardPaymentScreen = ({
  totalDue,
  onBack,
  onCharge,
  onClose
}: GiftCardPaymentScreenProps) => {
  const [step, setStep] = useState<GiftCardStep>('enter-card');
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [amount, setAmount] = useState(totalDue.toFixed(2));
  const [showBalanceError, setShowBalanceError] = useState(false);
  
  // Mock balance - in real app this would come from API after validating card
  const [giftCardBalance] = useState(10.00);
  
  // Set initial amount to minimum of totalDue and giftCardBalance when entering amount step
  const initializeAmount = () => {
    const maxAllowed = Math.min(totalDue, giftCardBalance);
    setAmount(maxAllowed.toFixed(2));
  };

  const isValidGiftCard = giftCardNumber.length === 16;

  const formatGiftCardNumber = (num: string) => {
    // Format as XXXX XXXX XXXX XXXX
    const groups = [];
    for (let i = 0; i < num.length; i += 4) {
      groups.push(num.slice(i, i + 4));
    }
    return groups.join(' ');
  };

  const getPlaceholder = () => {
    const filled = giftCardNumber.length;
    const remaining = 16 - filled;
    const placeholder = 'X'.repeat(remaining);
    
    // Build the display with actual numbers and placeholder
    const combined = giftCardNumber + placeholder;
    return formatGiftCardNumber(combined);
  };

  const handleNumberClick = (num: string) => {
    if (step === 'enter-card') {
      if (num === 'C') {
        setGiftCardNumber('');
        return;
      }
      if (num === '.') return; // No decimal for card number
      if (giftCardNumber.length < 16) {
        setGiftCardNumber(prev => prev + num);
      }
    } else {
      // Amount entry
      if (num === 'C') {
        setAmount('0.00');
        return;
      }
      if (num === '.') return;

      let cleanAmount = amount.replace('.', '').replace(/^0+/, '');
      cleanAmount = cleanAmount + num;

      while (cleanAmount.length < 3) {
        cleanAmount = '0' + cleanAmount;
      }

      const dollars = cleanAmount.slice(0, -2);
      const cents = cleanAmount.slice(-2);
      const newAmount = parseFloat(`${dollars || '0'}.${cents}`);
      
      // Limit amount to gift card balance
      if (newAmount <= giftCardBalance) {
        setAmount(`${dollars || '0'}.${cents}`);
        setShowBalanceError(false);
      } else {
        // Show error when trying to exceed balance
        setShowBalanceError(true);
      }
    }
  };

  const handleContinue = () => {
    if (step === 'enter-card' && isValidGiftCard) {
      initializeAmount();
      setStep('edit-amount');
    }
  };

  const handleCharge = () => {
    onCharge(parseFloat(amount), giftCardNumber);
  };

  const handleBack = () => {
    if (step === 'edit-amount') {
      setStep('enter-card');
    } else {
      onBack();
    }
  };

  return (
    <div 
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-0">
        <button onClick={handleBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">
          Pay by Gift Card
        </span>
      </div>

      {step === 'enter-card' && (
        <>
          {/* Gift Card Number Label */}
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-[9px] text-gray-400 font-medium">
              {isValidGiftCard ? 'Gift Card Balance' : 'Gift Card Number'}
            </span>
            {isValidGiftCard && (
              <span className="text-[9px] font-semibold text-gray-900">
                {giftCardBalance.toFixed(2)}
              </span>
            )}
          </div>

          {/* Gift Card Number Display */}
          <div className="mb-1">
            <div className="bg-[#F5F5F5] rounded-lg border border-gray-200 py-2 flex items-center justify-center">
              <span 
                className="text-[12px] font-semibold tracking-wide text-center"
                style={{ color: giftCardNumber.length > 0 ? '#1a1a1a' : '#ccc' }}
              >
                {giftCardNumber.length > 0 
                  ? formatGiftCardNumber(giftCardNumber) + (giftCardNumber.length < 16 ? ' ' + 'X'.repeat(16 - giftCardNumber.length).match(/.{1,4}/g)?.join(' ') : '')
                  : 'XXXX XXXX XXXX XXXX\nXXXX'
                }
              </span>
            </div>
          </div>
        </>
      )}

      {step === 'edit-amount' && (
        <>
          {/* Amount Display */}
          <div className="mb-1">
            <div className="bg-white rounded-lg border border-gray-200 py-3 flex items-center justify-center">
              <span className="text-[22px] font-bold text-[#C8102E]">
                $ {amount}
              </span>
            </div>
          </div>
          
          {/* Balance Info & Error Message */}
          <div className="px-1 mb-1">
            <div className="flex items-center justify-between">
              <span className="text-[8px] text-gray-500">Available Balance:</span>
              <span className="text-[8px] font-semibold text-gray-700">${giftCardBalance.toFixed(2)}</span>
            </div>
            {showBalanceError && (
              <p className="text-[7px] text-[#C8102E] mt-0.5 text-center">
                Amount exceeds gift card balance
              </p>
            )}
          </div>
        </>
      )}

      {/* Number Pad */}
      <div className="flex-1 pb-2 flex flex-col px-0">
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'C'].map(num => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              className="bg-white rounded-lg border border-gray-200 flex items-center justify-center text-[18px] font-semibold transition-colors active:bg-gray-100"
              style={{
                color: num === 'C' ? '#C8102E' : '#1a1a1a',
                minHeight: '42px'
              }}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Continue or Charge Button */}
        {step === 'enter-card' ? (
          <button
            onClick={handleContinue}
            disabled={!isValidGiftCard}
            className="mt-2 w-full py-3 rounded-full text-white text-[12px] font-semibold transition-colors"
            style={{ 
              backgroundColor: isValidGiftCard ? '#4A4A4A' : '#ccc',
              cursor: isValidGiftCard ? 'pointer' : 'not-allowed'
            }}
          >
            CONTINUE
          </button>
        ) : (
          <button
            onClick={handleCharge}
            className="mt-2 w-full py-3 rounded-full text-white text-[12px] font-semibold transition-colors"
            style={{ backgroundColor: '#4A4A4A' }}
          >
            CHARGE $ {amount}
          </button>
        )}
      </div>
    </div>
  );
};
