import { useState } from 'react';
import { Minus, Plus, ChevronLeft, MoreVertical, User } from 'lucide-react';
import iconNewOrder from '@/assets/icon-new-order-order-summary.png';
import iconSave from '@/assets/icon-save-order-summary.png';
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface OrderSummaryScreenProps {
  cartItems: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}
export const OrderSummaryScreen = ({
  cartItems,
  onClose,
  onUpdateQuantity
}: OrderSummaryScreenProps) => {
  const [customerName, setCustomerName] = useState('Customer Name');
  const [customerPhone, setCustomerPhone] = useState('(xxx) xxx xxxx');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const TAX_RATE = 0.08;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal - discount + tax;
  const handleQuantityChange = (id: number, delta: number) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + delta);
      onUpdateQuantity(id, newQuantity);
    }
  };
  return <div className="w-[186px] h-full bg-white flex flex-col mx-auto" style={{
    fontFamily: 'Montserrat, sans-serif'
  }}>
      {/* Header */}
      <div className="flex items-center justify-between px-3 h-[36px]">
        <button onClick={onClose} className="p-1">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[14px] font-semibold text-gray-900">
          Current Sale ({cartItems.length})
        </h1>
        <button className="p-1">
          <MoreVertical size={20} className="text-gray-700" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Customer Section */}
        <div className="bg-gray-50 mt-3 rounded-lg p-3 flex items-center gap-3 px-0 py-0 mx-0 my-[6px]">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
            <User size={20} className="text-gray-600" />
          </div>
          <div className="flex-1 min-w-0">
            {isEditingName ? <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} onBlur={() => setIsEditingName(false)} className="text-[12px] font-semibold text-gray-900 bg-transparent border-none outline-none w-full" autoFocus /> : <div onClick={() => setIsEditingName(true)} className="text-[12px] font-semibold text-gray-900 cursor-pointer">
                {customerName}
              </div>}
            {isEditingPhone ? <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} onBlur={() => setIsEditingPhone(false)} className="text-[10px] text-gray-600 bg-transparent border-none outline-none w-full" autoFocus /> : <div onClick={() => setIsEditingPhone(true)} className="text-[10px] text-gray-600 cursor-pointer">
                {customerPhone}
              </div>}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] font-semibold text-gray-900">0 Points</div>
            <div className="text-[9px] text-gray-600">Value $0.00</div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="px-3 mt-3 space-y-3">
          {cartItems.map(item => <div key={item.id} className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-[11px] font-semibold text-gray-900 leading-tight">
                  {item.name}
                </h3>
                <p className="text-[9px] text-gray-600 mt-0.5">XS | Olive Green</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <div className="text-[13px] font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                    <Minus size={12} className="text-gray-700" />
                  </button>
                  <span className="text-[11px] font-medium text-gray-900 w-6 text-center">
                    {item.quantity}
                  </span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded">
                    <Plus size={12} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Billing Summary */}
      <div className="border-t border-gray-200 space-y-1 px-0 py-0">
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-700">Sub Total</span>
          <span className="text-[11px] font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-700">Discount</span>
          <span className="text-[11px] font-semibold text-gray-900">${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] text-gray-700">Tax @ 8%</span>
          <span className="text-[11px] font-semibold text-gray-900">${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
          <span className="text-[14px] font-bold text-gray-900">Total Due</span>
          <span className="text-[14px] font-bold text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pb-3 pt-2 px-0 py-[6px]">
        <button className="flex items-center justify-center rounded-lg bg-[#F1F2F5] p-1">
          <img src={iconNewOrder} alt="New Order" className="w-[18px] h-[18px]" />
        </button>
        <button className="flex items-center justify-center rounded-lg bg-[#F1F2F5] p-1">
          <img src={iconSave} alt="Save" className="w-[18px] h-[18px]" />
        </button>
        <button className="flex-1 h-[28px] bg-[#1A1A1A] text-white rounded-full font-bold text-[11px] flex items-center justify-center tracking-wide">
          CHARGE
        </button>
      </div>
    </div>;
};