import { useState } from "react";
import { ChevronLeft, ShoppingBag, Store, Leaf, Wrench, Sparkles, Plane, Tv, MoreHorizontal, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessVerticalScreenProps {
  onBack: () => void;
  selectedVerticals: string[];
  onSelect: (verticals: string[]) => void;
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

export const BusinessVerticalScreen = ({ onBack, selectedVerticals, onSelect }: BusinessVerticalScreenProps) => {
  const [selected, setSelected] = useState<string[]>(selectedVerticals);

  const toggleVertical = (name: string) => {
    setSelected(prev => 
      prev.includes(name) 
        ? prev.filter(v => v !== name) 
        : [...prev, name]
    );
  };

  const handleDone = () => {
    onSelect(selected);
  };

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
          {verticals.map((vertical) => {
            const isSelected = selected.includes(vertical.name);
            return (
              <button
                key={vertical.name}
                onClick={() => toggleVertical(vertical.name)}
                className={`w-full h-[38px] px-3 rounded-full border flex items-center gap-3 transition-colors ${
                  isSelected 
                    ? "border-foreground bg-foreground text-white" 
                    : "border-[#D1D1D1] bg-white hover:bg-[#F5F5F5]"
                }`}
              >
                <vertical.icon size={18} className={isSelected ? "text-white" : "text-foreground"} strokeWidth={1.5} />
                <span className={`text-[11px] font-medium flex-1 text-left ${isSelected ? "text-white" : "text-foreground"}`}>
                  {vertical.name}
                </span>
                {isSelected && <Check size={16} className="text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Done Button */}
      <div className="px-3 py-3 border-t border-border">
        <Button 
          variant="retail" 
          size="retail-full" 
          className="h-[28px]"
          onClick={handleDone}
          disabled={selected.length === 0}
        >
          DONE ({selected.length})
        </Button>
      </div>
    </div>
  );
};
