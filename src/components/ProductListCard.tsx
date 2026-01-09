import { useState } from "react";
import iconPlusNew from "@/assets/icon-plus-new.png";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface ProductListCardProps {
  product: Product;
  onAddToCart: (productId: string, quantity: number, size?: string, color?: string) => void;
  onCardClick?: (product: Product) => void;
}

export const ProductListCard = ({ product, onAddToCart, onCardClick }: ProductListCardProps) => {
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
      return "text-[11px] font-medium leading-[1.15]";
    } else if (nameLength <= 20) {
      return "text-[9.5px] font-medium leading-[1.15]";
    } else if (nameLength <= 28) {
      return "text-[8.5px] font-medium leading-[1.15]";
    } else {
      return "text-[7.5px] font-medium leading-[1.15]";
    }
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div 
      className={`bg-surface rounded-lg overflow-hidden w-full min-h-[42px] flex items-center px-3 gap-3 py-2 cursor-pointer ${
        quantity > 0 ? 'border border-[#000]' : 'border border-border'
      } ${isOutOfStock ? 'opacity-75' : ''}`}
      onClick={() => onCardClick?.(product)}
    >
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <h3 className={`${getNameStyles()} break-words leading-tight line-clamp-2`}>
          {product.name}
        </h3>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[13px] font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </span>
        {isOutOfStock ? (
          <span className="bg-destructive text-destructive-foreground text-[7px] font-semibold px-1.5 py-0.5 rounded whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Out of Stock
          </span>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(quantity + 1);
            }}
            className="w-[20px] h-[20px] bg-foreground hover:bg-foreground/90 flex items-center justify-center p-0 rounded"
          >
            <img src={iconPlusNew} alt="Add" className="w-[10px] h-[10px]" />
          </button>
        )}
      </div>
    </div>
  );
};
