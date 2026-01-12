import { useState, useEffect } from "react";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import iconDiscount from "@/assets/icon-discount.png";
import iconNote from "@/assets/icon-note.png";

interface SalonService {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

interface AddOn {
  id: string;
  name: string;
  price: number;
}

interface SalonServiceDetailSheetProps {
  service: SalonService | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (serviceId: string, quantity: number, addOns?: { name: string; price: number }[]) => void;
  portalContainer?: HTMLElement | null;
}

const addOns: AddOn[] = [
  { id: "1", name: "Hair Wash", price: 10.00 },
  { id: "2", name: "Scalp Massage", price: 15.00 },
  { id: "3", name: "Blow Dry & Styling", price: 20.00 },
  { id: "4", name: "Scalp Detox", price: 21.00 },
  { id: "5", name: "Hair Spa", price: 24.00 }
];

export const SalonServiceDetailSheet = ({
  service,
  isOpen,
  onClose,
  onAddToCart,
  portalContainer
}: SalonServiceDetailSheetProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Reset selections when sheet opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setSelectedAddOns([]);
    }
  }, [isOpen]);

  if (!service) return null;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setSelectedAddOns(prev =>
      prev.includes(addOnId)
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const calculateTotal = () => {
    const basePrice = service.price * quantity;
    const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return sum + (addOn?.price || 0);
    }, 0);
    return basePrice + addOnsTotal;
  };

  const handleAddToCart = () => {
    const selectedAddOnDetails = selectedAddOns.map(addOnId => {
      const addOn = addOns.find(a => a.id === addOnId);
      return { name: addOn?.name || "", price: addOn?.price || 0 };
    });
    onAddToCart(service.id, quantity, selectedAddOnDetails);
    onClose();
    setQuantity(1);
    setSelectedAddOns([]);
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent
        container={portalContainer}
        className="!w-full !left-0 !right-0 !inset-x-0 !bottom-0 !top-auto rounded-t-[16px] max-h-[70%] overflow-hidden pb-0"
      >
        <div className="w-full pt-1 pb-0 flex flex-col h-full" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {/* Handle bar */}
          <div className="w-[36px] h-[3px] bg-muted-foreground/30 rounded-full mx-auto mb-2" />

          {/* Service Name and Quantity - side by side */}
          <div className="px-3 mb-2 flex items-start justify-between gap-2">
            <h2 className="text-[14px] font-bold text-foreground leading-[18px] flex-1">
              {service.name}
            </h2>

            {/* Quantity Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-[26px] h-[26px] rounded-full bg-foreground flex items-center justify-center text-background hover:bg-foreground/90"
              >
                <span className="text-[14px] font-medium">−</span>
              </button>
              <span className="text-[14px] font-semibold text-foreground min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-[26px] h-[26px] rounded-full bg-foreground flex items-center justify-center text-background hover:bg-foreground/90"
              >
                <span className="text-[14px] font-medium">+</span>
              </button>
            </div>
          </div>

          {/* Notes Button */}
          <div className="px-3 mb-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-muted-foreground hover:bg-muted/20 transition-colors">
              <img src={iconNote} alt="Notes" className="w-4 h-4 opacity-60" />
              <span className="text-[11px] font-medium">Notes</span>
            </button>
          </div>

          {/* Add-Ons Section */}
          <div className="flex-1 overflow-y-auto px-3">
            <h3 className="text-[12px] font-bold text-foreground mb-2">Add-Ons</h3>
            
            <div className="space-y-0">
              {addOns.map((addOn) => (
                <div
                  key={addOn.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-[20px] h-[20px] rounded-full border-2 flex items-center justify-center transition-colors ${
                        selectedAddOns.includes(addOn.id)
                          ? "bg-foreground border-foreground"
                          : "border-muted-foreground/40 bg-transparent"
                      }`}
                    >
                      {selectedAddOns.includes(addOn.id) && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4L3.5 6.5L9 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    <span className="text-[12px] font-medium text-foreground">{addOn.name}</span>
                  </div>
                  <span className="text-[12px] font-semibold text-foreground">
                    ${addOn.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-2 pb-3 px-3">
            <div className="flex items-center gap-2">
              <button className="w-[32px] h-[32px] bg-background border border-border rounded-lg flex items-center justify-center hover:bg-muted">
                <img src={iconDiscount} alt="Discount" className="w-[16px] h-[16px]" />
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 h-[36px] bg-foreground text-background rounded-full text-[12px] font-bold hover:bg-foreground/90 transition-colors"
              >
                ADD ${calculateTotal().toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
