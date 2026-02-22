import { api } from "./api";
export const profileService = {
    // Student profile pictures
    uploadStudentPicture: (file) => {
        const formData = new FormData();
        formData.append("profilePicture", file);
        return api.upload("/api/profile/student/upload-picture", formData);
    },
    getStudentPicture: () => api.get("/api/profile/student/picture"),
    deleteStudentPicture: () => api.delete("/api/profile/student/picture"),
    getStudentPictureById: (studentId) => api.get(`/api/profile/student/${studentId}/picture`, { skipAuth: true }),
    // Teacher profile pictures
    uploadTeacherPicture: (file) => {
        const formData = new FormData();
        formData.append("profilePicture", file);
        return api.upload("/api/profile/teacher/upload-picture", formData);
    },
    getTeacherPicture: () => api.get("/api/profile/teacher/picture"),
    deleteTeacherPicture: () => api.delete("/api/profile/teacher/picture"),
    getTeacherPictureById: (teacherId) => api.get(`/api/profile/teacher/${teacherId}/picture`, { skipAuth: true }),
    // Teacher demos
    uploadTeacherDemo: (file) => {
        const formData = new FormData();
        formData.append("demo", file);
        return api.upload("/api/profile/teacher/upload-demo", formData);
    },
    getTeacherDemo: () => api.get("/api/profile/teacher/demo"),
    deleteTeacherDemo: () => api.delete("/api/profile/teacher/demo"),
    getTeacherDemoById: (teacherId) => api.get(`/api/profile/teacher/${teacherId}/demo`, { skipAuth: true }),
};
