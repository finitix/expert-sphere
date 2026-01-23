import { Shield, Lock, UserCheck, Scale } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const trustItems = [
  {
    icon: UserCheck,
    title: "Identity Verified",
    description: "Every trainer's identity is verified before they can accept tickets.",
  },
  {
    icon: Lock,
    title: "Payment Protection",
    description: "Your payment is held securely until the solution is delivered and approved.",
  },
  {
    icon: Scale,
    title: "Fair Resolution",
    description: "Dispute resolution process ensures fair outcomes for both parties.",
  },
];

export function TrustSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Large Shield Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5">
            <Shield className="w-full h-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left: Content */}
            <div>
              <span className="chip mb-4">Trust & Safety</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                Your Security is{" "}
                <span className="gradient-text">Our Priority</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've built multiple layers of protection to ensure every interaction 
                on our platform is safe, fair, and transparent. Your money is protected 
                until you're satisfied.
              </p>

              <div className="space-y-6">
                {trustItems.map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-success/20 flex-shrink-0 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-success" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 3D Shield */}
            <div className="relative flex items-center justify-center">
              <div className="relative w-72 h-80">
                {/* Glow */}
                <div className="absolute inset-0 bg-success/20 rounded-full blur-[80px]" />
                
                {/* Shield Icon */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <div className="w-48 h-56 rounded-3xl bg-gradient-to-br from-success/20 to-primary/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-glow-success pulse-glow">
                    <Shield className="w-24 h-24 text-success" />
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-8 right-0 w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center float">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <div className="absolute bottom-8 left-0 w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center float float-delay-1">
                  <UserCheck className="w-7 h-7 text-secondary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
