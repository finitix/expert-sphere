import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Search, Filter, Clock, DollarSign, User } from "lucide-react";

const categories = ["All", "React", "Node.js", "Database", "Cloud", "DevOps", "TypeScript", "Python"];
const difficulties = ["Beginner", "Intermediate", "Advanced"];

const tickets = [
  {
    id: 1,
    title: "React SSR hydration mismatch causing flickering",
    description: "Getting hydration errors when using SSR with React 18. The page flickers on initial load...",
    category: "React",
    difficulty: "Advanced",
    budget: "$50-100",
    postedBy: "John D.",
    postedTime: "2 hours ago",
  },
  {
    id: 2,
    title: "PostgreSQL query running too slow on large dataset",
    description: "My query takes 30+ seconds on a table with 10M rows. Need help with optimization...",
    category: "Database",
    difficulty: "Intermediate",
    budget: "$30-50",
    postedBy: "Sarah M.",
    postedTime: "4 hours ago",
  },
  {
    id: 3,
    title: "AWS Lambda cold start issues",
    description: "Lambda functions taking 5+ seconds on cold start. Need to reduce this significantly...",
    category: "Cloud",
    difficulty: "Advanced",
    budget: "$75-150",
    postedBy: "Mike R.",
    postedTime: "6 hours ago",
  },
  {
    id: 4,
    title: "TypeScript generic type inference not working",
    description: "Having trouble getting TypeScript to infer types correctly in my generic function...",
    category: "TypeScript",
    difficulty: "Intermediate",
    budget: "$25-40",
    postedBy: "Emma W.",
    postedTime: "8 hours ago",
  },
  {
    id: 5,
    title: "Docker container networking issue",
    description: "Containers can't communicate with each other in my docker-compose setup...",
    category: "DevOps",
    difficulty: "Beginner",
    budget: "$20-35",
    postedBy: "Alex C.",
    postedTime: "12 hours ago",
  },
  {
    id: 6,
    title: "Node.js memory leak in production",
    description: "Our Node.js server crashes after a few hours due to memory growing unbounded...",
    category: "Node.js",
    difficulty: "Advanced",
    budget: "$100-200",
    postedBy: "Lisa P.",
    postedTime: "1 day ago",
  },
];

const ExploreTickets = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Explore <span className="gradient-text">Tickets</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Browse open tech problems and offer your expertise
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <aside className="lg:col-span-1">
              <GlassCard className="sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                  <Filter className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold text-white">Filters</h3>
                </div>

                {/* Search */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      className="input-glow pl-10 text-sm"
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        className={`chip text-xs ${cat === 'All' ? 'bg-primary/30 border-primary/50' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty */}
                <div className="mb-6">
                  <label className="text-sm text-muted-foreground mb-2 block">Difficulty</label>
                  <div className="flex flex-wrap gap-2">
                    {difficulties.map((diff) => (
                      <button key={diff} className="chip text-xs">
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Budget Range</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Min" className="input-glow text-sm w-1/2" />
                    <input type="text" placeholder="Max" className="input-glow text-sm w-1/2" />
                  </div>
                </div>
              </GlassCard>
            </aside>

            {/* Tickets Grid */}
            <div className="lg:col-span-3">
              <div className="grid gap-6">
                {tickets.map((ticket) => (
                  <GlassCard key={ticket.id} className="group cursor-pointer" glow>
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="chip text-xs">{ticket.category}</span>
                          <span className="chip-secondary text-xs">{ticket.difficulty}</span>
                        </div>
                        <h3 className="font-display font-semibold text-xl text-white mb-2 group-hover:gradient-text transition-all">
                          {ticket.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {ticket.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {ticket.postedBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {ticket.postedTime}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-1 text-primary font-mono font-semibold text-lg">
                          <DollarSign className="w-5 h-5" />
                          {ticket.budget}
                        </div>
                        <GlowButton variant="outline" size="sm">
                          View Details
                        </GlowButton>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExploreTickets;
