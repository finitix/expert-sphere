import { useState, useEffect, useCallback } from "react";
import { Robot3DCanvas } from "./Robot3D";
import { ChatPanel } from "./ChatPanel";
import type { RobotEmotion } from "./Robot3D";
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
  const [emotion, setEmotion] = useState<RobotEmotion>("friendly");
  const [chatOpen, setChatOpen] = useState(false);
  const [microMessage, setMicroMessage] = useState("");
  const [showMicro, setShowMicro] = useState(false);
  const [heroText, setHeroText] = useState("");
  const [heroVisible, setHeroVisible] = useState(true);

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
    // First message after 3s
    const first = setTimeout(show, 3000);
    const interval = setInterval(show, 20000 + Math.random() * 15000);
    return () => { clearTimeout(first); clearInterval(interval); };
  }, [phase, chatOpen]);

  const handleEmotionChange = useCallback((e: string) => {
    setEmotion(e as RobotEmotion);
  }, []);

  // Hero mode
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
          {/* 3D Robot - hero size */}
          <div
            className="w-[340px] h-[400px] md:w-[420px] md:h-[480px]"
            style={{
              transition: "transform 1.2s cubic-bezier(0.32, 0.72, 0, 1), opacity 1.2s ease-out",
              transform: phase === "morphing" ? "scale(0.2) translateX(40vw) translateY(40vh)" : "scale(1)",
              opacity: phase === "morphing" ? 0 : 1,
            }}
          >
            <Robot3DCanvas emotion={emotion} lookAtMouse className="w-full h-full" />
          </div>

          {/* Typewriter text */}
          <div className="mt-6 text-center max-w-lg px-4">
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed whitespace-pre-line min-h-[5rem]">
              {heroText}
              <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 animate-pulse" />
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8" style={{ opacity: heroText.length >= fullText.length ? 1 : 0, transition: "opacity 0.5s ease" }}>
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

  // Mini assistant mode
  return (
    <>
      {/* Mini robot button */}
      <div className="fixed bottom-6 right-6 z-[10000]">
        {/* Micro message bubble */}
        {showMicro && !chatOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 rounded-xl bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 text-white text-sm whitespace-nowrap shadow-xl animate-fade-in">
            {microMessage}
            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 bg-[#0d1117]/90 border-r border-b border-white/10" />
          </div>
        )}

        <button
          onClick={() => {
            setChatOpen(!chatOpen);
            setShowMicro(false);
            setEmotion(chatOpen ? "idle" : "friendly");
          }}
          className="group relative w-16 h-16 rounded-full overflow-hidden shadow-2xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all hover:scale-110"
          style={{ background: "radial-gradient(circle at 30% 30%, #16213e, #0d1117)" }}
        >
          <Robot3DCanvas emotion={emotion} lookAtMouse={false} className="w-full h-full" />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" style={{ animationDuration: "3s" }} />
          {/* Chat icon overlay */}
          <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
            <MessageCircle className="w-3 h-3 text-white" />
          </div>
        </button>
      </div>

      {/* Chat Panel */}
      <ChatPanel open={chatOpen} onClose={() => { setChatOpen(false); setEmotion("idle"); }} onEmotionChange={handleEmotionChange} />
    </>
  );
}
