import { useState } from 'react';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface RecipientEmailScreenProps {
  onBack: () => void;
  onSend: (email: string) => void;
}

export const RecipientEmailScreen = ({
  onBack,
  onSend
}: RecipientEmailScreenProps) => {
  const [email, setEmail] = useState('');

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSend = () => {
    if (isValidEmail) {
      onSend(email);
    }
  };

  return (
    <div 
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center h-[40px] relative px-[6px]">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="flex-1 text-center text-[11px] font-semibold text-[#1A1A1A] pr-[24px]">
          Recipient Email
        </span>
      </div>

      {/* Email Input */}
      <div className="px-[6px] mb-1">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address*"
          className="w-full p-3 border border-gray-200 rounded-lg bg-white text-[10px] text-[#1A1A1A] placeholder-gray-400 outline-none focus:border-gray-400"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        />
      </div>

      {/* Helper Text */}
      <p className="px-[6px] pb-3 text-left text-[9px] text-[#666666]">
        Enter recipient's email address
      </p>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Send Button */}
      <div className="px-[6px] pb-3">
        <button
          onClick={handleSend}
          disabled={!isValidEmail}
          className="w-full py-2.5 rounded-full text-white text-[11px] font-semibold transition-colors"
          style={{ 
            backgroundColor: isValidEmail ? '#1A1A1A' : '#ccc',
            cursor: isValidEmail ? 'pointer' : 'not-allowed'
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};
