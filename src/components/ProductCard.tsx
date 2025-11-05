import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetailSheet } from "./ProductDetailSheet";
import iconPlusNew from "@/assets/icon-plus-new.png";

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
    if (nameLength <= 12) {
      return "font-bold";
    } else if (nameLength <= 20) {
      return "font-semibold";
    } else if (nameLength <= 28) {
      return "font-medium";
    } else {
      return "font-normal";
    }
  };

  const getNameFontSize = (isHideImage: boolean) => {
    const nameLength = product.name.length;
    if (isHideImage) {
      if (nameLength <= 12) return "text-[11px]";
      else if (nameLength <= 20) return "text-[9.5px]";
      else if (nameLength <= 28) return "text-[8.5px]";
      else return "text-[7.5px]";
    } else {
      if (nameLength <= 12) return "text-[13px]";
      else if (nameLength <= 20) return "text-[11px]";
      else if (nameLength <= 28) return "text-[10px]";
      else return "text-[9px]";
    }
  };

  if (hideImage) {
    return (
      <ProductDetailSheet product={product} onAddToCart={onAddToCart}>
        <div className={`bg-surface rounded-lg overflow-hidden w-[90px] h-[65px] flex flex-col p-1.5 cursor-pointer ${
          quantity > 0 ? 'border border-[#000]' : 'border border-border'
        }`}>
          <div className="flex items-start gap-1.5 mb-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(quantity + 1);
              }}
              className="flex-shrink-0 w-[18px] h-[18px] bg-foreground hover:bg-foreground/90 flex items-center justify-center p-0"
              style={{ borderRadius: '4px' }}
            >
              <img src={iconPlusNew} alt="Add" className="w-[10px] h-[10px]" />
            </button>
            <h3 className={`${getNameFontSize(true)} ${getNameStyles()} leading-[1.15] break-words flex-1 overflow-hidden`} style={{ color: '#414141', height: '26px' }}>
              {product.name}
            </h3>
          </div>
          <div className="flex items-center justify-start mt-auto">
            <span className="text-[12px] font-bold text-price">
              ${product.price.toFixed(2)}
            </span>
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
        </div>
        
        <div className="p-1 flex flex-col flex-1">
          <div className="flex items-start gap-1.5 mb-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuantityChange(quantity + 1);
              }}
              className="flex-shrink-0 w-[18px] h-[18px] bg-foreground hover:bg-foreground/90 flex items-center justify-center p-0"
              style={{ borderRadius: '4px' }}
            >
              <img src={iconPlusNew} alt="Add" className="w-[10px] h-[10px]" />
            </button>
            <h3 className={`${getNameFontSize(false)} ${getNameStyles()} leading-[1.15] break-words flex-1 overflow-hidden`} style={{ height: '28px' }}>
              {product.name}
            </h3>
          </div>
          <span className="text-[10px] font-bold text-price mt-auto">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </ProductDetailSheet>
  );
};