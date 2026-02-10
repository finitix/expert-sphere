import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

export type EmojiEmotion =
  | "friendly" | "thinking" | "excited" | "idle" | "waving"
  | "surprised" | "confused" | "sleeping"
  | "sad" | "cry" | "fear" | "angry" | "love" | "cool" | "laughing";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Blink
  useEffect(() => {
    if (emotion === "sleeping" || emotion === "cry") return;
    const blink = () => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    };
    const interval = setInterval(blink, 2500 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, [emotion]);

  // Mouse tracking for pupils
  useEffect(() => {
    if (emotion === "sleeping") return;
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPupilOffset({ x: ((e.clientX - cx) / cx) * 4, y: ((e.clientY - cy) / cy) * 3 });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [emotion]);

  const uid = `ea-${size}-${isDark ? "d" : "l"}`;

  // Theme-aware colors
  const colors = useMemo(() => {
    if (isDark) {
      return {
        face1: "#34d399", face2: "#10b981", accent: "#059669",
        eyeWhite: "white", pupil: "#064e3b", innerPupil: "#022c22",
        mouthStroke: "#064e3b", glow: "#6ee7b7", ring: "#34d399",
        cheekBlush: "#059669", circuit: "#a7f3d0", shadow: "#065f46",
        bgGlow: "rgba(52,211,153,0.08)",
      };
    }
    return {
      face1: "#fbbf24", face2: "#f59e0b", accent: "#d97706",
      eyeWhite: "white", pupil: "#451a03", innerPupil: "#1c0a00",
      mouthStroke: "#78350f", glow: "#fde68a", ring: "#f59e0b",
      cheekBlush: "#fb923c", circuit: "#fde68a", shadow: "#92400e",
      bgGlow: "rgba(251,191,36,0.1)",
    };
  }, [isDark]);

  // Eye config
  const eyeRx = 6;
  let eyeRy = blinkState ? 1 : 6;
  let leftEyeCx = 30 + pupilOffset.x;
  let rightEyeCx = 50 + pupilOffset.x;
  const eyeCy = 33 + pupilOffset.y * 0.5;

  if (emotion === "sleeping") { eyeRy = 1.5; leftEyeCx = 30; rightEyeCx = 50; }
  if (emotion === "surprised" || emotion === "fear") { eyeRy = blinkState ? 1 : 9; }
  if (emotion === "excited" || emotion === "laughing") { eyeRy = blinkState ? 1 : 7; }
  if (emotion === "cry") { eyeRy = 5; }
  if (emotion === "angry") { eyeRy = blinkState ? 1 : 5; }
  if (emotion === "cool") { eyeRy = blinkState ? 1 : 4; }
  if (emotion === "sad") { eyeRy = blinkState ? 1 : 5; }
  if (emotion === "love") { eyeRy = blinkState ? 1 : 7; }

  // Mouth
  let mouthContent: JSX.Element;
  const ms = colors.mouthStroke;
  switch (emotion) {
    case "excited":
    case "laughing":
      mouthContent = (
        <>
          <path d="M 22 48 Q 40 66 58 48" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 22 48 Q 40 66 58 48 Z" fill={ms} opacity="0.1" />
          {emotion === "laughing" && <path d="M 30 52 Q 40 58 50 52" fill={ms} opacity="0.15" />}
        </>
      );
      break;
    case "thinking":
      mouthContent = <ellipse cx="45" cy="52" rx="4" ry="3.5" fill={ms} opacity="0.7" />;
      break;
    case "surprised":
      mouthContent = <ellipse cx="40" cy="55" rx="6" ry="7" fill={ms} opacity="0.6" />;
      break;
    case "confused":
      mouthContent = <path d="M 28 53 Q 34 49 40 53 Q 46 57 52 52" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      break;
    case "sleeping":
      mouthContent = <path d="M 30 52 Q 40 56 50 52" stroke={ms} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />;
      break;
    case "sad":
      mouthContent = <path d="M 28 56 Q 40 48 52 56" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      break;
    case "cry":
      mouthContent = (
        <>
          <path d="M 26 57 Q 40 46 54 57" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          {/* Tears */}
          <motion.ellipse cx="22" cy="42" rx="2" ry="3" fill="#38bdf8" opacity="0.7"
            animate={{ y: [0, 15, 0], opacity: [0.7, 0, 0.7] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }} />
          <motion.ellipse cx="58" cy="42" rx="2" ry="3" fill="#38bdf8" opacity="0.7"
            animate={{ y: [0, 15, 0], opacity: [0.7, 0, 0.7] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} />
        </>
      );
      break;
    case "fear":
      mouthContent = (
        <>
          <path d="M 28 55 Q 34 50 40 55 Q 46 50 52 55" stroke={ms} strokeWidth="2" fill="none" strokeLinecap="round" />
          <motion.g animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 0.3 }}>
            <line x1="15" y1="32" x2="12" y2="28" stroke={colors.glow} strokeWidth="1.5" opacity="0.5" />
            <line x1="65" y1="32" x2="68" y2="28" stroke={colors.glow} strokeWidth="1.5" opacity="0.5" />
          </motion.g>
        </>
      );
      break;
    case "angry":
      mouthContent = (
        <>
          <path d="M 28 54 L 36 52 L 44 54 L 52 52" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <motion.circle cx="15" cy="24" r="3" fill="#ef4444" opacity="0.4"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 0.8 }} />
          <motion.circle cx="65" cy="24" r="3" fill="#ef4444" opacity="0.4"
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
        </>
      );
      break;
    case "love":
      mouthContent = (
        <>
          <path d="M 26 50 Q 40 62 54 50" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <motion.text x="6" y="18" fontSize="10" animate={{ y: [0, -8, 0], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 2 }}>❤️</motion.text>
          <motion.text x="62" y="14" fontSize="8" animate={{ y: [0, -6, 0], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.6 }}>💕</motion.text>
        </>
      );
      break;
    case "cool":
      mouthContent = <path d="M 28 52 Q 40 58 52 52" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
      break;
    case "friendly":
    case "waving":
      mouthContent = (
        <>
          <path d="M 26 50 Q 40 60 54 50" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M 26 50 Q 40 60 54 50 Z" fill={ms} opacity="0.08" />
        </>
      );
      break;
    default:
      mouthContent = <path d="M 28 51 Q 40 56 52 51" stroke={ms} strokeWidth="2.5" fill="none" strokeLinecap="round" />;
  }

  // Eyebrows
  let eyebrows: JSX.Element | null = null;
  const ebColor = isDark ? "#065f46" : "#92400E";
  if (emotion === "thinking") {
    eyebrows = (<><line x1="23" y1="23" x2="35" y2="26" stroke={ebColor} strokeWidth="2.2" strokeLinecap="round" /><line x1="45" y1="24" x2="57" y2="22" stroke={ebColor} strokeWidth="2.2" strokeLinecap="round" /></>);
  } else if (emotion === "surprised" || emotion === "fear") {
    eyebrows = (<><path d="M 23 19 Q 30 14 37 20" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M 43 20 Q 50 14 57 19" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /></>);
  } else if (emotion === "confused") {
    eyebrows = (<><line x1="24" y1="26" x2="35" y2="22" stroke={ebColor} strokeWidth="2.2" strokeLinecap="round" /><line x1="45" y1="24" x2="56" y2="25" stroke={ebColor} strokeWidth="2.2" strokeLinecap="round" /></>);
  } else if (emotion === "angry") {
    eyebrows = (<><line x1="22" y1="27" x2="36" y2="22" stroke={ebColor} strokeWidth="2.8" strokeLinecap="round" /><line x1="44" y1="22" x2="58" y2="27" stroke={ebColor} strokeWidth="2.8" strokeLinecap="round" /></>);
  } else if (emotion === "sad" || emotion === "cry") {
    eyebrows = (<><path d="M 23 24 Q 30 27 37 25" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M 43 25 Q 50 27 57 24" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /></>);
  } else if (["excited", "friendly", "waving", "love", "laughing"].includes(emotion)) {
    eyebrows = (<><path d="M 23 23 Q 30 20 37 24" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /><path d="M 43 24 Q 50 20 57 23" stroke={ebColor} strokeWidth="2" fill="none" strokeLinecap="round" /></>);
  }

  // Body animation - head tilt and body sway
  const bodyAnims: Record<string, object> = {
    excited: { y: [0, -8, 0], rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 0.5 } },
    waving: { rotate: [0, -5, 5, -3, 0], transition: { repeat: Infinity, duration: 1.1 } },
    thinking: { rotate: [0, 5, 0, -5, 0], x: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 3 } },
    sleeping: { y: [0, 3, 0], rotate: [0, 2, 0, -2, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    surprised: { y: [0, -6, 0], scale: [1, 1.08, 1], transition: { repeat: 2, duration: 0.3 } },
    confused: { rotate: [0, -8, 8, -4, 0], x: [0, -2, 2, 0], transition: { repeat: Infinity, duration: 2.5 } },
    sad: { y: [0, 2, 0], rotate: [0, -2, 0], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } },
    cry: { y: [0, 1, 0], rotate: [0, -1, 1, 0], transition: { repeat: Infinity, duration: 1.5 } },
    fear: { x: [0, -3, 3, -2, 2, 0], transition: { repeat: Infinity, duration: 0.6 } },
    angry: { rotate: [0, -2, 2, -2, 0], y: [0, -1, 0], transition: { repeat: Infinity, duration: 0.5 } },
    love: { y: [0, -4, 0], scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1.5, ease: "easeInOut" } },
    cool: { rotate: [0, 2, -2, 0], transition: { repeat: Infinity, duration: 4 } },
    laughing: { y: [0, -5, 0, -3, 0], rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 0.6 } },
    friendly: { y: [0, -2, 0], rotate: [0, 1, -1, 0], transition: { repeat: Infinity, duration: 2 } },
    idle: { y: [0, -2, 0], transition: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } },
  };

  const bodyAnim = bodyAnims[emotion] || bodyAnims.idle;
  const bounceAnim = bounce ? { scale: [1, 1.18, 0.95, 1.05, 1], transition: { duration: 0.5 } } : {};

  // Cool sunglasses overlay
  const coolGlasses = emotion === "cool" && (
    <g>
      <rect x="21" y="28" width="18" height="11" rx="3" fill="#1e293b" opacity="0.85" />
      <rect x="41" y="28" width="18" height="11" rx="3" fill="#1e293b" opacity="0.85" />
      <line x1="39" y1="33" x2="41" y2="33" stroke="#1e293b" strokeWidth="2" />
      <line x1="21" y1="33" x2="16" y2="30" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="59" y1="33" x2="64" y2="30" stroke="#1e293b" strokeWidth="1.5" />
      <motion.rect x="22" y="29" width="6" height="3" rx="1" fill="white" opacity="0.3"
        animate={{ opacity: [0.15, 0.4, 0.15] }} transition={{ repeat: Infinity, duration: 2 }} />
    </g>
  );

  // Love eyes (hearts instead of normal eyes)
  const renderEyes = emotion === "love" ? (
    <>
      <motion.text x="22" y="40" fontSize="14" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>❤️</motion.text>
      <motion.text x="44" y="40" fontSize="14" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>❤️</motion.text>
    </>
  ) : (
    <>
      {/* Left eye */}
      <g>
        <ellipse cx="30" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 2)} fill={colors.eyeWhite} opacity="0.9" />
        <ellipse cx={leftEyeCx} cy={eyeCy} rx={eyeRx - 1} ry={eyeRy} fill={colors.pupil} />
        {!blinkState && emotion !== "sleeping" && (
          <>
            <ellipse cx={leftEyeCx} cy={eyeCy} rx="2.5" ry="2.5" fill={colors.innerPupil} />
            <circle cx={leftEyeCx - 2} cy={eyeCy - 2} r="1.8" fill="white" opacity="0.85" />
            <circle cx={leftEyeCx + 1.5} cy={eyeCy + 1} r="0.8" fill="white" opacity="0.5" />
          </>
        )}
      </g>
      {/* Right eye */}
      <g>
        <ellipse cx="50" cy={eyeCy} rx={eyeRx + 1} ry={Math.max(eyeRy + 1, 2)} fill={colors.eyeWhite} opacity="0.9" />
        <ellipse cx={rightEyeCx} cy={eyeCy} rx={eyeRx - 1} ry={eyeRy} fill={colors.pupil} />
        {!blinkState && emotion !== "sleeping" && (
          <>
            <ellipse cx={rightEyeCx} cy={eyeCy} rx="2.5" ry="2.5" fill={colors.innerPupil} />
            <circle cx={rightEyeCx - 2} cy={eyeCy - 2} r="1.8" fill="white" opacity="0.85" />
            <circle cx={rightEyeCx + 1.5} cy={eyeCy + 1} r="0.8" fill="white" opacity="0.5" />
          </>
        )}
      </g>
    </>
  );

  // Waving hand
  const wavingHand = (emotion === "waving" || emotion === "friendly") && (
    <motion.g
      animate={{ rotate: [0, 25, -12, 25, 0] }}
      transition={{ repeat: Infinity, duration: 0.7 }}
      style={{ originX: "70px", originY: "18px" }}
    >
      <text x="62" y="20" fontSize="16" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))" }}>👋</text>
    </motion.g>
  );

  // Thinking dots
  const thinkingDots = emotion === "thinking" && (
    <g>
      <motion.circle cx="65" cy="16" r="2" fill={colors.glow}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} />
      <motion.circle cx="71" cy="9" r="3" fill={colors.glow}
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -1.5, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }} />
    </g>
  );

  // Surprised stars
  const surprisedStars = emotion === "surprised" && (
    <g>
      <motion.text x="8" y="18" fontSize="10" animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ repeat: Infinity, duration: 1.2 }}>✨</motion.text>
      <motion.text x="62" y="12" fontSize="8" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>⚡</motion.text>
    </g>
  );

  // Confused question mark
  const confusedMark = emotion === "confused" && (
    <motion.text x="60" y="16" fontSize="14" fill="#fbbf24"
      animate={{ rotate: [0, 10, -10, 0], y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}
      style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))" }}>?</motion.text>
  );

  // Sleeping Zzz
  const sleepingZzz = emotion === "sleeping" && (
    <g>
      <motion.text x="52" y="18" fontSize="10" fill={colors.glow} fontWeight="bold"
        animate={{ opacity: [0, 1, 0], y: [0, -6], x: [0, 3] }} transition={{ repeat: Infinity, duration: 2 }}>z</motion.text>
      <motion.text x="58" y="12" fontSize="13" fill={colors.face1} fontWeight="bold"
        animate={{ opacity: [0, 1, 0], y: [0, -8], x: [0, 4] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>Z</motion.text>
      <motion.text x="66" y="6" fontSize="16" fill={colors.face2} fontWeight="bold"
        animate={{ opacity: [0, 1, 0], y: [0, -10], x: [0, 5] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }}>Z</motion.text>
    </g>
  );

  // Angry steam
  const angrySteam = emotion === "angry" && (
    <g>
      <motion.text x="6" y="14" fontSize="10" animate={{ y: [0, -5, 0], opacity: [0.4, 0.9, 0.4] }} transition={{ repeat: Infinity, duration: 0.8 }}>💢</motion.text>
      <motion.text x="64" y="10" fontSize="8" animate={{ y: [0, -4, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.3 }}>💢</motion.text>
    </g>
  );

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
            <stop offset="0%" stopColor={colors.face1} />
            <stop offset="100%" stopColor={colors.face2} />
          </radialGradient>
          <radialGradient id={`${uid}-glow`} cx="50%" cy="35%" r="50%">
            <stop offset="0%" stopColor={colors.glow} stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id={`${uid}-shadow`}>
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor={colors.shadow} floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Glow ring */}
        <circle cx="40" cy="40" r="39" fill="none" stroke={colors.ring} strokeWidth="1.5" opacity="0.18" />
        <circle cx="40" cy="40" r="38" fill="none" stroke={colors.glow} strokeWidth="0.5" opacity="0.12">
          <animate attributeName="r" values="37;39;37" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.12;0.22;0.12" dur="3s" repeatCount="indefinite" />
        </circle>

        {/* Face */}
        <circle cx="40" cy="40" r="36" fill={`url(#${uid}-face)`} filter={`url(#${uid}-shadow)`} />
        <circle cx="40" cy="40" r="36" fill={`url(#${uid}-glow)`} />

        {/* Circuit lines */}
        <path d="M 18 40 L 10 40" stroke={colors.circuit} strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
        <path d="M 62 40 L 70 40" stroke={colors.circuit} strokeWidth="0.7" opacity="0.2" strokeLinecap="round" />
        <path d="M 40 8 L 40 14" stroke={colors.circuit} strokeWidth="0.7" opacity="0.15" strokeLinecap="round" />
        <circle cx="10" cy="40" r="1" fill={colors.circuit} opacity="0.25" />
        <circle cx="70" cy="40" r="1" fill={colors.circuit} opacity="0.25" />

        {/* Cheek blush */}
        <circle cx="17" cy="46" r="5.5" fill={colors.cheekBlush} opacity="0.2" />
        <circle cx="63" cy="46" r="5.5" fill={colors.cheekBlush} opacity="0.2" />

        {/* Eyes */}
        {renderEyes}
        {coolGlasses}

        {/* Eyebrows */}
        {eyebrows}

        {/* Mouth */}
        {mouthContent}

        {/* Emotion effects */}
        {wavingHand}
        {thinkingDots}
        {surprisedStars}
        {confusedMark}
        {sleepingZzz}
        {angrySteam}

        {/* Antenna */}
        <circle cx="40" cy="5" r="2" fill={colors.glow} opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <line x1="40" y1="7" x2="40" y2="4" stroke={colors.glow} strokeWidth="1" opacity="0.4" />
      </svg>
    </motion.div>
  );
}
