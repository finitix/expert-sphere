import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          {/* Glow rings */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-2xl bg-primary/30 blur-xl"
          />
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute inset-0 rounded-2xl bg-secondary/20 blur-2xl"
          />
          
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading bar */}
        <div className="mt-8 w-48 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
          />
        </div>

        {/* Loading text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}

// Skeleton components with shimmer effect
interface SkeletonProps {
  className?: string;
}

export function SkeletonText({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded bg-muted ${className}`}>
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

export function SkeletonCard({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-card border border-border p-6 ${className}`}>
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      />
      <div className="space-y-4">
        <SkeletonText className="h-4 w-3/4" />
        <SkeletonText className="h-4 w-1/2" />
        <div className="flex gap-2">
          <SkeletonText className="h-6 w-16 rounded-full" />
          <SkeletonText className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonAvatar({ className = "" }: SkeletonProps) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-muted ${className}`}>
      <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <SkeletonText className="h-6 w-32 mx-auto rounded-full" />
        <div className="space-y-4">
          <SkeletonText className="h-12 w-full max-w-2xl mx-auto" />
          <SkeletonText className="h-12 w-3/4 mx-auto" />
        </div>
        <SkeletonText className="h-6 w-2/3 mx-auto" />
        <div className="flex gap-4 justify-center">
          <SkeletonText className="h-12 w-40 rounded-md" />
          <SkeletonText className="h-12 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function FeedSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex gap-4 p-4 rounded-xl bg-card border border-border">
          <SkeletonAvatar className="w-12 h-12 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <SkeletonText className="h-4 w-1/3" />
            <SkeletonText className="h-4 w-full" />
            <SkeletonText className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
