import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer";
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
  onAddToCart: (productId: number, quantity: number) => void;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Navy", value: "#1e3a8a" },
  { name: "Gray", value: "#6b7280" },
  { name: "Olive", value: "#3f4f1f" },
  { name: "Maroon", value: "#7f1d1d" },
  { name: "Purple", value: "#4c1d95" },
  { name: "Plum", value: "#701a75" },
  { name: "Dark Purple", value: "#3b0764" },
  { name: "Pink", value: "#db2777" },
];

export const ProductDetailSheet = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}: ProductDetailSheetProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");

  if (!product) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-w-[177px] mx-auto rounded-t-[20px] pb-4">
        <div className="w-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {/* Handle bar */}
          <div className="w-[40px] h-[4px] bg-[#D9D9D9] rounded-full mx-auto mt-2 mb-3" />
          
          {/* Product Name and Quantity */}
          <div className="px-3 mb-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h2 className="text-[12px] font-bold text-foreground leading-tight flex-1">
                {product.name}
              </h2>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted"
                >
                  <span className="text-[14px] font-medium">−</span>
                </button>
                <span className="text-[14px] font-semibold text-foreground min-w-[16px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-[24px] h-[24px] rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted"
                >
                  <span className="text-[14px] font-medium">+</span>
                </button>
              </div>
            </div>
          </div>

          {/* Select size & color / Stock */}
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-[10px] text-muted-foreground">Select size & color</span>
            <span className="text-[10px] font-semibold text-foreground">Stock 12</span>
          </div>

          {/* Size Section */}
          <div className="px-3 mb-3">
            <div className="flex items-center mb-1.5">
              <label className="text-[10px] font-semibold text-foreground">Size</label>
              <span className="text-[#FF0000] ml-0.5">*</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-[24px] rounded-full text-[10px] font-medium border transition-colors ${
                    selectedSize === size
                      ? "bg-foreground text-background border-foreground"
                      : size === "XXL"
                      ? "bg-muted/30 text-muted-foreground/40 border-border/40"
                      : "bg-background text-foreground border-border hover:bg-muted"
                  }`}
                  disabled={size === "XXL"}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Section */}
          <div className="px-3 mb-4">
            <div className="flex items-center mb-1.5">
              <label className="text-[10px] font-semibold text-foreground">Color</label>
              <span className="text-[#FF0000] ml-0.5">*</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-[26px] h-[26px] rounded-full transition-all ${
                    selectedColor === color.name
                      ? "ring-2 ring-foreground ring-offset-2"
                      : ""
                  } ${color.value === "#FFFFFF" ? "border border-border" : ""}`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="px-3">
            <div className="flex items-center gap-2">
              <button className="w-[32px] h-[38px] bg-background border border-border rounded-lg flex items-center justify-center hover:bg-muted">
                <img src={iconDiscount} alt="Discount" className="w-[18px] h-[18px]" />
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-[38px] bg-foreground text-background rounded-full text-[13px] font-bold hover:bg-foreground/90 transition-colors"
              >
                ADD ${product.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
