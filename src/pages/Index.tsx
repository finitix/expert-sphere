import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Shield, Clock, Star, Users, CheckCircle2, Code2, ChevronRight, Play, Sparkles, Globe, Cpu, Database, Lock, Rocket, Award } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern, AnimatedBorderCard } from "@/components/effects/BackgroundEffects";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { useRef, useState, useEffect } from "react";

// Smoother easing curves for buttery animations
const easeOutExpo = [0.16, 1, 0.3, 1];
const easeOutQuart = [0.25, 1, 0.5, 1];
const springConfig = { type: "spring", stiffness: 100, damping: 20 };

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

// Hero Carousel Component with ultra-smooth transitions
const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/20">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={heroImages[currentIndex].src}
          alt={heroImages[currentIndex].alt}
          initial={{ opacity: 0, scale: 1.08, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
          transition={{ 
            duration: 0.8, 
            ease: [0.23, 1, 0.32, 1]
          }}
          className="w-full h-auto aspect-[4/3] object-cover"
        />
      </AnimatePresence>
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />
      
      {/* Floating Badge with smoother animation */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={`badge-${currentIndex}`}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.5, 
            ease: [0.23, 1, 0.32, 1],
            delay: 0.1
          }}
          className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border"
        >
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
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

      {/* Carousel Indicators with smooth transitions */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {heroImages.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className="h-2 rounded-full bg-white/50 hover:bg-white/80"
            animate={{ 
              width: i === currentIndex ? 24 : 8,
              backgroundColor: i === currentIndex ? "rgb(255,255,255)" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

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
              {/* Badge with subtle pulse */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="mb-6"
              >
                <motion.span 
                  className="gh-badge-primary inline-flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </motion.span>
                  Trusted by 10,000+ developers worldwide
                </motion.span>
              </motion.div>

              {/* Headline with staggered letters */}
              <motion.h1
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 leading-[1.05] tracking-tight"
              >
                Build with the power of
                <br />
                <motion.span 
                  className="gradient-text inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  verified experts
                </motion.span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              >
                Post your tech problem. Get matched with verified trainers.
                Pay only when it's solved.
              </motion.p>

              {/* CTAs with hover effects */}
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
                className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/create-ticket" className="gh-btn-primary px-8 py-3 text-base group inline-flex items-center gap-2">
                    Post a Ticket
                    <motion.span
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/trainers" className="gh-btn-secondary px-8 py-3 text-base group inline-flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    Browse trainers
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Side - Hero Image Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -5 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative"
              style={{ perspective: "1000px" }}
            >
              <HeroCarousel />
              
              {/* Decorative Elements with floating animation */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.15, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section with staggered logos */}
      <section className="py-16 border-y border-border bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
            className="text-center"
          >
            <motion.p 
              className="text-sm text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              TRUSTED BY DEVELOPERS AT
            </motion.p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {trustedBy.map((company, i) => (
                <motion.div 
                  key={company.name} 
                  className="h-8 opacity-50 hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 0.5, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                >
                  <img 
                    src={company.logo} 
                    alt={company.name} 
                    className="h-full w-auto object-contain dark:invert transition-all duration-300 grayscale hover:grayscale-0" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - with parallax */}
      <section className="py-24 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-12"
          >
            <motion.span 
              className="gh-badge-blue mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Categories
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Get help in <span className="gradient-text-blue">any domain</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 50, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: i * 0.08, 
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                whileTap={{ scale: 0.98 }}
                className="gh-card text-center cursor-pointer group"
              >
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-${cat.color}/10 flex items-center justify-center mx-auto mb-3`}
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                >
                  <cat.icon className={`w-6 h-6 text-${cat.color}`} />
                </motion.div>
                <p className="font-semibold text-foreground">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.count} solved</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4"
          >
            <div>
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
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
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Link to="/feed" className="flex items-center gap-1 text-sm text-primary hover:underline group">
                View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: easeOutExpo }}
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
                  initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80, rotateY: i % 2 === 0 ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: i * 0.15, ease: easeOutExpo }}
                  className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}
                >
                  <motion.div 
                    className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 + 0.2 }}
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
                    transition={{ delay: i * 0.15 + 0.3, type: "spring", stiffness: 200 }}
                  >
                    <span className="font-mono font-bold text-foreground">{step.step}</span>
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.div
                      whileHover={{ scale: 1.05, rotateY: 5 }}
                      transition={{ duration: 0.4 }}
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
                initial={{ opacity: 0, y: 60, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: easeOutExpo }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <AnimatedBorderCard>
                  <motion.div 
                    className="h-32 mb-4 -mx-2 -mt-2 rounded-lg overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                    />
                  </motion.div>
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

      {/* Testimonials with smooth card animations */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <motion.span 
              className="gh-badge-primary mb-4 inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Testimonials
            </motion.span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Loved by <span className="gradient-text-green">developers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: i * 0.12,
                  ease: [0.23, 1, 0.32, 1]
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="gh-card"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + j * 0.05, type: "spring", stiffness: 400 }}
                    >
                      <Star className="w-4 h-4 text-warning fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <motion.img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
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

      {/* CTA with enhanced animations */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams className="opacity-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.h2 
                className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              >
                Ready to solve your
                <br />
                <motion.span 
                  className="gradient-text inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
                >
                  tech problems?
                </motion.span>
              </motion.h2>
              <motion.p 
                className="text-xl text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                Join thousands of developers getting expert help every day.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row items-start gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/create-ticket" className="gh-btn-primary px-10 py-4 text-lg inline-flex items-center gap-2">
                    Post a Ticket Free
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Link to="/signup" className="gh-btn-secondary px-10 py-4 text-lg">
                    Create Account
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="hidden md:block"
              style={{ perspective: "1000px" }}
            >
              <motion.div 
                className="relative rounded-xl overflow-hidden border border-border shadow-xl"
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop"
                  alt="Expert developer ready to help"
                  className="w-full h-auto transition-transform duration-700"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
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
