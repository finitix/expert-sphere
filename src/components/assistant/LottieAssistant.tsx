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

// Map emotions to their dedicated animation files
const EMOTION_ANIM_MAP: Record<string, string> = {
  idle:      "/animations/robot-idle.json",
  friendly:  "/animations/robot-waving.json",
  waving:    "/animations/robot-waving.json",
  excited:   "/animations/robot-excited.json",
  thinking:  "/animations/robot-thinking.json",
  sleeping:  "/animations/robot-sleeping.json",
  surprised: "/animations/robot-excited.json",
  confused:  "/animations/robot-confused.json",
  sad:       "/animations/robot-sad.json",
  cry:       "/animations/robot-sad.json",
  fear:      "/animations/robot-confused.json",
  angry:     "/animations/robot-sad.json",
  love:      "/animations/robot-love.json",
  cool:      "/animations/robot-cool.json",
  laughing:  "/animations/robot-excited.json",
};

// Playback speed per emotion for variety
const SPEED_MAP: Record<string, number> = {
  idle: 0.6, friendly: 1, waving: 1.2, excited: 1.5,
  thinking: 0.5, sleeping: 0.3, surprised: 2, confused: 0.7,
  sad: 0.5, cry: 0.6, fear: 2.5, angry: 1.8,
  love: 0.8, cool: 0.7, laughing: 1.4,
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

// Cache loaded animation data
const animCache: Record<string, unknown> = {};

export function LottieAssistant({ emotion = "idle", size = 80, onClick, onHover, bounce = false }: LottieAssistantProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [animData, setAnimData] = useState<unknown>(null);
  const [currentFile, setCurrentFile] = useState("");

  const animFile = EMOTION_ANIM_MAP[emotion] || EMOTION_ANIM_MAP.idle;
  const speed = SPEED_MAP[emotion] || 1;
  const bodyAnim = bodyAnims[emotion] || bodyAnims.idle;
  const bounceAnim = bounce ? { scale: [1, 1.15, 0.95, 1.05, 1], transition: { duration: 0.5 } } : {};

  // Load animation data when emotion file changes
  useEffect(() => {
    if (animFile === currentFile && animData) return;

    if (animCache[animFile]) {
      setAnimData(animCache[animFile]);
      setCurrentFile(animFile);
      return;
    }

    fetch(animFile)
      .then(r => r.json())
      .then(data => {
        animCache[animFile] = data;
        setAnimData(data);
        setCurrentFile(animFile);
      })
      .catch(console.error);
  }, [animFile]);

  // Update speed when emotion changes
  useEffect(() => {
    if (!lottieRef.current) return;
    lottieRef.current.setSpeed(speed);
  }, [emotion, speed]);

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
      <AnimatePresence mode="wait">
        {animData && (
          <motion.div
            key={currentFile}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Lottie
              lottieRef={lottieRef}
              animationData={animData}
              loop
              autoplay
              style={{ width: size, height: size }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
