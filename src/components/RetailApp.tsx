import { useState } from "react";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { CustomerScreen } from "./CustomerScreen";
import { SettingsScreen } from "./SettingsScreen";
import { BottomNavigation } from "./BottomNavigation";
import { CustomPaymentScreen } from "./CustomPaymentScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { BarcodeScannerScreen } from "./BarcodeScannerScreen";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isFavorite?: boolean;
}

const mockProducts: Product[] = [
  { id: 1, name: "Classic Cotton T-Shirt", price: 24.99, image: product1, isFavorite: false },
  { id: 2, name: "Slim Fit Denim Jeans", price: 49.99, image: product2, isFavorite: false },
  { id: 3, name: "Leather Casual Shoes", price: 79.99, image: product3, isFavorite: false },
  { id: 4, name: "Sports Running Shoes", price: 89.99, image: product4, isFavorite: false },
  { id: 5, name: "Winter Jacket Premium", price: 129.99, image: product5, isFavorite: false },
  { id: 6, name: "Casual Sneakers White", price: 54.99, image: product6, isFavorite: false },
];

export const RetailApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("order");
  const [showCustomScreen, setShowCustomScreen] = useState(false);
  const [showFavoritesScreen, setShowFavoritesScreen] = useState(false);
  const [showScannerScreen, setShowScannerScreen] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleToggleFavorite = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleAddToCart = (productId: number, quantity: number) => {
    console.log(`Added product ${productId} with quantity ${quantity} to cart`);
  };

  const handleBarcodeScanned = (barcode: string) => {
    console.log(`Scanned barcode: ${barcode}`);
    // Here you would typically look up the product and add it to cart
    setShowScannerScreen(false);
  };

  const favoriteProducts = products.filter(p => p.isFavorite);

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (showScannerScreen) {
      return (
        <BarcodeScannerScreen
          onClose={() => setShowScannerScreen(false)}
          onBarcodeScanned={handleBarcodeScanned}
        />
      );
    }

    if (showFavoritesScreen) {
      return (
        <FavoritesScreen
          onBack={() => setShowFavoritesScreen(false)}
          favoriteProducts={favoriteProducts}
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (showCustomScreen) {
      return <CustomPaymentScreen onClose={() => setShowCustomScreen(false)} />;
    }

    switch (activeTab) {
      case "order":
        return (
          <NewOrderScreen
            onCustomClick={() => setShowCustomScreen(true)}
            onFavoritesClick={() => setShowFavoritesScreen(true)}
            onScannerClick={() => setShowScannerScreen(true)}
            products={products}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />
        );
      case "transactions":
        return <TransactionsScreen />;
      case "customer":
        return <CustomerScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return (
          <NewOrderScreen
            onCustomClick={() => setShowCustomScreen(true)}
            onFavoritesClick={() => setShowFavoritesScreen(true)}
            onScannerClick={() => setShowScannerScreen(true)}
            products={products}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
          />
        );
    }
  };

  return (
    <RetailDevice>
      <div className="h-full flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        {isLoggedIn && !showCustomScreen && !showFavoritesScreen && !showScannerScreen && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </RetailDevice>
  );
};