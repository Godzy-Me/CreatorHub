# 🎬 YTX --- Backend API

> A scalable backend for a YouTube and Twitter (X) inspired platform
> built with **Node.js**, **Express.js**, **MongoDB**, and
> **Cloudinary**.

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-Backend-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5)
![License](https://img.shields.io/badge/License-ISC-blue)

------------------------------------------------------------------------

## 📖 Overview

YTX is a RESTful backend that recreates the core functionality of
platforms like **YouTube** and **Twitter (X)**. It provides secure
authentication, media uploads, video management, playlists, likes,
comments, subscriptions, tweets, and channel analytics through modular
APIs.

The project follows a clean Express architecture by separating
**routes**, **controllers**, **models**, **middlewares**, and
**utilities**, making it easier to maintain and extend.

------------------------------------------------------------------------

# ✨ Features

### 🔐 Authentication

-   User registration & login
-   JWT Access Token & Refresh Token authentication
-   HTTP-only cookie support
-   Secure logout
-   Password hashing using bcrypt

### 👤 User Management

-   User profile
-   Avatar & cover image upload
-   Update account details
-   Change password
-   Watch history support

### 🎥 Videos

-   Upload videos with thumbnails
-   Cloudinary media storage
-   Update video metadata
-   Delete videos
-   Toggle publish/unpublish
-   Pagination and sorting
-   Search support

### 💬 Comments

-   Add, edit and delete comments
-   Fetch comments with pagination
-   Owner validation

### ❤️ Likes

-   Like / Unlike videos
-   Like / Unlike comments
-   Like / Unlike tweets
-   Retrieve liked videos

### 📝 Tweets

-   Create tweets
-   Edit tweets
-   Delete tweets
-   Fetch user tweets

### 📂 Playlists

-   Create playlists
-   Add & remove videos
-   Update playlist details
-   Delete playlists

### 🔔 Subscriptions

-   Subscribe / Unsubscribe
-   Fetch subscribers
-   Fetch subscribed channels

### 📊 Dashboard

-   Total channel views
-   Total subscribers
-   Total likes
-   Total uploaded videos

------------------------------------------------------------------------

# 🛠 Tech Stack

  Category           Technology
  ------------------ ---------------
  Runtime            Node.js
  Framework          Express.js
  Database           MongoDB
  ODM                Mongoose
  Authentication     JWT
  Password Hashing   bcrypt
  File Upload        Multer
  Media Storage      Cloudinary
  Cookies            cookie-parser
  Environment        dotenv

------------------------------------------------------------------------

# 🏗 Project Structure

``` text
src
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

------------------------------------------------------------------------

# 🔄 Request Lifecycle

``` text
Client
   │
   ▼
Express Router
   │
   ▼
Authentication Middleware
   │
   ▼
Controller
   │
   ▼
Model (Mongoose)
   │
   ▼
MongoDB
   │
   ▼
API Response
```

------------------------------------------------------------------------

# 📡 API Modules

  Module           Purpose
  ---------------- ----------------------------------------
  Authentication   Register, Login, Logout, Refresh Token
  Users            Profile management
  Videos           CRUD operations
  Comments         Video discussions
  Likes            Toggle likes
  Tweets           Microblogging
  Playlists        Playlist management
  Subscriptions    Channel subscriptions
  Dashboard        Analytics
  Health Check     Service status

------------------------------------------------------------------------

# 📊 Database Design

The backend uses separate collections for:

-   Users
-   Videos
-   Comments
-   Likes
-   Tweets
-   Playlists
-   Subscriptions

Relationships are implemented using MongoDB ObjectIds and Mongoose
population or aggregation pipelines.

------------------------------------------------------------------------

# 📈 Backend Highlights

-   RESTful API design
-   Aggregation Pipelines
-   Pagination
-   Cloudinary integration
-   Secure JWT authentication
-   Modular architecture
-   Centralized error handling
-   Reusable API response wrapper
-   Async handler abstraction

------------------------------------------------------------------------

# 🚀 Installation

``` bash
git clone https://github.com/Godzy-Me/YTX-.git
cd YTX-
npm install
```

Create a `.env` file:

``` env
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

Run the development server:

``` bash
npm run dev
```

------------------------------------------------------------------------

# ☁️ Cloudinary

Uploads supported:

-   Avatar
-   Cover Image
-   Video File
-   Thumbnail

------------------------------------------------------------------------

# 📚 Main Intention

-   Building scalable Express applications
-   JWT authentication using access and refresh tokens
-   MongoDB aggregation pipelines
-   Secure middleware design
-   Cloudinary file uploads
-   Mongoose relationships and population
-   Modular backend architecture

------------------------------------------------------------------------

# 🔮 Future Improvements

-   Video streaming
-   Notifications
-   Real-time chat
-   Watch Later
-   Recommendation engine
-   Docker support
-   Automated testing
-   CI/CD pipeline

------------------------------------------------------------------------

# 👨‍💻 Author

GitHub: https://github.com/Godzy-Me

------------------------------------------------------------------------

# 📄 License

This project is licensed under the ISC License.
