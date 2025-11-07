import { useState } from "react";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { CustomerScreen, Customer } from "./CustomerScreen";
import { NewCustomerScreen, CustomerFormData } from "./NewCustomerScreen";
import { SettingsScreen } from "./SettingsScreen";
import { BottomNavigation } from "./BottomNavigation";
import { CustomPaymentScreen } from "./CustomPaymentScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { BarcodeScannerScreen } from "./BarcodeScannerScreen";
import { OrderSummaryScreen } from "./OrderSummaryScreen";
import { PaymentOptionsScreen } from "./PaymentOptionsScreen";
import { PaymentSuccessScreen } from "./PaymentSuccessScreen";
import { TransactionDetailScreen } from "./TransactionDetailScreen";
import { RefundScreen } from "./RefundScreen";
import { RefundReasonScreen } from "./RefundReasonScreen";
import { CustomRefundReasonScreen } from "./CustomRefundReasonScreen";
import { RefundedScreen } from "./RefundedScreen";
import productNew1 from "@/assets/product-new-1.png";
import productNew2 from "@/assets/product-new-2.png";
import productNew3 from "@/assets/product-new-3.png";

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
  { id: 1, name: "Brown Oversized Shirt", price: 24.99, image: productNew1, isFavorite: false },
  { id: 2, name: "Black Casual Shirt", price: 49.99, image: productNew2, isFavorite: false },
  { id: 3, name: "Beige Linen Shirt", price: 79.99, image: productNew3, isFavorite: false },
  { id: 4, name: "Brown Classic Shirt", price: 89.99, image: productNew1, isFavorite: false },
  { id: 5, name: "Black Premium Shirt", price: 129.99, image: productNew2, isFavorite: false },
  { id: 6, name: "Beige Summer Shirt", price: 54.99, image: productNew3, isFavorite: false },
];

