import { useState } from "react";
import { MessageSquare, Search, Send, Paperclip, MoreVertical, Phone, Video, CheckCheck } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const conversations = [
  {
    id: 1,
    trainer: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", online: true },
    ticket: "T-1234: React SSR issue",
    lastMessage: "I've found the issue. It's related to the useEffect hook running on server side.",
    time: "2 min ago",
    unread: 2,
  },
  {
    id: 2,
    trainer: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", online: true },
    ticket: "T-1230: PostgreSQL optimization",
    lastMessage: "The new indexes should improve query performance by 80%.",
    time: "1 hour ago",
    unread: 0,
  },
  {
    id: 3,
    trainer: { name: "James Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", online: false },
    ticket: "T-1228: Docker networking",
    lastMessage: "Glad I could help! Let me know if you have any more questions.",
    time: "3 days ago",
    unread: 0,
  },
];

const messages = [
  { id: 1, sender: "trainer", text: "Hi! I've reviewed your React SSR issue. Can you share the component code where the hydration mismatch occurs?", time: "10:30 AM" },
  { id: 2, sender: "user", text: "Sure, here's the component. The issue happens when I use useEffect to fetch data.", time: "10:32 AM" },
  { id: 3, sender: "trainer", text: "I see the problem. You're using Date.now() directly in the render which causes server/client mismatch.", time: "10:35 AM" },
  { id: 4, sender: "trainer", text: "I've found the issue. It's related to the useEffect hook running on server side.", time: "10:36 AM" },
];

const MessagesPage = () => {
  const [selectedConvo, setSelectedConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-10rem)]">
        <div className="gh-card h-full p-0 overflow-hidden">
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="gh-input pl-10 w-full"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {conversations.map((convo) => (
                  <div
                    key={convo.id}
                    onClick={() => setSelectedConvo(convo)}
                    className={`p-4 cursor-pointer border-b border-border transition-colors ${
                      selectedConvo.id === convo.id ? "bg-primary/10" : "hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <img src={convo.trainer.avatar} alt={convo.trainer.name} className="w-10 h-10 rounded-full object-cover" />
                        {convo.trainer.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-foreground truncate">{convo.trainer.name}</p>
                          <span className="text-xs text-muted-foreground">{convo.time}</span>
                        </div>
                        <p className="text-xs text-primary truncate">{convo.ticket}</p>
                        <p className="text-sm text-muted-foreground truncate mt-1">{convo.lastMessage}</p>
                      </div>
                      {convo.unread > 0 && (
                        <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                          {convo.unread}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={selectedConvo.trainer.avatar} alt={selectedConvo.trainer.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-foreground">{selectedConvo.trainer.name}</p>
                    <p className="text-xs text-primary">{selectedConvo.ticket}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      msg.sender === "user" 
                        ? "bg-primary text-primary-foreground rounded-br-sm" 
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <div className={`flex items-center gap-1 mt-1 ${msg.sender === "user" ? "justify-end" : ""}`}>
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sender === "user" && <CheckCheck className="w-3 h-3 opacity-70" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="gh-input flex-1"
                  />
                  <button className="gh-btn-primary p-2">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;
