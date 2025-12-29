import { useState } from 'react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import iconBackArrow from '@/assets/icon-back-arrow-new.png';
import iconSearch from '@/assets/icon-search.png';
import iconMic from '@/assets/icon-mic.png';
import iconFilter from '@/assets/icon-filter.png';
import customer1 from '@/assets/customer-1.png';
import customer2 from '@/assets/customer-2.png';
import customer3 from '@/assets/customer-3.png';
import customer4 from '@/assets/customer-4.png';

export interface Guest {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}

interface PayByLinkGuestListScreenProps {
  amount: number;
  onBack: () => void;
  onAddGuest: () => void;
  onSendLink: (guest: Guest, method: 'whatsapp' | 'text' | 'email') => void;
}

const mockGuests: Guest[] = [
  { id: '1', name: 'Alex Venom', phone: '+1 (122) 456-7890', email: 'alexvenom@gmail.com', avatar: customer1 },
  { id: '2', name: 'Arjun Gerhold', phone: '+1 (122) 456-7890', email: 'arjungerhold@gmail.com' },
  { id: '3', name: 'Cleora Hills', phone: '+1 (122) 456-7890', email: 'cleorahills@gmail.com', avatar: customer3 },
  { id: '4', name: 'Eden Cruzer', phone: '+1 (122) 456-7890', email: 'edencruzer@gmail.com', avatar: customer4 },
  { id: '5', name: 'Morticia Adams', phone: '+1 (122) 456-7890', email: 'mortadams@gmail.com' },
  { id: '6', name: 'Simon Rocky', phone: '+1 (122) 456-7890', email: 'simonrock@gmail.com', avatar: customer2 },
  { id: '7', name: 'Sam Adams', phone: '+1 (122) 456-7890', email: 'samadams@gmail.com' },
];

export const PayByLinkGuestListScreen = ({
  amount,
  onBack,
  onAddGuest,
  onSendLink
}: PayByLinkGuestListScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'text' | 'email'>('whatsapp');

  const filteredGuests = mockGuests.filter(guest =>
    guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guest.phone.includes(searchQuery) ||
    guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleGuestClick = (guest: Guest) => {
    if (selectedGuest?.id === guest.id) {
      setSelectedGuest(null);
    } else {
      setSelectedGuest(guest);
    }
  };

  const handleSendMethod = (method: 'whatsapp' | 'text' | 'email') => {
    if (selectedGuest) {
      onSendLink(selectedGuest, method);
    }
  };

  return (
    <div className="w-[186px] h-full bg-[#F5F5F5] flex flex-col mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex items-center justify-center h-[40px] relative px-2">
        <button onClick={onBack} className="absolute left-2 p-1">
          <img src={iconBackArrow} alt="Back" className="w-[16px] h-[16px]" />
        </button>
        <span className="text-[11px] font-semibold text-gray-900">Pay by Link</span>
        <button 
          onClick={onAddGuest}
          className="absolute right-2 w-[28px] h-[28px] rounded-full bg-[#4A4A4A] flex items-center justify-center"
        >
          <span className="text-white text-[16px] font-light">+</span>
        </button>
      </div>

      {/* Tab Bar */}
      <div className="px-2 mb-2">
        <div className="flex border border-gray-200 rounded-lg overflow-hidden bg-white">
          <button 
            onClick={() => setActiveTab('whatsapp')}
            className={`flex-1 py-2 flex items-center justify-center ${activeTab === 'whatsapp' ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
          </button>
          <button 
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-2 flex items-center justify-center border-l border-r border-gray-200 ${activeTab === 'text' ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button 
            onClick={() => setActiveTab('email')}
            className={`flex-1 py-2 flex items-center justify-center ${activeTab === 'email' ? 'bg-gray-100' : ''}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name, Mobile no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-7 border border-gray-200 bg-white"
              style={{ height: '28px', fontSize: '9px', borderRadius: '20px' }}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <img src={iconSearch} alt="" className="w-3 h-3 opacity-50" />
            </div>
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <img src={iconMic} alt="" className="w-3 h-3 opacity-50" />
            </button>
          </div>
          <button className="w-[28px] h-[28px] flex items-center justify-center rounded-lg bg-white border border-gray-200">
            <img src={iconFilter} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Guest List */}
      <div className="flex-1 overflow-y-auto px-2 pb-2">
        <div className="space-y-1.5">
          {filteredGuests.map((guest) => (
            <div key={guest.id}>
              <div 
                className={`bg-white rounded-lg p-2 cursor-pointer transition-colors ${selectedGuest?.id === guest.id ? 'border-2 border-gray-400' : 'border border-gray-100'}`}
                onClick={() => handleGuestClick(guest)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={guest.avatar} alt={guest.name} />
                    <AvatarFallback className="bg-gray-400 text-white font-medium text-[10px]">
                      {getInitials(guest.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[10px] font-semibold text-gray-900 truncate">
                      {guest.name}
                    </h3>
                    <p className="text-[8px] text-gray-500 truncate">
                      {guest.phone} · {guest.email}
                    </p>
                  </div>
                </div>

                {/* Send Options - Show when selected */}
                {selectedGuest?.id === guest.id && (
                  <div className="flex border-t border-gray-100 mt-2 pt-2">
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSendMethod('whatsapp'); }}
                      className="flex-1 py-1.5 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSendMethod('text'); }}
                      className="flex-1 py-1.5 flex items-center justify-center border-l border-r border-gray-100 hover:bg-gray-50"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                      </svg>
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleSendMethod('email'); }}
                      className="flex-1 py-1.5 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
