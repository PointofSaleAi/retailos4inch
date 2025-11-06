import { ChevronLeft } from "lucide-react";
import iconDocument from "@/assets/icon-receipt-print.png";

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
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5 border-b border-border">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-0">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <span className="text-[16px] font-bold text-foreground">${amount.toFixed(2)}</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted rounded-full">
          <img src={iconDocument} alt="" className="w-3.5 h-3.5" />
          <span className="text-[10px] font-medium text-foreground">Alex</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3">
        {/* Transaction Info */}
        <div className="py-2.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-foreground">#{transactionId}</span>
            <div className="flex items-center gap-1.5">
              <img src={iconDocument} alt="" className="w-3 h-3" />
              <span className="text-[12px] text-foreground">{customer}</span>
            </div>
          </div>

          <div className="bg-surface rounded-lg p-2.5 border border-border space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src={iconDocument} alt="" className="w-4 h-4" />
                <span className="text-[12px] font-medium text-foreground">Card | 0486</span>
              </div>
              <span className="text-[14px] font-bold text-foreground">${amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">27 Aug 25 | 3:55 PM</span>
              <span className="text-[10px] font-semibold text-success">Paid</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="py-2.5">
          <h3 className="text-[11px] font-medium text-muted-foreground mb-2.5">Products</h3>
          <div className="space-y-2.5">
            {products.map((product, index) => (
              <div key={index} className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-[12px] font-medium text-foreground mb-0.5">{product.name}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {product.size} | {product.color}
                  </p>
                </div>
                <span className="text-[14px] font-bold text-foreground">${product.price.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Billing Summary */}
        <div className="py-2.5 space-y-1.5 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-foreground">Sub Total</span>
            <span className="text-[12px] text-foreground">${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-foreground">Discount</span>
            <span className="text-[12px] text-foreground">${discount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-foreground">Tax @ 8%</span>
            <span className="text-[12px] text-foreground">${tax.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between pt-1.5 border-t border-border">
            <span className="text-[14px] font-bold text-foreground">Total Due</span>
            <span className="text-[16px] font-bold text-foreground">${totalDue.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Refund Button */}
      <div className="flex-shrink-0 px-3 py-2.5 border-t border-border">
        <div className="flex items-center gap-2.5">
          <button className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
            <img src={iconDocument} alt="Print" className="w-7 h-7" />
          </button>
          <button
            onClick={onRefund}
            className="flex-1 h-7 bg-foreground text-background rounded-full text-[12px] font-semibold hover:bg-foreground/90 transition-colors"
          >
            REFUND
          </button>
        </div>
      </div>
    </div>
  );
};
