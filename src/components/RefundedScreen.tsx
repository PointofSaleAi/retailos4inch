import { useEffect } from "react";
import { X } from "lucide-react";
import iconPayment from "@/assets/icon-payment-card.png";

interface RefundedScreenProps {
  amount: number;
  paymentMethod: string;
  onClose: () => void;
}

export const RefundedScreen = ({
  amount,
  paymentMethod,
  onClose
}: RefundedScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="h-full flex items-center justify-center bg-background p-[6px]">
      <div className="w-[186px] h-full flex flex-col relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[6px] right-0 p-0 z-10"
        >
          <X className="w-5 h-5 text-foreground" strokeWidth={2} />
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Success Icon */}
          <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: '#10B981' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M10 24L18 32L38 12" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Amount and Status */}
          <div className="text-center mb-4">
            <span className="text-[32px] font-bold" style={{ color: '#10B981' }}>
              ${amount.toFixed(2)}
            </span>
            <span className="text-[32px] font-bold text-muted-foreground ml-2">
              Refunded
            </span>
          </div>

          {/* Payment Method */}
          <div className="flex items-center gap-2">
            <img src={iconPayment} alt="" className="w-5 h-5" />
            <span className="text-[14px] font-medium text-foreground">
              {paymentMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
