import { forwardRef, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "secondary" | "success";
  size?: "sm" | "md" | "lg";
}

const GlowButton = forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "relative font-semibold overflow-hidden transition-all duration-300 ease-out rounded-lg disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "glow-button text-white",
      outline: "glow-button-outline text-white",
      secondary: "bg-secondary/20 text-secondary border border-secondary/30 hover:bg-secondary/30 hover:shadow-glow-secondary",
      success: "bg-success text-success-foreground hover:shadow-glow-success",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowButton.displayName = "GlowButton";

export { GlowButton };
