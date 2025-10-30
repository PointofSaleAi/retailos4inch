import { useState } from "react";
import iconDocument from "@/assets/icon-document.png";
import iconHeart from "@/assets/icon-heart.png";
import iconSearch from "@/assets/icon-search.png";
import iconMaximize from "@/assets/icon-maximize.png";
import iconMore from "@/assets/icon-more.png";

export const CustomerPaymentScreen = () => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState("0.00");
  const [note, setNote] = useState("");
  const [productName, setProductName] = useState("Product Name");

  const handleNumberClick = (num: string) => {
    if (amount === "0.00") {
      setAmount(num === "00" ? "0.00" : `0.0${num}`);
    } else {
      const current = amount.replace(".", "");
      const newAmount = current + num;
      const formatted = (parseInt(newAmount) / 100).toFixed(2);
      setAmount(formatted);
    }
  };

  const handleBackspace = () => {
    if (amount === "0.00") return;
    const current = amount.replace(".", "");
    const newAmount = current.slice(0, -1) || "0";
    const formatted = (parseInt(newAmount) / 100).toFixed(2);
    setAmount(formatted);
  };

  const handleClear = () => {
    setAmount("0.00");
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top Icon Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2">
        <button className="p-1">
          <img src={iconDocument} alt="" className="w-5 h-5" />
        </button>
        <button className="p-1">
          <img src={iconHeart} alt="" className="w-5 h-5" />
        </button>
        <button className="p-1">
          <img src={iconSearch} alt="" className="w-5 h-5" />
        </button>
        <button className="p-1">
          <img src={iconMaximize} alt="" className="w-5 h-5" />
        </button>
        <button className="p-1">
          <img src={iconMore} alt="" className="w-5 h-5" />
        </button>
      </div>

      {/* Header Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2" style={{ backgroundColor: '#1a1a1a' }}>
        <span className="text-sm font-medium text-white">0 Product</span>
        <span className="text-sm font-semibold text-white">${amount}</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {/* Product Card */}
        <div className="bg-white rounded-xl p-3 mb-3 flex items-center justify-between" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="text-sm font-normal text-muted-foreground bg-transparent border-none outline-none flex-1"
          />
          <span className="text-lg font-bold text-foreground">${amount}</span>
        </div>

        {/* Note and Quantity Controls */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-white rounded-full px-3 py-1.5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <img src={iconDocument} alt="" className="w-4 h-4 opacity-40" />
            <input
              type="text"
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 text-xs text-muted-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground"
            />
          </div>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-foreground font-medium"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              −
            </button>
            <span className="text-sm font-medium text-foreground w-4 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-foreground font-medium"
              style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
            >
              +
            </button>
          </div>
        </div>

        {/* Numeric Keypad */}
        <div className="grid grid-cols-4 gap-2">
          {/* Row 1 */}
          <button
            onClick={() => handleNumberClick("7")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            7
          </button>
          <button
            onClick={() => handleNumberClick("8")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            8
          </button>
          <button
            onClick={() => handleNumberClick("9")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            9
          </button>
          <button
            onClick={handleBackspace}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-foreground row-span-2"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12H9" />
              <path d="m9 12 6 6" />
              <path d="m9 12 6-6" />
            </svg>
          </button>

          {/* Row 2 */}
          <button
            onClick={() => handleNumberClick("4")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            4
          </button>
          <button
            onClick={() => handleNumberClick("5")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            5
          </button>
          <button
            onClick={() => handleNumberClick("6")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            6
          </button>

          {/* Row 3 */}
          <button
            onClick={() => handleNumberClick("1")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            1
          </button>
          <button
            onClick={() => handleNumberClick("2")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            2
          </button>
          <button
            onClick={() => handleNumberClick("3")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            3
          </button>
          <button
            onClick={handleClear}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-3xl font-light text-foreground row-span-2"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            +
          </button>

          {/* Row 4 */}
          <button
            onClick={() => handleNumberClick("00")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground col-span-2"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            00
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="aspect-square bg-white rounded-xl flex items-center justify-center text-2xl font-medium text-foreground"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
          >
            0
          </button>
        </div>
      </div>
    </div>
  );
};
