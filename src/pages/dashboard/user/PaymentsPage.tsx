import { useState } from "react";
import { Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, Plus, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const transactions = [
  { id: 1, type: "payment", description: "Payment to Sarah Chen", ticket: "T-1228", amount: -95, status: "completed", date: "Today, 10:30 AM" },
  { id: 2, type: "deposit", description: "Added funds via Stripe", amount: 200, status: "completed", date: "Yesterday, 3:45 PM" },
  { id: 3, type: "payment", description: "Payment to David Kim", ticket: "T-1220", amount: -75, status: "completed", date: "Dec 18, 2024" },
  { id: 4, type: "refund", description: "Refund from cancelled ticket", ticket: "T-1215", amount: 50, status: "completed", date: "Dec 15, 2024" },
  { id: 5, type: "payment", description: "Payment to James Lee", ticket: "T-1210", amount: -120, status: "pending", date: "Dec 12, 2024" },
];

const PaymentsPage = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "methods">("overview");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Payments</h1>
            <p className="text-muted-foreground">Manage your wallet and payment methods</p>
          </div>
          <button className="gh-btn-primary px-4 py-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Funds
          </button>
        </div>

        {/* Balance Cards */}
        <div className="grid md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="gh-card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30"
          >
            <div className="flex items-center justify-between mb-4">
              <Wallet className="w-8 h-8 text-primary" />
              <span className="chip chip-primary text-xs">Available</span>
            </div>
            <p className="text-3xl font-bold text-foreground">$150.00</p>
            <p className="text-sm text-muted-foreground mt-1">Wallet Balance</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gh-card"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-warning" />
              <span className="chip chip-warning text-xs">In Escrow</span>
            </div>
            <p className="text-3xl font-bold text-foreground">$270.00</p>
            <p className="text-sm text-muted-foreground mt-1">Pending Releases</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="gh-card"
          >
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-success" />
              <span className="chip chip-success text-xs">This Month</span>
            </div>
            <p className="text-3xl font-bold text-foreground">$545.00</p>
            <p className="text-sm text-muted-foreground mt-1">Total Spent</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border pb-4">
          {[
            { id: "overview", label: "Overview" },
            { id: "transactions", label: "Transactions" },
            { id: "methods", label: "Payment Methods" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <div className="gh-card">
              <h3 className="font-semibold text-foreground mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {transactions.slice(0, 4).map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? "bg-success/20" : "bg-muted"
                      }`}>
                        {tx.amount > 0 ? (
                          <ArrowDownLeft className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{tx.description}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <p className={`font-mono font-semibold ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                      {tx.amount > 0 ? "+" : ""}{tx.amount < 0 ? "-" : ""}${Math.abs(tx.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div className="gh-card">
              <h3 className="font-semibold text-foreground mb-4">Payment Methods</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">•••• 4242</p>
                      <p className="text-xs text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <span className="chip chip-primary text-xs">Default</span>
                </div>
                <button className="w-full p-3 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "transactions" && (
          <div className="gh-card">
            <div className="space-y-3">
              {transactions.map((tx, i) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      tx.amount > 0 ? "bg-success/20" : "bg-muted"
                    }`}>
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="w-6 h-6 text-success" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tx.description}</p>
                      {tx.ticket && <p className="text-xs text-primary">{tx.ticket}</p>}
                      <p className="text-sm text-muted-foreground">{tx.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono text-xl font-bold ${tx.amount > 0 ? "text-success" : "text-foreground"}`}>
                      {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                    </p>
                    <span className={`chip text-xs ${tx.status === "completed" ? "chip-success" : "chip-warning"}`}>
                      {tx.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "methods" && (
          <div className="gh-card max-w-xl">
            <h3 className="font-semibold text-foreground mb-4">Saved Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/26</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="chip chip-primary text-xs">Default</span>
                  <button className="text-sm text-muted-foreground hover:text-foreground">Edit</button>
                </div>
              </div>
              <button className="w-full p-4 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Payment Method
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;
