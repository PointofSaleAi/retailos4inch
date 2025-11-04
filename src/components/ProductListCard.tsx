import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductListCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
}

export const ProductListCard = ({ product, onAddToCart }: ProductListCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity > 0) {
        onAddToCart(product.id, newQuantity);
      }
    }
  };

  return (
    <div className={`bg-surface rounded-lg overflow-hidden w-full min-h-[42px] flex items-center px-3 gap-2 py-2 ${
      quantity > 0 ? 'border border-[#000]' : 'border border-border'
    }`}>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <h3 className="text-[10px] font-medium leading-tight line-clamp-2">
          {product.name}
        </h3>
        <span className="text-[10px] font-bold text-price">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <Button
        variant="default"
        size="icon"
        onClick={() => handleQuantityChange(quantity + 1)}
        className="h-5 w-5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-xs flex items-center justify-center p-0 flex-shrink-0"
      >
        +
      </Button>
    </div>
  );
};
