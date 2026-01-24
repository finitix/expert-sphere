import { useState } from "react";
import { BadgeCheck, Search, Star, Eye, Ban, CheckCircle2, XCircle, Calendar, DollarSign, MessageSquare } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const trainers = [
  { id: 1, name: "Sarah Chen", email: "sarah@example.com", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", expertise: ["React", "Node.js"], rating: 4.9, reviews: 234, solved: 189, earnings: "$12,450", status: "verified", joined: "Jan 2022" },
  { id: 2, name: "David Kim", email: "david@example.com", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", expertise: ["PostgreSQL", "MongoDB"], rating: 5.0, reviews: 156, solved: 142, earnings: "$9,870", status: "verified", joined: "Mar 2022" },
  { id: 3, name: "James Lee", email: "james@example.com", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", expertise: ["AWS", "Kubernetes"], rating: 4.8, reviews: 312, solved: 267, earnings: "$18,230", status: "verified", joined: "Feb 2022" },
  { id: 4, name: "Lisa Park", email: "lisa@example.com", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", expertise: ["Vue", "React"], rating: 4.9, reviews: 198, solved: 176, earnings: "$11,560", status: "verified", joined: "Apr 2022" },
  { id: 5, name: "Emma Wilson", email: "emma@example.com", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100", expertise: ["Security", "OAuth"], rating: 4.9, reviews: 89, solved: 76, earnings: "$8,340", status: "suspended", joined: "Jun 2022" },
];

const AdminTrainersPage = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTrainers = trainers.filter(trainer => {
    if (search && !trainer.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter !== "all" && trainer.status !== statusFilter) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trainer Management</h1>
            <p className="text-muted-foreground">Manage verified trainers on the platform</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="gh-card">
            <p className="text-2xl font-bold text-foreground">523</p>
            <p className="text-sm text-muted-foreground">Total Trainers</p>
          </div>
          <div className="gh-card">
            <p className="text-2xl font-bold text-success">498</p>
            <p className="text-sm text-muted-foreground">Verified</p>
          </div>
          <div className="gh-card">
            <p className="text-2xl font-bold text-warning">12</p>
            <p className="text-sm text-muted-foreground">Pending Review</p>
          </div>
          <div className="gh-card">
            <p className="text-2xl font-bold text-destructive">13</p>
            <p className="text-sm text-muted-foreground">Suspended</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="gh-input pl-10 w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="gh-input w-40"
          >
            <option value="all">All Status</option>
            <option value="verified">Verified</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Trainers Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredTrainers.map((trainer, i) => (
            <motion.div
              key={trainer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="gh-card"
            >
              <div className="flex items-start gap-4">
                <img src={trainer.avatar} alt={trainer.name} className="w-14 h-14 rounded-full object-cover" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{trainer.name}</h3>
                        <BadgeCheck className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-muted-foreground">{trainer.email}</p>
                    </div>
                    <span className={`chip text-xs ${trainer.status === "verified" ? "chip-success" : "chip-warning"}`}>
                      {trainer.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {trainer.expertise.map(skill => (
                      <span key={skill} className="chip text-xs">{skill}</span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-current" />
                      <span className="font-medium text-foreground">{trainer.rating}</span>
                      <span className="text-muted-foreground">({trainer.reviews})</span>
                    </div>
                    <span className="text-muted-foreground">{trainer.solved} solved</span>
                    <span className="font-mono text-primary">{trainer.earnings}</span>
                  </div>

                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                    <button className="gh-btn-secondary px-3 py-1.5 text-sm flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="gh-btn-secondary px-3 py-1.5 text-sm flex-1">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Contact
                    </button>
                    <button className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive">
                      <Ban className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminTrainersPage;
