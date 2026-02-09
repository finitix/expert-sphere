import { api } from "./api";
import type { CategoriesResponse, Category } from "@/types/api";

export const categoryService = {
  getAll: () =>
    api.get<CategoriesResponse>("/api/categories", { skipAuth: true }),

  getById: (id: string) =>
    api.get<{ message: string; category: Category }>(`/api/categories/${id}`, { skipAuth: true }),
};
