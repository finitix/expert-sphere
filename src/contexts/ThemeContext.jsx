import { createContext, useContext, useEffect, useState } from "react";
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const [theme, setThemeState] = useState(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("techsolve-theme");
            if (stored)
                return stored;
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "dark";
    });
    useEffect(() => {
        const root = document.documentElement;
        // Remove both classes first
        root.classList.remove("dark", "light");
        // Add the current theme class
        root.classList.add(theme);
        // Store preference
        localStorage.setItem("techsolve-theme", theme);
    }, [theme]);
    const toggleTheme = () => {
        setThemeState((prev) => (prev === "dark" ? "light" : "dark"));
    };
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
    };
    return (<ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>);
}
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
