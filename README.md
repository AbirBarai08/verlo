# 🛍️ Quickshop — Full-Stack E-Commerce Platform

Quickshop is a scalable MERN stack e-commerce application built with clean architecture, robust edge-case handling, and secure authentication. It includes Google OAuth, OTP verification, dynamic product flows, and a modular admin dashboard.

---

## 🚀 Features

- 🔐 **Authentication**
  - Google OAuth login
  - OTP verification for sensitive actions

- 🛒 **Product Management**
  - Add/edit/delete products with image uploads
  - Expiry logic and auto-cleanup for unavailable items

- 🧾 **Cart & Wishlist**
  - Handles deleted/expired products gracefully
  - Modular backend utilities for state consistency

- 🗣️ **Review & Feedback**
  - Separate review and feedback flows
  - Admin moderation and scalable structure

- 🧑‍💼 **Admin Dashboard**
  - Role-based access control
  - Product visibility toggles and secure actions

- 🌐 **Responsive UI/UX**
  - Conditional rendering, loading overlays, and error feedback
  - Mobile-friendly and visually polished

---

## 🧰 Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React, Vite, Tailwind CSS      |
| Backend      | Node.js, Express.js            |
| Database     | MongoDB, Mongoose              |
| Auth         | JWT, Google OAuth, OTP logic   |
| Validation   | Joi, Multer                    |
| Storage      | Cloudinary (or local fallback) |
| Dev Tools    | ESLint, Prettier, Git          |

---

## 📁 Folder Structure

quickshop/ ├── FrontEnd/        
# React + Vite frontend │   ├── src/         
# Components, pages, routing │   ├── public/      
# Static assets │   └── ... ├── BackEnd/         
# Express backend │   ├── models/     
# Mongoose schemas │   ├── modules/     
# Reusable backend utilities │   ├── routes/      
# Auth, product, cart, feedback APIs │   └── ... ├── images/         
# Product image uploads ├── .gitignore      
# Ignores node_modules, .env, etc. ├── package.json    
# Project metadata and scripts


---

## 🧪 Setup Instructions

### 1. Clone the repository
git clone https://github.com/AbirBarai08/e-commerce-website.git

### 2. Install dependencies
cd BackEnd
npm install

cd ../FrontEnd
npm install

### 4. Run the application
# Start backend
cd BackEnd
npm run dev

# Start frontend
cd ../FrontEnd
npm run dev

Absolutely, Abir. Here's your README.md content fully structured in clean, professional Markdown format—ready to impress on GitHub:
# 🛍️ Quickshop — Full-Stack E-Commerce Platform

Quickshop is a scalable MERN stack e-commerce application built with clean architecture, robust edge-case handling, and secure authentication. It includes Google OAuth, OTP verification, dynamic product flows, and a modular admin dashboard.

---

## 🚀 Features

### 🔐 Authentication
- Google OAuth login
- OTP verification for sensitive actions

### 🛒 Product Management
- Add/edit/delete products with image uploads
- Expiry logic and auto-cleanup for unavailable items

### 🧾 Cart & Wishlist
- Handles deleted/expired products gracefully
- Modular backend utilities for state consistency

### 🗣️ Review & Feedback
- Separate review and feedback flows
- Admin moderation and scalable structure

### 🧑‍💼 Admin Dashboard
- Role-based access control
- Product visibility toggles and secure actions

### 🌐 Responsive UI/UX
- Conditional rendering, loading overlays, and error feedback
- Mobile-friendly and visually polished

---

## 🧰 Tech Stack

| Layer        | Technology                     |
|--------------|--------------------------------|
| Frontend     | React, Vite, Tailwind CSS      |
| Backend      | Node.js, Express.js            |
| Database     | MongoDB, Mongoose              |
| Auth         | JWT, Google OAuth, OTP logic   |
| Validation   | Joi, Multer                    |
| Storage      | Cloudinary (or local fallback) |
| Dev Tools    | ESLint, Prettier, Git          |

---

## 📁 Folder Structure


quickshop/ ├── FrontEnd/        # React + Vite frontend │   ├── src/         # Components, pages, routing │   ├── public/      # Static assets │   └── ... ├── BackEnd/         # Express backend │   ├── models/      # Mongoose schemas │   ├── modules/     # Reusable backend utilities │   ├── routes/      # Auth, product, cart, feedback APIs │   └── ... ├── images/          # Product image uploads ├── .gitignore       # Ignores node_modules, .env, etc. ├── package.json     # Project metadata and scripts

---

## 🧪 Setup Instructions

### 1. Clone the repository
git clone https://github.com/AbirBarai08/e-commerce-website.git


2. Install dependencies
cd BackEnd
npm install

cd ../FrontEnd
npm install


3. Configure environment variables
Create a .env file inside BackEnd/:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_API_KEY=your_cloudinary_key


4. Run the application
# Start backend
cd BackEnd
npm run dev

# Start frontend
cd ../FrontEnd
npm run dev

##🧠 Edge Case Handling
- 🧹 Cart/wishlist auto-cleanup for deleted or expired products
- 🔐 OTP fallback for non-Google users or sensitive flows
- 🖼 Image validation and partial updates using MongoDB dot notation
- 🧑‍💼 Secure admin actions with role checks and feedback separation

##📌 Project Status
- ✅ MVP complete
- 🔧 Actively refactoring for scalability
- 🧠 Exploring AI-powered features (recommendations, semantic search)

##👨‍💻 Author
Abir Barai
BSc CS student | MERN stack developer | Product thinker
📍 West Bengal, India


This version uses:
- Clear section headers (`##`)
- Subsections for readability
- Code blocks for commands and structure
- Tables and bullet points for clean formatting

Let me know if you want to add deployment links, demo GIFs, or badges

## 📁 Folder Structure
