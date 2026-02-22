import { api } from "./api";
export const categoryService = {
    getAll: () => api.get("/api/categories", { skipAuth: true }),
    getById: (id) => api.get(`/api/categories/${id}`, { skipAuth: true }),
};
