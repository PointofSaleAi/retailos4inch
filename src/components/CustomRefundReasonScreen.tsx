import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface CustomRefundReasonScreenProps {
  onBack: () => void;
  onNext: (customReason: string) => void;
}

export const CustomRefundReasonScreen = ({
  onBack,
  onNext
}: CustomRefundReasonScreenProps) => {
  const [customReason, setCustomReason] = useState("");

  const handleNext = () => {
    if (customReason.trim()) {
      onNext(customReason.trim());
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
          <textarea
            value={customReason}
            onChange={(e) => setCustomReason(e.target.value)}
            placeholder="Enter custom reason..."
            className="w-full h-[120px] rounded-lg border border-border bg-background px-3 py-2 text-[10px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground resize-none"
            autoFocus
          />
        </div>

        {/* Next Button */}
        <div className="flex-shrink-0 px-0 py-[6px]">
          <button
            onClick={handleNext}
            disabled={!customReason.trim()}
            className="w-full h-[28px] rounded-full text-[12px] font-semibold transition-colors disabled:opacity-50"
            style={{
              backgroundColor: customReason.trim() ? "#212121" : "#BFBFBF",
              color: "#FFFFFF",
            }}
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
};
