import { useState, useEffect, useCallback, useRef } from "react";
import { EmojiAssistant } from "./EmojiAssistant";
import { ChatPanel } from "./ChatPanel";
import { MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// Particle trail component
function ParticleTrail({ active, color }) {
    const [particles, setParticles] = useState([]);
    const counter = useRef(0);
    useEffect(() => {
        if (!active) {
            setParticles([]);
            return;
        }
        const interval = setInterval(() => {
            counter.current++;
            setParticles(prev => {
                const next = [...prev, { id: counter.current, x: Math.random() * 40 - 20, y: Math.random() * 20 }];
                return next.slice(-6);
            });
        }, 400);
        return () => clearInterval(interval);
    }, [active]);
    return (<AnimatePresence>
      {particles.map(p => (<motion.div key={p.id} initial={{ opacity: 0.8, scale: 1, x: 48 + p.x, y: 48 + p.y }} animate={{ opacity: 0, scale: 0.3, y: 48 + p.y + 30 }} exit={{ opacity: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="absolute pointer-events-none rounded-full" style={{ width: 6, height: 6, background: color, filter: "blur(1px)" }}/>))}
    </AnimatePresence>);
}
const MICRO_MESSAGES = [
    "Need help? 👋",
    "I'm here if you need me.",
    "Ask me anything!",
    "Need help choosing a trainer?",
    "I can guide you in 30 seconds.",
    "Let me help you get started.",
    "Feeling stuck? I've got you! 💪",
    "Want to see something cool? 😎",
];
const ALL_MOODS = [
    "idle", "friendly", "waving", "cool", "excited", "thinking", "love",
    "laughing", "surprised", "confused", "sad", "sleeping", "fear", "angry", "cry",
];
// Roaming positions (percentage-based for responsiveness)
const ROAM_POSITIONS = [
    { bottom: 24, right: 24 },
    { bottom: 24, right: 120 },
    { bottom: 120, right: 24 },
    { bottom: 80, right: 80 },
    { bottom: 24, right: 200 },
    { bottom: 160, right: 24 },
    { bottom: 24, right: 24 }, // home
];
export function AssistantOverlay() {
    // Only show hero on first-ever visit; skip on reloads/other pages
    const hasSeenHero = useRef(sessionStorage.getItem("assistant_hero_seen") === "true");
    const [phase, setPhase] = useState(hasSeenHero.current ? "mini" : "hero");
    const [emotion, setEmotion] = useState(hasSeenHero.current ? "idle" : "waving");
    const [chatOpen, setChatOpen] = useState(false);
    const [microMessage, setMicroMessage] = useState("");
    const [showMicro, setShowMicro] = useState(false);
    const [heroText, setHeroText] = useState("");
    const [heroVisible, setHeroVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);
    const [bouncing, setBouncing] = useState(false);
    const [roamPos, setRoamPos] = useState(ROAM_POSITIONS[0]);
    const [autoMoodIdx, setAutoMoodIdx] = useState(0);
    const [isRoaming, setIsRoaming] = useState(false);
    const prevRoamPos = useRef(ROAM_POSITIONS[0]);
    const fullText = "Welcome.\nYou're not just posting a ticket.\nYou're starting a solution.";
    // Typewriter effect
    useEffect(() => {
        if (phase !== "hero")
            return;
        let i = 0;
        const interval = setInterval(() => {
            if (i <= fullText.length) {
                setHeroText(fullText.slice(0, i));
                i++;
            }
            else {
                clearInterval(interval);
            }
        }, 40);
        return () => clearInterval(interval);
    }, [phase]);
    // Hero → morph after 6 seconds (only runs if phase started as "hero")
    useEffect(() => {
        if (hasSeenHero.current)
            return;
        const timer = setTimeout(() => {
            setPhase("morphing");
            setEmotion("idle");
            sessionStorage.setItem("assistant_hero_seen", "true");
            setTimeout(() => {
                setPhase("mini");
                setHeroVisible(false);
            }, 1200);
        }, 6000);
        return () => clearTimeout(timer);
    }, []);
    // Micro messages in mini mode (with bounce)
    useEffect(() => {
        if (phase !== "mini" || chatOpen)
            return;
        const show = () => {
            const msg = MICRO_MESSAGES[Math.floor(Math.random() * MICRO_MESSAGES.length)];
            setMicroMessage(msg);
            setShowMicro(true);
            setBouncing(true);
            setTimeout(() => setBouncing(false), 600);
            setTimeout(() => setShowMicro(false), 4000);
        };
        const first = setTimeout(show, 3000);
        const interval = setInterval(show, 18000 + Math.random() * 12000);
        return () => { clearTimeout(first); clearInterval(interval); };
    }, [phase, chatOpen]);
    // Random mood changes in mini mode (not sequential)
    useEffect(() => {
        if (phase !== "mini" || chatOpen)
            return;
        const changeMood = () => {
            const randomMood = ALL_MOODS[Math.floor(Math.random() * ALL_MOODS.length)];
            setEmotion(randomMood);
        };
        const interval = setInterval(changeMood, 5000 + Math.random() * 6000);
        return () => clearInterval(interval);
    }, [phase, chatOpen]);
    // Roaming movement in mini mode
    useEffect(() => {
        if (phase !== "mini" || chatOpen)
            return;
        const roam = () => {
            const pos = ROAM_POSITIONS[Math.floor(Math.random() * ROAM_POSITIONS.length)];
            prevRoamPos.current = roamPos;
            setIsRoaming(true);
            setRoamPos(pos);
            setTimeout(() => setIsRoaming(false), 2500);
        };
        const interval = setInterval(roam, 12000 + Math.random() * 8000);
        return () => clearInterval(interval);
    }, [phase, chatOpen, roamPos]);
    const handleEmotionChange = useCallback((e) => {
        setEmotion(e);
    }, []);
    // Hero mode
    if (phase === "hero" || (phase === "morphing" && heroVisible)) {
        return (<div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.15) 0%, hsl(var(--background) / 0.97) 100%)",
                transition: "opacity 1.2s ease-out",
                opacity: phase === "morphing" ? 0 : 1,
                pointerEvents: phase === "morphing" ? "none" : "auto",
            }}>
        <div className="relative flex flex-col items-center">
          <div style={{
                transition: "transform 1.2s cubic-bezier(0.32, 0.72, 0, 1), opacity 1.2s ease-out",
                transform: phase === "morphing" ? "scale(0.15) translateX(40vw) translateY(40vh)" : "scale(1)",
                opacity: phase === "morphing" ? 0 : 1,
            }}>
            <EmojiAssistant emotion={emotion} size={220}/>
          </div>

          <div className="mt-6 text-center max-w-lg px-4">
            <p className="text-lg md:text-xl text-foreground/90 font-light leading-relaxed whitespace-pre-line min-h-[5rem]">
              {heroText}
              <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse"/>
            </p>
          </div>

          <div className="mt-6" style={{ opacity: heroText.length >= fullText.length ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <a href="/create-ticket" className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-105">
              Post a Ticket
            </a>
          </div>
        </div>
      </div>);
    }
    // Mini assistant with roaming
    return (<>
      <motion.div className="fixed z-[10000]" animate={{
            bottom: roamPos.bottom,
            right: roamPos.right,
        }} transition={{ type: "spring", stiffness: 50, damping: 18, mass: 1.2 }}>
        {/* Particle trail when roaming */}
        <ParticleTrail active={isRoaming} color="hsl(var(--primary))"/>
        {/* Micro message bubble */}
        <AnimatePresence>
          {showMicro && !chatOpen && (<motion.div initial={{ opacity: 0, y: 10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="absolute bottom-full right-0 mb-3 px-4 py-2.5 rounded-2xl bg-card/90 backdrop-blur-xl border border-border text-foreground text-sm whitespace-nowrap shadow-2xl">
              {microMessage}
              <div className="absolute bottom-0 right-8 translate-y-1/2 rotate-45 w-2.5 h-2.5 bg-card/90 border-r border-b border-border"/>
            </motion.div>)}
        </AnimatePresence>

        {/* Emoji button */}
        <button onClick={() => {
            setChatOpen(!chatOpen);
            setShowMicro(false);
            setEmotion(chatOpen ? "idle" : "friendly");
            // Reset position when opening chat
            if (!chatOpen)
                setRoamPos(ROAM_POSITIONS[0]);
        }} onMouseEnter={() => {
            setIsHovered(true);
            if (!chatOpen)
                setEmotion("friendly");
        }} onMouseLeave={() => {
            setIsHovered(false);
            if (!chatOpen)
                setEmotion("idle");
        }} className="relative cursor-pointer" style={{ width: 96, height: 96, background: "transparent", border: "none", outline: "none" }}>
          <EmojiAssistant emotion={emotion} size={88} bounce={bouncing}/>
          <div className="absolute inset-0 rounded-full transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 0 20px 4px hsl(var(--primary) / ${isHovered ? 0.35 : 0.12})` }}/>
          <div className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-lg border-2 border-background">
            <MessageCircle className="w-3.5 h-3.5 text-primary-foreground"/>
          </div>
        </button>
      </motion.div>

      <ChatPanel open={chatOpen} onClose={() => { setChatOpen(false); setEmotion("idle"); }} onEmotionChange={handleEmotionChange}/>
    </>);
}
