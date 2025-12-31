import { ChevronLeft } from "lucide-react";
import iconReceipt from "@/assets/icon-receipt-tx.png";
import iconUser from "@/assets/icon-user-tx.png";
import iconPayment from "@/assets/icon-payment-card.png";
import iconSuccessRefund from "@/assets/icon-success-refund.png";

interface Product {
  name: string;
  size: string;
  color: string;
  price: number;
}

interface RefundDetailScreenProps {
  transactionId: string;
  amount: number;
  customer: string;
  products: Product[];
  refundDate: string;
  refundTime: string;
  refundReason: string;
  paymentMethod: string;
  onBack: () => void;
}

export const RefundDetailScreen = ({
  transactionId,
  amount,
  customer,
  products,
  refundDate,
  refundTime,
  refundReason,
  paymentMethod,
  onBack
}: RefundDetailScreenProps) => {
  const subTotal = products.reduce((sum, product) => sum + product.price, 0);
  const taxRate = 0.08;
  const tax = subTotal * taxRate;
  const totalRefunded = subTotal + tax;

  return (
    <div className="h-full flex justify-center bg-background">
      <div className="w-[186px] h-full flex flex-col p-[6px] px-0">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-0">
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <span className="text-[16px] font-bold text-destructive">${amount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 h-[28px] bg-muted rounded-full border border-border">
            <img src={iconReceipt} alt="" className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium text-foreground">Refunded</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Transaction Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between h-[28px] border border-border rounded-lg px-[6px]">
              <span className="text-[12px] font-semibold text-foreground">#{transactionId}</span>
              <div className="flex items-center gap-1.5">
                <img src={iconUser} alt="" className="w-3 h-3" />
                <span className="text-[12px] text-foreground">{customer}</span>
              </div>
            </div>

            {/* Refund Status Card */}
            <div 
              style={{ backgroundColor: '#FEE2E2' }} 
              className="rounded-lg p-2 flex flex-col gap-1 px-[6px] py-[8px]"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <img src={iconSuccessRefund} alt="" className="w-4 h-4" />
                    <span className="text-[10px] font-medium text-foreground">Refunded</span>
                  </div>
                  <span className="text-[8px] text-muted-foreground">{refundDate} | {refundTime}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[12px] font-bold text-destructive">-${amount.toFixed(2)}</span>
                  <span className="text-[8px] font-semibold text-destructive">Refunded</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div 
              style={{ backgroundColor: '#F1F2F5' }} 
              className="rounded-lg p-2 flex items-center gap-2 px-[6px] py-[8px]"
            >
              <img src={iconPayment} alt="" className="w-4 h-4" />
              <span className="text-[10px] font-medium text-foreground">{paymentMethod}</span>
            </div>
          </div>

          {/* Refund Reason Section */}
          <div className="py-[8px]">
            <h3 className="text-[11px] font-medium text-muted-foreground mb-1">Refund Reason</h3>
            <div 
              className="rounded-lg p-2 px-[6px] py-[8px] border border-border"
            >
              <p className="text-[10px] font-medium text-foreground">{refundReason}</p>
            </div>
          </div>

          {/* Products Section */}
          <div className="py-[8px]">
            <h3 className="text-[11px] font-medium text-muted-foreground mb-1">Refunded Products</h3>
            <div className="space-y-1">
              {products.map((product, index) => (
                <div key={index} className="flex items-start justify-between py-0">
                  <div className="flex-1">
                    <p className="text-[10px] font-medium text-foreground mb-0.5">{product.name}</p>
                    <p className="text-[9px] text-muted-foreground">
                      {product.size} | {product.color}
                    </p>
                  </div>
                  <span className="text-[10px] font-medium text-foreground">${product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Summary */}
          <div className="space-y-1 border-t border-border py-[8px]">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-foreground">Sub Total</span>
              <span className="text-[9px] font-medium text-foreground">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-foreground">Tax @ 8%</span>
              <span className="text-[9px] font-medium text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-border">
              <span className="text-[9px] font-medium text-foreground">Total Refunded</span>
              <span className="text-[9px] font-bold text-destructive">-${totalRefunded.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
