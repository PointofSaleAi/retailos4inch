import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: number, quantity: number) => void;
  hideImage?: boolean;
}

export const ProductCard = ({ product, onAddToCart, hideImage = false }: ProductCardProps) => {
  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 0) {
      setQuantity(newQuantity);
      if (newQuantity > 0) {
        onAddToCart(product.id, newQuantity);
      }
    }
  };

  if (hideImage) {
    return (
      <div className="bg-surface rounded-lg overflow-hidden border border-border w-[90px] h-[78px] flex flex-col p-2">
        <h3 className="text-[12px] font-semibold leading-tight line-clamp-3 flex-1 mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-price">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="default"
            size="icon"
            onClick={() => handleQuantityChange(quantity + 1)}
            className="h-5 w-5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm flex items-center justify-center p-0"
          >
            +
          </Button>
        </div>
        {quantity > 0 && (
          <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
            {quantity}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-lg overflow-hidden border border-border w-[90px] h-[102px] flex flex-col">
      <div className="relative w-full h-[52px] bg-muted flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <Button
          variant="default"
          size="icon"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm flex items-center justify-center p-0"
        >
          +
        </Button>
        {quantity > 0 && (
          <div className="absolute top-1 left-1 bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[8px] font-bold">
            {quantity}
          </div>
        )}
      </div>
      
      <div className="p-1 flex flex-col flex-1 justify-between">
        <h3 className="text-[12px] font-semibold leading-tight line-clamp-2">
          {product.name}
        </h3>
        <span className="text-[10px] font-bold text-price">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};