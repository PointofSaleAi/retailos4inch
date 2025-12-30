import { ChevronRight } from 'lucide-react';
import iconClose from '@/assets/icon-close.png';
import iconGiftCard from '@/assets/icon-gift-card.png';

interface GiftCardMenuScreenProps {
  onClose: () => void;
  onSellPlastic: () => void;
  onSellEGift: () => void;
  onCheckBalance: () => void;
}

export const GiftCardMenuScreen = ({
  onClose,
  onSellPlastic,
  onSellEGift,
  onCheckBalance
}: GiftCardMenuScreenProps) => {
  return (
    <div 
      className="w-[186px] h-full bg-white flex flex-col mx-auto" 
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-[6px]">
        <span className="text-[12px] font-semibold text-[#1A1A1A]">Gift Card</span>
        <button onClick={onClose} className="absolute right-[6px] p-1">
          <img src={iconClose} alt="Close" className="w-[14px] h-[14px]" />
        </button>
      </div>

      {/* Subtitle */}
      <p className="px-[6px] pb-3 text-center text-[10px] text-[#666666]">
        Scan or swipe to sell, top up, or check balance.
      </p>

      {/* Divider */}
      <div className="border-t border-gray-200 mx-[6px]" />

      {/* Menu Options */}
      <div className="flex flex-col gap-2 px-[6px] pt-3">
        {/* Sell a plastic gift card */}
        <button
          onClick={onSellPlastic}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex items-center gap-2">
            <img src={iconGiftCard} alt="Plastic" className="w-[18px] h-[18px]" />
            <span className="text-[10px] font-medium text-[#1A1A1A]">Sell a plastic gift card</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Sell an eGift card */}
        <button
          onClick={onSellEGift}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="1" width="12" height="16" rx="1" stroke="#1A1A1A" strokeWidth="1.5" fill="none"/>
                <line x1="4" y1="14" x2="10" y2="14" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-[10px] font-medium text-[#1A1A1A]">Sell an eGift card</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Check balance or reload card */}
        <button
          onClick={onCheckBalance}
          className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex items-center gap-2">
            <div className="w-[18px] h-[18px] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="1" y="4" width="16" height="10" rx="1" stroke="#1A1A1A" strokeWidth="1.5" fill="none"/>
                <circle cx="9" cy="9" r="2" stroke="#1A1A1A" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>
            <span className="text-[10px] font-medium text-[#1A1A1A] text-left leading-tight">Check balance or<br/>reload card</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
};
