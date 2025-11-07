import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetailLogo } from "./RetailLogo";
import { ForgotPasswordScreen } from "./ForgotPasswordScreen";
import { RegistrationScreen } from "./RegistrationScreen";
import { Eye, EyeOff } from "lucide-react";
interface LoginScreenProps {
  onLogin: () => void;
}
export const LoginScreen = ({
  onLogin
}: LoginScreenProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  if (showForgotPassword) {
    return <ForgotPasswordScreen onBack={() => setShowForgotPassword(false)} />;
  }

  if (showRegistration) {
    return <RegistrationScreen onBack={() => setShowRegistration(false)} onSuccess={onLogin} />;
  }

  return <div className="h-full flex flex-col justify-center items-center p-6 bg-background animate-fade-in">
      <div className="flex flex-col items-center mb-4">
        <RetailLogo />
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-2 w-[186px]">
        <div className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-foreground text-[8px] font-normal">
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="Enter You Email" value={email} onChange={e => setEmail(e.target.value)} className="h-[28px] w-full pr-3 text-xs" required />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password" className="text-foreground text-[8px] font-normal">
              Password
            </Label>
            <div className="relative w-full">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="h-[28px] w-full pr-10 text-xs py-0" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-[20px] my-[10px]">
          <Button type="submit" variant="retail" size="retail-full" className="h-[28px] my-[16px]">
            SIGN IN
          </Button>
          
          <div className="text-center">
            <button 
              type="button" 
              onClick={() => setShowForgotPassword(true)}
              className="text-[10px] text-foreground font-medium hover:underline"
            >
              Forgot Password?
            </button>
          </div>
          
          <div className="text-center text-[10px]">
            <span className="text-muted-foreground">Haven't registered yet? </span>
            <button 
              type="button" 
              onClick={() => setShowRegistration(true)}
              className="text-foreground font-semibold hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>;
};