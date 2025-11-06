import { ChevronLeft } from "lucide-react";
import iconReceipt from "@/assets/icon-receipt-tx.png";
import iconUser from "@/assets/icon-user-tx.png";
import iconPrint from "@/assets/icon-print-tx.png";
import iconPayment from "@/assets/icon-payment-card.png";

interface Product {
  name: string;
  size: string;
  color: string;
  price: number;
}

interface TransactionDetailScreenProps {
  transactionId: string;
  amount: number;
  customer: string;
  products: Product[];
  onBack: () => void;
  onRefund: () => void;
}

export const TransactionDetailScreen = ({
  transactionId,
  amount,
  customer,
  products,
  onBack,
  onRefund,
}: TransactionDetailScreenProps) => {
  const subTotal = products.reduce((sum, product) => sum + product.price, 0);
  const discount = 0;
  const taxRate = 0.08;
  const tax = subTotal * taxRate;
  const totalDue = subTotal - discount + tax;

  return (
    <div className="h-full flex justify-center bg-background">
      <div className="w-[186px] h-full flex flex-col p-[6px]">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-0">
              <ChevronLeft className="w-4 h-4 text-foreground" />
            </button>
            <span className="text-[16px] font-bold text-foreground">${amount.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 h-[28px] bg-muted rounded-full border border-border">
            <img src={iconReceipt} alt="" className="w-3.5 h-3.5" />
            <span className="text-[10px] font-medium text-foreground">Alex</span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {/* Transaction Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between h-[28px] px-2 border border-border rounded-lg">
              <span className="text-[12px] font-semibold text-foreground">#{transactionId}</span>
              <div className="flex items-center gap-1.5">
                <img src={iconUser} alt="" className="w-3 h-3" />
                <span className="text-[12px] text-foreground">{customer}</span>
              </div>
            </div>

            <div className="rounded-lg p-2 flex flex-col gap-1" style={{ backgroundColor: '#F1F2F5' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={iconPayment} alt="" className="w-4 h-4" />
                  <span className="text-[10px] font-medium text-foreground">Card | 0486</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className="text-[12px] font-bold text-foreground">${amount.toFixed(2)}</span>
                  <span className="text-[8px] font-semibold text-success">Paid</span>
                </div>
              </div>
              <div className="text-[8px] text-muted-foreground text-center">27 Aug 25 | 3:55 PM</div>
            </div>
          </div>

          {/* Products Section */}
          <div className="py-1.5">
            <h3 className="text-[11px] font-medium text-muted-foreground mb-1">Products</h3>
            <div className="space-y-1">
              {products.map((product, index) => (
                <div key={index} className="flex items-start justify-between">
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

          {/* Billing Summary */}
          <div className="py-1.5 space-y-1 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-foreground">Sub Total</span>
              <span className="text-[9px] font-medium text-foreground">${subTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-foreground">Discount</span>
              <span className="text-[9px] font-medium text-foreground">${discount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-medium text-foreground">Tax @ 8%</span>
              <span className="text-[9px] font-medium text-foreground">${tax.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-border">
              <span className="text-[9px] font-medium text-foreground">Total Due</span>
              <span className="text-[9px] font-medium text-foreground">${totalDue.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Refund Button */}
        <div className="flex-shrink-0 pt-2.5 border-t border-border">
          <div className="flex items-center gap-2.5">
            <button className="w-[22px] h-[22px] rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <img src={iconPrint} alt="Print" className="w-[22px] h-[22px]" />
            </button>
            <button
              onClick={onRefund}
              className="flex-1 h-[28px] bg-foreground text-background rounded-full text-[12px] font-semibold hover:bg-foreground/90 transition-colors"
            >
              REFUND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
