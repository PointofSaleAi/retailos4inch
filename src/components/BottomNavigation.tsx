import iconNewOrder from "@/assets/icon-new-order.png";
import iconTransactions from "@/assets/icon-transactions.png";
import iconCustomer from "@/assets/icon-customer.png";
import iconSettings from "@/assets/icon-settings.png";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavItem = ({ 
  icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: string; 
  label: string; 
  isActive: boolean; 
  onClick: () => void; 
}) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center py-1 px-1 transition-colors ${
      isActive ? 'text-foreground' : 'text-muted-foreground'
    }`}
  >
    <img src={icon} alt={label} className="w-4 h-4 mb-1" />
    <span className="text-[7px] font-medium">{label}</span>
  </button>
);

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="border-t border-border bg-surface px-[6px] py-2">
      <div className="grid grid-cols-4 gap-2">
        <NavItem
          icon={iconNewOrder}
          label="New Order"
          isActive={activeTab === "order"}
          onClick={() => onTabChange("order")}
        />
        <NavItem
          icon={iconTransactions}
          label="Transactions"
          isActive={activeTab === "transactions"}
          onClick={() => onTabChange("transactions")}
        />
        <NavItem
          icon={iconCustomer}
          label="Customer"
          isActive={activeTab === "customer"}
          onClick={() => onTabChange("customer")}
        />
        <NavItem
          icon={iconSettings}
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => onTabChange("settings")}
        />
      </div>
    </nav>
  );
};