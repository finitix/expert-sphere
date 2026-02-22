import { forwardRef } from "react";
import { cn } from "@/lib/utils.js";
const GlassCard = forwardRef(({ className, hover = true, glow = false, children, ...props }, ref) => {
    return (<div ref={ref} className={cn("glass-card", hover && "hover:translate-y-[-4px]", glow && "glow-border", className)} {...props}>
        {children}
      </div>);
});
GlassCard.displayName = "GlassCard";
export { GlassCard };
