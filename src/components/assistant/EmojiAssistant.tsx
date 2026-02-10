import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export type EmojiEmotion = "friendly" | "thinking" | "excited" | "idle" | "waving" | "surprised" | "confused" | "sleeping";

interface EmojiAssistantProps {
  emotion?: EmojiEmotion;
  size?: number;
  onClick?: () => void;
  onHover?: (hovering: boolean) => void;
  bounce?: boolean;
}

export function EmojiAssistant({ emotion = "idle", size = 80, onClick, onHover, bounce = false }: EmojiAssistantProps) {
  const [blinkState, setBlinkState] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  // Blink (not when sleeping)
  useEffect(() => {
    if (emotion === "sleeping") return;
    const blink = () => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [emotion]);

  // Mouse tracking
  useEffect(() => {
    if (emotion === "sleeping") return;
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPupilOffset({ x: ((e.clientX - cx) / cx) * 3, y: ((e.clientY - cy) / cy) * 2 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [emotion]);

  // Unique ID for gradients (avoid SVG ID collisions when multiple instances)
  const uid = `ea-${size}`;

  // --- Eye config ---
  const eyeRx = 6;
  let eyeRy = blinkState ? 1 : 6;
  let leftEyeCx = 30 + pupilOffset.x;
  let rightEyeCx = 50 + pupilOffset.x;
  const eyeCy = 33;

  if (emotion === "sleeping") { eyeRy = 1.5; leftEyeCx = 30; rightEyeCx = 50; }
  if (emotion === "surprised") { eyeRy = blinkState ? 1 : 8.5; }
  if (emotion === "excited") { eyeRy = blinkState ? 1 : 7; }

  // --- Mouth ---
  let mouthContent: JSX.Element;
  switch (emotion) {
    case "excited":
      mouthContent = (
        <>
          <path d="M 24 49 Q 40 64 56 49" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 24 49 Q 40 64 56 49 Z" fill="#7c2d12" opacity="0.12" />
        </>
      );
      break;
    case "thinking":
      mouthContent = <ellipse cx="45" cy="52" rx="4" ry="3.5" fill="#7c2d12" opacity="0.7" />;
      break;
    case "surprised":
      mouthContent = <ellipse cx="40" cy="54" rx="5" ry="6" fill="#7c2d12" opacity="0.7" />;
      break;
    case "confused":
      mouthContent = <path d="M 28 53 Q 34 49 40 53 Q 46 57 52 52" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      break;
    case "sleeping":
      mouthContent = <path d="M 30 52 Q 40 56 50 52" stroke="#7c2d12" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />;
      break;
    case "friendly":
    case "waving":
      mouthContent = (
        <>
          <path d="M 26 50 Q 40 60 54 50" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 26 50 Q 40 60 54 50 Z" fill="#7c2d12" opacity="0.08" />
        </>
      );
      break;
    default: // idle
      mouthContent = <path d="M 28 51 Q 40 56 52 51" stroke="#7c2d12" strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  }

  // --- Eyebrows ---
  let eyebrows: JSX.Element | null = null;
  if (emotion === "thinking") {
    eyebrows = (
      <>
        <line x1="23" y1="23" x2="35" y2="25.5" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="45" y1="24" x2="57" y2="22" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
      </>
    );
  } else if (emotion === "surprised") {
    eyebrows = (
      <>
        <path d="M 23 21 Q 30 17 37 22" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 43 22 Q 50 17 57 21" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    );
  } else if (emotion === "confused") {
    eyebrows = (
      <>
        <line x1="24" y1="26" x2="35" y2="22" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="45" y1="24" x2="56" y2="25" stroke="#92400E" strokeWidth="2.2" strokeLinecap="round" />
      </>
    );
  } else if (emotion === "excited" || emotion === "friendly" || emotion === "waving") {
    eyebrows = (
      <>
        <path d="M 23 23 Q 30 20 37 24" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M 43 24 Q 50 20 57 23" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
      </>
    );
  }

  // --- Body animation ---
  const bodyAnim = emotion === "excited"
    ? { y: [0, -8, 0], transition: { repeat: Infinity, duration: 0.45 } }
    : emotion === "waving"
    ? { rotate: [0, -4, 4, -2, 0], transition: { repeat: Infinity, duration: 1.1 } }
    : emotion === "thinking"
    ? { rotate: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 3 } }
    : emotion === "sleeping"
    ? { y: [0, 2, 0], rotate: [0, 1, 0, -1, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    : emotion === "surprised"
    ? { y: [0, -4, 0], transition: { repeat: 2, duration: 0.25 } }
    : emotion === "confused"
    ? { rotate: [0, -6, 6, -3, 0], transition: { repeat: Infinity, duration: 2.5 } }
    : { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };

  // Merge bounce trigger
  const bounceAnim = bounce
    ? { scale: [1, 1.18, 0.95, 1.05, 1], transition: { duration: 0.5 } }
    : {};

  // Face gradient: give a techy emerald tint for platform uniqueness
  const faceGrad1 = "#34d399"; // emerald-400
  const faceGrad2 = "#10b981"; // emerald-500
  const faceAccent = "#059669"; // emerald-600

  return (
    <motion.div
      animate={{ ...bodyAnim, ...bounceAnim }}
      onClick={onClick}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      className="cursor-pointer select-none relative"
      style={{ width: size, height: size }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.92 }}
    >
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <defs>
          <radialGradient id={`${uid}-face`} cx="45%" cy="38%" r="55%">
            <stop offset="0%" stopColor={faceGrad1} />
            <stop offset="100%" stopColor={faceGrad2} />
          </radialGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor="#6ee7b7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id={`${uid}-shadow`}>
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#065f46" floodOpacity="0.35" />
          </filter>
          <filter id={`${uid}-innerGlow`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle cx="40" cy="40" r="39" fill="none" stroke="#34d399" strokeWidth="1.5" opacity="0.18" />
        <circle cx="40" cy="40" r="38" fill="none" stroke="#6ee7b7" strokeWidth="0.5" opacity="0.12">
          <animate attributeName="r" values="37;39;37" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Main face */}
        <circle cx="40" cy="40" r="36" fill={`url(#${uid}-face)`} filter={`url(#${uid}-shadow)`} />
        <circle cx="40" cy="40" r="36" fill={`url(#${uid}-glow)`} />

        {/* Tech circuit lines (subtle) */}
        <path d="M 18 40 L 10 40" stroke="#a7f3d0" strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
        <path d="M 62 40 L 70 40" stroke="#a7f3d0" strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
        <path d="M 40 8 L 40 14" stroke="#a7f3d0" strokeWidth="0.7" opacity="0.15" strokeLinecap="round" />
        <circle cx="10" cy="40" r="1" fill="#a7f3d0" opacity="0.25" />
        <circle cx="70" cy="40" r="1" fill="#a7f3d0" opacity="0.25" />

        {/* Cheek blush */}
        <circle cx="17" cy="46" r="5.5" fill={faceAccent} opacity="0.2" />
        <circle cx="63" cy="46" r="5.5" fill={faceAccent} opacity="0.2" />

        {/* Left eye */}
        <g>
          {/* Eye white */}
          <ellipse cx="30" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 2)} fill="white" opacity="0.9" />
          {/* Pupil */}
          <ellipse cx={leftEyeCx} cy={eyeCy} rx={eyeRx - 1} ry={eyeRy} fill="#064e3b" />
          {/* Inner pupil */}
          {!blinkState && emotion !== "sleeping" && (
            <>
              <ellipse cx={leftEyeCx} cy={eyeCy} rx="2.5" ry="2.5" fill="#022c22" />
              <circle cx={leftEyeCx - 2} cy={eyeCy - 2} r="1.8" fill="white" opacity="0.85" />
              <circle cx={leftEyeCx + 1.5} cy={eyeCy + 1} r="0.8" fill="white" opacity="0.5" />
            </>
          )}
        </g>

        {/* Right eye */}
        <g>
          <ellipse cx="50" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 2)} fill="white" opacity="0.9" />
          <ellipse cx={rightEyeCx} cy={eyeCy} rx={eyeRx - 1} ry={eyeRy} fill="#064e3b" />
          {!blinkState && emotion !== "sleeping" && (
            <>
              <ellipse cx={rightEyeCx} cy={eyeCy} rx="2.5" ry="2.5" fill="#022c22" />
              <circle cx={rightEyeCx - 2} cy={eyeCy - 2} r="1.8" fill="white" opacity="0.85" />
              <circle cx={rightEyeCx + 1.5} cy={eyeCy + 1} r="0.8" fill="white" opacity="0.5" />
            </>
          )}
        </g>

        {/* Eyebrows */}
        {eyebrows}

        {/* Mouth */}
        {mouthContent}

        {/* Waving hand */}
        {emotion === "waving" && (
          <motion.g
            animate={{ rotate: [0, 25, -12, 25, 0] }}
            transition={{ repeat: Infinity, duration: 0.7 }}
            style={{ originX: "70px", originY: "18px" }}
          >
            <text x="62" y="20" fontSize="16" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>👋</text>
          </motion.g>
        )}

        {/* Thinking bubble dots */}
        {emotion === "thinking" && (
          <g>
            <motion.circle cx="65" cy="16" r="2" fill="#d1fae5"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -1, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
            />
            <motion.circle cx="71" cy="9" r="3" fill="#d1fae5"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -1.5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
            />
          </g>
        )}

        {/* Surprised stars */}
        {emotion === "surprised" && (
          <g>
            <motion.text x="8" y="18" fontSize="10" animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.2 }}>✨</motion.text>
            <motion.text x="62" y="12" fontSize="8" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>⚡</motion.text>
          </g>
        )}

        {/* Confused question mark */}
        {emotion === "confused" && (
          <motion.text x="60" y="16" fontSize="14" fill="#fbbf24"
            animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}
          >?</motion.text>
        )}

        {/* Sleeping Zzz */}
        {emotion === "sleeping" && (
          <g>
            <motion.text x="52" y="18" fontSize="10" fill="#6ee7b7" fontWeight="bold"
              animate={{ opacity: [0, 1, 0], y: [0, -6], x: [0, 3] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0 }}
            >z</motion.text>
            <motion.text x="58" y="12" fontSize="13" fill="#34d399" fontWeight="bold"
              animate={{ opacity: [0, 1, 0], y: [0, -8], x: [0, 4] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
            >Z</motion.text>
            <motion.text x="66" y="6" fontSize="16" fill="#10b981" fontWeight="bold"
              animate={{ opacity: [0, 1, 0], y: [0, -10], x: [0, 5] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >Z</motion.text>
          </g>
        )}

        {/* Antenna / tech dot on top */}
        <circle cx="40" cy="5" r="2" fill="#6ee7b7" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="40" y1="7" x2="40" y2="4" stroke="#6ee7b7" strokeWidth="1" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
