import { useState } from "react";
import { Link } from "react-router-dom";
import { Ticket, Clock, CheckCircle2, Wallet, TrendingUp, ArrowRight, MessageSquare, Star, Plus, Eye, MoreHorizontal, DollarSign } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { label: "Active Tickets", value: "3", icon: Ticket, color: "text-secondary", trend: "+1" },
  { label: "Pending", value: "2", icon: Clock, color: "text-warning", trend: "0" },
  { label: "Completed", value: "12", icon: CheckCircle2, color: "text-success", trend: "+2" },
  { label: "Wallet", value: "$150", icon: Wallet, color: "text-primary", trend: "" },
];

const myTickets = [
  { 
    id: "T-1234", 
    title: "React SSR issue with hydration mismatch", 
    status: "in_progress",
    trainer: { name: "Sarah Chen", avatar: "SC", rating: 4.9 },
    budget: "$120",
    created: "2 hours ago",
    messages: 8
  },
  { 
    id: "T-1232", 
    title: "AWS Lambda timeout after 3 seconds", 
    status: "pending",
    trainer: null,
    budget: "$80",
    created: "5 hours ago",
    messages: 0
  },
  { 
    id: "T-1230", 
    title: "PostgreSQL query optimization needed", 
    status: "in_progress",
    trainer: { name: "David Kim", avatar: "DK", rating: 4.8 },
    budget: "$150",
    created: "1 day ago",
    messages: 15
  },
];

const recentActivity = [
  { type: "solved", title: "React SSR issue resolved", time: "2 hours ago", trainer: "Sarah Chen" },
  { type: "message", title: "New message from David Kim", time: "5 hours ago" },
  { type: "created", title: "Created ticket: AWS Lambda timeout", time: "1 day ago" },
  { type: "payment", title: "Payment of $75 released", time: "2 days ago" },
  { type: "review", title: "You rated Sarah Chen ⭐⭐⭐⭐⭐", time: "2 days ago" },
];

const completedTickets = [
  { id: "T-1225", title: "Docker networking configuration", trainer: "John Smith", amount: "$75", date: "3 days ago", rating: 5 },
  { id: "T-1220", title: "React Native performance issue", trainer: "Emily Davis", amount: "$100", date: "1 week ago", rating: 5 },
  { id: "T-1215", title: "MongoDB aggregation pipeline", trainer: "Sarah Chen", amount: "$60", date: "2 weeks ago", rating: 4 },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "history">("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="stats-card"
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                {stat.trend && (
                  <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-success" : "text-muted-foreground"}`}>
                    {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <Link to="/create-ticket" className="gh-btn-primary px-6 py-3">
            <Plus className="w-4 h-4 mr-2" />
            Create New Ticket
          </Link>
          <Link to="/trainers" className="gh-btn-secondary px-6 py-3">
            Browse Trainers
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-4">
          {[
            { id: "overview", label: "Overview" },
            { id: "tickets", label: "My Tickets", count: myTickets.length },
            { id: "history", label: "History" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? "bg-primary-foreground/20" : "bg-muted"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid lg:grid-cols-2 gap-6"
            >
              {/* Active Tickets */}
              <div className="gh-card">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-foreground">Active Tickets</h2>
                  <button onClick={() => setActiveTab("tickets")} className="text-sm text-primary hover:underline flex items-center gap-1">
                    View all <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="space-y-3">
                  {myTickets.slice(0, 3).map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors cursor-pointer">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                          <span className={`chip text-xs ${
                            ticket.status === "in_progress" ? "chip-primary" : "chip-warning"
                          }`}>
                            {ticket.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="font-medium text-foreground text-sm truncate">{ticket.title}</p>
                        {ticket.trainer && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Working with {ticket.trainer.name}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="font-mono font-semibold text-primary">{ticket.budget}</p>
                        {ticket.messages > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {ticket.messages}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="gh-card">
                <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
                <div className="space-y-1">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 py-3 border-b border-border/50 last:border-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        {item.type === "solved" && <CheckCircle2 className="w-4 h-4 text-success" />}
                        {item.type === "message" && <MessageSquare className="w-4 h-4 text-secondary" />}
                        {item.type === "created" && <Ticket className="w-4 h-4 text-primary" />}
                        {item.type === "payment" && <Wallet className="w-4 h-4 text-warning" />}
                        {item.type === "review" && <Star className="w-4 h-4 text-warning" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tickets Tab */}
          {activeTab === "tickets" && (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {myTickets.map((ticket) => (
                <div key={ticket.id} className="gh-card hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`chip text-xs ${
                          ticket.status === "in_progress" ? "chip-primary" : "chip-warning"
                        }`}>
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground text-lg">{ticket.title}</h3>
                      <div className="flex items-center gap-4 mt-3">
                        {ticket.trainer ? (
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-medium text-white">
                              {ticket.trainer.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{ticket.trainer.name}</p>
                              <div className="flex items-center gap-1 text-xs text-warning">
                                <Star className="w-3 h-3 fill-current" />
                                {ticket.trainer.rating}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Waiting for trainer...</span>
                        )}
                        <span className="text-xs text-muted-foreground">Created {ticket.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-mono text-xl font-bold text-primary">{ticket.budget}</p>
                        {ticket.messages > 0 && (
                          <span className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {ticket.messages} messages
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="gh-btn-secondary px-4 py-2 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </button>
                        {ticket.status === "in_progress" && (
                          <button className="gh-btn-primary px-4 py-2 text-sm">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            Chat
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="gh-card"
            >
              <h3 className="font-semibold text-foreground mb-4">Completed Tickets</h3>
              <div className="space-y-3">
                {completedTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                          <span className="chip chip-success text-xs">Completed</span>
                        </div>
                        <p className="font-medium text-foreground">{ticket.title}</p>
                        <p className="text-xs text-muted-foreground">Solved by {ticket.trainer} • {ticket.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono font-semibold text-foreground">{ticket.amount}</p>
                      <div className="flex items-center gap-1 text-warning text-xs justify-end">
                        {[...Array(ticket.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
