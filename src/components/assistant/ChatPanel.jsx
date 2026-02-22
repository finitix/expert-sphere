import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils.js";
const PRETRAINED = {
    help: "I can help you post a ticket, find a trainer, or navigate the site. What do you need?",
    ticket: "To create a ticket:\n1. Click **Post a Ticket**\n2. Describe your problem\n3. Set a budget\n4. Get matched with experts!\n\nWant me to take you there?",
    trainer: "We have 500+ verified expert trainers across React, Python, DevOps, and more. Visit the **Trainers** page to browse them!",
    pricing: "You only pay when your problem is solved. Set your own budget, and trainers bid on your ticket.",
    how: "Post a problem → Get matched with experts → They solve it → Pay only when solved. Simple!",
    hello: "Hello! 👋 I'm your AI assistant. I can help with tickets, finding trainers, or answering questions about the platform.",
    hi: "Hi there! 👋 How can I help you today?",
    thanks: "You're welcome! 😊 Happy to help anytime!",
    bye: "Goodbye! 👋 Come back anytime you need help!",
    love: "Aww, that's so sweet! ❤️ I love helping you too!",
    wow: "Right?! 🤩 Pretty amazing stuff!",
    sad: "I'm sorry to hear that 😢 Let me know how I can help make things better.",
    angry: "I understand your frustration 😤 Let me help resolve this for you.",
    scared: "Don't worry, I'm here to help! 💪 Everything will be fine.",
    confused: "No worries, let me explain things more clearly! 🤔",
    funny: "Haha! 😂 Good one! But seriously, how can I help?",
};
// Keyword → emotion mapping
const KEYWORD_EMOTIONS = [
    { keywords: ["wow", "amazing", "incredible", "awesome", "cool", "great", "fantastic"], emotion: "surprised" },
    { keywords: ["confused", "don't understand", "what", "huh", "unclear", "explain"], emotion: "confused" },
    { keywords: ["bye", "goodbye", "night", "sleep", "later", "gtg"], emotion: "sleeping" },
    { keywords: ["sad", "unhappy", "disappointed", "bad", "terrible", "awful"], emotion: "sad" },
    { keywords: ["cry", "crying", "sob", "tears", "heartbroken"], emotion: "cry" },
    { keywords: ["scared", "afraid", "fear", "worried", "anxious", "nervous"], emotion: "fear" },
    { keywords: ["angry", "mad", "furious", "annoyed", "frustrated", "hate"], emotion: "angry" },
    { keywords: ["love", "heart", "adore", "sweet", "cute", "❤"], emotion: "love" },
    { keywords: ["haha", "lol", "lmao", "funny", "hilarious", "joke", "😂"], emotion: "laughing" },
    { keywords: ["think", "hmm", "wondering", "consider", "maybe"], emotion: "thinking" },
    { keywords: ["thanks", "thank", "appreciate", "grateful"], emotion: "friendly" },
    { keywords: ["hi", "hello", "hey", "sup", "yo", "wave"], emotion: "waving" },
    { keywords: ["excited", "yay", "woohoo", "can't wait", "!!!"], emotion: "excited" },
    { keywords: ["sunglasses", "swag", "style", "smooth", "chill"], emotion: "cool" },
];
function detectEmotion(input) {
    const lower = input.toLowerCase();
    for (const { keywords, emotion } of KEYWORD_EMOTIONS) {
        if (keywords.some(k => lower.includes(k)))
            return emotion;
    }
    return "thinking";
}
function getResponse(input) {
    const lower = input.toLowerCase();
    for (const [key, val] of Object.entries(PRETRAINED)) {
        if (lower.includes(key))
            return val;
    }
    return "I'm here to help! You can ask me about:\n• **Creating tickets**\n• **Finding trainers**\n• **How the platform works**\n• **Pricing**\n\nWhat would you like to know?";
}
export function ChatPanel({ open, onClose, onEmotionChange }) {
    const [messages, setMessages] = useState([
        { role: "assistant", content: "Welcome! I'm your AI assistant. How can I help you today? 👋" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }, [messages]);
    const send = () => {
        if (!input.trim())
            return;
        const userMsg = { role: "user", content: input.trim() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        // Detect emotion from user message
        const detectedEmotion = detectEmotion(userMsg.content);
        onEmotionChange?.(detectedEmotion);
        setIsTyping(true);
        setTimeout(() => {
            const response = getResponse(userMsg.content);
            setMessages((prev) => [...prev, { role: "assistant", content: response }]);
            setIsTyping(false);
            // Response emotion
            const responseEmotion = detectEmotion(response);
            onEmotionChange?.(responseEmotion === "thinking" ? "friendly" : responseEmotion);
            setTimeout(() => onEmotionChange?.("idle"), 4000);
        }, 800 + Math.random() * 600);
    };
    if (!open)
        return null;
    return (<div className={cn("fixed bottom-24 right-6 z-[10001] w-[380px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden", "bg-card/90 backdrop-blur-xl border border-border shadow-2xl shadow-black/50", "animate-scale-in")}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground"/>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Assistant</p>
            <p className="text-[10px] text-primary">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
          <X className="w-4 h-4 text-muted-foreground"/>
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="h-[320px] overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((msg, i) => (<div key={i} className={cn("flex gap-2", msg.role === "user" && "flex-row-reverse")}>
            <div className={cn("w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1", msg.role === "assistant" ? "bg-primary/20" : "bg-secondary/20")}>
              {msg.role === "assistant" ? <Bot className="w-3 h-3 text-primary"/> : <User className="w-3 h-3 text-secondary"/>}
            </div>
            <div className={cn("max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed", msg.role === "assistant"
                ? "bg-muted/50 text-foreground rounded-tl-sm"
                : "bg-primary/20 text-foreground rounded-tr-sm")}>
              {msg.content.split("\n").map((line, j) => (<p key={j} className={j > 0 ? "mt-1" : ""}>
                  {line.split(/(\*\*.*?\*\*)/).map((part, k) => part.startsWith("**") && part.endsWith("**") ? (<strong key={k} className="text-primary font-semibold">{part.slice(2, -2)}</strong>) : (<span key={k}>{part}</span>))}
                </p>))}
            </div>
          </div>))}
        {isTyping && (<div className="flex gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-3 h-3 text-primary"/>
            </div>
            <div className="bg-muted/50 px-3 py-2 rounded-xl rounded-tl-sm">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (<div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: `${i * 150}ms` }}/>))}
              </div>
            </div>
          </div>)}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border bg-muted/10">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Ask me anything..." className="flex-1 bg-muted/50 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors"/>
          <button onClick={send} disabled={!input.trim()} className="p-2 rounded-xl bg-primary/20 hover:bg-primary/30 disabled:opacity-30 transition-all">
            <Send className="w-4 h-4 text-primary"/>
          </button>
        </div>
      </div>
    </div>);
}
