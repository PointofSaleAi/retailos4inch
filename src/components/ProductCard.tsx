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
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
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
    <div className="bg-surface rounded-lg overflow-hidden border border-border">
      <div className="aspect-square bg-muted relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {quantity > 0 && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {quantity}
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="text-product-title font-semibold mb-1 line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-price font-bold">
            ${product.price.toFixed(2)}
          </span>
          
          <div className="flex items-center gap-1">
            {quantity === 0 ? (
              <Button
                variant="ghost"
                size="retail-compact"
                onClick={() => handleQuantityChange(1)}
                className="h-6 w-6 p-0 rounded-full border border-border"
              >
                +
              </Button>
            ) : (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="retail-compact"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="h-6 w-6 p-0 rounded-full border border-border"
                >
                  -
                </Button>
                <span className="text-xs font-medium w-6 text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="retail-compact"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-6 w-6 p-0 rounded-full border border-border"
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};