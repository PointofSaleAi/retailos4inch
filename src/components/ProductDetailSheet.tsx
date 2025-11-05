import { useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import iconDiscount from "@/assets/icon-discount.png";

interface ProductDetailSheetProps {
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  children: React.ReactNode;
  onAddToCart: (productId: number, quantity: number) => void;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Black", value: "#000000" },
  { name: "White", value: "#FFFFFF" },
  { name: "Blue", value: "#1E3A8A" },
  { name: "Gray", value: "#6B7280" },
  { name: "Green", value: "#365314" },
  { name: "Red", value: "#7F1D1D" },
  { name: "Purple", value: "#4C1D95" },
  { name: "Maroon", value: "#831843" },
  { name: "Dark Purple", value: "#3B0764" },
  { name: "Pink", value: "#BE185D" },
];

export const ProductDetailSheet = ({ product, children, onAddToCart }: ProductDetailSheetProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>(colors[0].value);
  const [open, setOpen] = useState(false);
  const stock = 12;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(stock, quantity + delta));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    onAddToCart(product.id, quantity);
    setOpen(false);
    setQuantity(1);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children}
      </DrawerTrigger>
      <DrawerContent className="font-['Montserrat'] max-h-[85%] overflow-y-auto">
        <div className="w-full">
          {/* Handle Bar */}
          <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full mb-3 mt-2" />
          
          {/* Product Header */}
          <div className="px-3 pb-3">
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-[13px] font-semibold leading-tight pr-2 flex-1">{product.name}</h2>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full border-border"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-[14px] font-medium min-w-[16px] text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7 rounded-full border-border"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Select size & color / Stock */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-muted-foreground">Select size & color</span>
              <span className="text-[10px] font-medium">Stock {stock}</span>
            </div>

            {/* Size Selection */}
            <div className="mb-3">
              <label className="text-[10px] font-medium mb-1.5 block">
                Size<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant="outline"
                    className={`h-7 px-3 rounded-full text-[10px] ${
                      selectedSize === size
                        ? "border-foreground bg-foreground/5"
                        : size === "XXL"
                        ? "opacity-40 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={() => size !== "XXL" && setSelectedSize(size)}
                    disabled={size === "XXL"}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-4">
              <label className="text-[10px] font-medium mb-1.5 block">
                Color<span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      selectedColor === color.value
                        ? "border-foreground scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                    aria-label={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl flex-shrink-0"
              >
                <img src={iconDiscount} alt="Discount" className="w-5 h-5" />
              </Button>
              <Button
                className="flex-1 h-10 rounded-full text-[12px] font-semibold bg-foreground text-background hover:bg-foreground/90"
                onClick={handleAddToCart}
              >
                ADD ${(product.price * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
