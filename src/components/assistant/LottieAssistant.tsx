import { useRef, useEffect, useMemo, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion, AnimatePresence } from "framer-motion";

import type { EmojiEmotion } from "./EmojiAssistant";

interface LottieAssistantProps {
  emotion?: EmojiEmotion;
  size?: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  bounce?: boolean;
}

const EMOTION_CONFIG: Record<string, { speed: number; loop: boolean; segment?: [number, number] }> = {
  idle:      { speed: 0.5, loop: true },
  friendly:  { speed: 1, loop: true },
  waving:    { speed: 1.2, loop: true },
  excited:   { speed: 2, loop: true },
  thinking:  { speed: 0.3, loop: true, segment: [0, 60] },
  sleeping:  { speed: 0.15, loop: true, segment: [40, 80] },
  surprised: { speed: 2.5, loop: true, segment: [0, 40] },
  confused:  { speed: 0.6, loop: true, segment: [60, 120] },
  sad:       { speed: 0.4, loop: true, segment: [80, 140] },
  cry:       { speed: 0.5, loop: true, segment: [80, 140] },
  fear:      { speed: 3, loop: true, segment: [0, 50] },
  angry:     { speed: 1.8, loop: true, segment: [20, 80] },
  love:      { speed: 0.8, loop: true },
  cool:      { speed: 0.7, loop: true },
  laughing:  { speed: 1.5, loop: true },
};

const bodyAnims: Record<string, object> = {
  excited:   { y: [0, -8, 2, -5, 0], rotate: [0, -4, 4, -2, 0], scale: [1, 1.05, 0.97, 1.02, 1], transition: { repeat: Infinity, duration: 0.6, ease: "easeInOut" } },
  waving:    { rotate: [0, -3, 3, -2, 1, 0], y: [0, -2, 0], transition: { repeat: Infinity, duration: 1.2 } },
  thinking:  { rotate: [0, 4, 0, -4, 0], x: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 3.5, ease: "easeInOut" } },
  sleeping:  { y: [0, 3, 0], scale: [1, 0.98, 1], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
  surprised: { y: [0, -10, 0], scale: [1, 1.1, 1], transition: { repeat: Infinity, duration: 0.8 } },
  confused:  { rotate: [0, -6, 6, -3, 0], x: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 2.5 } },
  sad:       { y: [0, 2, 0], rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
  cry:       { y: [0, 1, 0], rotate: [0, -1, 1, 0], transition: { repeat: Infinity, duration: 1.8 } },
  fear:      { x: [0, -4, 4, -2, 0], scale: [1, 0.96, 1.01, 0.98, 1], transition: { repeat: Infinity, duration: 0.5 } },
  angry:     { rotate: [0, -2, 2, -2, 0], y: [0, -2, 0], transition: { repeat: Infinity, duration: 0.5 } },
  love:      { y: [0, -5, 0], scale: [1, 1.06, 1], transition: { repeat: Infinity, duration: 1.8, ease: "easeInOut" } },
  cool:      { rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
  laughing:  { y: [0, -6, 2, -4, 0], rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 0.6 } },
  friendly:  { y: [0, -2, 0], rotate: [0, 1, -1, 0], transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } },
  idle:      { y: [0, -2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
};

// Emotion overlay effects (particles, hearts, tears, etc.)
const EMOTION_PARTICLES: Record<string, { emoji: string; count: number }> = {
  love:      { emoji: "❤️", count: 3 },
  excited:   { emoji: "✨", count: 4 },
  cry:       { emoji: "💧", count: 2 },
  angry:     { emoji: "💢", count: 2 },
  sleeping:  { emoji: "💤", count: 2 },
  laughing:  { emoji: "😄", count: 2 },
  surprised: { emoji: "❗", count: 2 },
  cool:      { emoji: "😎", count: 1 },
  fear:      { emoji: "😰", count: 2 },
  thinking:  { emoji: "💭", count: 1 },
  confused:  { emoji: "❓", count: 2 },
  friendly:  { emoji: "👋", count: 1 },
  waving:    { emoji: "👋", count: 2 },
};

function EmotionParticles({ emotion, size }: { emotion: string; size: number }) {
  const config = EMOTION_PARTICLES[emotion];
  if (!config) return null;

  return (
    <AnimatePresence>
      {Array.from({ length: config.count }).map((_, i) => (
        <motion.span
          key={`${emotion}-${i}`}
          initial={{ opacity: 0, scale: 0, x: size / 2, y: size / 2 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.5],
            x: size / 2 + (Math.random() - 0.5) * size * 0.8,
            y: (Math.random() - 0.5) * size * 0.6,
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeOut",
          }}
          className="absolute pointer-events-none text-sm"
          style={{ fontSize: size * 0.18 }}
        >
          {config.emoji}
        </motion.span>
      ))}
    </AnimatePresence>
  );
}

