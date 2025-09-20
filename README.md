# 🛍️ Verlo – Modern E-commerce Platform  

Verlo is a **feature-rich ecommerce website** built on the **MERN stack** with a modular, scalable architecture. It combines a fast frontend, secure backend, and seamless user experience for online shopping.  

---

## ⚙️ Core Architecture  

- **MERN Stack**  
  - **MongoDB** – NoSQL database for users, products, carts, and orders  
  - **Express.js** – Backend with modular routes, middleware, and error handling  
  - **React (with Vite)** – High-performance frontend with modular components  
  - **Node.js** – Runtime for scalable backend services  

- **Vite** – Ultra-fast bundling and dev server for React  
- **Tailwind CSS** – Utility-first responsive styling  
- **Modular Backend** – Clear separation of routes, models, and utilities  
- **Joi Validation** – Schema-based request validation for data integrity  
- **Multer + Cloudinary** – Secure image upload, preview, validation, and cloud storage  

---

## 🔐 Authentication & Security  

- **Google OAuth** – One-click login with Google accounts  
- **OTP Verification** – Secure fallback authentication for sensitive flows or non-Google users  

---

## 🛒 Product & Cart Logic  

- **Product CRUD** – Add, edit, delete products with image support  
- **Expiry Logic** – Auto-flag or remove expired products  
- **Cart & Wishlist Handling**  
  - Auto-removal of deleted/expired items  
  - Graceful handling of broken product references  
  - Feedback to users when items are unavailable  

---

## ⭐ Review & Feedback System  

- **Modular Review & Feedback Flow** – Separate handling of reviews and general feedback  

---

## 🛠️ Admin Dashboard  

- **Hero Image Management** – Add/update homepage hero images  
- **Product Controls** – Full control over products, expiry, and availability  

---

## 🎨 UI/UX Enhancements  

- **Conditional Rendering** – Dynamic UI based on product state, user role, and context  
- **Loading Overlays** – Smooth transitions during async operations  
- **Error Feedback** – Clear validation, authentication, and network error messages  
- **Responsive Design** – Mobile-first, Tailwind-powered layout  

---

## 👨‍💻 Developer Experience  

- **Clean Codebase** – Modular utilities, reusable React components, and lean MongoDB schemas  
- **Dot Notation Updates** – Efficient partial updates for arrays/images in MongoDB  
- **Debugging Tools** – ESLint, Prettier, and structured error logging  
- **Future-Proofing** – Scalable foundation for **AI features, analytics, and deployment**  

---

## 🚀 Getting Started  

1. **Clone the repository**  
   ```bash
   git clonegit clone https://github.com/AbirBarai08/verlo.git

2. **Install dependencies**
   ```bash
    cd BackEnd
    npm install
    
    cd ../FrontEnd
    npm install

4. **Run the application**
   ```bash
     ## Start backend
      cd BackEnd
      npm run dev
      
      ## Start frontend
      cd ../FrontEnd
      npm run dev

6. **Setup environment veriables**
## MongoDB
MONGO_DB_URL=your_mongodb_connection_string

## JWT Secret
SECRET=your_jwt_secret

## Cloudinary (for image uploads)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

## Google OAuth
CLINT_ID=your_google_client_id
CLINT_SECRET=your_google_client_secret
CLINT_CALLBACK_URL=ypur_google_callback_url

## Admin Email
ADMIN_EMAIL=your_admin_email_address

## Email Service (for OTP or notifications)
SEND_EMAIL_PASS=your_email_app_password

## 🧠 Edge Case Handling
- 🧹 Cart/wishlist auto-cleanup for deleted or expired products
- 🔐 OTP fallback for non-Google users or sensitive flows
- 🖼 Image validation and partial updates using MongoDB dot notation

## 👨‍💻 Author
Abir Barai
BSc CS student | MERN stack developer | Product thinker
📍 West Bengal, India
🔗 [GitHub Profile](https://github.com/AbirBarai08)

Let me know if you want to add deployment links, demo GIFs

