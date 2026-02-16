import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter9() {
  // تھیم اور سائیڈ بار کی اسٹیٹ
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* ہیڈر */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
 <button 
  onClick={toggleSidebar} 
  className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current"
>
  <div className="space-y-1.5">
    <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
    <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
    <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
  </div>
</button>

        <button 
          onClick={toggleTheme} 
          className="px-4 py-2 cursor-pointer rounded-full  bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg font-bold transition-transform active:scale-90"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-emerald-500 to-teal-500 pb-2">
            📘 سبق 9: Server Actions، API Routes اور Database CRUD
          </h1>
          <div className="p-6 bg-emerald-500/10 border-r-4 border-emerald-500 rounded-lg mb-8">
            <p className="text-xl font-bold">Next.js میں Server Actions اور API Routes استعمال کر کے آپ:</p>
            <ul className="mt-4 space-y-2 text-lg italic">
              <li>• Server پر data fetch یا save کر سکتے ہیں</li>
              <li>• Client سے request بھیج سکتے ہیں</li>
              <li>• Database کے ساتھ CRUD operations کر سکتے ہیں</li>
            </ul>
            <p className="mt-4 font-bold text-emerald-600 underline">یہی طریقہ ہے جو ہر real-world project میں استعمال ہوتا ہے۔</p>
          </div>
        </section>

        {/* 🧠 1️⃣ Server Actions کیا ہیں؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400">🧠 1️⃣ Server Actions کیا ہیں؟</h2>
          <p className="text-lg mb-4 italic font-bold">نظریہ:</p>
          <p className="mb-6">Next.js 13+ میں Server Actions آپ کو الاؤ کرتے ہیں کہ سرور پر فنکشن براہ راست کال کریں، براؤزر میں جاوا اسکرپٹ استعمال کیے بغیر ڈیٹا بیس یا فائل سسٹم تک رسائی حاصل کریں۔</p>
          
          <h3 className="text-lg font-bold mb-3 italic">مثال:</h3>
          <pre className="bg-black text-emerald-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-4" dir="ltr">
{`"use server";

export async function addBlog(title) {
  // فرض کریں یہ database insert ہے
  console.log("Blog added:", title);
}`}
          </pre>
          <p className="p-3 bg-slate-800/40 rounded-lg text-sm">
            <strong>نکتہ:</strong> <code className="text-emerald-400">"use server"</code> کا مطلب ہے کہ یہ فنکشن صرف سرور سائیڈ پر چلے گا۔ کلائنٹ اسے ڈائریکٹ ایکسیس نہیں کر سکتا۔
          </p>
        </section>

        

        {/* 🧠 2️⃣ API Routes کیا ہیں؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400">🧠 2️⃣ API Routes کیا ہیں؟</h2>
          <p className="text-lg mb-4 italic font-bold">نظریہ:</p>
          <p className="mb-6">API Routes وہ اینڈ پوائنٹس ہیں جو سرور پر چلتے ہیں اور کلائنٹ انہیں <code className="text-sky-400 font-mono italic">fetch</code> سے کال کر سکتا ہے۔</p>
          <p className="font-bold mb-4">📁 فائل: app/api/blog/route.js</p>
          
          <h3 className="text-lg font-bold mb-3 italic">Basic GET + POST Example:</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`// app/api/blog/route.js
import { blogs } from "@/data/blogs";

export async function GET() {
  return new Response(JSON.stringify(blogs), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  blogs.push(data); // فرضی database
  return new Response(JSON.stringify({ message: "Blog added" }));
}`}
          </pre>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20"><strong>GET:</strong> ڈیٹا لانے کے لیے</div>
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20"><strong>POST:</strong> ڈیٹا محفوظ کرنے کے لیے</div>
          </div>
        </section>

        {/* 🧠 3️⃣ Database CRUD */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">🧠 3️⃣ Database CRUD (MongoDB + Mongoose)</h2>
          
          <div className="space-y-8">
            <div>
              <h4 className="font-bold mb-2">1️⃣ MongoDB connection (lib/mongo.js)</h4>
              <pre className="bg-black text-white p-4 rounded-xl text-[11px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("Mongo URI not found");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  const conn = await mongoose.connect(MONGO_URI);
  cached.conn = conn;
  return conn;
}`}
              </pre>
            </div>

            <div>
              <h4 className="font-bold mb-2">2️⃣ Blog Schema</h4>
              <pre className="bg-black text-emerald-300 p-4 rounded-xl text-[11px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800" dir="ltr">
{`import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;`}
              </pre>
            </div>

            <div>
              <h4 className="font-bold mb-2">3️⃣ API Route for CRUD</h4>
              <pre className="bg-black text-sky-300 p-4 rounded-xl text-[11px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800" dir="ltr">
{`// app/api/blog/route.js
import { connectToDB } from "@/lib/mongo";
import Blog from "@/models/Blog";

export async function GET() {
  await connectToDB();
  const blogs = await Blog.find();
  return new Response(JSON.stringify(blogs), { status: 200 });
}

export async function POST(request) {
  await connectToDB();
  const data = await request.json();
  const newBlog = new Blog(data);
  await newBlog.save();
  return new Response(JSON.stringify(newBlog), { status: 201 });
}`}
              </pre>
            </div>
          </div>
        </section>

        

        {/* 🧩 4️⃣ Client Fetch Example */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">🧩 4️⃣ Client Fetch Example</h2>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`"use client";
import { useState } from "react";

export default function AddBlog() {
  const [title, setTitle] = useState("");
  const [blogs, setBlogs] = useState([]);

  const handleAdd = async () => {
    const res = await fetch("/api/blog", {
      method: "POST",
      body: JSON.stringify({ title }),
      headers: { "Content-Type": "application/json" }
    });
    const data = await res.json();
    setBlogs([...blogs, data]);
    setTitle("");
  };

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title" />
      <button onClick={handleAdd}>Add Blog</button>
      <ul>
        {blogs.map((b, i) => <li key={i}>{b.title}</li>)}
      </ul>
    </div>
  );
}`}
          </pre>
          <div className="p-4 bg-purple-500/10 rounded-xl">
            <h4 className="font-black text-purple-500 mb-2 italic underline underline-offset-4">اردو وضاحت:</h4>
            <ul className="text-sm space-y-1 font-bold">
              <li>• fetch("/api/blog") → سرور سے ڈیٹا لاتا ہے</li>
              <li>• POST → نیا ڈیٹا سیو کرتا ہے</li>
              <li>• useState → کلائنٹ اسکرین پر لسٹ اپ ڈیٹ رکھتا ہے</li>
            </ul>
          </div>
        </section>

        {/* 🧠 5️⃣ CRUD کا خلاصہ */}
        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-emerald-500 underline underline-offset-8">🧠 5️⃣ CRUD کا خلاصہ</h2>
          <table className="w-full text-center border-collapse border border-slate-700">
            <thead>
              <tr className="bg-emerald-600 text-white font-bold">
                <th className="p-3 border border-slate-700">Operation</th>
                <th className="p-3 border border-slate-700">Method</th>
                <th className="p-3 border border-slate-700">Example</th>
              </tr>
            </thead>
            <tbody className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">Create</td>
                <td className="p-3 border border-slate-700 text-blue-500 font-bold">POST</td>
                <td className="p-3 border border-slate-700 italic">add blog</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">Read</td>
                <td className="p-3 border border-slate-700 text-emerald-500 font-bold">GET</td>
                <td className="p-3 border border-slate-700 italic">list blogs</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">Update</td>
                <td className="p-3 border border-slate-700 text-orange-500 font-bold">PATCH</td>
                <td className="p-3 border border-slate-700 italic">edit blog</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">Delete</td>
                <td className="p-3 border border-slate-700 text-red-500 font-bold">DELETE</td>
                <td className="p-3 border border-slate-700 italic">remove blog</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* ⚠️ اہم نکات */}
        <section className="mb-16 p-8 bg-red-600/5 border-r-8 border-red-500 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-black mb-6 text-red-500 italic">⚠️ اہم نکات</h2>
          <ul className="space-y-4 text-lg font-bold">
            <li className="flex items-center gap-2">🔹 Server Actions ہمیشہ server-side چلائیں</li>
            <li className="flex items-center gap-2">🔹 API routes میں error handling لازمی ہے</li>
            <li className="flex items-center gap-2">🔹 Environment variables میں Mongo URI رکھیں</li>
            <li className="flex items-center gap-2">🔹 Client-side fetch کے لیے proper headers ضروری ہیں</li>
          </ul>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-8 border-4 border-dashed border-emerald-500/40 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500">🎯 Practice Task</h2>
          <ul className="space-y-4 text-lg font-bold">
            <li>1️⃣ MongoDB setup کریں (free cluster)</li>
            <li>2️⃣ 5 blogs دستی طور پر انسرٹ کریں</li>
            <li>3️⃣ Client page پر GET اور POST کا کوڈ لکھیں</li>
            <li>4️⃣ Invalid request پر ایرر ہینڈلنگ ٹیسٹ کریں</li>
          </ul>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-emerald-50'}`}>
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-emerald-600 italic">📌 خلاصہ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold">
            <p>• <strong>Server Actions</strong> = server functions</p>
            <p>• <strong>API Routes</strong> = endpoints</p>
            <p>• <strong>CRUD</strong> = Create, Read, Update, Delete</p>
            <p>• <strong>Database Integration</strong> = MongoDB + Mongoose</p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 9 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}