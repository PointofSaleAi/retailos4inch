import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight, Settings, Smartphone, CreditCard, Wifi, Monitor, Headphones } from "lucide-react";
import iconSearch from "@/assets/icon-search.png";
import iconMic from "@/assets/icon-mic-new.png";
import customer1 from "@/assets/customer-1.png";

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}

const menuItems: MenuItem[] = [
  {
    id: "general",
    label: "General",
    icon: Settings,
    iconColor: "#FFFFFF",
    iconBg: "#2C2C2E"
  },
  {
    id: "control-center",
    label: "Control Center",
    icon: Smartphone,
    iconColor: "#FFFFFF",
    iconBg: "#A855F7"
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    iconColor: "#FFFFFF",
    iconBg: "#8B5CF6"
  },
  {
    id: "network",
    label: "Network",
    icon: Wifi,
    iconColor: "#FFFFFF",
    iconBg: "#3B82F6"
  },
  {
    id: "hardware",
    label: "Hardware",
    icon: Monitor,
    iconColor: "#FFFFFF",
    iconBg: "#A855F7"
  },
  {
    id: "customer-support",
    label: "Customer Support",
    icon: Headphones,
    iconColor: "#FFFFFF",
    iconBg: "#EF4444"
  }
];

export const SettingsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="h-full flex flex-col" style={{ backgroundColor: '#F3F2F8', padding: '6px' }}>
      {/* Header */}
      <div className="flex-shrink-0 py-2.5" style={{ width: '186px', margin: '0 auto' }}>
        <h1 className="text-base font-semibold text-foreground">Settings</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 pb-3" style={{ width: '186px', margin: '0 auto' }}>
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8 border-0"
            style={{ 
              backgroundColor: '#EFEFF0', 
              height: '26px', 
              width: '100%',
              fontSize: '11px'
            }}
          />
          <div className="absolute left-2 top-1/2 -translate-y-1/2">
            <img src={iconSearch} alt="" className="w-3.5 h-3.5" />
          </div>
          <button className="absolute right-2 top-1/2 -translate-y-1/2">
            <img src={iconMic} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div style={{ width: '186px', margin: '0 auto' }}>
          {/* User Profile Card */}
          <div className="bg-white rounded-lg p-3 mb-3" style={{ width: '186px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <div className="flex items-center gap-2">
              <Avatar style={{ width: '30px', height: '30px' }} className="flex-shrink-0">
                <AvatarImage src={customer1} alt="Johnson Francisco" />
                <AvatarFallback className="bg-muted text-foreground font-medium text-sm">
                  JF
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground" style={{ fontSize: '12px' }}>
                  Johnson Francisco
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Active on 2 device
                </p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="bg-white rounded-lg p-3 flex items-center gap-2 transition-all hover:shadow-sm"
                  style={{ width: '186px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}
                >
                  <div 
                    className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Icon size={14} color={item.iconColor} strokeWidth={2.5} />
                  </div>
                  
                  <span className="flex-1 text-left text-xs font-medium text-foreground">
                    {item.label}
                  </span>
                  
                  <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
