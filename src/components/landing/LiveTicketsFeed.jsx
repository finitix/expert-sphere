import { useEffect, useRef } from "react";
import { Star, Clock, CheckCircle2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
const recentTickets = [
    {
        id: 1,
        title: "React SSR hydration issue",
        category: "React",
        postedTime: "2 min ago",
        solver: { name: "Alex Chen", avatar: "AC" },
        rating: 5,
        solved: true,
    },
    {
        id: 2,
        title: "PostgreSQL query optimization",
        category: "Database",
        postedTime: "5 min ago",
        solver: { name: "Sarah Miller", avatar: "SM" },
        rating: 5,
        solved: true,
    },
    {
        id: 3,
        title: "AWS Lambda timeout debugging",
        category: "Cloud",
        postedTime: "8 min ago",
        solver: { name: "David Kim", avatar: "DK" },
        rating: 4,
        solved: true,
    },
    {
        id: 4,
        title: "TypeScript generic constraints",
        category: "TypeScript",
        postedTime: "12 min ago",
        solver: { name: "Emma Wilson", avatar: "EW" },
        rating: 5,
        solved: true,
    },
    {
        id: 5,
        title: "Docker container networking",
        category: "DevOps",
        postedTime: "15 min ago",
        solver: { name: "James Lee", avatar: "JL" },
        rating: 5,
        solved: true,
    },
    {
        id: 6,
        title: "Next.js API route caching",
        category: "Next.js",
        postedTime: "18 min ago",
        solver: { name: "Lisa Park", avatar: "LP" },
        rating: 4,
        solved: true,
    },
];
function TicketCard({ ticket }) {
    return (<GlassCard className="min-w-[300px] md:min-w-[350px] flex-shrink-0">
      <div className="flex items-start justify-between mb-3">
        <span className="chip text-xs">{ticket.category}</span>
        {ticket.solved && (<span className="chip-success text-xs flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3"/>
            Solved
          </span>)}
      </div>
      
      <h3 className="font-display font-semibold text-white mb-3 line-clamp-2">
        {ticket.title}
      </h3>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
        <Clock className="w-4 h-4"/>
        <span>{ticket.postedTime}</span>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-semibold text-white">
            {ticket.solver.avatar}
          </div>
          <span className="text-sm text-white">{ticket.solver.name}</span>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: ticket.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-primary text-primary"/>))}
        </div>
      </div>
    </GlassCard>);
}
export function LiveTicketsFeed() {
    const scrollRef = useRef(null);
    useEffect(() => {
        const scroll = scrollRef.current;
        if (!scroll)
            return;
        let animationId;
        let scrollPosition = 0;
        const animate = () => {
            scrollPosition += 0.5;
            if (scrollPosition >= scroll.scrollWidth / 2) {
                scrollPosition = 0;
            }
            scroll.scrollLeft = scrollPosition;
            animationId = requestAnimationFrame(animate);
        };
        animationId = requestAnimationFrame(animate);
        scroll.addEventListener("mouseenter", () => cancelAnimationFrame(animationId));
        scroll.addEventListener("mouseleave", () => {
            animationId = requestAnimationFrame(animate);
        });
        return () => cancelAnimationFrame(animationId);
    }, []);
    return (<section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center">
          <span className="chip mb-4">Live Feed</span>
          <h2 className="section-title">
            Recently <span className="gradient-text">Solved</span>
          </h2>
          <p className="section-subtitle">
            Watch real problems getting solved in real-time
          </p>
        </div>
      </div>

      {/* Scrolling Container */}
      <div ref={scrollRef} className="flex gap-6 overflow-x-hidden px-4" style={{ cursor: "grab" }}>
        {/* Duplicate for infinite scroll */}
        {[...recentTickets, ...recentTickets].map((ticket, index) => (<TicketCard key={`${ticket.id}-${index}`} ticket={ticket}/>))}
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none"/>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none"/>
    </section>);
}