// Mouse-tracking eyes overlay
function MouseEyes({ size, emotion }: { size: number; emotion: string }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / window.innerWidth;
      const dy = (e.clientY - cy) / window.innerHeight;
      setMouse({ x: dx * 6, y: dy * 4 });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const isClosed = emotion === "sleeping" || emotion === "cry";
  const isWide = emotion === "surprised" || emotion === "fear";
  const eyeW = size * 0.11;
  const eyeH = isClosed ? eyeW * 0.15 : isWide ? eyeW * 1.3 : eyeW;
  const pupilSize = isWide ? eyeW * 0.55 : eyeW * 0.45;
  const gap = size * 0.18;

  // Position eyes roughly in the upper portion of the robot
  const eyeY = size * 0.32;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 2 }}
    >
      {/* Left eye */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: eyeW,
          height: eyeH,
          left: size / 2 - gap / 2 - eyeW,
          top: eyeY,
          background: "white",
          border: "1.5px solid rgba(0,0,0,0.15)",
          transition: "height 0.2s ease",
        }}
      >
        {!isClosed && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: pupilSize,
              height: pupilSize,
              background: "#1a1a2e",
              top: "50%",
              left: "50%",
              marginTop: -pupilSize / 2,
              marginLeft: -pupilSize / 2,
            }}
            animate={{ x: mouse.x, y: mouse.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </div>
      {/* Right eye */}
      <div
        className="absolute rounded-full overflow-hidden"
        style={{
          width: eyeW,
          height: eyeH,
          left: size / 2 + gap / 2,
          top: eyeY,
          background: "white",
          border: "1.5px solid rgba(0,0,0,0.15)",
          transition: "height 0.2s ease",
        }}
      >
        {!isClosed && (
          <motion.div
            className="absolute rounded-full"
            style={{
              width: pupilSize,
              height: pupilSize,
              background: "#1a1a2e",
              top: "50%",
              left: "50%",
              marginTop: -pupilSize / 2,
              marginLeft: -pupilSize / 2,
            }}
            animate={{ x: mouse.x, y: mouse.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        )}
      </div>
      {/* Mouth */}
      <div
        className="absolute"
        style={{
          left: size / 2 - size * 0.08,
          top: eyeY + eyeW + size * 0.06,
          width: size * 0.16,
          zIndex: 3,
        }}
      >
        <SmileMouth emotion={emotion} width={size * 0.16} />
      </div>
    </div>
  );
}

function SmileMouth({ emotion, width }: { emotion: string; width: number }) {
  const h = width * 0.5;
  const mouthShapes: Record<string, string> = {
    idle: `M0,${h * 0.3} Q${width / 2},${h * 0.7} ${width},${h * 0.3}`,
    friendly: `M0,${h * 0.2} Q${width / 2},${h} ${width},${h * 0.2}`,
    waving: `M0,${h * 0.2} Q${width / 2},${h} ${width},${h * 0.2}`,
    excited: `M0,0 Q${width / 2},${h * 1.2} ${width},0`,
    thinking: `M0,${h * 0.5} L${width},${h * 0.5}`,
    sleeping: `M${width * 0.2},${h * 0.5} Q${width / 2},${h * 0.3} ${width * 0.8},${h * 0.5}`,
    surprised: `M${width * 0.3},${h * 0.1} Q${width / 2},${h} ${width * 0.7},${h * 0.1}`,
    confused: `M0,${h * 0.4} Q${width * 0.3},${h * 0.6} ${width / 2},${h * 0.4} Q${width * 0.7},${h * 0.2} ${width},${h * 0.4}`,
    sad: `M0,${h * 0.7} Q${width / 2},${h * 0.1} ${width},${h * 0.7}`,
    cry: `M0,${h * 0.8} Q${width / 2},0 ${width},${h * 0.8}`,
    fear: `M${width * 0.3},${h * 0.2} Q${width / 2},${h * 0.8} ${width * 0.7},${h * 0.2}`,
    angry: `M0,${h * 0.6} Q${width / 2},${h * 0.2} ${width},${h * 0.6}`,
    love: `M0,${h * 0.15} Q${width / 2},${h * 1.1} ${width},${h * 0.15}`,
    cool: `M0,${h * 0.3} Q${width / 2},${h * 0.8} ${width},${h * 0.3}`,
    laughing: `M0,0 Q${width / 2},${h * 1.3} ${width},0`,
  };

  const d = mouthShapes[emotion] || mouthShapes.idle;

  return (
    <svg width={width} height={h} viewBox={`0 0 ${width} ${h}`}>
      <motion.path
        d={d}
        fill="none"
        stroke="#1a1a2e"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={false}
        animate={{ d }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </svg>
  );
}

export function LottieAssistant({ emotion = "idle", size = 80, onClick, onHover, bounce = false }: LottieAssistantProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animData, setAnimData] = useState<unknown>(null);

  useEffect(() => {
    fetch("/animations/robot-waving.json")
      .then(r => r.json())
      .then(setAnimData)
      .catch(console.error);
  }, []);

  const config = useMemo(() => EMOTION_CONFIG[emotion] || EMOTION_CONFIG.idle, [emotion]);
  const bodyAnim = bodyAnims[emotion] || bodyAnims.idle;
  const bounceAnim = bounce ? { scale: [1, 1.15, 0.95, 1.05, 1], transition: { duration: 0.5 } } : {};

  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(config.speed);
    if (config.segment) {
      lottieRef.current.playSegments(config.segment, true);
    } else {
      lottieRef.current.goToAndPlay(0);
    }
  }, [emotion, config]);

  return (
    <motion.div
      animate={{ ...bodyAnim, ...bounceAnim }}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="cursor-pointer select-none relative"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Ground shadow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-[50%] pointer-events-none"
        style={{
          bottom: -4,
          width: size * 0.6,
          height: size * 0.12,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)",
          filter: "blur(3px)",
        }}
      />
      {animData && (
        <Lottie
          lottieRef={lottieRef}
          animationData={animData}
          loop={config.loop}
          autoplay
          style={{ width: size, height: size }}
        />
      )}
      {/* Mouse-tracking eyes + mouth overlay */}
      <MouseEyes size={size} emotion={emotion} />
      {/* Emotion particles */}
      <EmotionParticles emotion={emotion} size={size} />
    </motion.div>
  );
}
