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
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/dashboard/UserDashboard";
import TrainerDashboard from "./pages/dashboard/TrainerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<UserDashboard />} />
              <Route path="/dashboard/*" element={<UserDashboard />} />
              <Route path="/trainer" element={<TrainerDashboard />} />
              <Route path="/trainer/*" element={<TrainerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
