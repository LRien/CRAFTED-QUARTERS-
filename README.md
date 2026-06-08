# Crafted Quarters 🪑

A full-stack e-commerce web application for a furniture store. Crafted Quarters allows users to browse furniture collections, filter and sort products, view detailed product pages, manage a shopping cart, and complete purchases through a checkout flow with PayPal integration.

---

## 🛋️ About

Crafted Quarters is an online furniture store offering a curated selection of modern, rustic, and contemporary home furnishings. The platform provides a seamless shopping experience — from browsing new arrivals and filtering by category, brand, or material, to checking out with a secure payment gateway.

---

## 🖥️ Tech Stack

### Frontend
- **React** (Vite)
- **Redux Toolkit** — global state management for cart, auth, and products
- **React Router DOM** — client-side routing
- **Tailwind CSS** — utility-first styling
- **Sonner** — toast notifications
- **React Icons** — icon library
- **Axios** — HTTP requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** — authentication and authorization
- **Bcrypt** — password hashing
- **PayPal REST SDK** — payment processing

### Deployment
- **Frontend** — Vercel
- **Backend** — Render
- **Database** — MongoDB Atlas

---

## ✨ Features

- Browse furniture by collections, categories, and new arrivals
- Filter products by category, color, material, brand, and price range
- Sort products by price (low to high, high to low) and popularity
- Product detail page with image gallery, size/color selection, and quantity control
- Sliding cart drawer with item management
- Guest and authenticated user cart support
- Checkout form with shipping address and PayPal payment
- Order confirmation page
- Responsive design for mobile and desktop
- Admin panel for managing products and orders

---

## 📁 Project Structure
crafted-quarters/
├── client/                   ← React + Vite frontend
│   ├── src/
│   │   ├── components/       ← reusable UI components
│   │   ├── pages/            ← page-level components
│   │   ├── store/            ← Redux slices and store config
│   │   ├── hooks/            ← custom React hooks
│   │   ├── utils/            ← helper functions
│   │   └── main.jsx          ← app entry point
│   └── vite.config.js
├── server/                   ← Node.js + Express backend
│   ├── controllers/          ← route handler logic
│   ├── models/               ← Mongoose schemas
│   ├── routes/               ← API route definitions
│   ├── middleware/           ← auth and error middleware
│   ├── config/               ← database and env config
│   └── index.js              ← server entry point
└── README.md

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- PayPal Developer account

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/LRien/CRAFTED-QUARTERS-.git
cd crafted-quarters
```

**2. Install dependencies**
```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

**3. Set up environment variables**

Create a `.env` file in the `server/` folder:
```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

Create a `.env` file in the `client/` folder:
```env
VITE_API_URL=http://localhost:5000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

**4. Run the app locally**
```bash
# Run backend
cd server
npm run dev

# Run frontend (in a new terminal)
cd client
npm run dev
```
---

## 👨‍💻 Developer

**Leonardo Enricho Quadra**
GitHub: [@LRien](https://github.com/LRien)
LinkedIn: [leonardo-enricho-quadra-04a921213](https://linkedin.com/in/leonardo-enricho-quadra-04a921213)
