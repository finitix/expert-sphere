import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Search, Star, BadgeCheck, MapPin, Users } from "lucide-react";

const trainers = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "AC",
    role: "Full Stack Expert",
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "AWS", "TypeScript"],
    rating: 4.9,
    reviews: 234,
    solved: 189,
    hourlyRate: "$75/hr",
    bio: "10+ years building scalable web applications. Ex-Google engineer.",
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "SM",
    role: "Database Specialist",
    location: "New York, NY",
    skills: ["PostgreSQL", "MongoDB", "Redis", "MySQL"],
    rating: 5.0,
    reviews: 156,
    solved: 142,
    hourlyRate: "$85/hr",
    bio: "Database architect with expertise in optimization and scaling.",
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "DK",
    role: "Cloud Architect",
    location: "Seattle, WA",
    skills: ["AWS", "GCP", "Kubernetes", "Terraform"],
    rating: 4.8,
    reviews: 312,
    solved: 267,
    hourlyRate: "$95/hr",
    bio: "AWS Solutions Architect. Helped 100+ companies migrate to cloud.",
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "EW",
    role: "Frontend Expert",
    location: "Austin, TX",
    skills: ["TypeScript", "Vue", "React", "Tailwind"],
    rating: 4.9,
    reviews: 198,
    solved: 176,
    hourlyRate: "$70/hr",
    bio: "UI/UX focused developer. Passionate about accessible interfaces.",
  },
  {
    id: 5,
    name: "James Lee",
    avatar: "JL",
    role: "DevOps Engineer",
    location: "Denver, CO",
    skills: ["Docker", "CI/CD", "Terraform", "Linux"],
    rating: 4.7,
    reviews: 145,
    solved: 128,
    hourlyRate: "$80/hr",
    bio: "DevOps specialist focused on automation and reliability.",
  },
  {
    id: 6,
    name: "Lisa Park",
    avatar: "LP",
    role: "Security Expert",
    location: "Boston, MA",
    skills: ["Penetration Testing", "OAuth", "Encryption", "Audit"],
    rating: 4.9,
    reviews: 89,
    solved: 76,
    hourlyRate: "$110/hr",
    bio: "Certified security professional. Former security lead at Fortune 500.",
  },
];

const Trainers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Expert <span className="gradient-text">Trainers</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse verified experts ready to solve your tech challenges
            </p>
          </div>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by name, skill, or expertise..."
                className="input-glow pl-12 w-full"
              />
            </div>
            <div className="flex gap-2">
              <button className="chip">All Skills</button>
              <button className="chip">React</button>
              <button className="chip">Node.js</button>
              <button className="chip">AWS</button>
            </div>
          </div>

          {/* Trainers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainers.map((trainer) => (
              <GlassCard key={trainer.id} className="group" glow>
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative">
                    <div className="avatar-ring">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white">
                        {trainer.avatar}
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-lg text-white group-hover:gradient-text transition-all">
                      {trainer.name}
                    </h3>
                    <p className="text-primary text-sm">{trainer.role}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="w-3 h-3" />
                      {trainer.location}
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">
                  {trainer.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {trainer.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="chip text-xs">
                      {skill}
                    </span>
                  ))}
                  {trainer.skills.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{trainer.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between py-4 border-t border-white/5">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="text-white font-semibold">{trainer.rating}</span>
                      <span className="text-muted-foreground">({trainer.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="w-4 h-4" />
                      {trainer.solved} solved
                    </div>
                  </div>
                  <span className="text-primary font-mono font-semibold">
                    {trainer.hourlyRate}
                  </span>
                </div>

                <GlowButton variant="outline" size="sm" className="w-full">
                  View Profile
                </GlowButton>
              </GlassCard>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Trainers;
