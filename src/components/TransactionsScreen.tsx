import { useState } from "react";
import { Search, Calendar, Menu } from "lucide-react";
import iconDocument from "@/assets/icon-document.png";
import iconGrid from "@/assets/icon-grid-tx.png";
import iconTag from "@/assets/icon-tag-tx.png";
import iconCamera from "@/assets/icon-camera-tx.png";
type TransactionStatus = "Paid" | "Refunded" | "Failed" | "Ordering" | "Pending";
type FilterType = "All" | "Ordering" | "Refunded" | "Paid" | "Payment Progress" | "Completed" | "Cancelled" | "Pending";
interface Transaction {
  id: string;
  icon: "document" | "grid" | "tag" | "camera";
  product: string;
  quantity: number;
  date: string;
  time: string;
  amount: number;
  status: TransactionStatus;
}

interface TransactionsScreenProps {
  transactions?: Transaction[];
}
const mockTransactions: Transaction[] = [{
  id: "1",
  icon: "document",
  product: "Polished Prestig",
  quantity: 1,
  date: "27 Aug",
  time: "3:55 PM",
  amount: 21.00,
  status: "Paid"
}, {
  id: "2",
  icon: "grid",
  product: "Polo Ralph Lau",
  quantity: 2,
  date: "27 Aug",
  time: "2:47 PM",
  amount: 20.00,
  status: "Refunded"
}, {
  id: "3",
  icon: "tag",
  product: "The Farrah Skin",
  quantity: 3,
  date: "27 Aug",
  time: "2:30 PM",
  amount: 56.00,
  status: "Paid"
}, {
  id: "4",
  icon: "camera",
  product: "Polished Prestig",
  quantity: 1,
  date: "27 Aug",
  time: "2:47 PM",
  amount: 55.25,
  status: "Failed"
}, {
  id: "5",
  icon: "tag",
  product: "The Farrah Skin",
  quantity: 3,
  date: "27 Aug",
  time: "2:30 PM",
  amount: 56.00,
  status: "Failed"
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
export const TransactionsScreen = ({ transactions = [] }: TransactionsScreenProps) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const allTransactions = [...transactions, ...mockTransactions];
  const filteredTransactions = allTransactions.filter(transaction => {
    if (activeFilter === "All") return true;
    return transaction.status === activeFilter;
  });
  return <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5">
        <h1 className="text-base font-semibold text-foreground">Transactions</h1>
        <div className="flex items-center gap-2">
          <button className="p-1">
            <Search className="w-4 h-4 text-foreground" />
          </button>
          <button className="p-1">
            <Calendar className="w-4 h-4 text-foreground" />
          </button>
          <button className="p-1 px-[6px] py-[6px]">
            <Menu className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex-shrink-0 flex gap-1.5 overflow-x-auto scrollbar-hide px-[6px] py-[6px]">
        {(["All", "Pending", "Ordering", "Refunded", "Paid", "Payment Progress", "Completed", "Cancelled"] as FilterType[]).map(filter => <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-3 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${activeFilter === filter ? "bg-foreground text-background" : "text-muted-foreground"}`} style={activeFilter !== filter ? { backgroundColor: '#F1F2F5' } : undefined}>
            {filter}
          </button>)}
      </div>

      {/* Transaction List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-3 py-2 space-y-2 flex flex-col items-center">
          {filteredTransactions.map(transaction => {
          const iconSrc = iconMap[transaction.icon];
          return <div key={transaction.id} className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-border" style={{ width: '186px' }}>
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
              </div>;
         })}
        </div>
      </div>
    </div>;
};