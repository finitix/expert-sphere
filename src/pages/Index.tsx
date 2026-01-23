import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/landing/HeroSection";
import { LiveTicketsFeed } from "@/components/landing/LiveTicketsFeed";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Features } from "@/components/landing/Features";
import { TopTrainers } from "@/components/landing/TopTrainers";
import { TrustSection } from "@/components/landing/TrustSection";
import { CTASection } from "@/components/landing/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LiveTicketsFeed />
        <HowItWorks />
        <Features />
        <TopTrainers />
        <TrustSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
