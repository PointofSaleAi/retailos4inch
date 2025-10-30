import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import iconCustom from "@/assets/icon-custom.png";
import iconNote from "@/assets/icon-note.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";
import { X, Minus, Plus, Delete } from "lucide-react";

interface CustomPaymentScreenProps {
  onClose: () => void;
}

export const CustomPaymentScreen = ({ onClose }: CustomPaymentScreenProps) => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("0.00");
  const [productName, setProductName] = useState("Product Name");
  const [note, setNote] = useState("");

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
    <div className="h-full flex flex-col bg-background w-[186px] p-1.5">
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
      <div className="bg-foreground text-background px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-medium">{productCount} Product</span>
        <span className="text-sm font-medium">${totalAmount}</span>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {/* Product Name Card */}
        <div className="bg-surface rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <span className="text-sm text-foreground">{productName}</span>
          <span className="text-sm font-semibold text-foreground">${amount}</span>
        </div>

        {/* Add Note Input with Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <img 
              src={iconNote} 
              alt="Note" 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-40"
            />
            <Input
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="pl-10 bg-surface border-border/50 h-12 text-sm"
            />
          </div>
          
          {/* Quantity Controls */}
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-border/50 flex-shrink-0"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="w-4 h-4" />
          </Button>
          
          <span className="text-sm font-medium w-6 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-12 w-12 rounded-full border-border/50 flex-shrink-0"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-4 gap-2 pt-2">
          {/* Row 1 */}
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("7")}
          >
            7
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("8")}
          >
            8
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("9")}
          >
            9
          </Button>
          <Button
            variant="outline"
            className="h-16 row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center"
            onClick={handleBackspace}
          >
            <Delete className="w-5 h-5 rotate-180" />
          </Button>

          {/* Row 2 */}
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("4")}
          >
            4
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("5")}
          >
            5
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("6")}
          >
            6
          </Button>

          {/* Row 3 */}
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("1")}
          >
            1
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("2")}
          >
            2
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("3")}
          >
            3
          </Button>
          <Button
            variant="outline"
            className="h-16 row-span-2 bg-surface hover:bg-surface/80 border-border/50 flex items-center justify-center"
          >
            <Plus className="w-6 h-6" />
          </Button>

          {/* Row 4 */}
          <Button
            variant="outline"
            className="h-16 col-span-2 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("00")}
          >
            00
          </Button>
          <Button
            variant="outline"
            className="h-16 text-lg font-medium bg-surface hover:bg-surface/80 border-border/50"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
        </div>
      </div>
    </div>
  );
};
