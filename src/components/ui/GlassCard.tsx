import { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card",
          hover && "hover:translate-y-[-4px]",
          glow && "glow-border",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";

export { GlassCard };
