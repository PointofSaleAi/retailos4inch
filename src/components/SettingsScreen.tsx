import { useState } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChevronRight } from "lucide-react";
import iconSearch from "@/assets/icon-search.png";
import iconMic from "@/assets/icon-mic-new.png";
import customer1 from "@/assets/customer-1.png";
import iconGeneral from "@/assets/icon-general.png";
import iconControlCenter from "@/assets/icon-control-center.png";
import iconPayments from "@/assets/icon-payments.png";
import iconNetwork from "@/assets/icon-network.png";
import iconHardware from "@/assets/icon-hardware.png";
import iconCustomerSupport from "@/assets/icon-customer-support.png";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  iconBg: string;
}

interface MenuGroup {
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    items: [
      { id: "general", label: "General", icon: iconGeneral, iconBg: "#2C2C2E" },
      { id: "control-center", label: "Control Center", icon: iconControlCenter, iconBg: "#A855F7" },
      { id: "payments", label: "Payments", icon: iconPayments, iconBg: "#8B5CF6" },
    ]
  },
  {
    items: [
      { id: "network", label: "Network", icon: iconNetwork, iconBg: "#3B82F6" },
      { id: "hardware", label: "Hardware", icon: iconHardware, iconBg: "#A855F7" },
    ]
  },
  {
    items: [
      { id: "customer-support", label: "Customer Support", icon: iconCustomerSupport, iconBg: "#EF4444" },
    ]
  }
];

export const SettingsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div 
      className="h-full flex flex-col font-['Montserrat']" 
      style={{ backgroundColor: '#F3F2F8', paddingLeft: '1px', paddingRight: '1px' }}
    >
      {/* Header */}
      <div className="flex-shrink-0 pt-3 pb-2 px-3">
        <h1 className="text-[15px] font-semibold text-foreground">Settings</h1>
      </div>

      {/* Search Bar */}
      <div className="flex-shrink-0 px-3 pb-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 pr-8 border-0 rounded-[8px] font-['Montserrat']"
            style={{ 
              backgroundColor: '#EFEFF0', 
              height: '30px', 
              width: '100%',
              fontSize: '12px'
            }}
          />
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2">
            <img src={iconSearch} alt="" className="w-4 h-4 opacity-50" />
          </div>
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2">
            <img src={iconMic} alt="" className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3">
        {/* User Profile Card */}
        <div 
          className="bg-white mb-2.5 flex items-center"
          style={{ 
            borderRadius: '10px',
            padding: '10px 12px'
          }}
        >
          <Avatar className="flex-shrink-0" style={{ width: '36px', height: '36px' }}>
            <AvatarImage src={customer1} alt="Johnson Francisco" />
            <AvatarFallback className="bg-muted text-foreground font-medium text-sm">
              JF
            </AvatarFallback>
          </Avatar>
          
          <div className="ml-2.5 flex-1 min-w-0">
            <h3 className="font-semibold text-foreground leading-tight" style={{ fontSize: '13px' }}>
              Johnson Francisco
            </h3>
            <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
              Active on 2 device
            </p>
          </div>
        </div>

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => (
          <div 
            key={groupIndex}
            className="bg-white overflow-hidden mb-2.5"
            style={{ borderRadius: '10px' }}
          >
            {group.items.map((item, itemIndex) => (
              <div key={item.id}>
                <button
                  className="w-full flex items-center transition-all hover:bg-gray-50"
                  style={{ 
                    height: '40px',
                    paddingLeft: '10px',
                    paddingRight: '10px'
                  }}
                >
                  <div 
                    className="flex items-center justify-center flex-shrink-0"
                    style={{ 
                      backgroundColor: item.iconBg,
                      width: '24px',
                      height: '24px',
                      borderRadius: '5px'
                    }}
                  >
                    <img src={item.icon} alt="" style={{ width: '24px', height: '24px' }} />
                  </div>
                  
                  <span 
                    className="flex-1 text-left font-medium text-foreground ml-2.5" 
                    style={{ fontSize: '12px' }}
                  >
                    {item.label}
                  </span>
                  
                  <ChevronRight size={16} className="text-muted-foreground/50 flex-shrink-0" />
                </button>
                {itemIndex < group.items.length - 1 && (
                  <div 
                    className="bg-gray-200/60" 
                    style={{ height: '0.5px', marginLeft: '44px', marginRight: '10px' }} 
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
