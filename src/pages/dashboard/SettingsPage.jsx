import { useState } from "react";
import { User, Bell, Shield, CreditCard, Palette, Camera, Save } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
const SettingsPage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState("profile");
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        bio: "Full-stack developer passionate about building great products.",
        location: "San Francisco, CA",
        website: "https://example.com",
    });
    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "security", label: "Security", icon: Shield },
        { id: "billing", label: "Billing", icon: CreditCard },
        { id: "preferences", label: "Preferences", icon: Palette },
    ];
    return (<DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  <tab.icon className="w-4 h-4"/>
                  {tab.label}
                </button>))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {activeTab === "profile" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gh-card">
                <h2 className="text-lg font-semibold text-foreground mb-6">Profile Information</h2>
                
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl font-bold text-white">
                      {user?.avatar}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-muted/80">
                      <Camera className="w-4 h-4 text-muted-foreground"/>
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{user?.name}</p>
                    <p className="text-sm text-muted-foreground capitalize">{user?.role}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                      <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="gh-input w-full"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="gh-input w-full"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                    <textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={3} className="gh-input w-full resize-none"/>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Location</label>
                      <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="gh-input w-full"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                      <input type="url" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="gh-input w-full"/>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border flex justify-end">
                  <button className="gh-btn-primary px-6 py-2">
                    <Save className="w-4 h-4 mr-2"/>
                    Save Changes
                  </button>
                </div>
              </motion.div>)}

            {activeTab === "notifications" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gh-card">
                <h2 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                { label: "Email notifications", description: "Receive email updates about your tickets" },
                { label: "Push notifications", description: "Get push notifications on your devices" },
                { label: "New message alerts", description: "Notify when trainers send you a message" },
                { label: "Ticket status updates", description: "Get notified when ticket status changes" },
                { label: "Marketing emails", description: "Receive tips, updates and offers" },
            ].map((item, i) => (<div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium text-foreground">{item.label}</p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked={i < 4} className="sr-only peer"/>
                        <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>))}
                </div>
              </motion.div>)}

            {activeTab === "security" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="gh-card">
                  <h2 className="text-lg font-semibold text-foreground mb-6">Change Password</h2>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
                      <input type="password" className="gh-input w-full"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                      <input type="password" className="gh-input w-full"/>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                      <input type="password" className="gh-input w-full"/>
                    </div>
                    <button className="gh-btn-primary px-6 py-2">Update Password</button>
                  </div>
                </div>

                <div className="gh-card">
                  <h2 className="text-lg font-semibold text-foreground mb-4">Two-Factor Authentication</h2>
                  <p className="text-muted-foreground mb-4">Add an extra layer of security to your account</p>
                  <button className="gh-btn-secondary px-4 py-2">Enable 2FA</button>
                </div>
              </motion.div>)}

            {activeTab === "billing" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gh-card">
                <h2 className="text-lg font-semibold text-foreground mb-6">Billing Information</h2>
                <p className="text-muted-foreground">Manage your payment methods and billing address.</p>
                <div className="mt-4">
                  <button className="gh-btn-secondary px-4 py-2">Manage Payment Methods</button>
                </div>
              </motion.div>)}

            {activeTab === "preferences" && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="gh-card">
                <h2 className="text-lg font-semibold text-foreground mb-6">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <div>
                      <p className="font-medium text-foreground">Dark Mode</p>
                      <p className="text-sm text-muted-foreground">Use dark theme (currently active)</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer"/>
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="font-medium text-foreground">Language</p>
                      <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                    </div>
                    <select className="gh-input w-32">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
              </motion.div>)}
          </div>
        </div>
      </div>
    </DashboardLayout>);
};
export default SettingsPage;
