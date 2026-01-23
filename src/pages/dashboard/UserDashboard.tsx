import { Link } from "react-router-dom";
import { Ticket, Clock, CheckCircle2, Wallet, TrendingUp, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const stats = [
  { label: "Active Tickets", value: "3", icon: Ticket, color: "text-secondary" },
  { label: "Pending", value: "2", icon: Clock, color: "text-warning" },
  { label: "Completed", value: "12", icon: CheckCircle2, color: "text-success" },
  { label: "Wallet", value: "$150", icon: Wallet, color: "text-primary" },
];

const recentActivity = [
  { type: "solved", title: "React SSR issue resolved", time: "2 hours ago", trainer: "Sarah Chen" },
  { type: "message", title: "New message from David Kim", time: "5 hours ago" },
  { type: "created", title: "Created ticket: AWS Lambda timeout", time: "1 day ago" },
  { type: "payment", title: "Payment of $75 released", time: "2 days ago" },
];

const UserDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="gh-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Recent Activity</h2>
            <Link to="/dashboard/tickets" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-dot">
                  {item.type === "solved" && <CheckCircle2 className="w-3 h-3 text-success" />}
                  {item.type === "message" && <Clock className="w-3 h-3 text-secondary" />}
                  {item.type === "created" && <Ticket className="w-3 h-3 text-primary" />}
                  {item.type === "payment" && <Wallet className="w-3 h-3 text-warning" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
