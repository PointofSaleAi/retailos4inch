import { useState } from "react";
import iconPlusNew from "@/assets/icon-plus-new.png";

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

  const getNameStyles = () => {
    const nameLength = product.name.length;
    if (nameLength <= 12) {
      return "text-[11px] font-bold leading-[1.15]";
    } else if (nameLength <= 20) {
      return "text-[9.5px] font-semibold leading-[1.15]";
    } else if (nameLength <= 28) {
      return "text-[8.5px] font-medium leading-[1.15]";
    } else {
      return "text-[7.5px] font-normal leading-[1.15]";
    }
  };

  return (
    <div className={`bg-surface rounded-lg overflow-hidden w-full min-h-[42px] flex items-center px-3 gap-2 py-2 ${
      quantity > 0 ? 'border border-[#000]' : 'border border-border'
    }`}>
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
      
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <h3 className={`${getNameStyles()} break-words h-[24px] overflow-hidden`}>
          {product.name}
        </h3>
        <span className="text-[10px] font-bold text-price">
          ${product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};
