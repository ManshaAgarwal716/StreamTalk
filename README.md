# StreamTalk

StreamTalk is a scalable real-time chat application built to explore WebSockets, Redis Pub/Sub, and event-driven backend architecture.

The project focuses on building production-ready real-time systems with instant messaging, JWT authentication, message persistence, and horizontal scalability.

## ✨ Features

### Current Goals

- User authentication with JWT
- Real-time one-to-one and room-based messaging
- Message persistence
- Redis Pub/Sub integration
- Online/offline user presence
- Typing indicators
- Dockerized deployment

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js
- Socket.IO
- Redis
- MongoDB
- JWT
- bcrypt
- Docker

## 🏗️ Architecture

```text
Client
  │
  ▼
Express API
  │
  ▼
Socket.IO Server
  │
  ▼
Redis Pub/Sub
  │
  ▼
MongoDB
