#  FurNova — Premium Full-Stack E-Commerce Ecosystem

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" />
</p>

**FurNova** is a sophisticated, high-performance e-commerce platform built for a premium shopping experience. It features a modern tech stack, multi-role management (Admin, Manager, User), real-time inventory tracking, and seamless payment integration.

---

##  Key Features

###  Customer Experience
- **Premium UI/UX:** Built with a "Luxury Modern" aesthetic using GSAP animations and Framer Motion transitions.
- **Persistent Cart & Wishlist:** Shopping data is synchronized with the database, allowing users to access their items across devices.
- **Advanced Filtering:** Real-time product searching, category-based filtering, and price range sorting.
- **Secure Checkout:** Integrated **Stripe** for global secure payment processing.
- **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

###  Multi-Role Management
- **Admin Dashboard:** Full control over users, inventory, sales analytics, and system settings.
- **Manager Dashboard:** Specialized access to manage products, categories, and order fulfillment.
- **User Dashboard:** Order history tracking, profile management, and wishlist access.

###  Advanced Analytics
- Real-time revenue tracking and order status visualization using **Recharts**.
- Comprehensive inventory management with low-stock alerts.

---

##  Tech Stack

### Frontend
- **Core:** Next.js 14 (TypeScript)
- **Styling:** Tailwind CSS + Lucide Icons
- **Animations:** GSAP (ScrollTrigger) + Framer Motion
- **State Management:** Zustand (Global State)
- **Data Fetching:** Axios + TanStack Query

### Backend
- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Database:** PostgreSQL (Hosted on Neon/Supabase)
- **ORM:** Prisma ORM (Type-safe queries)
- **Authentication:** Better-Auth (Social + Email Login)
- **Security:** Zod (Validation) + CORS + Express-Validator

---

##  Project Structure

```text
FurNova/
├── frontend/             # Next.js Application
│   ├── src/components/   # Reusable UI components
│   ├── src/pages/        # Routing and Page Logic
│   └── src/store/        # Zustand State Management
└── backend/              # Express API
    ├── prisma/           # Database Schema & Migrations
    ├── src/modules/      # Modular Route Handlers
    └── src/lib/          # DB & Auth Configurations

---

## Setup & Installation
Prerequisites
Node.js 18+
PostgreSQL Database
Stripe Account (API Keys)
1. Clone the Project
bash
git clone https://github.com/HST159075/FurNova.git
cd FurNova
2. Backend Setup
bash
cd backend
npm install
cp .env.example .env      # Fill in your DB_URL, STRIPE_KEY, BETTER_AUTH_SECRET
npm run db:push           # Sync database schema
npm run dev               # Start development server
3. Frontend Setup
bash
cd ../frontend
npm install
cp .env.local.example .env.local   # Add API and Stripe Public Keys
npm run dev
<h2> Contact & Support </h2>
<br>
Developer: Tasinul Alam
<br>
Email: hsttasin90@gmail.com
<br>
LinkedIn: MD Tasinul Alam
<br>
Portfolio: tasin-portfolio.vercel.app
<br>
<h1>⭐ If you like this project, please give it a star!</h1>
