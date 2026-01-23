import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Star, 
  CheckCircle2, 
  MapPin, 
  Calendar,
  Clock,
  MessageSquare,
  Award,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Globe
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition, FadeInView } from "@/components/layout/PageTransition";

// Mock trainer data
const trainerData = {
  sarahc: {
    id: "sarahc",
    name: "Sarah Chen",
    avatar: "SC",
    role: "Full Stack Expert",
    location: "San Francisco, CA",
    memberSince: "2022",
    skills: ["React", "Node.js", "AWS", "TypeScript", "GraphQL", "PostgreSQL"],
    rating: 4.9,
    reviews: 234,
    solved: 189,
    hourlyRate: 75,
    responseTime: "< 1 hour",
    bio: "10+ years building scalable web applications. Ex-Google engineer specializing in React and cloud architecture. I love helping developers solve complex problems and level up their skills.",
    about: "I'm a passionate full-stack developer with a deep love for clean, maintainable code. After spending 6 years at Google working on large-scale applications, I transitioned to consulting and mentoring. I specialize in React ecosystems, serverless architectures, and database optimization.\n\nMy approach is collaborative - I don't just solve your problem, I help you understand the solution so you can handle similar issues in the future.",
    certifications: ["AWS Solutions Architect", "Google Cloud Professional", "MongoDB Certified"],
    languages: ["English", "Mandarin"],
    online: true,
    socials: {
      github: "sarahchen",
      linkedin: "sarahchen",
      twitter: "sarahchen_dev",
      website: "sarahchen.dev",
    },
    recentSolves: [
      { title: "React SSR hydration mismatch", category: "React", rating: 5, time: "45 min" },
      { title: "Next.js API caching issues", category: "Next.js", rating: 5, time: "30 min" },
      { title: "TypeScript generic constraints", category: "TypeScript", rating: 5, time: "1 hr" },
    ],
    recentReviews: [
      { user: "Alex J.", rating: 5, comment: "Sarah fixed my hydration issue in under an hour. Incredibly knowledgeable!", date: "2 days ago" },
      { user: "Mike P.", rating: 5, comment: "Great communication and thorough explanation. Will definitely work with again.", date: "1 week ago" },
      { user: "Emma W.", rating: 5, comment: "Solved a bug I'd been stuck on for days. Worth every penny!", date: "2 weeks ago" },
    ],
  },
};

const TrainerProfile = () => {
  const { username } = useParams();
  const trainer = trainerData[username as keyof typeof trainerData] || trainerData.sarahc;

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Profile Header */}
              <FadeInView>
                <div className="gh-card mb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-primary flex items-center justify-center text-3xl font-bold text-white">
                          {trainer.avatar}
                        </div>
                        {trainer.online && (
                          <span className="absolute bottom-2 right-2 w-5 h-5 bg-success rounded-full border-4 border-card" />
                        )}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h1 className="text-2xl font-display font-bold text-foreground">
                              {trainer.name}
                            </h1>
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                          </div>
                          <p className="text-primary font-medium mb-2">{trainer.role}</p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {trainer.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Member since {trainer.memberSince}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Responds {trainer.responseTime}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-2xl font-bold text-foreground">
                            ${trainer.hourlyRate}<span className="text-sm text-muted-foreground">/hr</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-warning text-warning" />
                          <span className="font-semibold text-foreground">{trainer.rating}</span>
                          <span className="text-muted-foreground">({trainer.reviews} reviews)</span>
                        </div>
                        <div className="text-muted-foreground">
                          <span className="font-semibold text-foreground">{trainer.solved}</span> problems solved
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 mt-4">
                        <Link to="/create-ticket" className="btn-primary flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Request Help
                        </Link>
                        <button className="btn-secondary">
                          Save Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="md:col-span-2 space-y-6">
                  {/* About */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">About</h2>
                      <p className="text-muted-foreground whitespace-pre-line text-sm">
                        {trainer.about}
                      </p>
                    </div>
                  </FadeInView>

                  {/* Skills */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {trainer.skills.map((skill) => (
                          <span key={skill} className="chip-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeInView>

                  {/* Recent Solves */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">Recently Solved</h2>
                      <div className="space-y-3">
                        {trainer.recentSolves.map((solve, i) => (
                          <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                            <div>
                              <p className="text-sm font-medium text-foreground">{solve.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="chip text-xs">{solve.category}</span>
                                <span className="text-xs text-muted-foreground">{solve.time}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: solve.rating }).map((_, j) => (
                                <Star key={j} className="w-3 h-3 fill-warning text-warning" />
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeInView>

                  {/* Reviews */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">Reviews</h2>
                      <div className="space-y-4">
                        {trainer.recentReviews.map((review, i) => (
                          <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                                  {review.user.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{review.user}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                {Array.from({ length: review.rating }).map((_, j) => (
                                  <Star key={j} className="w-3 h-3 fill-warning text-warning" />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeInView>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Certifications */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-primary" />
                        Certifications
                      </h2>
                      <ul className="space-y-2">
                        {trainer.certifications.map((cert, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                            <CheckCircle2 className="w-3 h-3 text-primary flex-shrink-0" />
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeInView>

                  {/* Languages */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">Languages</h2>
                      <div className="flex flex-wrap gap-2">
                        {trainer.languages.map((lang) => (
                          <span key={lang} className="chip">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </FadeInView>

                  {/* Social Links */}
                  <FadeInView>
                    <div className="gh-card">
                      <h2 className="font-semibold text-foreground mb-3">Connect</h2>
                      <div className="space-y-2">
                        {trainer.socials.github && (
                          <a href={`https://github.com/${trainer.socials.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Github className="w-4 h-4" />
                            github.com/{trainer.socials.github}
                          </a>
                        )}
                        {trainer.socials.linkedin && (
                          <a href={`https://linkedin.com/in/${trainer.socials.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Linkedin className="w-4 h-4" />
                            linkedin.com/in/{trainer.socials.linkedin}
                          </a>
                        )}
                        {trainer.socials.twitter && (
                          <a href={`https://twitter.com/${trainer.socials.twitter}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Twitter className="w-4 h-4" />
                            @{trainer.socials.twitter}
                          </a>
                        )}
                        {trainer.socials.website && (
                          <a href={`https://${trainer.socials.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Globe className="w-4 h-4" />
                            {trainer.socials.website}
                          </a>
                        )}
                      </div>
                    </div>
                  </FadeInView>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
};

export default TrainerProfile;
