import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-full",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-full",
        outline: "border border-input-border bg-surface hover:bg-accent hover:text-accent-foreground rounded-full",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-full",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-foreground underline-offset-4 hover:underline",
        // Retail-specific variants
        retail: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-full font-bold tracking-wide",
        "retail-secondary": "bg-secondary text-secondary-foreground hover:bg-secondary-hover rounded-full font-medium",
        category: "bg-primary text-primary-foreground hover:bg-primary-hover rounded-full text-[10px] font-medium px-3 py-1 h-[22px]",
        "category-inactive": "bg-[#F1F2F5] text-foreground hover:bg-[#E5E6EA] rounded-full text-[10px] font-medium px-3 py-1 h-[22px]",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-8 w-8 p-0",
        // Retail-specific sizes
        "retail-full": "h-11 w-full px-6 py-3",
        "retail-compact": "h-[22px] px-3 py-1 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
