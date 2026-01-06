import { useState, useEffect, useRef } from 'react';
import { Minus, Plus, ChevronLeft, MoreVertical } from 'lucide-react';
import iconNewOrder from '@/assets/icon-new-order-order-summary.png';
import iconSave from '@/assets/icon-save-order-summary.png';
import iconCustomer from '@/assets/icon-customer.png';
import iconAddTax from '@/assets/icon-add-tax.png';
import iconDiscount from '@/assets/icon-discount.png';
import iconGiftCard from '@/assets/icon-gift-card.png';
import iconClearCart from '@/assets/icon-clear-cart.png';
import iconAddCustomer from '@/assets/icon-add-customer.png';
import iconRedeemLoyalty from '@/assets/icon-redeem-loyalty.png';
import iconDeliveryCharge from '@/assets/icon-delivery-charge.png';
import iconCashier from '@/assets/icon-cashier.png';
interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  email?: string;
  loyaltyPoints?: number;
  customerSince?: string;
  tax?: string;
  companyName?: string;
  birthday?: string;
  anniversary?: string;
  address?: string;
  notes?: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  note?: string;
  size?: string;
  color?: string;
}
interface AppliedTax {
  id: string;
  name: string;
  rate: number;
  displayRate: string;
}

interface AppliedDiscount {
  id: string;
  name: string;
  amount: number;
  displayAmount: string;
}

