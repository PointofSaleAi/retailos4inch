import { useState } from "react";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { CustomerScreen } from "./CustomerScreen";
import { SettingsScreen } from "./SettingsScreen";
import { BottomNavigation } from "./BottomNavigation";
import { CustomPaymentScreen } from "./CustomPaymentScreen";

export const RetailApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("order");
  const [showCustomScreen, setShowCustomScreen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (showCustomScreen) {
      return <CustomPaymentScreen onClose={() => setShowCustomScreen(false)} />;
    }

    switch (activeTab) {
      case "order":
        return <NewOrderScreen onCustomClick={() => setShowCustomScreen(true)} />;
      case "transactions":
        return <TransactionsScreen />;
      case "customer":
        return <CustomerScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return <NewOrderScreen onCustomClick={() => setShowCustomScreen(true)} />;
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