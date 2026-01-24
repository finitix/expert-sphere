import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Feed from "./pages/Feed";
import Trainers from "./pages/Trainers";
import TrainerProfile from "./pages/TrainerProfile";
import HowItWorks from "./pages/HowItWorks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateTicket from "./pages/CreateTicket";
import UserDashboard from "./pages/dashboard/UserDashboard";
import TrainerDashboard from "./pages/dashboard/TrainerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
// User pages
import TicketsPage from "./pages/dashboard/user/TicketsPage";
import MessagesPage from "./pages/dashboard/user/MessagesPage";
import PaymentsPage from "./pages/dashboard/user/PaymentsPage";
// Trainer pages
import RequestsPage from "./pages/dashboard/trainer/RequestsPage";
import ProjectsPage from "./pages/dashboard/trainer/ProjectsPage";
import EarningsPage from "./pages/dashboard/trainer/EarningsPage";
import ProfilePage from "./pages/dashboard/trainer/ProfilePage";
// Admin pages
import AdminUsersPage from "./pages/dashboard/admin/UsersPage";
import AdminTrainersPage from "./pages/dashboard/admin/TrainersPage";
import AdminTicketsPage from "./pages/dashboard/admin/TicketsPage";
import VerificationPage from "./pages/dashboard/admin/VerificationPage";
// Shared
import SettingsPage from "./pages/dashboard/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/trainers" element={<Trainers />} />
              <Route path="/trainer/:username" element={<TrainerProfile />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/create-ticket" element={<CreateTicket />} />
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
              {/* Admin Dashboard */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/trainers" element={<AdminTrainersPage />} />
              <Route path="/admin/tickets" element={<AdminTicketsPage />} />
              <Route path="/admin/verification" element={<VerificationPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
