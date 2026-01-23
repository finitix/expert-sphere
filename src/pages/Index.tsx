import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock, Star, Users, CheckCircle2, Code2, ChevronRight, Play, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern, AnimatedBorderCard } from "@/components/effects/BackgroundEffects";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { useRef } from "react";

const easeOutExpo = [0.16, 1, 0.3, 1];

const stats = [
  { value: "10K+", label: "Problems Solved" },
  { value: "500+", label: "Expert Trainers" },
  { value: "4.9", label: "Average Rating" },
  { value: "<2hr", label: "Avg Response" },
];

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "Every trainer passes rigorous verification. Real expertise, proven results.",
    color: "primary",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Get matched with the right expert in minutes. Most issues resolved same-day.",
    color: "accent",
  },
  {
    icon: Star,
    title: "Pay for Results",
    description: "Your payment is held in escrow. Release only when you're satisfied.",
    color: "secondary",
  },
];

const steps = [
  {
    step: "01",
    title: "Describe Your Problem",
    description: "Post your tech issue with details. Our AI helps categorize and estimate.",
    gradient: "from-primary to-primary/50",
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Verified trainers review and request to help. Choose the best fit.",
    gradient: "from-accent to-accent/50",
  },
  {
    step: "03",
    title: "Solve & Pay",
    description: "Collaborate in real-time chat. Release payment when solved.",
    gradient: "from-secondary to-secondary/50",
  },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams />
          <GridPattern />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="container mx-auto px-4 relative z-10 pt-20"
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: easeOutExpo }}
              className="mb-8"
            >
              <span className="gh-badge-primary inline-flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted by 10,000+ developers worldwide
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
              className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-6 leading-[0.95] tracking-tight"
            >
              Build with the power of
              <br />
              <span className="gradient-text">verified experts</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              Post your tech problem. Get matched with verified trainers.
              <br className="hidden md:block" />
              Pay only when it's solved.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: easeOutExpo }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link to="/signup" className="gh-btn-primary px-8 py-3 text-base group">
                Start solving for free
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/trainers" className="gh-btn-secondary px-8 py-3 text-base group">
                <Play className="w-4 h-4" />
                Browse trainers
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
              className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                    className="font-mono text-3xl md:text-4xl font-bold text-foreground mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1"
            >
              <motion.div className="w-1.5 h-3 rounded-full bg-muted-foreground/50" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Recently Solved - X/Twitter Style */}
      <section className="py-24 relative border-t border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <span className="gh-badge-primary mb-4 inline-block">Live Feed</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Recently <span className="gradient-text-green">Solved</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Watch real problems getting solved in real-time
              </p>
            </div>
            <Link to="/feed" className="hidden md:flex items-center gap-1 text-sm text-primary hover:underline">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeOutExpo }}
          >
            <SolvedFeed limit={4} />
          </motion.div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/feed" className="gh-btn-secondary">
              View all solved problems
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-16"
          >
            <span className="gh-badge-purple mb-4 inline-block">How It Works</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              From problem to <span className="gradient-text-purple">solution</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to get expert help with any tech challenge
            </p>
          </motion.div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2" />

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: easeOutExpo }}
                  className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-mono mb-3`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-card to-card-hover border border-border items-center justify-center z-10">
                    <span className="font-mono font-bold text-foreground">{step.step}</span>
                  </div>
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative border-t border-border bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-16"
          >
            <span className="gh-badge-blue mb-4 inline-block">Why TechSolve</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Built for <span className="gradient-text-blue">developers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the challenges you face. That's why we built this.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: easeOutExpo }}
              >
                <AnimatedBorderCard>
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </AnimatedBorderCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams className="opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6 leading-tight">
              Ready to solve your
              <br />
              <span className="gradient-text">tech problems?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Join thousands of developers getting expert help every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="gh-btn-primary px-10 py-4 text-lg group">
                Get started for free
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/trainers" className="gh-btn-secondary px-10 py-4 text-lg">
                Browse trainers
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
