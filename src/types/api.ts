// ===== Backend Entity Types =====

export interface Category {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  isEmailVerified: boolean;
  profilePictureUrl?: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  category: Category;
  rating: number;
  workExperience?: string;
  description?: string;
  profilePictureUrl?: string;
  demoUrl?: string;
  demoFileName?: string;
  demoUploadedAt?: string;
  projects?: TeacherProject[];
}

export interface TeacherProject {
  id: string;
  title: string;
  description?: string;
  url?: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface TicketRequest {
  teacher: { id: string; name: string };
  status: "pending" | "accepted" | "rejected";
  respondedAt?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  category: Category;
  student: { id: string; name: string; email: string };
  status: "open" | "in-progress" | "completed" | "closed";
  budget: number;
  deadline?: string;
  requestedTeachers: TicketRequest[];
  createdAt: string;
  updatedAt?: string;
}

export interface ChatMessage {
  id: string;
  senderRole: "student" | "teacher";
  senderName: string;
  message: string;
  fileName?: string;
  filePath?: string;
  signedUrl?: string;
  createdAt: string;
}

export interface DemoFile {
  teacherId: string;
  teacherName: string;
  fileName: string;
  filePath: string;
  signedUrl: string;
  uploadedAt: string;
  expiresIn: string;
}

// ===== API Response Types =====

export interface AuthResponse {
  message: string;
  token: string;
  user?: StudentUser;
  teacher?: Teacher;
  admin?: AdminUser;
}

export interface SignupResponse {
  message: string;
  user: StudentUser;
}

export interface OtpResponse {
  message: string;
  token?: string;
  user?: StudentUser;
}

export interface CategoriesResponse {
  message: string;
  categories: Category[];
}

export interface TeachersResponse {
  message: string;
  teachers: Teacher[];
  totalTeachers?: number;
}

export interface TicketResponse {
  message: string;
  ticket: Ticket;
}

export interface TicketsResponse {
  message: string;
  tickets: Ticket[];
}

export interface ChatMessagesResponse {
  message: string;
  ticketId: string;
  messages: ChatMessage[];
}

export interface ProfilePictureResponse {
  message: string;
  filePath: string;
  signedUrl: string;
  expiresIn?: string;
  student?: StudentUser;
  teacher?: Teacher;
}

export interface DemoResponse {
  message: string;
  demo: DemoFile;
}

// ===== Frontend Auth Types =====

export type UserRole = "user" | "trainer" | "admin" | null;

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: Exclude<UserRole, null>;
  avatar: string;
  profilePictureUrl?: string;
  category?: Category;
  rating?: number;
  workExperience?: string;
  description?: string;
}
