import { useState } from 'react';
import { Minus, Plus, ChevronLeft, Settings, Printer } from 'lucide-react';

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

  // Calculate per-check amount for even split
  const perCheckAmount = numberOfChecks > 0 ? total / numberOfChecks : total;

  // Handle increment/decrement of number of checks
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

  // Get items for current check in custom mode
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

  // Get check total in custom mode
  const getCheckTotal = (checkIndex: number) => {
    if (splitMode === 'evenly') {
      return perCheckAmount;
    }
    const items = getCheckItems(checkIndex);
    const itemTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return itemTotal + (itemTotal * TAX_RATE);
  };

  // Add item to current check in custom mode
  const addItemToCheck = (itemId: string) => {
    if (splitMode !== 'custom') return;
    
    const item = cartItems.find(i => i.id === itemId);
    if (!item) return;

    // Calculate how many of this item are already assigned across all checks
    const totalAssigned = customChecks.reduce((sum, check) => {
      const checkItem = check.items.find(ci => ci.itemId === itemId);
      return sum + (checkItem?.quantity || 0);
    }, 0);

    // Can only add if there are unassigned items
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

  // Remove item from current check in custom mode
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
      // Initialize custom checks based on current number
      const checks: Check[] = Array.from({ length: numberOfChecks }, (_, i) => ({
        id: i + 1,
        items: []
      }));
      setCustomChecks(checks);
    }
  };

  return (
    <div 
      className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-[32px] px-2 flex-shrink-0">
        <button onClick={onBack} className="p-0.5">
          <ChevronLeft size={16} className="text-gray-700" />
        </button>
        <h1 className="text-[10px] font-semibold text-gray-900">Split Check</h1>
        <div className="flex items-center gap-1">
          <button className="p-0.5">
            <Settings size={14} className="text-gray-700" />
          </button>
          <button className="p-0.5">
            <Printer size={14} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Split Mode Tabs */}
      <div className="flex px-2 gap-1 flex-shrink-0">
        <button
          onClick={() => handleModeChange('evenly')}
          className={`flex-1 h-[24px] rounded-full text-[8px] font-semibold flex items-center justify-center gap-1 transition-colors ${
            splitMode === 'evenly' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <span className="text-[10px]">👥</span>
          SPLIT EVENLY
        </button>
        <button
          onClick={() => handleModeChange('custom')}
          className={`flex-1 h-[24px] rounded-full text-[8px] font-semibold flex items-center justify-center gap-1 transition-colors ${
            splitMode === 'custom' 
              ? 'bg-gray-900 text-white' 
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          <span className="text-[10px]">✂️</span>
          CUSTOM SPLIT
        </button>
      </div>

      {/* Number of Checks */}
      <div className="flex items-center justify-between px-2 py-2 border-b border-gray-100 flex-shrink-0">
        <span className="text-[9px] font-medium text-gray-800">No. of Checks</span>
        <div className="flex items-center gap-2 bg-gray-900 rounded-full px-2 py-1">
          <button 
            onClick={handleDecrementChecks}
            className="text-white"
          >
            <Minus size={12} />
          </button>
          <span className="text-[10px] font-semibold text-white min-w-[12px] text-center">
            {numberOfChecks}
          </span>
          <button 
            onClick={handleIncrementChecks}
            className="text-white"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Products List */}
        <div className="px-2 py-1 border-b border-gray-100">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between py-1">
              <div className="flex-1 min-w-0">
                <span className="text-[9px] font-medium text-gray-800">
                  {item.quantity} {item.name}
                </span>
              </div>
              <span className="text-[9px] font-medium text-gray-800 ml-2">
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
        <div className="px-2 py-1 space-y-0.5 border-b border-gray-100">
          <div className="flex justify-between">
            <span className="text-[9px] text-gray-600">Sub Total</span>
            <span className="text-[9px] text-gray-800">${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-gray-600">Tax</span>
            <span className="text-[9px] text-gray-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] font-semibold text-gray-900">Total</span>
            <span className="text-[9px] font-semibold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Check Summary */}
        <div className="px-2 py-1">
          <div className="flex items-center justify-between py-1 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <span className="text-[10px]">📄</span>
              <span className="text-[9px] font-medium text-gray-800">
                Check {activeCheckIndex + 1} {splitMode === 'evenly' ? 'a' : ''}
              </span>
            </div>
            <span className="text-[9px] text-gray-600">
              {splitMode === 'evenly' ? totalItems : getCheckItems(activeCheckIndex).reduce((sum, i) => sum + i.quantity, 0)} Item
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[9px] font-semibold text-gray-900">Total Amount</span>
            <span className="text-[9px] font-semibold text-gray-900">
              ${getCheckTotal(activeCheckIndex).toFixed(2)}
            </span>
          </div>
        </div>

        {/* Check Tabs for multiple checks */}
        {numberOfChecks > 1 && (
          <div className="flex gap-1 px-2 py-1 overflow-x-auto">
            {Array.from({ length: numberOfChecks }, (_, i) => (
              <button
                key={i}
                onClick={() => setActiveCheckIndex(i)}
                className={`px-2 py-1 rounded-full text-[8px] font-medium whitespace-nowrap ${
                  activeCheckIndex === i 
                    ? 'bg-gray-900 text-white' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Check {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex items-center gap-2 px-2 py-2 border-t border-gray-100 flex-shrink-0">
        <button className="w-[26px] h-[26px] flex items-center justify-center bg-gray-100 rounded-lg">
          <span className="text-[12px]">💾</span>
        </button>
        <button className="w-[26px] h-[26px] flex items-center justify-center bg-gray-100 rounded-lg">
          <span className="text-[14px] font-bold text-red-500">C</span>
        </button>
        <button 
          onClick={() => onPay(activeCheckIndex, getCheckTotal(activeCheckIndex))}
          className="flex-1 h-[26px] bg-gray-900 text-white rounded-full font-semibold text-[10px] flex items-center justify-center"
        >
          PAY
        </button>
      </div>
    </div>
  );
};
