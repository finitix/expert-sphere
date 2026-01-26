import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    avatar: "SC",
    rating: 5,
    text: "SolvePro saved us during a critical deployment. Our AWS expert diagnosed and fixed our Kubernetes issue in under an hour. Absolutely invaluable service.",
    highlight: "Kubernetes issue fixed in under an hour",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Founder at StartupLabs",
    avatar: "MJ",
    rating: 5,
    text: "As a non-technical founder, I was struggling with database optimization. The trainer not only solved the problem but taught me best practices for the future.",
    highlight: "Database optimization + education",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Senior Developer at FinServ",
    avatar: "ER",
    rating: 5,
    text: "The escrow payment system gave me confidence to try the platform. Now I use it weekly for specialized problems outside my expertise.",
    highlight: "Weekly user for specialized problems",
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Lead at CloudScale",
    avatar: "DK",
    rating: 5,
    text: "Response time is incredible. Posted a ticket about a CI/CD pipeline issue at 2am and had three qualified trainers respond within 30 minutes.",
    highlight: "3 responses in 30 minutes at 2am",
  },
  {
    id: 5,
    name: "Lisa Park",
    role: "Product Manager at DataDriven",
    avatar: "LP",
    rating: 5,
    text: "We've integrated SolvePro into our workflow for handling edge cases. The ROI compared to keeping specialists on staff is remarkable.",
    highlight: "Remarkable ROI vs in-house specialists",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const navigate = (direction: "prev" | "next") => {
    setIsAutoPlaying(false);
    if (direction === "prev") {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="chip mb-4">Testimonials</span>
          <h2 className="section-title">
            Loved by <span className="gradient-text">Teams Worldwide</span>
          </h2>
          <p className="section-subtitle">
            See what our community has to say about their experience
          </p>
        </motion.div>

        {/* Main testimonial card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
              >
                <div className="gh-glass p-8 md:p-12">
                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 opacity-10">
                    <Quote className="w-24 h-24" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[activeIndex].rating }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.3 }}
                      >
                        <Star className="w-5 h-5 fill-primary text-primary" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote text */}
                  <blockquote className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    "{testimonials[activeIndex].text}"
                  </blockquote>

                  {/* Highlight */}
                  <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
                    <span className="text-primary text-sm font-medium">
                      ✨ {testimonials[activeIndex].highlight}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-lg font-bold text-white">
                      {testimonials[activeIndex].avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonials[activeIndex].name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonials[activeIndex].role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <button
              onClick={() => navigate("prev")}
              className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setActiveIndex(index);
                  }}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                />
              ))}
            </div>

            <button
              onClick={() => navigate("next")}
              className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-foreground hover:bg-muted/80 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats below testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
        >
          {[
            { value: "50K+", label: "Happy Clients" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "24/7", label: "Support Available" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className="text-center p-4"
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
