import { useState } from 'react';
import { Input } from './ui/input';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';

interface LoyaltyAddGuestScreenProps {
  onBack: () => void;
  onAdd: (guest: { name: string; email: string; phone: string }) => void;
}

export const LoyaltyAddGuestScreen = ({ onBack, onAdd }: LoyaltyAddGuestScreenProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      onAdd({ name: name.trim(), email: email.trim(), phone: phone.trim() });
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

        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <span className="text-[11px]">🇺🇸</span>
            <span className="text-[11px] text-gray-600">+1</span>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6,9 12,15 18,9" />
            </svg>
          </div>
          <Input
            type="tel"
            placeholder="(XXX) XXX-XXXX"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="border-0 flex-1"
            style={{
              height: '36px',
              fontSize: '11px'
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
