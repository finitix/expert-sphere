import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Clock, CheckCircle2, MessageSquare, Star, Search, Filter, Plus, Eye, MoreHorizontal, AlertCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const tickets = [
  { 
    id: "T-1234", 
    title: "React SSR issue with hydration mismatch", 
    status: "in_progress",
    trainer: { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop", rating: 4.9 },
    budget: "$120",
    created: "2 hours ago",
    messages: 8,
    category: "React"
  },
  { 
    id: "T-1232", 
    title: "AWS Lambda timeout after 3 seconds", 
    status: "pending",
    trainer: null,
    budget: "$80",
    created: "5 hours ago",
    messages: 0,
    category: "AWS"
  },
  { 
    id: "T-1230", 
    title: "PostgreSQL query optimization needed", 
    status: "in_progress",
    trainer: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop", rating: 4.8 },
    budget: "$150",
    created: "1 day ago",
    messages: 15,
    category: "Database"
  },
  { 
    id: "T-1228", 
    title: "Docker container networking issue", 
    status: "completed",
    trainer: { name: "James Lee", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop", rating: 4.8 },
    budget: "$95",
    created: "3 days ago",
    messages: 12,
    category: "DevOps"
  },
  { 
    id: "T-1225", 
    title: "TypeScript generic type inference bug", 
    status: "completed",
    trainer: { name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop", rating: 4.9 },
    budget: "$60",
    created: "1 week ago",
    messages: 6,
    category: "TypeScript"
  },
];

const TicketsPage = () => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredTickets = tickets.filter(ticket => {
    if (filter !== "all" && ticket.status !== filter) return false;
    if (search && !ticket.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Tickets</h1>
            <p className="text-muted-foreground">Manage and track all your support tickets</p>
          </div>
          <Link to="/create-ticket" className="gh-btn-primary px-4 py-2">
            <Plus className="w-4 h-4 mr-2" />
            New Ticket
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="gh-input pl-10 w-full"
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "in_progress", "completed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "in_progress" ? "Active" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-4">
          {filteredTickets.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gh-card hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                    <span className="chip text-xs">{ticket.category}</span>
                    <span className={`chip text-xs ${
                      ticket.status === "completed" ? "chip-success" :
                      ticket.status === "in_progress" ? "chip-primary" : "chip-warning"
                    }`}>
                      {ticket.status === "in_progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{ticket.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {ticket.trainer ? (
                      <div className="flex items-center gap-2">
                        <img src={ticket.trainer.avatar} alt={ticket.trainer.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{ticket.trainer.name}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-warning fill-current" />
                          <span>{ticket.trainer.rating}</span>
                        </div>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1 text-warning">
                        <AlertCircle className="w-4 h-4" />
                        Waiting for trainer
                      </span>
                    )}
                    <span>Created {ticket.created}</span>
                    {ticket.messages > 0 && (
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" />
                        {ticket.messages}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono text-xl font-bold text-primary">{ticket.budget}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="gh-btn-secondary px-3 py-2">
                      <Eye className="w-4 h-4" />
                    </button>
                    {ticket.status === "in_progress" && (
                      <button className="gh-btn-primary px-3 py-2">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTickets.length === 0 && (
          <div className="text-center py-12">
            <Ticket className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No tickets found</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TicketsPage;
