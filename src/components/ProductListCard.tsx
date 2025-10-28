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
    <div className="bg-surface rounded-lg overflow-hidden border border-border w-full h-[60px] flex items-center px-2 gap-2">
      <div className="relative w-[50px] h-[50px] bg-muted flex-shrink-0 rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {quantity > 0 && (
          <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
            {quantity}
          </div>
        )}
      </div>
      
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <h3 className="text-[10px] font-semibold leading-tight line-clamp-1">
          {product.name}
        </h3>
        <span className="text-[12px] font-bold text-price">
          ${product.price.toFixed(2)}
        </span>
      </div>

      <Button
        variant="default"
        size="icon"
        onClick={() => handleQuantityChange(quantity + 1)}
        className="h-6 w-6 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm flex items-center justify-center p-0 flex-shrink-0"
      >
        +
      </Button>
    </div>
  );
};
