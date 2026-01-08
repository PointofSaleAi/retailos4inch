import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { BusinessVerticalScreen } from "./BusinessVerticalScreen";
import { SubVerticalScreen } from "./SubVerticalScreen";
import { countryOptions, formatPhoneNumber, validatePhoneNumber } from "@/hooks/usePhoneInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface RegistrationScreenProps {
  onBack: () => void;
  onSuccess: () => void;
}

export const RegistrationScreen = ({ onBack, onSuccess }: RegistrationScreenProps) => {
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState("United States");
  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("🇺🇸");
  const [companyName, setCompanyName] = useState("");
  const [businessVerticals, setBusinessVerticals] = useState<string[]>([]);
  const [subVerticals, setSubVerticals] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [pin, setPin] = useState("");
  const [confirmationMethod, setConfirmationMethod] = useState<"email" | "phone">("email");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(300); // 5 minutes in seconds
  const [showBusinessVerticalSelect, setShowBusinessVerticalSelect] = useState(false);
  const [showSubVerticalSelect, setShowSubVerticalSelect] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-scroll to active step when step changes
  useEffect(() => {
    const activeStepRef = stepRefs.current[step - 1];
    if (activeStepRef) {
      activeStepRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [step]);

  const handleCountryCodeChange = (value: string) => {
    const selected = countryOptions.find(opt => `${opt.flag}-${opt.code}` === value);
    if (selected) {
      setCountryCode(selected.code);
      setCountryFlag(selected.flag);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError("");
      return false;
    }
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasMinLength) {
      setPasswordError("Password must be at least 8 characters");
      return false;
    }
    if (!hasUppercase) {
      setPasswordError("Password must contain an uppercase letter");
      return false;
    }
    if (!hasLowercase) {
      setPasswordError("Password must contain a lowercase letter");
      return false;
    }
    if (!hasNumber) {
      setPasswordError("Password must contain a number");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      setPhoneError("");
      return false;
    }
    if (!validatePhoneNumber(phone)) {
      setPhoneError("Phone must be 10 digits");
      return false;
    }
    setPhoneError("");
    return true;
  };


  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setMobileNumber(formatted);
    validatePhone(formatted);
  };

  const handleCreateAccount = async () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isPhoneValid = validatePhone(mobileNumber);
    
    if (firstName && lastName && isEmailValid && isPhoneValid && isPasswordValid && country && companyName && businessVerticals.length > 0 && subVerticals.length > 0 && agreedToTerms) {
      setIsLoading(true);
      
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: `${countryCode}${mobileNumber}`,
              company_name: companyName,
              country: country,
              business_verticals: businessVerticals,
              sub_verticals: subVerticals
            }
          }
        });
        
        if (error) throw error;
        
        // Move to PIN setup step
        setStep(2);
      } catch (error: any) {
        toast({
          title: "Registration Failed",
          description: error.message || "Could not create account",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePinInput = (value: string) => {
    if (value === "C") {
      setPin("");
    } else if (value === "⌫") {
      setPin(pin.slice(0, -1));
    } else if (pin.length < 4) {
      const newPin = pin + value;
      setPin(newPin);
      if (newPin.length === 4) {
        setTimeout(() => setStep(3), 300);
      }
    }
  };

  const handleSendConfirmation = () => {
    setStep(4);
    // Start countdown timer
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.querySelector(`input[name=otp-${index + 1}]`) as HTMLInputElement;
        nextInput?.focus();
      }
      
      // Check if OTP is complete
      if (newOtp.every(digit => digit !== "") && newOtp.join("").length === 4) {
        setTimeout(() => {
          setShowSuccessDialog(true);
        }, 300);
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showBusinessVerticalSelect) {
    return (
      <BusinessVerticalScreen
        onBack={() => setShowBusinessVerticalSelect(false)}
        selectedVerticals={businessVerticals}
        onSelect={(verticals) => {
          setBusinessVerticals(verticals);
          setShowBusinessVerticalSelect(false);
        }}
      />
    );
  }

  if (showSubVerticalSelect) {
    return (
      <SubVerticalScreen
        onBack={() => setShowSubVerticalSelect(false)}
        selectedSubVerticals={subVerticals}
        selectedBusinessVerticals={businessVerticals}
        onSelect={(selected) => {
          setSubVerticals(selected);
          setShowSubVerticalSelect(false);
        }}
      />
    );
  }

  return (
    <div className="h-full flex justify-center bg-background animate-fade-in overflow-y-auto">
      <div className="w-[186px] flex flex-col">
        {/* Header */}
        <div className="flex items-center py-2">
          <button onClick={onBack} className="p-1">
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <h1 className="flex-1 text-center text-[12px] font-semibold text-foreground pr-6">
            Create An Account
          </h1>
        </div>

        {/* Step Indicators */}
        <div className="overflow-x-auto scrollbar-hide py-3">
          <div className="flex items-center min-w-max">
            {/* Step 1 */}
            <div 
              ref={(el) => (stepRefs.current[0] = el)}
              className="flex items-center gap-1"
            >
              <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-full text-[10px] font-medium flex-shrink-0 ${
                step === 1 ? "bg-[#212121] text-white" : step > 1 ? "bg-[#212121] text-white" : "bg-white border border-[#D1D1D1] text-[#212121]"
              }`}>
                {step > 1 ? "✓" : "1"}
              </div>
              <span className={`text-[8px] font-medium whitespace-nowrap ${step === 1 ? "text-foreground" : "text-muted-foreground"}`}>
                Create Account
              </span>
            </div>

            {/* Connector 1-2 */}
            <div className={`w-3 h-[1px] mx-1 flex-shrink-0 ${step > 1 ? "bg-[#212121]" : "bg-[#D1D1D1]"}`} />

            {/* Step 2 */}
            <div 
              ref={(el) => (stepRefs.current[1] = el)}
              className="flex items-center gap-1"
            >
              <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-full text-[10px] font-medium flex-shrink-0 ${
                step === 2 ? "bg-[#212121] text-white" : step > 2 ? "bg-[#212121] text-white" : "bg-white border border-[#D1D1D1] text-[#212121]"
              }`}>
                {step > 2 ? "✓" : "2"}
              </div>
              <span className={`text-[8px] font-medium whitespace-nowrap ${step === 2 ? "text-foreground" : "text-muted-foreground"}`}>
                Set PIN
              </span>
            </div>

            {/* Connector 2-3 */}
            <div className={`w-3 h-[1px] mx-1 flex-shrink-0 ${step > 2 ? "bg-[#212121]" : "bg-[#D1D1D1]"}`} />

            {/* Step 3 */}
            <div 
              ref={(el) => (stepRefs.current[2] = el)}
              className="flex items-center gap-1"
            >
              <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-full text-[10px] font-medium flex-shrink-0 ${
                step === 3 ? "bg-[#212121] text-white" : step > 3 ? "bg-[#212121] text-white" : "bg-white border border-[#D1D1D1] text-[#212121]"
              }`}>
                {step > 3 ? "✓" : "3"}
              </div>
              <span className={`text-[8px] font-medium whitespace-nowrap ${step === 3 ? "text-foreground" : "text-muted-foreground"}`}>
                Confirmation
              </span>
            </div>

            {/* Connector 3-4 */}
            <div className={`w-3 h-[1px] mx-1 flex-shrink-0 ${step > 3 ? "bg-[#212121]" : "bg-[#D1D1D1]"}`} />

            {/* Step 4 */}
            <div 
              ref={(el) => (stepRefs.current[3] = el)}
              className="flex items-center gap-1"
            >
              <div className={`flex items-center justify-center w-[20px] h-[20px] rounded-full text-[10px] font-medium flex-shrink-0 ${
                step === 4 ? "bg-[#212121] text-white" : "bg-white border border-[#D1D1D1] text-[#212121]"
              }`}>
                4
              </div>
              <span className={`text-[8px] font-medium whitespace-nowrap ${step === 4 ? "text-foreground" : "text-muted-foreground"}`}>
                OTP
              </span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 py-2">
        {step === 1 && (
          <div className="space-y-1.5">
            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">First Name</Label>
              <Input
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-[28px] text-[10px] rounded-full border-[#D1D1D1]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Last Name</Label>
              <Input
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="h-[28px] text-[10px] rounded-full border-[#D1D1D1]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Email Address</Label>
              <Input
                type="email"
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                className={`h-[28px] text-[10px] rounded-full ${emailError ? "border-red-500" : "border-[#D1D1D1]"}`}
              />
              {emailError && <p className="text-[8px] text-red-500 px-2">{emailError}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Mobile Number</Label>
              <div className="flex gap-1">
                <Select value={`${countryFlag}-${countryCode}`} onValueChange={handleCountryCodeChange}>
                  <SelectTrigger className="w-[60px] h-[28px] rounded-full border-[#D1D1D1] bg-white px-2">
                    <div className="flex items-center justify-center gap-0.5">
                      <span className="text-[12px]">{countryFlag}</span>
                      <ChevronLeft size={8} className="-rotate-90 text-muted-foreground" />
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-white z-50">
                    {countryOptions.map((option) => (
                      <SelectItem key={`${option.flag}-${option.code}`} value={`${option.flag}-${option.code}`}>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px]">{option.flag}</span>
                          <span className="text-[10px]">{option.code}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="(xxx) xxx xxxx"
                  value={mobileNumber}
                  onChange={handlePhoneChange}
                  onBlur={(e) => validatePhone(e.target.value)}
                  maxLength={14}
                  className={`flex-1 h-[28px] text-[10px] rounded-full ${phoneError ? "border-red-500" : "border-[#D1D1D1]"}`}
                />
              </div>
              {phoneError && <p className="text-[8px] text-red-500 px-2">{phoneError}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Password</Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  className={`h-[28px] text-[10px] rounded-full pr-8 ${passwordError ? "border-red-500" : "border-[#D1D1D1]"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
              {passwordError && <p className="text-[8px] text-red-500 px-2">{passwordError}</p>}
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="h-[28px] text-[10px] rounded-full border-[#D1D1D1]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Company Name</Label>
              <Input
                placeholder="Enter Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="h-[28px] text-[10px] rounded-full border-[#D1D1D1]"
              />
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Business Vertical</Label>
              <button
                onClick={() => setShowBusinessVerticalSelect(true)}
                className="w-full min-h-[28px] px-3 py-1 text-[10px] rounded-full border border-[#D1D1D1] bg-white text-left flex items-center justify-between"
              >
                <span className={businessVerticals.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                  {businessVerticals.length > 0 ? businessVerticals.join(", ") : "Select Business Vertical"}
                </span>
                <ChevronLeft size={14} className="-rotate-90 text-foreground flex-shrink-0" />
              </button>
            </div>

            <div className="space-y-1">
              <Label className="text-[8px] font-medium text-foreground">Sub Vertical</Label>
              <button
                onClick={() => setShowSubVerticalSelect(true)}
                className="w-full min-h-[28px] px-3 py-1 text-[10px] rounded-full border border-[#D1D1D1] bg-white text-left flex items-center justify-between"
              >
                <span className={subVerticals.length > 0 ? "text-foreground" : "text-muted-foreground"}>
                  {subVerticals.length > 0 ? subVerticals.join(", ") : "Select Sub Vertical"}
                </span>
                <ChevronLeft size={14} className="-rotate-90 text-foreground flex-shrink-0" />
              </button>
            </div>

            <div className="flex items-start gap-2 py-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-[14px] h-[14px] rounded border-[#D1D1D1]"
              />
              <label htmlFor="terms" className="text-[8px] text-foreground leading-tight">
                <span className="font-medium">retailOS's Seller Agreement</span> and{" "}
                <span className="font-medium">e-Sign Consent</span>
              </label>
            </div>

            <Button
              onClick={handleCreateAccount}
              disabled={!agreedToTerms || !firstName || !lastName || !email || !mobileNumber || !password || !companyName || businessVerticals.length === 0 || subVerticals.length === 0}
              className="w-full h-[32px] text-[10px] font-bold rounded-full disabled:bg-[#E5E5E5] disabled:text-[#9E9E9E] bg-[#212121] text-white hover:bg-[#212121]/90"
            >
              CREATE ACCOUNT
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col items-center pt-4">
            <div className="flex gap-3 mb-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="w-[32px] h-[32px] rounded-lg bg-white border border-[#D1D1D1] flex items-center justify-center">
                  {pin.length > i ? (
                    <span className="text-[20px]">✱</span>
                  ) : (
                    <span className="text-[20px] text-muted-foreground">✱</span>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 w-full max-w-[170px]">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "C", "0", "⌫"].map((key) => (
                <button
                  key={key}
                  onClick={() => handlePinInput(key)}
                  className={`h-[40px] rounded-lg text-[16px] font-semibold ${
                    key === "C"
                      ? "bg-white border border-[#D1D1D1] text-[#FF0000]"
                      : key === "⌫"
                      ? "bg-[#9E9E9E] text-white"
                      : "bg-[#E5E5E5] text-[#616161]"
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col items-center pt-6">
            <h2 className="text-[14px] font-bold text-foreground mb-2">Confirmation</h2>
            <p className="text-[10px] text-muted-foreground text-center mb-6">
              Where do you want to send<br />your confirmation code?
            </p>

            <div className="w-full space-y-3 mb-6">
              <button
                onClick={() => setConfirmationMethod("email")}
                className="w-full h-[32px] px-3 rounded-full border border-[#D1D1D1] bg-white flex items-center justify-between"
              >
                <span className="text-[10px] text-foreground">{email}</span>
                <div className={`w-[16px] h-[16px] rounded-full border-2 ${
                  confirmationMethod === "email" ? "border-[#212121] bg-[#212121]" : "border-[#D1D1D1]"
                } flex items-center justify-center`}>
                  {confirmationMethod === "email" && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                </div>
              </button>

              <div className="text-center text-[10px] font-bold text-foreground">or</div>

              <button
                onClick={() => setConfirmationMethod("phone")}
                className="w-full h-[32px] px-3 rounded-full border border-[#D1D1D1] bg-white flex items-center justify-between"
              >
                <span className="text-[10px] text-foreground">+1 {mobileNumber}</span>
                <div className={`w-[16px] h-[16px] rounded-full border-2 ${
                  confirmationMethod === "phone" ? "border-[#212121] bg-[#212121]" : "border-[#D1D1D1]"
                } flex items-center justify-center`}>
                  {confirmationMethod === "phone" && <div className="w-[6px] h-[6px] rounded-full bg-white" />}
                </div>
              </button>
            </div>

            <Button
              onClick={handleSendConfirmation}
              className="w-full h-[32px] text-[10px] font-bold rounded-full bg-[#212121] text-white hover:bg-[#212121]/90"
            >
              SEND
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col items-center pt-6">
            <h2 className="text-[14px] font-bold text-foreground mb-2">OTP</h2>
            <p className="text-[10px] text-muted-foreground text-center mb-1">
              We sent a confirmation code to
            </p>
            <p className="text-[10px] font-bold text-foreground mb-4">
              {confirmationMethod === "email" ? email : `+1 ${mobileNumber}`}
            </p>

            <p className="text-[10px] text-foreground mb-3">Enter confirmation code below</p>

            <div className="flex gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  name={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-[36px] h-[36px] text-center text-[16px] font-semibold rounded-full border border-[#D1D1D1] bg-white focus:outline-none focus:border-[#212121]"
                />
              ))}
            </div>

            <p className="text-[14px] font-bold text-foreground mb-4">{formatTime(otpTimer)}</p>

            <Button
              onClick={() => setOtpTimer(300)}
              className="w-full h-[32px] text-[10px] font-bold rounded-full bg-[#E5E5E5] text-[#9E9E9E] hover:bg-[#D1D1D1]"
            >
              RESEND OTP
            </Button>
          </div>
        )}
        </div>

        {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent hideClose className="w-[186px] rounded-2xl p-4 bg-white border-none shadow-lg">
          <div className="flex flex-col items-center text-center space-y-2">
            <h3 className="text-[10px] font-bold text-[#212121] leading-tight">
              Registration Successful!
            </h3>
            <p className="text-[8px] text-[#616161] leading-tight">
              Welcome to retailOS Point Of Purchase
            </p>
            <Button
              onClick={onSuccess}
              className="w-full h-[28px] text-[10px] font-bold rounded-full bg-[#212121] text-white hover:bg-[#212121]/90 mt-2"
            >
              CONTINUE
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      </div>
    </div>
  );
};
