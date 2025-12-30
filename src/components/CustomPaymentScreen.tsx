import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CartStrip } from "./CartStrip";
import { TopNavigation } from "./TopNavigation";
import iconNote from "@/assets/icon-note.png";
import { Minus, Plus, Delete } from "lucide-react";

interface CustomPaymentScreenProps {
  onClose: () => void;
  onAddCustomToCart: (item: { name: string; price: number; quantity: number; note: string }) => void;
  cartItemCount: number;
  cartTotal: number;
  onCartClick: () => void;
  onFavoritesClick?: () => void;
  onScanClick?: () => void;
  onAddTax?: () => void;
  onDiscount?: () => void;
  onGiftCard?: () => void;
  onRedeemLoyalty?: () => void;
  onDeliveryCharge?: () => void;
}

export const CustomPaymentScreen = ({
  onClose,
  onAddCustomToCart,
  cartItemCount,
  cartTotal,
  onCartClick,
  onFavoritesClick,
  onScanClick,
  onAddTax,
  onDiscount,
  onGiftCard,
  onRedeemLoyalty,
  onDeliveryCharge
}: CustomPaymentScreenProps) => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("0.00");
  const [productName, setProductName] = useState("Product Name");
  const [note, setNote] = useState("");
  const [isEditingProductName, setIsEditingProductName] = useState(false);
  const handleNumberClick = (num: string) => {
    if (amount === "0.00") {
      setAmount(`0.${num}`);
    } else {
      const [dollars, cents = ""] = amount.split(".");
      if (cents.length < 2) {
        setAmount(`${dollars}.${cents}${num}`);
      } else {
        setAmount(`${dollars}${cents}.${num}`);
      }
    }
  };
  const handleBackspace = () => {
    if (amount.length > 4) {
      const newAmount = amount.slice(0, -1);
      setAmount(newAmount || "0.00");
    } else {
      setAmount("0.00");
    }
  };

  const handleAddToCart = () => {
    const price = parseFloat(amount);
    if (price > 0) {
      onAddCustomToCart({
        name: productName,
        price: price,
        quantity: quantity,
        note: note
      });
      
      // Reset form but don't close - stay on screen to add more
      setAmount("0.00");
      setProductName("Product Name");
      setNote("");
      setQuantity(1);
    }
  };
  return <div className="h-full flex flex-col bg-background">
      {/* Top Navigation */}
      <TopNavigation 
        onCustomClick={onClose}
        onFavoritesClick={onFavoritesClick}
        onScanClick={onScanClick}
        onAddTax={onAddTax}
        onDiscount={onDiscount}
        onGiftCard={onGiftCard}
        onRedeemLoyalty={onRedeemLoyalty}
        onDeliveryCharge={onDeliveryCharge}
      />

      {/* Main Content */}
      <div className="flex-1 flex justify-center overflow-y-auto">
        <div className="w-[186px] space-y-1.5 px-0 py-0">
          {/* Product Name Card */}
          <div className="bg-surface rounded-xl p-3 flex items-center justify-between shadow-sm">
          {isEditingProductName ? <Input value={productName} onChange={e => setProductName(e.target.value)} onBlur={() => setIsEditingProductName(false)} autoFocus className="h-auto p-0 border-0 bg-transparent text-[10px] text-[#666666] focus-visible:ring-0 focus-visible:ring-offset-0" /> : <span className="text-[10px] text-[#666666] cursor-pointer" onClick={() => setIsEditingProductName(true)}>
              {productName}
            </span>}
          <span className="text-sm font-semibold text-foreground">${amount}</span>
        </div>

          {/* Add Note Input with Quantity Controls */}
          <div className="flex items-center gap-1.5">
            <div className="relative flex-1">
            <img src={iconNote} alt="Note" className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40" />
            <Input placeholder="Add a note" value={note} onChange={e => setNote(e.target.value)} className="pl-7 bg-surface border-border/50 h-[28px] text-xs rounded-lg" />
          </div>
          
          {/* Quantity Controls */}
          <Button variant="outline" size="icon" className="h-5 w-5 rounded-full border-border/50 flex-shrink-0 p-0" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            <Minus className="w-2.5 h-2.5" />
          </Button>
          
          <span className="text-xs font-medium w-4 text-center">{quantity}</span>
          
          <Button variant="outline" size="icon" className="h-5 w-5 rounded-full border-border/50 flex-shrink-0 p-0" onClick={() => setQuantity(quantity + 1)}>
            <Plus className="w-2.5 h-2.5" />
          </Button>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-4 gap-[2px]">
          {/* Row 1 */}
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("7")}>
            7
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("8")}>
            8
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("9")}>
            9
          </Button>
          <Button variant="outline" className="h-[82px] w-[37px] row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center rounded-xl" onClick={handleBackspace}>
            <Delete className="w-5 h-5 rotate-180" />
          </Button>

          {/* Row 2 */}
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("4")}>
            4
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("5")}>
            5
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("6")}>
            6
          </Button>

          {/* Row 3 */}
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("1")}>
            1
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("2")}>
            2
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("3")}>
            3
          </Button>
          <Button variant="outline" className="h-[82px] w-[37px] row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center rounded-xl" onClick={handleAddToCart}>
            <Plus className="w-6 h-6" />
          </Button>

          {/* Row 4 */}
          <Button variant="outline" className="h-[40px] col-span-2 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("00")}>
            00
          </Button>
          <Button variant="outline" className="h-[40px] w-[37px] text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl" onClick={() => handleNumberClick("0")}>
            0
          </Button>
        </div>
        </div>
      </div>
      
      {/* Cart Strip */}
      <CartStrip 
        itemCount={cartItemCount} 
        totalAmount={cartTotal} 
        onClick={onCartClick}
      />
    </div>;
};