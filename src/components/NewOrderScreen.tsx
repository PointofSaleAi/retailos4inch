import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TopNavigation } from "./TopNavigation";
import { ProductCard } from "./ProductCard";
import { ProductListCard } from "./ProductListCard";
import { ChevronDown } from "lucide-react";
import iconGrid from "@/assets/icon-grid.png";
import iconList from "@/assets/icon-list.png";
import iconGridWhite from "@/assets/icon-grid-white.png";
import iconListWhite from "@/assets/icon-list-white.png";
import iconFilterMenu from "@/assets/icon-filter-menu.png";
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
export const NewOrderScreen = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProductType, setSelectedProductType] = useState("Products");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Apparel");
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Top Wear");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [showFilters, setShowFilters] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const handleAddToCart = (productId: number, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };
  return <div className="h-full flex flex-col bg-background animate-fade-in overflow-hidden">
      <TopNavigation />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Category Filters */}
        <div className="px-[6px] pt-2 space-y-2 flex-shrink-0">
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
                <div className="flex items-center gap-1 border border-border rounded-full p-1 flex-shrink-0">
                  <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-full ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setViewMode("grid")}>
                    <img src={viewMode === "grid" ? iconGridWhite : iconGrid} alt="Grid view" className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className={`h-6 w-6 rounded-full ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`} onClick={() => setViewMode("list")}>
                    <img src={viewMode === "list" ? iconListWhite : iconList} alt="List view" className="w-4 h-4" />
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
          {showFilters && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {subCategories.map(subCategory => <Button key={subCategory} variant={selectedSubCategory === subCategory ? "category" : "category-inactive"} size="retail-compact" onClick={() => setSelectedSubCategory(subCategory)}>
                  {subCategory}
                </Button>)}
            </div>
          )}
        </div>
        
        {/* Product Grid/List */}
        <div className="flex-1 p-[6px] overflow-y-auto scrollbar-hide">
          {viewMode === "grid" ? <div className="grid grid-cols-2 gap-2 justify-items-center pb-2">
              {mockProducts.map(product => <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />)}
            </div> : <div className="flex flex-col gap-2 pb-2">
              {mockProducts.map(product => <ProductListCard key={product.id} product={product} onAddToCart={handleAddToCart} />)}
            </div>}
        </div>
      </div>
    </div>;
};