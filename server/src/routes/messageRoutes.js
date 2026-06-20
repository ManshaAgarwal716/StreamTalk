const express = require("express");

const restrictToLoggedInUsers = require(
  "../middleware/auth"
);

const {
  getMessages,
} = require("../controllers/message");

const router = express.Router();

router.get(
  "/:roomId",
  restrictToLoggedInUsers,
  getMessages
);

module.exports = router;