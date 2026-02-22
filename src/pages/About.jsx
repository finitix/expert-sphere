import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundBeams, GlowOrbs, GridPattern } from "@/components/effects/BackgroundEffects";
import { Target, Users, Award, Zap, Heart, CheckCircle2, ArrowRight } from "lucide-react";
const easeOutExpo = [0.16, 1, 0.3, 1];
const values = [
    {
        icon: Target,
        title: "Mission-Driven",
        description: "We believe every developer deserves access to expert help when they need it most.",
    },
    {
        icon: Users,
        title: "Community First",
        description: "Building a global network of developers helping developers succeed together.",
    },
    {
        icon: Award,
        title: "Excellence",
        description: "We verify every expert to ensure you get the highest quality solutions.",
    },
    {
        icon: Zap,
        title: "Speed",
        description: "Time is valuable. We connect you with experts in minutes, not days.",
    },
];
const team = [
    {
        name: "Sarah Chen",
        role: "CEO & Founder",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop",
        bio: "Ex-Google engineer with 15 years in tech",
    },
    {
        name: "David Kim",
        role: "CTO",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
        bio: "Built scalable systems at Amazon & Netflix",
    },
    {
        name: "Emily Zhang",
        role: "Head of Operations",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop",
        bio: "Previously led teams at Stripe & Square",
    },
    {
        name: "Marcus Johnson",
        role: "Head of Community",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
        bio: "Developer advocate and open source contributor",
    },
];
const milestones = [
    { year: "2021", title: "Founded", description: "TechSolve was born from a simple idea" },
    { year: "2022", title: "1,000 Problems Solved", description: "Reached our first major milestone" },
    { year: "2023", title: "Global Expansion", description: "Launched in 50+ countries" },
    { year: "2024", title: "10,000+ Community", description: "Growing stronger every day" },
];
const About = () => {
    return (<div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <GlowOrbs />
          <BackgroundBeams />
          <GridPattern />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOutExpo }} className="max-w-4xl mx-auto text-center">
            <span className="gh-badge-primary mb-6 inline-block">About Us</span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
              Empowering developers to
              <br />
              <span className="gradient-text">build better</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're on a mission to democratize access to expert technical help, 
              making world-class solutions available to every developer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="gh-badge-purple mb-4 inline-block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
                Built by developers,
                <br />
                <span className="gradient-text-purple">for developers</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  TechSolve was founded in 2021 by a team of developers who experienced 
                  firsthand the frustration of getting stuck on complex technical problems 
                  with nowhere to turn for reliable, expert help.
                </p>
                <p>
                  We've all been there – spending hours on Stack Overflow, watching 
                  outdated tutorials, or waiting days for forum responses. We knew there 
                  had to be a better way.
                </p>
                <p>
                  Today, TechSolve connects thousands of developers with verified experts 
                  who can solve their problems in real-time, with guaranteed results.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Team collaboration" className="w-full h-auto"/>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"/>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl"/>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="gh-badge-primary mb-4 inline-block">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              What we <span className="gradient-text-green">believe in</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, i) => (<motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="gh-card text-center">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-primary"/>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="gh-badge-blue mb-4 inline-block">Our Journey</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Milestones along <span className="gradient-text-blue">the way</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary"/>
              
              {milestones.map((milestone, i) => (<motion.div key={milestone.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"} pl-20 md:pl-0`}>
                    <span className="text-primary font-mono text-lg font-bold">{milestone.year}</span>
                    <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground"/>
                  </div>
                  <div className="flex-1 hidden md:block"/>
                </motion.div>))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-background-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="gh-badge-purple mb-4 inline-block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Meet the <span className="gradient-text-purple">people</span> behind TechSolve
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member, i) => (<motion.div key={member.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="gh-card text-center group">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-2 border-border group-hover:border-primary transition-colors">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover"/>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-3xl mx-auto text-center">
            <Heart className="w-12 h-12 text-primary mx-auto mb-6"/>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Join our growing community
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Whether you need help or want to help others, there's a place for you at TechSolve.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="gh-btn-primary px-8 py-3">
                Get Started
                <ArrowRight className="w-4 h-4"/>
              </Link>
              <Link to="/trainers" className="gh-btn-secondary px-8 py-3">
                Become a Trainer
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>);
};
export default About;
