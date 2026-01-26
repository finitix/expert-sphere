import { useEffect, useRef, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Memoized for performance
export const BackgroundBeams = memo(function BackgroundBeams({ className = "" }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();
  
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  ];

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(140 70% 45%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(140 70% 45%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(140 70% 45%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke="url(#beam-gradient)"
            strokeWidth="0.5"
            strokeOpacity={0.15 - i * 0.02}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
});

export const GlowOrbs = memo(function GlowOrbs() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <>
      <motion.div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-[100px] will-change-transform"
        style={{ background: "hsl(140 70% 45% / 0.12)" }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.15, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px] will-change-transform"
        style={{ background: "hsl(262 83% 58% / 0.1)" }}
        animate={prefersReducedMotion ? {} : {
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full opacity-12 blur-[70px] will-change-transform"
        style={{ background: "hsl(212 100% 50% / 0.08)" }}
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
});

export const GridPattern = memo(function GridPattern() {
  return (
    <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
  );
});

export const AnimatedBorderCard = memo(function AnimatedBorderCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`animated-border rounded-xl gpu-accelerate ${className}`}>
      <div className="relative bg-card rounded-xl p-6 h-full">
        {children}
      </div>
    </div>
  );
});
