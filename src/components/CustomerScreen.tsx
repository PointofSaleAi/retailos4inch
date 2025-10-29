import { useState } from "react";
import { Mic, ArrowUpDown } from "lucide-react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import iconArchive from "@/assets/icon-archive.png";
import iconPlus from "@/assets/icon-plus.png";

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
    avatar: "/placeholder.svg"
  },
  {
    id: "2",
    name: "Arjun Gerhold",
    phone: "+1 (122) 456-5456"
  },
  {
    id: "3",
    name: "Cleora Hills",
    phone: "+1 (122) 456-8495",
    avatar: "/placeholder.svg"
  },
  {
    id: "4",
    name: "Eden Kautzer",
    phone: "+1 (122) 456-9865",
    avatar: "/placeholder.svg"
  },
  {
    id: "5",
    name: "Morticia Adams",
    phone: "+1 (122) 456-1562"
  },
  {
    id: "6",
    name: "Simon Bocky",
    phone: "+1 (122) 456-7587",
    avatar: "/placeholder.svg"
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
        <div className="relative">
          <Input
            type="text"
            placeholder="Search customer name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-20 h-11 bg-surface border-border"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 text-muted-foreground flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button className="w-5 h-5 flex items-center justify-center">
              <Mic className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-5 h-5 flex items-center justify-center">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-2 space-y-2">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="flex items-center gap-3 py-2"
            >
              <Avatar className="w-12 h-12 flex-shrink-0">
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback className="bg-muted text-foreground font-medium text-sm">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {customer.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {customer.phone}
                </p>
              </div>

              <button
                className="flex-shrink-0 px-5 py-2 rounded-lg text-xs font-medium text-foreground transition-colors"
                style={{ backgroundColor: '#F1F2F5' }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
