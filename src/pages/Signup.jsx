import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, User, Zap, Check, KeyRound } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { PageTransition } from "@/components/layout/PageTransition";
import { toast } from "sonner";
const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState("form");
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { signup, verifyOtp, resendOtp } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }
        if (formData.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }
        setIsLoading(true);
        try {
            await signup(formData.name, formData.email, formData.password);
            toast.success("Account created! Check your email for the verification code.");
            setStep("otp");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Signup failed");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (!otp) {
            toast.error("Please enter the OTP code");
            return;
        }
        setIsLoading(true);
        try {
            await verifyOtp(formData.email, otp);
            toast.success("Email verified! Welcome to TechSolve!");
            navigate("/dashboard", { replace: true });
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Invalid OTP");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleResendOtp = async () => {
        try {
            await resendOtp(formData.email);
            toast.success("New OTP sent to your email!");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to resend OTP");
        }
    };
    return (<PageTransition>
      <div className="min-h-screen bg-background flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white"/>
                </div>
                <span className="font-display font-bold text-xl text-foreground">TechSolve</span>
              </Link>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                {step === "otp" ? "Verify Your Email" : "Create an account"}
              </h2>
              <p className="text-muted-foreground">
                {step === "otp" ? (<>We sent a 6-digit code to <strong className="text-foreground">{formData.email}</strong></>) : (<>Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">Sign in</Link></>)}
              </p>
            </div>

            {step === "form" ? (<form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" required className="input-field pl-10"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@example.com" required className="input-field pl-10"/>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                    <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} placeholder="••••••••" required minLength={6} className="input-field pl-10 pr-10"/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" id="terms" required className="mt-1 rounded border-border"/>
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">Terms</Link>
                    {" "}and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (<span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"/>
                      Creating account...
                    </span>) : ("Create Account")}
                </button>
              </form>) : (<form onSubmit={handleVerifyOtp} className="space-y-6">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                    <KeyRound className="w-8 h-8 text-primary"/>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block text-center">
                      Enter verification code
                    </label>
                    <input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder="000000" maxLength={6} required className="input-field text-center tracking-[0.5em] text-2xl font-mono w-full"/>
                    <p className="text-xs text-muted-foreground mt-2 text-center">
                      Code expires in 10 minutes
                    </p>
                  </div>
                </motion.div>

                <button type="submit" disabled={isLoading || otp.length < 6} className="w-full btn-primary py-2.5 disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? (<span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"/>
                      Verifying...
                    </span>) : ("Verify Email")}
                </button>

                <div className="text-center space-y-2">
                  <button type="button" onClick={handleResendOtp} className="text-sm text-primary hover:underline">
                    Resend code
                  </button>
                  <button type="button" onClick={() => setStep("form")} className="block w-full text-sm text-muted-foreground hover:text-foreground">
                    Back to signup
                  </button>
                </div>
              </form>)}
          </div>
        </div>

        {/* Right Side - Features */}
        <div className="hidden lg:flex lg:w-1/2 bg-background-secondary border-l border-border items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-display font-bold text-foreground mb-6">
              Start Solving Problems
            </h2>
            
            <div className="space-y-4">
              {[
            "Post problems for free",
            "Get matched with experts",
            "Real-time chat with teachers",
            "Secure payment protection",
        ].map((item, i) => (<motion.div key={item} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary"/>
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>))}
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
    </PageTransition>);
};
export default Signup;
