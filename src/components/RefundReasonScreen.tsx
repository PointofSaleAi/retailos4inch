import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import iconPayment from "@/assets/icon-payment-card.png";

interface RefundReasonScreenProps {
  amount: number;
  paymentMethod: string;
  onBack: () => void;
  onRefund: (reason: string) => void;
  onOtherSelected: () => void;
}

const REFUND_REASONS = [
  "Color Mismatch",
  "Quality Concerns",
  "Defective Item",
  "Wrong Item",
  "Changed Mind",
  "Pricing Issues",
  "Other"
];

export const RefundReasonScreen = ({
  amount,
  paymentMethod,
  onBack,
  onRefund,
  onOtherSelected
}: RefundReasonScreenProps) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleRefund = () => {
    if (selectedReason) {
      onRefund(selectedReason);
    }
  };

  return (
    <div className="h-full flex items-center justify-center bg-background p-[6px]">
      <div className="w-[186px] h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-2 px-0 py-[6px]">
          <button onClick={onBack} className="p-0">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-[12px] font-semibold text-foreground">Reason</h1>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Refund Summary Card */}
          <div className="mb-3" style={{ backgroundColor: '#F1F2F5' }}>
            <div className="rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={iconPayment} alt="" className="w-4 h-4" />
                <div>
                  <p className="text-[10px] font-medium text-foreground">Refund To</p>
                  <p className="text-[10px] font-medium text-foreground">{paymentMethod}</p>
                </div>
              </div>
              <span className="text-[16px] font-bold text-foreground">
                ${amount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Reason Label */}
          <div className="mb-2">
            <p className="text-[11px] font-medium text-muted-foreground">Reason For Refund</p>
          </div>

          {/* Reason Options */}
          <div className="space-y-[3px]">
            {REFUND_REASONS.map((reason) => (
              <button
                key={reason}
                onClick={() => {
                  if (reason === "Other") {
                    onOtherSelected();
                  } else {
                    setSelectedReason(reason);
                  }
                }}
                className="w-full h-[28px] rounded-lg border border-border bg-background flex items-center justify-between px-3 transition-colors hover:bg-muted"
              >
                <span className="text-[10px] font-medium text-foreground">
                  {reason}
                </span>
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedReason === reason
                      ? "border-foreground"
                      : "border-border"
                  }`}
                >
                  {selectedReason === reason && (
                    <div className="w-2 h-2 rounded-full bg-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Refund Button */}
        <div className="flex-shrink-0 px-0 py-[6px]">
          <button
            onClick={handleRefund}
            disabled={!selectedReason}
            className="w-full h-[28px] rounded-full text-[12px] font-semibold transition-colors disabled:opacity-50"
            style={{
              backgroundColor: selectedReason ? "#212121" : "#BFBFBF",
              color: "#FFFFFF",
            }}
          >
            REFUND ${amount.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};
