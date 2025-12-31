import { useState, useRef, useEffect } from "react";
import { format, isWithinInterval, parse, isSameDay } from "date-fns";
import iconDocument from "@/assets/icon-document.png";
import iconGrid from "@/assets/icon-grid-tx.png";
import iconTag from "@/assets/icon-tag-tx.png";
import iconCamera from "@/assets/icon-camera-tx.png";
import iconSearchTx from "@/assets/icon-search-tx.png";
import iconCalendarTx from "@/assets/icon-calendar-tx.png";
import iconMenuTx from "@/assets/icon-menu-tx.png";
import iconMic from "@/assets/icon-mic-14.png";
import iconClose from "@/assets/icon-close-14.png";
import { Calendar } from "@/components/ui/calendar";

import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

type TransactionStatus = "Paid" | "Refunded" | "Failed" | "Ordering" | "Pending";
type FilterType = "All" | "Ordering" | "Refunded" | "Paid" | "Payment Progress" | "Completed" | "Cancelled" | "Pending";
type SortOrder = "newest" | "oldest";

interface Transaction {
  id: string;
  icon: "document" | "grid" | "tag" | "camera";
  product: string;
  quantity: number;
  date: string;
  time: string;
  amount: number;
  status: TransactionStatus;
  orderNumber?: string;
  transactionNumber?: string;
}

interface TransactionsScreenProps {
  transactions?: Transaction[];
  onTransactionClick?: (transactionId: string) => void;
}

const mockTransactions: Transaction[] = [{
  id: "1",
  icon: "document",
  product: "Polished Prestig",
  quantity: 1,
  date: "27 Aug",
  time: "3:55 PM",
  amount: 21.00,
  status: "Paid",
  orderNumber: "ORD001",
  transactionNumber: "TXN001"
}, {
  id: "2",
  icon: "grid",
  product: "Polo Ralph Lau",
  quantity: 2,
  date: "27 Aug",
  time: "2:47 PM",
  amount: 20.00,
  status: "Refunded",
  orderNumber: "ORD002",
  transactionNumber: "TXN002"
}, {
  id: "3",
  icon: "tag",
  product: "The Farrah Skin",
  quantity: 3,
  date: "27 Aug",
  time: "2:30 PM",
  amount: 56.00,
  status: "Paid",
  orderNumber: "ORD003",
  transactionNumber: "TXN003"
}, {
  id: "4",
  icon: "camera",
  product: "Polished Prestig",
  quantity: 1,
  date: "27 Aug",
  time: "2:47 PM",
  amount: 55.25,
  status: "Failed",
  orderNumber: "ORD004",
  transactionNumber: "TXN004"
}, {
  id: "5",
  icon: "tag",
  product: "The Farrah Skin",
  quantity: 3,
  date: "27 Aug",
  time: "2:30 PM",
  amount: 56.00,
  status: "Failed",
  orderNumber: "ORD005",
  transactionNumber: "TXN005"
}];

const iconMap = {
  document: iconDocument,
  grid: iconGrid,
  tag: iconTag,
  camera: iconCamera
};

const statusColors = {
  Paid: "text-success",
  Refunded: "text-destructive",
  Failed: "text-destructive",
  Ordering: "text-warning",
  Pending: "text-warning"
};

