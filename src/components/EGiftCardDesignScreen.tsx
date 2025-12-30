import iconBackArrow from "@/assets/icon-back-arrow-new.png";

interface EGiftCardDesignScreenProps {
  onBack: () => void;
  onSelectDesign: (design: string) => void;
}

export const EGiftCardDesignScreen = ({ onBack, onSelectDesign }: EGiftCardDesignScreenProps) => {
  const designs = [
    {
      id: 'balloons',
      bgColor: '#FFF8DC',
      content: (
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl">🎈🎈🎈</span>
        </div>
      )
    },
    {
      id: 'gift-text',
      bgColor: '#8DA4C4',
      content: (
        <div className="flex items-center justify-center h-full">
          <span className="text-xs font-bold text-[#2D3748] tracking-wide" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            THIS IS A GIFT
          </span>
        </div>
      )
    },
    {
      id: 'dollar',
      bgColor: '#E8604C',
      content: (
        <div className="flex items-center justify-center h-full">
          <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>$</span>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center px-[6px] py-2 border-b border-gray-100">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-4 h-4" />
        </button>
        <h1 className="flex-1 text-center text-sm font-semibold text-black pr-6">
          Select Design
        </h1>
      </div>

      {/* Design Cards */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {designs.map((design) => (
          <button
            key={design.id}
            onClick={() => onSelectDesign(design.id)}
            className="w-full h-[70px] rounded-lg border border-gray-200 overflow-hidden transition-all active:scale-[0.98]"
            style={{ backgroundColor: design.bgColor }}
          >
            {design.content}
          </button>
        ))}
      </div>
    </div>
  );
};
