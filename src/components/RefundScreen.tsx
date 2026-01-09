import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface Product {
  name: string;
  size: string;
  color: string;
  price: number;
  originalIndex?: number;
  unitIndex?: number;
  isRefunded?: boolean;
}

interface RefundScreenProps {
  products: Product[];
  onBack: () => void;
  onNext: (amount: number, selectedIndices: number[]) => void;
}

export const RefundScreen = ({
  products,
  onBack,
  onNext
}: RefundScreenProps) => {
  const [activeTab, setActiveTab] = useState<"products" | "amount">("products");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [refundAmount, setRefundAmount] = useState<string>("0.00");

  // Filter out refunded products for selection logic
  const selectableProducts = products.filter(p => !p.isRefunded);
  const selectableIndices = products.map((p, i) => !p.isRefunded ? i : -1).filter(i => i >= 0);

  const handleSelectAll = () => {
    if (selectedProducts.size === selectableProducts.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(selectableIndices));
    }
  };

  const handleToggleProduct = (index: number) => {
    if (products[index].isRefunded) return; // Don't allow selecting refunded products
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedProducts(newSelected);
  };

  const handleNext = () => {
    if (activeTab === "products") {
      const selected = products.filter((_, index) => selectedProducts.has(index));
      const totalAmount = selected.reduce((sum, product) => sum + product.price, 0);
      const selectedIndices = Array.from(selectedProducts);
      onNext(totalAmount, selectedIndices);
    } else {
      onNext(parseFloat(refundAmount), []);
    }
  };
  const handleNumberClick = (num: string) => {
    if (refundAmount === "0.00") {
      setRefundAmount(num === "." ? "0." : num);
    } else {
      setRefundAmount(refundAmount + num);
    }
  };
  const handleClear = () => {
    setRefundAmount("0.00");
  };
  const isNextActive = activeTab === "products" ? selectedProducts.size > 0 : parseFloat(refundAmount) > 0;
  return <div className="h-full flex items-center justify-center bg-background p-[6px]">
      <div className="w-[186px] h-full flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex items-center gap-2 px-0 py-[6px]">
          <button onClick={onBack} className="p-0">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <h1 className="text-[12px] font-semibold text-foreground">Refund</h1>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 px-0 py-0">
          <div className="flex gap-1 py-[6px]">
            <button onClick={() => setActiveTab("products")} className={`flex-1 h-[28px] rounded-full text-[11px] font-semibold transition-colors ${activeTab === "products" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
              Products
            </button>
            <button onClick={() => setActiveTab("amount")} className={`flex-1 h-[28px] rounded-full text-[11px] font-semibold transition-colors ${activeTab === "amount" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>
              Amount
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {activeTab === "products" ? <div className="space-y-2 px-0">
              {/* Select All */}
              <button onClick={handleSelectAll} className="flex items-center gap-2 w-full py-0">
                <div className={`w-3 h-3 rounded border flex items-center justify-center transition-colors ${selectedProducts.size === selectableProducts.length && selectableProducts.length > 0 ? "border-foreground bg-foreground" : "border-border"}`}>
                  {selectedProducts.size === selectableProducts.length && selectableProducts.length > 0 && <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>}
                </div>
                <span className="text-[11px] font-medium text-foreground">Select All</span>
              </button>

              {/* Products List */}
              <div className="space-y-2">
                {products.map((product, index) => (
                  <button 
                    key={index} 
                    onClick={() => handleToggleProduct(index)} 
                    disabled={product.isRefunded}
                    className={`w-full bg-background rounded-lg p-2.5 border flex items-center gap-2 transition-all relative ${
                      product.isRefunded 
                        ? "border-border opacity-50 cursor-not-allowed" 
                        : selectedProducts.has(index) 
                          ? "border-[#212121]" 
                          : "border-border"
                    }`}
                  >
                    <div className={`w-3 h-3 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
                      product.isRefunded 
                        ? "border-border bg-muted" 
                        : selectedProducts.has(index) 
                          ? "border-foreground bg-foreground" 
                          : "border-border"
                    }`}>
                      {selectedProducts.has(index) && !product.isRefunded && (
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                          <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`text-[10px] font-medium mb-0.5 ${product.isRefunded ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        {product.name}
                      </p>
                      <p className="text-[9px] text-muted-foreground">
                        {product.size} | {product.color}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className={`text-[13px] font-bold ${product.isRefunded ? "text-muted-foreground line-through" : "text-foreground"}`}>
                        ${product.price.toFixed(2)}
                      </span>
                      {product.isRefunded && (
                        <span className="text-[8px] font-semibold text-destructive">Refunded</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div> : <div className="space-y-3 px-0">
              {/* Amount Display */}
              <div className="bg-background rounded-lg border border-border h-[36px] flex items-center justify-center">
                <span className="text-[20px] font-bold" style={{
              color: '#FF0000'
            }}>
                  ${refundAmount}
                </span>
              </div>

              {/* Number Pad */}
              <div className="grid grid-cols-3 gap-[3px]">
                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'].map(key => <button key={key} onClick={() => key === 'C' ? handleClear() : handleNumberClick(key)} className="h-[36px] rounded border border-border bg-background flex items-center justify-center text-[18px] font-semibold transition-colors hover:bg-muted" style={{
              color: key === 'C' ? '#FF0000' : '#666666'
            }}>
                    {key}
                  </button>)}
              </div>
            </div>}
        </div>

        {/* Next Button */}
        <div className="flex-shrink-0 px-0 py-[6px]">
          <button onClick={handleNext} disabled={!isNextActive} className="w-full h-[28px] rounded-full text-[12px] font-semibold transition-colors disabled:opacity-50" style={{
          backgroundColor: isNextActive ? '#212121' : '#BFBFBF',
          color: '#FFFFFF'
        }}>
            NEXT
          </button>
        </div>
      </div>
    </div>;
};