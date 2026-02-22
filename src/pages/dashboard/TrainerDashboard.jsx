import { useState } from "react";
import { Ticket, DollarSign, Star, TrendingUp, Clock, MessageSquare, ArrowUpRight, Play, XCircle } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
const stats = [
    { label: "New Requests", value: "5", icon: Ticket, color: "text-secondary", trend: "+2" },
    { label: "In Progress", value: "3", icon: Clock, color: "text-warning", trend: "0" },
    { label: "Earnings", value: "$2,450", icon: DollarSign, color: "text-success", trend: "+$350" },
    { label: "Rating", value: "4.9", icon: Star, color: "text-warning", trend: "+0.1" },
];
const requests = [
    {
        id: "T-1234",
        title: "Docker networking issue - containers can't communicate",
        budget: "$80",
        urgency: "High",
        skills: ["Docker", "Linux", "Networking"],
        description: "I have multiple Docker containers that need to communicate but they can't see each other...",
        user: "Alex J.",
        avatar: "AJ",
        posted: "10 mins ago"
    },
    {
        id: "T-1235",
        title: "React performance optimization for large lists",
        budget: "$120",
        urgency: "Medium",
        skills: ["React", "JavaScript"],
        description: "My React app becomes very slow when rendering large lists. Need help with virtualization...",
        user: "Maria G.",
        avatar: "MG",
        posted: "25 mins ago"
    },
    {
        id: "T-1236",
        title: "PostgreSQL query taking 30+ seconds",
        budget: "$100",
        urgency: "High",
        skills: ["PostgreSQL", "Database"],
        description: "A complex join query is extremely slow. Need help optimizing indexes and query structure...",
        user: "James L.",
        avatar: "JL",
        posted: "1 hour ago"
    },
    {
        id: "T-1237",
        title: "AWS Lambda cold start optimization",
        budget: "$150",
        urgency: "Low",
        skills: ["AWS", "Lambda", "Node.js"],
        description: "Lambda functions have 3-4 second cold starts. Need to reduce this for better UX...",
        user: "Lisa C.",
        avatar: "LC",
        posted: "2 hours ago"
    },
];
const activeJobs = [
    {
        id: "T-1230",
        title: "Kubernetes deployment failing",
        user: "David K.",
        avatar: "DK",
        status: "in_progress",
        started: "2 hours ago",
        budget: "$200",
        messages: 12
    },
    {
        id: "T-1228",
        title: "GraphQL schema design review",
        user: "Emma W.",
        avatar: "EW",
        status: "awaiting_response",
        started: "5 hours ago",
        budget: "$75",
        messages: 8
    },
    {
        id: "T-1225",
        title: "CI/CD pipeline setup for React app",
        user: "Noah B.",
        avatar: "NB",
        status: "in_progress",
        started: "1 day ago",
        budget: "$180",
        messages: 24
    },
];
const recentEarnings = [
    { title: "MongoDB aggregation help", amount: "$95", date: "Today", user: "Sarah M." },
    { title: "Redis caching implementation", amount: "$150", date: "Yesterday", user: "Tom H." },
    { title: "React Native debugging", amount: "$80", date: "2 days ago", user: "Anna K." },
    { title: "Python API optimization", amount: "$120", date: "3 days ago", user: "Mike R." },
];
const TrainerDashboard = () => {
    const [activeTab, setActiveTab] = useState("requests");
    const [expandedRequest, setExpandedRequest] = useState(null);
    return (<DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (<motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`}/>
                <span className={`text-xs font-medium ${stat.trend.startsWith("+") ? "text-success" : "text-muted-foreground"}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-border pb-4">
          {[
            { id: "requests", label: "New Requests", count: requests.length },
            { id: "active", label: "Active Jobs", count: activeJobs.length },
            { id: "earnings", label: "Earnings" },
        ].map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              {tab.label}
              {tab.count !== undefined && (<span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === tab.id ? "bg-primary-foreground/20" : "bg-muted"}`}>
                  {tab.count}
                </span>)}
            </button>))}
        </div>

        <AnimatePresence mode="wait">
          {/* Requests Tab */}
          {activeTab === "requests" && (<motion.div key="requests" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {requests.map((req) => (<motion.div key={req.id} layout className="gh-card hover:border-primary/30 transition-all cursor-pointer" onClick={() => setExpandedRequest(expandedRequest === req.id ? null : req.id)}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
                        {req.avatar}
                      </div>
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
                          Posted by {req.user} • {req.posted}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-mono text-xl font-bold text-primary">{req.budget}</p>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedRequest === req.id && (<motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-4 pt-4 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-4">{req.description}</p>
                        <div className="flex items-center gap-3">
                          <button className="gh-btn-primary px-4 py-2 text-sm">
                            <Play className="w-4 h-4 mr-1"/>
                            Accept Job
                          </button>
                          <button className="gh-btn-secondary px-4 py-2 text-sm">
                            <MessageSquare className="w-4 h-4 mr-1"/>
                            Ask Questions
                          </button>
                          <button className="gh-btn-secondary px-4 py-2 text-sm text-muted-foreground">
                            <XCircle className="w-4 h-4 mr-1"/>
                            Pass
                          </button>
                        </div>
                      </motion.div>)}
                  </AnimatePresence>
                </motion.div>))}
            </motion.div>)}

          {/* Active Jobs Tab */}
          {activeTab === "active" && (<motion.div key="active" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {activeJobs.map((job) => (<div key={job.id} className="gh-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-sm font-medium text-white">
                        {job.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono text-muted-foreground">{job.id}</span>
                          <span className={`chip text-xs ${job.status === "in_progress" ? "chip-primary" : "chip-warning"}`}>
                            {job.status.replace("_", " ")}
                          </span>
                        </div>
                        <p className="font-medium text-foreground">{job.title}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3"/>
                            Started {job.started}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3"/>
                            {job.messages} messages
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-mono font-bold text-primary">{job.budget}</p>
                      <button className="gh-btn-secondary px-4 py-2 text-sm">
                        <ArrowUpRight className="w-4 h-4 mr-1"/>
                        Open
                      </button>
                    </div>
                  </div>
                </div>))}
            </motion.div>)}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (<motion.div key="earnings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="grid lg:grid-cols-2 gap-6">
              {/* Earnings Summary */}
              <div className="gh-card">
                <h3 className="font-semibold text-foreground mb-4">Earnings Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10 border border-primary/20">
                    <div>
                      <p className="text-sm text-muted-foreground">This Month</p>
                      <p className="text-3xl font-bold text-foreground">$2,450</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-primary"/>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground">Pending</p>
                      <p className="text-xl font-bold text-warning">$455</p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30 border border-border">
                      <p className="text-xs text-muted-foreground">Available</p>
                      <p className="text-xl font-bold text-success">$1,995</p>
                    </div>
                  </div>
                  <button className="gh-btn-primary w-full py-3">
                    <DollarSign className="w-4 h-4 mr-2"/>
                    Withdraw Funds
                  </button>
                </div>
              </div>

              {/* Recent Earnings */}
              <div className="gh-card">
                <h3 className="font-semibold text-foreground mb-4">Recent Earnings</h3>
                <div className="space-y-3">
                  {recentEarnings.map((earning, i) => (<div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border">
                      <div>
                        <p className="font-medium text-foreground text-sm">{earning.title}</p>
                        <p className="text-xs text-muted-foreground">{earning.user} • {earning.date}</p>
                      </div>
                      <p className="font-mono font-semibold text-success">{earning.amount}</p>
                    </div>))}
                </div>
              </div>
            </motion.div>)}
        </AnimatePresence>
      </div>
    </DashboardLayout>);
};
export default TrainerDashboard;
