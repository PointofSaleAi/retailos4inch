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

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-3 py-3 border-b border-border">
        <button onClick={onBack} className="p-0">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-[18px] font-bold text-foreground">Refund</h1>
      </div>

      {/* Tabs */}
      <div className="flex-shrink-0 px-3 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex-1 h-10 rounded-full text-[13px] font-semibold transition-colors ${
              activeTab === "products"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground"
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab("amount")}
            className={`flex-1 h-10 rounded-full text-[13px] font-semibold transition-colors ${
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
        <div className="px-3 space-y-3">
          {/* Select All */}
          <button
            onClick={handleSelectAll}
            className="flex items-center gap-3 w-full"
          >
            <div
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                selectedProducts.size === products.length
                  ? "border-foreground bg-foreground"
                  : "border-border"
              }`}
            >
              {selectedProducts.size === products.length && (
                <div className="w-2.5 h-2.5 rounded-full bg-background" />
              )}
            </div>
            <span className="text-[13px] font-medium text-foreground">Select All</span>
          </button>

          {/* Products List */}
          <div className="space-y-2">
            {products.map((product, index) => (
              <button
                key={index}
                onClick={() => handleToggleProduct(index)}
                className="w-full bg-surface rounded-lg p-3 border border-border flex items-center gap-3"
              >
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selectedProducts.has(index)
                      ? "border-foreground bg-foreground"
                      : "border-border"
                  }`}
                >
                  {selectedProducts.has(index) && (
                    <div className="w-2.5 h-2.5 rounded-full bg-background" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-[13px] font-medium text-foreground mb-1">
                    {product.name}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {product.size} | {product.color}
                  </p>
                </div>
                <span className="text-[15px] font-bold text-foreground flex-shrink-0">
                  ${product.price.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Next Button */}
      <div className="flex-shrink-0 px-3 py-3 border-t border-border">
        <button
          onClick={handleNext}
          disabled={selectedProducts.size === 0}
          className="w-full h-12 rounded-full text-[15px] font-semibold transition-colors disabled:opacity-50"
          style={{ backgroundColor: selectedProducts.size > 0 ? '#BFBFBF' : '#E0E0E0', color: '#FFFFFF' }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};
