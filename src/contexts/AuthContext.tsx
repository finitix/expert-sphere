import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "user" | "trainer" | "admin" | null;

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

const demoUsers: Record<Exclude<UserRole, null>, DemoUser> = {
  user: {
    id: "u1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "AJ",
    role: "user",
  },
  trainer: {
    id: "t1",
    name: "Sarah Chen",
    email: "sarah@example.com",
    avatar: "SC",
    role: "trainer",
  },
  admin: {
    id: "a1",
    name: "Mike Admin",
    email: "admin@techsolve.com",
    avatar: "MA",
    role: "admin",
  },
};

interface AuthContextType {
  user: DemoUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  login: (role: Exclude<UserRole, null>) => void;
  logout: () => void;
  switchRole: (role: Exclude<UserRole, null>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);

  const login = (role: Exclude<UserRole, null>) => {
    setUser(demoUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: Exclude<UserRole, null>) => {
    setUser(demoUsers[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
