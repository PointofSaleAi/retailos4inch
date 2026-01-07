import { useState } from 'react';
import { Input } from './ui/input';
import { ChevronDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/select';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import { formatPhoneNumber, countryOptions } from '@/hooks/usePhoneInput';

interface LoyaltyAddGuestScreenProps {
  onBack: () => void;
  onAdd: (guest: { name: string; email: string; phone: string }) => void;
}

export const LoyaltyAddGuestScreen = ({ onBack, onAdd }: LoyaltyAddGuestScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [countryFlag, setCountryFlag] = useState('🇺🇸');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhone(formatted);
  };

  const handleCountryCodeChange = (value: string) => {
    const selected = countryOptions.find(opt => `${opt.flag}-${opt.code}` === value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryFlag(selected.flag);
    }
  };

  const handleAdd = () => {
    if (name.trim()) {
      onAdd({ name: name.trim(), email: email.trim(), phone: `${countryCode} ${phone.trim()}` });
    }
  };

  return (
    <div
      className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto"
      style={{ fontFamily: 'Montserrat, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-0">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">Add Guest</span>
      </div>

      {/* Form */}
      <div className="flex-1 px-0 pt-2 space-y-3">
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="bg-white border border-gray-200"
          style={{
            height: '36px',
            fontSize: '11px',
            borderRadius: '8px'
          }}
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="bg-white border border-gray-200"
          style={{
            height: '36px',
            fontSize: '11px',
            borderRadius: '8px'
          }}
        />

        <div className="flex items-center gap-1">
          <Select value={`${countryFlag}-${countryCode}`} onValueChange={handleCountryCodeChange}>
            <SelectTrigger className="h-[36px] w-[60px] px-2 rounded-lg border border-gray-200 bg-white text-xs">
              <div className="flex items-center gap-0.5">
                <span className="text-[12px]">{countryFlag}</span>
                <ChevronDown size={8} className="text-muted-foreground" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-200">
              {countryOptions.map((option) => (
                <SelectItem key={`${option.flag}-${option.code}-${option.name}`} value={`${option.flag}-${option.code}`} className="text-xs">
                  <span className="flex items-center gap-2">
                    <span className="text-[12px]">{option.flag}</span>
                    <span className="text-[10px]">{option.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="tel"
            placeholder="(xxx) xxx xxxx"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={14}
            className="border border-gray-200 flex-1 bg-white"
            style={{
              height: '36px',
              fontSize: '11px',
              borderRadius: '8px'
            }}
          />
        </div>

        {/* Add Button */}
        <button
          onClick={handleAdd}
          disabled={!name.trim()}
          className="w-full py-3 bg-[#4A4A4A] text-white rounded-full text-[12px] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3A3A] transition-colors"
        >
          ADD
        </button>
      </div>
    </div>
  );
};
