import { useState, useEffect, useCallback } from "react";
import { EmojiAssistant } from "./EmojiAssistant";
import type { EmojiEmotion } from "./EmojiAssistant";
import { ChatPanel } from "./ChatPanel";
import { MessageCircle } from "lucide-react";

const MICRO_MESSAGES = [
  "Need help? 👋",
  "I'm here if you need me.",
  "Ask me anything!",
  "Need help choosing a trainer?",
  "I can guide you in 30 seconds.",
  "Let me help you get started.",
];

export function AssistantOverlay() {
  const [phase, setPhase] = useState<"hero" | "morphing" | "mini">("hero");
  const [emotion, setEmotion] = useState<EmojiEmotion>("waving");
  const [chatOpen, setChatOpen] = useState(false);
  const [microMessage, setMicroMessage] = useState("");
  const [showMicro, setShowMicro] = useState(false);
  const [heroText, setHeroText] = useState("");
  const [heroVisible, setHeroVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const fullText = "Welcome.\nYou're not just posting a ticket.\nYou're starting a solution.";

  // Typewriter effect
  useEffect(() => {
    if (phase !== "hero") return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setHeroText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  // Hero → morph after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("morphing");
      setEmotion("idle");
      setTimeout(() => {
        setPhase("mini");
        setHeroVisible(false);
      }, 1200);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Micro messages in mini mode
  useEffect(() => {
    if (phase !== "mini" || chatOpen) return;
    const show = () => {
      const msg = MICRO_MESSAGES[Math.floor(Math.random() * MICRO_MESSAGES.length)];
      setMicroMessage(msg);
      setShowMicro(true);
      setTimeout(() => setShowMicro(false), 4000);
    };
    const first = setTimeout(show, 3000);
    const interval = setInterval(show, 20000 + Math.random() * 15000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, [phase, chatOpen]);

  const handleEmotionChange = useCallback((e: string) => {
    setEmotion(e as EmojiEmotion);
  }, []);

  // Hero mode — robot rendered directly, no circular container
  if (phase === "hero" || (phase === "morphing" && heroVisible)) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          background: "radial-gradient(ellipse at center, rgba(13,17,23,0.95) 0%, rgba(0,0,0,0.98) 100%)",
          transition: "opacity 1.2s ease-out",
          opacity: phase === "morphing" ? 0 : 1,
          pointerEvents: phase === "morphing" ? "none" : "auto",
        }}
      >
        <div className="relative flex flex-col items-center">
          {/* Emoji Assistant — large hero */}
          <div
            style={{
              transition: "transform 1.2s cubic-bezier(0.32, 0.72, 0, 1), opacity 1.2s ease-out",
              transform: phase === "morphing" ? "scale(0.15) translateX(40vw) translateY(40vh)" : "scale(1)",
              opacity: phase === "morphing" ? 0 : 1,
            }}
          >
            <EmojiAssistant emotion={emotion} size={200} />
          </div>

          {/* Typewriter text */}
          <div className="mt-4 text-center max-w-lg px-4">
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed whitespace-pre-line min-h-[5rem]">
              {heroText}
              <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 animate-pulse" />
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6" style={{ opacity: heroText.length >= fullText.length ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <a
              href="/create-ticket"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold text-lg shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all hover:scale-105"
            >
              Post a Ticket
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Mini assistant — robot rendered directly, no circle wrapper
  return (
    <>
      <div className="fixed bottom-6 right-6 z-[10000]">
        {/* Micro message bubble */}
        {showMicro && !chatOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 rounded-xl bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 text-white text-sm whitespace-nowrap shadow-xl animate-fade-in">
            {microMessage}
            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0d1117]/90 border-r border-b border-white/10" />
          </div>
        )}

        {/* Robot button — no circle, just the robot directly */}
        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setShowMicro(false);
            setEmotion(chatOpen ? "idle" : "friendly");
          }}
          onMouseEnter={() => {
            setIsHovered(true);
            if (!chatOpen) setEmotion("friendly");
          }}
          onMouseLeave={() => {
            setIsHovered(false);
            if (!chatOpen) setEmotion("idle");
          }}
          className="relative cursor-pointer transition-transform duration-300 hover:scale-110"
          style={{
            width: 80,
            height: 80,
            background: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <EmojiAssistant emotion={emotion} size={64} />
          {/* Subtle glow underneath */}
          <div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full blur-xl transition-opacity duration-500"
            style={{
              width: 50,
              height: 12,
              background: "radial-gradient(ellipse, rgba(63,185,80,0.4) 0%, transparent 70%)",
              opacity: isHovered ? 1 : 0.5,
            }}
          />
          {/* Chat icon */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      <ChatPanel open={chatOpen} onClose={() => { setChatOpen(false); setEmotion("idle"); }} onEmotionChange={handleEmotionChange} />
    </>
  );
}
