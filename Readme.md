# 🎬 YTX

A scalable backend for a YouTube and Twitter (X) inspired social media platform built with **Node.js**, **Express.js**, and **MongoDB**.

The project provides secure authentication, video management, comments, playlists, likes, subscriptions, tweets, dashboard analytics, and media uploads using Cloudinary.

---

## ✨ Features

- 🔐 JWT Authentication (Access & Refresh Tokens)
- 👤 User Registration & Login
- 🍪 Secure Cookie-based Authentication
- 🎥 Video Upload & Management
- ☁️ Cloudinary Media Storage
- 💬 Comment System
- ❤️ Like Videos, Tweets & Comments
- 📝 Tweet CRUD
- 📂 Playlist Management
- 🔔 Channel Subscriptions
- 📊 Channel Dashboard Statistics
- 📈 Pagination & Aggregation Pipelines
- 🩺 Health Check API
- 🚪 Logout & Token Refresh

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Backend Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Cloudinary | Media Storage |
| Multer | File Uploads |
| Cookie Parser | Cookie Handling |
| bcrypt | Password Hashing |

---

## 📁 Project Structure

```text
src/
├── controllers/
├── db/
├── middlewares/
├── models/
├── routes/
├── utils/
├── app.js
├── constants.js
└── index.js

public/
└── temp/
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/Godzy-Me/YTX-.git
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=8000

MONGODB_URI=

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CORS_ORIGIN=*

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Run the server

```bash
npm run dev
```

---

## 📡 API Modules

- Authentication
- Users
- Videos
- Comments
- Likes
- Tweets
- Playlists
- Subscriptions
- Dashboard
- Health Check

---

## 🔐 Authentication

Protected routes require a valid JWT Access Token.

The backend uses:

- Access Tokens
- Refresh Tokens
- HTTP-only Cookies

for secure user authentication.

---

## ☁️ Cloudinary Integration

Media files are uploaded using Cloudinary.

Supported uploads include:

- User Avatar
- Cover Image
- Video Files
- Video Thumbnails

---

## 📊 Database Features

The project makes extensive use of MongoDB Aggregation Pipelines for:

- Dashboard Statistics
- Video Queries
- Comments
- Channel Information
- Pagination

---

## 📦 Main Dependencies

- Express.js
- Mongoose
- JWT
- Multer
- Cloudinary
- bcrypt
- Cookie Parser
- CORS

---

## 🔮 Future Improvements

- Video Streaming
- Search Recommendations
- Notification System
- Watch Later
- Video History
- Real-time Chat
- Unit & Integration Testing
- Docker Support

---

## 👨‍💻 Author

GitHub: https://github.com/Godzy-Me

---

## 📄 License

This project is licensed under the ISC License.