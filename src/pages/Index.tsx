import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock, Star, Users, CheckCircle2, Code2, ChevronRight, Play, Sparkles, Globe, Cpu, Database, Lock, Rocket, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern, AnimatedBorderCard } from "@/components/effects/BackgroundEffects";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { SimpleHeroScene, FeatureIcon3D } from "@/components/3d/SimpleHero3D";
import { useRef, Suspense } from "react";

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
    widget: "shield" as const,
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Get matched with the right expert in minutes. Most issues resolved same-day.",
    color: "accent",
    widget: "lightning" as const,
  },
  {
    icon: Star,
    title: "Pay for Results",
    description: "Your payment is held in escrow. Release only when you're satisfied.",
    color: "secondary",
    widget: "check" as const,
  },
];

const steps = [
  {
    step: "01",
    title: "Describe Your Problem",
    description: "Post your tech issue with details. Our AI helps categorize and estimate.",
    gradient: "from-primary to-primary/50",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
  },
  {
    step: "02",
    title: "Get Matched",
    description: "Verified trainers review and request to help. Choose the best fit.",
    gradient: "from-accent to-accent/50",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop",
  },
  {
    step: "03",
    title: "Solve & Pay",
    description: "Collaborate in real-time chat. Release payment when solved.",
    gradient: "from-secondary to-secondary/50",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
  },
];

const trustedBy = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
];

const testimonials = [
  {
    quote: "TechSolve connected me with an expert who fixed my React performance issue in under an hour. Worth every penny!",
    author: "Sarah M.",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    quote: "As a trainer, I've helped 200+ developers. The platform makes it easy to find and solve real problems.",
    author: "David K.",
    role: "Senior Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
  },
  {
    quote: "The escrow system gives peace of mind. I know I'll only pay when my problem is actually solved.",
    author: "Emily R.",
    role: "Startup Founder",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
  },
];

const categories = [
  { icon: Globe, name: "Frontend", count: "2,450", color: "primary" },
  { icon: Database, name: "Backend", count: "1,890", color: "secondary" },
  { icon: Cpu, name: "DevOps", count: "980", color: "accent" },
  { icon: Lock, name: "Security", count: "650", color: "warning" },
  { icon: Rocket, name: "Mobile", count: "1,200", color: "success" },
  { icon: Code2, name: "Other", count: "890", color: "muted" },
];

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section with 3D */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams />
          <GridPattern />
        </div>

        {/* Simplified 3D Scene */}
        <Suspense fallback={null}>
          <SimpleHeroScene />
        </Suspense>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
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
              <Link to="/create-ticket" className="gh-btn-primary px-8 py-3 text-base group">
                Post a Ticket
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/trainers" className="gh-btn-secondary px-8 py-3 text-base group">
                <Play className="w-4 h-4" />
                Browse trainers
              </Link>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: easeOutExpo }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="relative rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop"
                  alt="Team solving problems together"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y border-border bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-muted-foreground mb-8">TRUSTED BY DEVELOPERS AT</p>
            <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
              {trustedBy.map((company) => (
                <div key={company.name} className="h-8 grayscale hover:grayscale-0 transition-all">
                  <img src={company.logo} alt={company.name} className="h-full w-auto object-contain invert" />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-12"
          >
            <span className="gh-badge-blue mb-4 inline-block">Categories</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Get help in any <span className="gradient-text-blue">tech domain</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="gh-card text-center cursor-pointer group"
              >
                <div className={`w-12 h-12 rounded-xl bg-${cat.color}/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <cat.icon className={`w-6 h-6 text-${cat.color}`} />
                </div>
                <p className="font-semibold text-foreground">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.count} solved</p>
              </motion.div>
            ))}
          </div>
        </div>
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
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4"
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
            <Link to="/feed" className="flex items-center gap-1 text-sm text-primary hover:underline">
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
        </div>
      </section>

      {/* How It Works with Images */}
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

          <div className="relative max-w-5xl mx-auto">
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
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-mono mb-3`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                  
                  <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-card to-card-hover border border-border items-center justify-center z-10 flex-shrink-0">
                    <span className="font-mono font-bold text-foreground">{step.step}</span>
                  </div>
                  
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10"
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 md:h-56 object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features with 3D Widgets */}
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
                  <div className="h-24 mb-4 -mx-2 -mt-2">
                    <Suspense fallback={<div className="w-full h-full bg-muted/20 rounded-lg animate-pulse" />}>
                      <FeatureIcon3D type={feature.widget} />
                    </Suspense>
                  </div>
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

      {/* Testimonials */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: easeOutExpo }}
            className="text-center mb-16"
          >
            <span className="gh-badge-primary mb-4 inline-block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Loved by <span className="gradient-text-green">developers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="gh-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-warning fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with 3D */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams className="opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Ready to solve your
                <br />
                <span className="gradient-text">tech problems?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers getting expert help every day.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/create-ticket" className="gh-btn-primary px-10 py-4 text-lg group">
                  Post a Ticket Free
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/signup" className="gh-btn-secondary px-10 py-4 text-lg">
                  Create Account
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-[300px] hidden md:block"
            >
              <Suspense fallback={<div className="w-full h-full bg-muted/20 rounded-lg animate-pulse" />}>
                <CodeScene3D />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
