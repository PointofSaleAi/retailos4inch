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
import { OrderSummaryScreen } from "./OrderSummaryScreen";
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

interface CartItem {
  id: string;
  type: 'product' | 'custom';
  productId?: number;
  name?: string;
  quantity: number;
  price: number;
  note?: string;
  image?: string;
}

interface Transaction {
  id: string;
  icon: "document" | "grid" | "tag" | "camera";
  product: string;
  quantity: number;
  date: string;
  time: string;
  amount: number;
  status: "Paid" | "Refunded" | "Failed" | "Ordering" | "Pending";
  cartItems?: CartItem[];
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
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleToggleFavorite = (productId: number) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
    ));
  };

  const handleAddToCart = (productId: number, quantity: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.type === 'product' && item.productId === productId);
      
      if (existingItem) {
        // Update existing item
        return prevItems.map(item =>
          item.type === 'product' && item.productId === productId
            ? { ...item, quantity }
            : item
        ).filter(item => item.quantity > 0);
      } else {
        // Add new item
        if (quantity > 0) {
          return [...prevItems, { 
            id: `product-${productId}`,
            type: 'product',
            productId, 
            quantity, 
            price: product.price,
            image: product.image,
            name: product.name
          }];
        }
        return prevItems;
      }
    });
  };

  const handleAddCustomToCart = (customItem: { name: string; price: number; quantity: number; note: string }) => {
    const newItem: CartItem = {
      id: `custom-${Date.now()}`,
      type: 'custom',
      name: customItem.name,
      price: customItem.price,
      quantity: customItem.quantity,
      note: customItem.note
    };
    setCartItems(prevItems => [newItem, ...prevItems]);
  };

  const handleUpdateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(prevItems => {
      return prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0);
    });
  };

  const handleNewOrder = () => {
    setShowOrderSummary(false);
    setActiveTab("order");
  };

  const handleSaveOrder = () => {
    if (cartItems.length === 0) return;

    const now = new Date();
    const date = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    const time = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    const firstItem = cartItems[0];
    const productName = firstItem.type === 'product' 
      ? (products.find(p => p.id === firstItem.productId)?.name.substring(0, 15) || 'Order')
      : (firstItem.name?.substring(0, 15) || 'Custom Order');
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      icon: "document",
      product: productName,
      quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      date,
      time,
      amount: cartTotal,
      status: "Pending",
      cartItems: [...cartItems]
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setCartItems([]);
    setShowOrderSummary(false);
    setActiveTab("order");
  };

  const handleOpenPendingTransaction = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (transaction && transaction.status === "Pending" && transaction.cartItems) {
      setCartItems(transaction.cartItems);
      setShowOrderSummary(true);
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const favoriteProducts = products.filter(p => p.isFavorite);

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (showBarcodeScanner) {
      return <BarcodeScannerScreen onClose={() => setShowBarcodeScanner(false)} />;
    }

    if (showOrderSummary) {
      // Convert unified cart items to OrderSummary format
      const cartItemsWithDetails = cartItems.map(item => ({
        id: item.id,
        name: item.type === 'product' ? (products.find(p => p.id === item.productId)?.name || '') : (item.name || ''),
        price: item.price,
        quantity: item.quantity,
        image: item.type === 'product' ? (products.find(p => p.id === item.productId)?.image || '') : '',
        note: item.note
      }));
      
      return (
        <OrderSummaryScreen
          cartItems={cartItemsWithDetails}
          onClose={() => {
            setShowOrderSummary(false);
            if (showCustomScreen) {
              setShowCustomScreen(true);
            }
          }}
          onUpdateQuantity={(id, quantity) => {
            handleUpdateCartQuantity(id, quantity);
          }}
          onNewOrder={() => {
            handleNewOrder();
          }}
          onSaveOrder={() => {
            handleSaveOrder();
          }}
        />
      );
    }

    if (showFavoritesScreen) {
      return (
        <FavoritesScreen
          onBack={() => setShowFavoritesScreen(false)}
          products={products}
          onAddToCart={handleAddToCart}
        />
      );
    }

    if (showCustomScreen) {
      return (
        <CustomPaymentScreen 
          onClose={() => setShowCustomScreen(false)} 
          onAddCustomToCart={handleAddCustomToCart}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          onCartClick={() => {
            setShowCustomScreen(false);
            setShowOrderSummary(true);
          }}
        />
      );
    }

    switch (activeTab) {
      case "order":
        return (
          <NewOrderScreen
            onCustomClick={() => setShowCustomScreen(true)}
            onFavoritesClick={() => setShowFavoritesScreen(true)}
            onScanClick={() => setShowBarcodeScanner(true)}
            products={products}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            cartItemCount={cartItemCount}
            cartTotal={cartTotal}
            onCartClick={() => setShowOrderSummary(true)}
          />
        );
      case "transactions":
        return <TransactionsScreen transactions={transactions} onTransactionClick={handleOpenPendingTransaction} />;
      case "customer":
        return <CustomerScreen />;
      case "settings":
        return <SettingsScreen />;
      default:
        return (
          <NewOrderScreen
            onCustomClick={() => setShowCustomScreen(true)}
            onFavoritesClick={() => setShowFavoritesScreen(true)}
            onScanClick={() => setShowBarcodeScanner(true)}
            products={products}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            cartItemCount={cartItemCount}
            cartTotal={cartTotal}
            onCartClick={() => setShowOrderSummary(true)}
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
        {isLoggedIn && !showCustomScreen && !showFavoritesScreen && !showBarcodeScanner && !showOrderSummary && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </RetailDevice>
  );
};