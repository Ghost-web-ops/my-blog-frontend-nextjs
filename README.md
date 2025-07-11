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

```

.
├── src/
│   └── app/
│       ├── page.tsx            # Home page
│       └── posts/\[slug]/       # Dynamic post page
├── components/                 # Reusable UI components
├── public/                     # Static assets
├── styles/                     # Global styles
├── .env.local                  # Local environment variables
├── tailwind.config.ts
├── next.config.ts
└── README.md

````

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ghost-web-ops/my-blogspot.git
cd my-blogspot
````

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-backend.up.railway.app
```

> Replace the URL with your actual deployed Strapi backend.

### 4. Run the development server

```bash
npm run dev
```

Then open your browser at:
📍 `http://localhost:3000`

---

## 🚀 Deploy to Vercel

1. Push this project to GitHub.
2. Go to [https://vercel.com](https://vercel.com).
3. Import your repository.
4. Set the following environment variable:

```env
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-backend.up.railway.app
```

5. Click **Deploy** 🚀

---

## 🔗 Backend Repository

👉 [https://github.com/Ghost-web-ops/my-strapi-project](https://github.com/Ghost-web-ops/my-strapi-project)

---

## 👤 Author

Made with 💙 by [Omar Yasser](https://github.com/Ghost-web-ops)

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

````
# Strapi backend API URL (do not include trailing slash)
NEXT_PUBLIC_STRAPI_API_URL=https://your-strapi-backend.up.railway.app
