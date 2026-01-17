# PROMPTORA 🚀

**An AI-powered SaaS platform for content creation, image intelligence, and productivity automation.**

PROMPTORA is a full-stack AI SaaS application built using the **PERN stack (PostgreSQL, Express, React, Node.js)**.
It provides a collection of powerful AI-driven tools for content generation, image processing, and document analysis with a subscription-based premium model.

> ⚡ More AI-powered tools and features are actively being developed and will be available on the platform in the near future.

---

## ✨ Key Features

- 🔐 **User Authentication**
  - Secure sign-up, sign-in, and profile management using **Clerk**

- 💳 **Subscription Billing**
  - Free & Premium plans
  - Premium users get access to advanced AI tools and higher usage limits

- 🗄️ **Serverless PostgreSQL Database**
  - Powered by **Neon**

- 🧠 **AI-Powered Services**
  - Text processing using **Google Gemini API**
  - Image processing using **Cloudinary**
  - Background removal using **ClipDrop API**

---

## 🤖 AI Tools Available

| Feature | Description |
|------|------------|
| 📝 Article Generator | Generate full articles by providing a title and length |
| 📰 Blog Title Generator | Generate SEO-friendly blog titles using keywords & category |
| 🖼️ Image Generator | Generate images from text prompts |
| 🎯 Background Remover | Upload an image and remove its background |
| ✂️ Object Remover | Remove specific objects from images using text description |
| 📄 Resume Analyzer | Upload resume PDF and get complete AI analysis |

---

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- TailwindCSS
- Clerk Authentication
- Axios
- React Router DOM
- Lucide Icons
- React Hot Toast
- React Markdown

### Backend
- Node.js + Express (TypeScript)
- Neon (PostgreSQL)
- Clerk (Auth Middleware)
- Gemini AI API
- Cloudinary
- ClipDrop API
- Multer (File Uploads)
- pdf-parse (Resume analysis)

---

## 📂 Project Structure

```text
PROMPTORA/
│
├── backend/
│   ├── config/
│   │   ├── cloudinary.ts
│   │   ├── db.ts
│   │   └── multer.ts
│   ├── controllers/
│   │   ├── aiController.ts
│   │   └── userController.ts
│   ├── middleware/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── aiRoutes.ts
│   │   └── userRoutes.ts
│   ├── server.ts
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json

```
---

## ⚙️ Installation & Setup

Follow these steps to run the complete system locally.

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/NishantTripathi21/PROMPTORA
cd PROMPTORA
```

### 2️⃣ Backend Setup
Start the server first to ensure APIs are ready.
```bash
cd backend
npm install
```
**Configure Environment Variables:**

Create a `.env` file in the `backend` folder:
```env
DATABASE_URL=YOUR_NEONDB_URL

CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

GEMINI_API_KEY=
CLIPDROP_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Run Server:**
```bash
npm run server
```

### 3️⃣ Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```
create a .env file in frontend folder.
```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_BASE_URL=BACKEND_URL
```
**start the frontend**
```bash 
npm run dev
```


## 🔁 API & Service Flow
- Authentication → Clerk

- Database → Neon PostgreSQL

- AI Text Generation → Gemini API

- Image Storage → Cloudinary

- Background Removal → ClipDrop API

- File Uploads → Multer

- Resume Parsing → pdf-parse

---

## 📌 Status
#### 🛠️ Currently in active development. Deployment will be done after final testing and production tuning.

---

## 🤝 Contribution
Contributions are welcome!
1. Fork the repo.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes.
4. Push to the branch and open a Pull Request.

## 👨‍💻 Author
**Nishant Tripathi**
* [GitHub ](https://github.com/NishantTripathi21)
* [LinkedIn](https://www.linkedin.com/in/nishanttripathi21)