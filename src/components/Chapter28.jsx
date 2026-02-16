// 📁 src/components/Chapter28.jsx - مکمل باب 28 (Security & SEO)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import {
  Mail,
  Send,
  Inbox,
  MailOpen,
  AlertCircle,
  Settings,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  PieChart,
  LineChart,
  Calendar,
  Download,
  Share2,
  Award,
  Target,
  Activity,
  Rocket,
  Server,
  Globe,
  Lock,
  Shield,
  Zap,
  Database,
  Github,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  Cloud,
  Copy,
  Check,
  Loader2,
  ChevronRight,
  BookOpen,
  ExternalLink,
  ArrowLeft,
  ArrowRight,
  PlayCircle,
  RefreshCw,
  DollarSign,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  FileText,
  Search,
  Hash,
  Link,
  Image,
  Smartphone,
  Gauge,
  FileCode,
  FileJson,
  FileSearch,
  Globe2,
  LockKeyhole,
  UserCheck,
  UserX,
  Ban,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function Chapter28() {
  const navigate = useNavigate();

  // اسٹیٹ مینجمنٹ
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("security");

  // تھیم کو سنبھالنا
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
          کوڈ کاپی کریں
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

  const SuperSimpleCode = ({ code, title, steps }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-green-600 dark:text-green-400">
          {title}
        </h3>
        <button
          onClick={() => handleCopy(code)}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 active:scale-95"
        >
          📋 کاپی کریں
        </button>
      </div>
      <pre
        dir="ltr"
        className="bg-gray-900 text-green-300 p-4 rounded-xl text-xs overflow-x-auto border-2 border-green-800 dark:border-green-600 text-left"
      >
        {code}
      </pre>
      {steps && (
        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p className="font-bold text-green-700 dark:text-green-300 mb-1">
            کیسے استعمال کریں:
          </p>
          <ol className="list-decimal pr-6 text-base text-gray-800 dark:text-gray-200">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  // Tabs for different sections
  const tabs = [
    { id: "security", label: "🔒 Security", color: "red" },
    { id: "seo", label: "🔍 SEO Optimization", color: "blue" },
    { id: "project", label: "🚀 Complete Project", color: "green" },
  ];

  // ============================================
  // حصہ 1: Security (سیکورٹی) - مکمل کوڈ
  // ============================================

  const securityCode = {
    // 1. Rate Limiting (DDoS سے بچاؤ)
    rateLimiting: `// 📁 middleware/rateLimiter.js
// Rate Limiting Middleware - DDoS سے بچاؤ

import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { NextResponse } from 'next/server';

// Redis کلائنٹ (اختیاری - بہتر کارکردگی کے لیے)
const redis = new Redis(process.env.REDIS_URL);

// API endpoints کے لیے Rate Limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 منٹ
  max: 100, // زیادہ سے زیادہ 100 درخواستیں فی IP
  standardHeaders: true,
  legacyHeaders: false,
  store: process.env.REDIS_URL ? new RedisStore({
    client: redis,
    prefix: 'rate_limit:'
  }) : undefined,
  message: {
    success: false,
    message: 'بہت زیادہ درخواستیں۔ براہ کرم 15 منٹ بعد کوشش کریں۔'
  },
  skip: (req) => {
    // Admin users کو چھوڑ دیں
    return req.user?.role === 'admin';
  }
});

// Auth endpoints کے لیے سخت Rate Limiter
export const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 گھنٹہ
  max: 5, // زیادہ سے زیادہ 5 کوششیں
  skipSuccessfulRequests: true, // کامیاب درخواستوں کو شمار نہ کریں
  message: {
    success: false,
    message: 'بہت زیادہ لاگ ان کوششیں۔ براہ کرم 1 گھنٹے بعد کوشش کریں۔'
  }
});

// File upload endpoints کے لیے Rate Limiter
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 گھنٹہ
  max: 20, // زیادہ سے زیادہ 20 اپلوڈز
  message: {
    success: false,
    message: 'بہت زیادہ اپلوڈ کوششیں۔ براہ کرم 1 گھنٹے بعد کوشش کریں۔'
  }
});

// 📁 app/api/middleware.ts
// Next.js App Router کے لیے Rate Limiting Middleware

import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: 'ratelimit'
});

export async function rateLimitMiddleware(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json(
      {
        success: false,
        message: 'بہت زیادہ درخواستیں۔ براہ کرم تھوڑی دیر بعد کوشش کریں۔'
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': remaining.toString(),
          'X-RateLimit-Reset': new Date(reset).toISOString()
        }
      }
    );
  }
  
  return NextResponse.next();
}`,

    // 2. Input Validation (XSS سے بچاؤ)
    inputValidation: `// 📁 lib/validation.js
// Input Validation & Sanitization - XSS سے بچاؤ

import DOMPurify from 'isomorphic-dompurify';
import { z } from 'zod';

// HTML Sanitization
export function sanitizeHTML(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'br', 
      'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    USE_PROFILES: { html: true }
  });
}

// Text Sanitization
export function sanitizeText(text) {
  if (!text) return text;
  
  // HTML tags کو ہٹائیں
  text = text.replace(/<[^>]*>?/gm, '');
  
  // Script tags کو ہٹائیں
  text = text.replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '');
  
  // JavaScript URLs کو ہٹائیں
  text = text.replace(/javascript:/gi, 'blocked:');
  
  // On-event attributes کو ہٹائیں
  text = text.replace(/\\bon\\w+\\s*=\\s*(["\']).*?\\1/gi, '');
  
  return text;
}

// Zod Validation Schemas
export const userSchema = z.object({
  name: z.string()
    .min(3, 'نام کم از کم 3 حروف کا ہونا چاہیے')
    .max(50, 'نام زیادہ سے زیادہ 50 حروف کا ہو سکتا ہے')
    .regex(/^[a-zA-Z0-9\\s\\u0600-\\u06FF]+$/, 'صرف حروف، اعداد اور خالی جگہ')
    .transform(sanitizeText),
  
  email: z.string()
    .email('درست ای میل پتہ درج کریں')
    .min(5, 'ای میل بہت چھوٹا ہے')
    .max(100, 'ای میل بہت لمبا ہے')
    .toLowerCase()
    .trim(),
  
  password: z.string()
    .min(8, 'پاس ورڈ کم از کم 8 حروف کا ہونا چاہیے')
    .max(100, 'پاس ورڈ بہت لمبا ہے')
    .regex(/[A-Z]/, 'کم از کم ایک بڑا حرف')
    .regex(/[a-z]/, 'کم از کم ایک چھوٹا حرف')
    .regex(/[0-9]/, 'کم از کم ایک عدد')
    .regex(/[^A-Za-z0-9]/, 'کم از کم ایک خاص حرف'),
  
  role: z.enum(['student', 'instructor', 'admin']).default('student'),
  
  bio: z.string()
    .max(500, 'تعارف زیادہ سے زیادہ 500 حروف کا ہو سکتا ہے')
    .optional()
    .transform(sanitizeHTML)
});

export const courseSchema = z.object({
  title: z.string()
    .min(5, 'عنوان کم از کم 5 حروف کا ہونا چاہیے')
    .max(100, 'عنوان زیادہ سے زیادہ 100 حروف کا ہو سکتا ہے')
    .transform(sanitizeText),
  
  description: z.string()
    .min(20, 'تفصیل کم از کم 20 حروف کی ہونی چاہیے')
    .max(5000, 'تفصیل زیادہ سے زیادہ 5000 حروف کی ہو سکتی ہے')
    .transform(sanitizeHTML),
  
  price: z.number()
    .min(0, 'قیمت صفر یا زیادہ ہونی چاہیے')
    .max(999999, 'قیمت بہت زیادہ ہے'),
  
  category: z.string()
    .min(2, 'زمرہ کم از کم 2 حروف کا ہونا چاہیے')
    .max(50, 'زمرہ بہت لمبا ہے'),
  
  level: z.enum(['beginner', 'intermediate', 'advanced', 'all']),
  
  language: z.string().default('urdu'),
  
  prerequisites: z.array(z.string()).optional(),
  
  objectives: z.array(z.string())
    .min(1, 'کم از کم ایک مقصد درج کریں')
    .max(10, 'زیادہ سے زیادہ 10 مقاصد')
});

export const commentSchema = z.object({
  content: z.string()
    .min(1, 'تبصرہ خالی نہیں ہو سکتا')
    .max(1000, 'تبصرہ زیادہ سے زیادہ 1000 حروف کا ہو سکتا ہے')
    .transform(sanitizeHTML),
  
  rating: z.number()
    .min(1, 'کم از کم 1 ستارہ')
    .max(5, 'زیادہ سے زیادہ 5 ستارے')
    .optional()
});

// Validation Middleware
export function validate(schema) {
  return async (req, res, next) => {
    try {
      const validated = await schema.parseAsync(req.body);
      req.validatedData = validated;
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: error.errors
      });
    }
  };
}`,

    // 3. CSRF Protection
    csrfProtection: `// 📁 lib/csrf.js
// CSRF Protection - Cross-Site Request Forgery سے بچاؤ

import csrf from 'csrf';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const tokens = new csrf();

// CSRF Token Secret
const CSRF_SECRET = process.env.CSRF_SECRET || tokens.secretSync();

// CSRF Token Middleware
export function csrfProtection() {
  return async (req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'OPTIONS') {
      // Safe methods - CSRF token کی ضرورت نہیں
      return next();
    }

    const token = req.headers['x-csrf-token'] || req.body?._csrf;
    
    if (!token) {
      return res.status(403).json({
        success: false,
        message: 'CSRF token missing'
      });
    }

    const secret = cookies().get('csrf-secret')?.value;
    
    if (!secret || !tokens.verify(secret, token)) {
      return res.status(403).json({
        success: false,
        message: 'Invalid CSRF token'
      });
    }

    next();
  };
}

// CSRF Token Generator
export function generateCsrfToken() {
  const secret = tokens.secretSync();
  const token = tokens.create(secret);
  
  // Secret کو کوکی میں محفوظ کریں
  cookies().set('csrf-secret', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 // 1 دن
  });
  
  return token;
}

// CSRF Token Component
export function CsrfToken() {
  const [token, setToken] = useState('');
  
  useEffect(() => {
    fetch('/api/csrf-token')
      .then(res => res.json())
      .then(data => setToken(data.token));
  }, []);
  
  return token ? (
    <input type="hidden" name="_csrf" value={token} />
  ) : null;
}

// 📁 app/api/csrf-token/route.js
import { generateCsrfToken } from '@/lib/csrf';
import { NextResponse } from 'next/server';

export async function GET() {
  const token = generateCsrfToken();
  return NextResponse.json({ token });
}`,

    // 4. Helmet.js (HTTP Headers)
    helmetJs: `// 📁 middleware/helmet.js
// Helmet.js - HTTP Headers Security

import helmet from 'helmet';

export const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com", "https://images.unsplash.com"],
      connectSrc: ["'self'", "https://api.example.com"],
      frameSrc: ["'none'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: []
    }
  },
  
  crossOriginEmbedderPolicy: true,
  crossOriginOpenerPolicy: { policy: "same-origin" },
  crossOriginResourcePolicy: { policy: "same-site" },
  
  dnsPrefetchControl: { allow: false },
  
  expectCt: {
    maxAge: 86400,
    enforce: true,
    reportUri: 'https://example.com/report'
  },
  
  frameguard: { action: 'deny' },
  
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  
  ieNoOpen: true,
  
  noSniff: true,
  
  originAgentCluster: true,
  
  permittedCrossDomainPolicies: { permittedPolicies: 'none' },
  
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  
  xssFilter: true
});

// Next.js Middleware
export function middleware(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  
  const cspHeader = \`
    default-src 'self';
    script-src 'self' 'nonce-\${nonce}' 'strict-dynamic' https: http:;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://res.cloudinary.com;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  \`.replace(/\\s{2,}/g, ' ').trim();
  
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);
  
  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });
  
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  
  return response;
}`,

    // 5. Environment Variables Security
    envSecurity: `# 📁 .env.example
# Environment Variables Template

# ڈیٹا بیس
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms
MONGODB_USER=admin
MONGODB_PASSWORD=your_secure_password
MONGODB_DATABASE=lms

# تصدیق
NEXTAUTH_SECRET=your_super_secret_key_at_least_32_chars_long
NEXTAUTH_URL=https://yourlms.com
JWT_SECRET=another_super_secret_key
JWT_EXPIRES_IN=7d

# ای میل
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@yourlms.com
EMAIL_FROM_NAME="پاکستان ایل ایم ایس"

# ادائیگیاں
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxx

# کلاؤڈ سٹوریج
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_UPLOAD_PRESET=secure_preset

# Redis
REDIS_URL=redis://username:password@host:port
REDIS_PASSWORD=your_redis_password

# Security
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000
CSRF_SECRET=your_csrf_secret
SESSION_SECRET=your_session_secret

# Encryption
ENCRYPTION_KEY=your_32_byte_encryption_key
ENCRYPTION_IV=your_16_byte_initialization_vector

# API Keys
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
SENTRY_DSN=https://xxxxxxxxx@sentry.io/xxxxxx

// 📁 lib/encryption.js
// Environment Variables Encryption

import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

if (!ENCRYPTION_KEY) {
  throw new Error('ENCRYPTION_KEY environment variable is required');
}

// Generate encryption key from password
function getKey(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256');
}

// Encrypt sensitive data
export function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = getKey(ENCRYPTION_KEY, salt);
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const tag = cipher.getAuthTag();
  
  // Combine salt, iv, tag, and encrypted data
  return Buffer.concat([
    salt,
    iv,
    tag,
    Buffer.from(encrypted, 'hex')
  ]).toString('base64');
}

// Decrypt sensitive data
export function decrypt(encryptedData) {
  const buffer = Buffer.from(encryptedData, 'base64');
  
  const salt = buffer.subarray(0, SALT_LENGTH);
  const iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = buffer.subarray(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  
  const key = getKey(ENCRYPTION_KEY, salt);
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  
  let decrypted = decipher.update(encrypted.toString('hex'), 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Mask sensitive data in logs
export function maskSensitiveData(data, fields = ['password', 'token', 'secret', 'key']) {
  const masked = { ...data };
  
  fields.forEach(field => {
    if (masked[field]) {
      masked[field] = '********';
    }
  });
  
  return masked;
}`,

    // 6. MongoDB Injection Prevention
    mongoSecurity: `// 📁 lib/database.js
// MongoDB Injection Prevention

import mongoose from 'mongoose';
import sanitize from 'mongo-sanitize';

// Sanitize middleware
function sanitizeData(schema) {
  schema.pre('save', function(next) {
    // Sanitize all string fields
    const sanitizeObject = (obj) => {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'string') {
          obj[key] = sanitize(obj[key]);
        } else if (Array.isArray(obj[key])) {
          obj[key] = obj[key].map(item => {
            if (typeof item === 'string') return sanitize(item);
            if (typeof item === 'object') return sanitizeObject(item);
            return item;
          });
        } else if (obj[key] && typeof obj[key] === 'object') {
          obj[key] = sanitizeObject(obj[key]);
        }
      });
      return obj;
    };
    
    this._doc = sanitizeObject(this._doc);
    next();
  });
}

// Apply sanitization to all schemas
mongoose.plugin(sanitizeData);

// Schema with validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9\\s\\u0600-\\u06FF]+$/.test(v);
      },
      message: 'صرف حروف، اعداد اور خالی جگہ'
    }
  },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(v) {
        return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v);
      },
      message: 'درست ای میل درج کریں'
    }
  },
  
  password: {
    type: String,
    required: true,
    select: false // Never include in queries by default
  },
  
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
});

// Query middleware to prevent injection
userSchema.pre('find', function() {
  const query = this.getQuery();
  this.setQuery(sanitize(query));
});

userSchema.pre('findOne', function() {
  const query = this.getQuery();
  this.setQuery(sanitize(query));
});

userSchema.pre('updateOne', function() {
  const query = this.getQuery();
  const update = this.getUpdate();
  this.setQuery(sanitize(query));
  this.setUpdate(sanitize(update));
});

// Sanitize function
function sanitize(input) {
  if (typeof input === 'string') {
    // Remove $ operators
    return input.replace(/\\$/g, '');
  }
  
  if (Array.isArray(input)) {
    return input.map(item => sanitize(item));
  }
  
  if (input && typeof input === 'object') {
    const sanitized = {};
    Object.keys(input).forEach(key => {
      // Remove keys starting with $
      if (!key.startsWith('$')) {
        sanitized[key] = sanitize(input[key]);
      }
    });
    return sanitized;
  }
  
  return input;
}

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      minPoolSize: 2,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      retryReads: true
    });
    
    console.log('✅ MongoDB Connected');
    
    // Security configurations
    mongoose.set('debug', process.env.NODE_ENV === 'development');
    mongoose.set('sanitizeFilter', true);
    mongoose.set('strictQuery', true);
    
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
}`,

    // 7. File Upload Security
    fileUploadSecurity: `// 📁 lib/upload.js
// Secure File Upload System

import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { createHash } from 'crypto';
import { promises as fs } from 'fs';
import mime from 'mime-types';

// Allowed file types
const ALLOWED_MIME_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'audio/mpeg': 'mp3',
  'audio/wav': 'wav'
};

// File size limits (in bytes)
const MAX_FILE_SIZES = {
  image: 5 * 1024 * 1024, // 5MB
  video: 100 * 1024 * 1024, // 100MB
  audio: 50 * 1024 * 1024, // 50MB
  document: 10 * 1024 * 1024 // 10MB
};

// Generate secure filename
function generateSecureFilename(originalname) {
  const timestamp = Date.now();
  const random = crypto.randomBytes(16).toString('hex');
  const ext = path.extname(originalname);
  const hash = createHash('sha256')
    .update(\`\${timestamp}-\${random}-\${originalname}\`)
    .digest('hex')
    .substring(0, 16);
  
  return \`\${hash}-\${timestamp}\${ext}\`;
}

// Scan file for malware (placeholder - integrate with ClamAV or similar)
async function scanFile(filepath) {
  // Implement malware scanning here
  // Example: await clamav.scan(filepath);
  return true;
}

// Validate file
async function validateFile(file, type) {
  // Check file size
  const maxSize = MAX_FILE_SIZES[type] || MAX_FILE_SIZES.document;
  if (file.size > maxSize) {
    throw new Error(\`فائل کا سائز \${maxSize / 1024 / 1024}MB سے زیادہ ہے\`);
  }
  
  // Check mime type
  if (!ALLOWED_MIME_TYPES[file.mimetype]) {
    throw new Error('فائل کی قسم مجاز نہیں ہے');
  }
  
  // Scan for malware
  const isClean = await scanFile(file.path);
  if (!isClean) {
    throw new Error('فائل میں ممکنہ خطرہ پایا گیا');
  }
  
  return true;
}

// Multer configuration
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let uploadDir = 'uploads/';
    
    // Determine subdirectory based on file type
    if (file.mimetype.startsWith('image/')) {
      uploadDir += 'images';
    } else if (file.mimetype.startsWith('video/')) {
      uploadDir += 'videos';
    } else if (file.mimetype.startsWith('audio/')) {
      uploadDir += 'audio';
    } else {
      uploadDir += 'documents';
    }
    
    // Create directory if it doesn't exist
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Directory creation error:', error);
    }
    
    cb(null, uploadDir);
  },
  
  filename: (req, file, cb) => {
    const secureName = generateSecureFilename(file.originalname);
    cb(null, secureName);
  }
});

const fileFilter = (req, file, cb) => {
  if (ALLOWED_MIME_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('فائل کی قسم مجاز نہیں ہے'), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZES.document,
    files: 5 // Maximum 5 files per request
  }
});

// Secure file upload handler
export async function handleFileUpload(file, type) {
  try {
    await validateFile(file, type);
    
    // Generate file metadata
    const fileInfo = {
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: \`/uploads/\${file.filename}\`,
      hash: await calculateFileHash(file.path),
      uploadedAt: new Date(),
      uploadedBy: req.user?.id
    };
    
    return fileInfo;
  } catch (error) {
    // Clean up on error
    await fs.unlink(file.path).catch(console.error);
    throw error;
  }
}

// Calculate file hash for integrity
async function calculateFileHash(filepath) {
  const hash = createHash('sha256');
  const fileBuffer = await fs.readFile(filepath);
  hash.update(fileBuffer);
  return hash.digest('hex');
}`,

    // 8. JWT Security
    jwtSecurity: `// 📁 lib/jwt.js
// JWT Security Best Practices

import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Token blacklist (store in Redis for production)
const tokenBlacklist = new Set();

// Generate access token (short-lived)
export function generateAccessToken(user) {
  const payload = {
    userId: user.id,
    email: user.email,
    role: user.role,
    permissions: user.permissions || [],
    jti: randomBytes(16).toString('hex') // JWT ID for blacklisting
  };
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '15m', // Short expiration
    issuer: 'lms',
    audience: 'lms-users',
    algorithm: 'HS256'
  });
}

// Generate refresh token (long-lived)
export function generateRefreshToken(user) {
  const payload = {
    userId: user.id,
    jti: randomBytes(16).toString('hex'),
    type: 'refresh'
  };
  
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: '7d', // Long expiration
    issuer: 'lms',
    audience: 'lms-users',
    algorithm: 'HS256'
  });
}

// Verify access token
export function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'lms',
      audience: 'lms-users'
    });
    
    // Check if token is blacklisted
    if (tokenBlacklist.has(decoded.jti)) {
      throw new Error('Token has been revoked');
    }
    
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Verify refresh token
export function verifyRefreshToken(token) {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET, {
      issuer: 'lms',
      audience: 'lms-users'
    });
    
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    
    if (tokenBlacklist.has(decoded.jti)) {
      throw new Error('Token has been revoked');
    }
    
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

// Refresh token endpoint
export async function refreshAccessToken(refreshToken) {
  const { valid, decoded, error } = verifyRefreshToken(refreshToken);
  
  if (!valid) {
    throw new Error(error || 'Invalid refresh token');
  }
  
  // Get user from database
  const user = await User.findById(decoded.userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Generate new tokens
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);
  
  // Revoke old refresh token
  revokeToken(decoded.jti);
  
  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
}

// Revoke token (logout)
export function revokeToken(jti) {
  tokenBlacklist.add(jti);
  // In production, store in Redis with expiration
  setTimeout(() => tokenBlacklist.delete(jti), 7 * 24 * 60 * 60 * 1000); // 7 days
}

// JWT Middleware
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }
  
  const { valid, decoded, error } = verifyAccessToken(token);
  
  if (!valid) {
    return res.status(403).json({
      success: false,
      message: error || 'Invalid token'
    });
  }
  
  req.user = decoded;
  next();
}

// Role-based authorization
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this resource'
      });
    }
    
    next();
  };
}`,

    // Security Checklist
    securityChecklist: `# 📋 Security Checklist
# مکمل سیکیورٹی چیک لسٹ

## 🟢 ضروری اقدامات
- [ ] HTTPS فعال کریں (SSL/TLS)
- [ ] ماحولی متغیرات محفوظ کریں (.env)
- [ ] Rate limiting سیٹ اپ کریں
- [ ] Input validation مکمل کریں
- [ ] XSS سے بچاؤ کے اقدامات
- [ ] CSRF protection
- [ ] SQL/NoSQL injection سے بچاؤ
- [ ] Secure headers (Helmet.js)
- [ ] Password hashing (bcrypt)
- [ ] JWT security best practices
- [ ] File upload security
- [ ] Session management

## 🟡 اعلیٰ سطح کی سیکیورٹی
- [ ] 2FA (Two Factor Authentication)
- [ ] Security headers reporting
- [ ] API rate limiting per user
- [ ] IP blocking for suspicious activity
- [ ] Audit logging
- [ ] Data encryption at rest
- [ ] Backup encryption
- [ ] Security monitoring (Sentry)
- [ ] Regular security updates
- [ ] Penetration testing

## 🟠 ایڈوانسڈ سیکیورٹی
- [ ] Web Application Firewall (WAF)
- [ ] DDoS protection
- [ ] Security Information and Event Management (SIEM)
- [ ] Intrusion Detection System (IDS)
- [ ] Security Orchestration
- [ ] Zero-trust architecture
- [ ] Blockchain-based verification
- [ ] Biometric authentication
- [ ] Hardware security keys

## 🔴 ایمرجنسی رسپانس
- [ ] Incident response plan
- [ ] Data breach notification procedure
- [ ] Backup restoration drill
- [ ] Security patch management
- [ ] Disaster recovery plan
- [ ] Business continuity plan`,
  };

  // ============================================
  // حصہ 2: SEO (سرچ انجن آپٹیمائزیشن) - مکمل کوڈ
  // ============================================

  const seoCode = {
    // Meta Tags & Open Graph
    metaTags: `// 📁 components/SEO/MetaTags.jsx
// Meta Tags & Open Graph - مکمل SEO کنفیگریشن

import Head from 'next/head';
import { useRouter } from 'next/router';

export default function MetaTags({
  title = 'پاکستان ایل ایم ایس - آن لائن تعلیم کا نیا دور',
  description = 'پاکستان کا پہلا اردو لرننگ مینجمنٹ سسٹم۔ مفت کورسز، سرٹیفیکیشن، اور جدید تعلیمی وسائل۔',
  keywords = 'LMS, اردو کورسز, آن لائن تعلیم, پاکستان, مفت کورسز',
  author = 'پاکستان ایل ایم ایس',
  image = '/og-image.jpg',
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags = []
}) {
  const router = useRouter();
  const canonicalUrl = \`https://yourlms.com\${router.asPath}\`;
  
  // Generate JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    headline: title,
    description: description,
    image: image.startsWith('http') ? image : \`https://yourlms.com\${image}\`,
    author: {
      '@type': 'Organization',
      name: author
    },
    publisher: {
      '@type': 'Organization',
      name: 'پاکستان ایل ایم ایس',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourlms.com/logo.png'
      }
    },
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    keywords: keywords,
    inLanguage: 'ur',
    isFamilyFriendly: true,
    copyrightYear: new Date().getFullYear(),
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://yourlms.com/search?q={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };

  // BreadcrumbList structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: generateBreadcrumbs(router.asPath).map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: \`https://yourlms.com\${item.path}\`
    }))
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="revisit-after" content="7 days" />
      <meta name="language" content="urdu" />
      <meta name="geo.region" content="PK" />
      <meta name="geo.placename" content="Pakistan" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="پاکستان ایل ایم ایس" />
      <meta property="og:locale" content="ur_PK" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@pakistanlms" />
      <meta name="twitter:creator" content="@pakistanlms" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Article specific meta */}
      {type === 'article' && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:modified_time" content={modifiedTime} />
          <meta property="article:author" content={author} />
          <meta property="article:section" content={section} />
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      {/* Alternate language versions */}
      <link rel="alternate" href={canonicalUrl} hrefLang="ur" />
      <link rel="alternate" href={canonicalUrl.replace('/ur/', '/en/')} hrefLang="en" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
    </Head>
  );
}

// Generate breadcrumbs from path
function generateBreadcrumbs(path) {
  const parts = path.split('/').filter(Boolean);
  const breadcrumbs = [];
  let currentPath = '';
  
  parts.forEach(part => {
    currentPath += \`/\${part}\`;
    let name = part.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    
    // Urdu translation
    const translations = {
      courses: 'کورسز',
      about: 'ہمارے بارے میں',
      contact: 'رابطہ کریں',
      blog: 'بلاگ',
      'my-courses': 'میرے کورسز',
      dashboard: 'ڈیش بورڈ'
    };
    
    breadcrumbs.push({
      name: translations[part] || name,
      path: currentPath
    });
  });
  
  return breadcrumbs;
}`,

    // Sitemap Generation
    sitemap: `// 📁 scripts/generate-sitemap.js
// Sitemap Generator for Next.js

import fs from 'fs';
import path from 'path';
import { globby } from 'globby';
import prettier from 'prettier';

const SITE_URL = 'https://yourlms.com';
const PAGES_DIR = path.join(process.cwd(), 'pages');
const APP_DIR = path.join(process.cwd(), 'app');

async function generateSitemap() {
  // Get all pages (Pages Router)
  const pages = await globby([
    'pages/**/*.js',
    'pages/**/*.jsx',
    'pages/**/*.tsx',
    '!pages/_*.js',
    '!pages/api',
    '!pages/404.js',
    '!pages/500.js'
  ]);

  // Get all app routes (App Router)
  const appRoutes = await globby([
    'app/**/page.js',
    'app/**/page.jsx',
    'app/**/page.tsx',
    '!app/api/**',
    '!app/**/_*'
  ]);

  const allRoutes = [...pages, ...appRoutes];

  const sitemap = \`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml"
            xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      \${allRoutes
        .map(route => {
          const path = route
            .replace('pages', '')
            .replace('app', '')
            .replace('/page', '')
            .replace(/\\.(js|jsx|tsx)$/, '')
            .replace(/\\\\/g, '/');
          
          const url = \`\${SITE_URL}\${path === '/index' ? '' : path}\`;
          const lastModified = new Date().toISOString();
          const changeFreq = getChangeFrequency(path);
          const priority = getPriority(path);
          
          return \`
            <url>
              <loc>\${url}</loc>
              <lastmod>\${lastModified}</lastmod>
              <changefreq>\${changeFreq}</changefreq>
              <priority>\${priority}</priority>
              <xhtml:link 
                rel="alternate" 
                hreflang="ur" 
                href="\${url}" 
              />
              <xhtml:link 
                rel="alternate" 
                hreflang="en" 
                href="\${url.replace('/ur/', '/en/')}" 
              />
              <xhtml:link 
                rel="alternate" 
                hreflang="x-default" 
                href="\${url}" 
              />
            </url>
          \`;
        })
        .join('')}
    </urlset>
  \`;

  // Get dynamic routes from database
  const dynamicRoutes = await getDynamicRoutes();
  
  const dynamicSitemap = \`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      \${dynamicRoutes
        .map(route => \`
          <url>
            <loc>\${SITE_URL}\${route.path}</loc>
            <lastmod>\${route.updatedAt || new Date().toISOString()}</lastmod>
            <changefreq>weekly</changefreq>
            <priority>0.7</priority>
          </url>
        \`)
        .join('')}
    </urlset>
  \`;

  // Format XML
  const formattedSitemap = await prettier.format(sitemap, {
    parser: 'html'
  });

  const formattedDynamicSitemap = await prettier.format(dynamicSitemap, {
    parser: 'html'
  });

  // Write sitemaps
  fs.writeFileSync('public/sitemap.xml', formattedSitemap);
  fs.writeFileSync('public/sitemap-dynamic.xml', formattedDynamicSitemap);
  
  // Generate sitemap index
  const sitemapIndex = \`
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <sitemap>
        <loc>\${SITE_URL}/sitemap.xml</loc>
        <lastmod>\${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>\${SITE_URL}/sitemap-dynamic.xml</loc>
        <lastmod>\${new Date().toISOString()}</lastmod>
      </sitemap>
    </sitemapindex>
  \`;
  
  fs.writeFileSync('public/sitemap-index.xml', sitemapIndex);
  
  console.log('✅ Sitemap generated successfully!');
}

// Get change frequency based on page type
function getChangeFrequency(path) {
  if (path.includes('/courses/')) return 'weekly';
  if (path.includes('/blog/')) return 'daily';
  if (path === '/') return 'daily';
  if (path.includes('/about') || path.includes('/contact')) return 'monthly';
  return 'weekly';
}

// Get priority based on page type
function getPriority(path) {
  if (path === '/') return '1.0';
  if (path.includes('/courses/')) return '0.9';
  if (path.includes('/blog/')) return '0.8';
  if (path.includes('/category/')) return '0.7';
  if (path.includes('/tag/')) return '0.6';
  return '0.5';
}

// Get dynamic routes from database
async function getDynamicRoutes() {
  // Fetch from database
  const courses = await Course.find({ status: 'published' }).select('slug updatedAt');
  const blogs = await Blog.find({ published: true }).select('slug updatedAt');
  const categories = await Category.find().select('slug');
  
  return [
    ...courses.map(c => ({ path: \`/courses/\${c.slug}\`, updatedAt: c.updatedAt })),
    ...blogs.map(b => ({ path: \`/blog/\${b.slug}\`, updatedAt: b.updatedAt })),
    ...categories.map(c => ({ path: \`/category/\${c.slug}\` }))
  ];
}

generateSitemap();

// 📁 next-sitemap.config.js
// Next.js Sitemap Configuration

module.exports = {
  siteUrl: 'https://yourlms.com',
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*', '/dashboard/*', '/api/*', '/404', '/500'],
  alternateRefs: [
    {
      href: 'https://yourlms.com/en',
      hreflang: 'en',
    },
    {
      href: 'https://yourlms.com/ur',
      hreflang: 'ur',
    }
  ],
  transform: async (config, path) => {
    // Custom transformation
    if (path.includes('/courses/')) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
        alternateRefs: config.alternateRefs
      };
    }
    
    if (path.includes('/blog/')) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.8,
        lastmod: new Date().toISOString()
      };
    }
    
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs
    };
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/dashboard', '/api', '/_next']
      }
    ],
    additionalSitemaps: [
      'https://yourlms.com/sitemap-dynamic.xml',
      'https://yourlms.com/sitemap-images.xml'
    ]
  }
}`,

    // Robots.txt
    robotsTxt: `# 📁 public/robots.txt
# Robots.txt for SEO

User-agent: *
Allow: /
Allow: /courses/
Allow: /blog/
Allow: /about/
Allow: /contact/
Allow: /faq/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*?*
Disallow: /*.json$
Disallow: /*.js$
Disallow: /*.css$
Disallow: /404
Disallow: /500

# Crawl-delay
Crawl-delay: 10

# Sitemap
Sitemap: https://yourlms.com/sitemap-index.xml
Sitemap: https://yourlms.com/sitemap-images.xml

# Google Image
User-agent: Googlebot-Image
Allow: /images/
Allow: /*.jpg$
Allow: /*.png$
Allow: /*.gif$
Allow: /*.webp$

# Google Video
User-agent: Googlebot-Video
Allow: /videos/
Allow: /*.mp4$
Allow: /*.webm$

# Google News
User-agent: Googlebot-News
Allow: /blog/

# Baidu (China)
User-agent: Baiduspider
Allow: /
Disallow: /admin/
Disallow: /dashboard/

# Bing
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /dashboard/

# Yandex
User-agent: Yandex
Allow: /
Disallow: /admin/
Disallow: /dashboard/

# DuckDuckGo
User-agent: DuckDuckBot
Allow: /

# Archive.org
User-agent: ia_archiver
Allow: /

# Sitemap for AI crawlers
User-agent: GPTBot
Allow: /
Disallow: /admin/
Disallow: /dashboard/

User-agent: ChatGPT-User
Allow: /
Disallow: /admin/
Disallow: /dashboard/

# Block bad bots
User-agent: *
Disallow: /wp-admin/
Disallow: /wordpress/
Disallow: /xmlrpc.php

# Host directive
Host: https://yourlms.com

# Noindex for certain pages
User-agent: *
Noindex: /admin/
Noindex: /dashboard/
Noindex: /api/
Noindex: /404
Noindex: /500`,

    // Structured Data (JSON-LD)
    structuredData: `// 📁 components/SEO/StructuredData.jsx
// Structured Data (JSON-LD) for Rich Snippets

import Head from 'next/head';

export function CourseStructuredData({ course }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'پاکستان ایل ایم ایس',
      sameAs: 'https://yourlms.com'
    },
    instructor: {
      '@type': 'Person',
      name: course.instructor.name,
      description: course.instructor.bio,
      image: course.instructor.image
    },
    courseCode: course._id,
    coursePrerequisites: course.prerequisites,
    educationalCredentialAwarded: 'Certificate of Completion',
    totalHistoricalEnrollment: course.enrollments,
    datePublished: course.createdAt,
    dateModified: course.updatedAt,
    timeRequired: \`P\${course.duration}H\`,
    offers: {
      '@type': 'Offer',
      price: course.price,
      priceCurrency: 'PKR',
      availability: 'https://schema.org/InStock',
      url: \`https://yourlms.com/courses/\${course.slug}\`
    },
    aggregateRating: course.ratings && {
      '@type': 'AggregateRating',
      ratingValue: course.ratings.average,
      reviewCount: course.ratings.count
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: \`P\${course.duration}H\`,
      instructor: {
        '@type': 'Person',
        name: course.instructor.name
      }
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function ArticleStructuredData({ article }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      url: \`https://yourlms.com/authors/\${article.author.slug}\`
    },
    publisher: {
      '@type': 'Organization',
      name: 'پاکستان ایل ایم ایس',
      logo: {
        '@type': 'ImageObject',
        url: 'https://yourlms.com/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': \`https://yourlms.com/blog/\${article.slug}\`
    },
    keywords: article.tags?.join(', '),
    articleSection: article.category,
    wordCount: article.wordCount,
    timeRequired: \`PT\${article.readTime}M\`
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function OrganizationStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'پاکستان ایل ایم ایس',
    url: 'https://yourlms.com',
    logo: 'https://yourlms.com/logo.png',
    sameAs: [
      'https://facebook.com/pakistanlms',
      'https://twitter.com/pakistanlms',
      'https://linkedin.com/company/pakistanlms',
      'https://youtube.com/@pakistanlms',
      'https://instagram.com/pakistanlms'
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+92-300-1234567',
        contactType: 'customer service',
        areaServed: 'PK',
        availableLanguage: ['Urdu', 'English']
      }
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'PK',
      addressRegion: 'Sindh',
      addressLocality: 'Karachi'
    },
    foundingDate: '2023',
    founders: [
      {
        '@type': 'Person',
        name: 'احمد رضا'
      }
    ],
    numberOfEmployees: 25,
    description: 'پاکستان کا پہلا اردو لرننگ مینجمنٹ سسٹم',
    award: 'Best Educational Platform 2024',
    brand: {
      '@type': 'Brand',
      name: 'Pakistan LMS'
    }
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function BreadcrumbStructuredData({ items }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function FAQStructuredData({ faqs }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}

export function LocalBusinessStructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'پاکستان ایل ایم ایس',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Main Street',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      postalCode: '74000',
      addressCountry: 'PK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.8607,
      longitude: 67.0011
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    telephone: '+92-300-1234567',
    email: 'info@yourlms.com'
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Head>
  );
}`,

    // Canonical URLs
    canonicalUrls: `// 📁 middleware/canonical.js
// Canonical URLs Middleware

import { NextResponse } from 'next/server';

export function canonicalMiddleware(request) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  
  // Remove trailing slash except for root
  if (pathname !== '/' && pathname.endsWith('/')) {
    url.pathname = pathname.slice(0, -1);
    return NextResponse.redirect(url, 301);
  }
  
  // Lowercase URLs (optional)
  if (pathname !== pathname.toLowerCase()) {
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 301);
  }
  
  // Add www to non-www (choose one)
  const host = request.headers.get('host');
  if (host && !host.startsWith('www.')) {
    url.host = \`www.\${host}\`;
    return NextResponse.redirect(url, 301);
  }
  
  return NextResponse.next();
}

// 📁 components/SEO/CanonicalUrl.jsx
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function CanonicalUrl() {
  const router = useRouter();
  const canonicalUrl = \`https://yourlms.com\${router.asPath.split('?')[0]}\`;
  
  return (
    <Head>
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Pagination Canonical */}
      {router.query.page && (
        <>
          {router.query.page > 1 ? (
            <>
              <link rel="prev" href={\`\${canonicalUrl}?page=\${parseInt(router.query.page) - 1}\`} />
              <link rel="canonical" href={\`\${canonicalUrl}?page=\${router.query.page}\`} />
            </>
          ) : (
            <link rel="canonical" href={canonicalUrl} />
          )}
          <link rel="next" href={\`\${canonicalUrl}?page=\${parseInt(router.query.page) + 1}\`} />
        </>
      )}
      
      {/* Noindex for filtered pages */}
      {Object.keys(router.query).length > 0 && !router.query.page && (
        <meta name="robots" content="noindex, follow" />
      )}
    </Head>
  );
}`,

    // Social Media Cards
    socialCards: `// 📁 components/SEO/SocialCards.jsx
// Social Media Cards for Facebook, Twitter, LinkedIn

import Head from 'next/head';

export function FacebookCard({ 
  title, 
  description, 
  image, 
  url,
  type = 'website',
  appId = '123456789',
  author,
  publishedTime
}) {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="پاکستان ایل ایم ایس" />
      <meta property="og:locale" content="ur_PK" />
      <meta property="fb:app_id" content={appId} />
      
      {author && <meta property="article:author" content={author} />}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
    </Head>
  );
}

export function TwitterCard({ 
  title, 
  description, 
  image, 
  cardType = 'summary_large_image',
  site = '@pakistanlms',
  creator = '@pakistanlms'
}) {
  return (
    <Head>
      <meta name="twitter:card" content={cardType} />
      <meta name="twitter:site" content={site} />
      <meta name="twitter:creator" content={creator} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:domain" content="yourlms.com" />
      
      {/* Twitter Player Card for videos */}
      {cardType === 'player' && (
        <>
          <meta name="twitter:player" content="https://yourlms.com/video-player" />
          <meta name="twitter:player:width" content="1280" />
          <meta name="twitter:player:height" content="720" />
          <meta name="twitter:player:stream" content="https://yourlms.com/video.mp4" />
          <meta name="twitter:player:stream:content_type" content="video/mp4" />
        </>
      )}
    </Head>
  );
}

export function LinkedInCard({ title, description, image, url }) {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta property="linkedin:card" content="summary_large_image" />
    </Head>
  );
}

export function PinterestCard({ title, description, image, url }) {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="pinterest:richpin" content="true" />
    </Head>
  );
}

export function WhatsAppCard({ title, description, image, url }) {
  return (
    <Head>
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="پاکستان ایل ایم ایس" />
    </Head>
  );
}`,

    // Performance Optimization
    performance: `// 📁 next.config.js
// Next.js Performance Optimization

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compression
  compress: true,
  
  // Image Optimization
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  
  // Bundle Optimization
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Caching
  generateEtags: true,
  poweredByHeader: false,
  
  // Performance
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  
  // Internationalization
  i18n: {
    locales: ['ur', 'en'],
    defaultLocale: 'ur',
    localeDetection: true,
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp|css|js)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
        ],
      },
    ];
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/courses/:slug',
        destination: '/course/:slug',
        permanent: true,
      },
    ];
  },
  
  // Webpack Configuration
  webpack: (config, { isServer }) => {
    // Optimize bundle
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      cacheGroups: {
        vendor: {
          test: /[\\\\/]node_modules[\\\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\\\/]node_modules[\\\\/](.*?)([\\\\/]|$)/
            )?.[1];
            return \`vendor.\${packageName.replace('@', '')}\`;
          },
        },
      },
    };
    
    return config;
  },
};

module.exports = nextConfig;

// 📁 components/Performance/LazyLoad.jsx
import { useState, useEffect, useRef } from 'react';

export function LazyImage({ src, alt, className, width, height, priority = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [priority]);
  
  return (
    <div ref={imgRef} className={\`relative \${className}\`} style={{ width, height }}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={\`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 \${isLoaded ? 'opacity-100' : 'opacity-0'}\`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}

export function LazyVideo({ src, poster, className }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' }
    );
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div ref={videoRef} className={className}>
      {isLoaded && (
        <video
          src={src}
          poster={poster}
          controls
          preload="none"
          className="w-full h-full"
        />
      )}
    </div>
  );
}`,

    // Mobile Friendliness
    mobileFriendly: `// 📁 styles/globals.css
/* Mobile-Friendly CSS */

/* Viewport Meta (already in _document.js) */
/* <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5"> */

/* Responsive Design */
:root {
  --container-padding: 1rem;
  --container-max-width: 1280px;
}

/* Mobile First Approach */
.container {
  width: 100%;
  padding-right: var(--container-padding);
  padding-left: var(--container-padding);
  margin-right: auto;
  margin-left: auto;
}

/* Responsive Breakpoints */
@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}

/* Responsive Typography */
html {
  font-size: 14px;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}

/* Fluid Typography */
h1 {
  font-size: clamp(1.5rem, 5vw, 2.5rem);
}

h2 {
  font-size: clamp(1.25rem, 4vw, 2rem);
}

h3 {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
}

/* Touch-friendly Elements */
button,
a,
input,
select,
textarea {
  min-height: 44px;
  min-width: 44px;
}

/* Prevent Text Zoom on Input Focus */
input[type="text"],
input[type="email"],
input[type="password"],
textarea {
  font-size: 16px;
}

/* Safe Areas for Notch Phones */
@supports (padding: max(0px)) {
  .safe-top {
    padding-top: env(safe-area-inset-top);
  }
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
  .safe-left {
    padding-left: env(safe-area-inset-left);
  }
  .safe-right {
    padding-right: env(safe-area-inset-right);
  }
}

/* Responsive Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  gap: 1rem;
}

/* Responsive Flexbox */
.flex-responsive {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-responsive > * {
  flex: 1 1 250px;
}

/* Mobile Menu */
.mobile-menu {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  max-width: 300px;
  height: 100vh;
  background: white;
  transition: left 0.3s ease;
  z-index: 1000;
}

.mobile-menu.open {
  left: 0;
}

@media (min-width: 768px) {
  .mobile-menu {
    position: static;
    width: auto;
    height: auto;
    background: transparent;
  }
}

/* Touch Carousel */
.carousel {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.carousel-item {
  scroll-snap-align: start;
}

/* Hide Scrollbar but Keep Functionality */
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

/* 📁 hooks/useMobileDetect.js */
import { useState, useEffect } from 'react';

export function useMobileDetect() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [orientation, setOrientation] = useState('portrait');
  
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
      setOrientation(height > width ? 'portrait' : 'landscape');
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);
  
  return { isMobile, isTablet, isDesktop, orientation };
}`,

    // SEO Checklist
    seoChecklist: `# 📋 SEO Checklist
# مکمل SEO چیک لسٹ

## 🟢 بنیادی SEO
- [ ] Meta titles (50-60 characters)
- [ ] Meta descriptions (150-160 characters)
- [ ] Canonical URLs
- [ ] Heading tags (H1, H2, H3)
- [ ] Image alt text
- [ ] URL structure
- [ ] Internal linking
- [ ] XML sitemap
- [ ] Robots.txt
- [ ] 404 page
- [ ] SSL certificate
- [ ] Mobile friendly

## 🟡 ایڈوانسڈ SEO
- [ ] Schema markup (JSON-LD)
- [ ] Open Graph tags
- [ ] Twitter cards
- [ ] Breadcrumbs
- [ ] Pagination
- [ ] Hreflang tags
- [ ] Structured data for rich snippets
- [ ] FAQ schema
- [ ] How-to schema
- [ ] Review schema
- [ ] Article schema
- [ ] Course schema

## 🟠 ٹیکنیکل SEO
- [ ] Page speed (Core Web Vitals)
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] Image optimization
- [ ] Lazy loading
- [ ] Code splitting
- [ ] Cache headers
- [ ] GZIP compression
- [ ] CDN usage
- [ ] AMP (optional)
- [ ] PWA support

## 🔴 لوکل SEO
- [ ] Google My Business
- [ ] Local business schema
- [ ] NAP consistency
- [ ] Local citations
- [ ] Reviews management
- [ ] Local keywords
- [ ] Maps integration

## 📊 کنٹینٹ SEO
- [ ] Keyword research
- [ ] Content freshness
- [ ] Readability
- [ ] Internal linking
- [ ] External linking
- [ ] Multimedia content
- [ ] User engagement
- [ ] Bounce rate reduction
- [ ] Dwell time improvement

## 🔧 مانیٹرنگ ٹولز
- [ ] Google Search Console
- [ ] Google Analytics
- [ ] Bing Webmaster Tools
- [ ] Ahrefs/Semrush
- [ ] Screaming Frog
- [ ] GTmetrix
- [ ] PageSpeed Insights
- [ ] Mobile-Friendly Test

## 📈 آف پیج SEO
- [ ] Backlink profile
- [ ] Social signals
- [ ] Brand mentions
- [ ] Guest posting
- [ ] Influencer outreach
- [ ] Directory submissions
- [ ] Forum participation

## 🎯 یوزر ایکسپیریئنس
- [ ] Easy navigation
- [ ] Clear CTAs
- [ ] Fast loading
- [ ] No intrusive interstitials
- [ ] Readable fonts
- [ ] Contrast ratio
- [ ] Clickable elements size
- [ ] Form usability`,
  };

  // ============================================
  // حصہ 3: مکمل پروجیکٹ
  // ============================================

  const projectCode = {
    // Project Structure Overview
    projectStructure: `# 📁 LMS Project Structure
# مکمل پروجیکٹ ڈھانچہ

📦 lms-project
├── 📂 app/                           # Next.js App Router
│   ├── 📂 (auth)/                     # Authentication routes
│   │   ├── 📂 login/
│   │   │   └── page.js                # Login page
│   │   ├── 📂 signup/
│   │   │   └── page.js                # Signup page
│   │   └── 📂 reset-password/
│   │       └── page.js                # Reset password page
│   │
│   ├── 📂 (dashboard)/                 # Protected dashboard routes
│   │   ├── 📂 student/
│   │   │   └── page.js                # Student dashboard
│   │   ├── 📂 instructor/
│   │   │   └── page.js                # Instructor dashboard
│   │   └── 📂 admin/
│   │       └── page.js                # Admin dashboard
│   │
│   ├── 📂 courses/                     # Course pages
│   │   ├── page.js                     # Course listing
│   │   ├── [slug]/
│   │   │   └── page.js                 # Single course
│   │   └── 📂 [courseId]/
│   │       └── 📂 lectures/
│   │           └── [lectureId]/
│   │               └── page.js         # Single lecture
│   │
│   ├── 📂 api/                         # API routes
│   │   ├── 📂 auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.js            # NextAuth configuration
│   │   ├── 📂 courses/
│   │   │   ├── route.js                 # GET, POST courses
│   │   │   └── [courseId]/
│   │   │       └── route.js             # GET, PUT, DELETE course
│   │   ├── 📂 users/
│   │   │   └── route.js                 # User management
│   │   ├── 📂 enrollments/
│   │   │   └── route.js                 # Enrollment handling
│   │   └── 📂 payments/
│   │       └── route.js                 # Payment processing
│   │
│   ├── layout.js                        # Root layout
│   ├── page.js                          # Home page
│   ├── not-found.js                     # 404 page
│   ├── error.js                         # Error boundary
│   └── loading.js                        # Loading UI
│
├── 📂 components/                       # React components
│   ├── 📂 ui/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── Spinner.jsx
│   │
│   ├── 📂 layout/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Sidebar.jsx
│   │   └── RightSidebar.jsx
│   │
│   ├── 📂 courses/
│   │   ├── CourseCard.jsx
│   │   ├── CourseList.jsx
│   │   ├── CourseProgress.jsx
│   │   └── CourseReview.jsx
│   │
│   ├── 📂 auth/
│   │   ├── LoginForm.jsx
│   │   ├── SignupForm.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── 📂 dashboard/
│   │   ├── StatsCards.jsx
│   │   ├── ActivityFeed.jsx
│   │   └── Chart.jsx
│   │
│   ├── 📂 chat/
│   │   ├── ChatWindow.jsx
│   │   ├── MessageList.jsx
│   │   └── MessageInput.jsx
│   │
│   ├── 📂 notifications/
│   │   ├── NotificationBell.jsx
│   │   └── NotificationList.jsx
│   │
│   └── 📂 seo/
│       ├── MetaTags.jsx
│       ├── StructuredData.jsx
│       └── SocialCards.jsx
│
├── 📂 lib/                            # Utilities & configurations
│   ├── database.js                     # MongoDB connection
│   ├── auth.js                         # Authentication utilities
│   ├── jwt.js                          # JWT handling
│   ├── validation.js                    # Input validation
│   ├── encryption.js                    # Data encryption
│   ├── upload.js                        # File upload handling
│   ├── email.js                         # Email service
│   ├── payment.js                       # Payment integration
│   ├── cache.js                         # Redis cache
│   ├── logger.js                        # Logging
│   └── constants.js                     # Constants
│
├── 📂 models/                          # MongoDB models
│   ├── User.js
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Lecture.js
│   ├── Category.js
│   ├── Order.js
│   ├── Payment.js
│   ├── Review.js
│   ├── Notification.js
│   ├── ChatMessage.js
│   └── Activity.js
│
├── 📂 middleware/                      # Custom middleware
│   ├── auth.js                         # Authentication middleware
│   ├── rateLimiter.js                  # Rate limiting
│   ├── csrf.js                         # CSRF protection
│   ├── helmet.js                       # Security headers
│   └── logger.js                       # Request logging
│
├── 📂 hooks/                           # Custom React hooks
│   ├── useAuth.js
│   ├── useSocket.js
│   ├── useMobile.js
│   ├── useLocalStorage.js
│   └── useDebounce.js
│
├── 📂 context/                         # React context
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   ├── NotificationContext.jsx
│   └── SocketContext.jsx
│
├── 📂 public/                          # Static files
│   ├── images/
│   ├── fonts/
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
│
├── 📂 styles/                          # Styles
│   ├── globals.css
│   ├── tailwind.css
│   └── components/
│
├── 📂 scripts/                         # Utility scripts
│   ├── generate-sitemap.js
│   ├── backup-db.js
│   ├── seed-db.js
│   └── deploy.sh
│
├── 📂 tests/                           # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── .env.local                          # Environment variables
├── .env.example                        # Example env file
├── .gitignore
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── README.md
└── middleware.ts                       # Next.js middleware`,

    // Deployment Checklist
    deploymentChecklist: `# 📋 Deployment Checklist
# پروڈکشن ڈیپلائمنٹ چیک لسٹ

## 🟢 ڈیپلائمنٹ سے پہلے
- [ ] تمام ٹیسٹ پاس کریں
- [ ] کوڈ لِنٹنگ چیک کریں
- [ ] TypeScript چیک کریں
- [ ] بلڈ لوکل طور پر ٹیسٹ کریں
- [ ] ماحولی متغیرات چیک کریں
- [ ] ڈیٹا بیس بیک اپ لیں
- [ ] کنفیگریشن فائلیں چیک کریں
- [ ] اسٹیٹک فائلیں اپ ڈیٹ کریں
- [ ] سرٹیفکیٹ چیک کریں
- [ ] DNS کنفیگریشن

## 🟡 ڈیپلائمنٹ کے دوران
- [ ] ڈیٹا بیس مائیگریشن
- [ ] اسٹیٹک فائلیں اپ لوڈ
- [ ] کنٹینرز بلڈ
- [ ] سروسز شروع
- [ ] ہیلتھ چیک
- [ ] لاگز مانیٹر
- [ ] سیکیورٹی گروپس
- [ ] لوڈ بیلنسر
- [ ] CDN پُرگے
- [ ] کیش وارم اپ

## 🟠 ڈیپلائمنٹ کے بعد
- [ ] ہیلتھ چیک ویریفائی
- [ ] API اینڈپوائنٹس ٹیسٹ
- [ ] ڈیٹا بیس کنکشن
- [ ] ای میل سروس
- [ ] ادائیگی گیٹ وے
- [ ] فائل اپ لوڈ
- [ ] ساکٹ کنکشن
- [ ] SSL سرٹیفکیٹ
- [ ] ریڈائریکٹس
- [ ] اینالیٹکس

## 🔴 مانیٹرنگ سیٹ اپ
- [ ] سرور مانیٹرنگ
- [ ] ڈیٹا بیس مانیٹرنگ
- [ ] API مانیٹرنگ
- [ ] کارکردگی مانیٹرنگ
- [ ] سیکیورٹی مانیٹرنگ
- [ ] یوزر ایکٹیویٹی
- [ ] ایرر ٹریکنگ
- [ ] لاگ مینجمنٹ
- [ ] الرٹ سیٹ اپ
- [ ] بیک اپ مانیٹرنگ

## 🟢 بیک اپ سٹریٹجی
- [ ] ڈیٹا بیس بیک اپ
- [ ] فائل سٹوریج بیک اپ
- [ ] کنفیگریشن بیک اپ
- [ ] آٹومیٹک بیک اپ
- [ ] بیک اپ ویریفیکیشن
- [ ] ڈیزاسٹر ریکوری
- [ ] پوائنٹ ان ٹائم ریکوری

## 🟡 سیکیورٹی چیک
- [ ] HTTPS/SSL
- [ ] ہیڈرز سیکیورٹی
- [ ] ریٹ لمٹنگ
- [ ] CSRF پروٹیکشن
- [ ] XSS پروٹیکشن
- [ ] SQL انجیکشن
- [ ] فائل اپ لوڈ سیکیورٹی
- [ ] ایکسس کنٹرول
- [ ] سیشن مینجمنٹ
- [ ] API کیز

## 🟠 پرفارمنس چیک
- [ ] پیج سپیڈ
- [ ] کور ویب ویٹلز
- [ ] امیج آپٹیمائزیشن
- [ ] کیشنگ
- [ ] CDN
- [ ] کمپریشن
- [ ] کوڈ سپلٹنگ
- [ ] لازی لوڈنگ
- [ ] ڈیٹا بیس انڈیکسز
- [ ] کیوری آپٹیمائزیشن

## 📊 رول بیک پلان
- [ ] پرانا ورژن محفوظ
- [ ] ڈیٹا بیس رول بیک
- [ ] فائل رول بیک
- [ ] رول بیک ٹیسٹ
- [ ] کمیونیکیشن پلان

## 🎯 گو/نو-گو معیار
- [ ] تمام کریشیل بگز فکس
- [ ] کارکردگی معیار پر
- [ ] سیکیورٹی معیار پر
- [ ] یوزر ایکسپیریئنس معیار پر
- [ ] کمپلائنس معیار پر
- [ ] بجٹ میں
- [ ] ٹائم لائن میں

## 🚀 ڈیپلائمنٹ کمانڈز
\`\`\`bash
# Vercel
vercel --prod

# Docker
docker build -t lms-app .
docker tag lms-app registry.example.com/lms-app
docker push registry.example.com/lms-app
docker-compose up -d

# Database
npm run migrate
npm run seed

# Static files
aws s3 sync ./public s3://lms-static

# Cache
curl -X POST https://api.example.com/cache/warm

# Health check
curl https://yourlms.com/api/health

# Monitoring
curl https://api.example.com/monitor/start
\`\`\``,

    // Maintenance Guide
    maintenanceGuide: `# 📝 Maintenance Guide
# دیکھ بھال گائیڈ

## روزانہ کی دیکھ بھال

### صبح
- [ ] سرور لاگز چیک کریں
- [ ] ڈیٹا بیس کنکشنز چیک کریں
- [ ] کیشے کی کارکردگی چیک کریں
- [ ] API ریسپانس ٹائم چیک کریں
- [ ] سیکیورٹی الرٹس چیک کریں

### شام
- [ ] ڈیلی بیک اپ لیں
- [ ] کارکردگی رپورٹ چیک کریں
- [ ] صارفین کے مسائل حل کریں
- [ ] اپ ڈیٹس انسٹال کریں

## ہفتہ وار دیکھ بھال

### اتوار
- [ ] ڈیٹا بیس آپٹیمائزیشن
  \`\`\`bash
  # MongoDB
  mongodump --db lms --out /backup/weekly/\$(date +%Y-%m-%d)
  mongorestore --drop /backup/weekly/latest
  \`\`\`

### پیر
- [ ] لاگ روٹیشن
  \`\`\`bash
  logrotate /etc/logrotate.d/lms
  journalctl --vacuum-size=200M
  \`\`\`

### منگل
- [ ] سیکیورٹی اپ ڈیٹس
  \`\`\`bash
  npm audit fix
  npm update
  docker pull node:18-alpine
  \`\`\`

### بدھ
- [ ] کارکردگی ٹیسٹنگ
  \`\`\`bash
  npx lighthouse https://yourlms.com --view
  webpagetest https://yourlms.com
  \`\`\`

### جمعرات
- [ ] بیک اپ ویریفیکیشن
  \`\`\`bash
  # Restore test
  mongorestore --db lms_test /backup/latest
  npm run test:db
  \`\`\`

### جمعہ
- [ ] کیچے کلیئرنگ
  \`\`\`bash
  redis-cli FLUSHALL
  curl -X POST https://yourlms.com/api/cache/clear
  \`\`\`

### ہفتہ
- [ ] رپورٹنگ
  \`\`\`bash
  node scripts/generate-report.js
  npm run analytics:export
  \`\`\`

## ماہانہ دیکھ بھال

### ہر مہینے کی پہلی تاریخ
- [ ] ڈیٹا بیس اپ گریڈ
- [ ] سرور اپ گریڈ
- [ ] سیکیورٹی آڈٹ
- [ ] پرفارمنس آڈٹ
- [ ] کوسٹ آپٹیمائزیشن

### ہر مہینے کی 15 تاریخ
- [ ] فیچر اپ ڈیٹس
- [ ] یوزر فیڈ بیک
- [ ] اے/بی ٹیسٹنگ
- [ ] کنٹینٹ اپ ڈیٹس

## سالانہ دیکھ بھال

### Q1 (جنوری-مارچ)
- [ ] میجر ورژن اپ گریڈ
- [ ] آرکیٹیکچر ریویو
- [ ] سیکیورٹی آڈٹ
- [ ] لائسنس ریویو

### Q2 (اپریل-جون)
- [ ] پرفارمنس آپٹیمائزیشن
- [ ] یوزر ایکسپیریئنس ریویو
- [ ] فیچر پلاننگ
- [ ] بجٹ پلاننگ

### Q3 (جولائی-ستمبر)
- [ ] اسکیلنگ پلاننگ
- [ ] ڈیزاسٹر ریکوری ڈرل
- [ ] کمپلائنس چیک
- [ ] ڈیٹا پرائیویسی ریویو

### Q4 (اکتوبر-دسمبر)
- [ ] انوینٹری
- [ ] ڈاکومنٹیشن اپ ڈیٹ
- [ ] ٹریننگ
- [ ] نیکسٹ ایئر پلاننگ

## ایمرجنسی رسپانس

### کریش
1. **فوری رسپانس**
   \`\`\`bash
   # Check logs
   docker logs app --tail=100
   journalctl -u lms -n 50
   
   # Restart services
   docker-compose restart
   systemctl restart lms
   
   # Rollback if needed
   docker-compose down
   docker-compose up -d --scale app=2
   \`\`\`

2. **تحقیقات**
   - لاگز کا تجزیہ
   - میٹرکس چیک
   - یوزر رپورٹس
   - مانیٹرنگ الرٹس

3. **حل**
   - بگ فکس
   - پیچ ڈیپلائمنٹ
   - ڈیٹا ریکوری
   - یوزر نوٹیفکیشن

4. **پوسٹ مارٹم**
   - رپورٹ تیار کریں
   - سبق سیکھیں
   - فیوچر پریونشن
   - ڈاکومنٹیشن اپ ڈیٹ

### سیکیورٹی بریچ
1. **فوری اقدامات**
   - سسٹم آئسولیشن
   - ایکسیس ریووکیشن
   - لاگز محفوظ کریں
   - یوزر نوٹیفکیشن

2. **تحقیقات**
   - فورینسک تجزیہ
   - ویب لاگز چیک
   - ڈیٹا بیس آڈٹ
   - نیٹ ورک لاگز

3. **بحالی**
   - کلیئن انسٹال
   - ڈیٹا ریکوری
   - پاس ورڈ ری سیٹ
   - سیکیورٹی اپ گریڈ

4. **رپورٹنگ**
   - قانونی تقاضے
   - صارفین کو مطلع کریں
   - ریگولیٹرز کو رپورٹ
   - میڈیا مینجمنٹ

## باقاعدہ کام

### ڈیٹا بیس آپٹیمائزیشن
\`\`\`javascript
// db-maintenance.js
const { connectDB } = require('./lib/database');

async function optimizeDatabase() {
  await connectDB();
  
  // Rebuild indexes
  await db.collection('users').reIndex();
  
  // Compact collections
  await db.command({ compact: 'users' });
  
  // Remove old logs
  await db.collection('logs').deleteMany({
    createdAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
  });
  
  console.log('Database optimized');
}
\`\`\`

### لاگ مینجمنٹ
\`\`\`javascript
// log-rotation.js
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function rotateLogs() {
  const logDir = '/var/log/lms';
  const files = fs.readdirSync(logDir);
  
  files.forEach(file => {
    if (file.endsWith('.log')) {
      const filePath = path.join(logDir, file);
      const stats = fs.statSync(filePath);
      
      // Rotate logs older than 7 days
      if (Date.now() - stats.mtime > 7 * 24 * 60 * 60 * 1000) {
        const gzip = zlib.createGzip();
        const input = fs.createReadStream(filePath);
        const output = fs.createWriteStream(\`\${filePath}.\${Date.now()}.gz\`);
        
        input.pipe(gzip).pipe(output);
        fs.truncateSync(filePath, 0);
      }
    }
  });
}
\`\`\`

### کیشے مینجمنٹ
\`\`\`javascript
// cache-management.js
const Redis = require('ioredis');
const redis = new Redis(process.env.REDIS_URL);

async function manageCache() {
  // Clear expired keys
  const keys = await redis.keys('*');
  
  for (const key of keys) {
    const ttl = await redis.ttl(key);
    if (ttl < 0) {
      await redis.del(key);
    }
  }
  
  // Warm up cache for popular items
  const popularCourses = await db.collection('courses')
    .find({})
    .sort({ views: -1 })
    .limit(10)
    .toArray();
  
  popularCourses.forEach(course => {
    redis.setex(\`course:\${course._id}\`, 3600, JSON.stringify(course));
  });
}
\`\`\`

## دستاویزات

### آپریشنز دستی
- سرور سیٹ اپ
- ڈیپلائمنٹ پروسیس
- بیک اپ پروسیجر
- ڈیزاسٹر ریکوری
- رابطہ فہرست

### ٹربل شوٹنگ گائیڈ
- عام مسائل
- حل
- کامنڈز
- ٹولز
- وسائل

### آن بورڈنگ
- نئے ڈیولپرز
- نئے ایڈمنز
- ٹریننگ
- رسائی
- ذمہ داریاں`,
  };

  return (
    <div
      dir="rtl"
      className={`min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* کاپی ہونے کا پیغام */}
      {copySuccess && (
        <div className="fixed top-20 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl font-bold border-l-4 border-yellow-400 animate-bounce">
          {copySuccess}
        </div>
      )}

      {/* ہیڈر */}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        {/* بائیں جانب - مینو بٹن */}
        <button
          onClick={toggleSidebar}
          className="p-3 cursor-pointer rounded-full hover:text-blue-500 transition-all focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="space-y-1">
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>

        {/* درمیان - عنوان - یہ خالی کر دیا گیا ہے کیونکہ اب مین کے اندر ہے */}
        <div className="text-center"></div>

        {/* دائیں جانب - تھیم بٹن */}
        <button
          onClick={toggleTheme}
          className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ لائٹ موڈ"}
        </button>
      </header>

      {/* RightSidebar */}
      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      {/* مرکزی مواد - اب یہاں Chapter کا نام اور p ٹیگ ہے */}
      <main className="pt-20 pb-20 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-l from-orange-500 to-pink-500 pb-2">
            باب 28: Security & SEO 🔒
          </h1>
          <p className="text-sm xs:text-base text-gray-600 dark:text-gray-400">
            سیکیورٹی • SEO • مکمل پروجیکٹ
          </p>
        </div>

        {/* ٹیبز */}
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-bold whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ========== حصہ 1: Security ========== */}
        {activeTab === "security" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-red-600 dark:text-red-400">
                🔒 مکمل سیکیورٹی گائیڈ
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  پیشہ ورانہ
                </span>{" "}
                سیکیورٹی اقدامات
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">
                    ⏱️ وقت:
                  </span>{" "}
                  60 منٹ
                </div>
                <div className="px-4 py-2 bg-red-100 dark:bg-red-900/40 rounded-lg">
                  <span className="font-bold text-red-700 dark:text-red-300">
                    📊 Level:
                  </span>{" "}
                  Advanced
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">
                    🎯 مقصد:
                  </span>{" "}
                  مکمل سیکیورٹی
                </div>
              </div>
            </div>

            {/* Introduction */}
            <section className="mb-10 p-6 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-red-300 dark:border-red-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-red-700 dark:text-red-300">
                🎯 اس حصے میں ہم سیکھیں گے
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">Rate Limiting (DDoS سے بچاؤ)</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">Input Validation (XSS سے بچاؤ)</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">CSRF Protection</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">Helmet.js (HTTP Headers)</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">Environment Variables Security</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">MongoDB Injection Prevention</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">File Upload Security</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p className="font-bold">JWT Security Best Practices</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 1. Rate Limiting */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Rate Limiting (DDoS سے بچاؤ)
                </h2>
              </div>

              <SuperSimpleCode
                title="middleware/rateLimiter.js"
                code={securityCode.rateLimiting}
                steps={[
                  "express-rate-limit انسٹال کریں: npm install express-rate-limit",
                  "middleware فولڈر میں rateLimiter.js بنائیں",
                  "API endpoints پر apply کریں",
                  "Redis سیٹ اپ کریں (اختیاری)",
                ]}
              />
            </section>

            {/* 2. Input Validation */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  Input Validation (XSS سے بچاؤ)
                </h2>
              </div>

              <SuperSimpleCode
                title="lib/validation.js"
                code={securityCode.inputValidation}
                steps={[
                  "zod اور isomorphic-dompurify انسٹال کریں",
                  "validation.js فائل بنائیں",
                  "ہر API پر validation apply کریں",
                  "فرنٹ اینڈ پر بھی validation کریں",
                ]}
              />
            </section>

            {/* 3. CSRF Protection */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  CSRF Protection
                </h2>
              </div>

              <SuperSimpleCode
                title="lib/csrf.js"
                code={securityCode.csrfProtection}
                steps={[
                  "csrf پیکیج انسٹال کریں",
                  "csrf.js فائل بنائیں",
                  "ہر فارم میں CSRF token شامل کریں",
                  "API endpoints پر CSRF protection apply کریں",
                ]}
              />
            </section>

            {/* 4. Helmet.js */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Helmet.js (HTTP Headers)
                </h2>
              </div>

              <SuperSimpleCode
                title="middleware/helmet.js"
                code={securityCode.helmetJs}
                steps={[
                  "helmet انسٹال کریں: npm install helmet",
                  "middleware میں helmet شامل کریں",
                  "CSP پالیسی کنفیگر کریں",
                  "ہیڈرز چیک کریں",
                ]}
              />
            </section>

            {/* 5. Environment Variables Security */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Environment Variables Security
                </h2>
              </div>

              <SuperSimpleCode
                title=".env.example & encryption.js"
                code={securityCode.envSecurity}
                steps={[
                  ".env.example فائل بنائیں (کبھی .env کو گیٹ ہب پر نہ بھیجیں)",
                  "encryption.js میں حساس ڈیٹا کو انکرپٹ کریں",
                  "ماحولی متغیرات کو باقاعدگی سے تبدیل کریں",
                  "ڈیٹا کو ماسک کریں",
                ]}
              />
            </section>

            {/* 6. MongoDB Injection Prevention */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  6
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  MongoDB Injection Prevention
                </h2>
              </div>

              <SuperSimpleCode
                title="lib/database.js"
                code={securityCode.mongoSecurity}
                steps={[
                  "mongo-sanitize انسٹال کریں",
                  "سانیتائزیشن مڈل ویئر شامل کریں",
                  "اسکیما ویلڈیشن سختی سے کریں",
                  "انپٹ کو ہمیشہ سینیٹائز کریں",
                ]}
              />
            </section>

            {/* 7. File Upload Security */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  File Upload Security
                </h2>
              </div>

              <SuperSimpleCode
                title="lib/upload.js"
                code={securityCode.fileUploadSecurity}
                steps={[
                  "multer انسٹال کریں",
                  "فائل کی اقسام اور سائز محدود کریں",
                  "محفوظ فائل نام بنائیں",
                  "فائل سکیننگ شامل کریں",
                ]}
              />
            </section>

            {/* 8. JWT Security */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  8
                </div>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  JWT Security Best Practices
                </h2>
              </div>

              <SuperSimpleCode
                title="lib/jwt.js"
                code={securityCode.jwtSecurity}
                steps={[
                  "jsonwebtoken انسٹال کریں",
                  "رسائی ٹوکن کی میعاد مختصر رکھیں",
                  "ریفریش ٹوکن استعمال کریں",
                  "بلیک لسٹنگ کا نظام بنائیں",
                ]}
              />
            </section>

            {/* Security Checklist */}
            <section className="mb-10 p-6 bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>✅ سیکیورٹی چیک لسٹ</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2 text-red-600">
                    🟢 ضروری اقدامات:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Rate Limiting سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Input Validation مکمل کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>CSRF Protection</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Helmet.js ہیڈرز</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>JWT Security</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2 text-orange-600">
                    🟠 اعلیٰ سطح:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 rounded"
                      />
                      <span>2FA (Two Factor Authentication)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 rounded"
                      />
                      <span>Audit Logging</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 rounded"
                      />
                      <span>Data Encryption at Rest</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-orange-500 rounded"
                      />
                      <span>Security Monitoring</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>
        )}

        {/* ========== حصہ 2: SEO Optimization ========== */}
        {activeTab === "seo" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                🔍 SEO Optimization
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  پیشہ ورانہ
                </span>{" "}
                SEO گائیڈ
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">
                    ⏱️ وقت:
                  </span>{" "}
                  45 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">
                    📊 Level:
                  </span>{" "}
                  Intermediate
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">
                    🎯 مقصد:
                  </span>{" "}
                  گوگل ٹاپ پر آئیں
                </div>
              </div>
            </div>

            {/* Meta Tags */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Meta Tags & Open Graph
                </h2>
              </div>

              <SuperSimpleCode
                title="components/SEO/MetaTags.jsx"
                code={seoCode.metaTags}
                steps={[
                  "MetaTags کمپوننٹ بنائیں",
                  "ہر پیج پر MetaTags شامل کریں",
                  "Open Graph ٹیگز لیں",
                  "Twitter Cards بھی شامل کریں",
                ]}
              />
            </section>

            {/* Sitemap */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Sitemap Generation
                </h2>
              </div>

              <SuperSimpleCode
                title="scripts/generate-sitemap.js"
                code={seoCode.sitemap}
                steps={[
                  "sitemap جنریٹر اسکرپٹ بنائیں",
                  "تمام صفحات کو شامل کریں",
                  "ڈائنامک روٹس بھی شامل کریں",
                  "sitemap-index.xml بنائیں",
                ]}
              />
            </section>

            {/* Robots.txt */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Robots.txt
                </h2>
              </div>

              <SuperSimpleCode
                title="public/robots.txt"
                code={seoCode.robotsTxt}
                steps={[
                  "robots.txt فائل بنائیں",
                  "سرچ انجنز کو رہنمائی دیں",
                  "sitemap کا لنک شامل کریں",
                  "ناجائز بلاک کریں",
                ]}
              />
            </section>

            {/* Structured Data */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  Structured Data (JSON-LD)
                </h2>
              </div>

              <SuperSimpleCode
                title="components/SEO/StructuredData.jsx"
                code={seoCode.structuredData}
                steps={[
                  "JSON-LD اسکیماز بنائیں",
                  "کورسز، آرٹیکلز، فریق کے لیے",
                  "گوگل رچ سنیپٹس چیک کریں",
                  "فہرست سازی بھی شامل کریں",
                ]}
              />
            </section>

            {/* Canonical URLs */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  Canonical URLs
                </h2>
              </div>

              <SuperSimpleCode
                title="components/SEO/CanonicalUrl.jsx"
                code={seoCode.canonicalUrls}
                steps={[
                  "canonical یو آر ایل سیٹ کریں",
                  "ڈپلیکیٹ مواد سے بچیں",
                  "پگینیشن کا خیال رکھیں",
                  "مڈل ویئر بھی شامل کریں",
                ]}
              />
            </section>

            {/* Social Media Cards */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center text-white font-bold">
                  6
                </div>
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  Social Media Cards
                </h2>
              </div>

              <SuperSimpleCode
                title="components/SEO/SocialCards.jsx"
                code={seoCode.socialCards}
                steps={[
                  "فیس بک، ٹویٹر، لنکڈ ان کارڈز",
                  "واٹس ایپ شیئرنگ بہتر کریں",
                  "تصاویر کا سائز درست کریں",
                  "کارڈز ٹیسٹ کریں",
                ]}
              />
            </section>

            {/* Performance Optimization */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  Performance Optimization
                </h2>
              </div>

              <SuperSimpleCode
                title="next.config.js & components/Performance/LazyLoad.jsx"
                code={seoCode.performance}
                steps={[
                  "امیجز آپٹیمائز کریں",
                  "لازی لوڈنگ کریں",
                  "کیشنگ بہتر کریں",
                  "کور ویب ویٹلز چیک کریں",
                ]}
              />
            </section>

            {/* Mobile Friendliness */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  8
                </div>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Mobile Friendliness
                </h2>
              </div>

              <SuperSimpleCode
                title="styles/globals.css & hooks/useMobileDetect.js"
                code={seoCode.mobileFriendly}
                steps={[
                  "ریسپانسیو ڈیزائن بنائیں",
                  "ٹچ فرینڈلی بٹنز",
                  "موبائل ڈیٹیکشن",
                  "گوگل موبائل فرینڈلی ٹیسٹ",
                ]}
              />
            </section>

            {/* SEO Checklist */}
            <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileSearch className="w-5 h-5 text-green-600" />
                <span>✅ SEO چیک لسٹ</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2 text-blue-600">
                    🟢 بنیادی SEO:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Meta titles & descriptions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Canonical URLs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>XML sitemap</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-green-600 rounded"
                      />
                      <span>Robots.txt</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2 text-purple-600">
                    🟡 ایڈوانسڈ SEO:
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 rounded"
                      />
                      <span>Structured data (JSON-LD)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 rounded"
                      />
                      <span>Open Graph tags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 rounded"
                      />
                      <span>Hreflang tags</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-500 rounded"
                      />
                      <span>Breadcrumbs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </section>
        )}

        {/* ========== حصہ 3: Complete Project ========== */}
        {activeTab === "project" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
                🚀 مکمل پروجیکٹ
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  پیشہ ورانہ
                </span>{" "}
                LMS ڈاکومنٹیشن
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">
                    ⏱️ وقت:
                  </span>{" "}
                  60 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">
                    📊 Level:
                  </span>{" "}
                  Advanced
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">
                    🎯 مقصد:
                  </span>{" "}
                  پروجیکٹ مکمل
                </div>
              </div>
            </div>

            {/* Project Structure */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  Project Structure Overview
                </h2>
              </div>

              <SuperSimpleCode
                title="Project Structure"
                code={projectCode.projectStructure}
                steps={[
                  "پروجیکٹ ڈھانچہ سمجھیں",
                  "فولڈرز بنائیں",
                  "فائلیں ترتیب دیں",
                  "بیسٹ پریکٹسز فالو کریں",
                ]}
              />
            </section>

            {/* Deployment Checklist */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Deployment Checklist
                </h2>
              </div>

              <SuperSimpleCode
                title="Deployment Checklist"
                code={projectCode.deploymentChecklist}
                steps={[
                  "ڈیپلائمنٹ سے پہلے چیک کریں",
                  "ڈیپلائمنٹ کے دوران نگرانی",
                  "ڈیپلائمنٹ کے بعد تصدیق",
                  "رول بیک پلان بنائیں",
                ]}
              />
            </section>

            {/* Maintenance Guide */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Maintenance Guide
                </h2>
              </div>

              <SuperSimpleCode
                title="Maintenance Guide"
                code={projectCode.maintenanceGuide}
                steps={[
                  "روزانہ دیکھ بھال کریں",
                  "ہفتہ وار کام کریں",
                  "ایمرجنسی رسپانس تیار رکھیں",
                  "باقاعدہ بیک اپ لیں",
                ]}
              />
            </section>

            {/* Final Checklist */}
            <section className="mb-10 p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-4 border-green-300 dark:border-green-700">
              <h2 className="text-3xl font-bold mb-6 text-center text-green-700 dark:text-green-400">
                🎉 مبارک ہو! آپ نے LMS مکمل کر لیا!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-blue-600">
                    📚 آپ نے سیکھا:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>28 ابواب میں مکمل LMS</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Next.js, MongoDB, Socket.io</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Authentication & Authorization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Payments & Email Systems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Real-time Features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500" />
                      <span>Security & SEO</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold mb-4 text-green-600">
                    🚀 اب آپ کر سکتے ہیں:
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Rocket className="w-4 h-4 text-green-500" />
                      <span>پروڈکشن میں ڈیپلائے کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>ہزاروں طلباء کو پڑھائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span>آن لائن آمدنی کمائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-500" />
                      <span>پوری دنیا میں پھیلیں</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center p-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-xl text-white">
                <h3 className="text-2xl font-bold mb-2">
                  🌟 آپ کا مستقبل روشن ہے!
                </h3>
                <p className="text-lg mb-4">
                  28 ابواب مکمل کرنے والے سچے ہیرو ہیں!
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://github.com/yourusername/lms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-black/30 text-white rounded-lg font-bold hover:bg-black/40 transition-colors flex items-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    گٹ ہب ریپو
                  </a>
                  <a
                    href="https://yourlms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white/30 text-white rounded-lg font-bold hover:bg-white/40 transition-colors flex items-center gap-2"
                  >
                    <Globe className="w-5 h-5" />
                    لائیو ڈیمو
                  </a>
                  <button
                    onClick={() => {
                      window.print();
                    }}
                    className="px-6 py-3 bg-black/30 text-white rounded-lg font-bold hover:bg-black/40 transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-5 h-5" />
                    سرٹیفکیٹ ڈاؤن لوڈ
                  </button>
                </div>
              </div>
            </section>

            {/* Final Message */}
            <section className="text-center p-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl text-white shadow-2xl">
              <div className="text-6xl mb-4">🎓</div>
              <h2 className="text-4xl font-bold mb-4">
                اللہ آپ کو جزائے خیر دے!
              </h2>
              <p className="text-xl mb-6">
                آپ نے 28 ابواب میں مکمل Learning Management System بنایا ہے۔
              </p>
              <p className="text-lg mb-8 opacity-90">
                یہ سفر یہاں ختم نہیں ہوتا، بلکہ یہاں سے شروع ہوتا ہے۔ اب آپ اپنی
                مرضی کے مطابق اسے بڑھا سکتے ہیں، نئے فیچرز شامل کر سکتے ہیں، اور
                ہزاروں لوگوں کو تعلیم دے سکتے ہیں۔
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🌟 28 ابواب
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  ⚡ 3000+ لائنیں
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🚀 پروڈکشن ریڈی
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm">
                  🇵🇰 پاکستان کا فخر
                </span>
              </div>
            </section>
          </section>
        )}

        {/* نیچے نیویگیشن */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeTab,
                );
                if (currentIndex > 0) {
                  setActiveTab(tabs[currentIndex - 1].id);
                }
              }}
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-800 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
            >
              ← پچھلا ٹاپک
            </button>

            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeTab,
                );
                if (currentIndex < tabs.length - 1) {
                  setActiveTab(tabs[currentIndex + 1].id);
                }
              }}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              اگلا ٹاپک →
            </button>
          </div>
        </div>
      </main>

      {/* سائیڈبار اوورلے */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30"
        ></div>
      )}

      {/* گلوبل اسٹائلز */}
      <style jsx global>{`
        .dark {
          color-scheme: dark;
        }

        * {
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        pre {
          font-family: "Courier New", monospace;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }

        .dark ::-webkit-scrollbar {
          width: 10px;
        }

        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 5px;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
}