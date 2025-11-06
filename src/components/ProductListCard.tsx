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
    <div className={`bg-surface rounded-lg overflow-hidden w-full min-h-[42px] flex items-center px-3 gap-3 py-2 ${
      quantity > 0 ? 'border border-[#000]' : 'border border-border'
    }`}>
      <div className="flex-1 flex flex-col gap-0.5 min-w-0">
        <h3 className={`${getNameStyles()} break-words leading-tight line-clamp-2`}>
          {product.name}
        </h3>
      </div>
      
      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="text-[13px] font-semibold text-foreground">
          ${product.price.toFixed(2)}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuantityChange(quantity + 1);
          }}
          className="w-[20px] h-[20px] bg-foreground hover:bg-foreground/90 flex items-center justify-center p-0 rounded"
        >
          <img src={iconPlusNew} alt="Add" className="w-[10px] h-[10px]" />
        </button>
      </div>
    </div>
  );
};
