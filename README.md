
# 🚀 CreatorHub

> **A scalable backend API for a modern content-sharing platform built with Node.js, Express.js, MongoDB, and Cloudinary.**

## 📖 Overview

CreatorHub is a production-inspired RESTful backend designed for a creator-focused content-sharing platform. It demonstrates secure authentication, media uploads, modular architecture, aggregation pipelines, and scalable API design.

The platform supports user authentication, video publishing, comments, likes, playlists, subscriptions, dashboard analytics, and profile management.

---

## ✨ Features

### Authentication
- JWT Access & Refresh Tokens
- HTTP-only Cookies
- bcrypt Password Hashing
- Login / Logout / Refresh Tokens

### User Management
- Registration
- Profile Update
- Avatar & Cover Image Upload
- Password Change
- Watch History

### Videos
- Upload & Delete
- Update Metadata
- Publish / Unpublish
- Pagination
- Search & Sorting

### Comments
- CRUD Operations
- Pagination
- Owner Authorization

### Likes
- Videos
- Comments
- Posts

### Playlists
- Create
- Update
- Delete
- Add / Remove Videos

### Subscriptions
- Subscribe / Unsubscribe
- Subscriber Lists

### Dashboard
- Views
- Likes
- Subscribers
- Uploaded Videos

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Cloudinary
- Multer
- bcrypt
- cookie-parser
- cors
- dotenv

---

## 🏗 Architecture

```text
Client
   │
Routes
   │
JWT Middleware
   │
Controllers
   │
Models
   │
MongoDB
```

---

## 📂 Project Structure

```text
src/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
└── index.js
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Godzy-Me/CreatorHub.git
cd CreatorHub
npm install
npm run dev
```

Create a `.env` file using `.env.sample`.

---

## 📚 Learning Outcomes

- REST API Design
- JWT Authentication
- Cloudinary Integration
- MongoDB Aggregation Pipelines
- Modular Express Architecture
- Secure Backend Development

---

## 🔮 Future Improvements

- Video Streaming
- Notifications
- Recommendation System
- Docker
- Automated Testing

---

## 👨‍💻 Author

**Pradnesh K**

GitHub: https://github.com/Godzy-Me
