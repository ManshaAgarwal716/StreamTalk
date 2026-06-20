const Message = require("../models/messages");
const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `User connected: ${socket.userId}`
    );
    socket.on("join_room", (roomId) => {
      socket.join(roomId);

    console.log(
        `User ${socket.userId} joined room ${roomId}`
      );});
    socket.on(
  "send_message",
  async ({ roomId, message }) => {
    try {
      const savedMessage = await Message.create({
        sender: socket.userId,
        roomId,
        content: message,
      });

      const payload = {
        sender: socket.userId,
        roomId,
        message: savedMessage.content,
        createdAt: savedMessage.createdAt,
      };

      io.to(roomId).emit(
        "receive_message",
        payload
      );
    } catch (error) {
      console.error(error);
    }
  }
);
  });
};

module.exports = socketHandler;