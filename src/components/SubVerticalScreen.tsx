import { ChevronLeft } from "lucide-react";

interface SubVerticalScreenProps {
  onBack: () => void;
  onSelect: (subVertical: string) => void;
}

const subVerticals = [
  "Fashion And Apparel",
  "Grocery And Super Markets",
  "Restaurants And Cafes",
  "Convenience Stores",
  "Electronics And Appliances",
  "Luxury Goods",
  "Health And Beauty",
  "Furniture And Home Goods",
  "Sporting Goods",
];

export const SubVerticalScreen = ({ onBack, onSelect }: SubVerticalScreenProps) => {
  return (
    <div className="h-full flex flex-col bg-background animate-fade-in">
      {/* Header */}
      <div className="flex items-center px-3 py-2 border-b border-border">
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-[12px] font-semibold text-foreground pr-6">
          Select Sub Vertical
        </h1>
      </div>

      {/* Sub Vertical List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-2">
          {subVerticals.map((subVertical) => (
            <button
              key={subVertical}
              onClick={() => onSelect(subVertical)}
              className="w-full h-[34px] px-3 rounded-full border border-[#D1D1D1] bg-white flex items-center hover:bg-[#F5F5F5] transition-colors"
            >
              <span className="text-[10px] font-medium text-foreground">{subVertical}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
