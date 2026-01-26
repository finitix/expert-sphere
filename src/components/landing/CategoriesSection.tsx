import { motion } from "framer-motion";
import { 
  Code, 
  Database, 
  Cloud, 
  Palette, 
  TrendingUp, 
  Shield, 
  Smartphone,
  Bot,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Scale
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  { icon: Code, name: "Development", count: 5420, color: "from-blue-500 to-cyan-500" },
  { icon: Database, name: "Database", count: 2340, color: "from-purple-500 to-pink-500" },
  { icon: Cloud, name: "Cloud & DevOps", count: 3120, color: "from-green-500 to-emerald-500" },
  { icon: Bot, name: "AI & Machine Learning", count: 1890, color: "from-orange-500 to-amber-500" },
  { icon: Palette, name: "Design & UX", count: 2150, color: "from-pink-500 to-rose-500" },
  { icon: Shield, name: "Security", count: 1560, color: "from-red-500 to-orange-500" },
  { icon: Smartphone, name: "Mobile Dev", count: 1780, color: "from-indigo-500 to-purple-500" },
  { icon: TrendingUp, name: "Marketing", count: 2890, color: "from-teal-500 to-green-500" },
  { icon: Briefcase, name: "Business", count: 3450, color: "from-amber-500 to-yellow-500" },
  { icon: GraduationCap, name: "Education", count: 1230, color: "from-cyan-500 to-blue-500" },
  { icon: HeartPulse, name: "Healthcare", count: 890, color: "from-rose-500 to-red-500" },
  { icon: Scale, name: "Legal", count: 670, color: "from-slate-500 to-gray-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export function CategoriesSection() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="chip mb-4">Categories</span>
          <h2 className="section-title">
            Expertise in <span className="gradient-text">Every Domain</span>
          </h2>
          <p className="section-subtitle">
            From technology to business, find experts in any field you need help with
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { duration: 0.2 } 
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to={`/trainers?category=${category.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                className="block group"
              >
                <div className="gh-card p-5 h-full hover:border-primary/30 transition-all duration-300">
                  {/* Icon with gradient background */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-foreground" />
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>

                  {/* Count */}
                  <p className="text-sm text-muted-foreground">
                    {category.count.toLocaleString()} experts
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    className="h-0.5 bg-gradient-to-r from-primary to-secondary mt-4 rounded-full"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all categories
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