interface OrderSummaryScreenProps {
  cartItems: CartItem[];
  selectedCustomer?: Customer | null;
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onNewOrder: () => void;
  onSaveOrder: () => void;
  onCharge: () => void;
  onAddTax?: () => void;
  onDiscount?: () => void;
  onGiftCard?: () => void;
  onClearCart?: () => void;
  onAddCustomer?: () => void;
  onRedeemLoyalty?: () => void;
  onDeliveryCharge?: () => void;
  appliedTax?: AppliedTax | null;
  appliedDiscount?: AppliedDiscount | null;
  deliveryCharge?: number;
}
export const OrderSummaryScreen = ({
  cartItems,
  selectedCustomer,
  onClose,
  onUpdateQuantity,
  onNewOrder,
  onSaveOrder,
  onCharge,
  onAddTax,
  onDiscount,
  onGiftCard,
  onClearCart,
  onAddCustomer,
  onRedeemLoyalty,
  onDeliveryCharge,
  appliedTax,
  appliedDiscount,
  deliveryCharge = 0
}: OrderSummaryScreenProps) => {
  const [customerName, setCustomerName] = useState(selectedCustomer?.name || 'Customer Name');
  const [customerPhone, setCustomerPhone] = useState(selectedCustomer?.phone || '(xxx) xxx xxxx');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);
  
  // Update customer info when selectedCustomer changes
  useEffect(() => {
    if (selectedCustomer) {
      setCustomerName(selectedCustomer.name);
      setCustomerPhone(selectedCustomer.phone);
    }
  }, [selectedCustomer]);

  // Close the More menu when tapping outside
  useEffect(() => {
    if (!isMoreMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = moreMenuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsMoreMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isMoreMenuOpen]);
  
  const customerPoints = selectedCustomer?.loyaltyPoints || 0;
  const pointsValue = customerPoints; // 1 point = $1.00
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedDiscount?.amount || 0;
  const taxRate = appliedTax?.rate || 0;
  const taxAmount = subtotal * taxRate;
  const total = subtotal - discountAmount + taxAmount + deliveryCharge;
  const handleQuantityChange = (id: string, delta: number) => {
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
      <div className="relative flex items-center justify-between h-[36px] px-0">
        <button onClick={onClose} className="p-1 px-0 py-0">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[10px] font-semibold text-gray-900">Order Summary</h1>

        <div ref={moreMenuRef} className="relative">
          <button
            type="button"
            onClick={() => setIsMoreMenuOpen(v => !v)}
            className="p-1"
            aria-label="More options"
            aria-expanded={isMoreMenuOpen}
          >
            <MoreVertical size={20} className="text-gray-700" />
          </button>

          {isMoreMenuOpen && (
            <>
              {/* Black overlay */}
              <div 
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsMoreMenuOpen(false)}
              />
              <div className="absolute right-0 top-[22px] z-50 w-[140px]">
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Add Tax', icon: iconAddTax, action: onAddTax },
                    { label: 'Discount', icon: iconDiscount, action: onDiscount },
                    { label: 'Gift Card', icon: iconGiftCard, action: onGiftCard },
                    { label: 'Clear Cart', icon: iconClearCart, action: onClearCart },
                    { label: 'Add Customer', icon: iconAddCustomer, action: onAddCustomer },
                    { label: 'Redeem Loyalty', icon: iconRedeemLoyalty, action: onRedeemLoyalty },
                    { label: 'Delivery Charge', icon: iconDeliveryCharge, action: onDeliveryCharge },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="flex h-[28px] w-full items-center gap-2 rounded-full bg-white px-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        item.action?.();
                      }}
                    >
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F1F2F5]">
                        <img src={item.icon} alt={item.label} className="h-[12px] w-[12px]" />
                      </span>
                      <span className="text-[10px] font-medium text-gray-900">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Amount Due */}
      <div className="text-center py-0">
        <div className="text-[12px] font-bold text-gray-900">
          Amount Due <span className="text-[#FF0000]">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Order Info Bar */}
        <div className="flex items-center justify-between bg-gray-100 px-2.5 py-1.5 mx-0 rounded mt-1">
          <div className="flex items-center gap-0.5">
            <span className="text-[10px] font-semibold text-black">#</span>
            <span className="text-[10px] font-semibold text-black">20</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={iconCashier} alt="Cashier" className="w-[10px] h-[10px]" />
            <span className="text-[10px] font-semibold text-black tracking-wide">JOHN</span>
          </div>
          <div className="flex items-center gap-0.5 bg-[#3D3D3D] px-2 py-0.5 rounded-full">
            <span className="text-[8px]">🕐</span>
            <span className="text-[8px] text-white font-medium">12:30 PM</span>
          </div>
        </div>

        {/* Customer Section */}
        <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-3 px-0 py-0 mx-0 my-2">
          <div className="w-7 h-7 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {selectedCustomer?.avatar ? (
              <img src={selectedCustomer.avatar} alt={customerName} className="w-full h-full object-cover" />
            ) : (
              <img src={iconCustomer} alt="Customer" className="w-[14px] h-[14px]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            {isEditingName ? <input type="text" value={customerName === 'Customer Name' ? '' : customerName} onChange={e => setCustomerName(e.target.value)} onBlur={() => {
              setIsEditingName(false);
              if (!customerName.trim()) setCustomerName('Customer Name');
            }} className="text-[10px] font-semibold text-gray-900 bg-transparent border-none outline-none w-full whitespace-nowrap" autoFocus /> : <div onClick={() => {
              setIsEditingName(true);
              if (customerName === 'Customer Name') setCustomerName('');
            }} className="text-[10px] font-semibold text-gray-900 cursor-pointer whitespace-nowrap truncate">
                {customerName}
              </div>}
            {isEditingPhone ? <input type="tel" value={customerPhone === '(xxx) xxx xxxx' ? '' : customerPhone} onChange={e => setCustomerPhone(e.target.value)} onBlur={() => {
              setIsEditingPhone(false);
              if (!customerPhone.trim()) setCustomerPhone('(xxx) xxx xxxx');
            }} className="text-[10px] text-gray-600 bg-transparent border-none outline-none w-full" autoFocus /> : <div onClick={() => {
              setIsEditingPhone(true);
              if (customerPhone === '(xxx) xxx xxxx') setCustomerPhone('');
            }} className="text-[10px] text-gray-600 cursor-pointer">
                {customerPhone}
              </div>}
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-[11px] font-semibold text-gray-900">{customerPoints} Points</div>
            <div className="text-[9px] text-gray-600">Value ${pointsValue.toFixed(2)}</div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="mt-3 space-y-3 px-0 my-[6px]">
          {cartItems.map(item => <div key={item.id} className="flex items-center gap-2 pb-3 border-b border-gray-100">
              {item.image ? (
                <img src={item.image} alt={item.name} className="w-[35px] h-[35px] object-cover rounded-md flex-shrink-0" />
              ) : (
                <div className="w-[35px] h-[35px] rounded-md flex-shrink-0 bg-gradient-to-br from-yellow-200 to-pink-200 flex items-center justify-center">
                  <span className="text-[16px]">🎁</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-[10px] font-semibold text-gray-900 leading-tight">
                  {item.name}
                </h3>
                {item.note && <p className="text-[8px] text-gray-600 mt-0.5">{item.note}</p>}
                {(item.size || item.color) && (
                  <p className="text-[8px] text-gray-600 mt-0.5">
                    {item.size && item.color ? `${item.size} | ${item.color}` : item.size || item.color}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <div className="text-[12px] font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => handleQuantityChange(item.id, -1)} className="w-4 h-4 flex items-center justify-center border border-gray-300 rounded-full">
                    <Minus size={8} className="text-gray-700" />
                  </button>
                  <span className="text-[10px] font-medium text-gray-900 w-4 text-center">
                    {item.quantity}
                  </span>
                  <button onClick={() => handleQuantityChange(item.id, 1)} className="w-4 h-4 flex items-center justify-center border border-gray-300 rounded-full">
                    <Plus size={8} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>)}
        </div>
      </div>

      {/* Billing Summary */}
      <div className="border-t border-gray-200 space-y-1 px-0 py-0">
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-medium text-[#212121]">Sub Total</span>
          <span className="text-[9px] font-medium text-[#212121]">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[9px] font-medium text-[#212121]">Discount</span>
          <span className="text-[9px] font-medium text-[#212121]">-${discountAmount.toFixed(2)}</span>
        </div>
        {appliedTax && (
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-medium text-[#212121]">Tax @ {appliedTax.displayRate}</span>
            <span className="text-[9px] font-medium text-[#212121]">${taxAmount.toFixed(2)}</span>
          </div>
        )}
        {deliveryCharge > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-[9px] font-medium text-[#212121]">Delivery</span>
            <span className="text-[9px] font-medium text-[#212121]">${deliveryCharge.toFixed(2)}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pb-3 pt-2 px-0 py-[6px]">
        <button onClick={onNewOrder} className="flex items-center justify-center rounded-lg bg-[#F1F2F5] p-1">
          <img src={iconNewOrder} alt="New Order" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={onSaveOrder} className="flex items-center justify-center rounded-lg bg-[#F1F2F5] p-1">
          <img src={iconSave} alt="Save" className="w-[18px] h-[18px]" />
        </button>
        <button onClick={onCharge} className="flex-1 h-[28px] bg-[#1A1A1A] text-white rounded-full font-bold text-[11px] flex items-center justify-center tracking-wide">
          CHARGE ${total.toFixed(2)}
        </button>
      </div>
    </div>;
};