import { api } from "./api";
export const teacherService = {
    getAll: () => api.get("/api/teachers", { skipAuth: true }),
    getById: (id) => api.get(`/api/teachers/${id}`, { skipAuth: true }),
    getByCategory: (categoryId) => api.get(`/api/teachers/category/${categoryId}`, { skipAuth: true }),
    getProfile: () => api.get("/api/teachers/profile"),
    // Teacher request management
    getPendingRequests: () => api.get("/api/teachers/requests/pending"),
    getAllRequests: () => api.get("/api/teachers/requests/all"),
    acceptRequest: (ticketId) => api.post(`/api/teachers/requests/${ticketId}/accept`),
    rejectRequest: (ticketId) => api.post(`/api/teachers/requests/${ticketId}/reject`),
};
