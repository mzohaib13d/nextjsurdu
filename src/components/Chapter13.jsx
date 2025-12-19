import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter13() {
  const [theme, setTheme] = useState(() => localStorage.getItem("user-theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400" }) => (
    <div className="relative my-8">
      <div className="flex justify-start mb-1">
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-slate-700 hover:bg-blue-600 text-white text-[10px] px-3 py-1 rounded-md transition-all shadow-md active:scale-90 cursor-pointer"
        >
          Copy Code
        </button>
      </div>
      <pre
        className={`bg-black ${colorClass} p-5 rounded-2xl text-left font-mono overflow-x-auto text-xs md:text-sm border border-slate-800 shadow-2xl`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  return (
    <div dir="rtl" className={`min-h-screen transition-all duration-500 font-sans ${theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"}`}>
      
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-green-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-green-400 text-sm">
          {copySuccess}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button onClick={toggleSidebar} className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current">
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button onClick={toggleTheme} className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* مرحلہ 1: آسان اردو ٹیوٹوریل */}
        <section className="mb-16 border-b border-slate-700 pb-10">
          <h3 className="text-3xl md:text-5xl font-black mb-8 text-sky-400">مرحلہ 1: آسان اردو ٹیوٹوریل (سمجھنے کے لیے)</h3>
          
          <h2 className="text-2xl font-bold mb-4">🕵️‍♂️ Middleware کیا ہے؟ (ایک سادہ مثال)</h2>
          <p className="mb-4">تصور کریں آپ ایک "صرف بڑوں کے لیے" والا کلب یا اسکول کے کسی خاص کمرے میں داخل ہو رہے ہیں۔ دروازے پر ایک چوکیدار کھڑا ہے جو ہر آنے والے کا کارڈ چیک کرتا ہے۔</p>
          <p className="mb-2">اگر کارڈ صحیح ہے → تو وہ آپ کو اندر جانے دیتا ہے۔</p>
          <p className="mb-4">اگر کارڈ نہیں ہے → تو وہ وہیں سے آپ کو واپس (Login Page پر) بھیج دیتا ہے۔</p>
          <p className="mb-4">Next.js میں Middleware وہی چوکیدار ہے۔ یہ آپ کی ویب سائٹ کے پیج لوڈ ہونے سے پہلے چلتا ہے اور فیصلہ کرتا ہے کہ صارف کو وہ پیج دکھانا ہے یا نہیں۔</p>
          
          <h3 className="font-bold mb-2">کیوں استعمال کریں؟</h3>
          <ul className="list-disc pr-6 mb-8 space-y-2">
            <li><strong>Security:</strong> بغیر لاگ ان والے صارفین کو ڈیش بورڈ دیکھنے سے روکنے کے لیے۔</li>
            <li><strong>Redirection:</strong> اگر کوئی غلط راستے پر جائے تو اسے صحیح جگہ بھیجنے کے لیے۔</li>
          </ul>

          <h2 className="text-2xl font-bold mb-4 text-emerald-400">☁️ MongoDB Cluster اور Database (بنیادی باتیں)</h2>
          <p className="mb-4"><strong>Cluster کیا ہے؟</strong> یہ سمجھیں کہ یہ ایک پورا "کمپیوٹر سرور" ہے جو کلاؤڈ پر آپ کا ڈیٹا محفوظ کرتا ہے۔</p>
          <h3 className="font-bold mb-2">ہم نیا کلسٹر (Cluster) کب بناتے ہیں؟</h3>
          <p className="mb-4">عام طور پر ہم صرف ایک بار کلسٹر بناتے ہیں۔ اسی ایک کلسٹر کے اندر ہم سینکڑوں مختلف ڈیٹا بیس (Databases) بنا سکتے ہیں۔ نیا کلسٹر صرف تب بناتے ہیں جب:</p>
          <ul className="list-decimal pr-6 mb-6 space-y-2">
            <li>آپ کا فری کوٹہ (512MB) ختم ہو جائے۔</li>
            <li>آپ ایک بالکل الگ پروجیکٹ بنانا چاہیں جس کا پہلے والے سے کوئی تعلق نہ ہو۔</li>
          </ul>

          <h3 className="font-bold mb-2">فری ڈیٹا بیس بار بار کیسے بنائیں؟</h3>
          <p className="mb-2">جب آپ کنکشن اسٹرنگ (Connection String) استعمال کرتے ہیں:</p>
          <div dir="ltr" className="bg-slate-800 p-3 rounded-lg text-left text-sm font-mono mb-4 text-sky-300 overflow-x-auto">
            mongodb+srv://user:pass@cluster.mongodb.net/MyNewProject?retryWrites=true
          </div>
          <p className="mb-8">تو جہاں MyNewProject لکھا ہے، وہاں صرف نام بدلنے سے منگو ڈی بی خود بخود ایک نیا ڈیٹا بیس بنا دیتا ہے۔ آپ کو نیا کلسٹر بنانے کی ضرورت نہیں پڑتی۔</p>

          <h3 className="font-bold mb-2">اہم سیٹنگز:</h3>
          <ul className="list-disc pr-6 space-y-2">
            <li><strong>0.0.0.0/0 کیا ہے؟</strong> اس کا مطلب ہے "دنیا کا کوئی بھی انٹرنیٹ آئی پی"۔ یہ ایڈریس ڈالنے سے آپ کی ویب سائٹ کہیں سے بھی ڈیٹا بیس سے کنیکٹ ہو سکتی ہے۔</li>
            <li><strong>Database User:</strong> یہ وہ یوزر ہے جو آپ کا کوڈ استعمال کرے گا۔ اسے 'Network Access' ٹیب میں جا کر بنایا جاتا ہے۔</li>
          </ul>
        </section>

        {/* مرحلہ 2: اصلی کوڈ */}
        <section className="mt-12">
          <h2 className="text-3xl md:text-5xl font-black mb-10 text-sky-400 italic">مرحلہ 2: (مکمل کوڈ)</h2>
          
          <h1 className="text-2xl text-sky-400 md:text-4xl font-bold mb-6">📘 سبق 13: Authentication in Next.js (Login / Signup / User Management)</h1>
          <p className="text-lg mb-8">Authentication ویب سائٹ کا سب سے اہم حصہ ہے کیونکہ یہ user data کی security اور personalized experience کو manage کرتا ہے۔</p>

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-sky-400">🧠 1️⃣ Authentication کے بنیادی تصورات</h3>
          <div className="bg-indigo-500/5 p-6 rounded-2xl mb-6">
            <p className="font-bold mb-2 underline">Theory:</p>
            <p>Signup → نئے user کا account بنانا</p>
            <p>Login → existing user authenticate کرنا</p>
            <p>JWT / Session / Cookie → user login state maintain کرنا</p>
            <p className="mb-4">Protected Routes → صرف authenticated users access کر سکتے ہیں</p>
            
            <p className="font-bold mb-2 text-indigo-400 italic">🔹 Authentication Flow:</p>
            <ol className="list-decimal pr-6 space-y-1 text-sm md:text-base">
              <li>User fills signup form</li>
              <li>Password hash ہوتا ہے → DB میں save</li>
              <li>Login form → password check</li>
              <li>Valid → token / session generate</li>
              <li>Protected pages → token verify</li>
              <li>Logout → token remove</li>
            </ol>
          </div>

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-emerald-400">🧩 2️⃣ MongoDB + Mongoose Setup</h3>
          <CodeBlock code={`// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;`} />
          <p className="mb-2">unique: true → duplicate emails / usernames prevent</p>
          <p className="mb-6">Password plain text نہیں ہونا چاہیے → hash کرنا ضروری</p>

          <h4 className="font-bold mb-2 italic">MongoDB Connection</h4>
          <CodeBlock code={`// lib/mongo.js
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("Mongo URI not found");

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null };

export async function connectToDB() {
  if (cached.conn) return cached.conn;
  const conn = await mongoose.connect(MONGO_URI);
  cached.conn = conn;
  return conn;
}`} colorClass="text-emerald-300" />

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-indigo-400 mt-12">🧠 3️⃣ Signup Form + Server Action</h3>
          <h4 className="font-bold mb-2 italic">Signup Page (Client Component)</h4>
          <CodeBlock code={`"use client";
import { useState } from "react";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="text-right" dir="rtl">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="یوزر نیم"
        className="border p-2 rounded w-full mt-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل"
        className="border p-2 rounded w-full mt-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="پاس ورڈ"
        className="border p-2 rounded w-full mt-2"
      />
      <button type="submit" className="bg-green-600 text-white p-2 mt-2 rounded">
        سائن اپ
      </button>
      <p>{status}</p>
    </form>
  );
}`} colorClass="text-indigo-300" />

          <h4 className="font-bold mb-2 italic mt-8">Server API (Signup)</h4>
          <CodeBlock code={`// app/api/auth/signup/route.js
import { connectToDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(request) {
  const { username, email, password } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}`} />
          <p>bcrypt.hash → password encrypt</p>
          <p className="mb-6">Duplicate email check → security</p>

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-sky-400 mt-12">🧩 4️⃣ Login Form + Authentication</h3>
          <h4 className="font-bold mb-2 italic">Login Page (Client Component)</h4>
          <CodeBlock code={`"use client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setStatus(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="text-right" dir="rtl">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ایمیل"
        className="border p-2 rounded w-full mt-2"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="پاس ورڈ"
        className="border p-2 rounded w-full mt-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded">
        لاگ ان
      </button>
      <p>{status}</p>
    </form>
  );
}`} colorClass="text-sky-300" />

          <h4 className="font-bold mb-2 italic mt-8">Login API Route</h4>
          <CodeBlock code={`// app/api/auth/login/route.js
import { connectToDB } from "@/lib/mongo";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    await connectToDB();
    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return new Response(JSON.stringify({ message: "Invalid password" }), { status: 401 });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: "1d" });

    return new Response(JSON.stringify({ message: "Login successful", token }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}`} />

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-red-400 mt-12">🧩 5️⃣ Protected Routes</h3>
          <p>Client-side: Check token in localStorage / cookies</p>
          <p className="mb-4">Server-side: verify JWT before fetching sensitive data</p>
          <CodeBlock code={`import jwt from "jsonwebtoken";

export async function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null;
  }
}`} colorClass="text-red-300" />

          <h3 className="text-xl md:text-2xl font-bold mb-4 text-orange-400 mt-12">⚡ 6️⃣ Logout</h3>
          <CodeBlock code={`const handleLogout = () => {
  localStorage.removeItem("token");
  alert("Logged out successfully");
};`} />
          <p>Clear token → redirect to login</p>

          <section className="my-16 p-6 md:p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-500/5">
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">🎯 Practice Task</h2>
            <div className="space-y-4 font-bold text-sm md:text-lg">
              <p>1️⃣ Signup page بنائیں (username, email, password)</p>
              <p>2️⃣ Login page بنائیں + JWT token generate</p>
              <p>3️⃣ Protected dashboard page → token verify</p>
              <p>4️⃣ Logout functionality add کریں</p>
              <p>5️⃣ RTL design + Urdu placeholders</p>
            </div>
          </section>

          <section className={`p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
            <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 italic">📌 خلاصہ</h2>
            <ul className="space-y-3 text-base md:text-lg">
              <li>• Signup → password hash + DB save</li>
              <li>• Login → password compare + JWT generate</li>
              <li>• Protected routes → token verify</li>
              <li>• Logout → clear token</li>
              <li>• Forms + Server Actions + MongoDB → full authentication system</li>
            </ul>
          </section>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 13 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}