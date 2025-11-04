import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetailSheet } from "./ProductDetailSheet";

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

  const getNameStyles = () => {
    const nameLength = product.name.length;
    if (nameLength <= 15) {
      return "font-bold";
    } else if (nameLength <= 25) {
      return "font-semibold";
    } else if (nameLength <= 35) {
      return "font-medium";
    } else {
      return "font-normal";
    }
  };

  const getNameFontSize = (isHideImage: boolean) => {
    const nameLength = product.name.length;
    if (isHideImage) {
      if (nameLength <= 15) return "text-[11px]";
      else if (nameLength <= 25) return "text-[10px]";
      else if (nameLength <= 35) return "text-[9px]";
      else return "text-[8px]";
    } else {
      if (nameLength <= 15) return "text-[13px]";
      else if (nameLength <= 25) return "text-[12px]";
      else if (nameLength <= 35) return "text-[11px]";
      else return "text-[10px]";
    }
  };

  if (hideImage) {
    return (
      <ProductDetailSheet product={product} onAddToCart={onAddToCart}>
        <div className={`bg-surface rounded-lg overflow-hidden w-[90px] h-[65px] flex flex-col p-1.5 relative cursor-pointer ${
          quantity > 0 ? 'border border-[#000]' : 'border border-border'
        }`}>
          <h3 className={`${getNameFontSize(true)} ${getNameStyles()} leading-tight line-clamp-2 mb-0.5`} style={{ color: '#414141' }}>
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-[12px] font-bold text-price">
              ${product.price.toFixed(2)}
            </span>
            <Button
              variant="default"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(quantity + 1);
              }}
              className="h-5 w-5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm flex items-center justify-center p-0"
            >
              +
            </Button>
          </div>
        </div>
      </ProductDetailSheet>
    );
  }

  return (
    <ProductDetailSheet product={product} onAddToCart={onAddToCart}>
      <div className={`bg-surface rounded-lg overflow-hidden w-[90px] h-[102px] flex flex-col cursor-pointer ${
        quantity > 0 ? 'border border-[#000]' : 'border border-border'
      }`}>
        <div className="relative w-full h-[52px] bg-muted flex-shrink-0">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="default"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(quantity + 1);
            }}
            className="absolute top-1 right-1 h-5 w-5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-bold text-sm flex items-center justify-center p-0"
          >
            +
          </Button>
        </div>
        
        <div className="p-1 flex flex-col flex-1 justify-between">
          <h3 className={`${getNameFontSize(false)} ${getNameStyles()} leading-tight line-clamp-2`}>
            {product.name}
          </h3>
          <span className="text-[10px] font-bold text-price">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </ProductDetailSheet>
  );
};