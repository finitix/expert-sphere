import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Star, CheckCircle2, MapPin, Users, Filter, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition, FadeInView } from "@/components/layout/PageTransition";
import { cn } from "@/lib/utils.js";
const trainers = [
    {
        id: "sarahc",
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
        role: "Full Stack Expert",
        location: "San Francisco, CA",
        skills: ["React", "Node.js", "AWS", "TypeScript"],
        rating: 4.9,
        reviews: 234,
        solved: 189,
        hourlyRate: 75,
        bio: "10+ years building scalable web applications. Ex-Google engineer specializing in React and cloud architecture.",
        online: true,
    },
    {
        id: "davidk",
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
        role: "Database Specialist",
        location: "New York, NY",
        skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
        rating: 5.0,
        reviews: 156,
        solved: 142,
        hourlyRate: 85,
        bio: "Database architect with expertise in query optimization and scaling. Helped 100+ companies improve performance.",
        online: true,
    },
    {
        id: "jamesl",
        name: "James Lee",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
        role: "Cloud Architect",
        location: "Seattle, WA",
        skills: ["AWS", "GCP", "Kubernetes", "Terraform"],
        rating: 4.8,
        reviews: 312,
        solved: 267,
        hourlyRate: 95,
        bio: "AWS Solutions Architect. Specialized in serverless architectures and container orchestration.",
        online: false,
    },
    {
        id: "lisap",
        name: "Lisa Park",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
        role: "Frontend Expert",
        location: "Austin, TX",
        skills: ["TypeScript", "Vue", "React", "Tailwind"],
        rating: 4.9,
        reviews: 198,
        solved: 176,
        hourlyRate: 70,
        bio: "UI/UX focused developer passionate about accessible and performant interfaces.",
        online: true,
    },
    {
        id: "toma",
        name: "Tom Anderson",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
        role: "DevOps Engineer",
        location: "Denver, CO",
        skills: ["Docker", "CI/CD", "Terraform", "Linux"],
        rating: 4.7,
        reviews: 145,
        solved: 128,
        hourlyRate: 80,
        bio: "DevOps specialist focused on automation and reliability. Building robust deployment pipelines.",
        online: false,
    },
    {
        id: "emmaw",
        name: "Emma Wilson",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop",
        role: "Security Expert",
        location: "Boston, MA",
        skills: ["Penetration Testing", "OAuth", "Encryption"],
        rating: 4.9,
        reviews: 89,
        solved: 76,
        hourlyRate: 110,
        bio: "Certified security professional. Former security lead at Fortune 500. CISSP certified.",
        online: true,
    },
];
const categories = ["All", "React", "Node.js", "AWS", "TypeScript", "Database", "DevOps"];
const Trainers = () => {
    return (<PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            {/* Header */}
            <FadeInView className="mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
                Expert Trainers
              </h1>
              <p className="text-muted-foreground">
                Browse verified experts ready to solve your tech challenges
              </p>
            </FadeInView>

            {/* Search & Filters */}
            <FadeInView className="mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"/>
                  <input type="text" placeholder="Search by name, skill, or expertise..." className="input-field pl-10 w-full"/>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary flex items-center gap-2">
                    <Filter className="w-4 h-4"/>
                    Filters
                  </button>
                  <button className="btn-secondary flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4"/>
                    Sort
                  </button>
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {categories.map((cat, i) => (<button key={cat} className={cn("px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors", i === 0
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground")}>
                    {cat}
                  </button>))}
              </div>
            </FadeInView>

            {/* Trainers Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainers.map((trainer, index) => (<motion.div key={trainer.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ y: -4 }} className="gh-card">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="relative">
                      <img src={trainer.avatar} alt={trainer.name} className="w-12 h-12 rounded-full object-cover"/>
                      {trainer.online && (<span className="absolute -bottom-0.5 -right-0.5 online-dot"/>)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Link to={`/trainer/${trainer.id}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                          {trainer.name}
                        </Link>
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0"/>
                      </div>
                      <p className="text-sm text-primary">{trainer.role}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3"/>
                        {trainer.location}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {trainer.bio}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {trainer.skills.slice(0, 3).map((skill) => (<span key={skill} className="chip text-xs">
                        {skill}
                      </span>))}
                    {trainer.skills.length > 3 && (<span className="text-xs text-muted-foreground">
                        +{trainer.skills.length - 3}
                      </span>)}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning"/>
                        <span className="font-semibold text-foreground">{trainer.rating}</span>
                        <span className="text-muted-foreground">({trainer.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-4 h-4"/>
                        {trainer.solved}
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-primary">
                      ${trainer.hourlyRate}/hr
                    </span>
                  </div>

                  <Link to={`/trainer/${trainer.id}`} className="btn-secondary w-full mt-4 text-center block">
                    View Profile
                  </Link>
                </motion.div>))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>);
};
export default Trainers;
