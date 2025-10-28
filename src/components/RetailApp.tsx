import { useState } from "react";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { BottomNavigation } from "./BottomNavigation";

export const RetailApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("order");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    switch (activeTab) {
      case "order":
        return <NewOrderScreen />;
      case "transactions":
        return <TransactionsScreen />;
      case "customer":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">Customer screen coming soon</p>
          </div>
        );
      case "settings":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">Settings screen coming soon</p>
          </div>
        );
      default:
        return <NewOrderScreen />;
    }
  };

  return (
    <RetailDevice>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        {isLoggedIn && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </RetailDevice>
  );
};