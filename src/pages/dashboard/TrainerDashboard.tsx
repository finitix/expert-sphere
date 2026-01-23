import { Ticket, DollarSign, Star, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const stats = [
  { label: "New Requests", value: "5", icon: Ticket, color: "text-secondary" },
  { label: "In Progress", value: "3", icon: Clock, color: "text-warning" },
  { label: "Earnings", value: "$2,450", icon: DollarSign, color: "text-success" },
  { label: "Rating", value: "4.9", icon: Star, color: "text-warning" },
];

const requests = [
  { title: "Docker networking issue", budget: "$80", urgency: "High", skills: ["Docker", "Linux"] },
  { title: "React performance optimization", budget: "$120", urgency: "Medium", skills: ["React"] },
  { title: "PostgreSQL query slow", budget: "$100", urgency: "High", skills: ["PostgreSQL"] },
];

const TrainerDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="stats-card">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="gh-card">
          <h2 className="font-semibold text-foreground mb-4">New Requests</h2>
          <div className="space-y-3">
            {requests.map((req, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <div>
                  <p className="font-medium text-foreground">{req.title}</p>
                  <div className="flex gap-2 mt-1">
                    {req.skills.map(s => <span key={s} className="chip text-xs">{s}</span>)}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-semibold text-primary">{req.budget}</p>
                  <span className={`chip text-xs ${req.urgency === 'High' ? 'chip-warning' : ''}`}>{req.urgency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TrainerDashboard;
