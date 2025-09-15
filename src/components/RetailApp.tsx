import { useState } from "react";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
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
      case "tickets":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">Tickets screen coming soon</p>
          </div>
        );
      case "transactions":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">Transactions screen coming soon</p>
          </div>
        );
      case "more":
        return (
          <div className="flex-1 flex items-center justify-center p-4">
            <p className="text-muted-foreground text-center">More options coming soon</p>
          </div>
        );
      default:
        return <NewOrderScreen />;
    }
  };

  return (
    <RetailDevice>
      <div className="h-full flex flex-col">
        <div className="flex-1">
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