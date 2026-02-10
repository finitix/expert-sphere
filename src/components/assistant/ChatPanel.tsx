import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const PRETRAINED: Record<string, { text: string; emotion: string }> = {
  help: { text: "I can help you post a ticket, find a trainer, or navigate the site. What do you need?", emotion: "friendly" },
  ticket: { text: "To create a ticket:\n1. Click **Post a Ticket**\n2. Describe your problem\n3. Set a budget\n4. Get matched with experts!\n\nWant me to take you there?", emotion: "excited" },
  trainer: { text: "We have 500+ verified expert trainers across React, Python, DevOps, and more. Visit the **Trainers** page to browse them!", emotion: "excited" },
  pricing: { text: "You only pay when your problem is solved. Set your own budget, and trainers bid on your ticket.", emotion: "friendly" },
  how: { text: "Post a problem → Get matched with experts → They solve it → Pay only when solved. Simple!", emotion: "friendly" },
  hello: { text: "Hello! 👋 I'm your AI assistant. I can help with tickets, finding trainers, or answering questions about the platform.", emotion: "waving" },
  hi: { text: "Hi there! 👋 How can I help you today?", emotion: "waving" },
  thanks: { text: "You're welcome! 😊 Happy to help anytime!", emotion: "love" },
  thank: { text: "Glad I could help! Let me know if there's anything else. 💚", emotion: "love" },
  love: { text: "Aww, thanks! 💕 I'm here for you!", emotion: "love" },
  amazing: { text: "Thank you so much! That means a lot! ✨", emotion: "love" },
  great: { text: "Glad to hear that! 🎉 What else can I do?", emotion: "excited" },
  awesome: { text: "You're awesome too! 🚀", emotion: "excited" },
  wow: { text: "I know, right?! Pretty cool stuff! ✨", emotion: "surprised" },
  what: { text: "That's a great question! Let me think... 🤔", emotion: "thinking" },
  why: { text: "Good question! Here's the deal... 🤔", emotion: "thinking" },
  confused: { text: "No worries! Let me explain it differently. Which part is unclear?", emotion: "confused" },
  understand: { text: "I'll try to make it clearer! Ask me specific questions and I'll break it down. 😊", emotion: "confused" },
  wrong: { text: "Oh no! 😟 Let me try to fix that. What went wrong?", emotion: "surprised" },
  error: { text: "Hmm, that doesn't sound right. Can you tell me more about the issue?", emotion: "confused" },
  bug: { text: "Let me look into that! 🔍 Can you describe what happened?", emotion: "thinking" },
  slow: { text: "I apologize for the wait! Let me see what I can do to speed things up.", emotion: "thinking" },
  boring: { text: "Oh! Let me make things more interesting! What would you like to explore? 🎭", emotion: "surprised" },
  funny: { text: "Haha! Glad you find me entertaining! 😂", emotion: "laughing" },
  haha: { text: "😂 I try my best! What else can I help with?", emotion: "laughing" },
  lol: { text: "Hehe! 😄 Glad to make you smile!", emotion: "laughing" },
  joke: { text: "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂", emotion: "laughing" },
  bye: { text: "Goodbye! 😴 I'll be right here if you need me. Sweet dreams!", emotion: "sleeping" },
  sleep: { text: "Zzz... Just kidding! I'm always awake for you. 😄", emotion: "sleeping" },
  night: { text: "Good night! 🌙 Rest well, I'll be here when you're back!", emotion: "sleeping" },
  cool: { text: "😎 Totally cool! What's next?", emotion: "cool" },
};

function getResponse(input: string): { text: string; emotion: string } {
  const lower = input.toLowerCase();
  for (const [key, val] of Object.entries(PRETRAINED)) {
    if (lower.includes(key)) return val;
  }
  return { text: "I'm here to help! You can ask me about:\n• **Creating tickets**\n• **Finding trainers**\n• **How the platform works**\n• **Pricing**\n\nWhat would you like to know?", emotion: "friendly" };
}

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onEmotionChange?: (emotion: string) => void;
}

export function ChatPanel({ open, onClose, onEmotionChange }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Welcome! I'm your AI assistant. How can I help you today? 👋" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    onEmotionChange?.("thinking");
    setIsTyping(true);

    setTimeout(() => {
      const { text, emotion } = getResponse(userMsg.content);
      setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      setIsTyping(false);
      onEmotionChange?.(emotion);
      setTimeout(() => onEmotionChange?.("idle"), 4000);
    }, 800 + Math.random() * 600);
  };

  if (!open) return null;

  return (
    <div
      className={cn(
        "fixed bottom-24 right-6 z-[10001] w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden",
        "bg-[#0d1117]/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50",
        "animate-scale-in"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">AI Assistant</p>
            <p className="text-[10px] text-emerald-400">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 transition-colors">
          <X className="w-4 h-4 text-white/60" />
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[320px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}>
            <div className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
              msg.role === "assistant" ? "bg-emerald-500/20" : "bg-blue-500/20"
            )}>
              {msg.role === "assistant" ? <Bot className="w-3 h-3 text-emerald-400" /> : <User className="w-3 h-3 text-blue-400" />}
            </div>
            <div className={cn(
              "max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed",
              msg.role === "assistant"
                ? "bg-white/[0.06] text-white/90 rounded-tl-sm"
                : "bg-emerald-500/20 text-white rounded-tr-sm"
            )}>
              {msg.content.split("\n").map((line, j) => (
                <p key={j} className={j > 0 ? "mt-1" : ""}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, k) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={k} className="text-emerald-400 font-semibold">{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={k}>{part}</span>
                    )
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Bot className="w-3 h-3 text-emerald-400" />
            </div>
            <div className="bg-white/[0.06] px-3 py-2 rounded-xl rounded-tl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask me anything..."
            className="flex-1 bg-white/[0.06] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none focus:border-emerald-500/50 transition-colors"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-30 transition-all"
          >
            <Send className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
