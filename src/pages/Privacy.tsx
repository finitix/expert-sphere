import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { Shield, Database, Eye, Lock, UserCheck, Globe, Bell, Trash2, Cookie, Server } from "lucide-react";

const sections = [
  {
    icon: Eye,
    title: "1. Information We Collect",
    content: `We collect information to provide, improve, and secure our Platform:

Personal Information (provided by you):
• Full name, email address, and phone number during registration
• Profile information including bio, skills, and profile photo
• Payment information (processed by our third-party payment providers — we do not store full card numbers)
• Government-issued ID (for Teacher verification only, stored encrypted and deleted after verification)
• Communications you send through the Platform

Automatically Collected Information:
• Device information (browser type, operating system, device identifiers)
• IP address and approximate geographic location
• Usage data (pages visited, features used, session duration, click patterns)
• Cookies and similar tracking technologies (see Section 7)
• Log data including access times, error reports, and referral URLs`,
  },
  {
    icon: Database,
    title: "2. How We Use Your Information",
    content: `We use your information for the following purposes:

Service Delivery:
• Creating and managing your account
• Matching Students with appropriate Teachers
• Processing payments and facilitating escrow transactions
• Enabling real-time messaging and notifications
• Providing customer support

Platform Improvement:
• Analyzing usage patterns to improve features and user experience
• Conducting research and analytics (using aggregated, de-identified data)
• Testing new features and functionality

Safety & Security:
• Verifying Teacher identities and qualifications
• Detecting and preventing fraud, abuse, and unauthorized access
• Enforcing our Terms of Service and community guidelines
• Complying with legal obligations and responding to lawful requests

Communication:
• Sending transactional emails (ticket updates, payment confirmations)
• Platform announcements and feature updates
• Marketing communications (only with your consent; you can opt out at any time)`,
  },
  {
    icon: UserCheck,
    title: "3. Information Sharing & Disclosure",
    content: `We do NOT sell your personal information. We share information only in these circumstances:

With Other Users:
• Students see Teacher profiles (name, bio, ratings, expertise)
• Teachers see Student ticket details necessary to provide assistance
• Reviews and ratings are visible to all users

With Service Providers:
• Payment processors (to handle transactions securely)
• Cloud hosting providers (to store and serve data)
• Email service providers (to send notifications)
• Analytics providers (using anonymized data only)

All service providers are bound by data processing agreements and may only use your data for the specific services they provide to us.

Legal Requirements:
• To comply with applicable laws, regulations, or legal processes
• To protect the rights, safety, or property of TechSolve, our users, or the public
• In connection with a merger, acquisition, or sale of assets (with prior notice to affected users)`,
  },
  {
    icon: Lock,
    title: "4. Data Security",
    content: `We implement industry-standard security measures to protect your data:

Technical Safeguards:
• TLS/SSL encryption for all data in transit
• AES-256 encryption for sensitive data at rest
• Secure password hashing using bcrypt with salt
• Regular security audits and penetration testing
• Rate limiting and DDoS protection

Access Controls:
• Role-based access for internal employees (minimum necessary access)
• Multi-factor authentication required for administrative access
• Automated monitoring for suspicious activity
• Regular access reviews and revocation procedures

Infrastructure:
• Data hosted on SOC 2 Type II certified cloud infrastructure
• Automated backups with encrypted storage
• Disaster recovery and business continuity plans

Despite our best efforts, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security but commit to promptly notifying affected users in the event of a data breach.`,
  },
  {
    icon: Shield,
    title: "5. Your Rights & Choices",
    content: `Depending on your jurisdiction, you may have the following rights:

Access & Portability: Request a copy of your personal data in a structured, machine-readable format.

Correction: Request correction of inaccurate or incomplete personal data.

Deletion: Request deletion of your personal data ("Right to be Forgotten"). We will comply unless we have a legitimate legal basis to retain it (e.g., fraud prevention, legal compliance).

Restriction: Request restriction of processing in certain circumstances.

Objection: Object to processing based on legitimate interests or for direct marketing purposes.

Withdraw Consent: Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.

To exercise any of these rights, contact us at privacy@techsolve.com. We will respond within 30 days (or sooner as required by applicable law). We may need to verify your identity before processing your request.`,
  },
  {
    icon: Globe,
    title: "6. International Data Transfers",
    content: `TechSolve operates globally. Your data may be transferred to and processed in countries other than your country of residence. When we transfer data internationally, we ensure appropriate safeguards are in place:

• Standard Contractual Clauses (SCCs) approved by applicable authorities
• Adequacy decisions where available
• Binding Corporate Rules for intra-group transfers
• Your explicit consent where required

For EU/EEA residents: We comply with GDPR requirements for international data transfers.
For California residents: We comply with CCPA/CPRA requirements (see Section 9).`,
  },
  {
    icon: Cookie,
    title: "7. Cookies & Tracking Technologies",
    content: `We use cookies and similar technologies for the following purposes:

Essential Cookies: Required for Platform functionality (authentication, security, preferences). Cannot be disabled.

Analytics Cookies: Help us understand how users interact with the Platform (e.g., page views, feature usage). We use aggregated data only.

Functional Cookies: Remember your preferences (theme, language) to enhance your experience.

We do NOT use third-party advertising cookies or sell data to advertisers.

Managing Cookies: You can control cookies through your browser settings. Disabling essential cookies may affect Platform functionality. Most browsers allow you to block or delete cookies; refer to your browser's help documentation for specific instructions.`,
  },
  {
    icon: Bell,
    title: "8. Data Retention",
    content: `We retain your data only as long as necessary for the purposes described in this Policy:

Active Accounts: Data is retained for the duration of your account.

Deleted Accounts: Personal data is deleted within 30 days of account deletion, except:
• Transaction records (retained for 7 years for tax/legal compliance)
• Anonymized analytics data (retained indefinitely)
• Data required for ongoing disputes or legal proceedings

Inactive Accounts: Accounts inactive for 24 months may be flagged for deletion. We will notify you 30 days before deletion to allow reactivation.

Teacher Verification Documents: Deleted within 90 days of successful verification, or immediately upon rejection.`,
  },
  {
    icon: Server,
    title: "9. Region-Specific Disclosures",
    content: `GDPR (EU/EEA Residents):
Legal bases for processing: contract performance, legitimate interests, legal obligations, and consent. Our Data Protection Officer can be reached at dpo@techsolve.com. You have the right to lodge a complaint with your local supervisory authority.

CCPA/CPRA (California Residents):
Categories of personal information collected are described in Section 1. We do not sell personal information. We do not use or disclose sensitive personal information for purposes beyond what is necessary. You may designate an authorized agent to exercise your rights on your behalf.

LGPD (Brazil Residents):
Your data processing is governed by applicable provisions of the LGPD. You have the right to request anonymization, blocking, or deletion of unnecessary data.

Children's Privacy:
TechSolve is not intended for users under 18. We do not knowingly collect data from minors. If we learn that we have collected data from a child under 18, we will delete it promptly.`,
  },
  {
    icon: Trash2,
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Material changes will be communicated through:

• In-app notifications
• Email to registered users
• A prominent notice on our website

We will provide at least 30 days' notice before material changes take effect. Your continued use of the Platform after changes constitutes acceptance of the updated Policy.

Previous versions of this policy are available upon request.`,
  },
];

const Privacy = () => {
  return (
    <PageTransition>
      <Navbar />
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Shield className="w-4 h-4" />
              Privacy
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains what data we collect, how we use it, and how we protect it.
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              Last updated: February 10, 2026 · Effective immediately for new users
            </p>
          </div>

          {/* Summary Card */}
          <div className="mb-10 p-5 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-semibold text-foreground mb-3">Privacy at a Glance</h3>
            <div className="grid sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>We <strong className="text-foreground">never sell</strong> your personal data</span>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>All data encrypted with <strong className="text-foreground">AES-256</strong> at rest</span>
              </div>
              <div className="flex items-start gap-2">
                <UserCheck className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span>You can <strong className="text-foreground">delete your data</strong> at any time</span>
              </div>
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span><strong className="text-foreground">GDPR, CCPA, LGPD</strong> compliant</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-10 p-4 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-medium text-foreground mb-3">Quick Navigation</p>
            <div className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <a
                  key={s.title}
                  href={`#privacy-${s.title.split(".")[0].replace(/\D/g, "")}`}
                  className="text-xs px-2.5 py-1 rounded-md bg-background border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section) => {
              const num = section.title.split(".")[0].replace(/\D/g, "");
              return (
                <section
                  key={section.title}
                  id={`privacy-${num}`}
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
          </div>

          {/* Contact & Footer */}
          <div className="mt-12 p-6 rounded-xl bg-card border border-border text-center">
            <h3 className="font-display font-semibold text-foreground mb-2">Questions About Your Privacy?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Our Privacy Team is here to help. Contact us at{" "}
              <a href="mailto:privacy@techsolve.com" className="text-primary hover:underline">
                privacy@techsolve.com
              </a>
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <Link to="/terms" className="text-primary hover:underline">
                Terms of Service
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

export default Privacy;
