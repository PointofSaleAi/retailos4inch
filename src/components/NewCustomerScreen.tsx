import { useState } from "react";
import { MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import iconBackArrow from "@/assets/icon-back-arrow.png";
import iconUserCustomer from "@/assets/icon-user-customer.png";
import iconEditCustomer from "@/assets/icon-edit-customer.png";

interface NewCustomerScreenProps {
  onClose: () => void;
  onSave: (customer: CustomerFormData) => void;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  tax: string;
  companyName: string;
  dateOfBirth?: Date;
  anniversary?: Date;
}

export const NewCustomerScreen = ({ onClose, onSave }: NewCustomerScreenProps) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    tax: "",
    companyName: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CustomerFormData, string>>>({});

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CustomerFormData, string>> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Invalid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const updateField = (field: keyof CustomerFormData, value: string | Date | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="h-full flex flex-col bg-background" style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between px-3 py-2.5">
        <button onClick={onClose} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-4 h-4" />
        </button>
        <h1 className="font-semibold text-foreground" style={{ fontSize: '12px' }}>New Customer</h1>
        <div className="w-5" />
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-2" style={{ width: '186px', padding: '8px 6px', margin: '0 auto' }}>
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#F1F2F5' }}
              >
                <img src={iconUserCustomer} alt="User" className="w-10 h-10" />
              </div>
              <button 
                className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center"
              >
                <img src={iconEditCustomer} alt="Edit" className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="First Name*"
              value={formData.firstName}
              onChange={(e) => updateField("firstName", e.target.value)}
              className="rounded-full text-xs"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
            {errors.firstName && (
              <p className="text-[8px] text-red-500 pl-3">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => updateField("lastName", e.target.value)}
              className="rounded-full text-xs"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Input
              type="email"
              placeholder="Email Address*"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="rounded-full text-xs"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
            {errors.email && (
              <p className="text-[8px] text-red-500 pl-3">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <div className="flex gap-2">
              <div 
                className="flex items-center gap-1 px-2 rounded-full"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E5E5',
                  height: '28px', 
                  width: '60px' 
                }}
              >
                <span className="text-xs">🇺🇸</span>
                <span className="text-xs text-foreground">+1</span>
              </div>
              <Input
                type="tel"
                placeholder="(XXX) XXX- XXXX"
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="rounded-full text-xs flex-1"
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E5E5',
                  height: '28px',
                  fontSize: '11px' 
                }}
              />
            </div>
            {errors.phone && (
              <p className="text-[8px] text-red-500 pl-3">{errors.phone}</p>
            )}
          </div>

          {/* Address */}
          <div className="space-y-1 relative">
            <Input
              type="text"
              placeholder="Search Address"
              value={formData.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="rounded-full text-xs pr-10"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center">
              <MapPin className="w-3 h-3 text-background" />
            </button>
          </div>

          {/* Tax */}
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Tax"
              value={formData.tax}
              onChange={(e) => updateField("tax", e.target.value)}
              className="rounded-full text-xs"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
          </div>

          {/* Company Name */}
          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) => updateField("companyName", e.target.value)}
              className="rounded-full text-xs"
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px' 
              }}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full rounded-full text-xs px-4 text-left"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E5E5',
                    height: '28px',
                    fontSize: '11px' 
                  }}
                >
                  {formData.dateOfBirth ? (
                    <span className="text-foreground">{format(formData.dateOfBirth, "MM/dd/yyyy")}</span>
                  ) : (
                    <span className="text-muted-foreground">Date of Birth</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dateOfBirth}
                  onSelect={(date) => updateField("dateOfBirth", date)}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Anniversary */}
          <div className="space-y-1">
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full rounded-full text-xs px-4 text-left"
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E5E5',
                    height: '28px',
                    fontSize: '11px' 
                  }}
                >
                  {formData.anniversary ? (
                    <span className="text-foreground">{format(formData.anniversary, "MM/dd/yyyy")}</span>
                  ) : (
                    <span className="text-muted-foreground">Anniversary</span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.anniversary}
                  onSelect={(date) => updateField("anniversary", date)}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              className="w-full rounded-full text-xs font-medium text-background transition-colors"
              style={{ backgroundColor: '#1F2937', height: '28px' }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
