import { useState } from "react";
import { Ticket, Clock, DollarSign, MessageSquare, Play, XCircle, Eye, Star, AlertCircle, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const requests = [
  { 
    id: "T-1240", title: "Docker networking issue - containers can't communicate", 
    budget: "$80", urgency: "High", skills: ["Docker", "Linux", "Networking"],
    description: "I have multiple Docker containers that need to communicate but they can't see each other on the bridge network...",
    user: { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcabd36?w=100&h=100&fit=crop" },
    posted: "10 mins ago"
  },
  { 
    id: "T-1241", title: "React performance optimization for large lists", 
    budget: "$120", urgency: "Medium", skills: ["React", "JavaScript"],
    description: "My React app becomes very slow when rendering lists with 1000+ items. Need help with virtualization...",
    user: { name: "Maria Garcia", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    posted: "25 mins ago"
  },
  { 
    id: "T-1242", title: "PostgreSQL query taking 30+ seconds", 
    budget: "$100", urgency: "High", skills: ["PostgreSQL", "Database"],
    description: "A complex join query is extremely slow. Need help optimizing indexes and query structure...",
    user: { name: "James Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    posted: "1 hour ago"
  },
  { 
    id: "T-1243", title: "AWS Lambda cold start optimization", 
    budget: "$150", urgency: "Low", skills: ["AWS", "Lambda", "Node.js"],
    description: "Lambda functions have 3-4 second cold starts. Need to reduce this for better user experience...",
    user: { name: "Lisa Chen", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    posted: "2 hours ago"
  },
];

const RequestsPage = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Incoming Requests</h1>
            <p className="text-muted-foreground">Browse and accept new problem-solving requests</p>
          </div>
          <div className="flex gap-2">
            {["all", "high", "medium", "low"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {requests.filter(r => filter === "all" || r.urgency.toLowerCase() === filter).map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gh-card hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <img src={req.user.avatar} alt={req.user.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">{req.id}</span>
                      <span className={`chip text-xs ${req.urgency === 'High' ? 'chip-warning' : req.urgency === 'Low' ? '' : 'chip-primary'}`}>
                        {req.urgency}
                      </span>
                    </div>
                    <p className="font-medium text-foreground">{req.title}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {req.skills.map(s => <span key={s} className="chip text-xs">{s}</span>)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Posted by {req.user.name} • {req.posted}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-mono text-xl font-bold text-primary">{req.budget}</p>
                </div>
              </div>

              <AnimatePresence>
                {expandedId === req.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-border"
                  >
                    <p className="text-sm text-muted-foreground mb-4">{req.description}</p>
                    <div className="flex items-center gap-3">
                      <button className="gh-btn-primary px-4 py-2 text-sm">
                        <Play className="w-4 h-4 mr-1" />
                        Accept Job
                      </button>
                      <button className="gh-btn-secondary px-4 py-2 text-sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Ask Questions
                      </button>
                      <button className="gh-btn-secondary px-4 py-2 text-sm text-muted-foreground">
                        <XCircle className="w-4 h-4 mr-1" />
                        Pass
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;
