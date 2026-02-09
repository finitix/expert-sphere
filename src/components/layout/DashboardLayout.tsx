import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Zap, LayoutDashboard, Ticket, MessageSquare, Wallet, Settings, 
  Users, BadgeCheck, TrendingUp, Shield, LogOut, Bell, Plus
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const userNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: Ticket, label: "My Tickets", href: "/dashboard/tickets" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
  { icon: Wallet, label: "Payments", href: "/dashboard/payments" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const trainerNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/trainer" },
  { icon: Ticket, label: "Requests", href: "/trainer/requests" },
  { icon: MessageSquare, label: "Projects", href: "/trainer/projects" },
  { icon: TrendingUp, label: "Earnings", href: "/trainer/earnings" },
  { icon: BadgeCheck, label: "Profile", href: "/trainer/profile" },
  { icon: Settings, label: "Settings", href: "/trainer/settings" },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: BadgeCheck, label: "Trainers", href: "/admin/trainers" },
  { icon: Ticket, label: "Tickets", href: "/admin/tickets" },
  { icon: Shield, label: "Verification", href: "/admin/verification" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = user?.role === "admin" 
    ? adminNavItems 
    : user?.role === "trainer" 
    ? trainerNavItems 
    : userNavItems;

  const roleColors = {
    user: "bg-secondary",
    trainer: "bg-primary",
    admin: "bg-accent",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-sidebar fixed left-0 top-0 bottom-0 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">TechSolve</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white",
              roleColors[user?.role || "user"]
            )}>
              {user?.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = item.href === "/dashboard" || item.href === "/trainer" || item.href === "/admin"
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn("sidebar-link", isActive && "active")}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-border">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="sidebar-link w-full text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              {navItems.find(item => item.href === location.pathname)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {user?.role === "user" && (
              <Link to="/create-ticket" className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Ticket
              </Link>
            )}
            <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="p-6"
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
}
