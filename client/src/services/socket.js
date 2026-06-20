import { io } from "socket.io-client";
export const createSocket = (token) => {
  return io("http://localhost:5001", {
    auth: {
      token,
    },
  });
};