import { X, ChevronDown, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import iconPaymentComplete from '@/assets/icon-payment-complete.png';
import iconReceiptPrint from '@/assets/icon-receipt-print.png';
import iconReceiptText from '@/assets/icon-receipt-text.png';
import iconReceiptEmail from '@/assets/icon-receipt-email.png';
import iconPrintReceipt from '@/assets/icon-print-receipt.png';
import iconPrintBill from '@/assets/icon-print-bill.png';
import iconPrintBoth from '@/assets/icon-print-both.png';
import { formatPhoneNumber, validatePhoneNumber } from '@/hooks/usePhoneInput';

const countryCodes = [
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+91', country: 'IN', flag: '🇮🇳' },
  { code: '+86', country: 'CN', flag: '🇨🇳' },
  { code: '+81', country: 'JP', flag: '🇯🇵' },
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+61', country: 'AU', flag: '🇦🇺' },
  { code: '+971', country: 'AE', flag: '🇦🇪' },
  { code: '+966', country: 'SA', flag: '🇸🇦' },
];

interface ConfirmationToastProps {
  message: string;
  onDismiss: () => void;
}

const ConfirmationToast = ({ message, onDismiss }: ConfirmationToastProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2000);
    
    const dismissTimer = setTimeout(() => {
      onDismiss();
    }, 2300);
    
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  return (
    <div 
      className={`absolute inset-0 flex items-center justify-center bg-black/50 z-50 transition-opacity duration-300 ${
        isExiting ? 'opacity-0' : 'opacity-100 animate-fade-in'
      }`}
    >
      <div 
        className={`bg-white rounded-xl px-4 py-3 shadow-lg flex flex-col items-center gap-2 mx-3 transition-all duration-300 ${
          isExiting ? 'scale-95 opacity-0' : 'animate-scale-in'
        }`}
      >
        <div className="w-8 h-8 rounded-full bg-[#10B981] flex items-center justify-center">
          <Check className="w-5 h-5 text-white" strokeWidth={3} />
        </div>
        <p className="text-[10px] font-medium text-gray-900 text-center leading-tight">
          {message}
        </p>
      </div>
    </div>
  );
};

