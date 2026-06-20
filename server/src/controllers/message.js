const Message = require("../models/messages");
const getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({
      roomId,
    })
      .sort({ createdAt: 1 })
      .populate("sender", "username");

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getMessages };