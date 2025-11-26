import { ChevronLeft, Wifi, Banknote, ArrowUpDown, Gift, Link, QrCode, User, Crown, CreditCard, Smartphone, Upload } from 'lucide-react';

interface PaymentMethodsScreenProps {
  totalDue: number;
  onBack: () => void;
  onSelectMethod: (method: string) => void;
}

export const PaymentMethodsScreen = ({
  totalDue,
  onBack,
  onSelectMethod
}: PaymentMethodsScreenProps) => {
  const paymentMethods = [
    { id: 'Card', label: 'Card', icon: Wifi },
    { id: 'Cash', label: 'Cash', icon: Banknote },
    { id: 'Split Check', label: 'Split Check', icon: ArrowUpDown },
    { id: 'Gift Card', label: 'Gift Card', icon: Gift },
    { id: 'Pay by Link', label: 'Pay by Link', icon: Link },
    { id: 'QR Code', label: 'QR Code', icon: QrCode },
    { id: 'Account', label: 'Account', icon: User },
    { id: 'Loyalty', label: 'Loyalty', icon: Crown },
    { id: 'Manual CC', label: 'Manual CC', icon: CreditCard },
    { id: 'Manual Card', label: 'Manual Card', icon: Smartphone },
    { id: 'External CC', label: 'External CC', icon: Upload },
  ];

  return (
    <div 
      className="w-[186px] h-full bg-white flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[36px] px-0 relative">
        <button 
          onClick={onBack} 
          className="absolute left-0 p-1"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[12px] font-semibold text-gray-900">Total Due</span>
          <span className="text-[14px] font-bold text-red-500">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      {/* Title */}
      <div className="text-center py-2">
        <h2 className="text-[10px] font-medium text-gray-700">Choose Payment Method</h2>
      </div>

      {/* Payment Methods Grid */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button
                key={method.id}
                onClick={() => onSelectMethod(method.id)}
                className="flex flex-col items-center"
              >
                <div className="w-[48px] h-[48px] rounded-full flex items-center justify-center border border-[#E8E8E8] bg-white hover:bg-gray-50 transition-colors">
                  <Icon size={22} className="text-gray-500" strokeWidth={1.5} />
                </div>
                <span className="text-[8px] font-medium mt-1 text-gray-600 whitespace-nowrap">
                  {method.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
