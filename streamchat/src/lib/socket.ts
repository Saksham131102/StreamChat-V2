import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Returns a singleton Socket.IO client connected to the chat_service.
 * Passes userId and username as handshake auth so the server can identify
 * the sender without trusting client-sent message payloads.
 */
export const getSocket = (userId: string, username: string): Socket => {
  if (!socket) {
    const token = localStorage.getItem("accessToken");
    socket = io("/", {
      // Vite proxy routes /chat/* -> nginx -> chat_service:3001
      // Socket.IO path must match what the server is configured with
      path: "/chat/socket.io",
      auth: {
        userId,
        username,
      },
      query: token ? { token } : {},
      transports: ["websocket", "polling"],
      autoConnect: false,
    });
  }
  return socket;
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
