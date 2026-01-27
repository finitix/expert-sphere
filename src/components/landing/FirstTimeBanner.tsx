import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, ArrowRight } from "lucide-react";

export function FirstTimeBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding or dismissed banner
    const onboardingComplete = localStorage.getItem("onboarding_complete");
    const bannerDismissed = localStorage.getItem("banner_dismissed");
    
    if (!onboardingComplete && !bannerDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem("banner_dismissed", "true");
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-lg"
        >
          <div className="relative bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 backdrop-blur-xl rounded-2xl border border-primary/20 p-4 shadow-2xl shadow-primary/10">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-sm md:text-base">
                  First time here? Start your journey! 🚀
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mt-0.5">
                  Take a quick tour to discover how TechSolve works
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  to="/onboarding"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Start
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleDismiss}
                  className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
