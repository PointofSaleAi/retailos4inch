import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TopNavigation } from "./TopNavigation";
import { ProductCard } from "./ProductCard";
import { ChevronDown } from "lucide-react";

// Import product images
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

const mockProducts = [
  {
    id: 1,
    name: "RELAXED FIT FLOWING SHIRT",
    price: 13.00,
    image: product1,
  },
  {
    id: 2,
    name: "WASHED DENIM OVERALLS",
    price: 10.00,
    image: product2,
  },
  {
    id: 3,
    name: "CLASSIC CARDIGAN SWEATER",
    price: 15.00,
    image: product3,
  },
  {
    id: 4,
    name: "PREMIUM POLO SHIRT",
    price: 12.00,
    image: product4,
  },
];

const categories = ["Men", "Women"];
const subCategories = ["Top Wear", "Bottom Wear", "Others"];

export const NewOrderScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("Men");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Top Wear");
  const [cart, setCart] = useState<Record<number, number>>({});

  const handleAddToCart = (productId: number, quantity: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  return (
    <div className="h-full flex flex-col bg-background animate-fade-in">
      <TopNavigation />
      
      <div className="flex-1 flex flex-col">
        {/* Category Filters */}
        <div className="px-4 py-3 space-y-3 border-b border-border">
          {/* Main Categories */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="retail-compact"
              className="flex items-center gap-1"
            >
              Apparel
              <ChevronDown size={12} />
            </Button>
            
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "category" : "category-inactive"}
                size="retail-compact"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Sub Categories */}
          <div className="flex items-center gap-2">
            {subCategories.map((subCategory) => (
              <Button
                key={subCategory}
                variant={selectedSubCategory === subCategory ? "category" : "category-inactive"}
                size="retail-compact"
                onClick={() => setSelectedSubCategory(subCategory)}
              >
                {subCategory}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};