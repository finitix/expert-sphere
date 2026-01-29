import { FileText, Users, MessageCircle, CreditCard } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const steps = [
  {
    icon: FileText,
    step: "01",
    title: "Create a Ticket",
    description: "Describe your tech problem with as much detail as possible. Add files, screenshots, or code snippets.",
    color: "primary",
  },
  {
    icon: Users,
    step: "02",
    title: "Trainers Request",
    description: "Verified experts review your ticket and send proposals. Choose the best match for your needs.",
    color: "secondary",
  },
  {
    icon: MessageCircle,
    step: "03",
    title: "Collaborate & Solve",
    description: "Work together in real-time chat. Share screens, code, and ideas until the problem is solved.",
    color: "success",
  },
  {
    icon: CreditCard,
    step: "04",
    title: "Pay & Rate",
    description: "Payment is released only when you're satisfied. Leave a review to help the community.",
    color: "primary",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">Simple Process</span>
          <h2 className="section-title">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="section-subtitle">
            Four simple steps to get your tech problems solved
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-secondary/50" />
              )}
              
              <GlassCard className="relative z-10 text-center h-full" glow>
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background border border-primary/30 text-primary text-sm font-mono font-bold">
                  {step.step}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                  step.color === 'primary' ? 'bg-primary/20 text-primary shadow-glow-primary' :
                  step.color === 'secondary' ? 'bg-secondary/20 text-secondary shadow-glow-secondary' :
                  'bg-success/20 text-success shadow-glow-success'
                }`}>
                  <step.icon className="w-8 h-8" />
                </div>

                <h3 className="font-display font-semibold text-xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
