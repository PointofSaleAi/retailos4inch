import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { RetailDevice } from "./RetailDevice";
import { LoginScreen } from "./LoginScreen";
import { NewOrderScreen } from "./NewOrderScreen";
import { TransactionsScreen } from "./TransactionsScreen";
import { CustomerScreen, Customer } from "./CustomerScreen";
import { useCustomerSearch } from "@/hooks/useCustomerSearch";
import { useProducts, Product } from "@/hooks/useProducts";
import { NewCustomerScreen, CustomerFormData } from "./NewCustomerScreen";
import { CustomerDetailScreen } from "./CustomerDetailScreen";
import { SettingsScreen } from "./SettingsScreen";
import { BottomNavigation } from "./BottomNavigation";
import { CustomPaymentScreen } from "./CustomPaymentScreen";
import { FavoritesScreen } from "./FavoritesScreen";
import { BarcodeScannerScreen } from "./BarcodeScannerScreen";
import { OrderSummaryScreen } from "./OrderSummaryScreen";
import { PaymentMethodsScreen } from "./PaymentMethodsScreen";
import { PaymentEntryScreen } from "./PaymentEntryScreen";
import { CashPaymentScreen } from "./CashPaymentScreen";
import { GiftCardPaymentScreen } from "./GiftCardPaymentScreen";
import { ManualCardPaymentScreen } from "./ManualCardPaymentScreen";
import { ManualCCPaymentScreen } from "./ManualCCPaymentScreen";
import { PaymentProcessingScreen } from "./PaymentProcessingScreen";
import { PaymentSuccessScreen } from "./PaymentSuccessScreen";
import { TransactionDetailScreen } from "./TransactionDetailScreen";
import { RefundScreen } from "./RefundScreen";
import { RefundReasonScreen } from "./RefundReasonScreen";
import { CustomRefundReasonScreen } from "./CustomRefundReasonScreen";
import { RefundedScreen } from "./RefundedScreen";
import { RefundDetailScreen } from "./RefundDetailScreen";
import { PayByLinkGuestListScreen, Guest } from "./PayByLinkGuestListScreen";
import { PayByLinkAddGuestScreen } from "./PayByLinkAddGuestScreen";
import { PayByLinkWaitingScreen } from "./PayByLinkWaitingScreen";
import { PayByQRCodeScreen } from "./PayByQRCodeScreen";
import { PayByQRCodeWaitingScreen } from "./PayByQRCodeWaitingScreen";
import { LoyaltyGuestListScreen, LoyaltyGuest } from "./LoyaltyGuestListScreen";
import { LoyaltyAddGuestScreen } from "./LoyaltyAddGuestScreen";
import { LoyaltyPaymentScreen } from "./LoyaltyPaymentScreen";
import { AddTaxScreen, Tax } from "./AddTaxScreen";
import { DiscountScreen, Discount } from "./DiscountScreen";
import { DeliveryChargeScreen } from "./DeliveryChargeScreen";
import { GiftCardMenuScreen } from "./GiftCardMenuScreen";
import { SellPlasticGiftCardScreen } from "./SellPlasticGiftCardScreen";
import { SelectAmountScreen } from "./SelectAmountScreen";
import { CustomAmountScreen } from "./CustomAmountScreen";
import { RecipientEmailScreen } from "./RecipientEmailScreen";
import { EGiftCardDesignScreen } from "./EGiftCardDesignScreen";
import { CheckBalanceScreen } from "./CheckBalanceScreen";
import { GiftCardBalanceScreen } from "./GiftCardBalanceScreen";
import { SplitCheckScreen } from "./SplitCheckScreen";
import { SplitCheckSummaryScreen } from "./SplitCheckSummaryScreen";

interface CartItem {
  id: string;
  type: 'product' | 'custom';
  productId?: string;
  name?: string;
  quantity: number;
  price: number;
  note?: string;
  image?: string;
  size?: string;
  color?: string;
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
  refundDate?: string;
  refundTime?: string;
  refundReason?: string;
  refundedItems?: CartItem[];
  refundedAmount?: number;
}

