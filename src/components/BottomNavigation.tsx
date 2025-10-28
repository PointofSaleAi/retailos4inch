import { ShoppingCart, Receipt, User, Settings } from "lucide-react";

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const NavItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: any; 
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
    <Icon size={16} className="mb-1" />
    <span className="text-[10px] font-medium">{label}</span>
  </button>
);

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="border-t border-border bg-surface px-[6px] py-2">
      <div className="grid grid-cols-4 gap-2">
        <NavItem
          icon={ShoppingCart}
          label="New Order"
          isActive={activeTab === "order"}
          onClick={() => onTabChange("order")}
        />
        <NavItem
          icon={Receipt}
          label="Transactions"
          isActive={activeTab === "transactions"}
          onClick={() => onTabChange("transactions")}
        />
        <NavItem
          icon={User}
          label="Customer"
          isActive={activeTab === "customer"}
          onClick={() => onTabChange("customer")}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => onTabChange("settings")}
        />
      </div>
    </nav>
  );
};