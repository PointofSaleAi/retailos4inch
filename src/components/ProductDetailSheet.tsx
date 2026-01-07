import { useState } from "react";
import { Drawer, DrawerContent, DrawerClose } from "@/components/ui/drawer";
import iconDiscount from "@/assets/icon-discount.png";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}
interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (productId: number, quantity: number, size: string, color: string) => void;
  portalContainer?: HTMLElement | null;
}
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [{
  name: "Black",
  value: "#000000"
}, {
  name: "White",
  value: "#FFFFFF"
}, {
  name: "Navy",
  value: "#1e3a8a"
}, {
  name: "Gray",
  value: "#6b7280"
}, {
  name: "Olive",
  value: "#3f4f1f"
}, {
  name: "Maroon",
  value: "#7f1d1d"
}, {
  name: "Purple",
  value: "#4c1d95"
}, {
  name: "Plum",
  value: "#701a75"
}, {
  name: "Dark Purple",
  value: "#3b0764"
}, {
  name: "Pink",
  value: "#db2777"
}];
export const ProductDetailSheet = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  portalContainer
}: ProductDetailSheetProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  if (!product) return null;
  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  const handleAddToCart = () => {
    onAddToCart(product.id, quantity, selectedSize, selectedColor);
    onClose();
    setQuantity(1);
  };
  return <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent container={portalContainer} className="!w-full !left-0 !right-0 !inset-x-0 !bottom-0 !top-auto rounded-t-[16px] h-[300px] overflow-hidden pb-0">
        <div className="w-full pt-1 pb-0" style={{
        fontFamily: 'Montserrat, sans-serif'
      }}>
          {/* Handle bar */}
          <div className="w-[36px] h-[3px] bg-muted-foreground/30 rounded-full mx-auto mb-1" />
          
          {/* Product Name and Quantity - side by side */}
          <div className="px-3 mb-1.5 flex items-start justify-between gap-2">
            <h2 className="text-[12px] font-bold text-foreground leading-[14px] flex-1 line-clamp-2">
              {product.name}
            </h2>
            
            {/* Quantity Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => handleQuantityChange(-1)} className="w-[22px] h-[22px] rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted">
                <span className="text-[12px] font-medium">−</span>
              </button>
              <span className="text-[12px] font-semibold text-foreground min-w-[20px] text-center">
                {quantity}
              </span>
              <button onClick={() => handleQuantityChange(1)} className="w-[22px] h-[22px] rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted">
                <span className="text-[12px] font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Selected size & color / Stock */}
          <div className="flex items-center justify-between px-3 mb-1 py-[6px] bg-muted/30 mx-3 rounded">
            <div className="flex items-center gap-3">
              {selectedSize && selectedColor ? <>
                  <span className="text-[10px] font-semibold text-foreground">{selectedSize}</span>
                  <span className="text-[10px] font-semibold text-foreground">{selectedColor}</span>
                </> : <span className="text-[10px] font-semibold text-muted-foreground">Select size & color</span>}
            </div>
            <span className="text-[10px] font-semibold text-foreground">Stock 12</span>
          </div>

          {/* Size Section */}
          <div className="px-3 mb-1">
            <div className="p-2">
              <div className="flex items-center mb-1">
                <label className="text-[9px] font-semibold text-foreground">Size</label>
                <span className="text-destructive ml-0.5">*</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {sizes.map(size => <button key={size} onClick={() => setSelectedSize(size)} className={`h-[20px] rounded-full text-[9px] font-medium border transition-colors ${selectedSize === size ? "bg-foreground text-background border-foreground" : size === "XXL" ? "bg-muted/30 text-muted-foreground/40 border-border/40" : "bg-background text-foreground border-border hover:bg-muted"}`} disabled={size === "XXL"}>
                    {size}
                  </button>)}
              </div>
            </div>
          </div>

          {/* Color Section */}
          <div className="px-3 mb-1">
            <div className="p-2">
              <div className="flex items-center mb-1">
                <label className="text-[9px] font-semibold text-foreground">Color</label>
                <span className="text-destructive ml-0.5">*</span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {colors.map(color => <button key={color.name} onClick={() => setSelectedColor(color.name)} className={`w-[20px] h-[20px] rounded-full transition-all ${selectedColor === color.name ? "ring-1 ring-foreground ring-offset-1" : ""} ${color.value === "#FFFFFF" ? "border border-border" : ""}`} style={{
                backgroundColor: color.value
              }} title={color.name} />)}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="px-3 pt-1 pb-2.5 py-0">
            <div className="flex items-center gap-2">
              <button className="w-[26px] h-[28px] bg-background border border-border rounded-lg flex items-center justify-center hover:bg-muted">
                <img src={iconDiscount} alt="Discount" className="w-[14px] h-[14px]" />
              </button>
              <button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className="flex-1 h-[30px] bg-foreground text-background rounded-full text-[11px] font-bold hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                ADD ${product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>;
};