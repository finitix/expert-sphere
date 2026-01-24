import { useState } from "react";
import { Shield, Search, CheckCircle2, XCircle, Eye, Calendar, Star, Award, ExternalLink, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";

const pendingVerifications = [
  { 
    id: 1, 
    name: "John Smith", 
    email: "john@example.com", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    expertise: ["React", "Node.js", "GraphQL"], 
    experience: "8 years",
    bio: "Senior developer with experience at top tech companies. Passionate about helping others learn.",
    certifications: ["AWS Certified", "Google Cloud"],
    github: "johnsmith",
    linkedin: "johnsmith",
    applied: "2 days ago",
    score: 85
  },
  { 
    id: 2, 
    name: "Emily Davis", 
    email: "emily@example.com", 
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    expertise: ["Python", "Machine Learning", "TensorFlow"], 
    experience: "6 years",
    bio: "ML engineer focused on NLP and computer vision. Published researcher.",
    certifications: ["TensorFlow Developer"],
    github: "emilydavis",
    linkedin: "emilydavis",
    applied: "3 days ago",
    score: 92
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    email: "michael@example.com", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    expertise: ["DevOps", "AWS", "Kubernetes"], 
    experience: "10 years",
    bio: "Infrastructure architect with expertise in cloud migrations and container orchestration.",
    certifications: ["AWS Solutions Architect", "CKA"],
    github: "michaelbrown",
    linkedin: "michaelbrown",
    applied: "5 days ago",
    score: 78
  },
  { 
    id: 4, 
    name: "Sarah Wilson", 
    email: "sarah@example.com", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    expertise: ["iOS", "Swift", "SwiftUI"], 
    experience: "5 years",
    bio: "Mobile developer specializing in iOS apps. Former Apple WWDC scholar.",
    certifications: ["Apple Developer"],
    github: "sarahwilson",
    linkedin: "sarahwilson",
    applied: "1 week ago",
    score: 88
  },
];

const VerificationPage = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedApplicant = pendingVerifications.find(v => v.id === selectedId);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Trainer Verification</h1>
            <p className="text-muted-foreground">Review and approve trainer applications</p>
          </div>
          <span className="chip chip-warning">{pendingVerifications.length} pending review</span>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1 space-y-3">
            <h3 className="font-semibold text-foreground mb-4">Pending Applications</h3>
            {pendingVerifications.map((applicant, i) => (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedId(applicant.id)}
                className={`gh-card cursor-pointer transition-all ${
                  selectedId === applicant.id ? "border-primary bg-primary/5" : "hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={applicant.avatar} alt={applicant.name} className="w-12 h-12 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{applicant.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{applicant.expertise.join(", ")}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {applicant.applied}
                      </span>
                      <span className={`text-xs font-medium ${
                        applicant.score >= 90 ? "text-success" : applicant.score >= 80 ? "text-primary" : "text-warning"
                      }`}>
                        Score: {applicant.score}%
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApplicant ? (
              <motion.div
                key={selectedApplicant.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="gh-card"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <img src={selectedApplicant.avatar} alt={selectedApplicant.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{selectedApplicant.name}</h3>
                      <p className="text-muted-foreground">{selectedApplicant.email}</p>
                      <p className="text-sm text-primary mt-1">{selectedApplicant.experience} experience</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-center ${
                    selectedApplicant.score >= 90 ? "bg-success/20 text-success" : 
                    selectedApplicant.score >= 80 ? "bg-primary/20 text-primary" : "bg-warning/20 text-warning"
                  }`}>
                    <p className="text-2xl font-bold">{selectedApplicant.score}</p>
                    <p className="text-xs">Score</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Bio */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">About</h4>
                    <p className="text-muted-foreground">{selectedApplicant.bio}</p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.expertise.map(skill => (
                        <span key={skill} className="chip chip-primary">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-primary" />
                      Certifications
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedApplicant.certifications.map(cert => (
                        <span key={cert} className="chip">{cert}</span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Verification Links</h4>
                    <div className="flex gap-4">
                      <a href={`https://github.com/${selectedApplicant.github}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        GitHub <ExternalLink className="w-3 h-3" />
                      </a>
                      <a href={`https://linkedin.com/in/${selectedApplicant.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                        LinkedIn <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border">
                  <button className="gh-btn-primary px-6 py-2 flex-1">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Approve
                  </button>
                  <button className="gh-btn-secondary px-6 py-2 flex-1">
                    Request More Info
                  </button>
                  <button className="px-6 py-2 rounded-md bg-destructive text-white font-medium hover:bg-destructive/90">
                    <XCircle className="w-4 h-4 mr-2 inline" />
                    Reject
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="gh-card flex items-center justify-center h-full min-h-[400px]">
                <div className="text-center text-muted-foreground">
                  <Shield className="w-12 h-12 mx-auto mb-4" />
                  <p>Select an application to review</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VerificationPage;
