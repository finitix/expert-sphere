import { useState } from "react";
import { Users, Search, MoreHorizontal, Eye, Mail, Ban, CheckCircle2, XCircle, UserPlus, Download } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const users = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", role: "user", status: "active", joined: "Dec 20, 2024", tickets: 3, spent: "$245" },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", role: "user", status: "active", joined: "Dec 18, 2024", tickets: 1, spent: "$80" },
  { id: 3, name: "James Lee", email: "james@example.com", role: "trainer", status: "active", joined: "Dec 15, 2024", tickets: 0, spent: "$0" },
  { id: 4, name: "Lisa Chen", email: "lisa@example.com", role: "user", status: "suspended", joined: "Dec 10, 2024", tickets: 5, spent: "$420" },
  { id: 5, name: "David Kim", email: "david@example.com", role: "trainer", status: "active", joined: "Dec 5, 2024", tickets: 0, spent: "$0" },
  { id: 6, name: "Emma Wilson", email: "emma@example.com", role: "user", status: "active", joined: "Nov 28, 2024", tickets: 8, spent: "$680" },
  { id: 7, name: "Noah Brown", email: "noah@example.com", role: "user", status: "active", joined: "Nov 20, 2024", tickets: 2, spent: "$150" },
  { id: 8, name: "Sophia Martinez", email: "sophia@example.com", role: "user", status: "inactive", joined: "Nov 15, 2024", tickets: 0, spent: "$0" },
];

const AdminUsersPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = users.filter(user => {
    if (search && !user.name.toLowerCase().includes(search.toLowerCase()) && !user.email.toLowerCase().includes(search.toLowerCase())) return false;
    if (roleFilter !== "all" && user.role !== roleFilter) return false;
    if (statusFilter !== "all" && user.status !== statusFilter) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
            <p className="text-muted-foreground">Manage all platform users and their accounts</p>
          </div>
          <div className="flex gap-2">
            <button className="gh-btn-secondary px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button className="gh-btn-primary px-4 py-2">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="gh-input pl-10 w-full"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="gh-input w-40"
          >
            <option value="all">All Roles</option>
            <option value="user">Users</option>
            <option value="trainer">Trainers</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="gh-input w-40"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        {/* Users Table */}
        <div className="gh-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Tickets</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Spent</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-b border-border/50 hover:bg-muted/20"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-medium text-white">
                          {user.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`chip text-xs ${user.role === "trainer" ? "chip-primary" : ""}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`chip text-xs ${
                        user.status === "active" ? "chip-success" :
                        user.status === "suspended" ? "chip-warning" : ""
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-muted-foreground">{user.joined}</td>
                    <td className="py-4 px-6 text-sm font-mono text-foreground">{user.tickets}</td>
                    <td className="py-4 px-6 text-sm font-mono text-primary">{user.spent}</td>
                    <td className="py-4 px-6">
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
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing {filteredUsers.length} of {users.length} users</p>
          <div className="flex gap-2">
            <button className="gh-btn-secondary px-3 py-1 text-sm" disabled>Previous</button>
            <button className="gh-btn-secondary px-3 py-1 text-sm">Next</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsersPage;
