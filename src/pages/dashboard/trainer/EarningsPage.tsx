import { useState } from "react";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownLeft, Calendar, Download, CreditCard } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const earnings = [
  { id: 1, title: "Kubernetes deployment help", client: "David Kim", amount: 200, date: "Today", status: "pending" },
  { id: 2, title: "MongoDB optimization", client: "Sophia M.", amount: 120, date: "Yesterday", status: "completed" },
  { id: 3, title: "CI/CD pipeline setup", client: "Noah Brown", amount: 180, date: "Dec 18", status: "completed" },
  { id: 4, title: "GraphQL schema review", client: "Emma W.", amount: 75, date: "Dec 15", status: "completed" },
  { id: 5, title: "React performance fix", client: "Alex J.", amount: 95, date: "Dec 12", status: "completed" },
];

const monthlyData = [
  { month: "Jul", amount: 1200 },
  { month: "Aug", amount: 1850 },
  { month: "Sep", amount: 2100 },
  { month: "Oct", amount: 1950 },
  { month: "Nov", amount: 2450 },
  { month: "Dec", amount: 2670 },
];

const EarningsPage = () => {
  const [period, setPeriod] = useState("month");
  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Earnings</h1>
            <p className="text-muted-foreground">Track your income and manage withdrawals</p>
          </div>
          <button className="gh-btn-primary px-4 py-2">
            <DollarSign className="w-4 h-4 mr-2" />
            Withdraw Funds
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gh-card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-primary" />
              <span className="text-xs text-success font-medium">+18%</span>
            </div>
            <p className="text-2xl font-bold text-foreground">$2,670</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="gh-card">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">$12,220</p>
            <p className="text-sm text-muted-foreground">Total Earned</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="gh-card">
            <div className="flex items-center justify-between mb-2">
              <CreditCard className="w-6 h-6 text-warning" />
              <span className="chip chip-warning text-xs">Pending</span>
            </div>
            <p className="text-2xl font-bold text-foreground">$455</p>
            <p className="text-sm text-muted-foreground">In Escrow</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="gh-card">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
            <p className="text-2xl font-bold text-foreground">$2,215</p>
            <p className="text-sm text-muted-foreground">Available</p>
          </motion.div>
        </div>

        {/* Chart */}
        <div className="gh-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-foreground">Earnings Overview</h3>
            <div className="flex gap-2">
              {["week", "month", "year"].map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded text-sm ${
                    period === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-end justify-between gap-2 h-48">
            {monthlyData.map((data, i) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.amount / maxAmount) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="w-full bg-primary/80 rounded-t-md min-h-[20px] relative group cursor-pointer hover:bg-primary"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${data.amount}
                  </div>
                </motion.div>
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Earnings */}
        <div className="gh-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Recent Earnings</h3>
            <button className="text-sm text-primary hover:underline flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
          <div className="space-y-3">
            {earnings.map((earning, i) => (
              <motion.div
                key={earning.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    earning.status === "pending" ? "bg-warning/20" : "bg-success/20"
                  }`}>
                    {earning.status === "pending" ? (
                      <ArrowDownLeft className="w-5 h-5 text-warning" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{earning.title}</p>
                    <p className="text-sm text-muted-foreground">From {earning.client} • {earning.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono font-bold text-success">+${earning.amount}</p>
                  <span className={`chip text-xs ${earning.status === "pending" ? "chip-warning" : "chip-success"}`}>
                    {earning.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EarningsPage;
