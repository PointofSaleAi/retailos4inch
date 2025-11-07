import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Customer } from "./CustomerScreen";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";
import iconEditCustomer from "@/assets/icon-edit-customer.png";
import iconBirthday from "@/assets/icon-birthday.png";
import iconAnniversary from "@/assets/icon-anniversary.png";
import { useState } from "react";

interface CustomerDetailScreenProps {
  customer: Customer;
  onBack: () => void;
}

export const CustomerDetailScreen = ({ customer, onBack }: CustomerDetailScreenProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedCustomer, setEditedCustomer] = useState(customer);

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
    email: editedCustomer.email || `${editedCustomer.name.toLowerCase().replace(/\s+/g, '.')}@email.com`,
    loyaltyPoints: editedCustomer.loyaltyPoints || 0,
    customerSince: editedCustomer.customerSince || new Date().toLocaleDateString('en-US'),
    tax: editedCustomer.tax || '',
    companyName: editedCustomer.companyName || '',
    birthday: editedCustomer.birthday || '',
    anniversary: editedCustomer.anniversary || '',
    address: editedCustomer.address || '',
    notes: editedCustomer.notes || ''
  };

  const handleFieldClick = (field: string) => {
    setEditingField(field);
  };

  const handleFieldChange = (field: string, value: string | number) => {
    setEditedCustomer(prev => ({ ...prev, [field]: value }));
  };

  const handleFieldBlur = () => {
    setEditingField(null);
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{ fontFamily: 'Montserrat' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-3 px-3 py-2">
        <button onClick={onBack} className="p-1">
          <img src={iconBackArrow} alt="" className="w-3.5 h-3.5" />
        </button>
        <h1 className="font-semibold text-foreground" style={{ fontSize: '12px' }}>Customer details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 py-2">
          {/* Avatar Section */}
          <div className="flex flex-col items-center mb-3">
            <div className="relative mb-2">
              <Avatar style={{ width: '75px', height: '75px' }}>
                <AvatarImage src={editedCustomer.avatar} alt={editedCustomer.name} />
                <AvatarFallback className="bg-muted text-foreground font-semibold text-lg">
                  {getInitials(editedCustomer.name)}
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                <img src={iconEditCustomer} alt="" className="w-3 h-3" />
              </button>
            </div>

            {editingField === 'name' ? (
              <Input
                value={editedCustomer.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                onBlur={handleFieldBlur}
                autoFocus
                className="h-auto py-0 px-2 text-center font-bold mb-1"
                style={{ fontSize: '12px' }}
              />
            ) : (
              <h2 
                className="font-bold text-foreground mb-1 cursor-pointer hover:opacity-70" 
                style={{ fontSize: '12px' }}
                onClick={() => handleFieldClick('name')}
              >
                {editedCustomer.name}
              </h2>
            )}
            
            {editingField === 'email' ? (
              <Input
                value={customerDetails.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                onBlur={handleFieldBlur}
                autoFocus
                className="h-auto py-0 px-2 text-center mb-0.5"
                style={{ fontSize: '10px' }}
              />
            ) : (
              <p 
                className="text-foreground mb-0.5 cursor-pointer hover:opacity-70" 
                style={{ fontSize: '10px' }}
                onClick={() => handleFieldClick('email')}
              >
                {customerDetails.email}
              </p>
            )}
            
            {editingField === 'phone' ? (
              <Input
                value={editedCustomer.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onBlur={handleFieldBlur}
                autoFocus
                className="h-auto py-0 px-2 text-center"
                style={{ fontSize: '10px' }}
              />
            ) : (
              <p 
                className="text-foreground cursor-pointer hover:opacity-70" 
                style={{ fontSize: '10px' }}
                onClick={() => handleFieldClick('phone')}
              >
                {editedCustomer.phone}
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-0">
            {/* Loyalty Points - Read Only */}
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted-foreground">Loyalty Points</span>
              <span className="text-xs font-semibold text-foreground">
                {customerDetails.loyaltyPoints}
              </span>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Customer Since */}
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted-foreground">Customer Since</span>
              {editingField === 'customerSince' ? (
                <Input
                  value={customerDetails.customerSince}
                  onChange={(e) => handleFieldChange('customerSince', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 text-xs font-semibold"
                />
              ) : (
                <span 
                  className="text-xs font-semibold text-foreground cursor-pointer hover:opacity-70"
                  onClick={() => handleFieldClick('customerSince')}
                >
                  {customerDetails.customerSince}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Tax */}
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted-foreground">Tax</span>
              {editingField === 'tax' ? (
                <Input
                  value={customerDetails.tax}
                  onChange={(e) => handleFieldChange('tax', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 text-xs font-semibold"
                />
              ) : (
                <span 
                  className="text-xs font-semibold text-foreground cursor-pointer hover:opacity-70"
                  onClick={() => handleFieldClick('tax')}
                >
                  {customerDetails.tax || '—'}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Company Name */}
            <div className="flex items-center justify-between py-2">
              <span className="text-xs text-muted-foreground">Company Name</span>
              {editingField === 'companyName' ? (
                <Input
                  value={customerDetails.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-40 text-xs font-semibold"
                />
              ) : (
                <span 
                  className="text-xs font-semibold text-foreground cursor-pointer hover:opacity-70"
                  onClick={() => handleFieldClick('companyName')}
                >
                  {customerDetails.companyName || '—'}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Birthday */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Birthday</span>
                <img src={iconBirthday} alt="" className="w-3.5 h-3.5" />
              </div>
              {editingField === 'birthday' ? (
                <Input
                  value={customerDetails.birthday}
                  onChange={(e) => handleFieldChange('birthday', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 text-xs font-semibold"
                />
              ) : (
                <span 
                  className="text-xs font-semibold text-foreground cursor-pointer hover:opacity-70"
                  onClick={() => handleFieldClick('birthday')}
                >
                  {customerDetails.birthday || '—'}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Anniversary */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground">Anniversary</span>
                <img src={iconAnniversary} alt="" className="w-3.5 h-3.5" />
              </div>
              {editingField === 'anniversary' ? (
                <Input
                  value={customerDetails.anniversary}
                  onChange={(e) => handleFieldChange('anniversary', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 text-xs font-semibold"
                />
              ) : (
                <span 
                  className="text-xs font-semibold text-foreground cursor-pointer hover:opacity-70"
                  onClick={() => handleFieldClick('anniversary')}
                >
                  {customerDetails.anniversary || '—'}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Address */}
            <div className="py-2">
              <span className="text-xs text-muted-foreground block mb-1.5">Address</span>
              {editingField === 'address' ? (
                <Input
                  value={customerDetails.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-2 px-3 text-xs rounded-lg"
                  style={{ backgroundColor: '#F1F2F5' }}
                />
              ) : (
                <div 
                  className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer hover:opacity-70" 
                  style={{ backgroundColor: '#F1F2F5' }}
                  onClick={() => handleFieldClick('address')}
                >
                  <span className="text-xs text-foreground">{customerDetails.address || '—'}</span>
                  <span className="text-muted-foreground">›</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
