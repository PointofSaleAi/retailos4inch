import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import iconDocument from "@/assets/icon-document.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";

export const CustomerPaymentScreen = () => {
  const [productName, setProductName] = useState("");
  const [amount, setAmount] = useState("0.00");
  const [notes, setNotes] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [productCount, setProductCount] = useState(0);

  const handleNumberClick = (num: string) => {
    if (amount === "0.00") {
      setAmount(num === "00" ? "0.00" : `0.0${num}`);
    } else {
      const newAmount = amount.replace(".", "") + num;
      const formatted = (parseInt(newAmount) / 100).toFixed(2);
      setAmount(formatted);
    }
  };

  const handleBackspace = () => {
    if (amount === "0.00") return;
    const withoutDecimal = amount.replace(".", "");
    const newAmount = withoutDecimal.slice(0, -1);
    if (newAmount.length === 0) {
      setAmount("0.00");
    } else {
      const formatted = (parseInt(newAmount) / 100).toFixed(2);
      setAmount(formatted);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between px-[6px] py-2 bg-surface border-b border-border">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <img src={iconDocument} alt="Document" className="w-5 h-5" />
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

      {/* Product Count Header */}
      <div className="bg-[#1a1a1a] text-white px-4 py-2 flex items-center justify-between">
        <span className="text-sm font-medium">{productCount} Product</span>
        <span className="text-sm font-semibold">${(parseFloat(amount) * quantity).toFixed(2)}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-3 space-y-3">
        {/* Product Name Card */}
        <div className="bg-surface rounded-xl p-4 flex items-center justify-between border border-border shadow-sm">
          <span className="text-sm text-muted-foreground">Product Name</span>
          <span className="text-lg font-semibold">${amount}</span>
        </div>

        {/* Notes and Quantity Controls */}
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <img 
              src={iconDocument} 
              alt="Note" 
              className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50"
            />
            <Input
              placeholder="Add a note"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="pl-10 h-11 bg-surface border-border"
            />
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              className="h-11 w-11 rounded-full border-border"
            >
              <span className="text-lg">−</span>
            </Button>
            <span className="text-base font-medium w-6 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              className="h-11 w-11 rounded-full border-border"
            >
              <span className="text-lg">+</span>
            </Button>
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          {/* Row 1 */}
          <Button
            variant="outline"
            onClick={() => handleNumberClick("7")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            7
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("8")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            8
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("9")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            9
          </Button>
          <Button
            variant="outline"
            onClick={handleBackspace}
            className="h-14 row-span-2 bg-surface hover:bg-accent border-border rounded-xl flex items-center justify-center"
          >
            <span className="text-2xl">←</span>
          </Button>

          {/* Row 2 */}
          <Button
            variant="outline"
            onClick={() => handleNumberClick("4")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            4
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("5")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            5
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("6")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            6
          </Button>

          {/* Row 3 */}
          <Button
            variant="outline"
            onClick={() => handleNumberClick("1")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            1
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("2")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            2
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("3")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            3
          </Button>
          <Button
            variant="outline"
            className="h-14 row-span-2 bg-surface hover:bg-accent border-border rounded-xl flex items-center justify-center"
          >
            <span className="text-2xl">+</span>
          </Button>

          {/* Row 4 */}
          <Button
            variant="outline"
            onClick={() => handleNumberClick("00")}
            className="h-14 col-span-2 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            00
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNumberClick("0")}
            className="h-14 text-xl font-medium bg-surface hover:bg-accent border-border rounded-xl"
          >
            0
          </Button>
        </div>
      </div>
    </div>
  );
};
