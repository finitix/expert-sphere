import { useRef, useEffect, useMemo, useState } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";

import type { EmojiEmotion } from "./EmojiAssistant";

interface LottieAssistantProps {
  emotion?: EmojiEmotion;
  size?: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  bounce?: boolean;
}

// Map emotions to playback speed & segment ranges within the 194-frame animation
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

// Body sway animations per emotion
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

export function LottieAssistant({ emotion = "idle", size = 80, onClick, onHover, bounce = false }: LottieAssistantProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animData, setAnimData] = useState<unknown>(null);

  // Load animation data
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
    </motion.div>
  );
}
