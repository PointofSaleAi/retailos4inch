import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TopNavigation } from "./TopNavigation";
import { ProductCard } from "./ProductCard";
import { ProductListCard } from "./ProductListCard";
import { CartStrip } from "./CartStrip";
import { ProductDetailSheet } from "./ProductDetailSheet";
import { ChevronDown } from "lucide-react";
import iconGrid from "@/assets/icon-grid.png";
import iconList from "@/assets/icon-list.png";
import iconGridWhite from "@/assets/icon-grid-white.png";
import iconListWhite from "@/assets/icon-list-white.png";
import iconFilterMenu from "@/assets/icon-filter-menu.png";
import iconCameraBlack from "@/assets/icon-camera-black.png";
import iconCameraWhite from "@/assets/icon-camera-white.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Import product images
import product1 from "@/assets/product-5.png";
import product2 from "@/assets/product-6.png";
const mockProducts = [{
  id: 1,
  name: "Relaxed Fit Flowing Shirt",
  price: 13.00,
  image: product1
}, {
  id: 2,
  name: "Washed Denim Overalls",
  price: 10.00,
  image: product2
}, {
  id: 3,
  name: "Classic Cardigan Sweater",
  price: 15.00,
  image: product1
}, {
  id: 4,
  name: "Premium Polo Shirt",
  price: 12.00,
  image: product2
}, {
  id: 5,
  name: "Relaxed Fit Flowing Shirt",
  price: 13.00,
  image: product1
}, {
  id: 6,
  name: "Washed Denim Overalls",
  price: 10.00,
  image: product2
}, {
  id: 7,
  name: "Classic Cardigan Sweater",
  price: 15.00,
  image: product1
}, {
  id: 8,
  name: "Premium Polo Shirt",
  price: 12.00,
  image: product2
}, {
  id: 9,
  name: "Relaxed Fit Flowing Shirt",
  price: 13.00,
  image: product1
}, {
  id: 10,
  name: "Washed Denim Overalls",
  price: 10.00,
  image: product2
}];
const productTypes = ["Products", "Services"];
const menuCategories = ["Apparel", "Beauty Products", "Electric"];
const categories = ["Men", "Women", "Kids", "Gen Z"];
const subCategories = ["Top Wear", "Bottom Wear", "Official Merch", "Best Sellers"];

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

interface NewOrderScreenProps {
  onCustomClick?: () => void;
  onFavoritesClick?: () => void;
  onScanClick?: () => void;
  products: Product[];
  onToggleFavorite: (productId: number) => void;
  onAddToCart: (productId: number, quantity: number, size?: string, color?: string) => void;
  cartItemCount: number;
  cartTotal: number;
  onCartClick?: () => void;
  onProductDetailOpen?: (isOpen: boolean) => void;
  onAddTax?: () => void;
  onDiscount?: () => void;
  onGiftCard?: () => void;
  onRedeemLoyalty?: () => void;
  onDeliveryCharge?: () => void;
}

