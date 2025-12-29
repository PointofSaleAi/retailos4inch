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

export interface LoyaltyGuest {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  points?: number;
}

interface LoyaltyGuestListScreenProps {
  onBack: () => void;
  onAddGuest: () => void;
  onSelectGuest: (guest: LoyaltyGuest) => void;
  addedGuests?: LoyaltyGuest[];
}

const mockGuests: LoyaltyGuest[] = [
  {
    id: '1',
    name: 'Alex Venom',
    phone: '+1 (122) 456-7890',
    email: 'alexvenom@gmail.com',
    avatar: customer1,
    points: 1250
  },
  {
    id: '2',
    name: 'Arjun Gerhold',
    phone: '+1 (122) 456-7890',
    email: 'arjungerhold@gmail.com',
    points: 850
  },
  {
    id: '3',
    name: 'Cleora Hills',
    phone: '+1 (122) 456-7890',
    email: 'cleorahills@gmail.com',
    avatar: customer3,
    points: 2100
  },
  {
    id: '4',
    name: 'Eden Cruzer',
    phone: '+1 (122) 456-7890',
    email: 'edencruzer@gmail.com',
    avatar: customer4,
    points: 560
  },
  {
    id: '5',
    name: 'Morticia Adams',
    phone: '+1 (122) 456-7890',
    email: 'mortadams@gmail.com',
    points: 1800
  },
  {
    id: '6',
    name: 'Simon Rocky',
    phone: '+1 (122) 456-7890',
    email: 'simonrock@gmail.com',
    avatar: customer2,
    points: 920
  },
  {
    id: '7',
    name: 'Sam Adams',
    phone: '+1 (122) 456-7890',
    email: 'samadams@gmail.com',
    points: 1450
  }
];

export const LoyaltyGuestListScreen = ({
  onBack,
  onAddGuest,
  onSelectGuest,
  addedGuests = []
}: LoyaltyGuestListScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Combine added guests with mock guests
  const allGuests = [...addedGuests, ...mockGuests];
  const filteredGuests = allGuests.filter(
    guest =>
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
        <span className="text-[11px] font-semibold text-gray-900">Pay by Loyalty</span>
        <button
          onClick={onAddGuest}
          className="absolute right-2 w-[28px] h-[28px] rounded-full bg-[#4A4A4A] flex items-center justify-center"
        >
          <span className="text-white text-[16px] font-light">+</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-2 px-0">
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search by name, Mobile no..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-7 pr-7 border border-gray-200 bg-white"
              style={{
                height: '28px',
                fontSize: '9px',
                borderRadius: '20px'
              }}
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
      <div className="flex-1 overflow-y-auto pb-2 px-0">
        <div className="space-y-1.5">
          {filteredGuests.map(guest => (
            <div
              key={guest.id}
              className="bg-white rounded-lg p-2 cursor-pointer transition-colors border border-gray-100 hover:border-gray-300"
              onClick={() => onSelectGuest(guest)}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
