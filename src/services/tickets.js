import { api } from "./api";
export const ticketService = {
    create: (data) => api.post("/api/tickets", data),
    getById: (id) => api.get(`/api/tickets/${id}`),
    update: (id, data) => api.put(`/api/tickets/${id}`, data),
    delete: (id) => api.delete(`/api/tickets/${id}`),
    getMyTickets: () => api.get("/api/tickets/my-tickets"),
    getRecommendedTeachers: (ticketId) => api.get(`/api/tickets/${ticketId}/recommended-teachers`),
    requestTeacher: (ticketId, teacherId) => api.post(`/api/tickets/${ticketId}/request-teacher`, { teacherId }),
    requestMultipleTeachers: (ticketId, teacherIds) => api.post(`/api/tickets/${ticketId}/request-teachers`, { teacherIds }),
};
