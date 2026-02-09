import { api } from "./api";
import type { ProfilePictureResponse } from "@/types/api";

export const profileService = {
  // Student profile pictures
  uploadStudentPicture: (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    return api.upload<ProfilePictureResponse>("/api/profile/student/upload-picture", formData);
  },

  getStudentPicture: () =>
    api.get<ProfilePictureResponse>("/api/profile/student/picture"),

  deleteStudentPicture: () =>
    api.delete<{ message: string }>("/api/profile/student/picture"),

  getStudentPictureById: (studentId: string) =>
    api.get<ProfilePictureResponse>(`/api/profile/student/${studentId}/picture`, { skipAuth: true }),

  // Teacher profile pictures
  uploadTeacherPicture: (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);
    return api.upload<ProfilePictureResponse>("/api/profile/teacher/upload-picture", formData);
  },

  getTeacherPicture: () =>
    api.get<ProfilePictureResponse>("/api/profile/teacher/picture"),

  deleteTeacherPicture: () =>
    api.delete<{ message: string }>("/api/profile/teacher/picture"),

  getTeacherPictureById: (teacherId: string) =>
    api.get<ProfilePictureResponse>(`/api/profile/teacher/${teacherId}/picture`, { skipAuth: true }),

  // Teacher demos
  uploadTeacherDemo: (file: File) => {
    const formData = new FormData();
    formData.append("demo", file);
    return api.upload<ProfilePictureResponse>("/api/profile/teacher/upload-demo", formData);
  },

  getTeacherDemo: () =>
    api.get<ProfilePictureResponse>("/api/profile/teacher/demo"),

  deleteTeacherDemo: () =>
    api.delete<{ message: string }>("/api/profile/teacher/demo"),

  getTeacherDemoById: (teacherId: string) =>
    api.get<ProfilePictureResponse>(`/api/profile/teacher/${teacherId}/demo`, { skipAuth: true }),
};
