import { Link } from "react-router-dom";
import { ArrowRight, Code2, Cpu, Database, Globe } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";

const floatingIcons = [
  { Icon: Code2, className: "top-20 left-[10%] text-primary", delay: "" },
  { Icon: Cpu, className: "top-40 right-[15%] text-secondary", delay: "float-delay-1" },
  { Icon: Database, className: "bottom-32 left-[20%] text-success", delay: "float-delay-2" },
  { Icon: Globe, className: "bottom-40 right-[10%] text-primary", delay: "" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="mesh-background" />
      
      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, className, delay }, index) => (
          <div
            key={index}
            className={`absolute w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center float ${delay} ${className}`}
          >
            <Icon className="w-6 h-6" />
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: '1s' }} />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center stagger-children">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm text-muted-foreground">Trusted by 10,000+ developers</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Get Your Tech Problems{" "}
            <span className="gradient-text">Solved — Fast</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Post a problem. Get matched with verified experts. 
            Pay only when it's solved.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/create-ticket">
              <GlowButton size="lg" className="group">
                Post a Ticket
                <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </GlowButton>
            </Link>
            <Link to="/become-trainer">
              <GlowButton variant="outline" size="lg">
                Become a Trainer
              </GlowButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {[
              { value: "10K+", label: "Problems Solved" },
              { value: "500+", label: "Expert Trainers" },
              { value: "4.9", label: "Average Rating" },
              { value: "< 2hr", label: "Avg. Response Time" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-3xl md:text-4xl font-bold gradient-text mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
