import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter31() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("production-setup");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("✅ کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400", title = "" }) => (
    <div className="relative my-8">
      {title && (
        <div className="mb-2 text-sm font-bold text-sky-400" dir="rtl">
          {title}
        </div>
      )}
      <div className="flex justify-between items-center mb-1">
        <div className="text-xs text-gray-500">{code.split('\n').length} لائنیں</div>
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy Code
        </button>
      </div>
      <pre
        className={`bg-gray-900 ${colorClass} p-5 rounded-xl text-left font-mono overflow-x-auto text-sm md:text-base border border-gray-800 shadow-lg`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  // Tabs for different sections
  const tabs = [
    { id: "production-setup", label: "🚀 Production Setup", color: "blue" },
    { id: "docker", label: "🐳 Docker & Railway", color: "green" },
    { id: "env-setup", label: "🔐 Environment Setup", color: "purple" },
    { id: "deployment", label: "🌍 Deployment Guide", color: "red" }
  ];

  // Lesson 1 — Production Setup Explanation
  const productionSetupCode = `// Production deployment involves multiple services:
// 1. Database (MongoDB)
// 2. Authentication (NextAuth)
// 3. Image storage (Cloudinary)
// 4. Container (Docker)
// 5. Hosting (Railway)`;

  // Lesson 2 — Project Structure
  const projectStructureCode = `my-next-app/
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │        └── route.js
│   │   │
│   │   ├── register/
│   │   │    └── route.js
│   │   │
│   │   └── upload/
│   │        └── route.js
│   │
│   └── upload/
│        └── page.js
│
├── lib/
│   ├── db.js
│   └── cloudinary.js
│
├── models/
│   └── User.js
│
├── Dockerfile
├── .dockerignore
├── .env.local
└── package.json`;

  // Lesson 4 — MongoDB Connection
  const dbCode = `import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};`;

  // Lesson 5 — User Model
  const userModelCode = `import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);`;

  // Lesson 6 — Register API
  const registerApiCode = `import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const hashedPassword = await bcrypt.hash(body.password, 10);
  await User.create({
    email: body.email,
    password: hashedPassword
  });
  return Response.json({ message: "User Registered" });
}`;

  // Lesson 7 — NextAuth Setup
  const nextauthCode = `import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error("User not found");
        const validPassword = await bcrypt.compare(credentials.password, user.password);
        if (!validPassword) throw new Error("Invalid password");
        return user;
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };`;

  // Lesson 8 — Cloudinary Config
  const cloudinaryConfigCode = `import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;`;

  // Lesson 9 — Upload API
  const uploadApiCode = `import cloudinary from "@/lib/cloudinary";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "nextjs_uploads" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    ).end(buffer);
  });

  return Response.json({ imageUrl: uploadResult.secure_url });
}`;

  // Lesson 10 — Upload Page
  const uploadPageCode = `"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  
  const uploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    alert(data.imageUrl);
  };

  return (
    <form onSubmit={uploadImage}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button type="submit">Upload Image</button>
    </form>
  );
}`;

  // Lesson 11 — Environment Variables
  const envCode = `MONGODB_URI=your_mongodb_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret`;

  // Lesson 12 — Dockerfile
  const dockerfileCode = `FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app ./

EXPOSE 3000

CMD ["npm", "run", "start"]`;

  // Lesson 13 — .dockerignore
  const dockerignoreCode = `node_modules
.next
.env.local
.git`;

  // Lesson 14 — Git Commands
  const gitCommandsCode = `git init
git add .
git commit -m "initial"
git branch -M main
git remote add origin https://github.com/username/repo.git
git push -u origin main`;

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 to-slate-900 text-slate-100"
          : "bg-gradient-to-br from-gray-50 to-blue-50 text-slate-900"
      }`}
    >
      {/* Success Message */}
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-emerald-400 text-sm flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {copySuccess}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-90 border-b border-slate-700/20 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full text-blue-300/80 hover:text-blue-500 hover:bg-blue-500/10 transition-all z-[60] text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ روشن موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* Chapter Title with Beautiful Gradient */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
          باب 31: Production Deployment
        </h1>
        <p className="text-center text-lg md:text-xl mb-4 text-gray-600 dark:text-gray-400 font-medium">
          Next.js + NextAuth + MongoDB + Cloudinary
        </p>
        <p className="text-center text-md mb-10 text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
          Docker اور Railway کے ساتھ اپنی ایپ کو live کریں
        </p>

        {/* Chapter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
                activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-800 text-white shadow-lg scale-105`
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lesson Content based on activeTab */}
        <div className="space-y-10">
          {/* Production Setup Tab */}
          {activeTab === "production-setup" && (
            <section>
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">🎯 Lesson 1 — Production Setup کیا ہوتا ہے؟</h2>
                <p className="mb-4 text-lg">
                  اب تک ہم نے app localhost پر چلائی تھی: <code className="bg-gray-800 px-2 py-1 rounded text-blue-300">http://localhost:3000</code>
                </p>
                <p className="mb-4 text-lg">
                  لیکن production میں app live ہوتی ہے: <code className="bg-gray-800 px-2 py-1 rounded text-green-300">https://your-app.up.railway.app</code>
                </p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-white-30/80 dark:bg-slate-800/80 rounded-xl">
                    <h3 className="font-bold text-xl mb-2 text-blue-300">Production setup میں شامل ہوتا ہے:</h3>
                    <ul className="list-disc pr-6 space-y-1">
                      <li>Database (MongoDB)</li>
                      <li>Authentication (NextAuth)</li>
                      <li>Image storage (Cloudinary)</li>
                      <li>Container (Docker)</li>
                      <li>Hosting (Railway)</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-white-30/80 dark:bg-slate-800/80 rounded-xl">
                    <h3 className="font-bold text-xl mb-2 text-purple-300">Why Docker + Railway?</h3>
                    <ul className="list-disc pr-6 space-y-1">
                      <li>Consistent environment</li>
                      <li>Easy scaling</li>
                      <li>Zero downtime deploys</li>
                      <li>Automatic SSL</li>
                      <li>Global CDN</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">🎯 Lesson 2 — Project Structure بنائیں</h2>
                <CodeBlock code={projectStructureCode} colorClass="text-green-300" title="Project folder structure" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-4 text-purple-400">🎯 Lesson 3 — Required packages install کریں</h2>
                <div className="bg-gray-900 p-4 rounded-xl">
                  <code className="text-purple-300">npm install mongoose next-auth bcryptjs cloudinary</code>
                </div>
              </div>
            </section>
          )}

          {/* Docker & Railway Tab */}
          {activeTab === "docker" && (
            <section>
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">🎯 Lesson 12 — Dockerfile بنائیں</h2>
                <CodeBlock code={dockerfileCode} colorClass="text-green-300" title="Dockerfile" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
                <h2 className="text-2xl font-bold mb-4 text-amber-400">🎯 Lesson 13 — .dockerignore بنائیں</h2>
                <CodeBlock code={dockerignoreCode} colorClass="text-amber-300" title=".dockerignore" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">🎯 Lesson 14 — GitHub پر push کریں</h2>
                <CodeBlock code={gitCommandsCode} colorClass="text-blue-300" title="Git Commands" />
              </div>
            </section>
          )}

          {/* Environment Setup Tab */}
          {activeTab === "env-setup" && (
            <section>
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">🎯 Lesson 4 — MongoDB Connection بنائیں</h2>
                <CodeBlock code={dbCode} colorClass="text-blue-300" title="lib/db.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-4 text-purple-400">🎯 Lesson 5 — User Model بنائیں</h2>
                <CodeBlock code={userModelCode} colorClass="text-purple-300" title="models/User.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
                <h2 className="text-2xl font-bold mb-4 text-green-400">🎯 Lesson 6 — Register API بنائیں</h2>
                <CodeBlock code={registerApiCode} colorClass="text-green-300" title="app/api/register/route.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-indigo-500/20">
                <h2 className="text-2xl font-bold mb-4 text-indigo-400">🎯 Lesson 7 — NextAuth Setup کریں</h2>
                <CodeBlock code={nextauthCode} colorClass="text-indigo-300" title="app/api/auth/[...nextauth]/route.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-sky-500/5 to-cyan-500/5 border border-sky-500/20">
                <h2 className="text-2xl font-bold mb-4 text-sky-400">🎯 Lesson 8 — Cloudinary Config بنائیں</h2>
                <CodeBlock code={cloudinaryConfigCode} colorClass="text-sky-300" title="lib/cloudinary.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
                <h2 className="text-2xl font-bold mb-4 text-amber-400">🎯 Lesson 11 — Environment Variables بنائیں</h2>
                <CodeBlock code={envCode} colorClass="text-amber-300" title=".env.local" />
              </div>
            </section>
          )}

          {/* Deployment Guide Tab */}
          {activeTab === "deployment" && (
            <section>
              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-pink-500/5 border border-red-500/20">
                <h2 className="text-2xl font-bold mb-4 text-red-400">🎯 Lesson 9 — Image Upload API</h2>
                <CodeBlock code={uploadApiCode} colorClass="text-red-300" title="app/api/upload/route.js" />
              </div>

              <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-orange-500/5 to-amber-500/5 border border-orange-500/20">
                <h2 className="text-2xl font-bold mb-4 text-orange-400">🎯 Lesson 10 — Upload Page بنائیں</h2>
                <CodeBlock code={uploadPageCode} colorClass="text-orange-300" title="app/upload/page.js" />
              </div>

              <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20">
                <h2 className="text-2xl font-bold mb-4 text-emerald-400">🎯 Lesson 15 — Railway پر deploy کریں</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">1</span>
                    <span>Railway website کھولیں</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">2</span>
                    <span>GitHub سے login کریں</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">3</span>
                    <span>New Project پر click کریں</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">4</span>
                    <span>Deploy from GitHub منتخب کریں</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">5</span>
                    <span>Repository منتخب کریں</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">6</span>
                    <span>Variables tab میں env variables add کریں</span>
                  </div>
                  <p className="mt-4 text-lg font-bold text-emerald-400">Deploy automatically ہو جائے گا۔</p>
                </div>
              </div>

              <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 border border-yellow-500/20">
                <h2 className="text-3xl font-bold mb-4 text-center text-yellow-400">🎉 Final Result</h2>
                <p className="text-center text-xl mb-4">آپ کی app live ہو جائے گی:</p>
                <div className="bg-gray-900 p-4 rounded-xl text-center">
                  <code className="text-yellow-300 text-lg">https://your-app.up.railway.app</code>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Deployment Summary */}
        <section className="my-16 p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-indigo-400 text-center">
            🚀 Deployment Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>MongoDB connection string</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>NextAuth secret key</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Cloudinary credentials</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Dockerfile & .dockerignore</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Git repository setup</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-xl">✓</span>
              <span>Railway environment variables</span>
            </div>
          </div>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 italic">
            🚀 اگلے باب میں
          </h2>
          <p className="mb-4 text-lg">
            اگلے باب میں ہم <strong>Production Monitoring & Analytics</strong> سیکھیں گے:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Error tracking with Sentry</li>
            <li>Performance monitoring</li>
            <li>Log management</li>
            <li>User analytics</li>
            <li>Server metrics</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p className="text-sm">
            © 2026 Zohaib Farooq - باب 31: Production Deployment with Docker and Railway
          </p>
        </footer>
      </main>

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}