interface PaymentSuccessScreenProps {
  amount: number;
  onClose: () => void;
}
export const PaymentSuccessScreen = ({
  amount,
  onClose
}: PaymentSuccessScreenProps) => {
  const [showTextInput, setShowTextInput] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showPrintOptions, setShowPrintOptions] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  
  const showConfirmation = (message: string) => {
    setConfirmationMessage(message);
  };

  const handleDismissConfirmation = () => {
    setConfirmationMessage(null);
  };
  
  const handlePrint = () => {
    setShowPrintOptions(!showPrintOptions);
    setShowTextInput(false);
    setShowEmailInput(false);
  };
  
  const handlePrintReceipt = () => {
    console.log('Print Receipt');
    setShowPrintOptions(false);
    showConfirmation('Your receipt has been printed successfully.');
  };
  
  const handlePrintBill = () => {
    console.log('Print Bill');
    setShowPrintOptions(false);
    showConfirmation('Your bill has been printed successfully.');
  };
  
  const handlePrintBoth = () => {
    console.log('Print Both');
    setShowPrintOptions(false);
    showConfirmation('Your receipt and bill have been printed successfully.');
  };
  const handleText = () => {
    setShowTextInput(!showTextInput);
    setShowEmailInput(false);
    setShowPrintOptions(false);
  };
  const handleEmail = () => {
    setShowEmailInput(!showEmailInput);
    setShowTextInput(false);
    setShowPrintOptions(false);
  };
  const handleNoReceipt = () => {
    onClose();
  };

  const handleSendText = () => {
    const fullPhone = selectedCountryCode.code + phoneNumber;
    console.log('Sending text to:', fullPhone);
    showConfirmation(`Your receipt has been sent to ${fullPhone}`);
    setShowTextInput(false);
    setPhoneNumber('');
  };

  const handleSendEmail = () => {
    console.log('Sending email to:', email);
    showConfirmation(`Your receipt has been sent to ${email}`);
    setShowEmailInput(false);
    setEmail('');
  };
  return (
    <div className="w-[186px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden relative" style={{
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Confirmation Toast */}
      {confirmationMessage && (
        <ConfirmationToast 
          message={confirmationMessage} 
          onDismiss={handleDismissConfirmation} 
        />
      )}

      {/* Header with Title and Close Button */}
      <div className="flex items-center justify-between pt-[8px] px-[6px]">
        <div className="w-[24px]" />
        <h1 className="text-[12px] font-bold text-gray-900">Pay by card</h1>
        <button onClick={onClose} className="w-[24px] h-[24px] rounded-full bg-gray-100 flex items-center justify-center">
          <X size={12} className="text-gray-600" />
        </button>
      </div>

      {/* Total Amount */}
      <div className="text-center mt-[10px]">
        <p className="text-[9px] text-gray-400 font-medium">Total Amount</p>
        <div className="flex items-start justify-center mt-[1px]">
          <span className="text-[10px] font-bold text-gray-900 mt-[3px]">$</span>
          <span className="text-[26px] font-bold text-gray-900 leading-none">{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[10px]">
        <img src={iconPaymentComplete} alt="Success" className="w-[60px] h-[60px]" />
      </div>

      {/* Payment Complete Text */}
      <p className="text-center text-[12px] font-bold text-gray-900 mt-[6px]">
        Payment Complete
      </p>

      {/* Receipt Section */}
      <h2 className="text-center text-[14px] font-bold text-gray-900 mt-[10px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="flex justify-center gap-[5px] mt-[8px] px-[3px]">
        <button onClick={handlePrint} className={`flex flex-col items-center justify-center w-[52px] h-[48px] rounded-lg border transition-colors ${showPrintOptions ? 'border-gray-400 bg-gray-700' : 'border-gray-200 bg-gray-50 hover:bg-gray-100'}`}>
          <img src={iconReceiptPrint} alt="Print" className={`w-[18px] h-[18px] mb-[3px] ${showPrintOptions ? 'brightness-0 invert' : ''}`} />
          <span className={`text-[8px] font-semibold ${showPrintOptions ? 'text-white' : 'text-gray-900'}`}>Print</span>
        </button>

        <button onClick={handleText} className="flex flex-col items-center justify-center w-[52px] h-[48px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
          <img src={iconReceiptText} alt="Text" className="w-[18px] h-[18px] mb-[3px]" />
          <span className="text-[8px] font-semibold text-gray-900">Text</span>
        </button>

        <button onClick={handleEmail} className="flex flex-col items-center justify-center w-[52px] h-[48px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
          <img src={iconReceiptEmail} alt="Email" className="w-[18px] h-[18px] mb-[3px]" />
          <span className="text-[8px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

      {/* Print Options Row */}
      {showPrintOptions && (
        <div className="flex justify-center gap-[1px] mt-[6px] px-[3px]">
          <button onClick={handlePrintReceipt} className="flex items-center justify-center flex-1 h-[32px] rounded-l-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            <img src={iconPrintReceipt} alt="Print Receipt" className="w-[18px] h-[18px]" />
          </button>
          <button onClick={handlePrintBill} className="flex items-center justify-center flex-1 h-[32px] border-y border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            <img src={iconPrintBill} alt="Print Bill" className="w-[18px] h-[18px]" />
          </button>
          <button onClick={handlePrintBoth} className="flex items-center justify-center flex-1 h-[32px] rounded-r-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
            <img src={iconPrintBoth} alt="Print Both" className="w-[30px] h-[18px]" />
          </button>
        </div>
      )}

      {/* Conditional Input Fields */}
      {showTextInput && (
        <div className="mt-[8px] px-[3px] relative">
          <div className="relative flex items-center w-full h-[28px] border border-gray-200 rounded-lg focus-within:border-gray-400">
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="flex items-center gap-1 px-2 border-r border-gray-200 h-full"
            >
              <span className="text-[12px]">{selectedCountryCode.flag}</span>
              <span className="text-[10px] text-gray-900">{selectedCountryCode.code}</span>
              <ChevronDown size={10} className="text-gray-600" />
            </button>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
              maxLength={14}
              placeholder="(xxx) xxx xxxx"
              className="flex-1 h-full px-[10px] text-[10px] focus:outline-none bg-transparent"
            />
          </div>
          {showCountryDropdown && (
            <div className="absolute z-10 mt-1 w-full max-h-[120px] overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg">
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  onClick={() => {
                    setSelectedCountryCode(country);
                    setShowCountryDropdown(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 text-left"
                >
                  <span className="text-[12px]">{country.flag}</span>
                  <span className="text-[10px] text-gray-900">{country.code}</span>
                  <span className="text-[9px] text-gray-500">{country.country}</span>
                </button>
              ))}
            </div>
          )}
          {validatePhoneNumber(phoneNumber) && (
            <button
              onClick={handleSendText}
              className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors mt-[6px]"
            >
              SEND
            </button>
          )}
        </div>
      )}

      {showEmailInput && (
        <div className="mt-[8px] px-[3px]">
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            placeholder="Enter email address" 
            className="w-full h-[28px] px-[10px] border border-gray-200 rounded-lg text-[10px] focus:outline-none focus:border-gray-400" 
          />
          {email && (
            <button
              onClick={handleSendEmail}
              className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors mt-[6px]"
            >
              SEND
            </button>
          )}
        </div>
      )}

      {/* NO RECEIPT Button */}
      <div className="mt-auto pb-[8px] px-[3px]">
        <button onClick={handleNoReceipt} className="w-full h-[28px] bg-gray-100 text-gray-900 rounded-full font-bold text-[9px] tracking-wide hover:bg-gray-200 transition-colors">
          NO RECEIPT
        </button>
      </div>
    </div>
  );
};