export const RetailApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("order");
  const [showCustomScreen, setShowCustomScreen] = useState(false);
  const [showFavoritesScreen, setShowFavoritesScreen] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [showRefundScreen, setShowRefundScreen] = useState(false);
  const [showRefundReasonScreen, setShowRefundReasonScreen] = useState(false);
  const [showCustomRefundReasonScreen, setShowCustomRefundReasonScreen] = useState(false);
  const [showRefundedScreen, setShowRefundedScreen] = useState(false);
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSaveCustomer = (customerData: CustomerFormData) => {
    const newCustomer: Customer = {
      id: Date.now().toString(),
      name: `${customerData.firstName} ${customerData.lastName}`.trim(),
      phone: `${customerData.phone}`,
      avatar: undefined
    };
    setCustomers(prev => [newCustomer, ...prev]);
    setShowNewCustomer(false);
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
    if (transaction) {
      if (transaction.status === "Pending" && transaction.cartItems) {
        setCartItems(transaction.cartItems);
        setShowOrderSummary(true);
      } else if (transaction.status === "Paid") {
        setSelectedTransactionId(transactionId);
        setShowTransactionDetail(true);
      }
    }
  };

  const handleConfirmPayment = (paymentMethod: string, amount: number) => {
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
      amount: amount,
      status: "Paid",
      cartItems: [...cartItems]
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setPaymentAmount(amount);
    setShowPaymentOptions(false);
    setShowPaymentSuccess(true);
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const favoriteProducts = products.filter(p => p.isFavorite);

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (showRefundedScreen) {
      return (
        <RefundedScreen
          amount={refundAmount}
          paymentMethod="Card | 0486"
          onClose={() => {
            // Update transaction status to Refunded
            setTransactions(prev =>
              prev.map(t =>
                t.id === selectedTransactionId
                  ? { ...t, status: "Refunded" as const }
                  : t
              )
            );
            
            setShowRefundedScreen(false);
            setShowRefundScreen(false);
            setShowRefundReasonScreen(false);
            setShowCustomRefundReasonScreen(false);
            setShowTransactionDetail(false);
            setActiveTab("transactions");
          }}
        />
      );
    }

    if (showCustomRefundReasonScreen) {
      return (
        <CustomRefundReasonScreen
          onBack={() => {
            setShowCustomRefundReasonScreen(false);
            setShowRefundReasonScreen(true);
          }}
          onNext={(customReason) => {
            console.log("Refund reason:", customReason);
            setShowCustomRefundReasonScreen(false);
            setShowRefundedScreen(true);
          }}
        />
      );
    }

    if (showRefundReasonScreen) {
      return (
        <RefundReasonScreen
          amount={refundAmount}
          paymentMethod="Card | 0486"
          onBack={() => {
            setShowRefundReasonScreen(false);
            setShowRefundScreen(true);
          }}
          onRefund={(reason) => {
            console.log("Refund reason:", reason);
            setShowRefundReasonScreen(false);
            setShowRefundedScreen(true);
          }}
          onOtherSelected={() => {
            setShowRefundReasonScreen(false);
            setShowCustomRefundReasonScreen(true);
          }}
        />
      );
    }

    if (showRefundScreen) {
      const transaction = transactions.find(t => t.id === selectedTransactionId);
      const refundProducts = transaction?.cartItems?.map(item => ({
        name: item.type === 'product' ? (products.find(p => p.id === item.productId)?.name || '') : (item.name || ''),
        size: "XS",
        color: "Olive Green",
        price: item.price * item.quantity
      })) || [];

      return (
        <RefundScreen
          products={refundProducts}
          onBack={() => {
            setShowRefundScreen(false);
            setShowTransactionDetail(true);
          }}
          onNext={(amount) => {
            setRefundAmount(amount);
            setShowRefundScreen(false);
            setShowRefundReasonScreen(true);
          }}
        />
      );
    }

    if (showTransactionDetail) {
      const transaction = transactions.find(t => t.id === selectedTransactionId);
      if (!transaction) return null;

      const detailProducts = transaction.cartItems?.map(item => ({
        name: item.type === 'product' ? (products.find(p => p.id === item.productId)?.name || '') : (item.name || ''),
        size: "XS",
        color: "Olive Green",
        price: item.price * item.quantity
      })) || [];

      return (
        <TransactionDetailScreen
          transactionId="256"
          amount={transaction.amount}
          customer="Micheal David"
          products={detailProducts}
          onBack={() => {
            setShowTransactionDetail(false);
            setActiveTab("transactions");
          }}
          onRefund={() => {
            setShowTransactionDetail(false);
            setShowRefundScreen(true);
          }}
        />
      );
    }

    if (showBarcodeScanner) {
      return (
        <BarcodeScannerScreen 
          onClose={() => setShowBarcodeScanner(false)}
          onScanSuccess={(barcode) => {
            // For demo: add the first product to cart when any barcode is scanned
            // In production, you'd match the barcode to a product
            const product = products[0];
            if (product) {
              handleAddToCart(product.id, 1);
            }
          }}
          cartItemCount={cartItemCount}
          cartTotal={cartTotal}
          onCartClick={() => {
            setShowBarcodeScanner(false);
            setShowOrderSummary(true);
          }}
        />
      );
    }

    if (showNewCustomer) {
      return (
        <NewCustomerScreen
          onClose={() => setShowNewCustomer(false)}
          onSave={handleSaveCustomer}
        />
      );
    }

    if (showPaymentSuccess) {
      return (
        <PaymentSuccessScreen
          amount={paymentAmount}
          onClose={() => {
            setShowPaymentSuccess(false);
            setCartItems([]);
            setActiveTab("order");
          }}
        />
      );
    }

    if (showPaymentOptions) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const totalDue = subtotal + tax;

      return (
        <PaymentOptionsScreen
          totalDue={totalDue}
          onClose={() => {
            setShowPaymentOptions(false);
            setShowOrderSummary(true);
          }}
          onConfirmPayment={handleConfirmPayment}
        />
      );
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
          onCharge={() => {
            setShowOrderSummary(false);
            setShowPaymentOptions(true);
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
        return <CustomerScreen onAddCustomer={() => setShowNewCustomer(true)} customers={customers} />;
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
        {isLoggedIn && !showCustomScreen && !showFavoritesScreen && !showBarcodeScanner && !showOrderSummary && !showPaymentOptions && !showPaymentSuccess && !showTransactionDetail && !showRefundScreen && !showRefundReasonScreen && !showCustomRefundReasonScreen && !showRefundedScreen && !showNewCustomer && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </RetailDevice>
  );
};