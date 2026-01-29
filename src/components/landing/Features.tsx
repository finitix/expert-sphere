import { 
  ShieldCheck, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Star,
  Zap 
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Trainers",
    description: "Every trainer goes through a rigorous verification process. Skills tested, identity verified.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Funds held safely in escrow until you confirm the solution works perfectly.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Real-time collaboration with screen sharing, code snippets, and file transfers.",
    gradient: "from-success to-primary",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Get instant notifications when trainers respond or your ticket status changes.",
    gradient: "from-primary to-success",
  },
  {
    icon: Star,
    title: "Trusted Ratings",
    description: "Transparent review system helps you choose the best trainer for your needs.",
    gradient: "from-secondary to-success",
  },
  {
    icon: Zap,
    title: "Fast Resolution",
    description: "Average response time under 2 hours. Most problems solved within a day.",
    gradient: "from-success to-secondary",
  },
];

export function Features() {
  return (
    <section className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="chip mb-4">Why Choose Us</span>
          <h2 className="section-title">
            Built for <span className="gradient-text">Trust</span>
          </h2>
          <p className="section-subtitle">
            Every feature designed to make problem-solving safe, fast, and reliable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <GlassCard key={feature.title} className="group" glow>
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}>
                <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <h3 className="font-display font-semibold text-xl text-white mb-3 group-hover:gradient-text transition-all">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
