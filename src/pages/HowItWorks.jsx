import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Clock, Star, Users, CheckCircle2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs } from "@/components/effects/BackgroundEffects";
const easeOutExpo = [0.16, 1, 0.3, 1];
const steps = [
    {
        number: "01",
        title: "Post Your Problem",
        description: "Describe your tech challenge in detail. Add code snippets, screenshots, and set your budget. Our AI helps categorize and estimate complexity.",
        features: ["Smart categorization", "Budget suggestions", "Priority levels"],
        color: "primary",
    },
    {
        number: "02",
        title: "Get Matched with Experts",
        description: "Verified trainers review your ticket and send proposals. Browse their profiles, ratings, and past work to choose the perfect match.",
        features: ["Verified experts only", "See past reviews", "Compare proposals"],
        color: "accent",
    },
    {
        number: "03",
        title: "Collaborate & Solve",
        description: "Work together in real-time chat with screen sharing and code collaboration. Your payment is held safely until you're completely satisfied.",
        features: ["Real-time chat", "Screen sharing", "Secure escrow"],
        color: "secondary",
    },
];
const trustFeatures = [
    {
        icon: Shield,
        title: "Verified Trainers",
        description: "Every trainer passes identity verification and skill assessment",
    },
    {
        icon: Clock,
        title: "Fast Response",
        description: "Average response time under 2 hours",
    },
    {
        icon: Star,
        title: "Quality Guaranteed",
        description: "4.9 average rating across all solved problems",
    },
    {
        icon: Users,
        title: "10K+ Solved",
        description: "Thousands of developers helped successfully",
    },
];
const HowItWorks = () => {
    return (<div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams className="opacity-40"/>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOutExpo }} className="text-center max-w-4xl mx-auto">
            <span className="gh-badge-purple mb-6 inline-block">How It Works</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              From problem to
              <br />
              <span className="gradient-text-purple">solution</span> in minutes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get expert help with any tech challenge. 
              No long hiring processes, no freelancer risks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-32">
            {steps.map((step, i) => (<motion.div key={step.number} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: easeOutExpo }} className={`flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}>
                {/* Content */}
                <div className="flex-1">
                  <div className={`inline-block px-4 py-1.5 rounded-full bg-${step.color}/10 border border-${step.color}/30 text-${step.color} font-mono text-sm mb-4`}>
                    Step {step.number}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
                    {step.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.features.map((feature) => (<li key={feature} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle2 className={`w-5 h-5 text-${step.color} flex-shrink-0`}/>
                        {feature}
                      </li>))}
                  </ul>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className={`relative aspect-square max-w-md mx-auto rounded-2xl bg-gradient-to-br from-${step.color}/10 to-${step.color}/5 border border-${step.color}/20 p-8 flex items-center justify-center`}>
                    <div className={`text-[120px] font-mono font-bold text-${step.color}/20`}>
                      {step.number}
                    </div>
                    <motion.div className={`absolute inset-0 rounded-2xl border-2 border-${step.color}/30`} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}/>
                  </div>
                </div>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Trust Features */}
      <section className="py-24 bg-background-secondary border-t border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: easeOutExpo }} className="text-center mb-16">
            <span className="gh-badge-primary mb-4 inline-block">Trust & Safety</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Built on trust
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Your security and satisfaction are our top priorities
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {trustFeatures.map((feature, i) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }} className="gh-card text-center">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary"/>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, ease: easeOutExpo }} className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of developers solving problems every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="gh-btn-primary px-8 py-3 text-base group">
                Get started free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1"/>
              </Link>
              <Link to="/trainers" className="gh-btn-secondary px-8 py-3 text-base">
                Browse trainers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default HowItWorks;
