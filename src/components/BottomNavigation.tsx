import { ShoppingCart, Receipt, CreditCard, Menu } from "lucide-react";

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
    className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
      isActive ? 'text-foreground' : 'text-muted-foreground'
    }`}
  >
    <Icon size={16} className="mb-1" />
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <nav className="border-t border-border bg-surface px-2 py-1">
      <div className="grid grid-cols-4 gap-1">
        <NavItem
          icon={ShoppingCart}
          label="New Order"
          isActive={activeTab === "order"}
          onClick={() => onTabChange("order")}
        />
        <NavItem
          icon={Receipt}
          label="Tickets"
          isActive={activeTab === "tickets"}
          onClick={() => onTabChange("tickets")}
        />
        <NavItem
          icon={CreditCard}
          label="Transactions"
          isActive={activeTab === "transactions"}
          onClick={() => onTabChange("transactions")}
        />
        <NavItem
          icon={Menu}
          label="More"
          isActive={activeTab === "more"}
          onClick={() => onTabChange("more")}
        />
      </div>
    </nav>
  );
};