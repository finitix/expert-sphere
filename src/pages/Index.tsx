import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock, Star, Users, CheckCircle2, Code2, ChevronRight, Play, Sparkles, Globe, Cpu, Database, Lock, Rocket, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern, AnimatedBorderCard } from "@/components/effects/BackgroundEffects";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { SEOHead, getOrganizationSchema, getWebsiteSchema, getServiceSchema } from "@/components/seo/SEOHead";
import { StatsSection } from "@/components/landing/StatsSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { CategoriesSection } from "@/components/landing/CategoriesSection";
import { useRef, useState, useEffect, useMemo, useCallback } from "react";

// Optimized easing for silky smooth animations
const smoothSpring = { type: "spring", stiffness: 100, damping: 20, mass: 0.5 };
const fastSpring = { type: "spring", stiffness: 200, damping: 25, mass: 0.3 };
const smoothTween = { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.6 };
const fastTween = { type: "tween", ease: [0.25, 0.46, 0.45, 0.94], duration: 0.4 };

// Hero carousel images - tech/problem solving themed
const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    alt: "Developer solving complex problems",
    badge: { title: "Problem Solved!", subtitle: "React SSR issue resolved in 45 mins" },
  },
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    alt: "Team collaborating on code",
    badge: { title: "Expert Connected!", subtitle: "Matched with AWS specialist" },
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    alt: "Developer getting expert help",
    badge: { title: "Bug Fixed!", subtitle: "Database optimization complete" },
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    alt: "Technical mentorship session",
    badge: { title: "Code Review Done!", subtitle: "Security vulnerabilities patched" },
  },
];

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "Every trainer passes rigorous verification. Real expertise, proven results.",
    color: "primary",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
  },
  {
    icon: Clock,
    title: "Lightning Fast",
    description: "Get matched with the right expert in minutes. Most issues resolved same-day.",
    color: "accent",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
  },
  {
    icon: Star,
    title: "Pay for Results",
    description: "Your payment is held in escrow. Release only when you're satisfied.",
    color: "secondary",
    image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=250&fit=crop",
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

// Optimized Hero Carousel Component with smooth transitions
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleIndicatorClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/20 gpu-accelerate">
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={heroImages[currentIndex].src}
          alt={heroImages[currentIndex].alt}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ 
            opacity: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
            scale: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
          }}
          className="w-full h-auto aspect-[4/3] object-cover will-change-transform"
          loading="eager"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent pointer-events-none" />
      
      {/* Floating Badge with smooth entrance */}
      <AnimatePresence mode="popLayout">
        <motion.div 
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={smoothTween}
          className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border will-change-transform"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <CheckCircle2 className="w-5 h-5 text-success" />
            </motion.div>
            <div>
              <p className="font-medium text-foreground text-sm">{heroImages[currentIndex].badge.title}</p>
              <p className="text-xs text-muted-foreground">{heroImages[currentIndex].badge.subtitle}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Smooth Carousel Indicators */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {heroImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => handleIndicatorClick(i)}
            className="h-2 rounded-full bg-white/50 hover:bg-white/80"
            animate={{ 
              width: i === currentIndex ? 24 : 8,
              backgroundColor: i === currentIndex ? "hsl(var(--primary))" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Use spring for smoother scroll-linked animations
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const heroOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);
  const heroY = useTransform(smoothProgress, [0, 0.4], [0, -60]);
  const heroScale = useTransform(smoothProgress, [0, 0.4], [1, 0.97]);

  // Memoized animation variants for consistency
  const fadeUpVariant = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: { ...smoothTween, delay }
    })
  }), []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <SEOHead
        title="SolvePro - Get Expert Help for Any Problem"
        description="Connect with verified experts to solve problems in any domain. Technology, business, design, and more. Pay only when your problem is solved. Trusted by 50,000+ users worldwide."
        keywords="expert help, problem solving, tech support, consulting, verified experts, on-demand help"
        canonicalUrl="/"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            getOrganizationSchema(),
            getWebsiteSchema(),
            getServiceSchema()
          ]
        }}
      />
      <Navbar />

      {/* Hero Section - Side by Side Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams />
          <GridPattern />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
          className="container mx-auto px-4 relative z-10 pt-24 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...smoothTween, delay: 0.1 }}
                className="mb-6"
              >
                <span className="gh-badge-primary inline-flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </motion.span>
                  Trusted by 10,000+ developers worldwide
                </span>
              </motion.div>

              {/* Headline with staggered word reveal */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTween, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 leading-[1.05] tracking-tight"
              >
                Build with the power of
                <br />
                <motion.span 
                  className="gradient-text inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...smoothTween, delay: 0.35 }}
                >
                  verified experts
                </motion.span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTween, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Post your tech problem. Get matched with verified trainers.
                Pay only when it's solved.
              </motion.p>

              {/* CTAs with micro-interactions */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...smoothTween, delay: 0.5 }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              >
                <Link to="/create-ticket">
                  <motion.span 
                    className="gh-btn-primary px-8 py-3 text-base group inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={fastSpring}
                  >
                    Post a Ticket
                    <motion.span
                      className="inline-block"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={fastSpring}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </motion.span>
                </Link>
                <Link to="/trainers">
                  <motion.span 
                    className="gh-btn-secondary px-8 py-3 text-base group inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={fastSpring}
                  >
                    <Play className="w-4 h-4" />
                    Browse trainers
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Hero Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...smoothTween, delay: 0.5 }}
              className="relative gpu-accelerate"
            >
              <HeroCarousel />
              
              {/* Decorative Elements with subtle animation */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.7, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
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
                <motion.div 
                  key={company.name} 
                  className="h-8 grayscale hover:grayscale-0 transition-all"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <img src={company.logo} alt={company.name} className="h-full w-auto object-contain invert" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Categories Section - Enhanced */}
      <CategoriesSection />

      {/* Recently Solved - with staggered animations */}
      <section className="py-24 relative border-t border-border overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTween}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...fastTween, delay: 0.1 }}
                className="gh-badge-primary mb-4 inline-block"
              >
                Live Feed
              </motion.span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Recently <span className="gradient-text-green">Solved</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Watch real problems getting solved in real-time
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...fastTween, delay: 0.2 }}
            >
              <Link to="/feed" className="flex items-center gap-1 text-sm text-primary hover:underline group">
                View all 
                <motion.span whileHover={{ x: 4 }} transition={fastSpring}>
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ ...smoothTween, delay: 0.15 }}
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTween}
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
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ ...smoothTween, delay: i * 0.1 }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  <motion.div 
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    whileHover={{ scale: 1.01 }}
                    transition={fastSpring}
                  >
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ ...fastTween, delay: i * 0.1 + 0.15 }}
                      className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.gradient} text-white text-sm font-mono mb-3`}
                    >
                      Step {step.step}
                    </motion.div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </motion.div>
                  
                  <motion.div 
                    className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-card to-card-hover border border-border items-center justify-center z-10 flex-shrink-0"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ ...smoothSpring, delay: i * 0.1 + 0.2 }}
                  >
                    <span className="font-mono font-bold text-foreground">{step.step}</span>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={fastSpring}
                      className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10 gpu-accelerate"
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 md:h-56 object-cover"
                        loading="lazy"
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTween}
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
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ ...smoothTween, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <AnimatedBorderCard>
                  <motion.div 
                    className="h-32 mb-4 -mx-2 -mt-2 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={fastSpring}
                  >
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </motion.div>
                  <motion.div 
                    className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    transition={fastSpring}
                  >
                    <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </AnimatedBorderCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Enhanced Testimonials */}
      <TestimonialsSection />

      {/* CTA with 3D */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams className="opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={smoothTween}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Ready to solve your
                <br />
                <motion.span 
                  className="gradient-text inline-block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ ...smoothTween, delay: 0.2 }}
                >
                  tech problems?
                </motion.span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers getting expert help every day.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/create-ticket">
                  <motion.span 
                    className="gh-btn-primary px-10 py-4 text-lg inline-flex items-center gap-2"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={fastSpring}
                  >
                    Post a Ticket Free
                    <motion.span whileHover={{ x: 4 }} transition={fastSpring}>
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.span>
                </Link>
                <Link to="/signup">
                  <motion.span 
                    className="gh-btn-secondary px-10 py-4 text-lg inline-block"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={fastSpring}
                  >
                    Create Account
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ ...smoothTween, delay: 0.15 }}
              className="hidden md:block"
            >
              <motion.div 
                className="relative rounded-xl overflow-hidden border border-border shadow-xl gpu-accelerate"
                whileHover={{ scale: 1.02, y: -4 }}
                transition={smoothSpring}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop"
                  alt="Expert developer ready to help"
                  className="w-full h-auto"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
