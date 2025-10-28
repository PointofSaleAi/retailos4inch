interface RetailLogoProps {
  className?: string;
}

export const RetailLogo = ({ className = "" }: RetailLogoProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="text-brand font-black tracking-tight">
        retail
        <span className="inline-block w-2 h-2 bg-foreground rounded-full ml-1 mb-1 relative">
          <div className="absolute inset-0 bg-foreground rounded-full"></div>
          <div className="absolute -top-0.5 -left-0.5 w-1 h-1 bg-foreground rounded-full"></div>
          <div className="absolute -top-0.5 -right-0.5 w-1 h-1 bg-foreground rounded-full"></div>
          <div className="absolute -bottom-0.5 -left-0.5 w-1 h-1 bg-foreground rounded-full"></div>
          <div className="absolute -bottom-0.5 -right-0.5 w-1 h-1 bg-foreground rounded-full"></div>
        </span>
        os
      </div>
    </div>
  );
};