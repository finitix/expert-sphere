import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Clock, Star, CheckCircle2, Code2, ChevronRight, Play, Sparkles, Globe, Cpu, Database, Lock, Rocket } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern, AnimatedBorderCard } from "@/components/effects/BackgroundEffects";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { useRef, useState, useEffect, memo } from "react";
// Optimized easing - use CSS-friendly curves for GPU acceleration
const fastEase = [0.32, 0.72, 0, 1]; // Quick and snappy
const smoothEase = [0.25, 0.46, 0.45, 0.94]; // Smooth deceleration
// Optimized transition presets - reduced complexity for better perf
const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: fastEase }
};
const staggerContainer = {
    animate: { transition: { staggerChildren: 0.05 } }
};
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
// Optimized Hero Carousel - memoized with GPU-friendly animations
const HeroCarousel = memo(() => {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);
    return (<div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-primary/20 will-change-transform">
      <AnimatePresence mode="wait">
        <motion.img key={currentIndex} src={heroImages[currentIndex].src} alt={heroImages[currentIndex].alt} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.5, ease: smoothEase }} className="w-full h-auto aspect-[4/3] object-cover will-change-transform" loading="eager"/>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-tr from-background/60 via-transparent to-transparent pointer-events-none"/>
      
      {/* Floating Badge - simplified animation */}
      <AnimatePresence mode="wait">
        <motion.div key={`badge-${currentIndex}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: fastEase }} className="absolute bottom-4 left-4 right-4 bg-background/90 backdrop-blur-md rounded-lg p-4 border border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-success"/>
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">{heroImages[currentIndex].badge.title}</p>
              <p className="text-xs text-muted-foreground">{heroImages[currentIndex].badge.subtitle}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute top-4 right-4 flex gap-1.5">
        {heroImages.map((_, i) => (<button key={i} onClick={() => setCurrentIndex(i)} className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}/>))}
      </div>
    </div>);
});
const Index = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"],
    });
    // Simplified parallax - only opacity for performance
    const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    return (<div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section - Side by Side Layout */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrbs />
          <BackgroundBeams />
          <GridPattern />
        </div>

        <motion.div style={{ opacity: heroOpacity }} className="container mx-auto px-4 relative z-10 pt-24 pb-16 will-change-[opacity]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge - optimized animation */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: fastEase }} className="mb-6">
                <span className="gh-badge-primary inline-flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                  <Sparkles className="w-3.5 h-3.5 animate-pulse"/>
                  Trusted by 10,000+ developers worldwide
                </span>
              </motion.div>

              {/* Headline - optimized */}
              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: fastEase }} className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
                Build with the power of
                <br />
                <span className="gradient-text">verified experts</span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15, ease: fastEase }} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Post your tech problem. Get matched with verified trainers.
                Pay only when it's solved.
              </motion.p>

              {/* CTAs - simplified hover */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2, ease: fastEase }} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link to="/create-ticket" className="gh-btn-primary px-8 py-3 text-base group inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                  Post a Ticket
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"/>
                </Link>
                <Link to="/trainers" className="gh-btn-secondary px-8 py-3 text-base group inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                  <Play className="w-4 h-4"/>
                  Browse trainers
                </Link>
              </motion.div>
            </div>

            {/* Right Side - Hero Image Carousel */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: smoothEase }} className="relative">
              <HeroCarousel />
              
              {/* Decorative Elements - CSS animations for perf */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"/>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}/>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Trusted By Section - simplified animations */}
      <section className="py-16 border-y border-border bg-background-secondary/50">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, ease: fastEase }} className="text-center">
            <p className="text-sm text-muted-foreground mb-8">
              TRUSTED BY DEVELOPERS AT
            </p>
            <div className="flex flex-wrap items-center justify-center gap-12">
              {trustedBy.map((company, i) => (<motion.div key={company.name} className="h-8 opacity-50 hover:opacity-100 transition-all duration-300 hover:scale-110" initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 0.5, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3, ease: fastEase }}>
                  <img src={company.logo} alt={company.name} className="h-full w-auto object-contain dark:invert transition-all duration-300 grayscale hover:grayscale-0" loading="lazy"/>
                </motion.div>))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section - optimized */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"/>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, ease: fastEase }} className="text-center mb-12">
            <span className="gh-badge-blue mb-4 inline-block hover:scale-105 transition-transform duration-200">
              Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Get help in <span className="gradient-text-blue">any domain</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (<motion.div key={cat.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.35, delay: i * 0.04, ease: fastEase }} className="gh-card text-center cursor-pointer group hover:scale-105 hover:-translate-y-1 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl bg-${cat.color}/10 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                  <cat.icon className={`w-6 h-6 text-${cat.color}`}/>
                </div>
                <p className="font-semibold text-foreground">{cat.name}</p>
                <p className="text-sm text-muted-foreground">{cat.count} solved</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Recently Solved - optimized */}
      <section className="py-24 relative border-t border-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background pointer-events-none"/>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, ease: fastEase }} className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="gh-badge-primary mb-4 inline-block">Live Feed</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Recently <span className="gradient-text-green">Solved</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Watch real problems getting solved in real-time
              </p>
            </div>
            <Link to="/feed" className="flex items-center gap-1 text-sm text-primary hover:underline group">
              View all <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: 0.1, ease: fastEase }}>
            <SolvedFeed limit={4}/>
          </motion.div>
        </div>
      </section>

      {/* How It Works - optimized */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrbs />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, ease: fastEase }} className="text-center mb-16">
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
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary transform -translate-x-1/2"/>

            <div className="space-y-16 md:space-y-24">
              {steps.map((step, i) => (<motion.div key={step.step} initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: i * 0.08, ease: fastEase }} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
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
                    <div className="rounded-xl overflow-hidden border border-border shadow-2xl shadow-primary/10 hover:scale-[1.02] transition-transform duration-300">
                      <img src={step.image} alt={step.title} className="w-full h-48 md:h-56 object-cover" loading="lazy"/>
                    </div>
                  </div>
                </motion.div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - optimized */}
      <section className="py-24 relative border-t border-border bg-background-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, ease: fastEase }} className="text-center mb-16">
            <span className="gh-badge-blue mb-4 inline-block">Why TechSolve</span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
              Built for <span className="gradient-text-blue">developers</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We understand the challenges you face. That's why we built this.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (<motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.4, delay: i * 0.08, ease: fastEase }} className="hover:-translate-y-2 transition-transform duration-300">
                <AnimatedBorderCard>
                  <div className="h-32 mb-4 -mx-2 -mt-2 rounded-lg overflow-hidden">
                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" loading="lazy"/>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-${feature.color}/10 flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}`}/>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                </AnimatedBorderCard>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Testimonials - optimized */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.4, ease: fastEase }} className="text-center mb-16">
            <span className="gh-badge-primary mb-4 inline-block hover:scale-105 transition-transform duration-200">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Loved by <span className="gradient-text-green">developers</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {testimonials.map((testimonial, i) => (<motion.div key={testimonial.author} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06, ease: fastEase }} className="gh-card hover:-translate-y-2 hover:scale-[1.01] transition-all duration-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (<Star key={j} className="w-4 h-4 text-warning fill-current"/>))}
                </div>
                <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-10 h-10 rounded-full object-cover hover:scale-110 transition-transform duration-200" loading="lazy"/>
                  <div>
                    <p className="font-medium text-foreground">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* CTA - optimized */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <GlowOrbs />
          <BackgroundBeams className="opacity-50"/>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: fastEase }}>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                Ready to solve your
                <br />
                <span className="gradient-text">tech problems?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of developers getting expert help every day.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link to="/create-ticket" className="gh-btn-primary px-10 py-4 text-lg inline-flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                  Post a Ticket Free
                  <ArrowRight className="w-5 h-5"/>
                </Link>
                <Link to="/signup" className="gh-btn-secondary px-10 py-4 text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
                  Create Account
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1, ease: smoothEase }} className="hidden md:block">
              <div className="relative rounded-xl overflow-hidden border border-border shadow-xl hover:scale-[1.02] transition-transform duration-300">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=350&fit=crop" alt="Expert developer ready to help" className="w-full h-auto" loading="lazy"/>
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent pointer-events-none"/>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default Index;
