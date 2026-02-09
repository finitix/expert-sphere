import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, ArrowLeft, Upload, X, Check, 
  Code, Database, Cloud, Smartphone, Globe, Shield,
  Zap, DollarSign, Clock, AlertCircle, Sparkles
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs } from "@/components/effects/BackgroundEffects";
import { useAuth } from "@/contexts/AuthContext";
import { ticketService } from "@/services/tickets";
import { toast } from "sonner";

const categories = [
  { id: "frontend", icon: Globe, label: "Frontend", color: "primary" },
  { id: "backend", icon: Database, label: "Backend", color: "secondary" },
  { id: "devops", icon: Cloud, label: "DevOps", color: "accent" },
  { id: "mobile", icon: Smartphone, label: "Mobile", color: "warning" },
  { id: "security", icon: Shield, label: "Security", color: "destructive" },
  { id: "other", icon: Code, label: "Other", color: "muted" },
];

const urgencyOptions = [
  { id: "low", label: "Low", description: "No rush, 1-3 days", color: "success", multiplier: "1x" },
  { id: "medium", label: "Medium", description: "Within 24 hours", color: "warning", multiplier: "1.5x" },
  { id: "high", label: "High", description: "ASAP, few hours", color: "destructive", multiplier: "2x" },
];

const budgetRanges = [
  { id: "small", range: "$25-50", label: "Quick Fix" },
  { id: "medium", range: "$50-150", label: "Standard" },
  { id: "large", range: "$150-500", label: "Complex" },
  { id: "custom", range: "Custom", label: "Enterprise" },
];

const steps = [
  { id: 1, title: "Category", icon: Code },
  { id: 2, title: "Details", icon: Zap },
  { id: 3, title: "Budget", icon: DollarSign },
  { id: 4, title: "Review", icon: Check },
];

