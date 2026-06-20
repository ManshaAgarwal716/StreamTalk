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
    socket.on("send_message", ({ roomId, message }) => {
      const payload = {
        sender: socket.userId,
        roomId,
        message,
        createdAt: new Date(),
      };

      io.to(roomId).emit(
        "receive_message",
        payload
      );
    });
    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${socket.userId}`
      );
    });
  });
};

module.exports = socketHandler;