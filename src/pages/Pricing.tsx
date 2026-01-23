import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for individual developers",
    price: "Free",
    period: "",
    features: [
      "Post up to 3 tickets/month",
      "Access to community trainers",
      "Basic chat support",
      "7-day payment protection",
    ],
    cta: "Get Started",
    popular: false,
    gradient: "from-primary/20 to-primary/5",
  },
  {
    name: "Pro",
    description: "For teams and power users",
    price: "$29",
    period: "/month",
    features: [
      "Unlimited tickets",
      "Priority trainer matching",
      "Video call support",
      "30-day payment protection",
      "Team collaboration",
      "Analytics dashboard",
    ],
    cta: "Start Pro Trial",
    popular: true,
    gradient: "from-secondary/30 to-primary/20",
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "Custom",
    period: "",
    features: [
      "Everything in Pro",
      "Dedicated account manager",
      "Custom SLA",
      "On-premise option",
      "SSO & advanced security",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    popular: false,
    gradient: "from-success/20 to-success/5",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="chip mb-4">Pricing</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. No hidden fees, no surprises.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div key={plan.name} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="px-4 py-1 rounded-full bg-gradient-primary text-white text-sm font-semibold shadow-glow-primary">
                      Most Popular
                    </span>
                  </div>
                )}
                <GlassCard 
                  className={`h-full flex flex-col ${plan.popular ? 'border-primary/50 shadow-glow-primary' : ''}`}
                  glow={plan.popular}
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${plan.gradient} opacity-50`} />
                  
                  <div className="relative z-10">
                    <h3 className="font-display font-semibold text-xl text-white mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      {plan.description}
                    </p>

                    <div className="mb-6">
                      <span className="text-4xl font-display font-bold text-white">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <GlowButton
                      variant={plan.popular ? "primary" : "outline"}
                      className="w-full"
                    >
                      {plan.cta}
                    </GlowButton>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
