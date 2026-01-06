import { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import iconDocument from '@/assets/icon-document.png';
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerOverlay,
} from '@/components/ui/drawer';

interface ItemAssignmentSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemName: string;
  numberOfChecks: number;
  selectedChecks: number[];
  onSave: (selectedChecks: number[]) => void;
}

export const ItemAssignmentSheet = ({
  open,
  onOpenChange,
  itemName,
  numberOfChecks,
  selectedChecks: initialSelectedChecks,
  onSave,
}: ItemAssignmentSheetProps) => {
  const [selectedChecks, setSelectedChecks] = useState<number[]>(initialSelectedChecks);

  useEffect(() => {
    setSelectedChecks(initialSelectedChecks);
  }, [initialSelectedChecks, open]);

  const getCheckLabel = (index: number) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return `Check 20 - ${letters[index] || index + 1}`;
  };

  const allChecks = Array.from({ length: numberOfChecks }, (_, i) => i);
  const allSelected = allChecks.every(check => selectedChecks.includes(check));

  const toggleCheck = (checkIndex: number) => {
    setSelectedChecks(prev => 
      prev.includes(checkIndex)
        ? prev.filter(c => c !== checkIndex)
        : [...prev, checkIndex]
    );
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedChecks([]);
    } else {
      setSelectedChecks(allChecks);
    }
  };

  const handleSave = () => {
    onSave(selectedChecks);
    onOpenChange(false);
  };

  const hasSelections = selectedChecks.length > 0;

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <DrawerOverlay className="fixed inset-0 bg-black/40 z-50" />
        <DrawerContent 
          className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] px-[16px] pt-[8px] pb-[16px]"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          {/* Drag Handle */}
          <div className="flex justify-center mb-[12px]">
            <div className="w-[40px] h-[4px] bg-gray-300 rounded-full" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between mb-[12px]">
            <h2 className="text-[16px] font-bold text-black">{itemName}</h2>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-1"
            >
              <X size={20} className="text-black" strokeWidth={2} />
            </button>
          </div>

          {/* Split With Label */}
          <p className="text-[12px] text-gray-400 font-medium mb-[10px]">Split With</p>

          {/* Select All Option */}
          <button
            onClick={toggleSelectAll}
            className={`w-full h-[44px] rounded-full border flex items-center justify-between px-[16px] mb-[8px] transition-all ${
              allSelected 
                ? 'border-gray-300 bg-white' 
                : 'border-gray-200 bg-white'
            }`}
          >
            <span className="text-[12px] font-medium text-black">Select All</span>
            <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center ${
              allSelected 
                ? 'bg-[#2d2d2d]' 
                : 'border border-gray-300 bg-white'
            }`}>
              {allSelected && <Check size={14} className="text-white" strokeWidth={3} />}
            </div>
          </button>

          {/* Check Options */}
          {allChecks.map((checkIndex) => {
            const isSelected = selectedChecks.includes(checkIndex);
            return (
              <button
                key={checkIndex}
                onClick={() => toggleCheck(checkIndex)}
                className={`w-full h-[44px] rounded-full border flex items-center justify-between px-[16px] mb-[8px] transition-all ${
                  isSelected 
                    ? 'border-gray-300 bg-white' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-center gap-[10px]">
                  <img src={iconDocument} alt="" className="w-[16px] h-[16px] opacity-60" />
                  <span className="text-[12px] font-medium text-black">
                    {getCheckLabel(checkIndex)}
                  </span>
                </div>
                <div className={`w-[24px] h-[24px] rounded-full flex items-center justify-center ${
                  isSelected 
                    ? 'bg-[#2d2d2d]' 
                    : 'border border-gray-300 bg-white'
                }`}>
                  {isSelected && <Check size={14} className="text-white" strokeWidth={3} />}
                </div>
              </button>
            );
          })}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={!hasSelections}
            className={`w-full h-[44px] rounded-full font-semibold text-[14px] mt-[8px] transition-all ${
              hasSelections
                ? 'bg-gradient-to-r from-[#3d3d3d] to-[#1a1a1a] text-white'
                : 'bg-gray-300 text-gray-500'
            }`}
          >
            SAVE
          </button>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
