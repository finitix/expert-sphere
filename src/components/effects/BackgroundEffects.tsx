import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function BackgroundBeams({ className = "" }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
    "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
    "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
    "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
  ];

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
            <stop offset="50%" stopColor="hsl(140 70% 45%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(140 70% 45%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((path, i) => (
          <motion.path
            key={i}
            d={path}
            stroke="url(#beam-gradient)"
            strokeWidth="0.5"
            strokeOpacity={0.2 - i * 0.02}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function GlowOrbs() {
  return (
    <>
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "hsl(140 70% 45% / 0.15)" }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "hsl(262 83% 58% / 0.12)" }}
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-15 blur-[80px]"
        style={{ background: "hsl(212 100% 50% / 0.1)" }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
}

export function GridPattern() {
  return (
    <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
  );
}

export function AnimatedBorderCard({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`animated-border rounded-xl ${className}`}>
      <div className="relative bg-card rounded-xl p-6 h-full">
        {children}
      </div>
    </div>
  );
}
