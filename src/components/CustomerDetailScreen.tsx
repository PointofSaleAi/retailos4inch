import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Customer } from "./CustomerScreen";
import iconBackArrow from "@/assets/icon-back-arrow.png";
import iconEditCustomer from "@/assets/icon-edit-customer.png";

interface CustomerDetailScreenProps {
  customer: Customer;
  onBack: () => void;
}

export const CustomerDetailScreen = ({ customer, onBack }: CustomerDetailScreenProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Mock additional data - in a real app, this would come from the customer object
  const customerDetails = {
    email: customer.email || `${customer.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    loyaltyPoints: customer.loyaltyPoints || 0,
    customerSince: customer.customerSince || new Date().toLocaleDateString('en-US'),
    tax: customer.tax || '',
    companyName: customer.companyName || '',
    birthday: customer.birthday || '',
    anniversary: customer.anniversary || '',
    address: customer.address || '',
    notes: customer.notes || ''
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{ fontFamily: 'Montserrat' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2.5">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="" className="w-4 h-4" />
        </button>
        <h1 className="text-base font-semibold text-foreground">Customer details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-3">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
              <Avatar className="w-20 h-20">
                <AvatarImage src={customer.avatar} alt={customer.name} />
                <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                  {getInitials(customer.name)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                <img src={iconEditCustomer} alt="" className="w-3 h-3" />
              </button>
            </div>

            <h2 className="text-lg font-bold text-foreground mb-1">
              {customer.name}
            </h2>
            <p className="text-xs text-foreground mb-0.5">
              {customerDetails.email}
            </p>
            <p className="text-xs text-foreground">
              {customer.phone}
            </p>
          </div>

          {/* Details Section */}
          <div className="space-y-0">
            {/* Loyalty Points */}
            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs text-muted-foreground">Loyalty Points</span>
              <span className="text-xs font-semibold text-foreground">{customerDetails.loyaltyPoints}</span>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Customer Since */}
            <div className="flex items-center justify-between py-2.5">
              <span className="text-xs text-muted-foreground">Customer Since</span>
              <span className="text-xs font-semibold text-foreground">{customerDetails.customerSince}</span>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Tax */}
            {customerDetails.tax && (
              <>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-muted-foreground">Tax</span>
                  <span className="text-xs font-semibold text-foreground">{customerDetails.tax}</span>
                </div>
                <Separator style={{ backgroundColor: '#F1F2F5' }} />
              </>
            )}

            {/* Company Name */}
            {customerDetails.companyName && (
              <>
                <div className="flex items-center justify-between py-2.5">
                  <span className="text-xs text-muted-foreground">Company Name</span>
                  <span className="text-xs font-semibold text-foreground">{customerDetails.companyName}</span>
                </div>
                <Separator style={{ backgroundColor: '#F1F2F5' }} />
              </>
            )}

            {/* Birthday */}
            {customerDetails.birthday && (
              <>
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Birthday</span>
                    <span className="text-xs">🎂</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{customerDetails.birthday}</span>
                </div>
                <Separator style={{ backgroundColor: '#F1F2F5' }} />
              </>
            )}

            {/* Anniversary */}
            {customerDetails.anniversary && (
              <>
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground">Anniversary</span>
                    <span className="text-xs">💍</span>
                  </div>
                  <span className="text-xs font-semibold text-foreground">{customerDetails.anniversary}</span>
                </div>
                <Separator style={{ backgroundColor: '#F1F2F5' }} />
              </>
            )}

            {/* Address */}
            {customerDetails.address && (
              <>
                <div className="py-2.5">
                  <span className="text-xs text-muted-foreground block mb-2">Address</span>
                  <div className="flex items-center justify-between rounded-lg px-3 py-2.5" style={{ backgroundColor: '#F1F2F5' }}>
                    <span className="text-xs text-foreground">{customerDetails.address}</span>
                    <span className="text-muted-foreground">›</span>
                  </div>
                </div>
              </>
            )}

            {/* Notes */}
            {customerDetails.notes && (
              <>
                <Separator style={{ backgroundColor: '#F1F2F5' }} />
                <div className="py-2.5">
                  <span className="text-xs text-muted-foreground block mb-2">Notes</span>
                  <p className="text-xs text-foreground">{customerDetails.notes}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
