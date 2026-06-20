import { useEffect, useState } from "react";
import { createSocket } from "../services/socket";
import api from "../services/api";
function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
   const roomId = "general";
    useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
        return ;
    }
    const fetchMessages = async () => {
    try {
      const response = await api.get(
        `/messages/${roomId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const oldMessages = response.data.map((msg) => ({
        sender: msg.sender.username,
        message: msg.content,
        createdAt: msg.createdAt,
      }));

      setMessages(oldMessages);
    } catch (error) {
      console.error(
        "Error fetching messages:",
        error
      );
    }
  };

  fetchMessages();
    const newSocket = createSocket(token);
    newSocket.on("connect", () => {
      console.log("Connected:", newSocket.id);

      newSocket.emit("join_room", roomId);
    });

    newSocket.on("joined_room", (data) => {
      console.log("Joined room:", data.roomId);
    });

    newSocket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on("connect_error", (error) => {
      console.error(error.message);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message.trim() || !socket) {
      return;
    }

    socket.emit("send_message", {
      roomId,
      message,
    });

    setMessage("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>StreamTalk</h1>

      <div
        style={{
          border: "1px solid #ccc",
          height: "400px",
          overflowY: "auto",
          padding: "10px",
          marginBottom: "20px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "12px" }}>
            <strong>{msg.sender}</strong>

            <p>{msg.message}</p>

            <small>
              {new Date(msg.createdAt).toLocaleTimeString()}
            </small>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "70%",
            padding: "10px",
            marginRight: "10px",
          }}
        />

        <button type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