export const NewOrderScreen = ({ 
  onCustomClick, 
  onFavoritesClick,
  onScanClick,
  products,
  onToggleFavorite,
  onAddToCart,
  cartItemCount,
  cartTotal,
  onCartClick,
  onProductDetailOpen,
  onAddTax,
  onDiscount,
  onGiftCard,
  onRedeemLoyalty,
  onDeliveryCharge
}: NewOrderScreenProps) => {
  const [viewMode, setViewMode] = useState<"image" | "grid" | "list">("image");
  const [selectedProductType, setSelectedProductType] = useState("Products");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Apparel");
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Top Wear");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
    setIsSheetOpen(true);
    onProductDetailOpen?.(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    onProductDetailOpen?.(false);
  };

  const filteredProducts = searchQuery
    ? products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const scrollLeft = scrollContainerRef.current.scrollLeft;
        if (scrollLeft > 10) {
          setShowFilters(false);
        }
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);
  return <div className="h-full flex flex-col bg-background animate-fade-in">
      {/* Scrollable content area */}
      <div ref={popupContainerRef} className="flex-1 overflow-y-auto scrollbar-hide relative">
        <TopNavigation 
          onCustomClick={onCustomClick} 
          onFavoritesClick={onFavoritesClick}
          onScanClick={onScanClick}
          onSearchChange={setSearchQuery}
          onAddTax={onAddTax}
          onDiscount={onDiscount}
          onGiftCard={onGiftCard}
          onRedeemLoyalty={onRedeemLoyalty}
          onDeliveryCharge={onDeliveryCharge}
        />
        
        {/* Category Filters */}
        <div className="px-[6px] pt-1 space-y-1">
          {/* Main Categories with View Toggle and Dropdowns */}
          <div ref={scrollContainerRef} className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {!showFilters && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 flex-shrink-0"
                onClick={() => setShowFilters(true)}
              >
                <img src={iconFilterMenu} alt="Menu" className="w-5 h-5" />
              </Button>
            )}
            
            {showFilters && (
              <>
                {/* View Toggle Icons */}
                <div className="flex items-center gap-1 border border-border rounded-full p-0.5 flex-shrink-0">
                  <Button variant="ghost" size="icon" className={`h-[22px] w-[22px] rounded-full ${viewMode === "image" ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setViewMode("image")}>
                    <img src={viewMode === "image" ? iconCameraWhite : iconCameraBlack} alt="Image view" className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className={`h-[22px] w-[22px] rounded-full ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setViewMode("grid")}>
                    <img src={viewMode === "grid" ? iconGridWhite : iconGrid} alt="Grid view" className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className={`h-[22px] w-[22px] rounded-full ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setViewMode("list")}>
                    <img src={viewMode === "list" ? iconListWhite : iconList} alt="List view" className="w-3.5 h-3.5" />
                  </Button>
                </div>
                
                {/* Product Type Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="retail-compact" className="flex items-center gap-1 flex-shrink-0">
                      {selectedProductType}
                      <ChevronDown size={12} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface">
                    {productTypes.map(type => <DropdownMenuItem key={type} onClick={() => setSelectedProductType(type)} className="text-[10px]">
                        {type}
                      </DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Menu Category Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="retail-compact" className="flex items-center gap-1 flex-shrink-0">
                      {selectedMenuCategory}
                      <ChevronDown size={12} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface">
                    {menuCategories.map(category => <DropdownMenuItem key={category} onClick={() => setSelectedMenuCategory(category)} className="text-[10px]">
                        {category}
                      </DropdownMenuItem>)}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            
            {/* Slidable Categories */}
            {categories.map(category => <Button key={category} variant={selectedCategory === category ? "category" : "category-inactive"} size="retail-compact" onClick={() => setSelectedCategory(category)}>
                {category}
              </Button>)}
          </div>
          
          {/* Sub Categories */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {subCategories.map(subCategory => <Button key={subCategory} variant={selectedSubCategory === subCategory ? "category" : "category-inactive"} size="retail-compact" onClick={() => setSelectedSubCategory(subCategory)}>
                {subCategory}
              </Button>)}
          </div>
        </div>
        
        {/* Product Grid/List */}
        <div className="p-[6px]">
          {viewMode === "image" ? (
            <div className="grid grid-cols-2 gap-2 justify-items-center pb-2">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} hideImage={false} onCardClick={handleCardClick} />)}
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 gap-2 justify-items-center pb-2">
              {filteredProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} hideImage={true} onCardClick={handleCardClick} />)}
            </div>
          ) : (
            <div className="flex flex-col gap-2 pb-2">
              {filteredProducts.map(product => <ProductListCard key={product.id} product={product} onAddToCart={onAddToCart} />)}
            </div>
          )}
        </div>
      </div>
      
      {/* Cart Strip - positioned as flex child at bottom */}
      {!isSheetOpen && <CartStrip itemCount={cartItemCount} totalAmount={cartTotal} onClick={onCartClick} />}

      {/* Product Detail Sheet */}
      <ProductDetailSheet
        product={selectedProduct}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onAddToCart={onAddToCart}
        portalContainer={popupContainerRef.current}
      />
    </div>;
};