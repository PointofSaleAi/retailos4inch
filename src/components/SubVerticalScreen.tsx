import { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubVerticalScreenProps {
  onBack: () => void;
  selectedSubVerticals: string[];
  onSelect: (subVerticals: string[]) => void;
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

export const SubVerticalScreen = ({ onBack, selectedSubVerticals, onSelect }: SubVerticalScreenProps) => {
  const [selected, setSelected] = useState<string[]>(selectedSubVerticals);

  const toggleSubVertical = (name: string) => {
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
          Select Sub Vertical
        </h1>
      </div>

      {/* Sub Vertical List */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        <div className="space-y-2">
          {subVerticals.map((subVertical) => {
            const isSelected = selected.includes(subVertical);
            return (
              <button
                key={subVertical}
                onClick={() => toggleSubVertical(subVertical)}
                className={`w-full h-[34px] px-3 rounded-full border flex items-center transition-colors ${
                  isSelected 
                    ? "border-foreground bg-foreground text-white" 
                    : "border-[#D1D1D1] bg-white hover:bg-[#F5F5F5]"
                }`}
              >
                <span className={`text-[10px] font-medium flex-1 text-left ${isSelected ? "text-white" : "text-foreground"}`}>
                  {subVertical}
                </span>
                {isSelected && <Check size={14} className="text-white" />}
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
