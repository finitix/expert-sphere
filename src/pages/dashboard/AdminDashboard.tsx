import { Users, BadgeCheck, Ticket, Shield, TrendingUp } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const stats = [
  { label: "Total Users", value: "12,450", icon: Users, color: "text-secondary" },
  { label: "Trainers", value: "523", icon: BadgeCheck, color: "text-primary" },
  { label: "Active Tickets", value: "89", icon: Ticket, color: "text-warning" },
  { label: "Pending Verification", value: "12", icon: Shield, color: "text-destructive" },
];

const AdminDashboard = () => {
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
          <h2 className="font-semibold text-foreground mb-4">Platform Overview</h2>
          <p className="text-muted-foreground">Admin dashboard with user management, trainer verification, and platform analytics.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
