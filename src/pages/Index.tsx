import { Link } from "react-router-dom";
import { ArrowRight, Zap, Shield, Clock, Star, Check, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition, FadeInView, StaggerContainer, StaggerItem } from "@/components/layout/PageTransition";
import { SolvedFeed } from "@/components/feed/SolvedFeed";

const stats = [
  { value: "10K+", label: "Problems Solved" },
  { value: "500+", label: "Expert Trainers" },
  { value: "4.9★", label: "Average Rating" },
  { value: "<2hr", label: "Response Time" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "Every trainer is vetted and verified before joining the platform.",
  },
  {
    icon: Clock,
    title: "Fast Resolution",
    description: "Get matched with the right expert in minutes, not days.",
  },
  {
    icon: Star,
    title: "Pay for Results",
    description: "Your payment is held securely until your problem is solved.",
  },
];

const steps = [
  {
    step: "01",
    title: "Post Your Problem",
    description: "Describe your tech issue with as much detail as possible.",
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Verified trainers review and request to solve your problem.",
  },
  {
    step: "03",
    title: "Collaborate & Pay",
    description: "Work together via chat, solve the issue, and release payment.",
  },
];

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        
        {/* Animated Background */}
        <div className="animated-bg" />
        
        <main>
          {/* Hero Section */}
          <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid-pattern pointer-events-none" />
            
            {/* Gradient Orbs */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-[100px] opacity-50" />

            <div className="container mx-auto px-4 relative z-10">
              <StaggerContainer className="max-w-4xl mx-auto text-center">
                <StaggerItem>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border mb-6">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm text-muted-foreground">Trusted by 10,000+ developers</span>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight tracking-tight">
                    Get Your Tech Problems
                    <br />
                    <span className="gradient-text">Solved — Fast</span>
                  </h1>
                </StaggerItem>

                <StaggerItem>
                  <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                    Post a problem. Get matched with verified experts. 
                    Pay only when it's solved.
                  </p>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
                    <Link to="/signup" className="btn-primary px-6 py-3 text-base flex items-center gap-2 group">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link to="/how-it-works" className="btn-outline px-6 py-3 text-base">
                      See How It Works
                    </Link>
                  </div>
                </StaggerItem>

                <StaggerItem>
                  <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                    {stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="font-mono text-2xl md:text-3xl font-bold text-foreground mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </section>

          {/* Live Solved Feed - X/Twitter Style */}
          <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4">
              <FadeInView>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                      Recently Solved
                    </h2>
                    <p className="text-muted-foreground">
                      See what problems are being solved right now
                    </p>
                  </div>
                  <Link 
                    to="/feed" 
                    className="hidden md:flex items-center gap-1 text-sm text-primary hover:underline"
                  >
                    View all
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </FadeInView>
              
              <SolvedFeed limit={5} />
              
              <div className="mt-6 text-center md:hidden">
                <Link to="/feed" className="btn-outline inline-flex items-center gap-1">
                  View all solved problems
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-16 bg-background-secondary border-t border-border">
            <div className="container mx-auto px-4">
              <FadeInView className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  Why developers choose TechSolve
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Built with trust and speed in mind
                </p>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {features.map((feature, index) => (
                  <FadeInView key={feature.title}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="gh-card p-6 text-center h-full"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </motion.div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 border-t border-border">
            <div className="container mx-auto px-4">
              <FadeInView className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                  Simple 3-step process
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  From problem to solution in minutes
                </p>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {steps.map((step, index) => (
                  <FadeInView key={step.step}>
                    <div className="relative">
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-8 left-full w-full h-px bg-border -translate-x-1/2 z-0" />
                      )}
                      <div className="relative z-10">
                        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 mx-auto md:mx-0">
                          <span className="font-mono text-xl font-bold text-primary">{step.step}</span>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 text-center md:text-left">{step.title}</h3>
                        <p className="text-sm text-muted-foreground text-center md:text-left">{step.description}</p>
                      </div>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-background-secondary border-t border-border">
            <div className="container mx-auto px-4 text-center">
              <FadeInView>
                <div className="max-w-2xl mx-auto">
                  <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-4">
                    Ready to solve your tech problems?
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Join thousands of developers getting help from verified experts.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/signup" className="btn-primary px-8 py-3 text-base flex items-center gap-2 group">
                      Get Started Free
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    <Link to="/trainers" className="btn-outline px-8 py-3 text-base">
                      Browse Trainers
                    </Link>
                  </div>
                </div>
              </FadeInView>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </PageTransition>
  );
};

export default Index;
