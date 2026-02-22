import { io } from "socket.io-client";
import { api, API_BASE_URL, getToken } from "./api";
let socket = null;
export const chatService = {
    // REST API
    getStudentMessages: (ticketId) => api.get(`/api/chat/ticket/${ticketId}`),
    getTeacherMessages: (ticketId) => api.get(`/api/chat/teacher/ticket/${ticketId}`),
    requestDemo: (ticketId) => api.post(`/api/chat/ticket/${ticketId}/request-demo`),
    // Socket.IO
    connect: () => {
        if (socket?.connected)
            return socket;
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
        socket.on("error", (data) => {
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
    joinChat: (ticketId, role) => {
        const token = getToken();
        if (!socket || !token)
            return;
        socket.emit("join-chat", { token, ticketId, role });
    },
    sendMessage: (ticketId, message, role) => {
        const token = getToken();
        if (!socket || !token)
            return;
        socket.emit("send-message", { ticketId, message, token, role });
    },
    sendDemo: (ticketId, role) => {
        const token = getToken();
        if (!socket || !token)
            return;
        socket.emit("send-demo", { ticketId, token, role });
    },
    startTyping: (ticketId, userName) => {
        if (!socket)
            return;
        socket.emit("typing", { ticketId, userName });
    },
    stopTyping: (ticketId) => {
        if (!socket)
            return;
        socket.emit("stop-typing", { ticketId });
    },
    // Event listeners
    onMessage: (callback) => {
        socket?.on("receive-message", callback);
        return () => { socket?.off("receive-message", callback); };
    },
    onDemo: (callback) => {
        socket?.on("receive-demo", callback);
        return () => { socket?.off("receive-demo", callback); };
    },
    onTyping: (callback) => {
        socket?.on("user-typing", callback);
        return () => { socket?.off("user-typing", callback); };
    },
    onStopTyping: (callback) => {
        socket?.on("user-stop-typing", callback);
        return () => { socket?.off("user-stop-typing", callback); };
    },
    onUserJoined: (callback) => {
        socket?.on("user-joined", callback);
        return () => { socket?.off("user-joined", callback); };
    },
    onUserLeft: (callback) => {
        socket?.on("user-left", callback);
        return () => { socket?.off("user-left", callback); };
    },
    onJoinSuccess: (callback) => {
        socket?.on("join-success", callback);
        return () => { socket?.off("join-success", callback); };
    },
};
