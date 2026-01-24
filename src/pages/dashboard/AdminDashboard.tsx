import { useState } from "react";
import { Users, BadgeCheck, Ticket, Shield, TrendingUp, Search, MoreHorizontal, Eye, Ban, CheckCircle2, XCircle, Mail, Calendar, DollarSign, Activity, AlertTriangle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "text-secondary", trend: "+12%" },
  { label: "Trainers", value: "523", icon: BadgeCheck, color: "text-primary", trend: "+8%" },
  { label: "Active Tickets", value: "89", icon: Ticket, color: "text-warning", trend: "+5%" },
  { label: "Pending Verification", value: "12", icon: Shield, color: "text-destructive", trend: "-3%" },
];

const pendingVerifications = [
  { id: 1, name: "John Smith", email: "john@example.com", expertise: ["React", "Node.js"], applied: "2 days ago", avatar: "JS" },
  { id: 2, name: "Emily Davis", email: "emily@example.com", expertise: ["Python", "ML"], applied: "3 days ago", avatar: "ED" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", expertise: ["DevOps", "AWS"], applied: "5 days ago", avatar: "MB" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", expertise: ["iOS", "Swift"], applied: "1 week ago", avatar: "SW" },
];

const recentUsers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "user", status: "active", joined: "Today", tickets: 3 },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "user", status: "active", joined: "Yesterday", tickets: 1 },
  { id: 3, name: "James Lee", email: "james@example.com", role: "trainer", status: "active", joined: "2 days ago", tickets: 0 },
  { id: 4, name: "Lisa Chen", email: "lisa@example.com", role: "user", status: "suspended", joined: "3 days ago", tickets: 5 },
  { id: 5, name: "David Kim", email: "david@example.com", role: "trainer", status: "active", joined: "1 week ago", tickets: 12 },
];

const recentTickets = [
  { id: "T-1234", title: "React performance optimization", user: "Alex J.", trainer: "Sarah C.", status: "in_progress", amount: "$120" },
  { id: "T-1235", title: "Docker networking issue", user: "Maria G.", trainer: "Pending", status: "open", amount: "$80" },
  { id: "T-1236", title: "AWS Lambda timeout", user: "James L.", trainer: "David K.", status: "completed", amount: "$150" },
  { id: "T-1237", title: "PostgreSQL slow queries", user: "Lisa C.", trainer: "John S.", status: "disputed", amount: "$100" },
];

const platformMetrics = [
  { label: "Revenue (MTD)", value: "$45,230", icon: DollarSign, change: "+18%" },
  { label: "Avg Resolution Time", value: "4.2 hrs", icon: Activity, change: "-12%" },
  { label: "Success Rate", value: "94.5%", icon: CheckCircle2, change: "+2%" },
  { label: "Open Disputes", value: "3", icon: AlertTriangle, change: "-1" },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "tickets" | "verifications">("overview");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
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
                <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-success" : "text-destructive"}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Platform Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {platformMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.05 }}
              className="gh-card"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                </div>
              </div>
              <div className={`text-xs mt-2 ${metric.change.startsWith("+") || metric.change.startsWith("-1") ? "text-success" : "text-warning"}`}>
                {metric.change} from last month
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-4">
          {["overview", "users", "tickets", "verifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
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
              {/* Recent Tickets */}
              <div className="gh-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Recent Tickets</h3>
                  <button className="text-sm text-primary hover:underline">View all</button>
                </div>
                <div className="space-y-3">
                  {recentTickets.map((ticket) => (
                    <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                          <span className={`chip text-xs ${
                            ticket.status === "completed" ? "chip-success" :
                            ticket.status === "in_progress" ? "chip-primary" :
                            ticket.status === "disputed" ? "chip-warning" : ""
                          }`}>
                            {ticket.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="font-medium text-foreground text-sm truncate">{ticket.title}</p>
                        <p className="text-xs text-muted-foreground">{ticket.user} → {ticket.trainer}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono font-semibold text-primary">{ticket.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pending Verifications */}
              <div className="gh-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">Pending Verifications</h3>
                  <span className="chip chip-warning text-xs">{pendingVerifications.length} pending</span>
                </div>
                <div className="space-y-3">
                  {pendingVerifications.slice(0, 4).map((trainer) => (
                    <div key={trainer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-sm font-medium text-white">
                          {trainer.avatar}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{trainer.name}</p>
                          <div className="flex gap-1 mt-1">
                            {trainer.expertise.map((skill) => (
                              <span key={skill} className="chip text-xs">{skill}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-success/20 text-success transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-destructive/20 text-destructive transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="gh-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">User Management</h3>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="gh-input pl-10 w-64"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Tickets</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-medium text-white">
                              {user.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`chip text-xs ${user.role === "trainer" ? "chip-primary" : ""}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`chip text-xs ${user.status === "active" ? "chip-success" : "chip-warning"}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="py-3 px-4 text-sm font-mono text-foreground">{user.tickets}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                              <Mail className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive">
                              <Ban className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
              className="gh-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">All Tickets</h3>
                <div className="flex items-center gap-2">
                  <select className="gh-input text-sm">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Disputed</option>
                  </select>
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input type="text" placeholder="Search tickets..." className="gh-input pl-10 w-48" />
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                {[...recentTickets, ...recentTickets].map((ticket, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/30 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">{ticket.id}</span>
                        <span className={`chip text-xs ${
                          ticket.status === "completed" ? "chip-success" :
                          ticket.status === "in_progress" ? "chip-primary" :
                          ticket.status === "disputed" ? "chip-warning" : ""
                        }`}>
                          {ticket.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="font-medium text-foreground">{ticket.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        <span className="text-foreground">{ticket.user}</span>
                        {ticket.trainer !== "Pending" && (
                          <> assigned to <span className="text-foreground">{ticket.trainer}</span></>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono font-semibold text-primary">{ticket.amount}</p>
                      <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Verifications Tab */}
          {activeTab === "verifications" && (
            <motion.div
              key="verifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="gh-card"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Trainer Verification Queue</h3>
                <span className="chip chip-warning text-xs">{pendingVerifications.length} pending review</span>
              </div>
              <div className="space-y-4">
                {pendingVerifications.map((trainer) => (
                  <div key={trainer.id} className="p-4 rounded-lg bg-muted/30 border border-border">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-lg font-medium text-white">
                          {trainer.avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{trainer.name}</p>
                          <p className="text-sm text-muted-foreground">{trainer.email}</p>
                          <div className="flex gap-2 mt-2">
                            {trainer.expertise.map((skill) => (
                              <span key={skill} className="chip chip-primary text-xs">{skill}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Applied {trainer.applied}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="gh-btn-secondary px-4 py-2 text-sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </button>
                        <button className="px-4 py-2 rounded-md bg-success text-white text-sm font-medium hover:bg-success/90">
                          Approve
                        </button>
                        <button className="px-4 py-2 rounded-md bg-destructive text-white text-sm font-medium hover:bg-destructive/90">
                          Reject
                        </button>
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

export default AdminDashboard;
