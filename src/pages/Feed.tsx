import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SolvedFeed } from "@/components/feed/SolvedFeed";
import { PageTransition, FadeInView } from "@/components/layout/PageTransition";
import { TrendingUp, Clock, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const filters = ["All", "React", "Node.js", "AWS", "TypeScript", "Database", "DevOps", "Docker"];
const sortOptions = [
  { id: "recent", label: "Most Recent", icon: Clock },
  { id: "trending", label: "Trending", icon: TrendingUp },
];

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeSort, setActiveSort] = useState("recent");

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {/* Header */}
              <FadeInView className="mb-6">
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">
                  Solved Problems
                </h1>
                <p className="text-muted-foreground">
                  See what's being solved by our expert trainers
                </p>
              </FadeInView>

              {/* Sort Tabs */}
              <FadeInView className="mb-4">
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setActiveSort(option.id)}
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                        activeSort === option.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <option.icon className="w-4 h-4" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </FadeInView>

              {/* Filters */}
              <FadeInView className="mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                        activeFilter === filter
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </FadeInView>

              {/* Feed */}
              <SolvedFeed />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default Feed;
