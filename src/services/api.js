// API Configuration & HTTP Client
// ⚠️ Change this to your deployed backend URL before production
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
export { API_BASE_URL };
export function getToken() {
    return localStorage.getItem("token");
}
export function setToken(token) {
    localStorage.setItem("token", token);
}
export function clearToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");
}
export function getStoredUser() {
    const raw = localStorage.getItem("user");
    if (!raw)
        return null;
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function setStoredUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
}
export function getStoredRole() {
    return localStorage.getItem("userRole");
}
export function setStoredRole(role) {
    localStorage.setItem("userRole", role);
}
export async function apiRequest(endpoint, options = {}) {
    const { body, skipAuth = false, isFormData = false, ...fetchOptions } = options;
    const headers = {};
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
    }
    if (!skipAuth) {
        const token = getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
    }
    const config = {
        ...fetchOptions,
        headers: { ...headers, ...fetchOptions.headers },
    };
    if (body) {
        config.body = isFormData ? body : JSON.stringify(body);
    }
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    if (!response.ok) {
        const error = await response.json().catch(() => ({
            message: `Request failed with status ${response.status}`,
        }));
        throw new Error(error.message || `HTTP Error ${response.status}`);
    }
    return response.json();
}
// Convenience methods
export const api = {
    get: (endpoint, options) => apiRequest(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: "POST", body }),
    put: (endpoint, body, options) => apiRequest(endpoint, { ...options, method: "PUT", body }),
    delete: (endpoint, options) => apiRequest(endpoint, { ...options, method: "DELETE" }),
    upload: (endpoint, formData, options) => apiRequest(endpoint, {
        ...options,
        method: "POST",
        body: formData,
        isFormData: true,
    }),
};
