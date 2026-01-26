import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ElementType;
  delay: number;
}

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { duration: 2000, bounce: 0 });
  const display = useTransform(spring, (current) => {
    if (suffix === "K+") {
      return `${Math.floor(current / 1000)}K+`;
    }
    if (suffix === "%") {
      return `${Math.floor(current)}%`;
    }
    if (suffix === "") {
      return current.toFixed(1);
    }
    return `${Math.floor(current)}${suffix}`;
  });

  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, spring, value]);

  useEffect(() => {
    return display.onChange((latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}
    </span>
  );
}

function StatItem({ value, suffix, label, icon: Icon, delay }: StatItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative group"
    >
      <div className="gh-glass p-6 md:p-8 text-center h-full">
        {/* Hover glow effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 blur-xl -z-10"
        />
        
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/20 flex items-center justify-center"
        >
          <Icon className="w-7 h-7 text-primary" />
        </motion.div>

        {/* Value */}
        <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
          <AnimatedNumber value={value} suffix={suffix} />
        </div>

        {/* Label */}
        <div className="text-muted-foreground text-sm md:text-base">{label}</div>
      </div>
    </motion.div>
  );
}

export function StatsSection() {
  const stats = [
    { value: 50000, suffix: "K+", label: "Problems Solved", icon: TrendingUp },
    { value: 2000, suffix: "+", label: "Expert Trainers", icon: Users },
    { value: 4.9, suffix: "", label: "Average Rating", icon: Star },
    { value: 97, suffix: "%", label: "Success Rate", icon: Clock },
  ];

  return (
    <section className="py-20 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="chip mb-4">By The Numbers</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
