import { X, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import iconPaymentComplete from '@/assets/icon-payment-complete.png';
import iconReceiptPrint from '@/assets/icon-receipt-print.png';
import iconReceiptText from '@/assets/icon-receipt-text.png';
import iconReceiptEmail from '@/assets/icon-receipt-email.png';

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
  const handlePrint = () => {
    // Print logic here
    console.log('Print receipt');
  };
  const handleText = () => {
    setShowTextInput(!showTextInput);
    setShowEmailInput(false);
  };
  const handleEmail = () => {
    setShowEmailInput(!showEmailInput);
    setShowTextInput(false);
  };
  const handleNoReceipt = () => {
    onClose();
  };

  const handleSendText = () => {
    console.log('Sending text to:', selectedCountryCode.code + phoneNumber);
    // Add send logic here
  };

  const handleSendEmail = () => {
    console.log('Sending email to:', email);
    // Add send logic here
  };
  return (
    <div className="w-[186px] min-h-[330px] bg-white flex flex-col mx-auto" style={{
      fontFamily: 'Montserrat, sans-serif'
    }}>
      {/* Header with Title and Close Button */}
      <div className="flex items-center justify-between pt-[10px] px-[6px]">
        <div className="w-[24px]" />
        <h1 className="text-[12px] font-bold text-gray-900">Pay by card</h1>
        <button onClick={onClose} className="w-[24px] h-[24px] rounded-full bg-gray-100 flex items-center justify-center">
          <X size={12} className="text-gray-600" />
        </button>
      </div>

      {/* Total Amount */}
      <div className="text-center mt-[16px]">
        <p className="text-[10px] text-gray-400 font-medium">Total Amount</p>
        <div className="flex items-start justify-center mt-[2px]">
          <span className="text-[12px] font-bold text-gray-900 mt-[4px]">$</span>
          <span className="text-[32px] font-bold text-gray-900 leading-none">{amount.toFixed(2)}</span>
        </div>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[16px]">
        <img src={iconPaymentComplete} alt="Success" className="w-[80px] h-[80px]" />
      </div>

      {/* Payment Complete Text */}
      <p className="text-center text-[14px] font-bold text-gray-900 mt-[8px]">
        Payment Complete
      </p>

      {/* Receipt Section */}
      <h2 className="text-center text-[16px] font-bold text-gray-900 mt-[16px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="flex justify-center gap-[6px] mt-[10px] px-[3px]">
        <button onClick={handlePrint} className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
          <img src={iconReceiptPrint} alt="Print" className="w-[20px] h-[20px] mb-[4px]" />
          <span className="text-[9px] font-semibold text-gray-900">Print</span>
        </button>

        <button onClick={handleText} className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
          <img src={iconReceiptText} alt="Text" className="w-[20px] h-[20px] mb-[4px]" />
          <span className="text-[9px] font-semibold text-gray-900">Text</span>
        </button>

        <button onClick={handleEmail} className="flex flex-col items-center justify-center w-[56px] h-[56px] rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
          <img src={iconReceiptEmail} alt="Email" className="w-[20px] h-[20px] mb-[4px]" />
          <span className="text-[9px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

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
              onChange={e => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
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
          {phoneNumber && (
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
      <div className="mt-[10px] mb-[10px] px-[3px]">
        <button onClick={handleNoReceipt} className="w-full h-[32px] bg-gray-100 text-gray-900 rounded-full font-bold text-[10px] tracking-wide hover:bg-gray-200 transition-colors">
          NO RECEIPT
        </button>
      </div>
    </div>
  );
};