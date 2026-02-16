import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter21() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("middleware");

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
        <div className="text-xs text-gray-500">
          {code.split("\n").length} لائنیں
        </div>
        <button
          onClick={() => handleCopy(code)}
          className="mt-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs px-4 py-2 rounded-lg transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
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
    { id: "middleware", label: "🔐 Next.js Middleware", color: "blue" },
    { id: "rbac", label: "👥 Role-Based Access", color: "green" },
    { id: "verification", label: "📧 Email Verification", color: "purple" },
    { id: "password", label: "🔄 Password Reset", color: "red" },
  ];

  // Section 21.1: Next.js Middleware
  const middlewareCode = `// middleware.js - Next.js Middleware
import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Public routes (لاگ ان سے پہلے رسائی)
  const publicPaths = ['/login', '/register', '/forgot-password', '/api/auth'];
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // JWT Token چیک کریں
  const token = request.cookies.get('auth-token')?.value;
  
  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  try {
    // Token verify کریں
    const decoded = verify(token, process.env.JWT_SECRET);
    
    // User info request headers میں شامل کریں
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-id', decoded.userId);
    requestHeaders.set('x-user-email', decoded.email);
    requestHeaders.set('x-user-role', decoded.role);
    
    // Admin routes کے لیے چیک
    if (pathname.startsWith('/admin') && decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    // Instructor routes کے لیے چیک
    if (pathname.startsWith('/instructor') && !['instructor', 'admin'].includes(decoded.role)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }
    
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
    
  } catch (error) {
    // Invalid token - clear cookie and redirect
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('auth-token');
    return response;
  }
}

// Config for which paths middleware should run on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};

// Rate Limiting Middleware (اضافی)
import { rateLimit } from './lib/rate-limit';

export async function rateLimitMiddleware(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const isLimited = await rateLimit(ip);
  
  if (isLimited) {
    return NextResponse.json(
      { error: 'زیادہ درخواستیں بھیجی جا رہی ہیں، براہ کرم تھوڑی دیر بعد کوشش کریں' },
      { status: 429 }
    );
  }
  
  return NextResponse.next();
}`;

  // Section 21.2: Role-Based Access Control
  const rbacCode = `// lib/rbac.js - Role-Based Access Control
export const ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin'
};

export const PERMISSIONS = {
  // Student permissions
  [ROLES.STUDENT]: [
    'view:own_courses',
    'enroll:course',
    'submit:assignment',
    'view:grades',
    'access:discussions'
  ],
  
  // Instructor permissions
  [ROLES.INSTRUCTOR]: [
    ...PERMISSIONS[ROLES.STUDENT],
    'create:course',
    'edit:own_courses',
    'grade:assignments',
    'manage:students',
    'access:analytics'
  ],
  
  // Admin permissions
  [ROLES.ADMIN]: [
    ...PERMISSIONS[ROLES.INSTRUCTOR],
    'manage:all_courses',
    'manage:users',
    'view:all_analytics',
    'system:settings',
    'delete:any_content'
  ]
};

// Permission check function
export function hasPermission(userRole, requiredPermission) {
  if (!userRole || !PERMISSIONS[userRole]) {
    return false;
  }
  
  return PERMISSIONS[userRole].includes(requiredPermission);
}

// Component-level permission check
export function withPermission(Component, requiredPermission) {
  return function ProtectedComponent(props) {
    const { user } = useAuth(); // Your auth context
    
    if (!user || !hasPermission(user.role, requiredPermission)) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ رسائی منع ہے</h2>
          <p className="text-gray-600">
            آپ کے پاس اس صفحے تک رسائی کی اجازت نہیں ہے۔
          </p>
        </div>
      );
    }
    
    return <Component {...props} />;
  };
}

// API route protection example
export async function protectAPI(req, res, requiredPermission) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized - لاگ ان کریں' });
  }
  
  if (!hasPermission(session.user.role, requiredPermission)) {
    return res.status(403).json({ error: 'Forbidden - آپ کی اجازت نہیں ہے' });
  }
  
  return session.user;
}

// Usage in API route
export default async function handler(req, res) {
  try {
    const user = await protectAPI(req, res, 'manage:users');
    
    // Only admin can access this
    if (req.method === 'GET') {
      const users = await User.find({});
      return res.status(200).json({ users });
    }
    
    // ... other admin operations
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
}`;

  // Section 21.3: Email Verification System
  const emailVerificationCode = `// pages/api/auth/verify-email.js - Email Verification
import crypto from 'crypto';
import User from '@/models/User';
import { connectDB } from '@/lib/database';
import { sendWelcomeEmail } from '@/lib/email';

export default async function handler(req, res) {
  await connectDB();
  
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const { token } = req.query;
  
  if (!token) {
    return res.redirect('/verification/error?message=Token not provided');
  }
  
  try {
    // Hash the token for comparison
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with this token (and check expiry)
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return res.redirect('/verification/error?message=Invalid or expired token');
    }
    
    // Update user verification status
    user.emailVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    user.verifiedAt = Date.now();
    
    await user.save();
    
    // Send welcome email
    await sendWelcomeEmail(user.email, user.name);
    
    // Create session or JWT token
    const authToken = user.generateAuthToken();
    
    // Set cookie
    res.setHeader('Set-Cookie', \`auth-token=\${authToken}; Path=/; HttpOnly; SameSite=Strict; Max-Age=604800\`);
    
    // Redirect to success page
    return res.redirect('/verification/success');
    
  } catch (error) {
    console.error('Email verification error:', error);
    return res.redirect('/verification/error?message=Server error');
  }
}

// Resend verification email API
export async function resendVerification(req, res) {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'ای میل درکار ہے' });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal if user exists (security)
      return res.status(200).json({ 
        message: 'اگر یہ ای میل رجسٹرڈ ہے، تو verification ای میل بھیج دی گئی ہے' 
      });
    }
    
    if (user.emailVerified) {
      return res.status(400).json({ error: 'ای میل پہلے ہی تصدیق شدہ ہے' });
    }
    
    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    
    user.verificationToken = hashedToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    await user.save();
    
    // Send verification email
    const verificationUrl = \`\${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=\${verificationToken}\`;
    
    try {
      await sendVerificationEmail(user.email, user.name, verificationUrl);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      return res.status(500).json({ error: 'ای میل بھیجنے میں ناکامی' });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'تصدیقی ای میل دوبارہ بھیج دی گئی ہے' 
    });
    
  } catch (error) {
    console.error('Resend verification error:', error);
    return res.status(500).json({ error: 'سرور ایرر' });
  }
}`;

  // Section 21.4: Password Reset System
  const passwordResetCode = `// app/api/auth/reset-password/route.js - Complete Password Reset
import { connectDB } from '@/lib/database';
import User from '@/models/User';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail } from '@/lib/email';

// 1. Request password reset (Forgot Password)
export async function POST(request) {
  try {
    await connectDB();
    
    const { email } = await request.json();
    
    if (!email) {
      return Response.json(
        { success: false, message: "ای میل درکار ہے" },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });
    
    // Security: Always return success even if user doesn't exist
    if (!user) {
      return Response.json(
        { 
          success: true, 
          message: "اگر یہ ای میل رجسٹرڈ ہے، تو پاس ورڈ ریسیٹ لنک بھیج دیا جائے گا" 
        },
        { status: 200 }
      );
    }
    
    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    
    // Save to database with 1-hour expiry
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // Send reset email
    const resetUrl = \`\${process.env.NEXTAUTH_URL}/reset-password?token=\${resetToken}\`;
    
    try {
      await sendPasswordResetEmail(email, user.name, resetUrl);
    } catch (emailError) {
      // Rollback if email fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      return Response.json(
        { success: false, message: "ای میل بھیجنے میں ناکامی" },
        { status: 500 }
      );
    }
    
    return Response.json(
      {
        success: true,
        message: "پاس ورڈ ریسیٹ لنک آپ کی ای میل پر بھیج دیا گیا ہے",
        expiresIn: "1 گھنٹہ"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Password reset request error:', error);
    return Response.json(
      { success: false, message: "سرور ایرر" },
      { status: 500 }
    );
  }
}

// 2. Reset password with token
export async function PUT(request) {
  try {
    await connectDB();
    
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return Response.json(
        { success: false, message: "ٹوکن اور نیا پاس ورڈ درکار ہے" },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return Response.json(
        { success: false, message: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے" },
        { status: 400 }
      );
    }
    
    // Hash the token for comparison
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    if (!user) {
      return Response.json(
        { success: false, message: "غلط یا ختم ہونے والا ٹوکن" },
        { status: 400 }
      );
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Update user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.passwordChangedAt = Date.now();
    
    // Invalidate all existing sessions (optional)
    // user.sessionVersion = (user.sessionVersion || 0) + 1;
    
    await user.save();
    
    // Send confirmation email
    await sendPasswordChangedEmail(user.email, user.name);
    
    return Response.json(
      {
        success: true,
        message: "پاس ورڈ کامیابی سے تبدیل ہو گیا ہے",
        redirectTo: "/login"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Password reset error:', error);
    return Response.json(
      { success: false, message: "سرور ایرر" },
      { status: 500 }
    );
  }
}

// 3. Validate reset token (for frontend)
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    if (!token) {
      return Response.json(
        { success: false, message: "ٹوکن درکار ہے" },
        { status: 400 }
      );
    }
    
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');
    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });
    
    return Response.json(
      {
        success: !!user,
        valid: !!user,
        message: user ? "ٹوکن درست ہے" : "غلط یا ختم ہونے والا ٹوکن"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Token validation error:', error);
    return Response.json(
      { success: false, message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`;

  // Section 21.5: Security Headers & CSP
  const securityHeadersCode = `// next.config.js - Security Headers Configuration
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security Headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Content Security Policy (CSP)
          {
            key: 'Content-Security-Policy',
            value: \`default-src 'self'; 
                   script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live https://*.googleapis.com; 
                   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
                   img-src 'self' data: https:; 
                   font-src 'self' https://fonts.gstatic.com; 
                   connect-src 'self' https://*.googleapis.com;\`
                   .replace(/\\s+/g, ' ')
          }
        ],
      },
    ];
  },
  
  // Prevent sensitive data exposure
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Environment variables for production
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  
  // Production optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  
  // Security: Disable directory listing
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

module.exports = nextConfig;

// .env.local - Production Environment Variables
NODE_ENV=production

# JWT Secrets
JWT_SECRET=your-very-long-random-secret-key-at-least-32-characters
JWT_EXPIRE=7d

# Database
MONGODB_URI=your-mongodb-connection-string

# Email Service
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@yourdomain.com

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret-at-least-32-characters

# API Rate Limiting
RATE_LIMIT_WINDOW=15 * 60 * 1000  // 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# Production Features
ENABLE_CACHING=true
ENABLE_COMPRESSION=true
ENABLE_SECURITY_HEADERS=true

// lib/security.js - Additional Security Functions
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import cors from 'cors';

// Rate Limiting Middleware
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'زیادہ درخواستیں بھیجی جا رہی ہیں، براہ کرم 15 منٹ بعد کوشش کریں'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// CORS Configuration
export const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com', 'https://www.yourdomain.com']
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Security headers middleware
export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
  },
  referrerPolicy: { policy: 'same-origin' },
});`;

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
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {copySuccess}
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-90 border-b border-slate-700/20 shadow-lg">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer hover:shadow-lg font-bold transition-transform active:scale-90 rounded-full hover:bg-blue-500/10 transition-all z-[60] hover:text-red-600 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text"
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ روشن موڈ"}
        </button>
      </header>

      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* Chapter Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          باب 21: Production-Ready Security System
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          Next.js میں مکمل سیکیورٹی اور پروڈکشن ڈپلائمنٹ
        </p>

        {/* Chapter Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-800 text-white shadow-lg scale-105`
                  : "bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:shadow-md"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-red-400">
            🛡️ باب کا مقصد: Professional Security Implementation
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>مکمل پروڈکشن ریڈی سیکیورٹی سسٹم</strong>{" "}
            بنائیں گے جو <strong>Real-world applications</strong> میں استعمال
            ہوتا ہے۔
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-red-200 dark:border-red-800">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="text-xl font-bold mb-2 text-red-600 dark:text-red-400">
                Middleware Protection
              </h3>
              <p className="text-sm">
                Route-based authentication & authorization
              </p>
            </div>

            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">👮</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
                Role-Based Access
              </h3>
              <p className="text-sm">Granular permission system</p>
            </div>

            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                Email Security
              </h3>
              <p className="text-sm">Verification & Password reset</p>
            </div>
          </div>
        </section>

        {/* Section 21.1: Next.js Middleware */}
        {activeTab === "middleware" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
              21.1: Next.js Middleware Protection
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                🔐 Middleware کیا ہے اور کیوں ضروری ہے؟
              </h3>
              <p className="mb-4">
                Middleware Next.js کا اہم فیچر ہے جو ہر request اور response کے
                درمیان run ہوتا ہے۔
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-blue-300">✅ فوائد:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Centralized authentication logic</li>
                    <li>Route protection without repeating code</li>
                    <li>Performance optimization</li>
                    <li>Security headers management</li>
                    <li>Geo-blocking implementation</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white-30/10">
                  <h4 className="font-bold mb-2 text-purple-300">
                    📊 استعمال:
                  </h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>JWT token verification</li>
                    <li>Role-based route protection</li>
                    <li>Rate limiting</li>
                    <li>Bot detection</li>
                    <li>Maintenance mode</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock
              code={middlewareCode}
              colorClass="text-blue-300"
              title="middleware.js - Complete Middleware Implementation"
            />
          </section>
        )}

        {/* Section 21.2: Role-Based Access Control */}
        {activeTab === "rbac" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
              21.2: Role-Based Access Control (RBAC)
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-300">
                👥 Role-Based Access کیوں ضروری ہے؟
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white-30/10">
                  <div className="text-2xl mb-2">👨‍🎓</div>
                  <h4 className="font-bold mb-2">Student Role</h4>
                  <p className="text-sm">
                    Course enrollment, assignments, grades
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-white-30/10">
                  <div className="text-2xl mb-2">👨‍🏫</div>
                  <h4 className="font-bold mb-2">Instructor Role</h4>
                  <p className="text-sm">Course creation, grading, analytics</p>
                </div>

                <div className="p-4 rounded-lg bg-white-30/10">
                  <div className="text-2xl mb-2">👑</div>
                  <h4 className="font-bold mb-2">Admin Role</h4>
                  <p className="text-sm">User management, system settings</p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={rbacCode}
              colorClass="text-green-300"
              title="lib/rbac.js - Role-Based Access Control System"
            />
          </section>
        )}

        {/* Section 21.3: Email Verification */}
        {activeTab === "verification" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
              21.3: Email Verification System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                📧 Email Verification Flow
              </h3>

              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <p className="font-bold text-purple-400">User Registration</p>
                  <p className="text-sm">User signs up</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <p className="font-bold text-blue-400">Token Generation</p>
                  <p className="text-sm">Secure token created</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <p className="font-bold text-green-400">Email Sent</p>
                  <p className="text-sm">Verification link sent</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">4</span>
                  </div>
                  <p className="font-bold text-amber-400">User Clicks Link</p>
                  <p className="text-sm">Token verified</p>
                </div>
              </div>
            </div>

            <CodeBlock
              code={emailVerificationCode}
              colorClass="text-purple-300"
              title="pages/api/auth/verify-email.js - Complete Email Verification"
            />
          </section>
        )}

        {/* Section 21.4: Password Reset */}
        {activeTab === "password" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
              21.4: Password Reset System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-300">
                🔐 Secure Password Recovery Flow
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">
                    ✅ Security Features:
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>1-hour expiry tokens</li>
                    <li>SHA-256 hashing</li>
                    <li>Rate limiting protection</li>
                    <li>No user enumeration</li>
                    <li>Password strength validation</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">
                    🔧 Technical Implementation:
                  </h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Crypto-safe token generation</li>
                    <li>Database transaction safety</li>
                    <li>Email delivery verification</li>
                    <li>Session invalidation</li>
                    <li>Audit logging</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock
              code={passwordResetCode}
              colorClass="text-red-300"
              title="app/api/auth/reset-password/route.js - Complete Password Reset System"
            />
          </section>
        )}

        {/* Section 21.5: Security Headers & Production Config */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
            21.5: Production Security & Configuration
          </h2>

          <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border border-amber-500/20">
            <h3 className="text-xl font-bold mb-4 text-amber-300">
              🚀 Production Deployment Checklist
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-green-400">
                  ✅ Security Headers:
                </h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>Content Security Policy (CSP)</li>
                  <li>Strict Transport Security (HSTS)</li>
                  <li>X-Frame-Options</li>
                  <li>X-Content-Type-Options</li>
                  <li>Referrer-Policy</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-blue-400">
                  🔧 Production Config:
                </h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>Environment variables</li>
                  <li>Rate limiting</li>
                  <li>Error handling</li>
                  <li>Logging & Monitoring</li>
                  <li>Backup strategy</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock
            code={securityHeadersCode}
            colorClass="text-amber-300"
            title="next.config.js & .env.local - Production Security Configuration"
          />
        </section>

        {/* Practice Section */}
        <section className="my-16 p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div
            className="space-y-4 font-bold text-sm md:text-lg text-center"
            dir="rtl"
          >
            <p className="flex items-center justify-center gap-2">
              <span className="bg-blue-500 text-white p-2 rounded">1</span>
              Next.js middleware implement کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">2</span>
              Role-based access control test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">3</span>
              Email verification flow complete کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-red-500 text-white p-2 rounded">4</span>
              Password reset system implement کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">5</span>
              Production security headers configure کریں
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="p-8 rounded-3xl border-t-8 border-red-600 shadow-2xl mb-12 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-red-600 dark:text-red-400 italic">
            📌 خلاصہ (Chapter 21 Summary)
          </h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li className="flex items-center gap-2">
              <span className="bg-blue-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Next.js Middleware:</strong> Route protection &
              authentication
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-green-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Role-Based Access Control:</strong> Granular permission
              system
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-purple-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Email Verification:</strong> Secure verification with
              tokens
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-red-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Password Reset:</strong> Complete recovery system
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-amber-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Security Headers:</strong> CSP, HSTS, XSS protection
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white p-1 rounded text-sm">
                ✓
              </span>
              <strong>Production Config:</strong> Environment variables &
              optimization
            </li>
          </ul>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 italic">
            🚀 اگلے باب میں
          </h2>
          <p className="mb-4 text-lg">
            اگلے باب میں ہم <strong>Complete Course Management System</strong>{" "}
            بنائیں گے جو کسی بھی LMS کا دل ہے:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Course Creation Interface (Instructor Panel)</li>
            <li>Video Upload & Streaming System</li>
            <li>Syllabus & Curriculum Builder</li>
            <li>Lecture Management (Videos, PDFs, Quizzes)</li>
            <li>Course Categories & Tags System</li>
            <li>Course Preview & Enrollment</li>
            <li>Student Progress Tracking</li>
            <li>Course Analytics Dashboard</li>
          </ul>
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700">
            <p className="text-amber-800 dark:text-amber-300 font-bold">
              🎯 اہم: یہ وہ chapter ہے جس کے بعد آپ کا LMS حقیقی معنوں میں کام
              کرنا شروع کر دے گا!
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-2">
              اب تک ہم نے صرف Authentication اور Security مکمل کی ہے۔ اب اصل LMS
              functionality بنائیں گے۔
            </p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 21: Production-Ready Security
            System
          </p>
          <p className="text-sm mt-2">
            🚀 اگلے سبق میں ہم Deployment اور DevOps سیکھیں گے!
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
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
