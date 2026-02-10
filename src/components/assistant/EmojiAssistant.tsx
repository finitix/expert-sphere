import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export type EmojiEmotion =
  | "friendly"
  | "thinking"
  | "excited"
  | "idle"
  | "waving"
  | "surprised"
  | "confused"
  | "sleeping"
  | "laughing"
  | "love"
  | "cool";

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

  useEffect(() => {
    if (emotion === "sleeping") return;
    const blink = () => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    };
    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [emotion]);

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

  const uid = `ea-${size}-${emotion}`;
  const eyeCy = 28;
  const eyeRx = 5;
  let eyeRy = blinkState ? 0.8 : 5;
  let leftPx = pupilOffset.x;
  let rightPx = pupilOffset.x;

  if (emotion === "sleeping") { eyeRy = 1.2; leftPx = 0; rightPx = 0; }
  if (emotion === "surprised") eyeRy = blinkState ? 0.8 : 7.5;
  if (emotion === "excited" || emotion === "love") eyeRy = blinkState ? 0.8 : 6;
  if (emotion === "cool") eyeRy = blinkState ? 0.8 : 3;

  // Mouth
  let mouth: JSX.Element;
  switch (emotion) {
    case "excited":
    case "laughing":
      mouth = (
        <>
          <path d="M 22 42 Q 35 56 48 42" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 22 42 Q 35 56 48 42 Z" fill="#065f46" opacity="0.15" />
        </>
      );
      break;
    case "thinking":
      mouth = <ellipse cx="40" cy="44" rx="3.5" ry="3" fill="#065f46" opacity="0.6" />;
      break;
    case "surprised":
      mouth = <ellipse cx="35" cy="45" rx="4.5" ry="5.5" fill="#065f46" opacity="0.6" />;
      break;
    case "confused":
      mouth = <path d="M 24 44 Q 30 40 35 44 Q 40 48 46 43" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />;
      break;
    case "sleeping":
      mouth = <path d="M 27 43 Q 35 47 43 43" stroke="#065f46" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.4" />;
      break;
    case "love":
      mouth = <path d="M 24 43 Q 35 54 46 43" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />;
      break;
    case "cool":
      mouth = <path d="M 26 44 Q 35 48 44 44" stroke="#065f46" strokeWidth="2.2" fill="none" strokeLinecap="round" />;
      break;
    case "friendly":
    case "waving":
      mouth = (
        <>
          <path d="M 24 42 Q 35 52 46 42" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M 24 42 Q 35 52 46 42 Z" fill="#065f46" opacity="0.07" />
        </>
      );
      break;
    default:
      mouth = <path d="M 26 43 Q 35 48 44 43" stroke="#065f46" strokeWidth="2" fill="none" strokeLinecap="round" />;
  }

  // Eyebrows
  let eyebrows: JSX.Element | null = null;
  if (emotion === "thinking" || emotion === "confused") {
    eyebrows = (
      <>
        <line x1="20" y1="19" x2="30" y2="21" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="40" y1="20" x2="50" y2="18" stroke="#047857" strokeWidth="1.8" strokeLinecap="round" />
      </>
    );
  } else if (emotion === "surprised") {
    eyebrows = (
      <>
        <path d="M 20 17 Q 25 13 32 18" stroke="#047857" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M 38 18 Q 45 13 50 17" stroke="#047857" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </>
    );
  } else if (emotion !== "sleeping" && emotion !== "cool") {
    eyebrows = (
      <>
        <path d="M 20 19 Q 25 17 32 20" stroke="#047857" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M 38 20 Q 45 17 50 19" stroke="#047857" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>
    );
  }

  // --- Arm animations ---
  const leftArmAnim = emotion === "waving"
    ? { rotate: [0, -40, -20, -40, 0], transition: { repeat: Infinity, duration: 0.8 } }
    : emotion === "excited" || emotion === "laughing"
    ? { rotate: [0, -25, 0, -25, 0], transition: { repeat: Infinity, duration: 0.6 } }
    : emotion === "thinking"
    ? { rotate: [0, -15, 0], transition: { repeat: Infinity, duration: 3 } }
    : emotion === "surprised"
    ? { rotate: [0, -30, 0], transition: { repeat: 2, duration: 0.3 } }
    : emotion === "love"
    ? { rotate: [0, -20, 0], transition: { repeat: Infinity, duration: 1.5 } }
    : emotion === "sleeping"
    ? { rotate: [5, 8, 5], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    : { rotate: [0, -5, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };

  const rightArmAnim = emotion === "waving"
    ? { rotate: [0, 45, 20, 45, 0], transition: { repeat: Infinity, duration: 0.7 } }
    : emotion === "excited" || emotion === "laughing"
    ? { rotate: [0, 30, 0, 30, 0], transition: { repeat: Infinity, duration: 0.55 } }
    : emotion === "thinking"
    ? { rotate: [10, 25, 10], transition: { repeat: Infinity, duration: 2.5 } }
    : emotion === "surprised"
    ? { rotate: [0, 35, 0], transition: { repeat: 2, duration: 0.3 } }
    : emotion === "love"
    ? { rotate: [0, 20, 0], transition: { repeat: Infinity, duration: 1.5, delay: 0.2 } }
    : emotion === "sleeping"
    ? { rotate: [-5, -8, -5], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    : { rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };

  // Head tilt
  const headAnim = emotion === "thinking"
    ? { rotate: [0, 6, 0, -4, 0], transition: { repeat: Infinity, duration: 3.5 } }
    : emotion === "confused"
    ? { rotate: [0, -8, 8, -5, 0], transition: { repeat: Infinity, duration: 2.2 } }
    : emotion === "sleeping"
    ? { rotate: [0, 4, 0, -2, 0], y: [0, 2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    : emotion === "excited" || emotion === "laughing"
    ? { y: [0, -4, 0], transition: { repeat: Infinity, duration: 0.4 } }
    : emotion === "surprised"
    ? { y: [0, -5, 0], transition: { repeat: 2, duration: 0.25 } }
    : emotion === "love"
    ? { rotate: [0, 3, -3, 0], transition: { repeat: Infinity, duration: 2 } }
    : { y: [0, -1.5, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } };

  // Body sway
  const bodyAnim = emotion === "excited" || emotion === "laughing"
    ? { y: [0, -3, 0], transition: { repeat: Infinity, duration: 0.5 } }
    : emotion === "sleeping"
    ? { y: [0, 1.5, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } }
    : emotion === "waving"
    ? { rotate: [0, -2, 2, 0], transition: { repeat: Infinity, duration: 1 } }
    : emotion === "love"
    ? { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1.2 } }
    : { y: [0, -1, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } };

  const bounceAnim = bounce ? { scale: [1, 1.18, 0.95, 1.05, 1], transition: { duration: 0.5 } } : {};

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
      <svg viewBox="0 0 70 100" width={size} height={size}>
        <defs>
          <radialGradient id={`${uid}-face`} cx="45%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </radialGradient>
          <radialGradient id={`${uid}-body`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </radialGradient>
          <filter id={`${uid}-shadow`}>
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#065f46" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* === BODY / TORSO === */}
        <motion.g animate={bodyAnim}>
          {/* Torso */}
          <rect x="20" y="55" width="30" height="24" rx="10" fill={`url(#${uid}-body)`} />
          {/* Belly circle detail */}
          <circle cx="35" cy="66" r="5" fill="#10b981" opacity="0.3" />
          <circle cx="35" cy="66" r="2.5" fill="#6ee7b7" opacity="0.25">
            <animate attributeName="opacity" values="0.15;0.4;0.15" dur="2s" repeatCount="indefinite" />
          </circle>

          {/* === LEFT ARM === */}
          <motion.g
            animate={leftArmAnim}
            style={{ originX: "20px", originY: "58px" }}
          >
            {/* Upper arm */}
            <rect x="6" y="56" width="16" height="7" rx="3.5" fill="#059669" />
            {/* Lower arm */}
            <rect x="2" y="56" width="8" height="6" rx="3" fill="#10b981" />
            {/* Hand */}
            <circle cx="3" cy="59" r="4" fill="#34d399" />
            {/* Fingers */}
            <circle cx="0.5" cy="57" r="1.5" fill="#6ee7b7" />
            <circle cx="0" cy="59.5" r="1.3" fill="#6ee7b7" />
            <circle cx="0.5" cy="62" r="1.3" fill="#6ee7b7" />
          </motion.g>

          {/* === RIGHT ARM === */}
          <motion.g
            animate={rightArmAnim}
            style={{ originX: "50px", originY: "58px" }}
          >
            <rect x="48" y="56" width="16" height="7" rx="3.5" fill="#059669" />
            <rect x="60" y="56" width="8" height="6" rx="3" fill="#10b981" />
            <circle cx="67" cy="59" r="4" fill="#34d399" />
            <circle cx="69.5" cy="57" r="1.5" fill="#6ee7b7" />
            <circle cx="70" cy="59.5" r="1.3" fill="#6ee7b7" />
            <circle cx="69.5" cy="62" r="1.3" fill="#6ee7b7" />
          </motion.g>

          {/* Legs / feet */}
          <rect x="24" y="76" width="9" height="10" rx="4" fill="#047857" />
          <rect x="37" y="76" width="9" height="10" rx="4" fill="#047857" />
          <ellipse cx="28" cy="87" rx="6" ry="2.5" fill="#065f46" />
          <ellipse cx="42" cy="87" rx="6" ry="2.5" fill="#065f46" />
        </motion.g>

        {/* === HEAD === */}
        <motion.g animate={headAnim} style={{ originX: "35px", originY: "50px" }}>
          {/* Neck */}
          <rect x="30" y="48" width="10" height="8" rx="4" fill="#059669" />

          {/* Glow ring */}
          <circle cx="35" cy="30" r="27" fill="none" stroke="#6ee7b7" strokeWidth="0.8" opacity="0.15">
            <animate attributeName="r" values="26;28;26" dur="3s" repeatCount="indefinite" />
          </circle>

          {/* Head */}
          <circle cx="35" cy="30" r="24" fill={`url(#${uid}-face)`} filter={`url(#${uid}-shadow)`} />

          {/* Tech lines on head */}
          <path d="M 14 30 L 8 30" stroke="#a7f3d0" strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
          <path d="M 56 30 L 62 30" stroke="#a7f3d0" strokeWidth="0.6" opacity="0.2" strokeLinecap="round" />
          <circle cx="8" cy="30" r="0.8" fill="#a7f3d0" opacity="0.3" />
          <circle cx="62" cy="30" r="0.8" fill="#a7f3d0" opacity="0.3" />

          {/* Antenna */}
          <line x1="35" y1="7" x2="35" y2="3" stroke="#6ee7b7" strokeWidth="1.2" opacity="0.5" />
          <circle cx="35" cy="2" r="2" fill="#6ee7b7" opacity="0.7">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite" />
          </circle>

          {/* Cheeks */}
          <circle cx="15" cy="36" r="4" fill="#059669" opacity="0.2" />
          <circle cx="55" cy="36" r="4" fill="#059669" opacity="0.2" />
          {emotion === "love" && (
            <>
              <circle cx="15" cy="36" r="4.5" fill="#f472b6" opacity="0.35" />
              <circle cx="55" cy="36" r="4.5" fill="#f472b6" opacity="0.35" />
            </>
          )}

          {/* === EYES === */}
          {emotion === "cool" ? (
            /* Sunglasses */
            <>
              <rect x="17" y="24" x2="32" width="15" height="8" rx="3" fill="#1a1a2e" opacity="0.85" />
              <rect x="38" y="24" width="15" height="8" rx="3" fill="#1a1a2e" opacity="0.85" />
              <line x1="32" y1="28" x2="38" y2="28" stroke="#1a1a2e" strokeWidth="1.5" />
              <rect x="18" y="25" width="5" height="2" rx="1" fill="white" opacity="0.15" />
              <rect x="39" y="25" width="5" height="2" rx="1" fill="white" opacity="0.15" />
            </>
          ) : emotion === "love" ? (
            /* Heart eyes */
            <>
              <motion.text x="18" y="33" fontSize="14"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
              >❤️</motion.text>
              <motion.text x="40" y="33" fontSize="14"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.8, delay: 0.15 }}
              >❤️</motion.text>
            </>
          ) : (
            <>
              {/* Left eye */}
              <ellipse cx="26" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 1.5)} fill="white" opacity="0.92" />
              <ellipse cx={26 + leftPx} cy={eyeCy} rx={eyeRx - 1.2} ry={eyeRy} fill="#064e3b" />
              {!blinkState && emotion !== "sleeping" && (
                <>
                  <ellipse cx={26 + leftPx} cy={eyeCy} rx="2" ry="2" fill="#022c22" />
                  <circle cx={24 + leftPx * 0.4} cy={eyeCy - 2} r="1.5" fill="white" opacity="0.85" />
                  <circle cx={27 + leftPx * 0.4} cy={eyeCy + 1} r="0.7" fill="white" opacity="0.4" />
                </>
              )}
              {/* Right eye */}
              <ellipse cx="44" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 1.5)} fill="white" opacity="0.92" />
              <ellipse cx={44 + rightPx} cy={eyeCy} rx={eyeRx - 1.2} ry={eyeRy} fill="#064e3b" />
              {!blinkState && emotion !== "sleeping" && (
                <>
                  <ellipse cx={44 + rightPx} cy={eyeCy} rx="2" ry="2" fill="#022c22" />
                  <circle cx={42 + rightPx * 0.4} cy={eyeCy - 2} r="1.5" fill="white" opacity="0.85" />
                  <circle cx={45 + rightPx * 0.4} cy={eyeCy + 1} r="0.7" fill="white" opacity="0.4" />
                </>
              )}
            </>
          )}

          {/* Eyebrows */}
          {eyebrows}

          {/* Mouth */}
          {mouth}

          {/* === EMOTION EXTRAS === */}
          {emotion === "waving" && (
            <motion.text x="58" y="15" fontSize="12"
              animate={{ rotate: [0, 25, -12, 25, 0] }}
              transition={{ repeat: Infinity, duration: 0.7 }}
            >👋</motion.text>
          )}

          {emotion === "thinking" && (
            <g>
              <motion.circle cx="56" cy="12" r="1.8" fill="#d1fae5"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <motion.circle cx="61" cy="6" r="2.5" fill="#d1fae5"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              />
            </g>
          )}

          {emotion === "surprised" && (
            <g>
              <motion.text x="5" y="14" fontSize="8" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>✨</motion.text>
              <motion.text x="56" y="10" fontSize="7" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>⚡</motion.text>
            </g>
          )}

          {emotion === "confused" && (
            <motion.text x="54" y="14" fontSize="12" fill="#fbbf24"
              animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >?</motion.text>
          )}

          {emotion === "sleeping" && (
            <g>
              <motion.text x="48" y="14" fontSize="8" fill="#6ee7b7" fontWeight="bold"
                animate={{ opacity: [0, 1, 0], y: [0, -5], x: [0, 2] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >z</motion.text>
              <motion.text x="54" y="8" fontSize="11" fill="#34d399" fontWeight="bold"
                animate={{ opacity: [0, 1, 0], y: [0, -7], x: [0, 3] }}
                transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              >Z</motion.text>
              <motion.text x="61" y="2" fontSize="14" fill="#10b981" fontWeight="bold"
                animate={{ opacity: [0, 1, 0], y: [0, -9], x: [0, 4] }}
                transition={{ repeat: Infinity, duration: 2, delay: 1 }}
              >Z</motion.text>
            </g>
          )}

          {emotion === "laughing" && (
            <g>
              <motion.text x="3" y="12" fontSize="7" animate={{ opacity: [0, 1, 0], y: [0, -4] }} transition={{ repeat: Infinity, duration: 0.8 }}>😂</motion.text>
              <motion.text x="58" y="10" fontSize="6" animate={{ opacity: [0, 1, 0], y: [0, -3] }} transition={{ repeat: Infinity, duration: 0.9, delay: 0.3 }}>✨</motion.text>
            </g>
          )}

          {emotion === "love" && (
            <g>
              <motion.text x="4" y="14" fontSize="8" animate={{ opacity: [0, 1, 0], y: [0, -6] }} transition={{ repeat: Infinity, duration: 1.5 }}>💕</motion.text>
              <motion.text x="56" y="10" fontSize="7" animate={{ opacity: [0, 1, 0], y: [0, -5] }} transition={{ repeat: Infinity, duration: 1.8, delay: 0.5 }}>💗</motion.text>
            </g>
          )}
        </motion.g>
      </svg>
    </motion.div>
  );
}
