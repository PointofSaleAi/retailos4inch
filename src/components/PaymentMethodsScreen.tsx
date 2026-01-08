import { X } from 'lucide-react';
import iconCardTap from '@/assets/icon-payment-card-tap.png';
import iconCash from '@/assets/icon-payment-cash-new.png';
import iconSplitCheck from '@/assets/icon-split-check.png';
import iconGiftCard from '@/assets/icon-gift-card-new.png';
import iconPayByLink from '@/assets/icon-pay-by-link.png';
import iconQrCode from '@/assets/icon-qr-code.png';
import iconAccount from '@/assets/icon-account.png';
import iconLoyalty from '@/assets/icon-loyalty.png';
import iconManualCC from '@/assets/icon-manual-cc.png';
import iconManualCard from '@/assets/icon-manual-card.png';
import iconExternalCC from '@/assets/icon-external-cc.png';
interface PaymentMethodsScreenProps {
  totalDue: number;
  remainingBalance?: number;
  onBack: () => void;
  onSelectMethod: (method: string) => void;
}
export const PaymentMethodsScreen = ({
  totalDue,
  remainingBalance,
  onBack,
  onSelectMethod
}: PaymentMethodsScreenProps) => {
  const isPartialPayment = remainingBalance !== undefined && remainingBalance > 0 && remainingBalance < totalDue;
  const paymentMethods = [{
    id: 'Card',
    label: 'Card',
    icon: iconCardTap
  }, {
    id: 'Cash',
    label: 'Cash',
    icon: iconCash
  }, {
    id: 'Split Check',
    label: 'Split Check',
    icon: iconSplitCheck
  }, {
    id: 'Gift Card',
    label: 'Gift Card',
    icon: iconGiftCard
  }, {
    id: 'Pay by Link',
    label: 'Pay by Link',
    icon: iconPayByLink
  }, {
    id: 'QR Code',
    label: 'QR Code',
    icon: iconQrCode
  }, {
    id: 'Account',
    label: 'Account',
    icon: iconAccount
  }, {
    id: 'Loyalty',
    label: 'Loyalty',
    icon: iconLoyalty
  }, {
    id: 'Manual CC',
    label: 'Manual CC',
    icon: iconManualCC
  }, {
    id: 'Manual Card',
    label: 'Manual Card',
    icon: iconManualCard
  }, {
    id: 'External CC',
    label: 'External CC',
    icon: iconExternalCC
  }];
  return <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" style={{
    fontFamily: 'Montserrat, sans-serif'
  }}>
      {/* Header */}
      <div className="h-[40px] relative px-0 flex items-center justify-center">
        <div className="flex items-baseline gap-1">
          <span className="text-[11px] font-semibold text-gray-900">
            {isPartialPayment ? 'Remaining' : 'Total Due'}
          </span>
          <span className="text-[13px] font-bold text-[#FF4D6A]">${totalDue.toFixed(2)}</span>
        </div>
        <button onClick={onBack} className="absolute right-2 p-1">
          <X className="w-[16px] h-[16px] text-gray-600" />
        </button>
      </div>

      {/* Partial Payment Indicator */}
      {isPartialPayment && (
        <div className="bg-[#E8F5E9] border border-[#A5D6A7] rounded-md mx-1 px-2 py-1.5 mb-1">
          <p className="text-[8px] text-[#2E7D32] font-medium text-center">
            Partial payment in progress
          </p>
        </div>
      )}

      {/* Title */}
      <div className="text-center py-0">
        <h2 className="text-[10px] font-medium text-gray-700 text-center px-0 py-0 my-[6px]">Choose Payment Method</h2>
      </div>

      {/* Payment Methods Grid */}
      <div className="flex-1 overflow-y-auto px-0">
        {/* First 9 items in 3-column grid */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-4">
          {paymentMethods.slice(0, 9).map(method => <button key={method.id} onClick={() => onSelectMethod(method.id)} className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center border border-[#E0E0E0] bg-white hover:bg-gray-50 transition-colors shadow-sm">
                <img src={method.icon} alt={method.label} className="w-[24px] h-[24px] object-contain" />
              </div>
              <span className="text-[8px] font-medium mt-1.5 text-gray-600 whitespace-nowrap">
                {method.label}
              </span>
            </button>)}
        </div>
        {/* Last 2 items centered */}
        <div className="flex justify-center gap-x-3 mt-4">
          {paymentMethods.slice(9).map(method => <button key={method.id} onClick={() => onSelectMethod(method.id)} className="flex flex-col items-center">
              <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center border border-[#E0E0E0] bg-white hover:bg-gray-50 transition-colors shadow-sm">
                <img src={method.icon} alt={method.label} className="w-[24px] h-[24px] object-contain" />
              </div>
              <span className="text-[8px] font-medium mt-1.5 text-gray-600 whitespace-nowrap">
                {method.label}
              </span>
            </button>)}
        </div>
      </div>
    </div>;
};