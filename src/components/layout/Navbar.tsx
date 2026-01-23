import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Zap } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Explore Tickets", href: "/explore-tickets" },
  { label: "Trainers", href: "/trainers" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary transition-shadow group-hover:shadow-[0_0_60px_hsl(var(--primary)/0.5)]">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Tech<span className="gradient-text">Solve</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-2",
                  location.pathname === link.href
                    ? "text-white"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <GlowButton variant="outline" size="sm">
                Login
              </GlowButton>
            </Link>
            <Link to="/signup">
              <GlowButton variant="primary" size="sm">
                Get Started
              </GlowButton>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-6 border-t border-white/5 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-base font-medium py-2 transition-colors",
                    location.pathname === link.href
                      ? "text-white"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <GlowButton variant="outline" size="md" className="w-full">
                    Login
                  </GlowButton>
                </Link>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  <GlowButton variant="primary" size="md" className="w-full">
                    Get Started
                  </GlowButton>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
