import { api } from "./api";
import type { Ticket, TicketResponse, TicketsResponse, TeachersResponse } from "@/types/api";

export interface CreateTicketData {
  title: string;
  description: string;
  category: string;
  budget: number;
  deadline?: string;
}

export const ticketService = {
  create: (data: CreateTicketData) =>
    api.post<TicketResponse>("/api/tickets", data),

  getById: (id: string) =>
    api.get<{ message: string; ticket: Ticket }>(`/api/tickets/${id}`),

  update: (id: string, data: Partial<CreateTicketData>) =>
    api.put<TicketResponse>(`/api/tickets/${id}`, data),

  delete: (id: string) =>
    api.delete<{ message: string }>(`/api/tickets/${id}`),

  getMyTickets: () =>
    api.get<{ message: string; tickets: Ticket[] }>("/api/tickets/my-tickets"),

  getRecommendedTeachers: (ticketId: string) =>
    api.get<TeachersResponse>(`/api/tickets/${ticketId}/recommended-teachers`),

  requestTeacher: (ticketId: string, teacherId: string) =>
    api.post<{ message: string }>(`/api/tickets/${ticketId}/request-teacher`, { teacherId }),

  requestMultipleTeachers: (ticketId: string, teacherIds: string[]) =>
    api.post<{ message: string }>(`/api/tickets/${ticketId}/request-teachers`, { teacherIds }),
};
