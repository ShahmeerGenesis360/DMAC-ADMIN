import { io } from "socket.io-client";
console.log(process.env.VITE_PUBLIC_SOCKET)
export const socket = io(`${process.env.VITE_PUBLIC_SOCKET}`, {
  withCredentials: true, // Matches server CORS credentials
  transports: ["websocket", "polling"], // Explicitly define transports
  reconnection: true, // Enable reconnection
  reconnectionAttempts: Infinity, // Unlimited attempts
  reconnectionDelay: 1000, // Delay in ms
});
