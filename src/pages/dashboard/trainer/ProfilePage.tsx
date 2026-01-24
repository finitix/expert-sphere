import { useState } from "react";
import { User, Star, Award, MapPin, Calendar, Globe, Github, Linkedin, Camera, Save, Plus, X } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { user } = useAuth();
  const [skills, setSkills] = useState(["React", "Node.js", "TypeScript", "AWS", "PostgreSQL"]);
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Trainer Profile</h1>
          <p className="text-muted-foreground">Manage your public profile and expertise</p>
        </div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="gh-card"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-bold text-white">
                {user?.avatar}
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-muted/80">
                <Camera className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user?.name}</h2>
                  <p className="text-primary font-medium">Full Stack Expert</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      San Francisco, CA
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Member since 2022
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-warning">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-bold text-foreground">4.9</span>
                  </div>
                  <span className="text-sm text-muted-foreground">(234 reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border text-sm">
                <div>
                  <span className="font-bold text-foreground text-lg">189</span>
                  <span className="text-muted-foreground ml-1">Problems Solved</span>
                </div>
                <div>
                  <span className="font-bold text-foreground text-lg">$12.2K</span>
                  <span className="text-muted-foreground ml-1">Total Earned</span>
                </div>
                <div>
                  <span className="font-bold text-foreground text-lg">&lt;1hr</span>
                  <span className="text-muted-foreground ml-1">Avg Response</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gh-card"
        >
          <h3 className="font-semibold text-foreground mb-4">About</h3>
          <textarea
            defaultValue="10+ years building scalable web applications. Ex-Google engineer specializing in React and cloud architecture. I love helping developers solve complex problems and level up their skills."
            rows={4}
            className="gh-input w-full resize-none"
          />
        </motion.div>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="gh-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Skills & Expertise</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map((skill) => (
              <span key={skill} className="chip chip-primary flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
              placeholder="Add a skill..."
              className="gh-input flex-1"
            />
            <button onClick={addSkill} className="gh-btn-secondary px-4">
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Hourly Rate */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gh-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Hourly Rate</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <input
                type="number"
                defaultValue={75}
                className="gh-input w-32 pl-8"
              />
            </div>
            <span className="text-muted-foreground">per hour</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            This is your base rate. You can adjust per project when accepting requests.
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="gh-card"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Certifications
          </h3>
          <div className="space-y-3">
            {["AWS Solutions Architect", "Google Cloud Professional", "MongoDB Certified"].map((cert) => (
              <div key={cert} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                <span className="text-foreground">{cert}</span>
                <button className="text-sm text-destructive hover:underline">Remove</button>
              </div>
            ))}
            <button className="w-full p-3 rounded-lg border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              Add Certification
            </button>
          </div>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="gh-card"
        >
          <h3 className="font-semibold text-foreground mb-4">Social Links</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-muted-foreground" />
              <input type="text" defaultValue="github.com/sarahchen" className="gh-input flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-muted-foreground" />
              <input type="text" defaultValue="linkedin.com/in/sarahchen" className="gh-input flex-1" />
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-muted-foreground" />
              <input type="text" defaultValue="sarahchen.dev" className="gh-input flex-1" />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="gh-btn-primary px-8 py-3">
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
