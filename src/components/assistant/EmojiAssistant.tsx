import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type EmojiEmotion = "friendly" | "thinking" | "excited" | "idle" | "waving";

interface EmojiAssistantProps {
  emotion?: EmojiEmotion;
  size?: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
}

export function EmojiAssistant({ emotion = "idle", size = 80, onClick, onHover }: EmojiAssistantProps) {
  const [blinkState, setBlinkState] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Blink every 3-5 seconds
  useEffect(() => {
    const blink = () => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Track mouse for pupil movement
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setPupilOffset({ x: dx * 3, y: dy * 2 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const eyeHeight = blinkState ? 1 : emotion === "excited" ? 14 : 11;
  const mouthPath = emotion === "thinking"
    ? "M 28 52 Q 40 48 52 52"
    : emotion === "excited"
    ? "M 24 48 Q 40 62 56 48"
    : "M 26 50 Q 40 58 54 50";

  const bodyBounce = emotion === "excited"
    ? { y: [0, -6, 0], transition: { repeat: Infinity, duration: 0.5 } }
    : emotion === "waving"
    ? { rotate: [0, -5, 5, -3, 0], transition: { repeat: Infinity, duration: 1.2 } }
    : emotion === "thinking"
    ? { rotate: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 3 } }
    : { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };

  return (
    <motion.div
      animate={bodyBounce}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="cursor-pointer select-none"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 80 80" width={size} height={size}>
        {/* Glow */}
        <defs>
          <radialGradient id="faceGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Face circle */}
        <circle cx="40" cy="40" r="36" fill="#FBBF24" filter="url(#shadow)" />
        <circle cx="40" cy="40" r="36" fill="url(#faceGlow)" />
        {/* Cheek blush */}
        <circle cx="18" cy="46" r="6" fill="#F59E0B" opacity="0.35" />
        <circle cx="62" cy="46" r="6" fill="#F59E0B" opacity="0.35" />

        {/* Left eye */}
        <g>
          <ellipse
            cx={30 + pupilOffset.x}
            cy="34"
            rx="5.5"
            ry={eyeHeight / 2}
            fill="#1a1a2e"
          >
            <animate attributeName="ry" values={`${eyeHeight / 2};1;${eyeHeight / 2}`} dur="0.15s" begin="indefinite" />
          </ellipse>
          {/* Pupil shine */}
          {!blinkState && (
            <circle cx={28 + pupilOffset.x * 0.5} cy="32" r="1.5" fill="white" opacity="0.9" />
          )}
        </g>

        {/* Right eye */}
        <g>
          <ellipse
            cx={50 + pupilOffset.x}
            cy="34"
            rx="5.5"
            ry={eyeHeight / 2}
            fill="#1a1a2e"
          />
          {!blinkState && (
            <circle cx={48 + pupilOffset.x * 0.5} cy="32" r="1.5" fill="white" opacity="0.9" />
          )}
        </g>

        {/* Eyebrows */}
        {emotion === "thinking" && (
          <>
            <line x1="23" y1="24" x2="35" y2="26" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <line x1="45" y1="25" x2="57" y2="23" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          </>
        )}
        {emotion === "excited" && (
          <>
            <line x1="24" y1="23" x2="34" y2="25" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
            <line x1="46" y1="25" x2="56" y2="23" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
          </>
        )}

        {/* Mouth */}
        <path d={mouthPath} stroke="#92400E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {(emotion === "excited" || emotion === "friendly" || emotion === "waving") && (
          <path d={mouthPath} stroke="none" fill="#92400E" opacity="0.15" />
        )}

        {/* Waving hand */}
        {emotion === "waving" && (
          <g>
            <motion.g
              animate={{ rotate: [0, 20, -10, 20, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              style={{ originX: "72px", originY: "20px" }}
            >
              <text x="64" y="20" fontSize="18" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))" }}>👋</text>
            </motion.g>
          </g>
        )}

        {/* Thinking dots */}
        {emotion === "thinking" && (
          <g>
            <motion.circle cx="66" cy="14" r="2.5" fill="#d4d4d8"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            />
            <motion.circle cx="72" cy="8" r="3.5" fill="#d4d4d8"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            />
          </g>
        )}
      </svg>
    </motion.div>
  );
}
