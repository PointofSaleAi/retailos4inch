import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TopNavigation } from "./TopNavigation";
import { CartStrip } from "./CartStrip";
import { SalonServiceDetailSheet } from "./SalonServiceDetailSheet";
import { ChevronDown } from "lucide-react";
import iconGrid from "@/assets/icon-grid.png";
import iconList from "@/assets/icon-list.png";
import iconGridWhite from "@/assets/icon-grid-white.png";
import iconListWhite from "@/assets/icon-list-white.png";
import iconFilterMenu from "@/assets/icon-filter-menu.png";
import iconCameraBlack from "@/assets/icon-camera-black.png";
import iconCameraWhite from "@/assets/icon-camera-white.png";
import iconPlus from "@/assets/icon-plus-new.png";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Import product image for salon services
import product1 from "@/assets/product-5.png";

// Mock salon services data
const mockSalonServices = [
  {
    id: "1",
    name: "Classic Men's Haircut",
    price: 25.00,
    image: product1,
    stock: 99
  },
  {
    id: "2",
    name: "Basic Men's Haircut",
    price: 25.00,
    image: "",
    stock: 99
  },
  {
    id: "3",
    name: "Fade / Taper Cut",
    price: 35.00,
    image: "",
    stock: 99
  },
  {
    id: "4",
    name: "Styled Long Top Cut",
    price: 45.00,
    image: "",
    stock: 99
  },
  {
    id: "5",
    name: "Premium Haircut",
    price: 55.00,
    image: "",
    stock: 99
  },
  {
    id: "6",
    name: "Executive Cut",
    price: 65.00,
    image: "",
    stock: 99
  }
];

const serviceTypes = ["Services", "Products"];
const menuCategories = ["Salon", "Spa", "Nails"];
const categories = ["Haircut", "Beard Trim", "Shaving", "Styling"];

