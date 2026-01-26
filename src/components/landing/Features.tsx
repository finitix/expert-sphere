import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  CreditCard, 
  MessageSquare, 
  Bell, 
  Star,
  Zap 
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Trainers",
    description: "Every trainer goes through a rigorous verification process. Skills tested, identity verified.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Funds held safely in escrow until you confirm the solution works perfectly.",
    gradient: "from-secondary to-primary",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Real-time collaboration with screen sharing, code snippets, and file transfers.",
    gradient: "from-success to-primary",
  },
  {
    icon: Bell,
    title: "Real-time Updates",
    description: "Get instant notifications when trainers respond or your ticket status changes.",
    gradient: "from-primary to-success",
  },
  {
    icon: Star,
    title: "Trusted Ratings",
    description: "Transparent review system helps you choose the best trainer for your needs.",
    gradient: "from-secondary to-success",
  },
  {
    icon: Zap,
    title: "Fast Resolution",
    description: "Average response time under 2 hours. Most problems solved within a day.",
    gradient: "from-success to-secondary",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export function Features() {
  return (
    <section className="py-24 relative">
      {/* Background Glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="chip mb-4">Why Choose Us</span>
          <h2 className="section-title">
            Built for <span className="gradient-text">Trust</span>
          </h2>
          <p className="section-subtitle">
            Every feature designed to make problem-solving safe, fast, and reliable
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <GlassCard className="group h-full" glow>
                {/* Icon */}
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                </motion.div>

                <h3 className="font-display font-semibold text-xl text-white mb-3 group-hover:gradient-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Hover line indicator */}
                <motion.div
                  className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
