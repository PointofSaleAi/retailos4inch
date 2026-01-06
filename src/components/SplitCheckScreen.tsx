import { useState } from 'react';
import { Minus, Plus, ChevronLeft } from 'lucide-react';
import iconDiscountTag from '@/assets/icon-discount-tag.png';
import iconPrinter from '@/assets/icon-printer.png';
import iconSplitEvenly from '@/assets/icon-split-evenly.png';
import iconCustomSplit from '@/assets/icon-custom-split.png';
import iconSave from '@/assets/icon-save.png';
import iconClearRed from '@/assets/icon-clear-red.png';
import iconDocument from '@/assets/icon-document.png';

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
}

type SplitMode = 'evenly' | 'custom';

interface Check {
  id: number;
  items: { itemId: string; quantity: number }[];
}

export const SplitCheckScreen = ({
  cartItems,
  onBack,
  onPay
}: SplitCheckScreenProps) => {
  const [splitMode, setSplitMode] = useState<SplitMode>('evenly');
  const [numberOfChecks, setNumberOfChecks] = useState(1);
  const [activeCheckIndex, setActiveCheckIndex] = useState(0);
  const [customChecks, setCustomChecks] = useState<Check[]>([{ id: 1, items: [] }]);

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
      if (activeCheckIndex >= newCount) {
        setActiveCheckIndex(newCount - 1);
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

  const addItemToCheck = (itemId: string) => {
    if (splitMode !== 'custom') return;
    
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    const totalAssigned = customChecks.reduce((sum, check) => {
      const checkItem = check.items.find(ci => ci.itemId === itemId);
      return sum + (checkItem?.quantity || 0);
    }, 0);

    if (totalAssigned < item.quantity) {
      setCustomChecks(prev => prev.map((check, idx) => {
        if (idx !== activeCheckIndex) return check;
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

  const removeItemFromCheck = (itemId: string) => {
    if (splitMode !== 'custom') return;
    
    setCustomChecks(prev => prev.map((check, idx) => {
      if (idx !== activeCheckIndex) return check;
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
                {splitMode === 'custom' && (
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => removeItemFromCheck(item.id)}
                      className="w-4 h-4 flex items-center justify-center border border-gray-300 rounded-full"
                    >
                      <Minus size={8} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => addItemToCheck(item.id)}
                      className="w-4 h-4 flex items-center justify-center border border-gray-300 rounded-full"
                    >
                      <Plus size={8} className="text-gray-600" />
                    </button>
                  </div>
                )}
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

        {/* Check Tabs - Above Check Summary */}
        {numberOfChecks > 1 && (
          <div className="flex gap-1 py-2 overflow-x-auto scrollbar-hide">
            {Array.from({ length: numberOfChecks }, (_, i) => (
              <button
                key={i}
                onClick={() => setActiveCheckIndex(i)}
                className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[9px] font-medium whitespace-nowrap ${
                  activeCheckIndex === i 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Check {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* Check Summary */}
        <div className="mt-2 border border-gray-300 rounded-lg">
          <div className="px-3 py-2">
            <div className="flex items-center justify-between py-1.5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={iconDocument} alt="" className="w-[16px] h-[16px]" />
                <span className="text-[11px] font-medium text-black">
                  Check {activeCheckIndex + 1} {splitMode === 'evenly' ? 'a' : ''}
                </span>
              </div>
              <span className="text-[11px] text-gray-500">
                {splitMode === 'evenly' ? totalItems : getCheckItems(activeCheckIndex).reduce((sum, i) => sum + i.quantity, 0)} Item
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[11px] font-bold text-black">Total Amount</span>
              <span className="text-[11px] font-bold text-black">
                ${getCheckTotal(activeCheckIndex).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
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
          onClick={() => onPay(activeCheckIndex, getCheckTotal(activeCheckIndex))}
          className="flex-1 h-[32px] bg-black text-white rounded-full font-semibold text-[12px] flex items-center justify-center"
        >
          PAY
        </button>
      </div>
    </div>
  );
};
