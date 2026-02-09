import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";

// Eager load for instant first paint
import Index from "./pages/Index";

// Lazy load all other pages
const Feed = lazy(() => import("./pages/Feed"));
const Trainers = lazy(() => import("./pages/Trainers"));
const TrainerProfile = lazy(() => import("./pages/TrainerProfile"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const About = lazy(() => import("./pages/About"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboard pages - lazy loaded
const UserDashboard = lazy(() => import("./pages/dashboard/UserDashboard"));
const TrainerDashboard = lazy(() => import("./pages/dashboard/TrainerDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboard/AdminDashboard"));
const TicketsPage = lazy(() => import("./pages/dashboard/user/TicketsPage"));
const MessagesPage = lazy(() => import("./pages/dashboard/user/MessagesPage"));
const PaymentsPage = lazy(() => import("./pages/dashboard/user/PaymentsPage"));
const RequestsPage = lazy(() => import("./pages/dashboard/trainer/RequestsPage"));
const ProjectsPage = lazy(() => import("./pages/dashboard/trainer/ProjectsPage"));
const EarningsPage = lazy(() => import("./pages/dashboard/trainer/EarningsPage"));
const ProfilePage = lazy(() => import("./pages/dashboard/trainer/ProfilePage"));
const AdminUsersPage = lazy(() => import("./pages/dashboard/admin/UsersPage"));
const AdminTrainersPage = lazy(() => import("./pages/dashboard/admin/TrainersPage"));
const AdminTicketsPage = lazy(() => import("./pages/dashboard/admin/TicketsPage"));
const VerificationPage = lazy(() => import("./pages/dashboard/admin/VerificationPage"));
const SettingsPage = lazy(() => import("./pages/dashboard/SettingsPage"));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground animate-pulse">Loading…</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/trainers" element={<Trainers />} />
                <Route path="/trainer/:username" element={<TrainerProfile />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/create-ticket" element={<CreateTicket />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                {/* User Dashboard */}
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/dashboard/tickets" element={<TicketsPage />} />
                <Route path="/dashboard/messages" element={<MessagesPage />} />
                <Route path="/dashboard/payments" element={<PaymentsPage />} />
                <Route path="/dashboard/settings" element={<SettingsPage />} />
                {/* Trainer Dashboard */}
                <Route path="/trainer" element={<TrainerDashboard />} />
                <Route path="/trainer/requests" element={<RequestsPage />} />
                <Route path="/trainer/projects" element={<ProjectsPage />} />
                <Route path="/trainer/earnings" element={<EarningsPage />} />
                <Route path="/trainer/profile" element={<ProfilePage />} />
                <Route path="/trainer/settings" element={<SettingsPage />} />
                {/* Admin Dashboard - URL only, no UI links */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsersPage />} />
                <Route path="/admin/trainers" element={<AdminTrainersPage />} />
                <Route path="/admin/tickets" element={<AdminTicketsPage />} />
                <Route path="/admin/verification" element={<VerificationPage />} />
                <Route path="/admin/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
