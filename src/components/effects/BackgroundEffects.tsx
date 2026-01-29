import { memo } from "react";

// Memoized to prevent re-renders
export const BackgroundBeams = memo(function BackgroundBeams({ className = "" }: { className?: string }) {
  const paths = [
    "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
    "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
    "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
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
          <path
            key={i}
            d={path}
            stroke="url(#beam-gradient)"
            strokeWidth="0.5"
            strokeOpacity={0.15 - i * 0.03}
            className="animate-[beam-draw_4s_ease-in-out_infinite]"
            style={{ 
              animationDelay: `${i * 0.3}s`,
              strokeDasharray: 1000,
              strokeDashoffset: 1000,
            }}
          />
        ))}
      </svg>
      <style>{`
        @keyframes beam-draw {
          0%, 100% { stroke-dashoffset: 1000; }
          50% { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
});

// Optimized glow orbs using CSS animations instead of framer-motion
export const GlowOrbs = memo(function GlowOrbs() {
  return (
    <>
      <div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse will-change-[opacity]"
        style={{ 
          background: "hsl(140 70% 45% / 0.12)",
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full blur-[100px] animate-pulse will-change-[opacity]"
        style={{ 
          background: "hsl(262 83% 58% / 0.08)",
          animationDuration: '10s',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[80px] animate-pulse will-change-[opacity]"
        style={{ 
          background: "hsl(212 100% 50% / 0.06)",
          animationDuration: '12s',
          animationDelay: '4s',
        }}
      />
    </>
  );
});

export const GridPattern = memo(function GridPattern() {
  return (
    <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
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
    <div className={`animated-border rounded-xl ${className}`}>
      <div className="relative bg-card rounded-xl p-6 h-full">
        {children}
      </div>
    </div>
  );
});
