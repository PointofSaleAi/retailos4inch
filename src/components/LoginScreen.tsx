import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RetailLogo } from "./RetailLogo";
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };
  return <div className="h-full flex flex-col justify-center px-6 py-8 bg-background animate-fade-in">
      <div className="flex flex-col items-center mb-8">
        <RetailLogo className="mb-2" />
        
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email" className="text-foreground text-[8px] font-normal">
              Email Address
            </Label>
            <Input id="email" type="email" placeholder="Enter You Email" value={email} onChange={e => setEmail(e.target.value)} className="h-[28px] w-[186px] pr-3 text-xs" required />
          </div>
          
          <div className="space-y-1">
            <Label htmlFor="password" className="text-foreground text-[8px] font-normal">
              Password
            </Label>
            <div className="relative w-[186px]">
              <Input id="password" type={showPassword ? "text" : "password"} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="h-[28px] w-full pr-10 text-xs" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <Button type="submit" variant="retail" size="retail-full" className="mt-2">
            SIGN IN
          </Button>
          
          <div className="text-center">
            <button type="button" className="text-sm text-foreground font-medium hover:underline">
              Forgot Password?
            </button>
          </div>
          
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Haven't registered yet? </span>
            <button type="button" className="text-foreground font-semibold hover:underline">
              Register
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-auto pt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Version 5.0.1.501 FL 3.27.4<br />
          BD 30.7.25 Staging
        </p>
      </div>
    </div>;
};