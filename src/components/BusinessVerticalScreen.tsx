import { ChevronLeft, ShoppingBag, Store, Leaf, Wrench, Sparkles, Plane, Tv, MoreHorizontal } from "lucide-react";

interface BusinessVerticalScreenProps {
  onBack: () => void;
  onSelect: (vertical: string) => void;
}

const verticals = [
  { name: "Hospitality", icon: ShoppingBag },
  { name: "Retail", icon: Store },
  { name: "Wellness", icon: Leaf },
  { name: "Services", icon: Wrench },
  { name: "Beauty", icon: Sparkles },
  { name: "Travel", icon: Plane },
  { name: "Entertainment", icon: Tv },
  { name: "Others", icon: MoreHorizontal },
];

export const BusinessVerticalScreen = ({ onBack, onSelect }: BusinessVerticalScreenProps) => {
  return (
    <div className="h-full flex flex-col bg-background animate-fade-in">
      {/* Header */}
      <div className="flex items-center px-3 py-2 border-b border-border">
        <button onClick={onBack} className="p-1">
          <ChevronLeft size={20} className="text-foreground" />
        </button>
        <h1 className="flex-1 text-center text-[12px] font-semibold text-foreground pr-6">
          Select Business Vertical
        </h1>
      </div>

      {/* Vertical List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-2">
          {verticals.map((vertical) => (
            <button
              key={vertical.name}
              onClick={() => onSelect(vertical.name)}
              className="w-full h-[38px] px-3 rounded-full border border-[#D1D1D1] bg-white flex items-center gap-3 hover:bg-[#F5F5F5] transition-colors"
            >
              <vertical.icon size={18} className="text-foreground" strokeWidth={1.5} />
              <span className="text-[11px] font-medium text-foreground">{vertical.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
