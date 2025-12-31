import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import iconMenu from "@/assets/icon-menu.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch20 from "@/assets/icon-search-20.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";
import iconCustom from "@/assets/icon-custom.png";
import iconNewOrder from "@/assets/icon-new-order.png";
import iconSearch14 from "@/assets/icon-search-14.png";
import iconMic14 from "@/assets/icon-mic-14.png";
import iconClose14 from "@/assets/icon-close-14.png";
import iconAddTax from "@/assets/icon-add-tax.png";
import iconDiscount from "@/assets/icon-discount.png";
import iconGiftCard from "@/assets/icon-gift-card.png";
import iconRedeemLoyalty from "@/assets/icon-redeem-loyalty.png";
import iconDeliveryCharge from "@/assets/icon-delivery-charge.png";

interface TopNavigationProps {
  onCustomClick?: () => void;
  onFavoritesClick?: () => void;
  onSearchChange?: (query: string) => void;
  onScanClick?: () => void;
  onAddTax?: () => void;
  onDiscount?: () => void;
  onGiftCard?: () => void;
  onRedeemLoyalty?: () => void;
  onDeliveryCharge?: () => void;
  isCustomScreen?: boolean;
}

export const TopNavigation = ({ 
  onCustomClick, 
  onFavoritesClick, 
  onSearchChange, 
  onScanClick,
  onAddTax,
  onDiscount,
  onGiftCard,
  onRedeemLoyalty,
  onDeliveryCharge,
  isCustomScreen = false
}: TopNavigationProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement | null>(null);

  // Close the More menu when tapping outside
  useEffect(() => {
    if (!isMoreMenuOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const el = moreMenuRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) {
        setIsMoreMenuOpen(false);
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => window.removeEventListener('pointerdown', onPointerDown);
  }, [isMoreMenuOpen]);

  const handleSearchClick = () => {
    setShowSearch(true);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
    setSearchQuery("");
    onSearchChange?.("");
  };

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange?.(query);
  };

  const menuItems = [
    { label: 'Add Tax', icon: iconAddTax, action: onAddTax },
    { label: 'Discount', icon: iconDiscount, action: onDiscount },
    { label: 'Gift Card', icon: iconGiftCard, action: onGiftCard },
    { label: 'Redeem Loyalty', icon: iconRedeemLoyalty, action: onRedeemLoyalty },
    { label: 'Delivery Charge', icon: iconDeliveryCharge, action: onDeliveryCharge },
  ];

  if (showSearch) {
    return (
      <nav className="flex items-center gap-2 px-[6px] py-2 bg-surface">
        <div className="flex items-center gap-2 px-2 rounded-lg" style={{ backgroundColor: '#F1F2F5', height: '26px', width: '156px' }}>
          <img src={iconSearch14} alt="Search" className="w-[14px] h-[14px] min-w-[14px] min-h-[14px]" />
          <Input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearchInput}
            className="flex-1 border-0 bg-transparent h-auto p-0 text-[11px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
            autoFocus
          />
          <img src={iconMic14} alt="Voice" className="w-[14px] h-[14px] min-w-[14px] min-h-[14px] cursor-pointer" />
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-[26px] w-[26px] p-0"
          onClick={handleCloseSearch}
        >
          <img src={iconClose14} alt="Close" className="w-[10px] h-[10px] min-w-[10px] min-h-[10px]" />
        </Button>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-[6px] py-2 bg-surface">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8"
        onClick={onCustomClick}
      >
        <img src={isCustomScreen ? iconNewOrder : (onCustomClick ? iconCustom : iconMenu)} alt="Custom" className="w-5 h-5 min-w-5 min-h-5" />
      </Button>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onFavoritesClick}
        >
          <img src={iconHeart} alt="Favorites" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleSearchClick}
        >
          <img src={iconSearch20} alt="Search" className="w-[15px] h-[15px] min-w-[15px] min-h-[15px]" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={onScanClick}
        >
          <img src={iconMaximize} alt="Scan" className="w-5 h-5 min-w-5 min-h-5" />
        </Button>
        
        <div ref={moreMenuRef} className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setIsMoreMenuOpen(v => !v)}
          >
            <img src={iconMore} alt="More" className="w-5 h-5 min-w-5 min-h-5" />
          </Button>

          {isMoreMenuOpen && (
            <>
              {/* Black overlay */}
              <div 
                className="fixed inset-0 bg-black/40 z-40"
                onClick={() => setIsMoreMenuOpen(false)}
              />
              <div className="absolute right-0 top-[32px] z-50 w-[140px]">
                <div className="flex flex-col gap-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      className="flex h-[28px] w-full items-center gap-2 rounded-full bg-white px-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                      onClick={() => {
                        setIsMoreMenuOpen(false);
                        item.action?.();
                      }}
                    >
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F1F2F5]">
                        <img src={item.icon} alt={item.label} className="h-[12px] w-[12px]" />
                      </span>
                      <span className="text-[10px] font-medium text-gray-900">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};