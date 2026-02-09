import { api } from "./api";
import type { Teacher, TeachersResponse, Ticket } from "@/types/api";

export const teacherService = {
  getAll: () =>
    api.get<TeachersResponse>("/api/teachers", { skipAuth: true }),

  getById: (id: string) =>
    api.get<{ message: string; teacher: Teacher }>(`/api/teachers/${id}`, { skipAuth: true }),

  getByCategory: (categoryId: string) =>
    api.get<TeachersResponse>(`/api/teachers/category/${categoryId}`, { skipAuth: true }),

  getProfile: () =>
    api.get<{ teacher: Teacher }>("/api/teachers/profile"),

  // Teacher request management
  getPendingRequests: () =>
    api.get<{ message: string; requests: Ticket[] }>("/api/teachers/requests/pending"),

  getAllRequests: () =>
    api.get<{ message: string; requests: Ticket[] }>("/api/teachers/requests/all"),

  acceptRequest: (ticketId: string) =>
    api.post<{ message: string; ticket: Ticket }>(`/api/teachers/requests/${ticketId}/accept`),

  rejectRequest: (ticketId: string) =>
    api.post<{ message: string; ticket: Ticket }>(`/api/teachers/requests/${ticketId}/reject`),
};