export const TransactionsScreen = ({ transactions = [], onTransactionClick }: TransactionsScreenProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sortMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target as Node)) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allTransactions = [...transactions, ...mockTransactions];

  // Parse date string to Date object for comparison
  const parseTransactionDate = (dateStr: string): Date => {
    // Parse "27 Aug" format - assume current year
    const currentYear = new Date().getFullYear();
    try {
      return parse(`${dateStr} ${currentYear}`, "d MMM yyyy", new Date());
    } catch {
      return new Date();
    }
  };

  // Parse time string to comparable format
  const parseTransactionTime = (timeStr: string): number => {
    // Parse "3:55 PM" format
    const [time, period] = timeStr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);
    let hour24 = hours;
    if (period === "PM" && hours !== 12) hour24 += 12;
    if (period === "AM" && hours === 12) hour24 = 0;
    return hour24 * 60 + minutes;
  };

  const filteredTransactions = allTransactions
    .filter(transaction => {
      // Status filter
      if (activeFilter !== "All" && transaction.status !== activeFilter) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesProduct = transaction.product.toLowerCase().includes(query);
        const matchesOrderNumber = transaction.orderNumber?.toLowerCase().includes(query) || false;
        const matchesTransactionNumber = transaction.transactionNumber?.toLowerCase().includes(query) || false;
        if (!matchesProduct && !matchesOrderNumber && !matchesTransactionNumber) {
          return false;
        }
      }

      // Date range filter
      if (dateRange?.from) {
        const transactionDate = parseTransactionDate(transaction.date);
        if (dateRange.to) {
          // Date range selected
          if (!isWithinInterval(transactionDate, { start: dateRange.from, end: dateRange.to })) {
            return false;
          }
        } else {
          // Single date selected
          if (!isSameDay(transactionDate, dateRange.from)) {
            return false;
          }
        }
      }

      return true;
    })
    .sort((a, b) => {
      const dateA = parseTransactionDate(a.date);
      const dateB = parseTransactionDate(b.date);
      const timeA = parseTransactionTime(a.time);
      const timeB = parseTransactionTime(b.time);

      // Compare dates first, then times
      if (dateA.getTime() !== dateB.getTime()) {
        return sortOrder === "newest" ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
      }
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

  const handleClearSearch = () => {
    setSearchQuery("");
    setShowSearch(false);
  };

  const handleClearDateFilter = () => {
    setDateRange(undefined);
  };

  const getDateFilterLabel = () => {
    if (!dateRange?.from) return null;
    if (dateRange.to) {
      return `${format(dateRange.from, "MMM d")} - ${format(dateRange.to, "MMM d")}`;
    }
    return format(dateRange.from, "MMM d, yyyy");
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5">
        {showSearch ? (
          <div className="flex-1 flex items-center gap-2 bg-[#F1F2F5] rounded-full px-3" style={{ height: '32px' }}>
            <img src={iconSearchTx} alt="Search" className="w-[14px] h-[14px] min-w-[14px] min-h-[14px] opacity-60" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by product, ord..."
              className="flex-1 bg-transparent text-[11px] text-foreground placeholder:text-muted-foreground outline-none"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            />
            <button 
              className="p-0.5 flex items-center justify-center" 
              onClick={handleClearSearch}
            >
              <span className="text-[14px] text-muted-foreground">×</span>
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-foreground font-semibold" style={{ fontSize: '12px' }}>Transactions</h1>
            <div className="flex items-center gap-2">
              <button className="p-1" onClick={() => setShowSearch(true)}>
                <img src={iconSearchTx} alt="Search" className="w-4 h-4" />
              </button>
              
              <button 
                className={cn("p-1", dateRange?.from && "bg-primary/10 rounded")}
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                <img src={iconCalendarTx} alt="Calendar" className="w-4 h-4" />
              </button>

              <div className="relative" ref={sortMenuRef}>
                <button 
                  className={cn("p-1 px-[6px] py-[6px]", sortOrder !== "newest" && "bg-primary/10 rounded")}
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <img src={iconMenuTx} alt="Menu" className="w-4 h-4" />
                </button>
                
                {showSortMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-lg shadow-lg z-50 min-w-[100px]">
                    <button
                      onClick={() => { setSortOrder("newest"); setShowSortMenu(false); }}
                      className={cn(
                        "w-full px-3 py-2 text-[10px] text-left hover:bg-[#F1F2F5] transition-colors",
                        sortOrder === "newest" && "font-semibold text-primary"
                      )}
                    >
                      Newest First
                    </button>
                    <button
                      onClick={() => { setSortOrder("oldest"); setShowSortMenu(false); }}
                      className={cn(
                        "w-full px-3 py-2 text-[10px] text-left hover:bg-[#F1F2F5] transition-colors",
                        sortOrder === "oldest" && "font-semibold text-primary"
                      )}
                    >
                      Oldest First
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Active Date Filter Indicator */}
      {dateRange?.from && (
        <div className="flex-shrink-0 px-3 pb-1">
          <div className="flex items-center gap-1 bg-primary/10 rounded px-2 py-1 w-fit">
            <span className="text-[9px] text-primary font-medium">{getDateFilterLabel()}</span>
            <button onClick={handleClearDateFilter} className="ml-1">
              <img src={iconClose} alt="Clear" className="w-2.5 h-2.5 opacity-60" />
            </button>
          </div>
        </div>
      )}

      {/* Inline Calendar */}
      {isCalendarOpen && (
        <div className="flex-shrink-0 flex justify-center px-3 py-2">
          <div className="bg-surface rounded-xl shadow-md border border-border p-3" style={{ width: '170px' }}>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={1}
              className={cn(
                "p-0 pointer-events-auto bg-surface w-full",
                "[&_.rdp-months]:w-full",
                "[&_.rdp-month]:w-full [&_.rdp-month]:space-y-1",
                "[&_.rdp-table]:w-full",
                "[&_.rdp-tbody]:w-full",
                "[&_.rdp-head_row]:flex [&_.rdp-head_row]:w-full [&_.rdp-head_row]:justify-between",
                "[&_.rdp-row]:flex [&_.rdp-row]:w-full [&_.rdp-row]:justify-between [&_.rdp-row]:mt-0.5",
                "[&_.rdp-head_cell]:w-[20px] [&_.rdp-head_cell]:text-[8px] [&_.rdp-head_cell]:font-medium [&_.rdp-head_cell]:text-muted-foreground",
                "[&_.rdp-cell]:w-[20px] [&_.rdp-cell]:h-[20px] [&_.rdp-cell]:p-0",
                "[&_.rdp-day]:h-[20px] [&_.rdp-day]:w-[20px] [&_.rdp-day]:text-[9px] [&_.rdp-day]:p-0 [&_.rdp-day]:font-medium",
                "[&_.rdp-day_selected]:bg-primary [&_.rdp-day_selected]:text-primary-foreground [&_.rdp-day_selected]:rounded-full",
                "[&_.rdp-day_today]:bg-accent [&_.rdp-day_today]:text-accent-foreground [&_.rdp-day_today]:rounded-full",
                "[&_.rdp-caption]:flex [&_.rdp-caption]:justify-center [&_.rdp-caption]:items-center [&_.rdp-caption]:py-1 [&_.rdp-caption]:relative",
                "[&_.rdp-caption_label]:text-[10px] [&_.rdp-caption_label]:font-semibold",
                "[&_.rdp-nav]:flex [&_.rdp-nav]:items-center [&_.rdp-nav]:gap-0",
                "[&_.rdp-nav_button]:h-5 [&_.rdp-nav_button]:w-5 [&_.rdp-nav_button]:p-0 [&_.rdp-nav_button]:opacity-60 [&_.rdp-nav_button]:hover:opacity-100",
                "[&_.rdp-nav_button_previous]:absolute [&_.rdp-nav_button_previous]:left-0",
                "[&_.rdp-nav_button_next]:absolute [&_.rdp-nav_button_next]:right-0",
                "[&_.rdp-day_outside]:text-muted-foreground [&_.rdp-day_outside]:opacity-40",
                "[&_.rdp-day_range_middle]:bg-accent [&_.rdp-day_range_middle]:rounded-none"
              )}
            />
            <div className="flex gap-2 mt-2 pt-2 border-t border-border">
              <button 
                onClick={() => { handleClearDateFilter(); setIsCalendarOpen(false); }}
                className="flex-1 px-2 py-1.5 text-[9px] text-muted-foreground bg-muted rounded-lg"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsCalendarOpen(false)}
                className="flex-1 px-2 py-1.5 text-[9px] text-primary-foreground bg-primary rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {!isCalendarOpen && (
        <div className="flex-shrink-0 flex gap-1.5 overflow-x-auto scrollbar-hide px-[6px] py-[6px]">
          {(["All", "Pending", "Ordering", "Refunded", "Paid", "Payment Progress", "Completed", "Cancelled"] as FilterType[]).map(filter => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)} 
              className={`px-3 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter ? "bg-foreground text-background" : "text-muted-foreground"
              }`} 
              style={activeFilter !== filter ? { backgroundColor: '#F1F2F5' } : undefined}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Transaction List */}
      {!isCalendarOpen && (
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-2 space-y-2 flex flex-col items-center">
          {filteredTransactions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-[11px] text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            filteredTransactions.map(transaction => {
              const iconSrc = iconMap[transaction.icon];
              const isClickable = transaction.status === "Pending" || transaction.status === "Paid" || transaction.status === "Refunded";
              return (
                <div 
                  key={transaction.id} 
                  className={`flex items-center gap-2 p-2 bg-surface rounded-lg border border-border ${
                    isClickable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''
                  }`} 
                  style={{ width: '186px' }}
                  onClick={() => isClickable && onTransactionClick?.(transaction.id)}
                >
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F1F2F5' }}>
                    <img src={iconSrc} alt="" className="w-3 h-3" />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="text-[11px] font-medium text-foreground truncate flex-1">
                        {transaction.product}...+{transaction.quantity}
                      </p>
                      <p className="text-[11px] font-semibold text-foreground whitespace-nowrap flex-shrink-0">
                        ${transaction.amount.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[9px] text-muted-foreground whitespace-nowrap">
                        {transaction.date} | {transaction.time}
                      </p>
                      <p className={`text-[9px] font-semibold whitespace-nowrap ${statusColors[transaction.status]}`}>
                        {transaction.status}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      )}
    </div>
  );
};
