import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Zap, Github, Check } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"user" | "trainer">("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(userType);
    navigate(userType === "trainer" ? "/trainer" : "/dashboard");
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="font-display font-bold text-xl text-foreground">TechSolve</span>
              </Link>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">Create an account</h2>
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex rounded-lg bg-muted p-1 mb-6">
              <button
                onClick={() => setUserType("user")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  userType === "user"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                I need help
              </button>
              <button
                onClick={() => setUserType("trainer")}
                className={cn(
                  "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all",
                  userType === "trainer"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                I'm an expert
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="mt-1 rounded border-border" />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              <button type="submit" className="w-full btn-primary py-2.5">
                {userType === "trainer" ? "Apply as Trainer" : "Create Account"}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-background text-muted-foreground">or</span>
                </div>
              </div>

              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-md bg-muted border border-border text-foreground hover:bg-muted/80 transition-colors text-sm font-medium">
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-background-secondary border-l border-border items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              {userType === "trainer" ? "Join as an Expert" : "Start Solving Problems"}
            </h2>
            
            <div className="space-y-4">
              {(userType === "trainer"
                ? [
                    "Set your own rates",
                    "Choose your projects",
                    "Get paid securely",
                    "Build your reputation",
                  ]
                : [
                    "Post problems for free",
                    "Get matched with experts",
                    "Pay only when solved",
                    "Secure payment protection",
                  ]
              ).map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                "TechSolve helped me solve a critical production issue in under an hour. 
                The trainer was incredibly knowledgeable."
              </p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-white">
                  JD
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">Senior Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Signup;