const CreateTicket = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    files: [] as File[],
    urgency: "medium",
    budget: "medium",
    customBudget: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: "/create-ticket" } } });
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(e.target.files!)],
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const budgetMap: Record<string, number> = { small: 50, medium: 100, large: 300, custom: Number(formData.customBudget) || 0 };
      await ticketService.create({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        budget: budgetMap[formData.budget] || 100,
      });
      toast.success("Ticket created successfully!");
      navigate("/dashboard/tickets");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to create ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.category && formData.title.length > 3;
      case 2:
        return formData.description.length > 10;
      case 3:
        return formData.budget && formData.urgency;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative pt-24 pb-12">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <GlowOrbs />
          <BackgroundBeams className="opacity-30" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="gh-badge-primary mb-4 inline-flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              Create a Ticket
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Describe your <span className="gradient-text">problem</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Follow the steps to create a detailed ticket and get matched with the perfect expert
            </p>
          </motion.div>

          {/* Progress Steps */}
          <div className="max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-accent to-secondary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

              {steps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    animate={{
                      scale: currentStep === step.id ? 1.1 : 1,
                      backgroundColor: currentStep >= step.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 ${
                      currentStep >= step.id ? "shadow-lg shadow-primary/30" : ""
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-5 h-5 text-primary-foreground" />
                    ) : (
                      <step.icon className={`w-5 h-5 ${currentStep >= step.id ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    )}
                  </motion.div>
                  <span className={`mt-2 text-sm font-medium ${currentStep >= step.id ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="gh-glass p-8 rounded-2xl"
              layout
            >
              <AnimatePresence mode="wait">
                {/* Step 1: Category & Title */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        What area is your problem in?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {categories.map((cat) => (
                          <motion.button
                            key={cat.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData((prev) => ({ ...prev, category: cat.id }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              formData.category === cat.id
                                ? `border-${cat.color} bg-${cat.color}/10`
                                : "border-border hover:border-muted-foreground/50 bg-card"
                            }`}
                          >
                            <cat.icon className={`w-6 h-6 mb-2 ${formData.category === cat.id ? `text-${cat.color}` : "text-muted-foreground"}`} />
                            <span className="font-medium text-foreground">{cat.label}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Give your problem a title
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g., React useEffect causing infinite loop"
                        className="gh-input w-full text-lg py-4"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Be specific but concise. Good titles get faster responses.
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Description & Files */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Describe your problem in detail
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        placeholder="What are you trying to achieve? What have you tried? Include error messages if any..."
                        rows={6}
                        className="gh-input w-full resize-none"
                      />
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span>Include relevant code snippets or error messages</span>
                        <span>{formData.description.length} characters</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Attach files (optional)
                      </label>
                      <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Drag and drop or <span className="text-primary">browse</span>
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Screenshots, logs, code files
                          </p>
                        </label>
                      </div>

                      {formData.files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {formData.files.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                              <span className="text-sm text-foreground truncate">{file.name}</span>
                              <button onClick={() => removeFile(index)} className="p-1 hover:bg-muted rounded">
                                <X className="w-4 h-4 text-muted-foreground" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Budget & Urgency */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        How urgent is this?
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {urgencyOptions.map((option) => (
                          <motion.button
                            key={option.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData((prev) => ({ ...prev, urgency: option.id }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              formData.urgency === option.id
                                ? `border-${option.color} bg-${option.color}/10`
                                : "border-border hover:border-muted-foreground/50"
                            }`}
                          >
                            <Clock className={`w-5 h-5 mb-2 ${formData.urgency === option.id ? `text-${option.color}` : "text-muted-foreground"}`} />
                            <p className="font-medium text-foreground">{option.label}</p>
                            <p className="text-xs text-muted-foreground">{option.description}</p>
                            <p className={`text-xs mt-1 font-mono ${formData.urgency === option.id ? `text-${option.color}` : "text-muted-foreground"}`}>
                              {option.multiplier} rate
                            </p>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        What's your budget?
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {budgetRanges.map((budget) => (
                          <motion.button
                            key={budget.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setFormData((prev) => ({ ...prev, budget: budget.id }))}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                              formData.budget === budget.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-muted-foreground/50"
                            }`}
                          >
                            <p className="font-mono font-bold text-foreground">{budget.range}</p>
                            <p className="text-xs text-muted-foreground">{budget.label}</p>
                          </motion.button>
                        ))}
                      </div>
                      
                      {formData.budget === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3"
                        >
                          <input
                            type="text"
                            value={formData.customBudget}
                            onChange={(e) => setFormData((prev) => ({ ...prev, customBudget: e.target.value }))}
                            placeholder="Enter your budget..."
                            className="gh-input w-full"
                          />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">Review Your Ticket</h3>
                      <p className="text-muted-foreground text-sm">Make sure everything looks correct</p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Category</p>
                        <p className="font-medium text-foreground capitalize">{formData.category}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Title</p>
                        <p className="font-medium text-foreground">{formData.title}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-muted/30 border border-border">
                        <p className="text-xs text-muted-foreground mb-1">Description</p>
                        <p className="text-foreground text-sm">{formData.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Urgency</p>
                          <p className="font-medium text-foreground capitalize">{formData.urgency}</p>
                        </div>
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-1">Budget</p>
                          <p className="font-medium text-foreground">
                            {budgetRanges.find((b) => b.id === formData.budget)?.range}
                          </p>
                        </div>
                      </div>

                      {formData.files.length > 0 && (
                        <div className="p-4 rounded-lg bg-muted/30 border border-border">
                          <p className="text-xs text-muted-foreground mb-2">Attachments</p>
                          <div className="flex flex-wrap gap-2">
                            {formData.files.map((file, i) => (
                              <span key={i} className="chip text-xs">{file.name}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`gh-btn-secondary px-6 py-3 ${currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </motion.button>

                {currentStep < 4 ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className={`gh-btn-primary px-6 py-3 ${!isStepValid() ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    className="gh-btn-primary px-8 py-3 text-lg"
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Submit Ticket
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateTicket;
