import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface SelectAmountScreenProps {
  onBack: () => void;
  onSelectAmount: (amount: number) => void;
  onCustom: () => void;
}

const PRESET_AMOUNTS = [100, 75, 50, 25, 20, 10];

export const SelectAmountScreen = ({
  onBack,
  onSelectAmount,
  onCustom
}: SelectAmountScreenProps) => {
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
          Select Amount
        </span>
      </div>

      {/* Amount Grid */}
      <div className="flex-1 px-[6px] pt-2">
        <div className="grid grid-cols-2 gap-2">
          {PRESET_AMOUNTS.map(amount => (
            <button
              key={amount}
              onClick={() => onSelectAmount(amount)}
              className="bg-white rounded-lg border border-gray-200 py-5 flex items-center justify-center transition-colors active:bg-gray-100"
            >
              <span className="text-[20px] font-semibold text-[#1A1A1A]">${amount}</span>
            </button>
          ))}
        </div>

        {/* Custom Button */}
        <button
          onClick={onCustom}
          className="mt-3 w-full py-3 bg-white rounded-lg border border-gray-200 flex items-center justify-center transition-colors active:bg-gray-100"
        >
          <span className="text-[12px] font-medium text-[#1A1A1A]">Custom</span>
        </button>
      </div>
    </div>
  );
};
