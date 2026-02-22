import { Link } from "react-router-dom";
import { Star, MessageCircle, Repeat2, Heart, Share, CheckCircle2, Clock, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
const solvedTickets = [
    {
        id: "1",
        title: "React SSR hydration mismatch causing flickering",
        description: "Fixed the hydration issue by ensuring consistent state between server and client. The problem was related to date formatting differences.",
        category: "React",
        postedTime: "2h ago",
        solvedTime: "45 min",
        user: { name: "Alex Johnson", avatar: "AJ", username: "alexj" },
        trainer: { name: "Sarah Chen", avatar: "SC", username: "sarahc", verified: true },
        rating: 5,
        likes: 24,
        comments: 8,
        shares: 3,
    },
    {
        id: "2",
        title: "PostgreSQL query taking 30+ seconds on production",
        description: "Optimized the query by adding proper indexes and restructuring the JOIN clauses. Performance improved from 30s to 200ms.",
        category: "Database",
        postedTime: "4h ago",
        solvedTime: "1.5 hrs",
        user: { name: "Mike Peters", avatar: "MP", username: "mikep" },
        trainer: { name: "David Kim", avatar: "DK", username: "davidk", verified: true },
        rating: 5,
        likes: 45,
        comments: 12,
        shares: 8,
    },
    {
        id: "3",
        title: "AWS Lambda cold starts exceeding timeout",
        description: "Implemented provisioned concurrency and optimized bundle size. Cold starts reduced from 8s to under 500ms.",
        category: "AWS",
        postedTime: "5h ago",
        solvedTime: "2 hrs",
        user: { name: "Emma Wilson", avatar: "EW", username: "emmaw" },
        trainer: { name: "James Lee", avatar: "JL", username: "jamesl", verified: true },
        rating: 5,
        likes: 38,
        comments: 15,
        shares: 6,
    },
    {
        id: "4",
        title: "TypeScript generic type not inferring correctly",
        description: "The issue was with conditional types. Added proper type constraints and used template literal types to fix the inference.",
        category: "TypeScript",
        postedTime: "6h ago",
        solvedTime: "30 min",
        user: { name: "Chris Brown", avatar: "CB", username: "chrisb" },
        trainer: { name: "Lisa Park", avatar: "LP", username: "lisap", verified: true },
        rating: 5,
        likes: 19,
        comments: 5,
        shares: 2,
    },
    {
        id: "5",
        title: "Docker container running out of memory",
        description: "Identified memory leak in Node.js application. Fixed by properly closing database connections and implementing connection pooling.",
        category: "Docker",
        postedTime: "8h ago",
        solvedTime: "1 hr",
        user: { name: "Rachel Green", avatar: "RG", username: "rachelg" },
        trainer: { name: "Tom Anderson", avatar: "TA", username: "toma", verified: true },
        rating: 4,
        likes: 31,
        comments: 9,
        shares: 4,
    },
    {
        id: "6",
        title: "Next.js API route returning stale data",
        description: "Issue was with ISR caching. Implemented proper revalidation strategy and added cache headers for dynamic data.",
        category: "Next.js",
        postedTime: "10h ago",
        solvedTime: "40 min",
        user: { name: "Kevin Hart", avatar: "KH", username: "kevinh" },
        trainer: { name: "Sarah Chen", avatar: "SC", username: "sarahc", verified: true },
        rating: 5,
        likes: 27,
        comments: 7,
        shares: 5,
    },
];
export function SolvedFeed({ limit }) {
    const displayTickets = limit ? solvedTickets.slice(0, limit) : solvedTickets;
    return (<div className="border border-border rounded-lg overflow-hidden divide-y divide-border">
      {displayTickets.map((ticket, index) => (<motion.article key={ticket.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="feed-item bg-card hover:bg-card-hover">
          {/* Header */}
          <div className="flex items-start gap-3">
            {/* Trainer Avatar */}
            <Link to={`/trainer/${ticket.trainer.username}`} className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold text-white">
                {ticket.trainer.avatar}
              </div>
            </Link>

            <div className="flex-1 min-w-0">
              {/* Trainer Info */}
              <div className="flex items-center gap-2 flex-wrap">
                <Link to={`/trainer/${ticket.trainer.username}`} className="font-semibold text-foreground hover:underline">
                  {ticket.trainer.name}
                </Link>
                {ticket.trainer.verified && (<CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0"/>)}
                <span className="text-muted-foreground">@{ticket.trainer.username}</span>
                <span className="text-muted-foreground">·</span>
                <span className="text-muted-foreground text-sm">{ticket.postedTime}</span>
              </div>

              {/* Solved Badge */}
              <div className="flex items-center gap-2 mt-1 text-sm">
                <span className="chip-success flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3"/>
                  Solved
                </span>
                <span className="text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3"/>
                  {ticket.solvedTime}
                </span>
                <span className="chip">{ticket.category}</span>
              </div>

              {/* Content */}
              <div className="mt-3">
                <h3 className="font-medium text-foreground mb-1">{ticket.title}</h3>
                <p className="text-sm text-muted-foreground">{ticket.description}</p>
              </div>

              {/* User who asked */}
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <span>Helped</span>
                <Link to={`/user/${ticket.user.username}`} className="flex items-center gap-1 hover:text-foreground">
                  <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-semibold">
                    {ticket.user.avatar}
                  </div>
                  <span className="font-medium text-foreground">{ticket.user.name}</span>
                </Link>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: ticket.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 fill-warning text-warning"/>))}
                {Array.from({ length: 5 - ticket.rating }).map((_, i) => (<Star key={i} className="w-4 h-4 text-muted"/>))}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center gap-6 -ml-2">
                <button className="flex items-center gap-2 px-2 py-1 rounded-md text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-colors">
                  <MessageCircle className="w-4 h-4"/>
                  <span className="text-sm">{ticket.comments}</span>
                </button>
                <button className="flex items-center gap-2 px-2 py-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Repeat2 className="w-4 h-4"/>
                  <span className="text-sm">{ticket.shares}</span>
                </button>
                <button className="flex items-center gap-2 px-2 py-1 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors">
                  <Heart className="w-4 h-4"/>
                  <span className="text-sm">{ticket.likes}</span>
                </button>
                <button className="flex items-center gap-2 px-2 py-1 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                  <Share className="w-4 h-4"/>
                </button>
              </div>
            </div>

            {/* More Options */}
            <button className="p-1 rounded-md text-muted-foreground hover:bg-muted transition-colors">
              <MoreHorizontal className="w-5 h-5"/>
            </button>
          </div>
        </motion.article>))}
    </div>);
}
