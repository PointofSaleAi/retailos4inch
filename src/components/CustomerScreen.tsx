import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import iconArchive from "@/assets/icon-archive.png";
import iconPlus from "@/assets/icon-plus.png";
import iconSearch from "@/assets/icon-search.png";
import iconMic from "@/assets/icon-mic.png";
import iconFilter from "@/assets/icon-filter.png";
import customer1 from "@/assets/customer-1.png";
import customer2 from "@/assets/customer-2.png";
import customer3 from "@/assets/customer-3.png";
import customer4 from "@/assets/customer-4.png";

interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Alex Venom",
    phone: "+1 (122) 456-7890",
    avatar: customer1
  },
  {
    id: "2",
    name: "Arjun Gerhold",
    phone: "+1 (122) 456-5456",
    avatar: customer2
  },
  {
    id: "3",
    name: "Cleora Hills",
    phone: "+1 (122) 456-8495",
    avatar: customer3
  },
  {
    id: "4",
    name: "Eden Kautzer",
    phone: "+1 (122) 456-9865",
    avatar: customer4
  },
  {
    id: "5",
    name: "Morticia Adams",
    phone: "+1 (122) 456-1562",
    avatar: customer1
  },
  {
    id: "6",
    name: "Simon Bocky",
    phone: "+1 (122) 456-7587",
    avatar: customer2
  }
];

export const CustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = mockCustomers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5">
        <h1 className="text-base font-semibold text-foreground">Customers</h1>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <img src={iconArchive} alt="" className="w-4 h-4" />
          </button>
          <button className="p-1">
            <img src={iconPlus} alt="" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 px-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search customer name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 border-0"
              style={{ 
                backgroundColor: '#F1F2F5', 
                height: '26px', 
                width: '140px',
                fontSize: '11px'
              }}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <img src={iconSearch} alt="" className="w-3.5 h-3.5" />
            </div>
          </div>
          
          <button className="w-6 h-6 flex items-center justify-center ml-1">
            <img src={iconMic} alt="" className="w-3.5 h-3.5" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center ml-1">
            <img src={iconFilter} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-1" style={{ width: '186px', padding: '6px', margin: '0 auto' }}>
          {filteredCustomers.map((customer, index) => (
            <div key={customer.id}>
              <div className="flex items-center gap-2">
                <Avatar className="w-7 h-7 flex-shrink-0">
                  <AvatarImage src={customer.avatar} alt={customer.name} />
                  <AvatarFallback className="bg-muted text-foreground font-medium text-xs">
                    {getInitials(customer.name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-semibold text-foreground truncate">
                    {customer.name}
                  </h3>
                  <p className="text-[8px] text-muted-foreground">
                    {customer.phone}
                  </p>
                </div>

                <button
                  className="flex-shrink-0 rounded text-[8px] font-medium text-foreground transition-colors"
                  style={{ backgroundColor: '#F1F2F5', width: '40px', height: '18px' }}
                >
                  View
                </button>
              </div>
              {index < filteredCustomers.length - 1 && (
                <Separator className="my-1" style={{ backgroundColor: '#F1F2F5' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
