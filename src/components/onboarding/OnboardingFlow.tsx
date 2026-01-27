import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, ArrowRight, ArrowLeft, Check, Sparkles, 
  Shield, Clock, Users, Code, Briefcase, 
  User, Mail, Camera, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
};

const transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

const features = [
  {
    icon: Shield,
    title: "Verified Experts",
    description: "All trainers are vetted professionals with proven expertise",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "Fast Resolution",
    description: "Get your problems solved in hours, not days",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "1-on-1 Sessions",
    description: "Direct collaboration with experts via screen sharing",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Code,
    title: "Any Technology",
    description: "From React to DevOps, we cover all tech stacks",
    color: "from-orange-500 to-red-500",
  },
];

const userTypes = [
  {
    id: "user",
    title: "I Need Help",
    description: "Get expert assistance with your tech problems",
    icon: Briefcase,
  },
  {
    id: "trainer",
    title: "I'm an Expert",
    description: "Help others and earn money sharing your skills",
    icon: Code,
  },
];

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [[step, direction], setStep] = useState([0, 0]);
  const [userType, setUserType] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const totalSteps = 4;
  const progress = ((step + 1) / totalSteps) * 100;

  const nextStep = () => {
    if (step < totalSteps - 1) {
      setStep([step + 1, 1]);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep([step - 1, -1]);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return userType !== null;
      case 3:
        return profile.name.length > 0 && profile.email.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary/80"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Skip Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onComplete}
        className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
      >
        Skip
      </motion.button>

      {/* Step Indicators */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              i === step ? "bg-primary" : i < step ? "bg-primary/50" : "bg-muted-foreground/30"
            )}
            animate={{
              scale: i === step ? 1.2 : 1,
            }}
          />
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait" custom={direction}>
          {step === 0 && (
            <WelcomeStep key="welcome" direction={direction} />
          )}
          {step === 1 && (
            <FeaturesStep key="features" direction={direction} />
          )}
          {step === 2 && (
            <UserTypeStep
              key="usertype"
              direction={direction}
              userType={userType}
              setUserType={setUserType}
            />
          )}
          {step === 3 && (
            <ProfileStep
              key="profile"
              direction={direction}
              profile={profile}
              setProfile={setProfile}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="p-6 flex items-center justify-between max-w-2xl mx-auto w-full">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={step === 0}
          className={cn(
            "gap-2 transition-opacity",
            step === 0 && "opacity-0 pointer-events-none"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <Button
          onClick={nextStep}
          disabled={!canProceed()}
          className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:opacity-90"
        >
          {step === totalSteps - 1 ? (
            <>
              Get Started
              <Sparkles className="w-4 h-4" />
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function WelcomeStep({ direction }: { direction: number }) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="text-center max-w-lg"
    >
      {/* Animated Logo */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-2xl shadow-primary/30"
      >
        <Zap className="w-12 h-12 text-white" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4"
      >
        Welcome to{" "}
        <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          TechSolve
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-muted-foreground mb-8"
      >
        Your gateway to expert tech support. Connect with verified professionals
        who can solve your toughest challenges.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="flex items-center justify-center gap-4 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary" />
          <span>Free to start</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary" />
          <span>No credit card</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-primary" />
          <span>Cancel anytime</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FeaturesStep({ direction }: { direction: number }) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="max-w-2xl w-full"
    >
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-display font-bold text-foreground mb-3"
        >
          Why Choose TechSolve?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          Everything you need to solve tech problems fast
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="p-5 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                feature.color
              )}
            >
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function UserTypeStep({
  direction,
  userType,
  setUserType,
}: {
  direction: number;
  userType: string | null;
  setUserType: (type: string) => void;
}) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="max-w-xl w-full"
    >
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-display font-bold text-foreground mb-3"
        >
          How will you use TechSolve?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          Select your primary role
        </motion.p>
      </div>

      <div className="space-y-4">
        {userTypes.map((type, index) => (
          <motion.button
            key={type.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            onClick={() => setUserType(type.id)}
            className={cn(
              "w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4",
              userType === type.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/30 bg-card"
            )}
          >
            <div
              className={cn(
                "w-14 h-14 rounded-xl flex items-center justify-center transition-colors",
                userType === type.id
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <type.icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">{type.title}</h3>
              <p className="text-sm text-muted-foreground">{type.description}</p>
            </div>
            <div
              className={cn(
                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                userType === type.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30"
              )}
            >
              {userType === type.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

function ProfileStep({
  direction,
  profile,
  setProfile,
}: {
  direction: number;
  profile: { name: string; email: string; avatar: string };
  setProfile: (profile: { name: string; email: string; avatar: string }) => void;
}) {
  return (
    <motion.div
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="max-w-md w-full"
    >
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-display font-bold text-foreground mb-3"
        >
          Set Up Your Profile
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground"
        >
          Tell us a bit about yourself
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-6"
      >
        {/* Avatar Upload */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-24 h-24 rounded-full bg-muted border-2 border-dashed border-border hover:border-primary/50 transition-colors flex items-center justify-center group"
          >
            <Camera className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="absolute inset-0 rounded-full bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </div>

        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="John Doe"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="pl-11 h-12 bg-card"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="email"
              placeholder="john@example.com"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="pl-11 h-12 bg-card"
            />
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">Terms</a>
          {" "}and{" "}
          <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
        </p>
      </motion.div>
    </motion.div>
  );
}
