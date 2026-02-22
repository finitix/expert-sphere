import { api } from "./api";
// ===== Student (User) Auth =====
export const studentAuth = {
    signup: (data) => api.post("/api/student/auth/signup", data, { skipAuth: true }),
    verifyOtp: (data) => api.post("/api/student/auth/verify-otp", data, { skipAuth: true }),
    resendOtp: (email) => api.post("/api/student/auth/resend-otp", { email }, { skipAuth: true }),
    login: (data) => api.post("/api/student/auth/login", data, { skipAuth: true }),
    forgotPassword: (email) => api.post("/api/student/auth/forgot-password", { email }, { skipAuth: true }),
    verifyResetOtp: (data) => api.post("/api/student/auth/verify-reset-otp", data, { skipAuth: true }),
    resetPassword: (data) => api.post("/api/student/auth/reset-password", data, { skipAuth: true }),
    getProfile: () => api.get("/api/student/profile"),
};
// ===== Teacher (Trainer) Auth =====
export const teacherAuth = {
    login: (data) => api.post("/api/teachers/login", data, { skipAuth: true }),
    getProfile: () => api.get("/api/teachers/profile"),
    forgotPassword: (email) => api.post("/api/teachers/forgot-password", { email }, { skipAuth: true }),
    verifyResetOtp: (data) => api.post("/api/teachers/verify-reset-otp", data, { skipAuth: true }),
    resetPassword: (data) => api.post("/api/teachers/reset-password", data, { skipAuth: true }),
};
// ===== Admin Auth =====
export const adminAuth = {
    login: (data) => api.post("/api/admin/login", data, { skipAuth: true }),
    getDashboard: () => api.get("/api/admin/dashboard"),
    forgotPassword: (email) => api.post("/api/admin/forgot-password", { email }, { skipAuth: true }),
    verifyResetOtp: (data) => api.post("/api/admin/verify-reset-otp", data, { skipAuth: true }),
    resetPassword: (data) => api.post("/api/admin/reset-password", data, { skipAuth: true }),
};
