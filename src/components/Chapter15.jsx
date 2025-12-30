import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter15() {
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

  // Dashboard Page Code - Escape کیا ہوا
  const dashboardCode = `// app/dashboard/page.js
'use client'
import { useState, useEffect } from 'react'

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token')
      
      const res = await fetch('/api/protected/user', {
        headers: {
          'Authorization': \`Bearer \${token}\`
        }
      })

      const data = await res.json()
      
      if (res.ok) {
        setUser(data.user)
      } else {
        // Redirect to login if unauthorized
        window.location.href = '/login'
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      window.location.href = '/login'
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">لوڈ ہو رہا ہے...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-sky-600">ڈیش بورڈ</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700"
          >
            لاگ آؤٹ
          </button>
        </div>

        {user ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-sky-600 dark:text-sky-300">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">اکاؤنٹ کی معلومات</h3>
                <p className="text-sm">آپ کا اکاؤنٹ مکمل فعال ہے</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">حفاظت</h3>
                <p className="text-sm">آپ کا اکاؤنٹ محفوظ ہے</p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">ترتیبات</h3>
                <p className="text-sm">اکاؤنٹ ترتیبات تبدیل کریں</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-red-600">کاربر کی معلومات نہیں مل سکیں</p>
            <button
              onClick={() => window.location.href = '/login'}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              لاگ ان پر جائیں
            </button>
          </div>
        )}
      </div>
    </div>
  )
}`;

  // Login Page Code - Escape کیا ہوا
  const loginCode = `// app/login/page.js
'use client'
import { useState } from 'react'

export default function LoginPage() {
  const [form, setForm] = useState({ 
    email: '', 
    password: '' 
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      
      if (res.ok) {
        setMessage('✅ کامیابی! لاگ ان ہو گیا۔')
        // Token save کریں (localStorage میں)
        if (data.token) {
          localStorage.setItem('token', data.token)
        }
        setForm({ email: '', password: '' })
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } else {
        setMessage('❌ ' + data.message)
      }
    } catch (error) {
      setMessage('❌ نیٹ ورک ایرر')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">لاگ ان</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">ای میل</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">پاس ورڈ</label>
          <input
            type="password"
            placeholder="اپنا پاس ورڈ درج کریں"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'جاری ہے...' : 'لاگ ان'}
        </button>
      </form>

      {message && (
        <div className={\`mt-4 p-3 rounded-lg text-center \${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
          {message}
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        نیا صارف ہیں؟{' '}
        <a href="/signup" className="text-blue-600 font-bold hover:underline">
          سائن اپ کریں
        </a>
      </p>
    </div>
  )
}`;

  // Signup Form Code - Escape کیا ہوا
  const signupCode = `// app/signup/page.js
'use client'
import { useState } from 'react'

export default function SignupPage() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '' 
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      
      if (res.ok) {
        setMessage('✅ کامیابی! اکاؤنٹ بن گیا ہے۔')
        setForm({ name: '', email: '', password: '' })
      } else {
        setMessage('❌ ' + data.message)
      }
    } catch (error) {
      setMessage('❌ نیٹ ورک ایرر')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6" dir="rtl">
      <h1 className="text-2xl font-bold mb-6 text-center">سائن اپ</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">نام</label>
          <input
            type="text"
            placeholder="اپنا نام درج کریں"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">ای میل</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">پاس ورڈ</label>
          <input
            type="password"
            placeholder="کم از کم 6 حروف"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full p-3 border rounded-lg"
            required
            minLength="6"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'جاری ہے...' : 'سائن اپ'}
        </button>
      </form>

      {message && (
        <div className={\`mt-4 p-3 rounded-lg text-center \${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}\`}>
          {message}
        </div>
      )}

      <p className="mt-6 text-center text-sm">
        پہلے سے اکاؤنٹ ہے؟{' '}
        <a href="/login" className="text-blue-600 font-bold hover:underline">
          لاگ ان کریں
        </a>
      </p>
    </div>
  )
}`;

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

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* باب کا عنوان */}
        <h1 className="text-3xl md:text-5xl font-black mb-10 text-center text-sky-400 border-b-4 border-sky-500 pb-6">
          باب 15: MongoDB + Authentication (مکمل گائیڈ)
        </h1>

        {/* مقدمہ */}
        <section className="mb-16 border-b border-slate-700 pb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-emerald-400">🎯 باب کا مقصد</h2>
          <p className="text-lg mb-6">
            اس باب میں ہم MongoDB، Middleware، JWT اور Authentication کا مکمل سسٹم سیکھیں گے۔ ہم آسان سے پیچیدہ کی طرف جائیں گے تاکہ ہر مرحلہ واضح ہو۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-sky-500/30`}>
              <h3 className="text-xl font-bold mb-3 text-sky-400">🔹 MongoDB</h3>
              <p className="text-sm">Database کا تعارف، Atlas سٹاپ اور Connection</p>
            </div>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-emerald-500/30`}>
              <h3 className="text-xl font-bold mb-3 text-emerald-400">🔹 Middleware</h3>
              <p className="text-sm">حفاظتی چوکیدار، صفحات کو محفوظ بنانا</p>
            </div>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-indigo-500/30`}>
              <h3 className="text-xl font-bold mb-3 text-indigo-400">🔹 JWT + Auth</h3>
              <p className="text-sm">Login/Signup، Token Management</p>
            </div>
          </div>
        </section>

        {/* حصہ 1: MongoDB کا مکمل تعارف */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            🔹 MongoDB کا مکمل تعارف (Beginner Friendly)
          </h2>
          
          <h3 className="text-xl font-bold mb-4 text-emerald-400">📌 MongoDB کیا ہے؟</h3>
          <div className="bg-slate-800/50 p-6 rounded-2xl mb-6">
            <p className="mb-4"><strong>MongoDB ایک NoSQL Database ہے۔</strong> سادہ الفاظ میں:</p>
            <ul className="list-disc pr-6 space-y-2 mb-4">
              <li>یہ وہ جگہ ہے جہاں آپ کی ویب سائٹ کا data محفوظ ہوتا ہے</li>
              <li>Examples: Users (name, email, password), Products, Blog posts</li>
              <li>📦 MongoDB data کو JSON جیسے objects میں رکھتا ہے جنہیں Document کہتے ہیں</li>
            </ul>
            
            <h4 className="font-bold mb-2 text-sky-300">Document Example:</h4>
            <CodeBlock code={`{
  "_id": "67a1b2c3d4e5f6g7h8i9j0",
  "name": "علی رضا",
  "email": "ali@example.com",
  "password": "hashed_password",
  "createdAt": "2025-01-15T10:30:00Z"
}`} colorClass="text-amber-300" />
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">☁️ MongoDB Atlas کیا ہے؟</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-blue-50/50'}`}>
            <p className="mb-4"><strong>MongoDB Atlas = MongoDB کی online (cloud) service</strong></p>
            <p className="mb-2">یعنی Database آپ کے computer پر نہیں، Internet (cloud) پر ہوتا ہے</p>
            
            <h4 className="font-bold mb-2 text-sky-300">Atlas کے فائدے:</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li>Free tier (مفت میں استعمال کریں)</li>
              <li>Secure (محفوظ)</li>
              <li>Vercel کے ساتھ easy connection</li>
              <li>Automatic backups</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">🚀 Step-by-Step Setup</h3>
          <div className="space-y-6">
            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Step 1: MongoDB Atlas Account</h4>
              <ol className="list-decimal pr-6 space-y-2">
                <li>Browser کھولیں</li>
                <li><a href="https://www.mongodb.com/atlas" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.mongodb.com/atlas</a></li>
                <li>Sign Up کریں (Google allowed)</li>
              </ol>
            </div>

            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Step 2: Cluster بنانا (Very Important)</h4>
              <p className="mb-2"><strong>❓ Cluster کیا ہوتا ہے؟</strong></p>
              <p className="mb-3">Cluster = ایک server جس پر آپ کا database چلتا ہے</p>
              
              <h5 className="font-bold mb-2 text-emerald-300">✔️ Steps:</h5>
              <ol className="list-decimal pr-6 space-y-1">
                <li>Create → Shared (Free)</li>
                <li>Provider: AWS</li>
                <li>Region: nearest</li>
                <li>Cluster Name: myCluster</li>
                <li>Create Cluster</li>
                <li>⏳ 2–3 منٹ انتظار کریں</li>
              </ol>
            </div>

            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Step 3: Database User بنانا</h4>
              <p className="mb-2"><strong>❓ User کیوں ضروری ہے؟</strong></p>
              <p className="mb-3">User = database کی چابی 🔑</p>
              
              <h5 className="font-bold mb-2 text-emerald-300">✔️ Steps:</h5>
              <ol className="list-decimal pr-6 space-y-1">
                <li>Database Access → Add User</li>
                <li>Username + Password</li>
                <li>Role: Read and Write</li>
                <li>Save</li>
              </ol>
            </div>

            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Step 4: Network Access (0.0.0.0/0)</h4>
              <p className="mb-2"><strong>❓ یہ کیوں ضروری ہے؟</strong></p>
              <p className="mb-3">MongoDB صرف allowed IPs کو access دیتا ہے۔</p>
              
              <p className="mb-2"><strong>🔸 0.0.0.0/0 کا مطلب؟</strong></p>
              <p className="mb-3">دنیا کے کسی بھی IP سے access allow</p>
              
              <h5 className="font-bold mb-2 text-emerald-300">✔️ Steps:</h5>
              <p>Network Access → Allow Access from Anywhere</p>
              <p className="text-sm mt-2 text-amber-400">⚠️ Production میں specific IP بہتر ہے</p>
            </div>

            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Step 5: Database & Collection</h4>
              <ol className="list-decimal pr-6 space-y-1">
                <li>Browse Collections</li>
                <li>Database: nextjsDB (نام تبدیل کر سکتے ہیں)</li>
                <li>Collection: users (نام تبدیل کر سکتے ہیں)</li>
              </ol>
              <div className="mt-3">
                <p className="mb-1">📌 Database = folder</p>
                <p className="mb-1">📌 Collection = file</p>
                <p>📌 Document = object</p>
              </div>
            </div>

            <div className={`p-5 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-300'}`}>
              <h4 className="font-bold mb-2 text-sky-300">🔹 Connection String</h4>
              <p>Connect → Connect Application → Node.js</p>
              <CodeBlock code={`mongodb+srv://username:password@cluster.mongodb.net/nextjsDB?retryWrites=true&w=majority`} colorClass="text-green-300" />
              <p className="mt-2 text-sm text-amber-400">⚠️ username, password, cluster اور database نام اپنے مطابق تبدیل کریں</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400 mt-8">🛠️ Mongoose کیا ہے؟ (Very Important)</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-emerald-50/50'}`}>
            <p className="mb-4"><strong>Mongoose = MongoDB اور Node.js کے درمیان helper</strong></p>
            <p className="mb-2">یہ:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>Schema بناتا ہے (Data structure define کرتا ہے)</li>
              <li>Data validate کرتا ہے</li>
              <li>CRUD operations آسان بناتا ہے</li>
              <li>Relationships manage کرتا ہے</li>
            </ul>
            <p className="mt-4">🧠 MongoDB raw ہے، Mongoose اسے developer-friendly بناتا ہے</p>
          </div>

          <h4 className="font-bold mb-2 text-sky-300">Mongoose Install</h4>
          <CodeBlock code={`npm install mongoose`} colorClass="text-amber-300" />

          <h4 className="font-bold mb-2 text-sky-300 mt-6">MongoDB Connection (Next.js)</h4>
          <CodeBlock code={`// lib/mongodb.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (mongoose.connections[0].readyState) return;
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}`} colorClass="text-blue-300" />

          <h4 className="font-bold mb-2 text-sky-300 mt-6">User Model (Schema)</h4>
          <CodeBlock code={`// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [50, "Name cannot be more than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    match: [
      /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/,
      "Please provide a valid email"
    ]
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.User || mongoose.model("User", UserSchema);`} colorClass="text-emerald-300" />

          <h4 className="font-bold mb-2 text-sky-300 mt-6">MongoDB CRUD (Short & Practical)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-green-50'} border border-green-500/30`}>
              <h5 className="font-bold mb-2 text-green-400">CREATE (Signup)</h5>
              <CodeBlock code={`await User.create({ name, email, password });`} colorClass="text-green-300" />
            </div>
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500/30`}>
              <h5 className="font-bold mb-2 text-blue-400">READ (Get User)</h5>
              <CodeBlock code={`await User.findOne({ email });`} colorClass="text-blue-300" />
            </div>
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-yellow-50'} border border-yellow-500/30`}>
              <h5 className="font-bold mb-2 text-yellow-400">UPDATE</h5>
              <CodeBlock code={`await User.findByIdAndUpdate(id, data);`} colorClass="text-yellow-300" />
            </div>
            <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-red-50'} border border-red-500/30`}>
              <h5 className="font-bold mb-2 text-red-400">DELETE</h5>
              <CodeBlock code={`await User.findByIdAndDelete(id);`} colorClass="text-red-300" />
            </div>
          </div>

          <h4 className="font-bold mb-2 text-sky-300 mt-6">JWT + MongoDB (Simple Flow)</h4>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-indigo-50/50'}`}>
            <ol className="list-decimal pr-6 space-y-2">
              <li>Signup → MongoDB میں user save</li>
              <li>Login → JWT Token generate</li>
              <li>Request → Middleware → API → MongoDB</li>
              <li>JWT = user کی identity card</li>
            </ol>
          </div>

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-purple-50'} border-2 border-purple-500`}>
            <h4 className="text-xl font-bold mb-4 text-purple-400">🧠 Easy Revision (آسان یادداشت)</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="font-bold text-sky-400">Cluster</p>
                <p className="text-sm">= server</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-emerald-400">Database</p>
                <p className="text-sm">= folder</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-amber-400">Collection</p>
                <p className="text-sm">= file</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-red-400">Document</p>
                <p className="text-sm">= object</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-indigo-400">MongoDB</p>
                <p className="text-sm">= storage</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-pink-400">Mongoose</p>
                <p className="text-sm">= helper</p>
              </div>
            </div>
          </div>
        </section>

        {/* حصہ 2: Middleware Only (No JWT, No DB) */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
            🧩 Chapter 15A: Middleware Only (No JWT, No DB)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-indigo-50/50'}`}>
            <p className="mb-4 text-lg">
              <strong>یہ حصہ سب سے اہم foundation ہے۔</strong> یہاں ہم نہ JWT استعمال کریں گے، نہ Database۔ 
              صرف یہ سمجھیں گے کہ Middleware کیا ہے اور کیوں استعمال ہوتا ہے — بالکل آسان الفاظ میں۔
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-indigo-400">🛡️ Middleware کیا ہے؟ (Simple Words)</h3>
          <div className="mb-6">
            <p className="mb-4">Middleware کو ایسے سمجھیں جیسے:</p>
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <p className="text-center text-lg font-bold mb-4">🧍‍♂️ ایک چوکیدار جو gate پر کھڑا ہے</p>
              <p className="mb-2">جب بھی کوئی user کسی page پر جاتا ہے:</p>
              <p className="text-center font-bold text-sky-400 mb-4">User → Middleware → Page</p>
              <p className="mb-2">Middleware فیصلہ کرتا ہے:</p>
              <ul className="list-disc pr-6 space-y-2">
                <li>آگے جانے دینا ہے؟</li>
                <li>روکنا ہے؟</li>
                <li>کسی اور page پر بھیجنا ہے؟</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-indigo-400">🤔 Middleware کیوں ضروری ہے؟</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <p className="mb-4">کیونکہ ہم چاہتے ہیں:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>کچھ pages سب کے لیے ہوں (Home, About)</li>
              <li>کچھ pages صرف خاص users کے لیے ہوں (Dashboard)</li>
            </ul>
            <p className="mt-4 text-red-400">👉 Middleware کے بغیر ہر کوئی ہر page access کر سکتا ہے ❌</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-indigo-400">📁 Middleware فائل کہاں بنتی ہے؟</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <p className="mb-2">Next.js (App Router) میں:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>Project کے root folder میں</li>
              <li>یا اگر src ہے تو src/middleware.js</li>
            </ul>
            <p className="mt-4 text-amber-400">⚠️ فائل کا نام لازمی middleware.js ہونا چاہیے</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-indigo-400">🧱 Middleware کا Basic Structure</h3>
          <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Request کو handle کریں
  return NextResponse.next()
}

