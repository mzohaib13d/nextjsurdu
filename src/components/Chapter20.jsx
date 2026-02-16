import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";
import "../index.css";

export default function Chapter20() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("nextauth");

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
        className={`bg-gray-500     ${colorClass} p-5 rounded-xl text-left font-mono overflow-x-auto text-sm md:text-base border border-gray-800 shadow-lg`}
        dir="ltr"
      >
        {code}
      </pre>
    </div>
  );

  // ========== CHAPTER 20: NEXT AUTH JS COMPLETE INTEGRATION ==========

  // 1. Installation & Environment Setup
  const installationCode = `# 📦 NextAuth.js Installation Commands

# Step 1: Install NextAuth.js and dependencies
npm install next-auth bcryptjs jsonwebtoken @next-auth/mongodb-adapter
# or
yarn add next-auth bcryptjs jsonwebtoken @next-auth/mongodb-adapter

# Step 2: Install additional utilities
npm install react-icons lucide-react
# or
yarn add react-icons lucide-react

# Step 3: Install development dependencies
npm install -D @types/bcryptjs @types/jsonwebtoken
# or
yarn add -D @types/bcryptjs @types/jsonwebtoken

# 📁 Required Directories
mkdir -p app/api/auth/[...nextauth]
mkdir -p components/auth
mkdir -p lib
mkdir -p middleware

# ✅ Packages Summary:
# - next-auth: Authentication library
# - bcryptjs: Password hashing
# - jsonwebtoken: JWT token handling
# - @next-auth/mongodb-adapter: MongoDB adapter
# - react-icons/lucide-react: UI icons`;

  // 2. Environment Variables Setup
  const envSetupCode = `# 📁 .env.local - Complete Environment Configuration

# 🔐 NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-minimum-32-characters

# 🗄️ Database Configuration (From Chapter 19)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_database

# 🔑 JWT Configuration
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRE=7d

# 🔵 Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# 🐙 GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# 📧 Email Configuration
EMAIL_SERVER=smtp://username:password@smtp.gmail.com:587
EMAIL_FROM="پاکستان LMS <noreply@yourdomain.com>"

# ⚡ Application Configuration
APP_URL=http://localhost:3000
APP_NAME=پاکستان LMS

# ⚠️ Important Security Notes:
# 1. Never commit .env.local to GitHub
# 2. Add .env.local to .gitignore
# 3. Generate strong secrets: openssl rand -base64 32
# 4. Use different keys for production
# 5. Rotate secrets periodically

# 🔒 Production Checklist:
# - Use HTTPS in production
# - Enable CSRF protection
# - Implement rate limiting
# - Set secure cookie options
# - Use secure JWT signing`;

  // 3. Complete NextAuth.js API Route
  const nextAuthAPICode = `// 📁 app/api/auth/[...nextauth]/route.js
// Complete NextAuth.js API Route Configuration

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// Helper function to connect to database
async function getMongoClient() {
  const { MongoClient } = await import("mongodb");
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client;
}

// NextAuth configuration options
export const authOptions = {
  // Configure authentication providers
  providers: [
    // 🔵 Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
          role: "student", // Default role for social login
        };
      },
    }),

    // 🐙 GitHub OAuth Provider
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          emailVerified: false,
          role: "student", // Default role for social login
        };
      },
    }),

    // 🔐 Credentials Provider (Email/Password)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { 
          label: "ای میل", 
          type: "email", 
          placeholder: "example@email.com" 
        },
        password: { 
          label: "پاس ورڈ", 
          type: "password" 
        },
        rememberMe: {
          label: "مجھے یاد رکھیں",
          type: "checkbox"
        }
      },
      async authorize(credentials) {
        try {
          // Connect to database
          await connectDB();
          
          const { email, password } = credentials;
          
          // Validate input
          if (!email || !password) {
            throw new Error("براہ کرم ای میل اور پاس ورڈ درج کریں");
          }
          
          // Find user by email (including password field)
          const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
          
          // If user doesn't exist
          if (!user) {
            throw new Error("صارف نہیں ملا");
          }
          
          // Check if email is verified
          if (!user.emailVerified) {
            throw new Error("براہ کرم اپنی ای میل تصدیق کریں");
          }
          
          // Check if account is locked
          if (user.lockUntil && user.lockUntil > Date.now()) {
            const minutesLeft = Math.ceil((user.lockUntil - Date.now()) / 60000);
            throw new Error(\`اکاؤنٹ بند ہے۔ \${minutesLeft} منٹ بعد کوشش کریں\`);
          }
          
          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);
          
          if (!isPasswordValid) {
            // Increment login attempts
            user.loginAttempts = (user.loginAttempts || 0) + 1;
            
            // Lock account after 5 failed attempts
            if (user.loginAttempts >= 5) {
              user.lockUntil = Date.now() + 15 * 60 * 1000; // 15 minutes
            }
            
            await user.save();
            throw new Error("غلط پاس ورڈ");
          }
          
          // Reset login attempts on successful login
          user.loginAttempts = 0;
          user.lockUntil = undefined;
          user.lastLogin = new Date();
          await user.save();
          
          // Return user object (excluding password)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.avatar,
            emailVerified: user.emailVerified,
          };
          
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error(error.message || "لاگ ان میں ناکامی");
        }
      }
    })
  ],
  
  // Database adapter for session storage
  adapter: MongoDBAdapter(getMongoClient()),
  
  // Custom pages for auth flows
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-email",
    newUser: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  
  // Session configuration
  session: {
    strategy: "jwt", // Use JWT for sessions (better for scaling)
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  
  // JWT configuration
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 days
    encryption: true,
  },
  
  // Callbacks for customizing auth flow
  callbacks: {
    // JWT callback - runs when JWT is created/updated
    async jwt({ token, user, account, profile, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.emailVerified = user.emailVerified;
        token.provider = account?.provider || "credentials";
      }
      
      // Update token from session (for updating user data)
      if (trigger === "update" && session?.user) {
        token.name = session.user.name;
        token.image = session.user.image;
      }
      
      return token;
    },
    
    // Session callback - runs when session is checked
    async session({ session, token }) {
      // Add custom data to session
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.emailVerified = token.emailVerified;
        session.user.provider = token.provider;
      }
      
      return session;
    },
    
    // Sign in callback - runs when user signs in
    async signIn({ user, account, profile, email, credentials }) {
      try {
        await connectDB();
        
        // Check if user exists
        const existingUser = await User.findOne({ email: user.email });
        
        if (existingUser) {
          // Update user information
          existingUser.name = user.name || existingUser.name;
          existingUser.image = user.image || existingUser.image;
          
          // Mark email as verified for Google OAuth
          if (account?.provider === "google") {
            existingUser.emailVerified = true;
            existingUser.authProvider = "google";
            existingUser.socialId = profile.sub;
          }
          
          // Mark email as verified for GitHub OAuth
          if (account?.provider === "github") {
            existingUser.authProvider = "github";
            existingUser.socialId = profile.id.toString();
          }
          
          await existingUser.save();
        } else {
          // Create new user for social login
          const newUser = new User({
            name: user.name,
            email: user.email,
            role: "student",
            emailVerified: account?.provider === "google",
            authProvider: account?.provider || "email",
            socialId: account?.provider === "google" ? profile.sub : 
                      account?.provider === "github" ? profile.id.toString() : undefined,
            createdAt: new Date(),
          });
          
          await newUser.save();
        }
        
        return true;
      } catch (error) {
        console.error("Sign in callback error:", error);
        return false;
      }
    },
    
    // Redirect callback - controls where user goes after auth
    async redirect({ url, baseUrl }) {
      // Allow relative URLs
      if (url.startsWith("/")) return \`\${baseUrl}\${url}\`;
      // Allow same origin URLs
      else if (new URL(url).origin === baseUrl) return url;
      // Default to home page
      return baseUrl;
    }
  },
  
  // Events for logging and other side effects
  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(\`✅ User signed in: \${user.email} (Provider: \${account?.provider})\`);
    },
    async signOut({ token, session }) {
      console.log("🔐 User signed out");
    },
    async createUser({ user }) {
      console.log(\`👤 New user created: \${user.email}\`);
    },
    async linkAccount({ user, account, profile }) {
      console.log(\`🔗 Account linked: \${user.email} to \${account.provider}\`);
    },
    async session({ session, token }) {
      // You can add session logging here
    }
  },
  
  // Debugging (enable in development only)
  debug: process.env.NODE_ENV === "development",
  
  // Secret for signing tokens
  secret: process.env.NEXTAUTH_SECRET,
  
  // Cookies configuration
  cookies: {
    sessionToken: {
      name: \`next-auth.session-token\`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    callbackUrl: {
      name: \`next-auth.callback-url\`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
    csrfToken: {
      name: \`next-auth.csrf-token\`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

// Create NextAuth handler
const handler = NextAuth(authOptions);

// Export GET and POST handlers
export { handler as GET, handler as POST };

// Export authOptions for server components
export { authOptions };`;

  // 4. Session Provider Component
  const sessionProviderCode = `// 📁 components/providers/SessionProvider.jsx
// NextAuth Session Provider for Client Components

"use client";

import { SessionProvider } from "next-auth/react";

export default function AuthProvider({ children, session }) {
  return (
    <SessionProvider 
      session={session}
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true} // Refetch when window gets focus
    >
      {children}
    </SessionProvider>
  );
}

// 📁 app/layout.jsx - Main Layout with Session Provider
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/SessionProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "پاکستان LMS - تعلیم سب کے لیے",
  description: "آن لائن لرننگ مینجمنٹ سسٹم",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <body className={\`\${inter.className} bg-gray-50 text-gray-900\`}>
        <AuthProvider>
          {/* Navigation can be added here */}
          <div className="min-h-screen flex flex-col">
            {/* Optional: Add your header/navigation */}
            {/* <Header /> */}
            
            <main className="flex-grow">
              {children}
            </main>
            
            {/* Optional: Add your footer */}
            {/* <Footer /> */}
          </div>
          
          {/* Toast notifications */}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                direction: 'rtl',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10B981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#EF4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}`;

  // 5. Login Form with Social Buttons
  const loginFormCode = `// 📁 components/auth/LoginForm.jsx
// Modern Login Form with NextAuth Integration

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Eye, EyeOff, Mail, Lock, AlertCircle, Loader2,
  LogIn, Github, Chrome
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState(null);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate form
      if (!formData.email || !formData.password) {
        throw new Error("براہ کرم ای میل اور پاس ورڈ درج کریں");
      }

      // Email validation
      const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error("براہ کرم درست ای میل درج کریں");
      }

      // Attempt to sign in with credentials
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        redirect: false,
        callbackUrl,
      });

      if (result?.error) {
        // Handle specific errors
        if (result.error.includes("تصدیق کریں")) {
          throw new Error(
            "براہ کرم اپنی ای میل تصدیق کریں۔ اگر آپ کو ای میل نہیں ملا، تو رابطہ کریں۔"
          );
        } else if (result.error.includes("بند ہے")) {
          throw new Error(result.error);
        } else if (result.error.includes("نہیں ملا")) {
          throw new Error("ای میل یا پاس ورڈ غلط ہے");
        } else {
          throw new Error("لاگ ان میں مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔");
        }
      }

      if (result?.ok) {
        // Show success message
        toast.success("کامیابی سے لاگ ان ہو گئے!");
        
        // Redirect to dashboard or callback URL
        router.push(callbackUrl);
        router.refresh(); // Refresh server components
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setSocialLoading(provider);
      setError("");
      
      await signIn(provider, { 
        callbackUrl,
        redirect: true 
      });
      
    } catch (error) {
      setError(\`\${provider} سے لاگ ان میں ناکامی\`);
      toast.error(\`\${provider} سے لاگ ان میں ناکامی\`);
    } finally {
      setSocialLoading(null);
    }
  };

  const handleDemoLogin = async (role) => {
    try {
      setLoading(true);
      
      const demoAccounts = {
        student: { email: "student@demo.com", password: "demo123" },
        instructor: { email: "instructor@demo.com", password: "demo123" },
        admin: { email: "admin@demo.com", password: "demo123" },
      };
      
      const demo = demoAccounts[role];
      
      const result = await signIn("credentials", {
        email: demo.email,
        password: demo.password,
        redirect: false,
        callbackUrl: role === "admin" ? "/admin/dashboard" : 
                    role === "instructor" ? "/instructor/dashboard" : 
                    "/student/dashboard",
      });

      if (result?.ok) {
        toast.success(\`\${role} ڈیمو اکاؤنٹ میں لاگ ان ہو گئے!\`);
        router.push(result.url || "/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("ڈیمو لاگ ان میں ناکامی");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mb-4">
          <LogIn className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          لاگ ان کریں
        </h2>
        <p className="text-gray-600">
          اپنے اکاؤنٹ میں داخل ہوں
        </p>
      </div>

      {/* Demo Accounts */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2 text-center">تیز آزمائش کے لیے:</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleDemoLogin("student")}
            disabled={loading}
            className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 disabled:opacity-50"
          >
            طالب علم
          </button>
          <button
            onClick={() => handleDemoLogin("instructor")}
            disabled={loading}
            className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 disabled:opacity-50"
          >
            استاد
          </button>
          <button
            onClick={() => handleDemoLogin("admin")}
            disabled={loading}
            className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm hover:bg-purple-200 disabled:opacity-50"
          >
            منتظم
          </button>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="mb-6">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialLogin("google")}
            disabled={loading || socialLoading}
            className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {socialLoading === "google" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Chrome className="h-5 w-5" />
            )}
            <span>Google</span>
          </button>

          <button
            onClick={() => handleSocialLogin("github")}
            disabled={loading || socialLoading}
            className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {socialLoading === "github" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Github className="h-5 w-5" />
            )}
            <span>GitHub</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500 text-sm">یا</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-red-700 font-medium">نوٹس</p>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <div>
          <label className="block text-gray-700 mb-2 font-medium">
            ای میل ایڈریس <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="example@gmail.com"
              dir="ltr"
              disabled={loading || socialLoading}
            />
          </div>
        </div>

        {/* Password Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-gray-700 font-medium">
              پاس ورڈ <span className="text-red-500">*</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              پاس ورڈ بھول گئے؟
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="کم از کم 6 حروف"
              dir="ltr"
              disabled={loading || socialLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
              disabled={loading || socialLoading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.rememberMe}
            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ml-2"
            disabled={loading || socialLoading}
          />
          <span className="text-gray-700 text-sm">
            مجھے یاد رکھیں
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || socialLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 mr-3 animate-spin" />
              لاگ ان ہو رہا ہے...
            </span>
          ) : (
            "لاگ ان کریں"
          )}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-8 text-center pt-6 border-t border-gray-200">
        <p className="text-gray-600">
          نیا صارف ہیں؟{" "}
          <Link
            href="/auth/register"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            اکاؤنٹ بنائیں
          </Link>
        </p>
      </div>

      {/* Security Note */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          🔒 آپ کا ڈیٹا محفوظ ہے۔ ہم آپ کی رازداری کا احترام کرتے ہیں۔
        </p>
      </div>
    </div>
  );
}`;

  // 6. Auth Hook for User Data
  const authHookCode = `// 📁 hooks/useAuth.js
// Custom Hook for Authentication State

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export function useAuth(required = false, redirectTo = "/auth/login") {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (status !== "loading") {
      setLoading(false);
      
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          role: session.user.role,
          image: session.user.image,
          emailVerified: session.user.emailVerified,
          provider: session.user.provider,
        });
      } else {
        setUser(null);
      }
    }
  }, [session, status]);

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Check if user has specific role
  const hasRole = (role) => {
    if (!user) return false;
    return user.role === role;
  };

  // Check if user has any of the roles
  const hasAnyRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  // Logout function
  const logout = async (options = {}) => {
    await signOut({
      callbackUrl: options.redirect || "/",
      redirect: options.redirect !== false,
    });
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (required && status === "unauthenticated") {
      window.location.href = \`\${redirectTo}?callbackUrl=\${encodeURIComponent(window.location.href)}\`;
    }
  }, [required, status, redirectTo]);

  return {
    user,
    session,
    loading,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    logout,
    status,
  };
}

// 📁 hooks/useProtectedRoute.js
// Hook for Protected Routes

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export function useProtectedRoute(requiredRole = null, redirectTo = "/auth/login") {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // Not authenticated
      router.push(\`\${redirectTo}?callbackUrl=\${encodeURIComponent(window.location.href)}\`);
    } else if (requiredRole && session.user.role !== requiredRole) {
      // Doesn't have required role
      router.push("/unauthorized");
    }
  }, [session, status, requiredRole, router, redirectTo]);

  return {
    session,
    status,
    isAuthenticated: !!session,
    hasRequiredRole: requiredRole ? session?.user?.role === requiredRole : true,
  };
}`;

  // 7. Protected Route Components
  const protectedRouteCode = `// 📁 components/auth/ProtectedRoute.jsx
// Component for Protecting Routes

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldAlert } from "lucide-react";
import { useEffect } from "react";

export default function ProtectedRoute({ 
  children, 
  requiredRole = null,
  fallback = null,
  redirectTo = "/auth/login"
}) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      // Not authenticated
      router.push(\`\${redirectTo}?callbackUrl=\${encodeURIComponent(window.location.href)}\`);
    } else if (requiredRole && session.user.role !== requiredRole) {
      // Doesn't have required role
      router.push("/unauthorized");
    }
  }, [session, status, requiredRole, router, redirectTo]);

  // Show loading state
  if (status === "loading") {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">لوڈ ہو رہا ہے...</p>
        </div>
      </div>
    );
  }

  // Check authentication
  if (!session) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">غیر مجاز رسائی</h2>
          <p className="text-gray-600 mb-6">براہ کرم اس صفحے تک رسائی کے لیے لاگ ان کریں۔</p>
          <button
            onClick={() => router.push(\`\${redirectTo}?callbackUrl=\${encodeURIComponent(window.location.href)}\`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            لاگ ان کریں
          </button>
        </div>
      </div>
    );
  }

  // Check role
  if (requiredRole && session.user.role !== requiredRole) {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ShieldAlert className="h-16 w-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">اجازت نہیں</h2>
          <p className="text-gray-600 mb-6">آپ کے پاس اس صفحے تک رسائی کی اجازت نہیں ہے۔</p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            ڈیش بورڈ پر جائیں
          </button>
        </div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
}

// 📁 app/dashboard/page.jsx
// Example Protected Dashboard

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/auth/login?callbackUrl=/dashboard");
  }

  return (
    <ProtectedRoute requiredRole="student">
      <DashboardLayout user={session.user}>
        <div className="space-y-6">
          {/* Dashboard content */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">
              مرحبا، {session.user.name}! 👋
            </h1>
            <p className="text-blue-100">
              آپ کے سیکھنے کے سفر میں آپ کی پیشرفت یہاں دیکھی جا سکتی ہے۔
            </p>
          </div>
          
          {/* Dashboard stats and content */}
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}`;

  // 8. Middleware for Route Protection
  const middlewareCode = `// 📁 middleware.js
// Next.js Middleware for Route Protection

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;
    
    // Role-based access control
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
    if (pathname.startsWith("/instructor") && !["instructor", "admin"].includes(token?.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
    if (pathname.startsWith("/student") && !["student", "instructor", "admin"].includes(token?.role)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
    
    // Email verification check for certain routes
    if (
      ["/dashboard", "/courses", "/profile"].some(path => pathname.startsWith(path)) &&
      token?.emailVerified === false
    ) {
      return NextResponse.redirect(new URL("/auth/verify-email", req.url));
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/login",
      error: "/auth/error",
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/instructor/:path*",
    "/student/:path*",
    "/profile/:path*",
    "/courses/:path*",
    "/settings/:path*",
  ],
};`;

  // 9. Server Component Example
  const serverComponentCode = `// 📁 app/admin/dashboard/page.jsx
// Server Component with Server-side Authentication

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/admin/AdminDashboard";
import { connectDB } from "@/lib/database";
import User from "@/models/User";

export default async function AdminDashboardPage() {
  // Get session on server side
  const session = await getServerSession(authOptions);
  
  // Redirect if not authenticated
  if (!session) {
    redirect("/auth/login?callbackUrl=/admin/dashboard");
  }
  
  // Check if user is admin
  if (session.user.role !== "admin") {
    redirect("/unauthorized");
  }
  
  // Fetch data from database
  await connectDB();
  
  // Get user statistics
  const totalUsers = await User.countDocuments();
  const activeUsers = await User.countDocuments({ isActive: true });
  const newUsers = await User.countDocuments({
    createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
  });
  
  // Get recent users
  const recentUsers = await User.find()
    .sort({ createdAt: -1 })
    .limit(10)
    .select("name email role createdAt")
    .lean();
  
  const stats = {
    totalUsers,
    activeUsers,
    newUsers,
    userGrowth: ((newUsers / totalUsers) * 100).toFixed(1),
  };

  return (
    <div className="space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          ایڈمن ڈیش بورڈ
        </h1>
        <p className="text-purple-100">
          خوش آمدید، {session.user.name}! آپ سسٹم کا انتظام کر سکتے ہیں۔
        </p>
      </div>
      
      {/* Admin Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {stats.totalUsers}
          </div>
          <p className="text-gray-600">کل صارفین</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {stats.activeUsers}
          </div>
          <p className="text-gray-600">فعال صارفین</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {stats.newUsers}
          </div>
          <p className="text-gray-600">نئے صارفین (7 دن)</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold text-gray-800 mb-1">
            {stats.userGrowth}%
          </div>
          <p className="text-gray-600">صارفین کی ترقی</p>
        </div>
      </div>
      
      {/* Recent Users Table */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">حالیہ صارفین</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 text-right">نام</th>
                <th className="py-3 text-right">ای میل</th>
                <th className="py-3 text-right">رول</th>
                <th className="py-3 text-right">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <span className={\`px-2 py-1 rounded text-sm \${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : user.role === 'instructor' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}\`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-3">
                    {new Date(user.createdAt).toLocaleDateString('ur-PK')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`;

  // 10. Sign Out Component
  const signOutCode = `// 📁 components/auth/SignOutButton.jsx
// Sign Out Button Component

"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function SignOutButton({ 
  variant = "default",
  className = "",
  redirectTo = "/"
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      
      await signOut({ 
        callbackUrl: redirectTo,
        redirect: true 
      });
      
      toast.success("کامیابی سے لاگ آؤٹ ہو گئے!");
      router.refresh();
      
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("لاگ آؤٹ میں مسئلہ پیش آیا");
    } finally {
      setLoading(false);
    }
  };

  const variants = {
    default: "text-gray-700 hover:text-red-600",
    danger: "text-red-600 hover:text-red-700",
    ghost: "text-gray-500 hover:text-gray-700",
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={\`flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed \${variants[variant]} \${className}\`}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      <span>لاگ آؤٹ</span>
    </button>
  );
}

// 📁 components/auth/UserMenu.jsx
// User Dropdown Menu with Sign Out

"use client";

import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { 
  User, Settings, LogOut, ChevronDown, 
  Shield, GraduationCap, BookOpen 
} from "lucide-react";
import SignOutButton from "./SignOutButton";

export default function UserMenu() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!session?.user) {
    return (
      <Link
        href="/auth/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        لاگ ان کریں
      </Link>
    );
  }

  const user = session.user;
  
  const roleIcons = {
    admin: Shield,
    instructor: GraduationCap,
    student: BookOpen,
  };
  
  const roleColors = {
    admin: "bg-purple-100 text-purple-800",
    instructor: "bg-green-100 text-green-800",
    student: "bg-blue-100 text-blue-800",
  };
  
  const RoleIcon = roleIcons[user.role] || User;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-500   "
      >
        <div className="relative">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <User className="h-6 w-6 text-blue-600" />
            </div>
          )}
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        
        <div className="text-right hidden md:block">
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
        
        <ChevronDown className={\`h-5 w-5 text-gray-500 transition-transform \${isOpen ? 'rotate-180' : ''}\`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <div className={\`p-2 rounded-lg \${roleColors[user.role]}\`}>
                <RoleIcon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-bold text-gray-900">{user.name}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <span className={\`px-2 py-1 rounded \${roleColors[user.role]}\`}>
                {user.role}
              </span>
              {user.emailVerified && (
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded">
                  تصدیق شدہ
                </span>
              )}
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span>ڈیش بورڈ</span>
            </Link>
            
            <Link
              href="/profile"
              className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <div className="p-2 bg-green-100 rounded-lg">
                <Settings className="h-4 w-4 text-green-600" />
              </div>
              <span>پروفائل</span>
            </Link>
            
            {user.role === "admin" && (
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50"
                onClick={() => setIsOpen(false)}
              >
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-4 w-4 text-purple-600" />
                </div>
                <span>ایڈمن پینل</span>
              </Link>
            )}
          </div>

          {/* Sign Out */}
          <div className="border-t border-gray-100 pt-2">
            <SignOutButton
              variant="danger"
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-red-50"
            />
          </div>
        </div>
      )}
    </div>
  );
}`;
const command = 'node -e "console.log (require(\'crypto\'). randomBytes(32). toString(\'hex\'))"';
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
    className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 hover:bg-blue-500/10 transition-all z-[60] text-current"
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
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          باب 20: NextAuth.js Complete Integration
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          Production-Ready Authentication with Google, GitHub & Credentials
        </p>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-400">
            🚀 باب کا مقصد
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>مکمل NextAuth.js Integration</strong> سیکھیں
            گے جو <strong>Production-ready</strong> ہوگا۔ آپ اسے فوری طور پر
            اپنے <strong>Freelancing projects</strong> میں استعمال کر سکیں گے۔
          </p>
 {/* یہاں Tab Navigation شامل کریں */}
  <div className="mt-10">
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      <button
        onClick={() => setActiveTab("nextauth")}
        className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
          activeTab === "nextauth"
            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        <span className="text-lg">🔐</span>
        NextAuth Setup
      </button>
      <button
        onClick={() => setActiveTab("components")}
        className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
          activeTab === "components"
            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        <span className="text-lg">🎨</span>
        Components
      </button>
      <button
        onClick={() => setActiveTab("security")}
        className={`px-6 py-3 cursor-pointer rounded-full shadow-lg font-bold active:scale-95 transition-all flex items-center gap-2 ${
          activeTab === "security"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
            : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        <span className="text-lg">🛡️</span>
        Security
      </button>
    </div>
    
    <div className="text-center mb-6">
      <p className="flex items-center justify-center gap-2 text-base font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 rounded-full animate-pulse inline-flex">
        <span className="text-xl">👉</span>
        Check all three buttons for complete code
      </p>
    </div>
  </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">
                Multi-Provider
              </h3>
              <p className="text-sm">Google, GitHub, Email/Password</p>
            </div>

            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">
                Session Management
              </h3>
              <p className="text-sm">JWT + Database Sessions</p>
            </div>

            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">
                Protected Routes
              </h3>
              <p className="text-sm">Middleware & Components</p>
            </div>

            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="text-3xl mb-3">👤</div>
              <h3 className="text-xl font-bold mb-2 text-amber-600 dark:text-amber-400">
                User Management
              </h3>
              <p className="text-sm">Roles, Profiles, Settings</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border border-emerald-200">
            <p className="text-center font-bold text-emerald-700 dark:text-emerald-300">
              📌 یہ باب Chapter 19 (Authentication System) کا تسلسل ہے۔
            </p>
          </div>
        </section>

        {/* NextAuth Setup Tab Content */}
        {activeTab === "nextauth" && (
          <>
            {/* Section 20.1: Installation & Setup */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
                20.1: NextAuth.js Installation & Setup
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20">
                <h3 className="text-xl font-bold mb-4 text-emerald-300">
                  📦 Required Packages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-white-30/10">
                    <h4 className="font-bold mb-2 text-blue-300">
                      Core Packages:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>next-auth - Authentication library</li>
                      <li>bcryptjs - Password hashing</li>
                      <li>jsonwebtoken - JWT tokens</li>
                      <li>@next-auth/mongodb-adapter - Database adapter</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <h4 className="font-bold mb-2 text-purple-300">
                      UI Packages:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>react-icons - Icons library</li>
                      <li>lucide-react - Modern icons</li>
                      <li>react-hot-toast - Notifications</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={installationCode}
                colorClass="text-emerald-300"
                title="Terminal Commands - Complete Installation"
              />
            </section>

            {/* Section 20.2: Environment Configuration */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
                20.2: Environment Variables Setup
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-amber-500/5 to-yellow-500/5 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-4 text-amber-300">
                  🔐 Security Best Practices
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-green-300">
                      ✅ ضروری Variables:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>NEXTAUTH_URL - Application URL</li>
                      <li>NEXTAUTH_SECRET - 32+ characters</li>
                      <li>OAuth Client IDs & Secrets</li>
                      <li>Database connection string</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-red-300">
                      ⚠️ احتیاطی تدابیر:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>.gitignore میں شامل کریں</li>
                      <li>GitHub پر commit نہ کریں</li>
                      <li>Production میں الگ keys استعمال کریں</li>
                      <li>Regularly rotate secrets</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={envSetupCode}
                colorClass="text-amber-300"
                title=".env.local - Complete Configuration"
              />
            </section>

            {/* Section 20.3: NextAuth API Route */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
                20.3: NextAuth.js API Route Configuration
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  🚀 Core Features Included
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🔵</div>
                    <h4 className="font-bold mb-2">Google OAuth</h4>
                    <p className="text-sm">Google account login</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🐙</div>
                    <h4 className="font-bold mb-2">GitHub OAuth</h4>
                    <p className="text-sm">GitHub account login</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">📧</div>
                    <h4 className="font-bold mb-2">Credentials</h4>
                    <p className="text-sm">ای میل/پاس ورڈ login</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-700">
                    ✅ Advanced Features:
                  </h4>
                  <ul className="list-disc pr-6 space-y-1 text-sm">
                    <li>JWT session strategy</li>
                    <li>Database adapter for sessions</li>
                    <li>Custom callbacks for user data</li>
                    <li>Role-based authentication</li>
                    <li>Email verification integration</li>
                  </ul>
                </div>
              </div>

              <CodeBlock
                code={nextAuthAPICode}
                colorClass="text-blue-100"
                title="app/api/auth/[...nextauth]/route.js - Complete Configuration"
              />
            </section>
          </>
        )}

        {/* Components Tab Content */}
        {activeTab === "components" && (
          <>
            {/* Section 20.4: Session Provider */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
                20.4: Session Provider & Layout Setup
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  🏗️ Architecture Flow
                </h3>

                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <p className="font-bold text-blue-400">Layout</p>
                    <p className="text-sm">SessionProvider wrap</p>
                  </div>

                  <div className="hidden md:block text-2xl">→</div>

                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <p className="font-bold text-green-400">Components</p>
                    <p className="text-sm">useSession() hook</p>
                  </div>

                  <div className="hidden md:block text-2xl">→</div>

                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <p className="font-bold text-purple-400">Server</p>
                    <p className="text-sm">getServerSession()</p>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={sessionProviderCode}
                colorClass="text-purple-300"
                title="Session Provider Setup - Client & Server Components"
              />
            </section>

            {/* Section 20.5: Login Form Component */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
                20.5: Modern Login Form Component
              </h2>
              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
                <h3 className="text-xl font-bold mb-4 text-green-300">
                  🎨 UI Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      ✅ شامل ہیں:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Google & GitHub Social Login</li>
                      <li>Demo accounts (Student, Teacher, Admin)</li>
                      <li>Password show/hide toggle</li>
                      <li>Remember me checkbox</li>
                      <li>Form validation & error handling</li>
                      <li>Loading states & animations</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-purple-300">
                      🔧 Functions:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>signIn() with credentials</li>
                      <li>signIn() with social providers</li>
                      <li>Auto-redirect after login</li>
                      <li>Toast notifications</li>
                      <li>Form state management</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={loginFormCode}
                colorClass="text-green-300"
                title="components/auth/LoginForm.jsx - Complete Login Form"
              />
            </section>

            {/* Section 20.6: Authentication Hook */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
                20.6: Custom Authentication Hooks
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
                <h3 className="text-xl font-bold mb-4 text-blue-300">
                  🪝 Hook Benefits
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🎯</div>
                    <h4 className="font-bold mb-2">Reusable Logic</h4>
                    <p className="text-sm">One hook, multiple components</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🛡️</div>
                    <h4 className="font-bold mb-2">Type Safety</h4>
                    <p className="text-sm">User data with proper types</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-bold mb-2">Performance</h4>
                    <p className="text-sm">Optimized re-renders</p>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={authHookCode}
                colorClass="text-blue-300"
                title="hooks/useAuth.js - Custom Authentication Hook"
              />
            </section>

            {/* Section 20.7: Protected Route Components */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
                20.7: Protected Route Components
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
                <h3 className="text-xl font-bold mb-4 text-amber-300">
                  🚫 Access Control Levels
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="font-bold">Public Routes</span>
                    <span className="text-sm text-gray-500 mr-auto">
                      - کوئی لاگ ان ضروری نہیں
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="font-bold">Protected Routes</span>
                    <span className="text-sm text-gray-500 mr-auto">
                      - لاگ ان ضروری ہے
                    </span>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-500/10">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="font-bold">Role-Based Routes</span>
                    <span className="text-sm text-gray-500 mr-auto">
                      - مخصوص رول ضروری ہے
                    </span>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={protectedRouteCode}
                colorClass="text-amber-300"
                title="components/auth/ProtectedRoute.jsx - Route Protection"
              />
            </section>
          </>
        )}

        {/* Security Tab Content */}
        {activeTab === "security" && (
          <>
            {/* Section 20.8: Middleware Protection */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
                20.8: Middleware for Route Protection
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-rose-500/5 border border-red-500/20">
                <h3 className="text-xl font-bold mb-4 text-red-300">
                  🛡️ Security Layers
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-green-300">
                      ✅ Middleware Benefits:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Server-side protection</li>
                      <li>Zero client-side exposure</li>
                      <li>Automatic redirects</li>
                      <li>Centralized access control</li>
                      <li>Pre-render blocking</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      🎯 Protected Routes:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>/dashboard/* - All users</li>
                      <li>/admin/* - Admin only</li>
                      <li>/instructor/* - Instructor+</li>
                      <li>/student/* - Student+</li>
                      <li>/profile/* - Authenticated users</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={middlewareCode}
                colorClass="text-red-300"
                title="middleware.js - Complete Route Protection"
              />
            </section>

            {/* Section 20.9: Server Component Example */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
                20.9: Server Component Authentication
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
                <h3 className="text-xl font-bold mb-4 text-purple-300">
                  ⚡ Server-Side Advantages
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">🔒</div>
                    <h4 className="font-bold mb-2">Better Security</h4>
                    <p className="text-sm">No token exposure to client</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">⚡</div>
                    <h4 className="font-bold mb-2">Faster Load</h4>
                    <p className="text-sm">
                      Pre-rendered authenticated content
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-white-30/10">
                    <div className="text-2xl mb-2">💾</div>
                    <h4 className="font-bold mb-2">Direct DB Access</h4>
                    <p className="text-sm">Fetch data in same request</p>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={serverComponentCode}
                colorClass="text-purple-300"
                title="app/admin/dashboard/page.jsx - Server Component Example"
              />
            </section>

            {/* Section 20.10: Sign Out & User Menu */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
                20.10: Sign Out & User Menu Components
              </h2>

              <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-indigo-500/5 to-blue-500/5 border border-indigo-500/20">
                <h3 className="text-xl font-bold mb-4 text-indigo-300">
                  👤 User Experience Features
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-green-300">
                      ✅ User Menu:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Profile picture/avatar</li>
                      <li>User name & email</li>
                      <li>Role badge with icon</li>
                      <li>Email verification status</li>
                      <li>Dropdown with options</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold mb-2 text-blue-300">
                      🎯 Navigation:
                    </h4>
                    <ul className="list-disc pr-6 space-y-2">
                      <li>Dashboard link</li>
                      <li>Profile settings</li>
                      <li>Admin panel (if admin)</li>
                      <li>Sign out with confirmation</li>
                      <li>Responsive design</li>
                    </ul>
                  </div>
                </div>
              </div>

              <CodeBlock
                code={signOutCode}
                colorClass="text-indigo-300"
                title="components/auth/SignOutButton.jsx & UserMenu.jsx"
              />
            </section>
          </>
        )}

        {/* Summary Section */}
        <section className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center text-blue-400">
            🎯 NextAuth.js Integration Summary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">
                ✅ کیا سیکھا:
              </h3>
              <ul className="list-disc pr-6 space-y-3">
                <li>
                  <strong>NextAuth.js complete setup</strong> with multiple
                  providers
                </li>
                <li>
                  <strong>Environment configuration</strong> for production
                </li>
                <li>
                  <strong>Session management</strong> with JWT strategy
                </li>
                <li>
                  <strong>Protected routes</strong> with middleware & components
                </li>
                <li>
                  <strong>Custom hooks</strong> for authentication state
                </li>
                <li>
                  <strong>User interface components</strong> (Login, User Menu,
                  etc.)
                </li>
                <li>
                  <strong>Server components</strong> for secure data fetching
                </li>
                <li>
                  <strong>Role-based access control</strong> implementation
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-amber-400">
                🚀 آگے کیا سیکھیں:
              </h3>
              <ul className="list-disc pr-6 space-y-3">
                <li>
                  <strong>Email verification system</strong> with
                  SendGrid/Resend
                </li>
                <li>
                  <strong>Two-factor authentication (2FA)</strong>
                </li>
                <li>
                  <strong>Password reset flow</strong> with security questions
                </li>
                <li>
                  <strong>Social login additional providers</strong> (Facebook,
                  Twitter)
                </li>
                <li>
                  <strong>Rate limiting</strong> for authentication endpoints
                </li>
                <li>
                  <strong>Audit logging</strong> for security monitoring
                </li>
                <li>
                  <strong>SSO (Single Sign-On)</strong> integration
                </li>
                <li>
                  <strong>Multi-tenant authentication</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
            <h3 className="text-xl font-bold mb-3 text-center text-emerald-300">
              💼 Freelancing Project Ready
            </h3>
            <p className="text-center mb-4">
              اس باب میں دیا گیا کوڈ <strong>production-ready</strong> ہے اور آپ
              اسے فوری طور پر اپنے:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">🎓 LMS Projects</div>
                <div className="text-sm">Learning Management Systems</div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">🏥 Healthcare Apps</div>
                <div className="text-sm">Patient portals & dashboards</div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <div className="font-bold">🏢 Business Apps</div>
                <div className="text-sm">CRM, ERP & internal tools</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Reference */}
        <section className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-slate-900/50 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-center text-blue-300">
            ⚡ Quick Reference Commands
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-slate-800/50">
              <h4 dir="ltr" className="text-left font-bold mb-2 text-green-300">
                🔧 Development:
              </h4>
              <code
                dir="ltr"
                className="block text-sm bg-gray-500   text-left  p-2 rounded mb-2"
              >
                npm run dev
              </code>
              <code
                dir="ltr"
                className="block text-sm bg-gray-500 text-left p-2 rounded mb-2 font-mono"
              >
                npx next lint
              </code>
              <code
                dir="ltr"
                className="block text-sm bg-gray-500   text-left  p-2 rounded"
              >
                npm run build
              </code>
            </div>

            <div className="p-4 rounded-lg bg-slate-800/50">
              <h4 dir="ltr" className="text-left font-bold mb-2 text-amber-300">
                🔑 Secret Generation:
              </h4>
              <code dir="ltr" className="block text-left text-sm bg-gray-500 p-2 rounded font-mono mb-2">
                openssl rand -base64 32
              </code>

              <code
                dir="rtl"
                className="text-left block text-sm bg-gray-500 p-2 rounded font-mono"
              >
                {command}
              </code>
            </div>
          </div>
        </section>

        {/* Final Note */}
        <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-center border border-blue-500/30">
          <p className="text-lg font-bold text-blue-500 mb-2">
            🎉 Congratulations! You've completed NextAuth.js Integration
          </p>
          <p className="text-black/90 dark:text-white/70">
            اب آپ کے پاس ایک مکمل، production-ready authentication system ہے جو
            آپ کسی بھی Next.js project میں استعمال کر سکتے ہیں۔
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 py-3 bg-gradient-to-r from-gray-500/90 to-slate-500/90 backdrop-blur-md border-t border-slate-700/30 text-center text-sm text-gray-400 z-40">
        <div className="flex justify-center items-center gap-4">
          <span>Chapter 20: NextAuth.js Complete Integration</span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">
            Production-Ready Authentication System
          </span>
        </div>
      </footer>
    </div>
  );
}
