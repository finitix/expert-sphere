import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { studentAuth, teacherAuth, adminAuth } from "@/services/auth";
import { getToken, setToken as storeToken, clearToken, getStoredUser, setStoredUser, getStoredRole, setStoredRole, } from "@/services/api";
const AuthContext = createContext(undefined);
function buildAuthUser(data, role) {
    const raw = data.user || data.teacher || data.admin || data;
    return {
        id: raw.id || raw._id,
        name: raw.name,
        email: raw.email,
        role,
        avatar: raw.name
            ? raw.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)
            : "??",
        profilePictureUrl: raw.profilePictureUrl,
        category: raw.category,
        rating: raw.rating,
        workExperience: raw.workExperience,
        description: raw.description,
    };
}
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setTokenState] = useState(null);
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
    const persistSession = useCallback((authUser, authToken) => {
        setUser(authUser);
        setTokenState(authToken);
        storeToken(authToken);
        setStoredUser(authUser);
        setStoredRole(authUser.role);
    }, []);
    const login = useCallback(async (email, password, loginRole) => {
        let response;
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
    }, [persistSession]);
    const signup = useCallback(async (name, email, password) => {
        await studentAuth.signup({ name, email, password, confirmPassword: password });
        // After signup, user needs to verify OTP — we don't log in yet
    }, []);
    const verifyOtp = useCallback(async (email, otp) => {
        const response = await studentAuth.verifyOtp({ email, otp });
        if (response.token && response.user) {
            const authUser = buildAuthUser(response, "user");
            persistSession(authUser, response.token);
        }
    }, [persistSession]);
    const resendOtp = useCallback(async (email) => {
        await studentAuth.resendOtp(email);
    }, []);
    const logout = useCallback(() => {
        setUser(null);
        setTokenState(null);
        clearToken();
    }, []);
    return (<AuthContext.Provider value={{
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
        }}>
      {children}
    </AuthContext.Provider>);
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
