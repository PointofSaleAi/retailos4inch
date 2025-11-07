import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Customer } from "./CustomerScreen";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";
import iconEditCustomer from "@/assets/icon-edit-customer.png";
import iconBirthday from "@/assets/icon-birthday.png";
import iconAnniversary from "@/assets/icon-anniversary.png";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface CustomerDetailScreenProps {
  customer: Customer;
  onBack: () => void;
}

export const CustomerDetailScreen = ({ customer, onBack }: CustomerDetailScreenProps) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editedCustomer, setEditedCustomer] = useState(customer);
  const [birthdayDate, setBirthdayDate] = useState<Date | undefined>(
    customer.birthday ? new Date(customer.birthday) : undefined
  );
  const [anniversaryDate, setAnniversaryDate] = useState<Date | undefined>(
    customer.anniversary ? new Date(customer.anniversary) : undefined
  );

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
    email: editedCustomer.email || 'alex.venom516@reddit.com',
    loyaltyPoints: editedCustomer.loyaltyPoints || 582,
    customerSince: editedCustomer.customerSince || '10/25/2024',
    tax: editedCustomer.tax || '0085681251',
    companyName: editedCustomer.companyName || 'Northway LLC',
    birthday: editedCustomer.birthday || '06/26/1999',
    anniversary: editedCustomer.anniversary || '09/10/2018',
    address: editedCustomer.address || '7801 Maple Avenue Dallas, TX 75201',
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
      <div className="flex-1 overflow-y-auto scrollbar-hide flex justify-center">
        <div className="py-2" style={{ width: '186px' }}>
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
              <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Loyalty Points</span>
              <span className="font-semibold text-foreground" style={{ fontSize: '10px' }}>
                {customerDetails.loyaltyPoints}
              </span>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Customer Since */}
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Customer Since</span>
              {editingField === 'customerSince' ? (
                <Input
                  value={customerDetails.customerSince}
                  onChange={(e) => handleFieldChange('customerSince', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 font-semibold"
                  style={{ fontSize: '10px' }}
                />
              ) : (
                <span 
                  className="font-semibold text-foreground cursor-pointer hover:opacity-70"
                  style={{ fontSize: '10px' }}
                  onClick={() => handleFieldClick('customerSince')}
                >
                  {customerDetails.customerSince}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Tax */}
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Tax</span>
              {editingField === 'tax' ? (
                <Input
                  value={customerDetails.tax}
                  onChange={(e) => handleFieldChange('tax', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-32 font-semibold"
                  style={{ fontSize: '10px' }}
                />
              ) : (
                <span 
                  className="font-semibold text-foreground cursor-pointer hover:opacity-70"
                  style={{ fontSize: '10px' }}
                  onClick={() => handleFieldClick('tax')}
                >
                  {customerDetails.tax || '—'}
                </span>
              )}
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Company Name */}
            <div className="flex items-center justify-between py-2">
              <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Company Name</span>
              {editingField === 'companyName' ? (
                <Input
                  value={customerDetails.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-0 px-2 text-right w-40 font-semibold"
                  style={{ fontSize: '10px' }}
                />
              ) : (
                <span 
                  className="font-semibold text-foreground cursor-pointer hover:opacity-70"
                  style={{ fontSize: '10px' }}
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
                <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Birthday</span>
                <img src={iconBirthday} alt="" className="w-3.5 h-3.5" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="font-semibold text-foreground cursor-pointer hover:opacity-70" style={{ fontSize: '10px' }}>
                    {birthdayDate ? format(birthdayDate, "MM/dd/yyyy") : '—'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={birthdayDate}
                    onSelect={(date) => {
                      setBirthdayDate(date);
                      if (date) {
                        handleFieldChange('birthday', format(date, "MM/dd/yyyy"));
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Anniversary */}
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground" style={{ fontSize: '10px' }}>Anniversary</span>
                <img src={iconAnniversary} alt="" className="w-3.5 h-3.5" />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="font-semibold text-foreground cursor-pointer hover:opacity-70" style={{ fontSize: '10px' }}>
                    {anniversaryDate ? format(anniversaryDate, "MM/dd/yyyy") : '—'}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={anniversaryDate}
                    onSelect={(date) => {
                      setAnniversaryDate(date);
                      if (date) {
                        handleFieldChange('anniversary', format(date, "MM/dd/yyyy"));
                      }
                    }}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <Separator style={{ backgroundColor: '#F1F2F5' }} />

            {/* Address */}
            <div className="py-2">
              <span className="text-muted-foreground block mb-1.5" style={{ fontSize: '10px' }}>Address</span>
              {editingField === 'address' ? (
                <Input
                  value={customerDetails.address}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                  onBlur={handleFieldBlur}
                  autoFocus
                  className="h-auto py-2 px-3 rounded-lg"
                  style={{ backgroundColor: '#F1F2F5', fontSize: '10px' }}
                />
              ) : (
                <div 
                  className="flex items-center justify-between rounded-lg px-3 py-2 cursor-pointer hover:opacity-70" 
                  style={{ backgroundColor: '#F1F2F5' }}
                  onClick={() => handleFieldClick('address')}
                >
                  <span className="text-foreground" style={{ fontSize: '10px' }}>{customerDetails.address || '—'}</span>
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
