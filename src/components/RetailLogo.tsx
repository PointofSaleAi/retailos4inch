import logo from "@/assets/retailos-logo.png";

interface RetailLogoProps {
  className?: string;
}

export const RetailLogo = ({ className = "" }: RetailLogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img src={logo} alt="retailos Point of Purchase" className="h-8" />
    </div>
  );
};