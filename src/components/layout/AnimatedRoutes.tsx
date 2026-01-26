import { ReactNode, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PageLoader } from "@/components/ui/PageLoader";

// Lazy load all pages for better performance
const Index = lazy(() => import("@/pages/Index"));
const Feed = lazy(() => import("@/pages/Feed"));
const Trainers = lazy(() => import("@/pages/Trainers"));
const TrainerProfile = lazy(() => import("@/pages/TrainerProfile"));
const HowItWorks = lazy(() => import("@/pages/HowItWorks"));
const About = lazy(() => import("@/pages/About"));
const Login = lazy(() => import("@/pages/Login"));
const Signup = lazy(() => import("@/pages/Signup"));
const CreateTicket = lazy(() => import("@/pages/CreateTicket"));
const UserDashboard = lazy(() => import("@/pages/dashboard/UserDashboard"));
const TrainerDashboard = lazy(() => import("@/pages/dashboard/TrainerDashboard"));
const AdminDashboard = lazy(() => import("@/pages/dashboard/AdminDashboard"));
const TicketsPage = lazy(() => import("@/pages/dashboard/user/TicketsPage"));
const MessagesPage = lazy(() => import("@/pages/dashboard/user/MessagesPage"));
const PaymentsPage = lazy(() => import("@/pages/dashboard/user/PaymentsPage"));
const RequestsPage = lazy(() => import("@/pages/dashboard/trainer/RequestsPage"));
const ProjectsPage = lazy(() => import("@/pages/dashboard/trainer/ProjectsPage"));
const EarningsPage = lazy(() => import("@/pages/dashboard/trainer/EarningsPage"));
const ProfilePage = lazy(() => import("@/pages/dashboard/trainer/ProfilePage"));
const AdminUsersPage = lazy(() => import("@/pages/dashboard/admin/UsersPage"));
const AdminTrainersPage = lazy(() => import("@/pages/dashboard/admin/TrainersPage"));
const AdminTicketsPage = lazy(() => import("@/pages/dashboard/admin/TicketsPage"));
const VerificationPage = lazy(() => import("@/pages/dashboard/admin/VerificationPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Smooth page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 8,
    scale: 0.99,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 0,
    y: -8,
    scale: 0.99,
  },
};

const pageTransition = {
  type: "tween",
  ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for smooth feel
  duration: 0.35,
};

interface PageWrapperProps {
  children: ReactNode;
}

function PageWrapper({ children }: PageWrapperProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Index /></PageWrapper>} />
          <Route path="/feed" element={<PageWrapper><Feed /></PageWrapper>} />
          <Route path="/trainers" element={<PageWrapper><Trainers /></PageWrapper>} />
          <Route path="/trainer/:username" element={<PageWrapper><TrainerProfile /></PageWrapper>} />
          <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
          <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/create-ticket" element={<PageWrapper><CreateTicket /></PageWrapper>} />
          {/* User Dashboard */}
          <Route path="/dashboard" element={<PageWrapper><UserDashboard /></PageWrapper>} />
          <Route path="/dashboard/tickets" element={<PageWrapper><TicketsPage /></PageWrapper>} />
          <Route path="/dashboard/messages" element={<PageWrapper><MessagesPage /></PageWrapper>} />
          <Route path="/dashboard/payments" element={<PageWrapper><PaymentsPage /></PageWrapper>} />
          <Route path="/dashboard/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
          {/* Trainer Dashboard */}
          <Route path="/trainer" element={<PageWrapper><TrainerDashboard /></PageWrapper>} />
          <Route path="/trainer/requests" element={<PageWrapper><RequestsPage /></PageWrapper>} />
          <Route path="/trainer/projects" element={<PageWrapper><ProjectsPage /></PageWrapper>} />
          <Route path="/trainer/earnings" element={<PageWrapper><EarningsPage /></PageWrapper>} />
          <Route path="/trainer/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
          <Route path="/trainer/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
          {/* Admin Dashboard */}
          <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
          <Route path="/admin/users" element={<PageWrapper><AdminUsersPage /></PageWrapper>} />
          <Route path="/admin/trainers" element={<PageWrapper><AdminTrainersPage /></PageWrapper>} />
          <Route path="/admin/tickets" element={<PageWrapper><AdminTicketsPage /></PageWrapper>} />
          <Route path="/admin/verification" element={<PageWrapper><VerificationPage /></PageWrapper>} />
          <Route path="/admin/settings" element={<PageWrapper><SettingsPage /></PageWrapper>} />
          <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}
