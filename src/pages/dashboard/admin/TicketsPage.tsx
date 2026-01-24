import { useState } from "react";
import { Ticket, Search, Eye, MoreHorizontal, AlertCircle, CheckCircle2, Clock, XCircle, DollarSign, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const tickets = [
  { id: "T-1240", title: "Docker networking issue", user: "Alex J.", trainer: "Sarah C.", status: "in_progress", amount: "$80", created: "10 mins ago", category: "DevOps" },
  { id: "T-1239", title: "React SSR hydration mismatch", user: "Maria G.", trainer: "David K.", status: "in_progress", amount: "$120", created: "2 hours ago", category: "React" },
  { id: "T-1238", title: "AWS Lambda timeout", user: "James L.", trainer: null, status: "pending", amount: "$150", created: "5 hours ago", category: "AWS" },
  { id: "T-1237", title: "PostgreSQL slow queries", user: "Lisa C.", trainer: "James L.", status: "completed", amount: "$100", created: "1 day ago", category: "Database" },
  { id: "T-1236", title: "TypeScript generics issue", user: "Emma W.", trainer: "Lisa P.", status: "completed", amount: "$60", created: "2 days ago", category: "TypeScript" },
  { id: "T-1235", title: "CI/CD pipeline failing", user: "Noah B.", trainer: null, status: "disputed", amount: "$180", created: "3 days ago", category: "DevOps" },
  { id: "T-1234", title: "MongoDB aggregation help", user: "Sophia M.", trainer: "Sarah C.", status: "completed", amount: "$95", created: "4 days ago", category: "Database" },
];

const AdminTicketsPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = tickets.filter(ticket => {
    if (search && !ticket.title.toLowerCase().includes(search.toLowerCase()) && !ticket.id.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && ticket.status !== statusFilter) return false;
    return true;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-success" />;
      case "in_progress": return <Clock className="w-4 h-4 text-primary" />;
      case "pending": return <AlertCircle className="w-4 h-4 text-warning" />;
      case "disputed": return <XCircle className="w-4 h-4 text-destructive" />;
      default: return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Tickets</h1>
            <p className="text-muted-foreground">Monitor and manage platform tickets</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="gh-card text-center">
            <p className="text-2xl font-bold text-foreground">1,234</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
          <div className="gh-card text-center">
            <p className="text-2xl font-bold text-warning">89</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </div>
          <div className="gh-card text-center">
            <p className="text-2xl font-bold text-primary">156</p>
            <p className="text-sm text-muted-foreground">In Progress</p>
          </div>
          <div className="gh-card text-center">
            <p className="text-2xl font-bold text-success">985</p>
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <div className="gh-card text-center">
            <p className="text-2xl font-bold text-destructive">4</p>
            <p className="text-sm text-muted-foreground">Disputed</p>
          </div>
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
            {["all", "pending", "in_progress", "completed", "disputed"].map((f) => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {f === "all" ? "All" : f === "in_progress" ? "Active" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tickets List */}
        <div className="space-y-3">
          {filteredTickets.map((ticket, i) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="gh-card flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                {getStatusIcon(ticket.status)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                    <span className="chip text-xs">{ticket.category}</span>
                  </div>
                  <p className="font-medium text-foreground">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {ticket.user} → {ticket.trainer || <span className="text-warning">Unassigned</span>}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-mono font-bold text-primary">{ticket.amount}</p>
                  <p className="text-xs text-muted-foreground">{ticket.created}</p>
                </div>
                <span className={`chip text-xs ${
                  ticket.status === "completed" ? "chip-success" :
                  ticket.status === "in_progress" ? "chip-primary" :
                  ticket.status === "disputed" ? "chip-warning" : ""
                }`}>
                  {ticket.status.replace("_", " ")}
                </span>
                <button className="p-2 rounded-lg hover:bg-muted text-muted-foreground">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminTicketsPage;
