import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Lazy load the 3D scene for performance
const RoboHeroScene = lazy(() =>
  import("@/components/3d/RoboHeroScene").then((m) => ({ default: m.RoboHeroScene }))
);

const TYPEWRITER_LINES = [
  "Welcome.",
  "You're not just posting a ticket.",
  "You're starting a solution.",
];

function TypewriterText() {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (lineIndex >= TYPEWRITER_LINES.length) {
      setDone(true);
      return;
    }

    const line = TYPEWRITER_LINES[lineIndex];
    if (charIndex < line.length) {
      const timeout = setTimeout(() => {
        setCurrentLine(line.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, 40 + Math.random() * 30); // Slightly variable speed for realism
      return () => clearTimeout(timeout);
    } else {
      // Line complete, pause then move to next
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setCurrentLine("");
        setCharIndex(0);
        setLineIndex((l) => l + 1);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [lineIndex, charIndex]);

  return (
    <div className="space-y-2">
      {displayedLines.map((line, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 1 }}
          className={`font-display leading-relaxed ${
            i === 0
              ? "text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
              : "text-xl md:text-2xl lg:text-3xl text-muted-foreground"
          }`}
        >
          {line}
        </motion.p>
      ))}
      {!done && (
        <p
          className={`font-display leading-relaxed ${
            lineIndex === 0
              ? "text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
              : "text-xl md:text-2xl lg:text-3xl text-muted-foreground"
          }`}
        >
          {currentLine}
          <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse align-middle" />
        </p>
      )}
    </div>
  );
}

export function RoboHero() {
  const [showCTA, setShowCTA] = useState(false);

  // Show CTA after typewriter finishes (~4 seconds)
  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background-secondary to-background" />
      
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[100px]" />

      {/* 3D Robot Scene */}
      <Suspense fallback={null}>
        <RoboHeroScene />
      </Suspense>

      {/* Content overlay */}
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <TypewriterText />

            {/* CTA Button - appears after typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={showCTA ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="mt-10"
            >
              {showCTA && (
                <Link
                  to="/create-ticket"
                  className="gh-btn-primary px-10 py-4 text-lg group inline-flex items-center gap-3 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-200 shadow-lg shadow-primary/30"
                >
                  Post a Ticket
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right: Space for 3D robot (rendered via Canvas behind) */}
          <div className="hidden lg:block" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted-foreground">Scroll to explore</span>
        <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5">
          <motion.div
            className="w-1 h-2 rounded-full bg-primary"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
