import { useState } from 'react';
import { Minus, Plus, ChevronLeft } from 'lucide-react';
import iconDiscountTag from '@/assets/icon-discount-tag.png';
import iconPrinter from '@/assets/icon-printer.png';
import iconSplitEvenly from '@/assets/icon-split-evenly.png';
import iconCustomSplit from '@/assets/icon-custom-split.png';
import iconSave from '@/assets/icon-save.png';
import iconClearRed from '@/assets/icon-clear-red.png';
import iconDocument from '@/assets/icon-document.png';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface SplitCheckScreenProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPay: (checkIndex: number, amount: number) => void;
  onProceedToSummary?: (numberOfChecks: number, splitMode: 'evenly' | 'custom') => void;
}

type SplitMode = 'evenly' | 'custom';

interface Check {
  id: number;
  items: { itemId: string; quantity: number }[];
}

export const SplitCheckScreen = ({
  cartItems,
  onBack,
  onPay,
  onProceedToSummary
}: SplitCheckScreenProps) => {
  const [splitMode, setSplitMode] = useState<SplitMode>('evenly');
  const [numberOfChecks, setNumberOfChecks] = useState(1);
  const [customChecks, setCustomChecks] = useState<Check[]>([{ id: 1, items: [] }]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const TAX_RATE = 0.15;
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subTotal * TAX_RATE;
  const total = subTotal + tax;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const perCheckAmount = numberOfChecks > 0 ? total / numberOfChecks : total;

  const handleIncrementChecks = () => {
    const newCount = numberOfChecks + 1;
    setNumberOfChecks(newCount);
    if (splitMode === 'custom') {
      setCustomChecks(prev => [...prev, { id: newCount, items: [] }]);
    }
  };

  const handleDecrementChecks = () => {
    if (numberOfChecks > 1) {
      const newCount = numberOfChecks - 1;
      setNumberOfChecks(newCount);
      if (splitMode === 'custom') {
        setCustomChecks(prev => prev.slice(0, newCount));
      }
    }
  };

  const getCheckItems = (checkIndex: number) => {
    if (splitMode === 'evenly') {
      return cartItems;
    }
    const check = customChecks[checkIndex];
    if (!check) return [];
    return check.items.map(ci => {
      const item = cartItems.find(i => i.id === ci.itemId);
      return item ? { ...item, quantity: ci.quantity } : null;
    }).filter(Boolean) as CartItem[];
  };

  const getCheckTotal = (checkIndex: number) => {
    if (splitMode === 'evenly') {
      return perCheckAmount;
    }
    const items = getCheckItems(checkIndex);
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return itemTotal + (itemTotal * TAX_RATE);
  };

  const addItemToCheck = (itemId: string, checkIndex: number) => {
    if (splitMode !== 'custom') return;
    
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    const totalAssigned = customChecks.reduce((sum, check) => {
      const checkItem = check.items.find(ci => ci.itemId === itemId);
      return sum + (checkItem?.quantity || 0);
    }, 0);

    if (totalAssigned < item.quantity) {
      setCustomChecks(prev => prev.map((check, idx) => {
        if (idx !== checkIndex) return check;
        const existingItem = check.items.find(ci => ci.itemId === itemId);
        if (existingItem) {
          return {
            ...check,
            items: check.items.map(ci => 
              ci.itemId === itemId ? { ...ci, quantity: ci.quantity + 1 } : ci
            )
          };
        } else {
          return {
            ...check,
            items: [...check.items, { itemId, quantity: 1 }]
          };
        }
      }));
    }
  };

  const removeItemFromCheck = (itemId: string, checkIndex: number) => {
    if (splitMode !== 'custom') return;
    
    setCustomChecks(prev => prev.map((check, idx) => {
      if (idx !== checkIndex) return check;
      const existingItem = check.items.find(ci => ci.itemId === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return {
          ...check,
          items: check.items.map(ci => 
            ci.itemId === itemId ? { ...ci, quantity: ci.quantity - 1 } : ci
          )
        };
      } else {
        return {
          ...check,
          items: check.items.filter(ci => ci.itemId !== itemId)
        };
      }
    }));
  };

  const handleModeChange = (mode: SplitMode) => {
    setSplitMode(mode);
    if (mode === 'custom') {
      const checks: Check[] = Array.from({ length: numberOfChecks }, (_, i) => ({
        id: i + 1,
        items: []
      }));
      setCustomChecks(checks);
    }
  };

  const handlePayClick = () => {
    setShowDisclaimer(true);
  };

  const handleDisclaimerProceed = () => {
    setShowDisclaimer(false);
    if (onProceedToSummary) {
      onProceedToSummary(numberOfChecks, splitMode);
    }
  };

  const getCheckLabel = (index: number) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return `Check ${index + 1} - ${letters[index] || index + 1}`;
  };

  return (
    <div 
      className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden px-[6px]"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-2.5 flex-shrink-0">
        <button onClick={onBack} className="p-0">
          <ChevronLeft size={18} className="text-black" strokeWidth={2} />
        </button>
        <h1 className="text-[13px] font-semibold text-black">Split Check</h1>
        <div className="flex items-center gap-2">
          <button className="p-0">
            <img src={iconDiscountTag} alt="Discount" className="w-[18px] h-[18px]" />
          </button>
          <button className="p-0">
            <img src={iconPrinter} alt="Print" className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Split Mode Tabs - Same line with horizontal scrolling */}
      <div className="flex gap-1.5 flex-shrink-0 pb-2 overflow-x-auto scrollbar-hide">
        <button
          onClick={() => handleModeChange('evenly')}
          className={`flex-shrink-0 h-[28px] px-3 rounded-full text-[8px] font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
            splitMode === 'evenly' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          <img 
            src={iconSplitEvenly} 
            alt="" 
            className={`w-[14px] h-[14px] ${splitMode === 'evenly' ? 'invert' : ''}`} 
          />
          SPLIT EVENLY
        </button>
        <button
          onClick={() => handleModeChange('custom')}
          className={`flex-shrink-0 h-[28px] px-3 rounded-full text-[8px] font-semibold flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap ${
            splitMode === 'custom' 
              ? 'bg-black text-white' 
              : 'bg-gray-100 text-gray-500'
          }`}
        >
          <img 
            src={iconCustomSplit} 
            alt="" 
            className={`w-[14px] h-[14px] ${splitMode === 'custom' ? 'invert' : ''}`} 
          />
          CUSTOM SPLIT
        </button>
      </div>

      {/* Number of Checks */}
      <div className="px-3 py-2 border border-gray-300 rounded-lg flex items-center justify-between flex-shrink-0 mb-2">
        <span className="text-[11px] font-medium text-black">No. of Checks</span>
        <div className="flex items-center bg-black rounded-full">
          <button 
            onClick={handleDecrementChecks}
            className="w-[26px] h-[26px] flex items-center justify-center text-white"
          >
            <Minus size={14} strokeWidth={2} />
          </button>
          <span className="text-[12px] font-semibold text-white min-w-[16px] text-center">
            {numberOfChecks}
          </span>
          <button 
            onClick={handleIncrementChecks}
            className="w-[26px] h-[26px] flex items-center justify-center text-white"
          >
            <Plus size={14} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Products List */}
        <div className="border border-gray-300 rounded-lg">
          <div className="px-3 py-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-start justify-between py-1.5">
                <div className="flex-1 min-w-0 pr-2">
                  <span className="text-[11px] font-medium text-black leading-tight">
                    {item.quantity}  {item.name}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-black flex-shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Billing Summary */}
          <div className="px-3 py-2 space-y-1.5 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="text-[11px] text-gray-500">Sub Total</span>
              <span className="text-[11px] font-medium text-black">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] text-gray-500">Tax</span>
              <span className="text-[11px] font-medium text-black">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] font-bold text-black">Total</span>
              <span className="text-[11px] font-bold text-black">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Stacked Check Summaries */}
        {numberOfChecks > 1 && (
          <div className="mt-2 space-y-2">
            {Array.from({ length: numberOfChecks }, (_, i) => (
              <div key={i} className="border border-gray-300 rounded-lg">
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between py-1.5 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <img src={iconDocument} alt="" className="w-[14px] h-[14px]" />
                      <span className="text-[10px] font-medium text-black">
                        {getCheckLabel(i)}
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {splitMode === 'evenly' ? totalItems : getCheckItems(i).reduce((sum, item) => sum + item.quantity, 0)} Items
                    </span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-[10px] font-bold text-black">Total Amount</span>
                    <span className="text-[10px] font-bold text-black">
                      ${getCheckTotal(i).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Single Check Summary (when only 1 check) */}
        {numberOfChecks === 1 && (
          <div className="mt-2 border border-gray-300 rounded-lg">
            <div className="px-3 py-2">
              <div className="flex items-center justify-between py-1.5 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <img src={iconDocument} alt="" className="w-[16px] h-[16px]" />
                  <span className="text-[11px] font-medium text-black">
                    Check 1
                  </span>
                </div>
                <span className="text-[11px] text-gray-500">
                  {totalItems} Items
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-[11px] font-bold text-black">Total Amount</span>
                <span className="text-[11px] font-bold text-black">
                  ${getCheckTotal(0).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-2 py-2 border-t border-gray-200 flex-shrink-0">
        <button className="w-[32px] h-[32px] flex items-center justify-center">
          <img src={iconSave} alt="Save" className="w-[22px] h-[22px]" />
        </button>
        <button className="w-[32px] h-[32px] flex items-center justify-center">
          <img src={iconClearRed} alt="Clear" className="w-[22px] h-[22px]" />
        </button>
        <button 
          onClick={handlePayClick}
          className="flex-1 h-[32px] bg-black text-white rounded-full font-semibold text-[12px] flex items-center justify-center"
        >
          PAY
        </button>
      </div>

      {/* Disclaimer Dialog */}
      <AlertDialog open={showDisclaimer} onOpenChange={setShowDisclaimer}>
        <AlertDialogContent className="w-[160px] rounded-2xl p-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[13px] font-bold text-black">Disclaimer</AlertDialogTitle>
            <AlertDialogDescription className="text-[10px] text-gray-700 leading-relaxed">
              Product additions are not allowed after check has been split. Please remerge and save to add more items or start a new order
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row gap-2 mt-3">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="flex-1 h-[28px] bg-gray-100 text-black rounded-full font-semibold text-[10px]"
            >
              Close
            </button>
            <button
              onClick={handleDisclaimerProceed}
              className="flex-1 h-[28px] bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-full font-semibold text-[10px]"
            >
              Proceed
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};