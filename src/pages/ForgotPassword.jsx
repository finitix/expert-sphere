import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Zap, ArrowLeft, KeyRound, CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";
import { studentAuth, teacherAuth } from "@/services/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils.js";
const ForgotPassword = () => {
    const [step, setStep] = useState("email");
    const [role, setRole] = useState("user");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const authService = role === "user" ? studentAuth : teacherAuth;
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authService.forgotPassword(email);
            toast.success("OTP sent to your email!");
            setStep("otp");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to send OTP");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authService.verifyResetOtp({ email, otp });
            toast.success("OTP verified!");
            setStep("reset");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Invalid OTP");
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        setIsLoading(true);
        try {
            await authService.resetPassword({ email, password, confirmPassword });
            toast.success("Password reset successfully!");
            setStep("done");
        }
        catch (err) {
            toast.error(err instanceof Error ? err.message : "Failed to reset password");
        }
        finally {
            setIsLoading(false);
        }
    };
    return (<PageTransition>
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Zap className="w-5 h-5 text-white"/>
              </div>
              <span className="font-display font-bold text-xl text-foreground">TechSolve</span>
            </Link>
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              {step === "done" ? "All Done!" : "Reset Password"}
            </h2>
            <p className="text-muted-foreground">
              {step === "email" && "Enter your email to receive a reset code"}
              {step === "otp" && "Enter the OTP sent to your email"}
              {step === "reset" && "Create your new password"}
              {step === "done" && "Your password has been reset successfully"}
            </p>
          </div>

          {step !== "done" && (<div className="flex rounded-lg bg-muted p-1 mb-6">
              {["user", "trainer"].map((r) => (<button key={r} onClick={() => setRole(r)} disabled={step !== "email"} className={cn("flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all", role === r
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground")}>
                  {r === "user" ? "Student" : "Teacher"}
                </button>))}
            </div>)}

          {step === "email" && (<form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="input-field pl-10 w-full"/>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5">
                {isLoading ? "Sending..." : "Send Reset Code"}
              </button>
            </form>)}

          {step === "otp" && (<form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">OTP Code</label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter 6-digit code" maxLength={6} required className="input-field pl-10 w-full text-center tracking-[0.5em] text-lg font-mono"/>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5">
                {isLoading ? "Verifying..." : "Verify Code"}
              </button>
              <button type="button" onClick={() => setStep("email")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                Didn't receive code? Go back
              </button>
            </form>)}

          {step === "reset" && (<form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="input-field pl-10 pr-10 w-full"/>
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4"/> : <Eye className="w-4 h-4"/>}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••" required className="input-field pl-10 w-full"/>
                </div>
              </div>
              <button type="submit" disabled={isLoading} className="w-full btn-primary py-2.5">
                {isLoading ? "Resetting..." : "Reset Password"}
              </button>
            </form>)}

          {step === "done" && (<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-success"/>
              </div>
              <Link to="/login" className="btn-primary inline-block px-8 py-2.5">
                Go to Login
              </Link>
            </motion.div>)}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
              <ArrowLeft className="w-4 h-4"/>
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </PageTransition>);
};
export default ForgotPassword;
