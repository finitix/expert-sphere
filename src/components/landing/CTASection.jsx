import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { GlowButton } from "@/components/ui/GlowButton";
export function CTASection() {
    return (<section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-success/10"/>
          <div className="absolute inset-0 backdrop-blur-3xl"/>
          
          {/* Glow effects */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-[100px]"/>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/30 rounded-full blur-[100px]"/>

          {/* Content */}
          <div className="relative z-10 py-20 px-8 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 max-w-3xl mx-auto">
              Ready to Solve Your{" "}
              <span className="gradient-text">Tech Problem?</span>
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Join thousands of developers who trust our platform. 
              Post your first ticket free and get matched with an expert.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/create-ticket">
                <GlowButton size="lg" className="group">
                  Post Your First Ticket
                  <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"/>
                </GlowButton>
              </Link>
              <Link to="/how-it-works">
                <GlowButton variant="outline" size="lg">
                  Learn More
                </GlowButton>
              </Link>
            </div>
          </div>

          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none"/>
        </div>
      </div>
    </section>);
}
