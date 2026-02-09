import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { studentAuth, teacherAuth, adminAuth } from "@/services/auth";
import {
  getToken, setToken as storeToken, clearToken,
  getStoredUser, setStoredUser, getStoredRole, setStoredRole,
} from "@/services/api";
import type { AuthUser, UserRole } from "@/types/api";

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, loginRole: Exclude<UserRole, null>) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function buildAuthUser(data: any, role: Exclude<UserRole, null>): AuthUser {
  const raw = data.user || data.teacher || data.admin || data;
  return {
    id: raw.id || raw._id,
    name: raw.name,
    email: raw.email,
    role,
    avatar: raw.name
      ? raw.name.split(" ").map((w: string) => w[0]).join("").toUpperCase().slice(0, 2)
      : "??",
    profilePictureUrl: raw.profilePictureUrl,
    category: raw.category,
    rating: raw.rating,
    workExperience: raw.workExperience,
    description: raw.description,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedToken = getToken();
    const savedUser = getStoredUser();
    const savedRole = getStoredRole();

    if (savedToken && savedUser && savedRole) {
      setTokenState(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const persistSession = useCallback(
    (authUser: AuthUser, authToken: string) => {
      setUser(authUser);
      setTokenState(authToken);
      storeToken(authToken);
      setStoredUser(authUser);
      setStoredRole(authUser.role);
    },
    []
  );

  const login = useCallback(
    async (email: string, password: string, loginRole: Exclude<UserRole, null>) => {
      let response: any;

      switch (loginRole) {
        case "user":
          response = await studentAuth.login({ email, password });
          break;
        case "trainer":
          response = await teacherAuth.login({ email, password });
          break;
        case "admin":
          response = await adminAuth.login({ email, password });
          break;
      }

      const authUser = buildAuthUser(response, loginRole);
      persistSession(authUser, response.token);
    },
    [persistSession]
  );

  const signup = useCallback(async (name: string, email: string, password: string) => {
    await studentAuth.signup({ name, email, password, confirmPassword: password });
    // After signup, user needs to verify OTP — we don't log in yet
  }, []);

  const verifyOtp = useCallback(
    async (email: string, otp: string) => {
      const response = await studentAuth.verifyOtp({ email, otp });
      if (response.token && response.user) {
        const authUser = buildAuthUser(response, "user");
        persistSession(authUser, response.token);
      }
    },
    [persistSession]
  );

  const resendOtp = useCallback(async (email: string) => {
    await studentAuth.resendOtp(email);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setTokenState(null);
    clearToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        signup,
        verifyOtp,
        resendOtp,
        logout,
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

// Re-export types for convenience
export type { AuthUser, UserRole };
