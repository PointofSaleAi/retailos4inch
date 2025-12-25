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
  return <div className="w-[186px] min-h-[186px] bg-white flex flex-col mx-auto" style={{
    fontFamily: 'Montserrat, sans-serif'
  }}>
      {/* Close Button */}
      <div className="flex justify-end pt-[6px] pr-[6px]">
        <button onClick={onClose} className="p-0">
          <X size={16} className="text-gray-900" />
        </button>
      </div>

      {/* Success Icon */}
      <div className="flex justify-center mt-[4px]">
        <img src={iconPaymentComplete} alt="Success" className="w-[48px] h-[48px]" />
      </div>

      {/* Success Message */}
      <div className="text-center mt-[6px] px-3">
        <p className="text-[11px] text-gray-600 leading-tight">
          <span className="font-bold text-gray-900">${amount.toFixed(2)}</span> has been successfully
        </p>
        <p className="text-[11px] text-gray-600">processed</p>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-200 mt-[6px]" />

      {/* Receipt Heading */}
      <h2 className="text-center text-[12px] font-bold text-gray-900 mt-[6px] mb-[6px]">
        Receipt
      </h2>

      {/* Receipt Options */}
      <div className="flex justify-center gap-2 px-0">
        <button onClick={handlePrint} className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptPrint} alt="Print" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[8px] font-semibold text-gray-900">Print</span>
        </button>

        <button onClick={handleText} className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptText} alt="Text" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[8px] font-semibold text-gray-900">Text</span>
        </button>

        <button onClick={handleEmail} className="flex flex-col items-center justify-center w-[58px] h-[58px] rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
          <img src={iconReceiptEmail} alt="Email" className="w-[18px] h-[18px] mb-[4px]" />
          <span className="text-[8px] font-semibold text-gray-900">Email</span>
        </button>
      </div>

      {/* Conditional Input Fields */}
      {showTextInput && <div className="mt-[6px] px-0 relative">
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
        </div>}

      {showEmailInput && <div className="mt-[6px] px-0">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email address" className="w-full h-[28px] px-[10px] border border-gray-200 rounded-lg text-[10px] focus:outline-none focus:border-gray-400" />
          {email && (
            <button
              onClick={handleSendEmail}
              className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors mt-[6px]"
            >
              SEND
            </button>
          )}
        </div>}

      {/* NO RECEIPT Button */}
      <div className="mt-[6px] mb-[6px] px-0">
        <button onClick={handleNoReceipt} className="w-full h-[28px] bg-gray-900 text-white rounded-full font-semibold text-[11px] tracking-wide hover:bg-gray-800 transition-colors">
          NO RECEIPT
        </button>
      </div>
    </div>;
};