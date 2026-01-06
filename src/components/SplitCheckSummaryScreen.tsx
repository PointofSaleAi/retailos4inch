import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

interface CheckData {
  id: number;
  label: string;
  amount: number;
  isPaid: boolean;
  paymentMethod?: string;
}

interface SplitCheckSummaryScreenProps {
  cartItems: CartItem[];
  numberOfChecks: number;
  splitMode: 'evenly' | 'custom';
  onBack: () => void;
  onChargeCheck: (checkIndex: number, amount: number) => void;
  onResetSplit: () => void;
}

export const SplitCheckSummaryScreen = ({
  cartItems,
  numberOfChecks,
  splitMode,
  onBack,
  onChargeCheck,
  onResetSplit
}: SplitCheckSummaryScreenProps) => {
  const TAX_RATE = 0.15;
  const DISCOUNT = 2.00;
  const SERVICE_CHARGE = 2.00;
  
  const subTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subTotal * TAX_RATE;
  const total = subTotal - DISCOUNT + SERVICE_CHARGE + tax;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  const perCheckAmount = numberOfChecks > 0 ? total / numberOfChecks : total;
  
  const [paidChecks, setPaidChecks] = useState<Set<number>>(new Set());
  const [expandedItems, setExpandedItems] = useState(false);

  const handleChargeCheck = (checkIndex: number) => {
    onChargeCheck(checkIndex, perCheckAmount);
  };

  const getCheckLabel = (index: number) => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    return `Check 20 - ${letters[index] || index + 1}`;
  };

  return (
    <div 
      className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center py-2.5 flex-shrink-0 relative px-[6px]">
        <button onClick={onBack} className="absolute left-[6px] p-0">
          <ChevronLeft size={18} className="text-black" strokeWidth={2} />
        </button>
        <h1 className="text-[13px] font-semibold text-black">Order Summary</h1>
      </div>

      {/* Amount Due */}
      <div className="text-center pb-2 flex-shrink-0 px-[6px]">
        <span className="text-[13px] font-semibold text-black">Amount Due </span>
        <span className="text-[13px] font-semibold text-[#FF4757]">${total.toFixed(2)}</span>
      </div>

      {/* Order Info Bar */}
      <div className="flex items-center justify-between bg-gray-100 px-3 py-1.5 flex-shrink-0 mx-[6px] rounded">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600">🍽️</span>
          <span className="text-[10px] font-medium text-black">20</span>
        </div>
        <span className="text-[10px] font-medium text-black">JOHN DOE</span>
        <div className="flex items-center gap-1 bg-gray-800 px-2 py-0.5 rounded-full">
          <span className="text-[8px] text-white">🕐 12:30 PM</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-[6px] mt-2">
        {/* Items Collapsible */}
        <button 
          onClick={() => setExpandedItems(!expandedItems)}
          className="w-full flex items-center justify-between bg-gray-100 px-3 py-2 rounded-lg mb-2"
        >
          <span className="text-[11px] font-medium text-black">{totalItems} Items</span>
          <ChevronRight 
            size={14} 
            className={`text-gray-600 transition-transform ${expandedItems ? 'rotate-90' : ''}`} 
          />
        </button>

        {expandedItems && (
          <div className="bg-gray-50 rounded-lg px-3 py-2 mb-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between py-1">
                <span className="text-[10px] text-gray-700">{item.quantity}x {item.name}</span>
                <span className="text-[10px] text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Billing Summary */}
        <div className="border border-gray-200 rounded-lg px-3 py-2 mb-2">
          <div className="flex justify-between py-1">
            <span className="text-[10px] text-gray-600">Sub Total</span>
            <span className="text-[10px] font-medium text-black">${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[10px] text-[#FF4757]">Discount</span>
            <span className="text-[10px] font-medium text-[#FF4757]">${DISCOUNT.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[10px] text-gray-600">Service Charge</span>
            <span className="text-[10px] font-medium text-black">${SERVICE_CHARGE.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-[10px] text-gray-600">Tax</span>
            <span className="text-[10px] font-medium text-black">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-gray-200 mt-1">
            <span className="text-[11px] font-bold text-black">Total Amount</span>
            <span className="text-[11px] font-bold text-black">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Individual Checks - Stacked Vertically */}
        {Array.from({ length: numberOfChecks }, (_, i) => (
          <div 
            key={i} 
            className="border border-gray-200 rounded-lg px-3 py-2 mb-2"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <img src={iconDocument} alt="" className="w-[14px] h-[14px]" />
                <span className="text-[10px] font-medium text-black">{getCheckLabel(i)}</span>
              </div>
              <button
                onClick={() => handleChargeCheck(i)}
                disabled={paidChecks.has(i)}
                className={`px-3 py-1 rounded-full text-[9px] font-semibold ${
                  paidChecks.has(i)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-700 text-white'
                }`}
              >
                {paidChecks.has(i) ? 'PAID' : 'CHARGE'}
              </button>
            </div>
            <div className="flex justify-between pt-1.5">
              <span className="text-[10px] font-bold text-black">Total Amount</span>
              <span className="text-[10px] font-bold text-black">${perCheckAmount.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="px-[6px] py-2 flex-shrink-0">
        <button 
          onClick={onResetSplit}
          className="w-full h-[32px] bg-gray-100 text-black rounded-full font-semibold text-[11px] flex items-center justify-center border border-gray-300"
        >
          RESET EVEN SPLIT
        </button>
      </div>
    </div>
  );
};
