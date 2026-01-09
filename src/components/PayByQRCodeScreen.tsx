import { useState, useRef, useEffect } from "react";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";
import qrCodePayment from "@/assets/qr-code-payment.png";
import { Input } from "./ui/input";
import { formatPhoneNumber, getDigitsFromPhone, validatePhoneNumber, countryOptions } from "@/hooks/usePhoneInput";

// Email validation regex
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

interface PayByQRCodeScreenProps {
  amount: number;
  onBack: () => void;
  onShare: (method: 'whatsapp' | 'text' | 'email', contactInfo: string) => void;
}
export const PayByQRCodeScreen = ({
  amount,
  onBack,
  onShare
}: PayByQRCodeScreenProps) => {
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'text' | 'email' | null>(null);
  const [showQuickSend, setShowQuickSend] = useState(false);
  const [quickSendInput, setQuickSendInput] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (tab: 'whatsapp' | 'text' | 'email') => {
    setActiveTab(tab);
    setShowQuickSend(true);
    setQuickSendInput('');
    setShowCountryDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (activeTab === 'email') {
      setQuickSendInput(value);
    } else {
      // For WhatsApp/Text: format as phone number (only digits, max 10)
      const formatted = formatPhoneNumber(value);
      setQuickSendInput(formatted);
    }
  };

  const isInputValid = (): boolean => {
    if (!quickSendInput.trim()) return false;
    
    if (activeTab === 'email') {
      return isValidEmail(quickSendInput);
    } else {
      // WhatsApp/Text: must be exactly 10 digits
      return validatePhoneNumber(quickSendInput);
    }
  };

  const handleQuickSend = () => {
    if (!isInputValid() || !activeTab) return;
    
    // Format contact info for display
    const contactInfo = activeTab === 'email' 
      ? quickSendInput.trim()
      : `${selectedCountry.code} ${quickSendInput}`;
    
    onShare(activeTab, contactInfo);
    setShowQuickSend(false);
    setQuickSendInput('');
  };

  const getQuickSendPlaceholder = () => {
    switch (activeTab) {
      case 'whatsapp':
        return 'Enter phone number...';
      case 'text':
        return 'Enter phone number...';
      case 'email':
        return 'Enter email address...';
      default:
        return '';
    }
  };
  return <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" style={{
    fontFamily: "Montserrat, sans-serif",
    width: "189px",
    height: "330px"
  }}>
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-3">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-[#1A1A1A]" style={{
        fontFamily: "Montserrat, sans-serif"
      }}>
          Pay by QR Code
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center pt-1 overflow-hidden px-0">
        {/* Total Amount */}
        <div className="text-center mb-2">
          <p className="text-[8px] text-[#666666]" style={{
          fontFamily: "Montserrat, sans-serif"
        }}>
            Total Amount
          </p>
          <p className="text-[20px] font-bold text-[#1A1A1A]" style={{
          fontFamily: "Montserrat, sans-serif"
        }}>
            <span className="text-[10px] align-top">$</span>
            {amount.toFixed(2)}
          </p>
        </div>

        {/* QR Code */}
        <div className="bg-white rounded-lg p-2 shadow-sm py-0 px-0">
          <img src={qrCodePayment} alt="QR Code" className="w-[100px] h-[100px] object-contain" />
        </div>
      </div>

      {/* Share Options - Fixed at bottom */}
      <div className="pb-2 px-0">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white mb-2">
          <button onClick={() => handleTabClick('whatsapp')} className={`flex-1 py-1.5 flex items-center justify-center ${activeTab === 'whatsapp' && showQuickSend ? 'bg-gray-100' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
          <button onClick={() => handleTabClick('text')} className={`flex-1 py-1.5 flex items-center justify-center border-l border-r border-gray-200 ${activeTab === 'text' && showQuickSend ? 'bg-gray-100' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button onClick={() => handleTabClick('email')} className={`flex-1 py-1.5 flex items-center justify-center ${activeTab === 'email' && showQuickSend ? 'bg-gray-100' : ''}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </button>
        </div>

        {/* Quick Send Input - Shows when tab is clicked */}
        {showQuickSend && <div className="bg-white rounded-lg px-2 py-2 border border-gray-200">
            {activeTab !== 'email' ? (
              <div className="flex gap-1 mb-2">
                {/* Country Code Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center justify-center gap-0.5 border border-gray-200 bg-white rounded-md px-1"
                    style={{ height: '26px', fontSize: '9px', minWidth: '48px' }}
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-[8px]">{selectedCountry.code}</span>
                    <svg width="8" height="8" viewBox="0 0 10 6" fill="none" className="ml-0.5">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m1 1 4 4 4-4"/>
                    </svg>
                  </button>
                  
                  {showCountryDropdown && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 w-[120px] max-h-[100px] overflow-y-auto">
                      {countryOptions.map((country, index) => (
                        <button
                          key={`${country.code}-${index}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setShowCountryDropdown(false);
                          }}
                          className="w-full flex items-center gap-1 px-2 py-1 hover:bg-gray-100 text-left"
                          style={{ fontSize: '8px' }}
                        >
                          <span>{country.flag}</span>
                          <span className="truncate">{country.name}</span>
                          <span className="text-gray-500 ml-auto">{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Phone Input */}
                <Input 
                  type="tel" 
                  placeholder={getQuickSendPlaceholder()} 
                  value={quickSendInput} 
                  onChange={handleInputChange} 
                  className="flex-1 border border-gray-200 bg-white" 
                  style={{
                    height: '26px',
                    fontSize: '9px',
                    borderRadius: '6px'
                  }} 
                />
              </div>
            ) : (
              <Input 
                type="email" 
                placeholder={getQuickSendPlaceholder()} 
                value={quickSendInput} 
                onChange={handleInputChange} 
                className="border border-gray-200 bg-white mb-2" 
                style={{
                  height: '26px',
                  fontSize: '9px',
                  borderRadius: '6px'
                }} 
              />
            )}
            <button onClick={handleQuickSend} disabled={!isInputValid()} className="w-full py-1.5 bg-[#4A4A4A] text-white rounded-lg text-[9px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
              Send
            </button>
          </div>}
      </div>
    </div>;
};