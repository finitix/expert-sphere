import { api } from "./api";
import type { AuthResponse, SignupResponse, OtpResponse } from "@/types/api";

// ===== Student (User) Auth =====

export const studentAuth = {
  signup: (data: { name: string; email: string; password: string; confirmPassword: string }) =>
    api.post<SignupResponse>("/api/student/auth/signup", data, { skipAuth: true }),

  verifyOtp: (data: { email: string; otp: string }) =>
    api.post<OtpResponse>("/api/student/auth/verify-otp", data, { skipAuth: true }),

  resendOtp: (email: string) =>
    api.post<{ message: string }>("/api/student/auth/resend-otp", { email }, { skipAuth: true }),

  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/api/student/auth/login", data, { skipAuth: true }),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>("/api/student/auth/forgot-password", { email }, { skipAuth: true }),

  verifyResetOtp: (data: { email: string; otp: string }) =>
    api.post<{ message: string }>("/api/student/auth/verify-reset-otp", data, { skipAuth: true }),

  resetPassword: (data: { email: string; password: string; confirmPassword: string }) =>
    api.post<{ message: string }>("/api/student/auth/reset-password", data, { skipAuth: true }),

  getProfile: () =>
    api.get<{ user: { id: string; name: string; email: string } }>("/api/student/profile"),
};

// ===== Teacher (Trainer) Auth =====

export const teacherAuth = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/api/teachers/login", data, { skipAuth: true }),

  getProfile: () =>
    api.get<{ teacher: import("@/types/api").Teacher }>("/api/teachers/profile"),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>("/api/teachers/forgot-password", { email }, { skipAuth: true }),

  verifyResetOtp: (data: { email: string; otp: string }) =>
    api.post<{ message: string }>("/api/teachers/verify-reset-otp", data, { skipAuth: true }),

  resetPassword: (data: { email: string; password: string; confirmPassword: string }) =>
    api.post<{ message: string }>("/api/teachers/reset-password", data, { skipAuth: true }),
};

// ===== Admin Auth =====

export const adminAuth = {
  login: (data: { email: string; password: string }) =>
    api.post<AuthResponse>("/api/admin/login", data, { skipAuth: true }),

  getDashboard: () =>
    api.get("/api/admin/dashboard"),

  forgotPassword: (email: string) =>
    api.post<{ message: string }>("/api/admin/forgot-password", { email }, { skipAuth: true }),

  verifyResetOtp: (data: { email: string; otp: string }) =>
    api.post<{ message: string }>("/api/admin/verify-reset-otp", data, { skipAuth: true }),

  resetPassword: (data: { email: string; password: string; confirmPassword: string }) =>
    api.post<{ message: string }>("/api/admin/reset-password", data, { skipAuth: true }),
};
