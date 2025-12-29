import { useState } from 'react';
import { Input } from './ui/input';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface PayByLinkAddGuestScreenProps {
  onBack: () => void;
  onAdd: (guest: { name: string; email: string; phone: string }) => void;
}

export const PayByLinkAddGuestScreen = ({
  onBack,
  onAdd
}: PayByLinkAddGuestScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode] = useState('+1');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd({
        name: name.trim(),
        email: email.trim(),
        phone: `${countryCode} ${phone.trim()}`
      });
    }
  };

  return (
    <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-2">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">Add Guest</span>
      </div>

      {/* Form */}
      <div className="flex-1 px-3 py-2 space-y-2">
        {/* Name Input */}
        <Input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white border border-gray-200 rounded-full px-3"
          style={{ height: '32px', fontSize: '10px' }}
        />

        {/* Email Input */}
        <Input
          type="email"
          placeholder="Enter Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white border border-gray-200 rounded-full px-3"
          style={{ height: '32px', fontSize: '10px' }}
        />

        {/* Phone Input */}
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2" style={{ height: '32px' }}>
          <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
            <span className="text-[12px]">🇺🇸</span>
            <span className="text-[10px] text-gray-700">{countryCode}</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9"/>
            </svg>
          </div>
          <Input
            type="tel"
            placeholder="(XXX) XXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-0 bg-transparent flex-1 px-1"
            style={{ height: '28px', fontSize: '10px' }}
          />
        </div>

        {/* Add Button */}
        <button 
          onClick={handleAdd}
          disabled={!name.trim()}
          className="w-full py-2.5 rounded-full text-white text-[11px] font-semibold transition-colors disabled:opacity-50"
          style={{ backgroundColor: '#4A4A4A' }}
        >
          ADD
        </button>
      </div>
    </div>
  );
};