interface SalonService {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface SalonServicesScreenProps {
  onCustomClick?: () => void;
  onFavoritesClick?: () => void;
  onScanClick?: () => void;
  onAddToCart: (serviceId: string, quantity: number, addOns?: { name: string; price: number }[]) => void;
  cartItemCount: number;
  cartTotal: number;
  onCartClick?: () => void;
  onProductDetailOpen?: (isOpen: boolean) => void;
  onAddTax?: () => void;
  onDiscount?: () => void;
  onGiftCard?: () => void;
  onRedeemLoyalty?: () => void;
  onDeliveryCharge?: () => void;
  onBackToProducts?: () => void;
  splitPaymentInfo?: {
    paidChecksCount: number;
    totalChecks: number;
    remainingAmount: number;
  } | null;
  onSplitCartClick?: () => void;
}

export const SalonServicesScreen = ({
  onCustomClick,
  onFavoritesClick,
  onScanClick,
  onAddToCart,
  cartItemCount,
  cartTotal,
  onCartClick,
  onProductDetailOpen,
  onAddTax,
  onDiscount,
  onGiftCard,
  onRedeemLoyalty,
  onDeliveryCharge,
  onBackToProducts,
  splitPaymentInfo,
  onSplitCartClick
}: SalonServicesScreenProps) => {
  const [viewMode, setViewMode] = useState<"image" | "grid" | "list">("image");
  const [selectedServiceType, setSelectedServiceType] = useState("Services");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("Salon");
  const [selectedCategory, setSelectedCategory] = useState("Haircut");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const popupContainerRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<SalonService | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCardClick = (service: SalonService) => {
    setSelectedService(service);
    setIsSheetOpen(true);
    onProductDetailOpen?.(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    onProductDetailOpen?.(false);
  };

  const handleServiceTypeChange = (type: string) => {
    setSelectedServiceType(type);
    if (type === "Products" && onBackToProducts) {
      onBackToProducts();
    }
  };

  const filteredServices = searchQuery
    ? mockSalonServices.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockSalonServices;

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

  return (
    <div ref={popupContainerRef} className="h-full flex flex-col bg-background animate-fade-in relative">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-[22px] w-[22px] rounded-full ${viewMode === "image" ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => setViewMode("image")}
                  >
                    <img src={viewMode === "image" ? iconCameraWhite : iconCameraBlack} alt="Image view" className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-[22px] w-[22px] rounded-full ${viewMode === "grid" ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => setViewMode("grid")}
                  >
                    <img src={viewMode === "grid" ? iconGridWhite : iconGrid} alt="Grid view" className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`h-[22px] w-[22px] rounded-full ${viewMode === "list" ? "bg-primary text-primary-foreground" : ""}`}
                    onClick={() => setViewMode("list")}
                  >
                    <img src={viewMode === "list" ? iconListWhite : iconList} alt="List view" className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Service Type Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="retail-compact" className="flex items-center gap-1 flex-shrink-0">
                      {selectedServiceType}
                      <ChevronDown size={12} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-surface">
                    {serviceTypes.map(type => (
                      <DropdownMenuItem
                        key={type}
                        onClick={() => handleServiceTypeChange(type)}
                        className="text-[10px]"
                      >
                        {type}
                      </DropdownMenuItem>
                    ))}
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
                    {menuCategories.map(category => (
                      <DropdownMenuItem
                        key={category}
                        onClick={() => setSelectedMenuCategory(category)}
                        className="text-[10px]"
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}

            {/* Slidable Categories */}
            {categories.map(category => (
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
        </div>

        {/* Services Grid */}
        <div className="p-[6px]">
          <div className="grid grid-cols-2 gap-2 justify-items-center pb-2">
            {filteredServices.map(service => (
              <div
                key={service.id}
                className="w-full bg-surface rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCardClick(service)}
              >
                {/* Service Image or Placeholder */}
                {viewMode === "image" && service.image ? (
                  <div className="relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-[80px] object-cover"
                    />
                    <button
                      className="absolute top-2 left-2 w-[24px] h-[24px] bg-foreground rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(service);
                      }}
                    >
                      <img src={iconPlus} alt="Add" className="w-3 h-3 invert" />
                    </button>
                  </div>
                ) : (
                  <div className="relative h-[80px] bg-muted/20 flex items-center justify-center">
                    <button
                      className="w-[28px] h-[28px] bg-foreground rounded-full flex items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(service);
                      }}
                    >
                      <img src={iconPlus} alt="Add" className="w-3.5 h-3.5 invert" />
                    </button>
                  </div>
                )}
                
                {/* Service Info */}
                <div className="p-2">
                  <h3 className="text-[11px] font-semibold text-foreground leading-tight line-clamp-2 mb-1">
                    {service.name}
                  </h3>
                  <p className="text-[12px] font-bold text-foreground">
                    ${service.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Split Cart Strip */}
      {!isSheetOpen && splitPaymentInfo && splitPaymentInfo.paidChecksCount > 0 && splitPaymentInfo.remainingAmount > 0 && (
        <div
          className="w-full h-[24px] bg-[#1A1A1A] text-white flex items-center justify-between px-3 flex-shrink-0 cursor-pointer hover:bg-[#2A2A2A] transition-colors"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
          onClick={onSplitCartClick}
        >
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium">
              {cartItemCount} {cartItemCount === 1 ? 'Service' : 'Services'}
            </span>
          </div>
          <span className="text-[10px] font-semibold">
            ${splitPaymentInfo.remainingAmount.toFixed(2)}
          </span>
        </div>
      )}

      {/* Cart Strip */}
      {!isSheetOpen && (!splitPaymentInfo || splitPaymentInfo.paidChecksCount === 0 || splitPaymentInfo.remainingAmount <= 0) && (
        <CartStrip itemCount={cartItemCount} totalAmount={cartTotal} onClick={onCartClick} />
      )}

      {/* Service Detail Sheet */}
      <SalonServiceDetailSheet
        service={selectedService}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onAddToCart={onAddToCart}
        portalContainer={popupContainerRef.current}
      />
    </div>
  );
};
