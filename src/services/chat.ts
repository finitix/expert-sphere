import { io, Socket } from "socket.io-client";
import { api, API_BASE_URL, getToken } from "./api";
import type { ChatMessagesResponse, DemoResponse, ChatMessage } from "@/types/api";

let socket: Socket | null = null;

export const chatService = {
  // REST API
  getStudentMessages: (ticketId: string) =>
    api.get<ChatMessagesResponse>(`/api/chat/ticket/${ticketId}`),

  getTeacherMessages: (ticketId: string) =>
    api.get<ChatMessagesResponse>(`/api/chat/teacher/ticket/${ticketId}`),

  requestDemo: (ticketId: string) =>
    api.post<DemoResponse>(`/api/chat/ticket/${ticketId}/request-demo`),

  // Socket.IO
  connect: () => {
    if (socket?.connected) return socket;

    socket = io(API_BASE_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });

    socket.on("error", (data: { message: string }) => {
      console.error("Socket error:", data.message);
    });

    return socket;
  },

  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },

  getSocket: () => socket,

  joinChat: (ticketId: string, role: "student" | "teacher") => {
    const token = getToken();
    if (!socket || !token) return;
    socket.emit("join-chat", { token, ticketId, role });
  },

  sendMessage: (ticketId: string, message: string, role: "student" | "teacher") => {
    const token = getToken();
    if (!socket || !token) return;
    socket.emit("send-message", { ticketId, message, token, role });
  },

  sendDemo: (ticketId: string, role: "teacher") => {
    const token = getToken();
    if (!socket || !token) return;
    socket.emit("send-demo", { ticketId, token, role });
  },

  startTyping: (ticketId: string, userName: string) => {
    if (!socket) return;
    socket.emit("typing", { ticketId, userName });
  },

  stopTyping: (ticketId: string) => {
    if (!socket) return;
    socket.emit("stop-typing", { ticketId });
  },

  // Event listeners
  onMessage: (callback: (message: ChatMessage) => void) => {
    socket?.on("receive-message", callback);
    return () => { socket?.off("receive-message", callback); };
  },

  onDemo: (callback: (demo: unknown) => void) => {
    socket?.on("receive-demo", callback);
    return () => { socket?.off("receive-demo", callback); };
  },

  onTyping: (callback: (data: { userName: string; message: string }) => void) => {
    socket?.on("user-typing", callback);
    return () => { socket?.off("user-typing", callback); };
  },

  onStopTyping: (callback: (data: unknown) => void) => {
    socket?.on("user-stop-typing", callback);
    return () => { socket?.off("user-stop-typing", callback); };
  },

  onUserJoined: (callback: (data: { name: string; message: string }) => void) => {
    socket?.on("user-joined", callback);
    return () => { socket?.off("user-joined", callback); };
  },

  onUserLeft: (callback: (data: { name: string; message: string }) => void) => {
    socket?.on("user-left", callback);
    return () => { socket?.off("user-left", callback); };
  },

  onJoinSuccess: (callback: (data: { message: string; ticketId: string }) => void) => {
    socket?.on("join-success", callback);
    return () => { socket?.off("join-success", callback); };
  },
};
