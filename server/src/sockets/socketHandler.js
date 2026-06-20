const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log(
      `User connected: ${socket.userId}`
    );

    socket.on("disconnect", () => {
      console.log(
        `User disconnected: ${socket.userId}`
      );
    });
  });
};

module.exports = socketHandler;