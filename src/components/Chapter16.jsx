import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter16() {
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

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* باب کا عنوان */}
        <h1 className="text-3xl md:text-5xl font-black mb-10 text-center text-sky-400 border-b-4 border-sky-500 pb-6">
          🔐 باب 16: Authentication + MongoDB + Mongoose (مکمل Professional System)
        </h1>

        {/* Introduction */}
        <section className="mb-16 border-b border-slate-700 pb-10">
          <div className={`p-8 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-emerald-400">🎯 Professional Authentication System</h2>
            <p className="text-lg mb-6">
              یہ چیپٹر real-world professional authentication system سکھاتا ہے — بالکل شروع سے، ایسے جیسے پہلی بار سیکھ رہے ہوں 😊
            </p>
            <p className="mb-6 text-lg">
              ہم ایک User Management System بنائیں گے جو industry standard ہے۔
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg border border-sky-300`}>
                <h3 className="text-xl font-bold mb-4 text-sky-400">🎯 Chapter Objectives</h3>
                <ul className="list-disc pr-6 space-y-2">
                  <li>MongoDB CRUD (Create, Read, Update, Delete)</li>
                  <li>Signup / Login system</li>
                  <li>Password hashing (bcrypt)</li>
                  <li>JWT (JSON Web Token)</li>
                  <li>Middleware (Auth Guard)</li>
                  <li>Protected API Routes</li>
                </ul>
              </div>
              
              <div className={`p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'} shadow-lg border border-emerald-300`}>
                <h3 className="text-xl font-bold mb-4 text-emerald-400">📦 MongoDB Data Structure</h3>
                <CodeBlock code={`{
  _id: ObjectId("67a1b2c3d4e5f6g7h8i9j0"),
  name: "علی",
  email: "ali@gmail.com",
  password: "$2a$10$hashedPassword123",
  role: "user", // user | admin
  createdAt: "2025-01-15T10:30:00Z"
}`} colorClass="text-amber-300" />
              </div>
            </div>
          </div>

          <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}>
            <h3 className="text-xl font-bold mb-4 text-purple-400">📌 یہ example کیوں best ہے؟</h3>
            <ul className="list-disc pr-6 space-y-2">
              <li>ہر app میں users ہوتے ہیں</li>
              <li>Login / Signup naturally fit</li>
              <li>JWT + Middleware easily apply</li>
              <li>CRUD operations واضح ہیں</li>
              <li>Production ready structure</li>
            </ul>
          </div>
        </section>

        {/* Project Structure */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
            📁 Project Structure (پروفیشنل تنظیم)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <CodeBlock code={`app/
 ├─ api/
 │   ├─ auth/
 │   │   ├─ signup/route.js
 │   │   ├─ login/route.js
 │   ├─ users/
 │   │   ├─ profile/route.js
 │   │   ├─ update/route.js
 │   │   ├─ delete/route.js
 ├─ middleware.js
lib/
 ├─ mongodb.js
 ├─ auth.js
models/
 ├─ User.js`} colorClass="text-blue-300" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-green-50'} border border-green-500/30`}>
              <h4 className="font-bold mb-3 text-green-400">📁 app/</h4>
              <p className="text-sm">API routes اور pages</p>
            </div>
            <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500/30`}>
              <h4 className="font-bold mb-3 text-blue-400">📁 lib/</h4>
              <p className="text-sm">Utility functions</p>
            </div>
            <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-purple-50'} border border-purple-500/30`}>
              <h4 className="font-bold mb-3 text-purple-400">📁 models/</h4>
              <p className="text-sm">Database schemas</p>
            </div>
          </div>
        </section>

        {/* Part 1: User Model */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            🔹 Part 1: User Model (Mongoose Schema)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-sky-50/50'}`}>
            <p className="mb-4">
              <strong>👉 یہ database کو بتاتا ہے کہ User کیسا ہوگا</strong>
            </p>
            <p className="mb-4">Schema = Data کا structure define کرنا</p>
          </div>

          <CodeBlock code={`// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
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
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
UserSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);`} colorClass="text-emerald-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-amber-50'} border border-amber-500`}>
            <h4 className="text-xl font-bold mb-4 text-amber-400">📝 Schema Fields کی وضاحت</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-bold text-sky-400">name</p>
                <p className="text-sm">User کا نام، required field</p>
              </div>
              <div>
                <p className="font-bold text-emerald-400">email</p>
                <p className="text-sm">Unique email، validation کے ساتھ</p>
              </div>
              <div>
                <p className="font-bold text-red-400">password</p>
                <p className="text-sm">Hashed password، minimum length</p>
              </div>
              <div>
                <p className="font-bold text-purple-400">role</p>
                <p className="text-sm">User کی permission level</p>
              </div>
            </div>
          </div>
        </section>

        {/* Part 2: Signup API */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
            🔹 Part 2: Signup API (CREATE)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-green-50/50'}`}>
            <h3 className="text-xl font-bold mb-4 text-green-400">📈 Signup Flow:</h3>
            <div className="text-center">
              <p className="font-bold text-lg">Form → API → Hash Password → MongoDB</p>
              <div className="flex justify-center items-center mt-4 space-x-2">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">Form</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg">API</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">Hash</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-green-600 text-white rounded-lg">MongoDB</span>
              </div>
            </div>
            <p className="mt-6 text-center text-amber-400">📌 CRUD: CREATE operation</p>
          </div>

          <CodeBlock code={`// app/api/auth/signup/route.js
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    // Input validation
    if (!name || !email || !password) {
      return Response.json(
        { message: "تمام فیلڈز ضروری ہیں" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { message: "یہ ای میل پہلے سے استعمال ہو رہی ہے" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return success response
    return Response.json(
      { 
        message: "کامیابی! آپ کا اکاؤنٹ بن گیا ہے",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Signup error:", error);
    return Response.json(
      { message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`} colorClass="text-green-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500`}>
            <h4 className="text-xl font-bold mb-4 text-blue-400">🔐 Security Features</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>Input Validation:</strong> تمام required fields چیک کیے جاتے ہیں</li>
              <li><strong>Duplicate Check:</strong> ایک ای میل صرف ایک بار استعمال ہو سکتی ہے</li>
              <li><strong>Password Hashing:</strong> bcrypt سے password secure ہوتا ہے</li>
              <li><strong>Error Handling:</strong> تمام possible errors handle کیے گئے ہیں</li>
              <li><strong>Clean Response:</strong> User data میں password نہیں بھیجتے</li>
            </ul>
          </div>
        </section>

        {/* Part 3: Login API + JWT */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
            🔹 Part 3: Login API + JWT
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-indigo-50/50'}`}>
            <h3 className="text-xl font-bold mb-4 text-indigo-400">📈 Login Flow:</h3>
            <div className="text-center">
              <p className="font-bold text-lg">Email + Password → DB → Match → JWT</p>
              <div className="flex justify-center items-center mt-4 space-x-2">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg">Credentials</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Database</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-purple-600 text-white rounded-lg">Verify</span>
                <span className="text-2xl">→</span>
                <span className="px-4 py-2 bg-green-600 text-white rounded-lg">JWT</span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-sky-400">JWT Helper Function</h3>
          <CodeBlock code={`// lib/auth.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key-change-in-production";

export function generateToken(user) {
  return jwt.sign(
    { 
      userId: user._id, 
      email: user.email,
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: "7d" } // Token 7 دن کے لیے valid
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getUserIdFromToken(token) {
  const decoded = verifyToken(token);
  return decoded?.userId;
}`} colorClass="text-blue-300" />

          <h3 className="text-xl font-bold mb-4 text-sky-400 mt-8">Login API Route</h3>
          <CodeBlock code={`// app/api/auth/login/route.js
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    // Input validation
    if (!email || !password) {
      return Response.json(
        { message: "ای میل اور پاس ورڈ ضروری ہیں" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { message: "غلط ای میل یا پاس ورڈ" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { message: "غلط ای میل یا پاس ورڈ" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return success response with token
    return Response.json(
      { 
        message: "کامیابی! لاگ ان ہو گیا",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`} colorClass="text-indigo-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-purple-50'} border border-purple-500`}>
            <h4 className="text-xl font-bold mb-4 text-purple-400">🔐 JWT Token Structure</h4>
            <CodeBlock code={`{
  "userId": "67a1b2c3d4e5f6g7h8i9j0",
  "email": "ali@gmail.com",
  "role": "user",
  "iat": 1673785200,  // Issued at
  "exp": 1674390000   // Expires at (7 days later)
}`} colorClass="text-amber-300" />
            <ul className="list-disc pr-6 space-y-2 mt-4">
              <li><strong>userId:</strong> User کی unique identity</li>
              <li><strong>email:</strong> Verification کے لیے</li>
              <li><strong>role:</strong> Permission level (user/admin)</li>
              <li><strong>iat:</strong> Token جاری ہونے کا وقت</li>
              <li><strong>exp:</strong> Token ختم ہونے کا وقت</li>
            </ul>
          </div>
        </section>

        {/* Part 4: Middleware */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
            🔹 Part 4: Middleware (بلکل آسان انداز میں)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-gradient-to-r from-amber-50 to-orange-50'}`}>
            <h3 className="text-xl font-bold mb-4 text-amber-400">🛡️ مڈل ویئر کیا ہے؟</h3>
            <p className="mb-4 text-lg">
              جب کوئی یوزر آپ کی ویب سائٹ پر کسی صفحے پر جانے کی کوشش کرتا ہے، تو مڈل ویئر راستے میں اس درخواست کو روکتا ہے اور فیصلہ کرتا ہے:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-green-50'} border border-green-500`}>
                <h4 className="font-bold mb-3 text-green-400">✅ مڈل ویئر کرتا ہے:</h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>یوزر کو آگے جانے دینا</li>
                  <li>کسی اور صفحے پر بھیج دینا (Redirect)</li>
                  <li>یوزر کو روک دینا (Block)</li>
                  <li>Request کے ساتھ اضافی معلومات بھیجنا</li>
                </ul>
              </div>
              
              <div className={`p-5 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500`}>
                <h4 className="font-bold mb-3 text-blue-400">🚀 Middleware کیسے استعمال کرتے ہیں؟</h4>
                <ol className="list-decimal pr-6 space-y-2">
                  <li>فائل بنانا: <code>middleware.js</code></li>
                  <li>Basic structure لکھنا</li>
                  <li>Matcher define کرنا</li>
                  <li>Logic لکھنا</li>
                </ol>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-sky-400">1️⃣ Basic Middleware Structure</h3>
          <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'

// یہ فنکشن ہر request پر چلے گا
export function middleware(request) {
  // Request کو آگے جانے دیں
  return NextResponse.next()
}

// یہ بتاتا ہے مڈل ویئر کہاں چلے گا
export const config = {
  matcher: '/dashboard/:path*'
}`} colorClass="text-blue-300" />

          <div className={`p-6 rounded-2xl my-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-100'}`}>
            <p className="mb-2">👉 اس کا مطلب:</p>
            <p className="font-bold text-center text-emerald-400">مڈل ویئر صرف /dashboard کے صفحات پر چلے گا</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-red-400">🔐 Example: Protected Routes (Login Required)</h3>
          <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export function middleware(request) {
  // Get token from cookies or headers
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.split(' ')[1]

  // Public routes (ہر کسی کے لیے)
  const publicPaths = ['/login', '/signup', '/', '/about', '/contact']
  
  // اگر یوزر public route پر ہے، تو آگے جانے دو
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next()
  }

  // Protected routes (صرف logged in users کے لیے)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      // Token نہیں ہے، login page پر redirect
      return NextResponse.redirect(new URL('/login', request.url))
    }

    try {
      // Verify JWT token
      const decoded = verifyToken(token)
      
      if (!decoded) {
        // Invalid token, redirect to login
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Token valid ہے، آگے جانے دو
      const response = NextResponse.next()
      
      // Request میں user info add کریں
      response.headers.set('user-id', decoded.userId)
      response.headers.set('user-role', decoded.role)
      
      return response
    } catch (error) {
      // Token verification failed
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // باقی routes کے لیے
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/protected/:path*',
    '/profile/:path*'
  ]
}`} colorClass="text-red-300" />

          <div className={`p-6 rounded-2xl my-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-emerald-50'}`}>
            <h4 className="text-xl font-bold mb-4 text-emerald-400">👉 آسان الفاظ میں:</h4>
            <div className="text-center space-y-2">
              <p className="font-bold">ٹوکن نہیں؟ ❌</p>
              <p className="text-2xl">↓</p>
              <p className="font-bold text-red-400">تو لاگ ان پیج پر بھیج دو</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400">🌍 Example: Country Based Logic (Geo Location)</h3>
          <CodeBlock code={`// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Get user's country from request
  const country = request.geo?.country || 'US'
  const city = request.geo?.city || 'Unknown'

  // پاکستان کے یوزرز کے لیے مخصوص لاجک
  if (country === 'PK') {
    // اردو میں welcome message
    const response = NextResponse.next()
    response.headers.set('x-user-country', 'Pakistan')
    response.headers.set('x-user-city', city)
    
    // Pakistani users کے لیے خاص content
    if (request.nextUrl.pathname === '/') {
      // Welcome page customize کریں
      const url = request.nextUrl.clone()
      url.searchParams.set('region', 'pk')
      return NextResponse.redirect(url)
    }
    
    return response
  }

  // دیگر ممالک کے لیے
  return NextResponse.next()
}

export const config = {
  matcher: '/'
}`} colorClass="text-purple-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'} border-2 border-indigo-500`}>
            <h4 className="text-xl font-bold mb-4 text-indigo-400">📌 مڈل ویئر کے اہم نکات</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>مڈل ویئر page render ہونے سے پہلے چلتا ہے</strong></li>
              <li><strong>یہ Edge Runtime پر چلتا ہے (بہت تیز)</strong></li>
              <li><strong>Node.js کی heavy libraries یہاں استعمال نہیں ہوتیں</strong></li>
              <li><strong>matcher لازمی استعمال کریں تاکہ performance خراب نہ ہو</strong></li>
              <li><strong>Middleware صرف decision لیتا ہے، data process نہیں کرتا</strong></li>
            </ul>
          </div>

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gradient-to-r from-green-50 to-blue-50'} border-2 border-green-500`}>
            <h4 className="text-xl font-bold mb-4 text-green-400">🔑 Middleware اور JWT کا تعلق (Simple)</h4>
            <div className="text-center">
              <div className="flex justify-center items-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="font-bold text-amber-400">JWT</p>
                  <p className="text-sm">= یوزر کی شناخت</p>
                </div>
                <div className="text-2xl">+</div>
                <div className="text-center">
                  <p className="font-bold text-blue-400">Middleware</p>
                  <p className="text-sm">= JWT چیک کرنے والا چوکیدار</p>
                </div>
              </div>
              <p className="font-bold">JWT ہم API routes میں استعمال کرتے ہیں</p>
              <p className="font-bold">Middleware ہم routes protect کرنے کے لیے</p>
            </div>
          </div>
        </section>

        {/* Part 5: Protected Profile API */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
            🔹 Part 5: Protected Profile API (READ)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-blue-50/50'}`}>
            <p className="text-center text-lg font-bold text-blue-400 mb-4">📌 CRUD: READ operation</p>
            <p>User کی profile information fetch کرنا</p>
          </div>

          <CodeBlock code={`// app/api/users/profile/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function GET(req) {
  try {
    // Get token from authorization header
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    
    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Connect to database
    await connectDB();

    // Find user by ID (password exclude کریں)
    const user = await User.findById(decoded.userId).select("-password");
    
    if (!user) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Return user data
    return Response.json(
      {
        message: "Profile fetched successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Profile fetch error:", error);
    return Response.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}`} colorClass="text-blue-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-sky-50'} border border-sky-500`}>
            <h4 className="text-xl font-bold mb-4 text-sky-400">🔐 Security Layers in Profile API</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>Token Validation:</strong> Bearer token format چیک کرنا</li>
              <li><strong>JWT Verification:</strong> Token کو verify کرنا</li>
              <li><strong>User Existence:</strong> Database میں user موجود ہے یا نہیں</li>
              <li><strong>Password Exclusion:</strong> Response میں password نہیں بھیجتے</li>
              <li><strong>Error Handling:</strong> ہر possible error handle کیا گیا</li>
            </ul>
          </div>
        </section>

        {/* Part 6: Update Profile */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-yellow-400 border-r-4 border-yellow-500 pr-4">
            🔹 Part 6: Update Profile (UPDATE)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-yellow-50/50'}`}>
            <p className="text-center text-lg font-bold text-yellow-400 mb-4">📌 CRUD: UPDATE operation</p>
            <p>User کی information update کرنا</p>
          </div>

          <CodeBlock code={`// app/api/users/update/route.js
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/auth";

export async function PUT(req) {
  try {
    // Get token from authorization header
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    
    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get update data from request body
    const data = await req.json();
    
    // Validate update data
    const allowedUpdates = ["name", "password"];
    const updates = Object.keys(data);
    
    const isValidUpdate = updates.every(update => 
      allowedUpdates.includes(update)
    );
    
    if (!isValidUpdate) {
      return Response.json(
        { message: "Invalid update fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Prepare update object
    const updateObject = {};
    
    if (data.name) {
      updateObject.name = data.name;
    }
    
    if (data.password) {
      // Hash new password
      const hashedPassword = await bcrypt.hash(data.password, 10);
      updateObject.password = hashedPassword;
    }

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      updateObject,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        message: "پروفائل کامیابی سے اپ ڈیٹ ہو گیا",
        user: updatedUser
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Update error:", error);
    return Response.json(
      { message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`} colorClass="text-yellow-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-amber-50'} border border-amber-500`}>
            <h4 className="text-xl font-bold mb-4 text-amber-400">🛡️ Update Security Features</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>Allowed Fields:</strong> صرف specific fields update ہو سکتے ہیں</li>
              <li><strong>Password Hashing:</strong> نئے password کو ہیش کیا جاتا ہے</li>
              <li><strong>Data Validation:</strong> Update data validate کی جاتی ہے</li>
              <li><strong>Run Validators:</strong> Mongoose validators چلتے ہیں</li>
              <li><strong>Selective Updates:</strong> صرف changed fields update ہوتے ہیں</li>
            </ul>
          </div>
        </section>

        {/* Part 7: Delete Account */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
            🔹 Part 7: Delete Account (DELETE)
          </h2>
          
          <div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-red-50/50'}`}>
            <p className="text-center text-lg font-bold text-red-400 mb-4">📌 CRUD: DELETE operation</p>
            <p>User کا account permanently delete کرنا</p>
          </div>

          <CodeBlock code={`// app/api/users/delete/route.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/auth";

export async function DELETE(req) {
  try {
    // Get token from authorization header
    const authHeader = req.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return Response.json(
        { message: "Authorization header missing or invalid" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    
    // Verify JWT token
    const decoded = verifyToken(token);
    if (!decoded) {
      return Response.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    // Get confirmation from request body
    const { confirm } = await req.json();
    
    if (confirm !== "DELETE") {
      return Response.json(
        { message: "Confirmation required. Send DELETE in confirm field" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Delete user from database
    const deletedUser = await User.findByIdAndDelete(decoded.userId);
    
    if (!deletedUser) {
      return Response.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { 
        message: "آپ کا اکاؤنٹ کامیابی سے ڈیلیٹ ہو گیا",
        deleted: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Delete error:", error);
    return Response.json(
      { message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`} colorClass="text-red-300" />

          <div className={`p-6 rounded-2xl mt-6 ${theme === 'dark' ? 'bg-slate-800' : 'bg-pink-50'} border border-pink-500`}>
            <h4 className="text-xl font-bold mb-4 text-pink-400">⚠️ Delete Account Safety Measures</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li><strong>Double Confirmation:</strong> User کو دو بار confirm کرنا پڑتا ہے</li>
              <li><strong>Specific Keyword:</strong> "DELETE" keyword بھیجنا ضروری ہے</li>
              <li><strong>Permanent Deletion:</strong> Data permanently delete ہوتا ہے</li>
              <li><strong>Token Verification:</strong> صرف authenticated users delete کر سکتے ہیں</li>
              <li><strong>Error Handling:</strong> Delete process میں errors handle کیے گئے</li>
            </ul>
          </div>
        </section>

        {/* Summary and Mental Model */}
        <section className="mb-16 border-t border-slate-700 pt-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
            🧠 Complete System Mental Model
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} border border-blue-500`}>
              <h3 className="text-xl font-bold mb-4 text-blue-400">📊 CRUD Operations</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">C</span>
                  </div>
                  <div>
                    <p className="font-bold text-green-600">Signup → CREATE</p>
                    <p className="text-sm">نیا user بنانا</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">R</span>
                  </div>
                  <div>
                    <p className="font-bold text-blue-600">Profile → READ</p>
                    <p className="text-sm">User data fetch کرنا</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">U</span>
                  </div>
                  <div>
                    <p className="font-bold text-yellow-600">Update → UPDATE</p>
                    <p className="text-sm">User data update کرنا</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">D</span>
                  </div>
                  <div>
                    <p className="font-bold text-red-600">Delete → DELETE</p>
                    <p className="text-sm">User account delete کرنا</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`p-6 rounded-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-gradient-to-br from-green-50 to-emerald-50'} border border-green-500`}>
              <h3 className="text-xl font-bold mb-4 text-green-400">🔐 Security Components</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white">🔑</span>
                  </div>
                  <div>
                    <p className="font-bold text-indigo-600">JWT → identity proof</p>
                    <p className="text-sm">User کی شناخت</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white">🛡️</span>
                  </div>
                  <div>
                    <p className="font-bold text-purple-600">Middleware → gatekeeper</p>
                    <p className="text-sm">حفاظتی چوکیدار</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white">🔐</span>
                  </div>
                  <div>
                    <p className="font-bold text-amber-600">bcrypt → password hashing</p>
                    <p className="text-sm">پاس ورڈ محفوظ کرنا</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white">📦</span>
                  </div>
                  <div>
                    <p className="font-bold text-sky-600">MongoDB → data storage</p>
                    <p className="text-sm">ڈیٹا محفوظ کرنے کی جگہ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl ${theme === 'dark' ? 'bg-gradient-to-r from-slate-800 to-slate-900' : 'bg-gradient-to-r from-indigo-50 to-purple-50'} border-4 border-dashed border-indigo-500`}>
            <h3 className="text-2xl font-bold mb-6 text-center text-indigo-600">✅ Final Result</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-xl">
                <p className="font-bold text-green-700 dark:text-green-300">✔ Full Authentication System</p>
              </div>
              <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <p className="font-bold text-blue-700 dark:text-blue-300">✔ MongoDB CRUD</p>
              </div>
              <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <p className="font-bold text-purple-700 dark:text-purple-300">✔ JWT Security</p>
              </div>
              <div className="p-4 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <p className="font-bold text-amber-700 dark:text-amber-300">✔ Production Ready</p>
              </div>
            </div>
          </div>
        </section>

        {/* Practice Exercise */}
        <section className="my-16 p-6 md:p-8 border-4 border-dashed border-emerald-500 rounded-3xl bg-emerald-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400">💻 Practice Exercise (عملی مشق)</h2>
          <div className="space-y-4 font-bold text-sm md:text-lg">
            <p>1️⃣ Complete User Model بنائیں تمام validations کے ساتھ</p>
            <p>2️⃣ Signup API بنائیں password hashing کے ساتھ</p>
            <p>3️⃣ Login API بنائیں JWT token generation کے ساتھ</p>
            <p>4️⃣ Middleware بنائیں جو protected routes کو secure کرے</p>
            <p>5️⃣ Profile API بنائیں جو user data fetch کرے</p>
            <p>6️⃣ Update API بنائیں selective updates کے ساتھ</p>
            <p>7️⃣ Delete API بنائیں double confirmation کے ساتھ</p>
            <p>8️⃣ Frontend forms بنائیں تمام APIs کو connect کریں</p>
          </div>
          
          <div className={`mt-8 p-6 rounded-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'} border border-blue-500`}>
            <h4 className="text-lg font-bold mb-3 text-blue-400">📝 Project Requirements</h4>
            <ul className="list-disc pr-6 space-y-2">
              <li>User registration with validation</li>
              <li>Secure login with JWT</li>
              <li>Protected dashboard route</li>
              <li>Profile management (view/edit)</li>
              <li>Account deletion with confirmation</li>
              <li>Error handling on all routes</li>
              <li>Responsive design with RTL support</li>
            </ul>
          </div>
        </section>

        {/* Next Chapter Preview */}
        <section className={`p-8 rounded-3xl border-t-8 border-purple-600 shadow-2xl mb-12 ${theme === 'dark' ? 'bg-slate-800' : 'bg-purple-50'}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-purple-600 italic">🚀 اگلا باب: Advanced Features</h2>
          <p className="mb-4 text-lg">جب آپ یہ system مکمل کر لیں، تو اگلے مرحلے میں:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Password reset functionality (ای میل کے ذریعے)</li>
            <li>Email verification system</li>
            <li>Social login (Google, Facebook, GitHub)</li>
            <li>Two-factor authentication (2FA)</li>
            <li>Role-based access control (RBAC)</li>
            <li>API rate limiting</li>
            <li>Logging and monitoring</li>
            <li>Deployment on Vercel/AWS</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 16: Professional Authentication System مکمل</p>
          <p className="text-sm mt-2">🔐 اب آپ production-ready authentication system بنا سکتے ہیں!</p>
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