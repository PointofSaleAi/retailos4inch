import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import iconBackArrow from "@/assets/icon-back-arrow-new.png";
import iconUserCustomer from "@/assets/icon-user-customer.png";
import iconEditCustomer from "@/assets/icon-edit-customer.png";
import iconLocation from "@/assets/icon-location.png";
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
export const NewCustomerScreen = ({
  onClose,
  onSave
}: NewCustomerScreenProps) => {
  const [formData, setFormData] = useState<CustomerFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    tax: "",
    companyName: ""
  });
  const [countryCode, setCountryCode] = useState("+1");
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
  const handleCurrentLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      const {
        latitude,
        longitude
      } = position.coords;

      // Reverse geocode to get address (using a simple format for now)
      // In production, you'd use a proper geocoding service
      const address = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
      updateField("address", address);
    } catch (error) {
      alert("Unable to retrieve your location");
    }
  };
  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };
  const updateField = (field: keyof CustomerFormData, value: string | Date | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };
  return <div className="h-full flex flex-col bg-background" style={{
    fontFamily: 'Montserrat, sans-serif'
  }}>
      {/* Header */}
      <div className="flex-shrink-0 flex items-center justify-between py-[6px] px-[6px]">
        <button onClick={onClose} className="p-1">
          <img src={iconBackArrow} alt="Back" className="w-4 h-4" />
        </button>
        <h1 className="font-semibold text-foreground" style={{
        fontSize: '12px'
      }}>New Customer</h1>
        <div className="w-5" />
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div style={{
        width: '186px',
        margin: '0 auto',
        padding: '20px'
      }} className="space-y-2">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-[75px] h-[75px] rounded-full flex items-center justify-center" style={{
              backgroundColor: '#F1F2F5'
            }}>
                <img src={iconUserCustomer} alt="User" className="w-8 h-8" />
              </div>
              <button className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                <img src={iconEditCustomer} alt="Edit" className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* First Name */}
          <div className="space-y-1 py-0 px-0">
            <Input type="text" placeholder="First Name*" value={formData.firstName} onChange={e => updateField("firstName", e.target.value)} className="rounded-full text-xs" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
            {errors.firstName && <p className="text-[8px] text-red-500 pl-3">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div className="space-y-1 px-0 py-0">
            <Input type="text" placeholder="Last Name" value={formData.lastName} onChange={e => updateField("lastName", e.target.value)} className="rounded-full text-xs" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
          </div>

          {/* Email */}
          <div className="space-y-1 px-0 py-0">
            <Input type="email" placeholder="Email Address*" value={formData.email} onChange={e => updateField("email", e.target.value)} className="rounded-full text-xs" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
            {errors.email && <p className="text-[8px] text-red-500 pl-3">{errors.email}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <div className="flex gap-2 py-0 px-0">
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1 px-2 rounded-full" style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E5E5',
                  height: '28px',
                  width: '60px'
                }}>
                    <span className="text-xs">🇺🇸</span>
                    <span className="text-xs text-foreground">{countryCode}</span>
                    <ChevronDown className="w-3 h-3 text-foreground ml-auto" />
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-[170px] p-2 max-h-[200px] overflow-y-auto bg-white" align="start" sideOffset={2} style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="space-y-1">
                    {[{
                    flag: "🇺🇸",
                    code: "+1",
                    country: "United States"
                  }, {
                    flag: "🇬🇧",
                    code: "+44",
                    country: "United Kingdom"
                  }, {
                    flag: "🇨🇦",
                    code: "+1",
                    country: "Canada"
                  }, {
                    flag: "🇦🇺",
                    code: "+61",
                    country: "Australia"
                  }, {
                    flag: "🇮🇳",
                    code: "+91",
                    country: "India"
                  }, {
                    flag: "🇩🇪",
                    code: "+49",
                    country: "Germany"
                  }, {
                    flag: "🇫🇷",
                    code: "+33",
                    country: "France"
                  }, {
                    flag: "🇯🇵",
                    code: "+81",
                    country: "Japan"
                  }, {
                    flag: "🇨🇳",
                    code: "+86",
                    country: "China"
                  }, {
                    flag: "🇧🇷",
                    code: "+55",
                    country: "Brazil"
                  }].map(country => <button key={country.code + country.country} onClick={() => setCountryCode(country.code)} className="w-full flex items-center gap-2 px-2 py-1 hover:bg-muted rounded" style={{ fontSize: '10px' }}>
                        <span className="text-xs">{country.flag}</span>
                        <span className="text-foreground">{country.code}</span>
                        <span className="text-muted-foreground ml-auto">{country.country}</span>
                      </button>)}
                  </div>
                </PopoverContent>
              </Popover>
              <Input type="tel" placeholder="(XXX) XXX- XXXX" value={formData.phone} onChange={e => updateField("phone", e.target.value)} className="rounded-full text-xs flex-1" style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              height: '28px',
              fontSize: '11px'
            }} />
            </div>
            {errors.phone && <p className="text-[8px] text-red-500 pl-3">{errors.phone}</p>}
          </div>

          {/* Address */}
          <div className="space-y-1 relative px-0 py-0">
            <Input type="text" placeholder="Search Address" value={formData.address} onChange={e => updateField("address", e.target.value)} className="rounded-full text-xs pr-10" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
            <button onClick={handleCurrentLocation} type="button" className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity">
              <img src={iconLocation} alt="Location" className="w-3 h-3" />
            </button>
          </div>

          {/* Tax */}
          <div className="space-y-1 px-0 py-0">
            <Input type="text" placeholder="Tax" value={formData.tax} onChange={e => updateField("tax", e.target.value)} className="rounded-full text-xs" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
          </div>

          {/* Company Name */}
          <div className="space-y-1 px-0 py-0">
            <Input type="text" placeholder="Company Name" value={formData.companyName} onChange={e => updateField("companyName", e.target.value)} className="rounded-full text-xs" style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E5E5',
            height: '28px',
            fontSize: '11px',
            width: '186px'
          }} />
          </div>

          {/* Date of Birth */}
          <div className="space-y-1 px-0 py-0">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <button className="w-full rounded-full text-xs px-4 text-left" style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px',
                width: '186px'
              }}>
                  {formData.dateOfBirth ? <span className="text-foreground">{format(formData.dateOfBirth, "MM/dd/yyyy")}</span> : <span className="text-muted-foreground">Date of Birth</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="center" side="top" sideOffset={2} style={{ backgroundColor: '#FFFFFF' }}>
                <Calendar mode="single" selected={formData.dateOfBirth} onSelect={date => updateField("dateOfBirth", date)} disabled={date => date > new Date() || date < new Date("1900-01-01")} initialFocus className={cn("p-2 pointer-events-auto text-[10px] scale-90")} classNames={{
                  months: "space-y-2",
                  month: "space-y-2",
                  caption: "flex justify-center pt-1 relative items-center text-[10px]",
                  caption_label: "text-[10px] font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-5 w-5 bg-transparent p-0",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-6 font-normal text-[9px]",
                  row: "flex w-full mt-1",
                  cell: "text-center text-[10px] p-0 relative",
                  day: "h-6 w-6 p-0 font-normal text-[10px]",
                  day_selected: "bg-primary text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Anniversary */}
          <div className="space-y-1 px-0 py-0">
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <button className="w-full rounded-full text-xs px-4 text-left" style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E5E5',
                height: '28px',
                fontSize: '11px',
                width: '186px'
              }}>
                  {formData.anniversary ? <span className="text-foreground">{format(formData.anniversary, "MM/dd/yyyy")}</span> : <span className="text-muted-foreground">Anniversary</span>}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white" align="center" side="top" sideOffset={2} style={{ backgroundColor: '#FFFFFF' }}>
                <Calendar mode="single" selected={formData.anniversary} onSelect={date => updateField("anniversary", date)} initialFocus className={cn("p-2 pointer-events-auto text-[10px] scale-90")} classNames={{
                  months: "space-y-2",
                  month: "space-y-2",
                  caption: "flex justify-center pt-1 relative items-center text-[10px]",
                  caption_label: "text-[10px] font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button: "h-5 w-5 bg-transparent p-0",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "w-full border-collapse space-y-1",
                  head_row: "flex",
                  head_cell: "text-muted-foreground rounded-md w-6 font-normal text-[9px]",
                  row: "flex w-full mt-1",
                  cell: "text-center text-[10px] p-0 relative",
                  day: "h-6 w-6 p-0 font-normal text-[10px]",
                  day_selected: "bg-primary text-primary-foreground",
                  day_today: "bg-accent text-accent-foreground",
                }} />
              </PopoverContent>
            </Popover>
          </div>

          {/* Action Button */}
          <div className="pt-2 py-0">
            <button onClick={handleSave} className="w-full rounded-full font-semibold text-white transition-colors" style={{
            backgroundColor: '#1F2937',
            height: '28px',
            fontSize: '11px'
          }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>;
};