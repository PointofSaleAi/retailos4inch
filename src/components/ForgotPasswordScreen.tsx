import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetailLogo } from "./RetailLogo";
import { Eye, EyeOff, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ForgotPasswordScreenProps {
  onBack: () => void;
}

export const ForgotPasswordScreen = ({ onBack }: ForgotPasswordScreenProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // Timer countdown for OTP
  useEffect(() => {
    if (step === 2 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [step, timer]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (email || phone) {
      setStep(2);
      setTimer(300); // Reset timer
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }

      // If all 4 digits are entered, move to step 3
      if (newOtp.every((digit) => digit !== "") && index === 3) {
        setTimeout(() => setStep(3), 500);
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimer(300);
    setOtp(["", "", "", ""]);
  };

  const handleCreatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      // Handle password creation logic
      setShowSuccessDialog(true);
    }
  };

  const handleLoginClick = () => {
    setShowSuccessDialog(false);
    onBack(); // Return to login
  };

  return (
    <div className="h-full flex flex-col justify-center items-center p-6 bg-background animate-fade-in">
      <div className="flex flex-col items-center mb-4">
        <RetailLogo />
      </div>

      {/* Step 1: Enter Email or Phone */}
      {step === 1 && (
        <form onSubmit={handleSendOTP} className="space-y-3 w-[186px]">
          <div className="space-y-1 mb-3">
            <h2 className="text-[14px] font-semibold text-foreground">
              Forgot Password
            </h2>
            <p className="text-[8px] text-muted-foreground">
              Please select an option to change password
            </p>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-foreground text-[8px] font-normal">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter You Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-[28px] w-full pr-3 text-xs"
              />
            </div>

            <div className="text-center text-[10px] text-muted-foreground my-1">
              or
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone" className="text-foreground text-[8px] font-normal">
                Mobile Number
              </Label>
              <div className="flex gap-2">
                <Select value={countryCode} onValueChange={setCountryCode}>
                  <SelectTrigger className="h-[28px] w-[70px] px-2 rounded-xl border border-input-border bg-surface text-xs">
                    <SelectValue>
                      <div className="flex items-center gap-1">
                        <span className="text-[14px]">{countryCode === "+1" ? "🇺🇸" : countryCode === "+44" ? "🇬🇧" : countryCode === "+91" ? "🇮🇳" : "🇺🇸"}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-surface border-input-border">
                    <SelectItem value="+1" className="text-xs">
                      <span className="flex items-center gap-2">
                        <span className="text-[14px]">🇺🇸</span> +1
                      </span>
                    </SelectItem>
                    <SelectItem value="+44" className="text-xs">
                      <span className="flex items-center gap-2">
                        <span className="text-[14px]">🇬🇧</span> +44
                      </span>
                    </SelectItem>
                    <SelectItem value="+91" className="text-xs">
                      <span className="flex items-center gap-2">
                        <span className="text-[14px]">🇮🇳</span> +91
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(xxx) xxx xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-[28px] flex-1 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              disabled={!email && !phone}
              className="h-[28px] w-full rounded-xl text-[10px] font-semibold tracking-wider bg-muted text-muted-foreground hover:bg-muted disabled:opacity-100"
            >
              SEND OTP
            </Button>

            <div className="text-center text-[10px] pt-2">
              <span className="text-muted-foreground">Got your password? </span>
              <button
                type="button"
                onClick={onBack}
                className="text-foreground font-semibold hover:underline"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {step === 2 && (
        <div className="space-y-3 w-[186px]">
          <div className="space-y-1 mb-3">
            <h2 className="text-[14px] font-semibold text-foreground">
              Forgot Password
            </h2>
            <p className="text-[8px] text-muted-foreground leading-relaxed">
              Please enter 4 digit verification code the we send to {email || phone}
            </p>
          </div>

          <div className="flex gap-2 justify-center my-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                className="w-[38px] h-[38px] text-center text-[16px] font-medium rounded-xl border border-input-border bg-surface focus:outline-none focus:ring-2 focus:ring-input-focus focus:border-input-focus"
              />
            ))}
          </div>

          <div className="text-center text-[14px] font-medium text-foreground my-4">
            {formatTime(timer)}
          </div>

          <Button
            type="button"
            onClick={handleResendOTP}
            className="h-[28px] w-full rounded-xl text-[10px] font-semibold tracking-wider bg-foreground text-background hover:bg-primary-hover"
          >
            RESEND OTP
          </Button>
        </div>
      )}

      {/* Step 3: Create New Password */}
      {step === 3 && (
        <form onSubmit={handleCreatePassword} className="space-y-3 w-[186px]">
          <div className="space-y-1 mb-3">
            <h2 className="text-[14px] font-semibold text-foreground">
              Create New Password
            </h2>
            <p className="text-[8px] text-muted-foreground leading-relaxed">
              Your new password must be different from previous used passwords
            </p>
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="newPassword" className="text-foreground text-[8px] font-normal">
                New Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="h-[28px] w-full pr-10 text-xs py-0"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showNewPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword" className="text-foreground text-[8px] font-normal">
                Confirm New Password
              </Label>
              <div className="relative w-full">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-Enter New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="h-[28px] w-full pr-10 text-xs py-0"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button
              type="submit"
              disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="h-[28px] w-full rounded-xl text-[10px] font-semibold tracking-wider disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 bg-[#212121] text-white hover:bg-[#212121]/90"
            >
              CREATE PASSWORD
            </Button>

            <div className="text-center text-[10px] pt-2">
              <span className="text-muted-foreground">Got your password? </span>
              <button
                type="button"
                onClick={onBack}
                className="text-foreground font-semibold hover:underline"
              >
                Sign in
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent hideClose className="w-[186px] rounded-2xl p-4 bg-white border-none shadow-lg [&~*[data-radix-dialog-overlay]]:!absolute [&~*[data-radix-dialog-overlay]]:!inset-0">
          <div className="flex flex-col items-center text-center space-y-2">
            <DialogTitle className="text-[10px] font-bold text-[#212121] leading-tight">
              Password Created Successfully
            </DialogTitle>
            <DialogDescription className="text-[8px] text-[#6B7280] leading-relaxed px-1">
              Your password has been created please log in to your account
            </DialogDescription>
            <Button
              onClick={handleLoginClick}
              className="h-[28px] w-full rounded-xl text-[10px] font-semibold tracking-wider bg-[#212121] text-white hover:bg-[#212121]/90 mt-2"
            >
              LOG IN
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
