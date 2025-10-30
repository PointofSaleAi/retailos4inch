import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import iconCustom from "@/assets/icon-custom.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";
import iconNote from "@/assets/icon-note.png";
import { X, Minus, Plus, Delete } from "lucide-react";

interface CustomPaymentScreenProps {
  onClose: () => void;
}

export const CustomPaymentScreen = ({ onClose }: CustomPaymentScreenProps) => {
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

  const productCount = quantity;
  const totalAmount = (parseFloat(amount) * quantity).toFixed(2);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-[6px] py-2 bg-surface">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
          <img src={iconCustom} alt="Custom" className="w-5 h-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <img src={iconHeart} alt="Favorites" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <img src={iconSearch} alt="Search" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <img src={iconMaximize} alt="Maximize" className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <img src={iconMore} alt="More" className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Header with Product Count and Total */}
      <div className="bg-foreground text-background px-3 h-[24px] flex items-center justify-between">
        <span className="text-[10px] font-semibold">{productCount} Product</span>
        <span className="text-[10px] font-semibold">${totalAmount}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-2.5 space-y-2.5 overflow-y-auto">
        {/* Product Name Card */}
        <div className="bg-surface rounded-xl p-3 flex items-center justify-between shadow-sm">
          {isEditingProductName ? (
            <Input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              onBlur={() => setIsEditingProductName(false)}
              autoFocus
              className="h-auto p-0 border-0 bg-transparent text-[10px] text-[#666666] focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          ) : (
            <span 
              className="text-[10px] text-[#666666] cursor-pointer"
              onClick={() => setIsEditingProductName(true)}
            >
              {productName}
            </span>
          )}
          <span className="text-sm font-semibold text-foreground">${amount}</span>
        </div>

        {/* Add Note Input with Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="relative w-[115px]">
            <img 
              src={iconNote} 
              alt="Note" 
              className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 opacity-40"
            />
            <Input
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="pl-7 bg-surface border-border/50 h-[28px] w-[115px] text-xs rounded-lg"
            />
          </div>
          
          {/* Quantity Controls */}
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 rounded-full border-border/50 flex-shrink-0 p-0"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-2.5 h-2.5" />
          </Button>
          
          <span className="text-xs font-medium w-4 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-5 w-5 rounded-full border-border/50 flex-shrink-0 p-0"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-2.5 h-2.5" />
          </Button>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {/* Row 1 */}
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("7")}
          >
            7
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("8")}
          >
            8
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("9")}
          >
            9
          </Button>
          <Button
            variant="outline"
            className="h-[100px] row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center rounded-xl"
            onClick={handleBackspace}
          >
            <Delete className="w-5 h-5 rotate-180" />
          </Button>

          {/* Row 2 */}
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("4")}
          >
            4
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("5")}
          >
            5
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("6")}
          >
            6
          </Button>

          {/* Row 3 */}
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("1")}
          >
            1
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("2")}
          >
            2
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("3")}
          >
            3
          </Button>
          <Button
            variant="outline"
            className="h-[100px] row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center rounded-xl"
          >
            <Plus className="w-6 h-6" />
          </Button>

          {/* Row 4 */}
          <Button
            variant="outline"
            className="h-12 col-span-2 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("00")}
          >
            00
          </Button>
          <Button
            variant="outline"
            className="h-12 text-base font-medium bg-surface hover:bg-surface/80 border-border/50 rounded-xl"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
        </div>
      </div>
    </div>
  );
};
