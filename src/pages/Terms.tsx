import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Shield, FileText, AlertTriangle, CreditCard, Users, Scale, Globe, Clock } from "lucide-react";

const sections = [
  {
    icon: FileText,
    title: "1. Acceptance of Terms",
    content: `By accessing or using TechSolve ("Platform," "we," "us," or "our"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, you must not use the Platform. We reserve the right to modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the revised Terms. We will notify registered users of material changes via email or in-app notification at least 30 days before they take effect.`,
  },
  {
    icon: Users,
    title: "2. Account Registration & Eligibility",
    content: `You must be at least 18 years of age (or the age of majority in your jurisdiction) to create an account. You agree to provide accurate, current, and complete information during registration and to keep your account information updated. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these Terms, provide false information, or engage in fraudulent activity.`,
  },
  {
    icon: Scale,
    title: "3. Platform Services & User Roles",
    content: `TechSolve connects individuals seeking assistance ("Students") with verified experts ("Teachers") across various domains. The Platform facilitates ticket-based problem resolution, real-time communication, and secure payments.

Students may: post tickets describing their problems, browse and select Teachers, communicate via in-app messaging, and rate completed sessions.

Teachers may: apply for verification, accept or decline ticket requests, provide expert assistance, set their own rates, and withdraw earned funds.

TechSolve acts solely as an intermediary. We do not employ Teachers, guarantee outcomes, or endorse the quality of any specific Teacher's services. Teachers are independent service providers.`,
  },
  {
    icon: CreditCard,
    title: "4. Payments, Fees & Escrow",
    content: `All payments are processed through our secure third-party payment partners. When a Student accepts a Teacher's proposal, the agreed fee is held in escrow until the work is completed and approved.

Platform Fee: TechSolve charges a service fee (displayed before payment confirmation) on each transaction. This fee is non-refundable once work has commenced.

Refund Policy: Students may request a full refund if no work has been delivered. Partial refunds may be issued at our discretion for incomplete or unsatisfactory work. Disputes must be raised within 7 days of ticket completion.

Teacher Payouts: Earned funds are released to Teachers within 3–5 business days after Student approval or after the 48-hour auto-approval window, whichever comes first. Teachers are responsible for all applicable taxes on their earnings.

Chargebacks: Fraudulent chargebacks may result in account suspension and legal action.`,
  },
  {
    icon: AlertTriangle,
    title: "5. Prohibited Conduct",
    content: `You agree NOT to:

• Share personal contact information to bypass the Platform's payment system
• Harass, threaten, or discriminate against any user
• Submit false, misleading, or plagiarized content
• Impersonate another person or misrepresent your qualifications
• Use the Platform for any illegal purpose or to violate any applicable law
• Attempt to reverse-engineer, decompile, or hack the Platform
• Use automated scripts, bots, or scrapers without prior written consent
• Interfere with or disrupt the Platform's infrastructure or security
• Post spam, advertisements, or unauthorized promotional content
• Create multiple accounts to circumvent suspensions or bans

Violation of these rules may result in immediate account termination without refund.`,
  },
  {
    icon: Shield,
    title: "6. Intellectual Property",
    content: `All content, logos, trademarks, and software on TechSolve are owned by or licensed to TechSolve and are protected under applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.

User-Generated Content: By posting content (tickets, messages, reviews), you grant TechSolve a non-exclusive, worldwide, royalty-free license to use, display, and distribute such content for Platform operations. You retain ownership of your original content.

Teacher Work Product: Unless otherwise agreed in writing, solutions and work product delivered by Teachers become the Student's property upon full payment.`,
  },
  {
    icon: Globe,
    title: "7. Limitation of Liability & Disclaimers",
    content: `THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.

TO THE MAXIMUM EXTENT PERMITTED BY LAW, TECHSOLVE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING OUT OF OR RELATED TO YOUR USE OF THE PLATFORM.

Our total aggregate liability for any claims arising under these Terms shall not exceed the amount you paid to TechSolve in the 12 months preceding the claim.

We do not guarantee the accuracy, reliability, or completeness of any Teacher's qualifications, advice, or work product. Users engage with Teachers at their own risk.`,
  },
  {
    icon: Clock,
    title: "8. Termination",
    content: `Either party may terminate these Terms at any time. You may delete your account through your account settings. We may suspend or terminate your account immediately, without prior notice, for conduct that violates these Terms or is harmful to the Platform or other users.

Upon termination: access to the Platform ceases immediately; any pending payouts for completed work will still be processed; outstanding disputes will be resolved per our dispute resolution process; your data will be handled in accordance with our Privacy Policy.`,
  },
];

const additionalSections = [
  {
    title: "9. Dispute Resolution & Arbitration",
    content: `Any disputes arising from these Terms or your use of the Platform shall first be resolved through good-faith negotiation. If unresolved within 30 days, disputes will be submitted to binding arbitration under the rules of the applicable arbitration association in the jurisdiction where TechSolve is headquartered. Class action lawsuits and class-wide arbitrations are not permitted. Small claims court actions are exempt from this arbitration requirement.`,
  },
  {
    title: "10. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless TechSolve, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) any content you submit to the Platform.`,
  },
  {
    title: "11. Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TechSolve operates, without regard to conflict of law principles. You consent to the exclusive jurisdiction and venue of courts in that jurisdiction for any legal proceedings.`,
  },
  {
    title: "12. Severability & Waiver",
    content: `If any provision of these Terms is found to be unenforceable, the remaining provisions shall remain in full force and effect. Our failure to enforce any right or provision shall not constitute a waiver of that right or provision.`,
  },
  {
    title: "13. Contact Information",
    content: `For questions about these Terms, please contact us at: legal@techsolve.com. For urgent account issues, use the in-app support system or reach out to support@techsolve.com.`,
  },
];

const Terms = () => {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Scale className="w-4 h-4" />
              Legal
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Terms of Service
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Please read these terms carefully before using TechSolve. By using our platform, you agree to be bound by these terms.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Last updated: February 10, 2026 · Effective immediately for new users
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="mb-10 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-3">Quick Navigation</p>
            <div className="flex flex-wrap gap-2">
              {[...sections, ...additionalSections.map(s => ({ ...s, icon: FileText }))].map((s) => (
                <a
                  key={s.title}
                  href={`#section-${s.title.split(".")[0].replace(/\D/g, "")}`}
                  className="text-xs px-2.5 py-1 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Main Sections */}
          <div className="space-y-8">
            {sections.map((section) => {
              const num = section.title.split(".")[0].replace(/\D/g, "");
              return (
                <section
                  key={section.title}
                  id={`section-${num}`}
                  className="p-6 rounded-xl bg-card border border-border scroll-mt-24"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <section.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-display font-semibold text-foreground pt-1.5">
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line pl-[52px]">
                    {section.content}
                  </div>
                </section>
              );
            })}

            {/* Additional text-only sections */}
            {additionalSections.map((section) => {
              const num = section.title.split(".")[0].replace(/\D/g, "");
              return (
                <section
                  key={section.title}
                  id={`section-${num}`}
                  className="p-6 rounded-xl bg-card border border-border scroll-mt-24"
                >
                  <h2 className="text-xl font-display font-semibold text-foreground mb-4">
                    {section.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </section>
              );
            })}
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              By using TechSolve, you acknowledge that you have read, understood, and agree to these Terms of Service.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link to="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              <span className="text-border">•</span>
              <Link to="/contact" className="text-primary hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Terms;
