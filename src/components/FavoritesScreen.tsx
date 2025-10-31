import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import iconGrid from "@/assets/icon-grid.png";
import { ProductCard } from "./ProductCard";
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}
interface FavoritesScreenProps {
  onBack: () => void;
  products: Product[];
  onAddToCart: (productId: number, quantity: number) => void;
}
export const FavoritesScreen = ({
  onBack,
  products,
  onAddToCart
}: FavoritesScreenProps) => {
  return <div className="h-full flex flex-col bg-background w-[186px] mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between px-2 h-6 bg-surface border-b border-border">
        <Button variant="ghost" size="icon" className="h-5 w-5 p-0" onClick={onBack}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-sm font-semibold absolute left-1/2 -translate-x-1/2">Favorites</h1>
        <div className="w-5" />
      </div>

      {/* Grid Icon and Instructions */}
      <div className="flex flex-col items-center justify-center py-3 px-[6px]">
        <img src={iconGrid} alt="Grid" className="w-5 h-5 mb-1.5 opacity-40" />
        <p className="text-[11px] text-center text-muted-foreground leading-tight">
          Press and hold anywhere on<br />the grid to add items
        </p>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        <div className="grid grid-cols-2 gap-1.5">
          {products.map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />)}
        </div>
      </div>
    </div>;
};