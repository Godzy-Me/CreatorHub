# 🚀 CreatorHub

> **A scalable backend API for a modern content-sharing platform
> featuring secure authentication, media management, video publishing,
> playlists, comments, likes, subscriptions, and creator-focused social
> interactions.**

![Node.js](https://img.shields.io/badge/Node.js-20+-339933?logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Media-3448C5)

------------------------------------------------------------------------

## 📖 Overview

CreatorHub is a production-inspired RESTful backend that powers a
creator-focused content-sharing platform. It demonstrates real-world
backend development practices through secure authentication, media
uploads, modular architecture, aggregation pipelines, and scalable API
design.

The application enables users to publish videos, interact through
comments and likes, create playlists, subscribe to creators, publish
short-form posts, and manage their profiles while securely storing media
assets in Cloudinary.

## ✨ Features

-   JWT Authentication (Access & Refresh Tokens)
-   HTTP-only Cookie-based Sessions
-   User Registration & Profile Management
-   Video Upload & Management
-   Cloudinary Media Storage
-   Comments, Likes & Short-form Posts
-   Playlist Management
-   Creator Subscriptions
-   Dashboard Analytics
-   Pagination & MongoDB Aggregation Pipelines

## 🛠 Tech Stack

-   Node.js
-   Express.js
-   MongoDB
-   Mongoose
-   JWT
-   bcrypt
-   Cloudinary
-   Multer
-   Cookie Parser
-   CORS

## 📁 Project Structure

``` text
src/
├── controllers
├── db
├── middlewares
├── models
├── routes
├── utils
└── index.js
```

## 🚀 Getting Started

``` bash
git clone https://github.com/Godzy-Me/CreatorHub.git
cd CreatorHub
npm install
npm run dev
```

Create a `.env` file using the provided `.env.sample`.

## 📡 Modules

-   Authentication
-   Users
-   Videos
-   Comments
-   Likes
-   Playlists
-   Subscriptions
-   Dashboard
-   Health Check

## 🏗 Request Flow

``` text
Client
  ↓
Routes
  ↓
JWT Middleware
  ↓
Controllers
  ↓
Mongoose
  ↓
MongoDB
```

## 👨‍💻 Author

GitHub: https://github.com/Godzy-Me
