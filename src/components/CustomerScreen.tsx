import { useState, useEffect, useCallback } from "react";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import iconArchive from "@/assets/icon-archive.png";
import iconPlus from "@/assets/icon-plus.png";
import iconSearch from "@/assets/icon-search.png";
import iconMic from "@/assets/icon-mic.png";
import iconFilter from "@/assets/icon-filter.png";
import { useCustomerSearch, Customer } from "@/hooks/useCustomerSearch";

interface CustomerScreenProps {
  onAddCustomer: () => void;
  onViewCustomer: (customer: Customer) => void;
  onSelectCustomer: (customer: Customer) => void;
}

export type { Customer };

export const CustomerScreen = ({ onAddCustomer, onViewCustomer, onSelectCustomer }: CustomerScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { searchResults, isLoading, searchCustomers } = useCustomerSearch();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchCustomers(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, searchCustomers]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5">
        <h1 className="text-foreground font-semibold" style={{ fontSize: '12px' }}>Customers</h1>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <img src={iconArchive} alt="" className="w-4 h-4" />
          </button>
          <button className="p-1" onClick={onAddCustomer}>
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
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 border-0"
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
            <button className="absolute right-2 top-1/2 -translate-y-1/2">
              <img src={iconMic} alt="" className="w-3.5 h-3.5" />
            </button>
          </div>
          
          <button className="w-6 h-6 flex items-center justify-center ml-1">
            <img src={iconFilter} alt="" className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Customer List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-1" style={{ width: '186px', padding: '6px', margin: '0 auto' }}>
          {isLoading && searchResults.length === 0 ? (
            <div className="text-center py-4 text-xs text-muted-foreground">Loading...</div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-4 text-xs text-muted-foreground">No customers found</div>
          ) : (
            searchResults.map((customer, index) => (
              <div key={customer.id}>
                <div 
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 rounded transition-colors"
                  onClick={() => onSelectCustomer(customer)}
                >
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewCustomer(customer);
                    }}
                    className="flex-shrink-0 rounded text-[8px] font-medium text-foreground transition-colors"
                    style={{ backgroundColor: '#F1F2F5', width: '40px', height: '18px' }}
                  >
                    View
                  </button>
                </div>
                {index < searchResults.length - 1 && (
                  <Separator className="my-1" style={{ backgroundColor: '#F1F2F5' }} />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
