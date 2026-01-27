import { useNavigate } from "react-router-dom";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";

const Onboarding = () => {
  const navigate = useNavigate();

  const handleComplete = () => {
    // Mark onboarding as complete in localStorage
    localStorage.setItem("onboarding_complete", "true");
    navigate("/");
  };

  return <OnboardingFlow onComplete={handleComplete} />;
};

export default Onboarding;