export const RetailApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState("order");
  const [showCustomScreen, setShowCustomScreen] = useState(false);
  const [showFavoritesScreen, setShowFavoritesScreen] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [showPaymentEntry, setShowPaymentEntry] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('Card');
  const [showPaymentProcessing, setShowPaymentProcessing] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showTransactionDetail, setShowTransactionDetail] = useState(false);
  const [showRefundScreen, setShowRefundScreen] = useState(false);
  const [showRefundReasonScreen, setShowRefundReasonScreen] = useState(false);
  const [showCustomRefundReasonScreen, setShowCustomRefundReasonScreen] = useState(false);
  const [showRefundedScreen, setShowRefundedScreen] = useState(false);
  const [showRefundDetailScreen, setShowRefundDetailScreen] = useState(false);
  const [currentRefundReason, setCurrentRefundReason] = useState("");
  const [showNewCustomer, setShowNewCustomer] = useState(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [remainingDue, setRemainingDue] = useState(0);
  const [selectedRefundItems, setSelectedRefundItems] = useState<CartItem[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string>("");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const { products, deductStock, toggleFavorite } = useProducts();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { updateCustomer } = useCustomerSearch();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeCustomerInOrder, setActiveCustomerInOrder] = useState<Customer | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [showPayByLinkGuestList, setShowPayByLinkGuestList] = useState(false);
  const [showPayByLinkAddGuest, setShowPayByLinkAddGuest] = useState(false);
  const [showPayByLinkWaiting, setShowPayByLinkWaiting] = useState(false);
  const [payByLinkSentTo, setPayByLinkSentTo] = useState("");
  const [payByLinkGuests, setPayByLinkGuests] = useState<Guest[]>([]);
  const [showPayByQRCode, setShowPayByQRCode] = useState(false);
  const [showPayByQRCodeWaiting, setShowPayByQRCodeWaiting] = useState(false);
  const [payByQRSentTo, setPayByQRSentTo] = useState("");
  const [payByQRSentVia, setPayByQRSentVia] = useState<'whatsapp' | 'text' | 'email'>('whatsapp');
  const [showLoyaltyGuestList, setShowLoyaltyGuestList] = useState(false);
  const [showLoyaltyAddGuest, setShowLoyaltyAddGuest] = useState(false);
  const [showLoyaltyPayment, setShowLoyaltyPayment] = useState(false);
  const [loyaltyGuests, setLoyaltyGuests] = useState<LoyaltyGuest[]>([]);
  const [selectedLoyaltyGuest, setSelectedLoyaltyGuest] = useState<LoyaltyGuest | null>(null);
  const [showAddTaxScreen, setShowAddTaxScreen] = useState(false);
  const [showDiscountScreen, setShowDiscountScreen] = useState(false);
  const [showDeliveryChargeScreen, setShowDeliveryChargeScreen] = useState(false);
  const [appliedTax, setAppliedTax] = useState<Tax | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  
  // Gift Card Selling Flow States
  const [showGiftCardMenu, setShowGiftCardMenu] = useState(false);
  const [showSellPlasticGiftCard, setShowSellPlasticGiftCard] = useState(false);
  const [showEGiftCardDesign, setShowEGiftCardDesign] = useState(false);
  const [showSelectAmount, setShowSelectAmount] = useState(false);
  const [showCustomAmount, setShowCustomAmount] = useState(false);
  const [showRecipientEmail, setShowRecipientEmail] = useState(false);
  const [showCheckBalance, setShowCheckBalance] = useState(false);
  const [showGiftCardBalance, setShowGiftCardBalance] = useState(false);
  const [giftCardNumber, setGiftCardNumber] = useState('');
  const [giftCardAmount, setGiftCardAmount] = useState(0);
  const [selectedGiftCardDesign, setSelectedGiftCardDesign] = useState('');
  const [checkBalanceCardNumber, setCheckBalanceCardNumber] = useState('');
  const [showSplitCheck, setShowSplitCheck] = useState(false);
  const [showSplitCheckSummary, setShowSplitCheckSummary] = useState(false);
  const [splitCheckCount, setSplitCheckCount] = useState(1);
  const [splitCheckMode, setSplitCheckMode] = useState<'evenly' | 'custom'>('evenly');
  const [paidSplitChecks, setPaidSplitChecks] = useState<Map<number, string>>(new Map());
  const [currentChargingCheckIndex, setCurrentChargingCheckIndex] = useState<number | null>(null);
  const [showAllChecksCompleteDialog, setShowAllChecksCompleteDialog] = useState(false);
  const [barcodeScanIndex, setBarcodeScanIndex] = useState(0);
  const [showSplitCheckWarning, setShowSplitCheckWarning] = useState(false);
  const [pendingCartAction, setPendingCartAction] = useState<{
    type: 'product' | 'custom';
    productId?: string;
    quantity?: number;
    size?: string;
    color?: string;
    increment?: boolean;
    customItem?: { name: string; price: number; quantity: number; note: string };
  } | null>(null);

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

  const handleToggleFavorite = (productId: string) => {
    toggleFavorite(productId);
  };

  // Check if we have paid split checks that would require reset
  const hasPaidSplitChecks = paidSplitChecks.size > 0;

  // Actual add to cart logic (called after confirmation if needed)
  const executeAddToCart = (productId: string, quantity: number, size?: string, color?: string, increment: boolean = false) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.type === 'product' && 
        item.productId === productId &&
        item.size === size &&
        item.color === color
      );
      
      if (existingItem) {
        // Update existing item - if increment mode, add to quantity; otherwise set the quantity
        const newQuantity = increment ? existingItem.quantity + quantity : quantity;
        return prevItems.map(item =>
          item.type === 'product' && 
          item.productId === productId &&
          item.size === size &&
          item.color === color
            ? { ...item, quantity: newQuantity }
            : item
        ).filter(item => item.quantity > 0);
      } else {
        // Add new item
        if (quantity > 0) {
          return [...prevItems, { 
            id: `product-${productId}-${size}-${color}-${Date.now()}`,
            type: 'product' as const,
            productId, 
            quantity, 
            price: product.price,
            image: product.image,
            name: product.name,
            size,
            color
          }];
        }
        return prevItems;
      }
    });
  };

  // Handle add to cart with split check warning
  const handleAddToCart = (productId: string, quantity: number, size?: string, color?: string, increment: boolean = false) => {
    // Check if there are paid split checks
    if (hasPaidSplitChecks) {
      // Store the pending action and show warning
      setPendingCartAction({ type: 'product', productId, quantity, size, color, increment });
      setShowSplitCheckWarning(true);
      return;
    }
    // No paid split checks, proceed normally
    executeAddToCart(productId, quantity, size, color, increment);
  };

  // Actual add custom to cart logic
  const executeAddCustomToCart = (customItem: { name: string; price: number; quantity: number; note: string }) => {
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

  const handleAddCustomToCart = (customItem: { name: string; price: number; quantity: number; note: string }) => {
    // Check if there are paid split checks
    if (hasPaidSplitChecks) {
      // Store the pending action and show warning
      setPendingCartAction({ type: 'custom', customItem });
      setShowSplitCheckWarning(true);
      return;
    }
    // No paid split checks, proceed normally
    executeAddCustomToCart(customItem);
  };

  // Handle confirmation to merge new product with existing order
  const handleMergeProductWithSplitOrder = () => {
    // Reset split payment state but keep existing cart items
    setPaidSplitChecks(new Map());
    setSplitCheckCount(1);
    setCurrentChargingCheckIndex(null);
    
    // Execute the pending cart action (adds to existing cart)
    if (pendingCartAction) {
      if (pendingCartAction.type === 'product' && pendingCartAction.productId) {
        executeAddToCart(
          pendingCartAction.productId,
          pendingCartAction.quantity || 1,
          pendingCartAction.size,
          pendingCartAction.color,
          pendingCartAction.increment
        );
      } else if (pendingCartAction.type === 'custom' && pendingCartAction.customItem) {
        executeAddCustomToCart(pendingCartAction.customItem);
      }
    }
    
    setPendingCartAction(null);
    setShowSplitCheckWarning(false);
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
    setRemainingDue(0);
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
    setRemainingDue(0);
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
      } else if (transaction.status === "Refunded") {
        setSelectedTransactionId(transactionId);
        setShowRefundDetailScreen(true);
      }
    }
  };

  const handleConfirmPayment = (paymentMethod: string, amount: number) => {
    if (cartItems.length === 0) return;
    if (amount < 0.01) return; // Minimum payment is $0.01
    
    setPaymentAmount(amount);
    setShowPaymentEntry(false);
    setShowPaymentProcessing(true);
  };

  const handlePaymentComplete = async () => {
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
      amount: paymentAmount,
      status: "Paid",
      cartItems: [...cartItems]
    };

    // Deduct stock for each product in cart (only once when first check is paid for split, or for regular payment)
    const isFirstSplitCheckPayment = currentChargingCheckIndex !== null && paidSplitChecks.size === 0;
    const isRegularPayment = currentChargingCheckIndex === null;
    
    if (isRegularPayment || isFirstSplitCheckPayment) {
      for (const item of cartItems) {
        if (item.type === 'product' && item.productId) {
          await deductStock(item.productId, item.quantity);
        }
      }
    }

    setTransactions(prev => [newTransaction, ...prev]);
    setShowPaymentProcessing(false);
    
    // Check if this is a split check payment
    if (currentChargingCheckIndex !== null) {
      // Split check payment - go directly to success screen
      // The success screen will handle marking the check as paid and navigation
      setShowPaymentSuccess(true);
    } else {
      // Regular payment flow
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const totalOrderAmount = subtotal + tax;
      
      // Calculate remaining after this payment
      const previouslyPaid = totalOrderAmount - (remainingDue > 0 ? remainingDue : totalOrderAmount);
      const totalPaidNow = previouslyPaid + paymentAmount;
      const newRemaining = totalOrderAmount - totalPaidNow;
      
      // Check if there's remaining balance
      if (newRemaining > 0.01) {
        // Partial payment - go back to payment methods
        setRemainingDue(newRemaining);
        setShowPaymentMethods(true);
      } else {
        // Full payment complete - show success and clear cart
        setRemainingDue(0);
        setCartItems([]);
        setShowPaymentSuccess(true);
      }
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate split payment info for displaying on New Order screen
  const getSplitPaymentInfo = () => {
    if (splitCheckCount <= 1 || paidSplitChecks.size === 0) return null;
    
    const TAX_RATE = 0.08;
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * TAX_RATE;
    const totalAmount = subtotal + tax;
    const amountPerCheck = totalAmount / splitCheckCount;
    const remainingChecks = splitCheckCount - paidSplitChecks.size;
    const remainingAmount = amountPerCheck * remainingChecks;
    
    return {
      paidChecksCount: paidSplitChecks.size,
      totalChecks: splitCheckCount,
      remainingAmount: remainingAmount
    };
  };

  const splitPaymentInfo = getSplitPaymentInfo();

  const favoriteProducts = products.filter(p => p.isFavorite);

  const renderScreen = () => {
    if (!isLoggedIn) {
      return <LoginScreen onLogin={handleLogin} />;
    }

    if (showPayByQRCodeWaiting) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const totalDue = subtotal + tax;

      return (
        <PayByQRCodeWaitingScreen
          amount={totalDue}
          sentTo={payByQRSentTo}
          sentVia={payByQRSentVia}
          onClose={() => {
            setShowPayByQRCodeWaiting(false);
            setShowPaymentMethods(true);
          }}
          onCheckStatus={() => {
            // Simulate payment complete
            handlePaymentComplete();
            setShowPayByQRCodeWaiting(false);
          }}
          onSendNewQR={() => {
            setShowPayByQRCodeWaiting(false);
            setShowPayByQRCode(true);
          }}
        />
      );
    }

    if (showPayByQRCode) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const totalDue = subtotal + tax;

      return (
        <PayByQRCodeScreen
          amount={totalDue}
          onBack={() => {
            setShowPayByQRCode(false);
            setShowPaymentMethods(true);
          }}
          onShare={(method, contactInfo) => {
            setPayByQRSentVia(method);
            setPayByQRSentTo(contactInfo);
            setShowPayByQRCode(false);
            setShowPayByQRCodeWaiting(true);
          }}
        />
      );
    }

    if (showPayByLinkWaiting) {
      return (
        <PayByLinkWaitingScreen
          amount={paymentAmount}
          sentTo={payByLinkSentTo}
          onClose={() => {
            setShowPayByLinkWaiting(false);
            setShowPaymentMethods(true);
          }}
          onCheckStatus={() => {
            // Simulate payment complete
            handlePaymentComplete();
            setShowPayByLinkWaiting(false);
          }}
          onSendNewLink={() => {
            setShowPayByLinkWaiting(false);
            setShowPayByLinkGuestList(true);
          }}
        />
      );
    }

    if (showPayByLinkAddGuest) {
      return (
        <PayByLinkAddGuestScreen
          onBack={() => {
            setShowPayByLinkAddGuest(false);
            setShowPayByLinkGuestList(true);
          }}
          onAdd={(guest) => {
            const newGuest: Guest = {
              id: Date.now().toString(),
              name: guest.name,
              phone: guest.phone,
              email: guest.email,
            };
            setPayByLinkGuests(prev => [newGuest, ...prev]);
            setShowPayByLinkAddGuest(false);
            setShowPayByLinkGuestList(true);
          }}
        />
      );
    }

    if (showPayByLinkGuestList) {
      return (
        <PayByLinkGuestListScreen
          amount={paymentAmount}
          addedGuests={payByLinkGuests}
          onBack={() => {
            setShowPayByLinkGuestList(false);
            setShowPaymentEntry(true);
          }}
          onAddGuest={() => {
            setShowPayByLinkGuestList(false);
            setShowPayByLinkAddGuest(true);
          }}
          onSendLink={(guest: Guest, method: 'whatsapp' | 'text' | 'email') => {
            console.log('Sending link to:', guest.name, 'via', method);
            setPayByLinkSentTo(guest.phone);
            setShowPayByLinkGuestList(false);
            setShowPayByLinkWaiting(true);
          }}
        />
      );
    }

    if (showAddTaxScreen) {
      return (
        <AddTaxScreen
          onClose={() => {
            setShowAddTaxScreen(false);
            setShowOrderSummary(true);
          }}
          onApply={(tax) => {
            setAppliedTax(tax);
            setShowAddTaxScreen(false);
            setShowOrderSummary(true);
          }}
          appliedTax={appliedTax}
        />
      );
    }

    if (showDiscountScreen) {
      return (
        <DiscountScreen
          subtotal={cartTotal}
          onClose={() => {
            setShowDiscountScreen(false);
            setShowOrderSummary(true);
          }}
          onApply={(discount) => {
            setAppliedDiscount(discount);
            setShowDiscountScreen(false);
            setShowOrderSummary(true);
          }}
          appliedDiscount={appliedDiscount}
        />
      );
    }

    if (showDeliveryChargeScreen) {
      return (
        <DeliveryChargeScreen
          onClose={() => {
            setShowDeliveryChargeScreen(false);
            setShowOrderSummary(true);
          }}
          onApply={(amount) => {
            setDeliveryCharge(amount);
            setShowDeliveryChargeScreen(false);
            setShowOrderSummary(true);
          }}
          initialAmount={deliveryCharge}
        />
      );
    }

    // Gift Card Selling Flow
    if (showGiftCardMenu) {
      return (
        <GiftCardMenuScreen
          onClose={() => {
            setShowGiftCardMenu(false);
            setShowOrderSummary(true);
          }}
          onSellPlastic={() => {
            setSelectedGiftCardDesign('');
            setShowGiftCardMenu(false);
            setShowSellPlasticGiftCard(true);
          }}
          onSellEGift={() => {
            setShowGiftCardMenu(false);
            setShowEGiftCardDesign(true);
          }}
          onCheckBalance={() => {
            setShowGiftCardMenu(false);
            setShowCheckBalance(true);
          }}
        />
      );
    }

    if (showCheckBalance) {
      return (
        <CheckBalanceScreen
          onBack={() => {
            setShowCheckBalance(false);
            setShowGiftCardMenu(true);
          }}
          onCheckBalance={(cardNum) => {
            setCheckBalanceCardNumber(cardNum);
            setShowCheckBalance(false);
            setShowGiftCardBalance(true);
          }}
        />
      );
    }

    if (showGiftCardBalance) {
      // Mock activity data
      const mockActivity = [
        { date: '15 May 25', amount: 10.00 },
        { date: '20 Apr 25', amount: 25.55 },
        { date: '30 Apr 25', amount: 25.55 },
      ];
      
      return (
        <GiftCardBalanceScreen
          cardNumber={checkBalanceCardNumber}
          balance={10.00}
          activity={mockActivity}
          onBack={() => {
            setShowGiftCardBalance(false);
            setShowGiftCardMenu(true);
            setCheckBalanceCardNumber('');
          }}
          onAddValue={() => {
            // Go to amount selection for reload
            setGiftCardNumber(checkBalanceCardNumber);
            setShowGiftCardBalance(false);
            setShowSelectAmount(true);
          }}
        />
      );
    }

    if (showEGiftCardDesign) {
      return (
        <EGiftCardDesignScreen
          onBack={() => {
            setShowEGiftCardDesign(false);
            setShowGiftCardMenu(true);
          }}
          onSelectDesign={(design) => {
            setSelectedGiftCardDesign(design);
            setShowEGiftCardDesign(false);
            setShowSelectAmount(true);
          }}
        />
      );
    }

    if (showSellPlasticGiftCard) {
      return (
        <SellPlasticGiftCardScreen
          isEGift={false}
          onBack={() => {
            setShowSellPlasticGiftCard(false);
            setShowGiftCardMenu(true);
          }}
          onContinue={(cardNum) => {
            setGiftCardNumber(cardNum);
            setShowSellPlasticGiftCard(false);
            setShowSelectAmount(true);
          }}
        />
      );
    }

    if (showSelectAmount) {
      const isEGiftFlow = selectedGiftCardDesign !== '';
      return (
        <SelectAmountScreen
          onBack={() => {
            setShowSelectAmount(false);
            if (isEGiftFlow) {
              setShowEGiftCardDesign(true);
            } else {
              setShowSellPlasticGiftCard(true);
            }
          }}
          onSelectAmount={(amount) => {
            setGiftCardAmount(amount);
            if (isEGiftFlow) {
              setShowSelectAmount(false);
              setShowRecipientEmail(true);
            } else {
              // Add gift card to cart and go back to order summary
              const giftCardItem: CartItem = {
                id: `giftcard-${Date.now()}`,
                type: 'custom',
                name: `Gift Card ${giftCardNumber.slice(-4)}`,
                price: amount,
                quantity: 1,
                image: ''
              };
              setCartItems(prev => [...prev, giftCardItem]);
              setShowSelectAmount(false);
              setShowOrderSummary(true);
              setGiftCardNumber('');
              setGiftCardAmount(0);
            }
          }}
          onCustom={() => {
            setShowSelectAmount(false);
            setShowCustomAmount(true);
          }}
        />
      );
    }

    if (showCustomAmount) {
      const isEGiftFlow = selectedGiftCardDesign !== '';
      return (
        <CustomAmountScreen
          onBack={() => {
            setShowCustomAmount(false);
            setShowSelectAmount(true);
          }}
          onDone={(amount) => {
            setGiftCardAmount(amount);
            if (isEGiftFlow) {
              setShowCustomAmount(false);
              setShowRecipientEmail(true);
            } else {
              // Add gift card to cart and go back to order summary
              const giftCardItem: CartItem = {
                id: `giftcard-${Date.now()}`,
                type: 'custom',
                name: `Gift Card ${giftCardNumber.slice(-4)}`,
                price: amount,
                quantity: 1,
                image: ''
              };
              setCartItems(prev => [...prev, giftCardItem]);
              setShowCustomAmount(false);
              setShowOrderSummary(true);
              setGiftCardNumber('');
              setGiftCardAmount(0);
            }
          }}
        />
      );
    }

    if (showRecipientEmail) {
      return (
        <RecipientEmailScreen
          onBack={() => {
            setShowRecipientEmail(false);
            setShowSelectAmount(true);
          }}
          onSend={(email) => {
            console.log('Sending eGift card to:', email);
            // Add eGift card to cart
            const eGiftCardItem: CartItem = {
              id: `egiftcard-${Date.now()}`,
              type: 'custom',
              name: `eGift Card (${selectedGiftCardDesign})`,
              price: giftCardAmount,
              quantity: 1,
              image: ''
            };
            setCartItems(prev => [...prev, eGiftCardItem]);
            setShowRecipientEmail(false);
            setShowOrderSummary(true);
            setGiftCardNumber('');
            setGiftCardAmount(0);
            setSelectedGiftCardDesign('');
          }}
        />
      );
    }

    if (showLoyaltyPayment && selectedLoyaltyGuest) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const totalDue = subtotal + tax;

      return (
        <LoyaltyPaymentScreen
          amount={totalDue}
          guest={selectedLoyaltyGuest}
          onClose={() => {
            setShowLoyaltyPayment(false);
            setSelectedLoyaltyGuest(null);
            setShowPaymentMethods(true);
          }}
          onRedeem={(otp) => {
            console.log('Redeeming loyalty points with OTP:', otp);
            setPaymentAmount(totalDue);
            setShowLoyaltyPayment(false);
            setSelectedLoyaltyGuest(null);
            setShowPaymentProcessing(true);
          }}
        />
      );
    }

    if (showLoyaltyAddGuest) {
      return (
        <LoyaltyAddGuestScreen
          onBack={() => {
            setShowLoyaltyAddGuest(false);
            setShowLoyaltyGuestList(true);
          }}
          onAdd={(guest) => {
            const newGuest: LoyaltyGuest = {
              id: Date.now().toString(),
              name: guest.name,
              phone: guest.phone,
              email: guest.email,
              points: 0
            };
            setLoyaltyGuests(prev => [newGuest, ...prev]);
            setShowLoyaltyAddGuest(false);
            setShowLoyaltyGuestList(true);
          }}
        />
      );
    }

    if (showLoyaltyGuestList) {
      return (
        <LoyaltyGuestListScreen
          addedGuests={loyaltyGuests}
          onBack={() => {
            setShowLoyaltyGuestList(false);
            setShowPaymentMethods(true);
          }}
          onAddGuest={() => {
            setShowLoyaltyGuestList(false);
            setShowLoyaltyAddGuest(true);
          }}
          onSelectGuest={(guest: LoyaltyGuest) => {
            setSelectedLoyaltyGuest(guest);
            setShowLoyaltyGuestList(false);
            setShowLoyaltyPayment(true);
          }}
        />
      );
    }

    if (showRefundDetailScreen) {
      const transaction = transactions.find(t => t.id === selectedTransactionId);
      if (!transaction) return null;

      // Show only the refunded items, not all cart items
      const refundProducts = (transaction.refundedItems || transaction.cartItems)?.map(item => ({
        name: item.name || (item.productId ? (products.find(p => p.id === item.productId)?.name || 'Product') : 'Item'),
        size: item.size || "XS",
        color: item.color || "Olive Green",
        price: item.price * item.quantity
      })) || [];

      // Calculate remaining products that haven't been refunded yet
      const refundedItemIds = new Set(
        transaction.refundedItems?.map(item => `${item.productId || item.name}-${item.size}-${item.color}`) || []
      );
      
      const remainingProducts = transaction.cartItems?.filter(item => {
        const itemKey = `${item.productId || item.name}-${item.size}-${item.color}`;
        const refundedItem = transaction.refundedItems?.find(ri => 
          (ri.productId || ri.name) === (item.productId || item.name) && 
          ri.size === item.size && 
          ri.color === item.color
        );
        // If not refunded at all, or refunded quantity is less than original quantity
        if (!refundedItem) return true;
        return item.quantity > refundedItem.quantity;
      }).map(item => {
        const refundedItem = transaction.refundedItems?.find(ri => 
          (ri.productId || ri.name) === (item.productId || item.name) && 
          ri.size === item.size && 
          ri.color === item.color
        );
        const remainingQty = refundedItem ? item.quantity - refundedItem.quantity : item.quantity;
        return {
          name: item.name || (item.productId ? (products.find(p => p.id === item.productId)?.name || 'Product') : 'Item'),
          size: item.size || "XS",
          color: item.color || "Olive Green",
          price: item.price * remainingQty
        };
      }).filter(p => p.price > 0) || [];

      return (
        <RefundDetailScreen
          transactionId="256"
          amount={transaction.refundedAmount || transaction.amount}
          customer="Micheal David"
          products={refundProducts}
          refundDate={transaction.refundDate || transaction.date}
          refundTime={transaction.refundTime || transaction.time}
          paidDate={transaction.date}
          paidTime={transaction.time}
          refundReason={transaction.refundReason || "Customer changed mind"}
          paymentMethod="Card | 0486"
          remainingProducts={remainingProducts}
          onBack={() => {
            setShowRefundDetailScreen(false);
            setActiveTab("transactions");
          }}
          onRefundRemaining={remainingProducts.length > 0 ? () => {
            setShowRefundDetailScreen(false);
            setShowRefundScreen(true);
          } : undefined}
        />
      );
    }

    if (showRefundedScreen) {
      return (
        <RefundedScreen
          amount={refundAmount}
          paymentMethod="Card | 0486"
          onClose={() => {
            const now = new Date();
            const refundDate = now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
            const refundTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
            
            // Update transaction with refund details - MERGE with existing refunded items
            setTransactions(prev =>
              prev.map(t => {
                if (t.id !== selectedTransactionId) return t;
                
                // Merge existing refunded items with new ones
                const existingRefundedItems = t.refundedItems || [];
                const mergedRefundedItems: CartItem[] = [...existingRefundedItems];
                
                selectedRefundItems.forEach(newItem => {
                  const existingIndex = mergedRefundedItems.findIndex(ri => 
                    (ri.productId === newItem.productId || ri.name === newItem.name) &&
                    ri.size === newItem.size &&
                    ri.color === newItem.color
                  );
                  
                  if (existingIndex >= 0) {
                    // Add to existing refunded quantity
                    mergedRefundedItems[existingIndex] = {
                      ...mergedRefundedItems[existingIndex],
                      quantity: mergedRefundedItems[existingIndex].quantity + newItem.quantity
                    };
                  } else {
                    // Add as new refunded item
                    mergedRefundedItems.push(newItem);
                  }
                });
                
                // Calculate total refunded amount
                const totalRefundedAmount = (t.refundedAmount || 0) + refundAmount;
                
                // Check if all items are now refunded
                const totalCartValue = t.cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
                const isFullyRefunded = totalRefundedAmount >= totalCartValue;
                
                return { 
                  ...t, 
                  status: "Refunded" as const,
                  refundDate,
                  refundTime,
                  refundReason: currentRefundReason || "Customer changed mind",
                  refundedItems: mergedRefundedItems,
                  refundedAmount: totalRefundedAmount
                };
              })
            );
            
            setShowRefundedScreen(false);
            setShowRefundScreen(false);
            setShowRefundReasonScreen(false);
            setShowCustomRefundReasonScreen(false);
            setShowTransactionDetail(false);
            setShowRefundDetailScreen(false);
            setCurrentRefundReason("");
            setSelectedRefundItems([]);
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
            setCurrentRefundReason(customReason);
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
            setCurrentRefundReason(reason);
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
      // Get already refunded items for this transaction
      const refundedItems = transaction?.refundedItems || [];
      
      // Expand cart items with quantity > 1 into individual items for partial refund
      const refundProducts: Array<{
        name: string;
        size: string;
        color: string;
        price: number;
        originalIndex: number;
        unitIndex: number;
        isRefunded: boolean;
      }> = [];
      
      transaction?.cartItems?.forEach((item, index) => {
        const itemName = item.type === 'product' 
          ? (products.find(p => p.id === item.productId)?.name || '') 
          : (item.name || '');
        
        // Find matching refunded item
        const matchingRefundedItem = refundedItems.find(ri => 
          (ri.productId === item.productId || ri.name === item.name) &&
          ri.size === item.size &&
          ri.color === item.color
        );
        const refundedQty = matchingRefundedItem?.quantity || 0;
        
        // Create individual entries for each unit in quantity
        for (let i = 0; i < item.quantity; i++) {
          refundProducts.push({
            name: itemName,
            size: item.size || "XS",
            color: item.color || "Olive Green",
            price: item.price, // Price per unit, not total
            originalIndex: index,
            unitIndex: i,
            isRefunded: i < refundedQty // Mark units that are already refunded
          });
        }
      });

      return (
        <RefundScreen
          products={refundProducts}
          onBack={() => {
            setShowRefundScreen(false);
            setShowTransactionDetail(true);
          }}
          onNext={(amount, selectedIndices) => {
            setRefundAmount(amount);
            // Get selected refund products (individual units)
            const selectedRefundProducts = selectedIndices.map(i => refundProducts[i]);
            // Group by originalIndex and count how many units of each cart item are being refunded
            const refundCountByOriginalIndex = new Map<number, number>();
            selectedRefundProducts.forEach(item => {
              const count = refundCountByOriginalIndex.get(item.originalIndex) || 0;
              refundCountByOriginalIndex.set(item.originalIndex, count + 1);
            });
            // Create refund items with the selected quantities
            const selectedItems = transaction?.cartItems
              ?.filter((_, index) => refundCountByOriginalIndex.has(index))
              .map((item, _, arr) => {
                const originalIndex = transaction?.cartItems?.indexOf(item) ?? 0;
                const refundQty = refundCountByOriginalIndex.get(originalIndex) || 0;
                return { ...item, quantity: refundQty };
              }) || [];
            setSelectedRefundItems(selectedItems);
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
            // For demo: cycle through products when barcodes are scanned
            // In production, you'd match the barcode to a product
            if (products.length > 0) {
              const product = products[barcodeScanIndex % products.length];
              // Add as a new item each time (not incrementing same product)
              handleAddToCart(product.id, 1, undefined, undefined, false);
              // Move to next product for next scan
              setBarcodeScanIndex(prev => prev + 1);
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
          onBack={() => setShowNewCustomer(false)}
          onSave={handleSaveCustomer}
        />
      );
    }

    if (selectedCustomer) {
      return (
        <CustomerDetailScreen
          customer={selectedCustomer}
          onBack={() => setSelectedCustomer(null)}
          onUpdate={async (updatedCustomer, avatarFile) => {
            try {
              const saved = await updateCustomer(updatedCustomer.id, updatedCustomer, avatarFile);
              setCustomers(prev => 
                prev.map(c => c.id === saved.id ? saved : c)
              );
              // Don't re-set selectedCustomer here to avoid reopening the screen
            } catch (error) {
              console.error('Failed to update customer:', error);
              // Still update local state for UX
              setCustomers(prev => 
                prev.map(c => c.id === updatedCustomer.id ? updatedCustomer : c)
              );
            }
          }}
        />
      );
    }

    if (showPaymentProcessing) {
      return (
        <PaymentProcessingScreen
          paymentMethod={selectedPaymentMethod}
          amount={paymentAmount}
          onClose={() => {
            setShowPaymentProcessing(false);
            setShowPaymentMethods(true);
          }}
          onComplete={handlePaymentComplete}
        />
      );
    }

    if (showAllChecksCompleteDialog) {
      return (
        <div 
          className="w-[189px] h-[330px] bg-white flex flex-col mx-auto overflow-hidden items-center justify-center px-4"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-green-600 text-xl">✓</span>
            </div>
            <h2 className="text-[12px] font-bold text-black mb-2">All Checks Paid!</h2>
            <p className="text-[10px] text-gray-600">All split checks have been successfully paid. Complete the order?</p>
          </div>
          <div className="w-full space-y-2">
            <button
              onClick={() => {
                setShowAllChecksCompleteDialog(false);
                setCartItems([]);
                setCurrentChargingCheckIndex(null);
                setPaidSplitChecks(new Map());
                setSplitCheckCount(1);
                setActiveTab("order");
              }}
              className="w-full h-[32px] bg-[#4A4A4A] text-white rounded-full font-bold text-[10px]"
            >
              COMPLETE ORDER
            </button>
          </div>
        </div>
      );
    }

    // Split check warning overlay - renders on top of current screen
    const splitCheckWarningOverlay = showSplitCheckWarning ? (
      <>
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/50 z-40" />
        
        {/* Dialog */}
        <div className="absolute inset-0 flex items-center justify-center z-50 px-3">
          <div className="bg-white rounded-2xl p-4 w-full shadow-lg">
            <h2 className="text-[12px] font-bold text-black text-center mb-3">Disclaimer</h2>
            <p className="text-[9px] text-[#666] text-center mb-4 leading-relaxed">
              This check has been split, please remerge in order to be able to add more products or start a new order
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleMergeProductWithSplitOrder}
                className="flex-1 h-[32px] border-2 border-[#0066FF] text-[#0066FF] rounded-lg font-semibold text-[10px]"
              >
                Merge
              </button>
              <button
                onClick={() => {
                  setPendingCartAction(null);
                  setShowSplitCheckWarning(false);
                }}
                className="flex-1 h-[32px] border-2 border-[#CC0000] text-[#CC0000] rounded-lg font-semibold text-[10px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </>
    ) : null;

    if (showPaymentSuccess) {
      return (
        <PaymentSuccessScreen
          amount={paymentAmount}
          onClose={() => {
            // Check if we were charging a split check
            if (currentChargingCheckIndex !== null) {
              // Mark the check as paid with payment method
              const newPaidChecks = new Map(paidSplitChecks);
              newPaidChecks.set(currentChargingCheckIndex, selectedPaymentMethod || 'Card');
              setPaidSplitChecks(newPaidChecks);
              
              // Check if all checks are paid
              if (newPaidChecks.size >= splitCheckCount) {
                // All checks paid, show confirmation dialog
                setShowPaymentSuccess(false);
                setCurrentChargingCheckIndex(null);
                setShowAllChecksCompleteDialog(true);
              } else {
                // Go back to summary to pay remaining checks
                setShowPaymentSuccess(false);
                setCurrentChargingCheckIndex(null);
                setShowSplitCheckSummary(true);
              }
            } else {
              // Regular payment flow - full payment complete
              setShowPaymentSuccess(false);
              setCartItems([]);
              setRemainingDue(0);
              setActiveTab("order");
            }
          }}
        />
      );
    }

    if (showSplitCheckSummary) {
      // Convert unified cart items to screen format
      const cartItemsWithDetails = cartItems.map(item => ({
        id: item.id,
        name: item.type === 'product' ? (products.find(p => p.id === item.productId)?.name || '') : (item.name || ''),
        price: item.price,
        quantity: item.quantity,
        image: item.type === 'product' ? (products.find(p => p.id === item.productId)?.image || '') : '',
        size: item.size,
        color: item.color
      }));

      return (
        <SplitCheckSummaryScreen
          cartItems={cartItemsWithDetails}
          numberOfChecks={splitCheckCount}
          splitMode={splitCheckMode}
          paidChecks={paidSplitChecks}
          onBack={() => {
            // Close and return to New Order screen, preserving split state
            setShowSplitCheckSummary(false);
            setActiveTab("order");
          }}
          onChargeCheck={(checkIndex, amount) => {
            setCurrentChargingCheckIndex(checkIndex);
            setPaymentAmount(amount);
            setShowSplitCheckSummary(false);
            setShowPaymentMethods(true);
          }}
          onResetSplit={() => {
            setSplitCheckCount(1);
            setSplitCheckMode('evenly');
            setPaidSplitChecks(new Map());
            setShowSplitCheckSummary(false);
            setShowSplitCheck(true);
          }}
        />
      );
    }

    if (showSplitCheck) {
      // Convert unified cart items to SplitCheckScreen format
      const cartItemsWithDetails = cartItems.map(item => ({
        id: item.id,
        name: item.type === 'product' ? (products.find(p => p.id === item.productId)?.name || '') : (item.name || ''),
        price: item.price,
        quantity: item.quantity,
        image: item.type === 'product' ? (products.find(p => p.id === item.productId)?.image || '') : '',
        size: item.size,
        color: item.color
      }));

      return (
        <SplitCheckScreen
          cartItems={cartItemsWithDetails}
          onBack={() => {
            setShowSplitCheck(false);
            setShowPaymentMethods(true);
          }}
          onPay={(checkIndex, amount) => {
            setPaymentAmount(amount);
            setShowSplitCheck(false);
            setShowPaymentProcessing(true);
          }}
          onProceedToSummary={(numberOfChecks, splitMode) => {
            setSplitCheckCount(numberOfChecks);
            setSplitCheckMode(splitMode);
            setShowSplitCheck(false);
            setShowSplitCheckSummary(true);
          }}
        />
      );
    }

    if (showPaymentMethods) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const calculatedTotal = subtotal + tax;
      // Use remainingDue for partial payments, paymentAmount for split checks, otherwise calculated total
      const totalDue = remainingDue > 0 ? remainingDue : (currentChargingCheckIndex !== null ? paymentAmount : calculatedTotal);

      return (
        <PaymentMethodsScreen
          totalDue={totalDue}
          remainingBalance={remainingDue > 0 ? remainingDue : undefined}
          onBack={() => {
            setShowPaymentMethods(false);
            // If in split check flow, go back to split check summary
            // Preserve the paid checks state - only reset the current charging index
            if (currentChargingCheckIndex !== null || paidSplitChecks.size > 0) {
              setCurrentChargingCheckIndex(null);
              setShowSplitCheckSummary(true);
            } else {
              setShowOrderSummary(true);
            }
          }}
          onSelectMethod={(method) => {
            setSelectedPaymentMethod(method);
            if (method === 'QR Code') {
              setShowPaymentMethods(false);
              setShowPayByQRCode(true);
            } else if (method === 'Loyalty') {
              setShowPaymentMethods(false);
              setShowLoyaltyGuestList(true);
            } else if (method === 'Split Check') {
              setShowPaymentMethods(false);
              setShowSplitCheck(true);
            } else {
              setShowPaymentMethods(false);
              setShowPaymentEntry(true);
            }
          }}
        />
      );
    }

    if (showPaymentEntry) {
      const TAX_RATE = 0.08;
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const tax = subtotal * TAX_RATE;
      const calculatedTotal = subtotal + tax;
      // Use remainingDue for partial payments, paymentAmount for split checks, otherwise calculated total
      const totalDue = remainingDue > 0 ? remainingDue : (currentChargingCheckIndex !== null ? paymentAmount : calculatedTotal);

      // Show CashPaymentScreen for Cash payment method
      if (selectedPaymentMethod === 'Cash') {
        return (
          <CashPaymentScreen
            totalDue={totalDue}
            onBack={() => {
              setShowPaymentEntry(false);
              setShowPaymentMethods(true);
            }}
            onCharge={(amount) => handleConfirmPayment(selectedPaymentMethod, amount)}
          />
        );
      }

      // Show GiftCardPaymentScreen for Gift Card payment method
      if (selectedPaymentMethod === 'Gift Card') {
        return (
          <GiftCardPaymentScreen
            totalDue={totalDue}
            onBack={() => {
              setShowPaymentEntry(false);
              setShowPaymentMethods(true);
            }}
            onCharge={(amount, giftCardNumber) => {
              console.log('Gift card payment:', giftCardNumber);
              handleConfirmPayment(selectedPaymentMethod, amount);
            }}
          />
        );
      }

      // Show ManualCardPaymentScreen for Manual Card payment method
      if (selectedPaymentMethod === 'Manual Card') {
        return (
          <ManualCardPaymentScreen
            totalDue={totalDue}
            onBack={() => {
              setShowPaymentEntry(false);
              setShowPaymentMethods(true);
            }}
            onCharge={(amount, cardDetails) => {
              console.log('Manual card payment:', cardDetails);
              handleConfirmPayment(selectedPaymentMethod, amount);
            }}
          />
        );
      }

      // Show ManualCCPaymentScreen for Manual CC payment method
      if (selectedPaymentMethod === 'Manual CC') {
        return (
          <ManualCCPaymentScreen
            totalDue={totalDue}
            onBack={() => {
              setShowPaymentEntry(false);
              setShowPaymentMethods(true);
            }}
            onCharge={(amount) => {
              handleConfirmPayment(selectedPaymentMethod, amount);
            }}
          />
        );
      }

      // Show Guest List for Pay by Link
      if (selectedPaymentMethod === 'Pay by Link') {
        return (
          <PaymentEntryScreen
            paymentMethod={selectedPaymentMethod}
            totalDue={totalDue}
            onBack={() => {
              setShowPaymentEntry(false);
              setShowPaymentMethods(true);
            }}
            onCharge={(amount) => {
              setPaymentAmount(amount);
              setShowPaymentEntry(false);
              setShowPayByLinkGuestList(true);
            }}
          />
        );
      }

      return (
        <PaymentEntryScreen
          paymentMethod={selectedPaymentMethod}
          totalDue={totalDue}
          onBack={() => {
            setShowPaymentEntry(false);
            setShowPaymentMethods(true);
          }}
          onCharge={(amount) => handleConfirmPayment(selectedPaymentMethod, amount)}
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
        note: item.note,
        size: item.size,
        color: item.color
      }));
      
      return (
        <OrderSummaryScreen
          cartItems={cartItemsWithDetails}
          selectedCustomer={activeCustomerInOrder}
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
            setShowPaymentMethods(true);
          }}
          onAddTax={() => {
            setShowOrderSummary(false);
            setShowAddTaxScreen(true);
          }}
          onDiscount={() => {
            setShowOrderSummary(false);
            setShowDiscountScreen(true);
          }}
          onGiftCard={() => {
            setShowOrderSummary(false);
            setShowGiftCardMenu(true);
          }}
          onClearCart={() => {
            setCartItems([]);
            setAppliedDiscount(null);
            setAppliedTax(null);
            setDeliveryCharge(0);
            toast({
              title: "Cart Cleared",
              description: "All items and discounts have been removed.",
              duration: 2000,
            });
          }}
          onAddCustomer={() => {
            setShowOrderSummary(false);
            setActiveTab("customer");
          }}
          onRedeemLoyalty={() => {
            setShowOrderSummary(false);
            setShowLoyaltyGuestList(true);
          }}
          onDeliveryCharge={() => {
            setShowOrderSummary(false);
            setShowDeliveryChargeScreen(true);
          }}
          appliedTax={appliedTax}
          appliedDiscount={appliedDiscount}
          deliveryCharge={deliveryCharge}
          onClearDeliveryCharge={() => setDeliveryCharge(0)}
          onCustomerSelected={(customer) => {
            setSelectedCustomer(customer);
          }}
          onAddToCartWithEdit={(itemId, productId, quantity, size, color) => {
            // Find the original item
            const originalItem = cartItems.find(item => item.id === itemId);
            if (!originalItem) return;
            
            // Check if size or color changed
            const sizeChanged = originalItem.size !== size;
            const colorChanged = originalItem.color !== color;
            
            if (sizeChanged || colorChanged) {
              // Add as a new line item with a unique ID
              const newItem = {
                ...originalItem,
                id: `${productId}-${size}-${color}-${Date.now()}`,
                quantity,
                size,
                color
              };
              setCartItems(prevItems => [...prevItems, newItem]);
            } else {
              // Same size and color - just update quantity
              setCartItems(prevItems => 
                prevItems.map(item => 
                  item.id === itemId 
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                )
              );
            }
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
          cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
          cartTotal={cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
          onCartClick={() => {
            setShowFavoritesScreen(false);
            setShowOrderSummary(true);
          }}
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
          onFavoritesClick={() => {
            setShowCustomScreen(false);
            setShowFavoritesScreen(true);
          }}
          onScanClick={() => {
            setShowCustomScreen(false);
            setShowBarcodeScanner(true);
          }}
          onAddTax={() => {
            setShowCustomScreen(false);
            setShowAddTaxScreen(true);
          }}
          onDiscount={() => {
            setShowCustomScreen(false);
            setShowDiscountScreen(true);
          }}
          onGiftCard={() => {
            setShowCustomScreen(false);
            setShowGiftCardMenu(true);
          }}
          onRedeemLoyalty={() => {
            setShowCustomScreen(false);
            setShowLoyaltyGuestList(true);
          }}
          onDeliveryCharge={() => {
            setShowCustomScreen(false);
            setShowDeliveryChargeScreen(true);
          }}
        />
      );
    }

    switch (activeTab) {
      case "order":
        return (
          <>
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
              onProductDetailOpen={setIsProductDetailOpen}
              onAddTax={() => setShowAddTaxScreen(true)}
              onDiscount={() => setShowDiscountScreen(true)}
              onGiftCard={() => setShowGiftCardMenu(true)}
              onRedeemLoyalty={() => setShowLoyaltyGuestList(true)}
              onDeliveryCharge={() => setShowDeliveryChargeScreen(true)}
              splitPaymentInfo={splitPaymentInfo}
              onSplitCartClick={() => setShowSplitCheckSummary(true)}
            />
            {splitCheckWarningOverlay}
          </>
        );
      case "transactions":
        return <TransactionsScreen transactions={transactions} onTransactionClick={handleOpenPendingTransaction} />;
      case "customer":
        return <CustomerScreen 
          onAddCustomer={() => setShowNewCustomer(true)} 
          onViewCustomer={setSelectedCustomer}
          onSelectCustomer={(customer) => {
            setActiveCustomerInOrder(customer);
            setShowOrderSummary(true);
          }}
        />;
      case "settings":
        return <SettingsScreen />;
      default:
        return (
          <>
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
              onProductDetailOpen={setIsProductDetailOpen}
              onAddTax={() => setShowAddTaxScreen(true)}
              onDiscount={() => setShowDiscountScreen(true)}
              onGiftCard={() => setShowGiftCardMenu(true)}
              onRedeemLoyalty={() => setShowLoyaltyGuestList(true)}
              onDeliveryCharge={() => setShowDeliveryChargeScreen(true)}
              splitPaymentInfo={splitPaymentInfo}
              onSplitCartClick={() => setShowSplitCheckSummary(true)}
            />
            {splitCheckWarningOverlay}
          </>
        );
    }
  };

  return (
    <RetailDevice>
      <div className="h-full flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>
        {isLoggedIn && !showCustomScreen && !showFavoritesScreen && !showBarcodeScanner && !showOrderSummary && !showPaymentMethods && !showPaymentEntry && !showPaymentProcessing && !showPaymentSuccess && !showTransactionDetail && !showRefundScreen && !showRefundReasonScreen && !showCustomRefundReasonScreen && !showRefundedScreen && !showRefundDetailScreen && !showNewCustomer && !selectedCustomer && !isProductDetailOpen && !showPayByLinkGuestList && !showPayByLinkAddGuest && !showPayByLinkWaiting && !showPayByQRCode && !showPayByQRCodeWaiting && !showLoyaltyGuestList && !showLoyaltyAddGuest && !showLoyaltyPayment && !showAddTaxScreen && !showDiscountScreen && !showDeliveryChargeScreen && !showGiftCardMenu && !showSellPlasticGiftCard && !showSelectAmount && !showCustomAmount && !showRecipientEmail && !showCheckBalance && !showGiftCardBalance && !showEGiftCardDesign && !showSplitCheck && !showSplitCheckSummary && (
          <BottomNavigation
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        )}
      </div>
    </RetailDevice>
  );
};