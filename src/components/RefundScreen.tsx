import { useState } from "react";
import { ChevronLeft } from "lucide-react";

interface Product {
  name: string;
  size: string;
  color: string;
  price: number;
}

interface RefundScreenProps {
  products: Product[];
  onBack: () => void;
  onNext: (selectedProducts: Product[]) => void;
}

export const RefundScreen = ({ products, onBack, onNext }: RefundScreenProps) => {
  const [activeTab, setActiveTab] = useState<"products" | "amount">("products");
  const [selectedProducts, setSelectedProducts] = useState<Set<number>>(new Set());
  const [refundAmount, setRefundAmount] = useState<string>("0.00");

  const handleSelectAll = () => {
    if (selectedProducts.size === products.length) {
      setSelectedProducts(new Set());
    } else {
      setSelectedProducts(new Set(products.map((_, index) => index)));
    }
  };

  const handleToggleProduct = (index: number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedProducts(newSelected);
  };

  const handleNext = () => {
    const selected = products.filter((_, index) => selectedProducts.has(index));
    onNext(selected);
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

  const isNextActive = activeTab === "products" 
    ? selectedProducts.size > 0 
    : parseFloat(refundAmount) > 0;

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2 px-3 py-2">
        <button onClick={onBack} className="p-0">
          <ChevronLeft className="w-4 h-4 text-foreground" />
        </button>
        <h1 className="text-[12px] font-semibold text-foreground">Refund</h1>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 px-3 py-2">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 h-[28px] rounded-full text-[11px] font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("amount")}
            className={`flex-1 h-[28px] rounded-full text-[11px] font-semibold transition-colors ${
              activeTab === "amount"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Amount
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {activeTab === "products" ? (
          <div className="px-3 space-y-2">
            {/* Select All */}
            <button
              onClick={handleSelectAll}
              className="flex items-center gap-2 w-full py-1"
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                  selectedProducts.size === products.length
                    ? "border-foreground bg-foreground"
                    : "border-border"
                }`}
              >
                {selectedProducts.size === products.length && (
                  <div className="w-2 h-2 rounded-full bg-background" />
                )}
              </div>
              <span className="text-[11px] font-medium text-foreground">Select All</span>
            </button>

            {/* Products List */}
            <div className="space-y-2">
              {products.map((product, index) => (
                <button
                  key={index}
                  onClick={() => handleToggleProduct(index)}
                  className={`w-full bg-background rounded-lg p-2.5 border flex items-center gap-2 transition-colors ${
                    selectedProducts.has(index)
                      ? "border-[#212121]"
                      : "border-border"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors ${
                      selectedProducts.has(index)
                        ? "border-foreground bg-foreground"
                        : "border-border"
                    }`}
                  >
                    {selectedProducts.has(index) && (
                      <div className="w-2 h-2 rounded-full bg-background" />
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-medium text-foreground mb-0.5">
                      {product.name}
                    </p>
                    <p className="text-[9px] text-muted-foreground">
                      {product.size} | {product.color}
                    </p>
                  </div>
                  <span className="text-[13px] font-bold text-foreground flex-shrink-0">
                    ${product.price.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="px-3 space-y-3">
            {/* Amount Display */}
            <div className="bg-background rounded-lg border border-border p-3 flex items-center justify-center">
              <span className="text-[28px] font-bold" style={{ color: '#FF0000' }}>
                ${refundAmount}
              </span>
            </div>

            {/* Number Pad */}
            <div className="grid grid-cols-3 gap-2">
              {['7', '8', '9', '4', '5', '6', '1', '2', '3', '.', '0', 'C'].map((key) => (
                <button
                  key={key}
                  onClick={() => key === 'C' ? handleClear() : handleNumberClick(key)}
                  className="h-[60px] rounded-lg border border-border bg-background flex items-center justify-center text-[24px] font-semibold transition-colors hover:bg-muted"
                  style={{ color: key === 'C' ? '#FF0000' : '#666666' }}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Button */}
      <div className="flex-shrink-0 px-3 py-2">
        <button
          onClick={handleNext}
          disabled={!isNextActive}
          className="w-full h-[28px] rounded-full text-[12px] font-semibold transition-colors disabled:opacity-50"
          style={{ backgroundColor: isNextActive ? '#212121' : '#BFBFBF', color: '#FFFFFF' }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};
