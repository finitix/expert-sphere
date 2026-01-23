import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { GlowButton } from "@/components/ui/GlowButton";

const trainers = [
  {
    id: 1,
    name: "Alex Chen",
    avatar: "AC",
    role: "Full Stack Expert",
    skills: ["React", "Node.js", "AWS"],
    rating: 4.9,
    reviews: 234,
    solved: 189,
  },
  {
    id: 2,
    name: "Sarah Miller",
    avatar: "SM",
    role: "Database Specialist",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
    rating: 5.0,
    reviews: 156,
    solved: 142,
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "DK",
    role: "Cloud Architect",
    skills: ["AWS", "GCP", "Kubernetes"],
    rating: 4.8,
    reviews: 312,
    solved: 267,
  },
  {
    id: 4,
    name: "Emma Wilson",
    avatar: "EW",
    role: "Frontend Expert",
    skills: ["TypeScript", "Vue", "Tailwind"],
    rating: 4.9,
    reviews: 198,
    solved: 176,
  },
  {
    id: 5,
    name: "James Lee",
    avatar: "JL",
    role: "DevOps Engineer",
    skills: ["Docker", "CI/CD", "Terraform"],
    rating: 4.7,
    reviews: 145,
    solved: 128,
  },
];

function TrainerCard({ trainer, isCenter }: { trainer: typeof trainers[0]; isCenter: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * 10, y: x * -10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="transition-all duration-500"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isCenter ? 1.05 : 0.95})`,
        opacity: isCenter ? 1 : 0.7,
      }}
    >
      <GlassCard className="w-72 text-center">
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <div className="avatar-ring w-full h-full">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
              {trainer.avatar}
            </div>
          </div>
          {/* Verified Badge */}
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-success flex items-center justify-center shadow-glow-success">
            <BadgeCheck className="w-5 h-5 text-white" />
          </div>
        </div>

        <h3 className="font-display font-semibold text-xl text-white mb-1">
          {trainer.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4">{trainer.role}</p>

        {/* Skills */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {trainer.skills.map((skill) => (
            <span key={skill} className="chip text-xs">
              {skill}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 mb-6 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-white font-semibold">{trainer.rating}</span>
            <span className="text-muted-foreground">({trainer.reviews})</span>
          </div>
          <div className="text-muted-foreground">
            {trainer.solved} solved
          </div>
        </div>

        <GlowButton variant="outline" size="sm" className="w-full">
          View Profile
        </GlowButton>
      </GlassCard>
    </div>
  );
}

export function TopTrainers() {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trainers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const navigate = (direction: 'prev' | 'next') => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + trainers.length) % trainers.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % trainers.length);
    }
  };

  const getVisibleTrainers = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + trainers.length) % trainers.length;
      result.push({ trainer: trainers[index], isCenter: i === 0 });
    }
    return result;
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">Top Experts</span>
          <h2 className="section-title">
            Meet Our <span className="gradient-text">Trainers</span>
          </h2>
          <p className="section-subtitle">
            Verified experts ready to solve your toughest tech challenges
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-6 py-8">
            {getVisibleTrainers().map(({ trainer, isCenter }, index) => (
              <div
                key={`${trainer.id}-${index}`}
                className="hidden md:block"
                style={{ display: index === 2 || window.innerWidth >= 768 ? 'block' : 'none' }}
              >
                <TrainerCard trainer={trainer} isCenter={isCenter} />
              </div>
            ))}
            {/* Mobile: show only center */}
            <div className="md:hidden">
              <TrainerCard trainer={trainers[currentIndex]} isCenter={true} />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate('prev')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Dots */}
            <div className="flex gap-2">
              {trainers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => navigate('next')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