// Middleware کو specific pages پر apply کرنا
export const config = {
  matcher: [
    // Specific pages
    '/dashboard/:path*',
    '/profile/:path*',
    // یا تمام pages (حذراً)
    // '/(.*)'
  ],
}`} colorClass="text-indigo-300" />

          <p className="mb-6">📌 اس code کا مطلب: "ہر request کو آگے جانے دو"</p>

          <h3 className="text-xl font-bold mb-4 text-indigo-400">🎯 Middleware کو Specific Pages تک محدود کرنا</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <p className="mb-4">ہم نہیں چاہتے کہ middleware ہر image اور CSS پر چلے۔ اس لیے ہم matcher use کرتے ہیں:</p>
            <CodeBlock code={`export const config = {
  matcher: ['/dashboard/:path*'],
}`} colorClass="text-blue-300" />
            <p className="mt-4">📌 اب middleware صرف dashboard پر چلے گا</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-red-400">🚫 Example 1: Dashboard کو Block کرنا</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-red-50/50'}`}>
            <p className="mb-4"><strong>Scenario:</strong> فرض کریں User /dashboard پر جا رہا ہے، ہم چاہتے ہیں کہ وہ login page پر چلا جائے</p>
            <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // ہمیشہ login page پر redirect
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/dashboard/:path*'],
}`} colorClass="text-red-300" />
            <p className="mt-4">📌 Result: User dashboard پر جائے گا، فوراً login page پر redirect ہو جائے گا</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">✅ Example 2: Simple Condition (Fake Login)</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-emerald-50/50'}`}>
            <p className="mb-4">اب ایک fake condition لگاتے ہیں:</p>
            <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // فرضی حالت (بعد میں real condition لگائیں گے)
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}`} colorClass="text-emerald-300" />
            <p className="mt-4">📌 ابھی یہ fake ہے، لیکن concept clear ہو گیا:</p>
            <ul className="list-disc pr-6 space-y-2 mt-2">
              <li>condition false → redirect</li>
              <li>true → allow</li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border-2 border-blue-500`}>
            <h4 className="text-xl font-bold mb-4 text-blue-400">🧠 Mental Model (یاد رکھنے کا طریقہ)</h4>
            <div className="text-center">
              <p className="font-bold mb-2">Request</p>
              <p className="text-2xl">↓</p>
              <p className="font-bold mb-2 text-sky-400">Middleware (چوکیدار)</p>
              <p className="text-2xl">↓</p>
              <div className="flex justify-center space-x-8 mt-2">
                <span className="font-bold text-green-400">Allow</span>
                <span className="font-bold text-yellow-400">Redirect</span>
                <span className="font-bold text-red-400">Block</span>
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-amber-900/30' : 'bg-amber-50'} border border-amber-500`}>
            <h4 className="text-xl font-bold mb-4 text-amber-400">⚠️ Middleware میں کیا نہیں کر سکتے؟</h4>
            <p className="mb-4">Middleware Edge Runtime پر چلتا ہے، اس لیے:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>❌ fs, path (file system access)</li>
              <li>❌ heavy Node libraries</li>
              <li>❌ direct database access</li>
            </ul>
            <p className="mt-4 text-emerald-400">👉 Middleware کا کام صرف decision لینا ہے (چوکیدار کا کام)</p>
          </div>

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'} border-2 border-green-500`}>
            <h4 className="text-xl font-bold mb-4 text-green-400">✅ Chapter 15A کا Result</h4>
            <p className="mb-4">اس chapter کے بعد learner:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>Middleware کیا ہے سمجھ چکا ہے</li>
              <li>File کہاں بنتی ہے جانتا ہے</li>
              <li>Redirect / Block logic سمجھتا ہے</li>
              <li>Matcher کا استعمال جانتا ہے</li>
            </ul>
            <p className="mt-4 text-center text-lg font-bold text-blue-400">🎯 اب learner Chapter 15B (Signup/Login) کے لیے ready ہے</p>
          </div>
        </section>

        {/* حصہ 3: Signup / Login (Without Middleware) */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            🧩 Chapter 15B: Signup / Login (Without Middleware)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-sky-50/50'}`}>
            <p className="mb-4 text-lg">
              <strong>Goal:</strong> اس حصے میں ہم صرف frontend + basic API بنائیں گے، تاکہ beginner کو authentication کا flow سمجھ آ جائے — بغیر security کے دباؤ کے۔
            </p>
            <ul className="list-disc pr-6 space-y-2">
              <li>✅ User signup form</li>
              <li>✅ User login form</li>
              <li>✅ API سے data بھیجنا</li>
              <li>✅ Response handle کرنا</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mb-4 text-sky-400">🖥️ Simple Frontend Forms (React / Next.js)</h3>
          
          <h4 className="font-bold mb-2 text-emerald-400">Signup Form</h4>
          <CodeBlock code={signupCode} colorClass="text-sky-300" />

          <h4 className="font-bold mb-2 text-emerald-400 mt-8">Login Form</h4>
          <CodeBlock code={loginCode} colorClass="text-emerald-300" />

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500`}>
            <p className="mb-4">👉 یہاں صرف یہ سمجھنا مقصد ہے کہ form → API → response کیسے کام کرتا ہے۔</p>
            <p>اب ہم backend APIs بنائیں گے...</p>
          </div>
        </section>

        {/* حصہ 4: JWT + Middleware + MongoDB (Gradual) */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
            🧩 Chapter 15C: JWT + Middleware + MongoDB (Gradual)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-purple-50/50'}`}>
            <p className="mb-4 text-lg">
              <strong>Approach:</strong> اب ہم آہستہ آہستہ database اور security add کریں گے — ایک ساتھ سب کچھ نہیں۔
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400">🗃️ Step 1: MongoDB کا سادہ تعارف</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <ul className="list-disc pr-6 space-y-2 mb-4">
              <li>MongoDB ایک NoSQL database ہے</li>
              <li>Data JSON جیسے documents میں store ہوتا ہے</li>
              <li>Tables نہیں، بلکہ Collections ہوتی ہیں</li>
            </ul>
            
            <h4 className="font-bold mb-2 text-sky-300">Example Document:</h4>
            <CodeBlock code={`{
  "_id": "67a1b2c3d4e5f6g7h8i9j0",
  "name": "علی",
  "email": "ali@gmail.com",
  "password": "$2a$10$xyz...", // Hashed password
  "createdAt": "2025-01-15T10:30:00Z"
}`} colorClass="text-amber-300" />
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400">🔗 Step 2: MongoDB Connect (Simple)</h3>
          <CodeBlock code={`// lib/mongodb.js
import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (mongoose.connections[0].readyState) return
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose
    })
  }
  
  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB`} colorClass="text-purple-300" />
          <p className="mt-2">👉 یہ فنکشن صرف database سے connection بناتا ہے — اور کچھ نہیں۔</p>

          <h3 className="text-xl font-bold mb-4 text-purple-400 mt-8">🔐 Step 3: JWT + Middleware (Combine Concept)</h3>
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <p className="mb-4">اب middleware کو یہ کام دیا جاتا ہے:</p>
            <ol className="list-decimal pr-6 space-y-2">
              <li>Token چیک کرو</li>
              <li>صحیح ہے → آگے جانے دو</li>
              <li>غلط ہے → روک دو</li>
            </ol>
          </div>

          <h4 className="font-bold mb-2 text-emerald-400">Real Middleware with JWT</h4>
          <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/jwt'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value || 
                request.headers.get('authorization')?.split(' ')[1]

  // Public routes (ہر کسی کے لیے)
  const publicPaths = ['/login', '/signup', '/', '/about']
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Protected routes (صرف logged in users کے لیے)
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    // Verify JWT token
    const decoded = await verifyToken(token)
    
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Token valid ہے، request میں user data add کریں
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user-id', decoded.id)
    
    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
    
    return response
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/api/protected/:path*'
  ],
}`} colorClass="text-emerald-300" />

          <h4 className="font-bold mb-2 text-emerald-400 mt-8">JWT Helper Functions</h4>
          <CodeBlock code={`// lib/jwt.js
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// Token generate کرنا
export function generateToken(payload, expiresIn = '7d') {
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

// Token verify کرنا
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

// Token سے user ID نکالنا
export function getUserIdFromToken(token) {
  const decoded = verifyToken(token)
  return decoded?.id
}`} colorClass="text-blue-300" />

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'} border-2 border-indigo-500`}>
            <h4 className="text-xl font-bold mb-4 text-indigo-400">🧠 Visual Mental Model (Diagram)</h4>
            <div className="text-center space-y-2">
              <p className="font-bold">[ Browser / User ]</p>
              <p className="text-2xl">↓</p>
              <p className="font-bold">[ Request (with token) ]</p>
              <p className="text-2xl">↓</p>
              <p className="font-bold text-sky-400">[ Middleware (چوکیدار) ]</p>
              <div className="flex justify-center space-x-8 mt-2">
                <div>
                  <p className="font-bold text-green-400">valid</p>
                  <p className="text-2xl">↓</p>
                  <p className="font-bold">[ API ]</p>
                  <p className="text-2xl">↓</p>
                  <p className="font-bold">[ MongoDB ]</p>
                </div>
                <div>
                  <p className="font-bold text-red-400">invalid</p>
                  <p className="text-2xl">↓</p>
                  <p className="font-bold">[ Redirect / Block ]</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400 mt-8">🚀 Complete Authentication System</h3>
          
          <h4 className="font-bold mb-2 text-emerald-400">Signup API Route</h4>
          <CodeBlock code={`// app/api/auth/signup/route.js
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'

export async function POST(request) {
  try {
    await connectDB()
    
    const { name, email, password } = await request.json()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json(
        { message: 'ای میل پہلے سے استعمال ہو رہی ہے' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    })

    // Generate JWT token
    const token = generateToken({ id: user._id })

    // Return success response
    return Response.json(
      { 
        message: 'اکاؤنٹ کامیابی سے بن گیا', 
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Signup error:', error)
    return Response.json(
      { message: 'سرور ایرر' },
      { status: 500 }
    )
  }
}`} colorClass="text-green-300" />

          <h4 className="font-bold mb-2 text-emerald-400 mt-8">Login API Route</h4>
          <CodeBlock code={`// app/api/auth/login/route.js
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { generateToken } from '@/lib/jwt'

export async function POST(request) {
  try {
    await connectDB()
    
    const { email, password } = await request.json()

    // Find user
    const user = await User.findOne({ email })
    if (!user) {
      return Response.json(
        { message: 'ای میل یا پاس ورڈ غلط ہے' },
        { status: 401 }
      )
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json(
        { message: 'ای میل یا پاس ورڈ غلط ہے' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = generateToken({ id: user._id })

    // Return success response
    return Response.json(
      { 
        message: 'لاگ ان کامیاب', 
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Login error:', error)
    return Response.json(
      { message: 'سرور ایرر' },
      { status: 500 }
    )
  }
}`} colorClass="text-blue-300" />

          <h4 className="font-bold mb-2 text-emerald-400 mt-8">Protected API Route</h4>
          <CodeBlock code={`// app/api/protected/user/route.js
import { NextResponse } from 'next/server'
import { verifyToken } from '@/lib/jwt'
import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request) {
  try {
    // Get token from headers
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

    // Connect to DB and get user data
    await connectDB()
    const user = await User.findById(decoded.id).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Protected data accessed successfully',
        user 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Protected route error:', error)
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    )
  }
}`} colorClass="text-purple-300" />

          <h4 className="font-bold mb-2 text-emerald-400 mt-8">Dashboard Page (Protected)</h4>
          <CodeBlock code={dashboardCode} colorClass="text-amber-300" />

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-50'} border-2 border-green-500`}>
            <h4 className="text-xl font-bold mb-4 text-green-400">✅ Learner Outcome</h4>
            <p className="mb-4">اب learner یہ تین چیزیں واضح طور پر سمجھ چکا ہے:</p>
            <ol className="list-decimal pr-6 space-y-2">
              <li><strong>Form سے data کیسے جاتا ہے</strong> (Frontend → API → MongoDB)</li>
              <li><strong>Middleware کیوں ضروری ہے</strong> (Security, Access Control)</li>
              <li><strong>JWT + DB کیسے مل کر security بناتے ہیں</strong> (Token-based Authentication)</li>
            </ol>
          </div>

          <div className={`p-6 rounded-2xl mt-8 ${theme === 'dark' ? 'bg-slate-800' : 'bg-red-50'} border border-red-500`}>
            <h4 className="text-xl font-bold mb-4 text-red-400">📝 Important Notes</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>.env.local</strong> میں اپنا MONGODB_URI اور JWT_SECRET ضرور شامل کریں</li>
              <li>Password ہمیشہ hash کریں (bcrypt استعمال کریں)</li>
              <li>Production میں HTTPS ضرور استعمال کریں</li>
              <li>Tokens کو secure طریقے سے store کریں (httpOnly cookies)</li>
              <li>Error handling ہر جگہ شامل کریں</li>
            </ul>
          </div>
        </section>

        {/* Practice Task */}
        <section className="my-16 p-6 md:p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">🎯 Practice Task (مشق کے لیے)</h2>
          <div className="space-y-4 font-bold text-sm md:text-lg">
            <p>1️⃣ MongoDB Atlas پر free cluster بنائیں</p>
            <p>2️⃣ Connection string حاصل کریں اور .env.local میں ڈالیں</p>
            <p>3️⃣ Signup page بنائیں (نام، ای میل، پاس ورڈ)</p>
            <p>4️⃣ Login page بنائیں + JWT token generate کریں</p>
            <p>5️⃣ Middleware بنائیں جو dashboard کو protect کرے</p>
            <p>6️⃣ Dashboard page بنائیں جہاں user کی معلومات دکھائیں</p>
            <p>7️⃣ Logout functionality شامل کریں</p>
            <p>8️⃣ RTL design + Urdu text کے ساتھ مکمل کریں</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 italic">📌 خلاصہ (Chapter 15)</h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li>• <strong>MongoDB</strong> → NoSQL database, Atlas for cloud hosting</li>
            <li>• <strong>Cluster</strong> → server, Database → folder, Collection → file, Document → object</li>
            <li>• <strong>Mongoose</strong> → MongoDB helper, schema validation</li>
            <li>• <strong>Middleware</strong> → security guard, access control</li>
            <li>• <strong>JWT</strong> → token-based authentication, stateless</li>
            <li>• <strong>Signup</strong> → password hash + DB save</li>
            <li>• <strong>Login</strong> → password compare + JWT generate</li>
            <li>• <strong>Protected routes</strong> → middleware + token verify</li>
            <li>• <strong>Full System</strong> → Frontend + API + Middleware + MongoDB + JWT</li>
          </ul>
        </section>

        {/* Next Steps */}
        <section className={`p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-emerald-50'}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 italic">🚀 اگلا مرحلہ</h2>
          <p className="mb-4 text-lg">اب آپ authentication system بنا سکتے ہیں۔ اگلے اسباق میں:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Password reset functionality</li>
            <li>Email verification</li>
            <li>Social login (Google, Facebook)</li>
            <li>Role-based access control (Admin, User)</li>
            <li>Two-factor authentication</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 15: MongoDB + Authentication مکمل</p>
          <p className="text-sm mt-2">❤️ اس structure کے بعد student confidently full auth system کی طرف جا سکتا ہے</p>
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