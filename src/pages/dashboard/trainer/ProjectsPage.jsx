import { useState } from "react";
import { Clock, MessageSquare, ArrowUpRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
const projects = [
    {
        id: "T-1230", title: "Kubernetes deployment failing",
        user: { name: "David Kim", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
        status: "in_progress", started: "2 hours ago", budget: "$200", messages: 12, progress: 60
    },
    {
        id: "T-1228", title: "GraphQL schema design review",
        user: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
        status: "awaiting_response", started: "5 hours ago", budget: "$75", messages: 8, progress: 40
    },
    {
        id: "T-1225", title: "CI/CD pipeline setup for React app",
        user: { name: "Noah Brown", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
        status: "in_progress", started: "1 day ago", budget: "$180", messages: 24, progress: 85
    },
    {
        id: "T-1220", title: "MongoDB aggregation pipeline optimization",
        user: { name: "Sophia Martinez", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
        status: "completed", started: "3 days ago", budget: "$120", messages: 18, progress: 100
    },
];
const ProjectsPage = () => {
    const [filter, setFilter] = useState("all");
    const filteredProjects = projects.filter(p => filter === "all" || p.status === filter);
    return (<DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Projects</h1>
            <p className="text-muted-foreground">Track and manage your active projects</p>
          </div>
          <div className="flex gap-2">
            {["all", "in_progress", "awaiting_response", "completed"].map((f) => (<button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {f === "all" ? "All" : f === "in_progress" ? "Active" : f === "awaiting_response" ? "Waiting" : "Completed"}
              </button>))}
          </div>
        </div>

        <div className="grid gap-4">
          {filteredProjects.map((project, i) => (<motion.div key={project.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="gh-card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <img src={project.user.avatar} alt={project.user.name} className="w-12 h-12 rounded-full object-cover"/>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-mono text-muted-foreground">{project.id}</span>
                      <span className={`chip text-xs ${project.status === "completed" ? "chip-success" :
                project.status === "in_progress" ? "chip-primary" : "chip-warning"}`}>
                        {project.status === "in_progress" ? "In Progress" : project.status === "awaiting_response" ? "Waiting" : "Completed"}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground">{project.title}</p>
                    <p className="text-sm text-muted-foreground">Client: {project.user.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xl font-bold text-primary">{project.budget}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-4 h-4"/>
                    <span>Started {project.started}</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium text-foreground">{project.progress}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${project.progress}%` }} transition={{ duration: 0.8, ease: "easeOut" }} className={`h-full rounded-full ${project.progress === 100 ? "bg-success" : "bg-primary"}`}/>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4"/>
                    {project.messages} messages
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="gh-btn-secondary px-4 py-2 text-sm">
                    <MessageSquare className="w-4 h-4 mr-1"/>
                    Chat
                  </button>
                  <button className="gh-btn-primary px-4 py-2 text-sm">
                    <ArrowUpRight className="w-4 h-4 mr-1"/>
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>))}
        </div>
      </div>
    </DashboardLayout>);
};
export default ProjectsPage;
