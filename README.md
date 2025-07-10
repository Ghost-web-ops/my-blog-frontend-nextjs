# 📰 Next.js Frontend for Strapi Blog

This is the frontend of a full-stack blog application built using **Next.js**, **TypeScript**, and **Tailwind CSS**. It connects to a **Strapi CMS** backend via REST API to fetch and display blog posts with images and markdown content.

---

## 🚀 Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- Deployed with [Vercel](https://vercel.com/)

---

## 📦 Features

- Home page with responsive blog cards
- Individual post pages using dynamic routes
- Markdown rendering
- Image optimization with Next.js
- Environment-based configuration

---

## 📁 Project Structure

.
├── app/ # Pages and routes
│ ├── page.tsx # Home page
│ └── posts/[slug]/ # Dynamic post page
├── components/ # Reusable components (e.g. PostCard)
├── public/ # Static assets
├── styles/ # Global styles
├── .env.local # Environment variables
├── tailwind.config.ts
├── next.config.js
└── README.md

yaml
نسخ
تحرير

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/nextjs-strapi-blog.git
cd nextjs-strapi-blog
2. Install dependencies
bash
نسخ
تحرير
npm install
3. Create .env.local
env
نسخ
تحرير
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-backend.up.railway.app
Replace the URL with your actual Strapi backend URL.

4. Run the development server
bash
نسخ
تحرير
npm run dev
App will be available at:
📍 http://localhost:3000

🚀 Deployment on Vercel
Push the repo to GitHub.

Go to https://vercel.com and create a new project.

Import your GitHub repo.

Add the environment variable:

ini
نسخ
تحرير
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-backend.up.railway.app
Click Deploy 🚀

🔗 Backend Repository
You can find the backend (Strapi CMS) here:
👉 https://github.com/your-username/strapi-cms-backend

👤 Author
Made with 💙 by Your Name

📄 License
This project is open-source and available under the MIT License.

yaml
نسخ
تحرير

---

## ✅ 2. `README.md` – **Backend (Strapi CMS)**

```markdown
# 🛠️ Strapi CMS Backend

This is the backend API for a full-stack blog application, built using **Strapi v4 CMS**. It provides content management and exposes a REST API for the frontend (e.g., built with Next.js).

---

## 🚀 Tech Stack

- [Strapi v4](https://docs.strapi.io/)
- Node.js
- SQLite / PostgreSQL (configurable)
- RESTful API

---

## 📦 Features

- Blog post content types
- Image upload and storage
- Auto-generated REST API
- JWT-based authentication
- Admin panel at `/admin`

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/strapi-cms-backend.git
cd strapi-cms-backend
2. Install dependencies
bash
نسخ
تحرير
npm install
3. Create a .env file
env
نسخ
تحرير
APP_KEYS=your-app-key
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-secret
JWT_SECRET=your-jwt-secret
Generate secure values using:

bash
نسخ
تحرير
openssl rand -hex 32
📁 Project Structure
bash
نسخ
تحرير
.
├── src/              # Content types, controllers, routes
├── config/           # Server, database, middlewares
├── public/           # Static files (e.g., image uploads)
├── .env              # Private env vars
├── package.json
└── README.md
🔧 Useful Commands
bash
نسخ
تحرير
npm run develop     # Start in dev mode
npm run build       # Build for production
npm run start       # Start production server
Admin Panel:
📍 http://localhost:1337/admin

🌐 Deployment (e.g., Railway)
Push the project to GitHub.

Go to https://railway.app and create a new project.

Link the repo and add the environment variables.

Railway will auto-detect and deploy the app.

Use the public backend URL in your frontend.

👤 Author
Created by Your Name

📄 License
This project is licensed under the MIT License.

yaml
نسخ
تحرير

---

هل تحب كمان أجهز لك ملفات `.env.example` للفرونت والباك؟
