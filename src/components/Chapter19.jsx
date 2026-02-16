import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter19() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
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

  // MongoDB Setup Code
  const mongoDBCode = `# Step 1: MongoDB Atlas Account بنائیں
# https://www.mongodb.com/cloud/atlas پر جائیں

# Step 2: نیا Cluster بنائیں
1. "Build a Database" پر کلک کریں
2. FREE tier منتخب کریں
3. Region: Islamabad (اگر دستیاب ہو) یا Singapore
4. Cluster Name: "lms-cluster"
5. "Create Cluster" پر کلک کریں

# Step 3: Database User بنائیں
1. Database Access پر جائیں
2. "Add New Database User" پر کلک کریں
3. Username: "lms-admin"
4. Password: "StrongPassword123!"
5. Database User Privileges: "Read and write to any database"
6. "Add User" پر کلک کریں

# Step 4: Network Access شامل کریں
1. Network Access پر جائیں
2. "Add IP Address" پر کلک کریں
3. "Allow Access from Anywhere" (0.0.0.0/0) منتخب کریں
4. Confirm پر کلک کریں

# Step 5: Connection String حاصل کریں
1. Databases پر جائیں
2. "Connect" button پر کلک کریں
3. "Connect your application" منتخب کریں
4. Driver: Node.js
5. Version: 4.1 or later
6. Connection String کاپی کریں:

mongodb+srv://lms-admin:StrongPassword123!@lms-cluster.mongodb.net/lms_database?retryWrites=true&w=majority

# Step 6: .env.local میں شامل کریں
MONGODB_URI=mongodb+srv://lms-admin:StrongPassword123!@lms-cluster.mongodb.net/lms_database?retryWrites=true&w=majority`;

  // Database Connection Code
  const dbConnectionCode = `// lib/database.js - MongoDB Connection Setup
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ براہ کرم MONGODB_URI کو .env.local میں شامل کریں');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    console.log('✅ MongoDB: Existing connection used');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    console.log('🔄 MongoDB: Creating new connection...');
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('✅ MongoDB: Connected successfully!');
        return mongoose;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

// Global connection close (optional)
export async function disconnectDB() {
  if (cached.conn) {
    await mongoose.disconnect();
    cached.conn = null;
    cached.promise = null;
    console.log('🔌 MongoDB: Disconnected');
  }
}

// Health check function
export async function checkDBHealth() {
  try {
    await connectDB();
    const adminDb = mongoose.connection.db.admin();
    const result = await adminDb.ping();
    return { 
      status: 'healthy', 
      message: 'Database connected successfully',
      ping: result 
    };
  } catch (error) {
    return { 
      status: 'unhealthy', 
      message: error.message,
      error: error 
    };
  }
}`;

  // User Model Code
  const userModelCode = `// models/User.js - مکمل User Model
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'نام درکار ہے'],
    trim: true,
    maxlength: [50, 'نام 50 حروف سے زیادہ نہیں ہو سکتا']
  },
  
  email: {
    type: String,
    required: [true, 'ای میل درکار ہے'],
    unique: true,
    lowercase: true,
    match: [
      /^[\\w.%+-]+@[\\w.-]+\\.[A-Za-z]{2,}$/,
      'براہ کرم درست ای میل درج کریں'
    ],
    index: true
  },
  
  password: {
    type: String,
    minlength: [6, 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے'],
    select: false // Default query میں شامل نہ ہو
  },
  
  // Role Management
  role: {
    type: String,
    enum: {
      values: ['student', 'instructor', 'admin'],
      message: 'رول صرف student, instructor, یا admin ہو سکتا ہے'
    },
    default: 'student',
    index: true
  },
  
  // Profile Information
  avatar: {
    type: String,
    default: '/avatars/default.png'
  },
  
  bio: {
    type: String,
    maxlength: [500, 'بائیو 500 حروف سے زیادہ نہیں ہو سکتی']
  },
  
  phone: {
    type: String,
    match: [/^[0-9]{11}$/, 'براہ کرم درست فون نمبر درج کریں']
  },
  
  address: {
    street: String,
    city: String,
    country: {
      type: String,
      default: 'Pakistan'
    },
    postalCode: String
  },
  
  // Verification & Security
  emailVerified: {
    type: Boolean,
    default: false,
    index: true
  },
  
  verificationToken: String,
  verificationTokenExpires: Date,
  
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  
  loginAttempts: {
    type: Number,
    default: 0
  },
  
  lockUntil: Date,
  
  // Authentication Provider
  authProvider: {
    type: String,
    enum: ['google', 'github', 'email'],
    default: 'email'
  },
  
  socialId: String, // Social provider ID
  
  // Course Relationships
  coursesEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  coursesCreated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  }],
  
  // Progress Tracking
  totalLearningHours: {
    type: Number,
    default: 0
  },
  
  certificatesEarned: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course'
    },
    certificateId: String,
    issuedAt: Date,
    downloadUrl: String
  }],
  
  // Financial (optional)
  balance: {
    type: Number,
    default: 0,
    min: [0, 'بیلنس منفی نہیں ہو سکتا']
  },
  
  transactions: [{
    amount: Number,
    type: {
      type: String,
      enum: ['deposit', 'withdrawal', 'purchase', 'refund', 'earning']
    },
    description: String,
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending'
    }
  }],
  
  // Settings
  notifications: {
    email: {
      type: Boolean,
      default: true
    },
    push: {
      type: Boolean,
      default: true
    },
    sms: {
      type: Boolean,
      default: false
    }
  },
  
  themePreference: {
    type: String,
    enum: ['light', 'dark', 'auto'],
    default: 'auto'
  },
  
  language: {
    type: String,
    default: 'ur'
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  },
  
  lastLogin: Date,
  
  // Soft Delete
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  
  deletedAt: Date
}, {
  timestamps: true, // createdAt اور updatedAt automatically manage ہوں گے
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Password hashing middleware
userSchema.pre('save', async function(next) {
  // صرف تبھی ہیش کریں جب password modify ہوا ہو
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Password update timestamp
userSchema.pre('save', function(next) {
  if (this.isModified('password')) {
    this.updatedAt = Date.now();
  }
  next();
});

// Instance method: پاس ورڈ verify کرنے کے لیے
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('پاس ورڈ verification میں مسئلہ');
  }
};

// Instance method: JWT token generate کرنے کے لیے
userSchema.methods.generateAuthToken = function() {
  const jwt = require('jsonwebtoken');
  return jwt.sign(
    { 
      userId: this._id,
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Instance method: verification token generate کرنے کے لیے
userSchema.methods.generateVerificationToken = function() {
  const crypto = require('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  this.verificationToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
    
  this.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 گھنٹے
  
  return token;
};

// Static method: email سے user تلاش کرنے کے لیے
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email }).select('+password');
};

// Static method: active users count کے لیے
userSchema.statics.getActiveUsersCount = function() {
  return this.countDocuments({ isActive: true });
};

// Indexes for better performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ role: 1, createdAt: -1 });
userSchema.index({ 'coursesEnrolled': 1 });

// Middleware for soft delete
userSchema.pre(/^find/, function(next) {
  // صرف active users ہی fetch ہوں
  if (this.options.withDeleted !== true) {
    this.where({ isActive: true });
  }
  next();
});

export default mongoose.models.User || mongoose.model('User', userSchema);`;

  // User Registration API
  const userRegistrationCode = `// app/api/auth/register/route.js - User Registration API
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

export async function POST(request) {
  try {
    // 1. Database connection
    await connectDB();
    
    // 2. Request data parse کریں
    const data = await request.json();
    const { name, email, password, role = 'student' } = data;
    
    // 3. Validation
    if (!name || !email || !password) {
      return Response.json(
        { 
          success: false, 
          message: "براہ کرم تمام فیلڈز پر کریں" 
        },
        { status: 400 }
      );
    }
    
    // 4. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Response.json(
        { 
          success: false, 
          message: "یہ ای میل پہلے سے استعمال ہو رہی ہے" 
        },
        { status: 409 }
      );
    }
    
    // 5. Create new user
    const user = new User({
      name,
      email: email.toLowerCase(),
      password,
      role,
      emailVerified: false
    });
    
    // 6. Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');
    
    user.verificationToken = hashedToken;
    user.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    
    // 7. Save user to database
    await user.save();
    
    // 8. Send verification email
    const verificationUrl = \`\${process.env.NEXTAUTH_URL}/verify-email?token=\${verificationToken}\`;
    
    try {
      await sendVerificationEmail(email, name, verificationUrl);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue even if email fails
    }
    
    // 9. Generate auth token (optional)
    const authToken = user.generateAuthToken();
    
    // 10. Return success response
    return Response.json(
      {
        success: true,
        message: "رجسٹریشن کامیاب! براہ کرم اپنی ای میل تصدیق کریں",
        data: {
          userId: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: authToken
        },
        verificationRequired: true
      },
      { status: 201 }
    );
    
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return Response.json(
        { success: false, message: messages.join(', ') },
        { status: 400 }
      );
    }
    
    if (error.code === 11000) {
      return Response.json(
        { success: false, message: "یہ ای میل پہلے سے استعمال ہو رہی ہے" },
        { status: 409 }
      );
    }
    
    // General error
    return Response.json(
      { 
        success: false, 
        message: "سرور ایرر، براہ کرم دوبارہ کوشش کریں" 
      },
      { status: 500 }
    );
  }
}

// GET method for checking email availability
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return Response.json(
        { success: false, message: "ای میل درکار ہے" },
        { status: 400 }
      );
    }
    
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    
    return Response.json(
      {
        success: true,
        available: !existingUser,
        message: existingUser 
          ? "ای میل پہلے سے استعمال ہو رہی ہے" 
          : "ای میل دستیاب ہے"
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Email check error:', error);
    return Response.json(
      { success: false, message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`;

  // Registration Form Component
  const registrationFormCode = `// components/auth/RegistrationForm.jsx - User Self-Registration Form
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, Mail, Lock, Eye, EyeOff, 
  CheckCircle, XCircle, Loader2,
  Book, GraduationCap, Shield 
} from 'lucide-react';

export default function RegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeToTerms: false,
  });
  
  const roles = [
    {
      id: 'student',
      title: 'طالب علم',
      description: 'کورسز حاصل کریں اور سیکھیں',
      icon: Book,
      color: 'blue',
    },
    {
      id: 'instructor',
      title: 'استاد',
      description: 'کورسز بنائیں اور پڑھائیں',
      icon: GraduationCap,
      color: 'green',
    },
    {
      id: 'admin',
      title: 'منتظم',
      description: 'سسٹم کا انتظام کریں',
      icon: Shield,
      color: 'purple',
    },
  ];
  
  // Email availability check
  const checkEmailAvailability = async (email) => {
    if (!email || email.length < 5) {
      setEmailAvailable(null);
      return;
    }
    
    setCheckingEmail(true);
    try {
      const response = await fetch(\`/api/auth/register?email=\${encodeURIComponent(email)}\`);
      const data = await response.json();
      
      if (data.success) {
        setEmailAvailable(data.available);
        setError(data.available ? '' : 'یہ ای میل پہلے سے استعمال ہو رہی ہے');
      }
    } catch (error) {
      console.error('Email check error:', error);
    } finally {
      setCheckingEmail(false);
    }
  };
  
  // Handle email change
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData({ ...formData, email });
    setEmailAvailable(null);
    
    // Debounced email check
    clearTimeout(window.emailCheckTimeout);
    window.emailCheckTimeout = setTimeout(() => {
      checkEmailAvailability(email);
    }, 500);
  };
  
  // Handle role selection
  const handleRoleSelect = (roleId) => {
    setFormData({ ...formData, role: roleId });
  };
  
  // Next step
  const handleNextStep = () => {
    if (!formData.role) {
      setError('براہ کرم ایک رول منتخب کریں');
      return;
    }
    setStep(2);
    setError('');
  };
  
  // Previous step
  const handlePrevStep = () => {
    setStep(1);
    setError('');
  };
  
  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.name.trim()) {
      setError('براہ کرم اپنا نام درج کریں');
      setLoading(false);
      return;
    }
    
    if (!formData.email.trim()) {
      setError('براہ کرم ای میل درج کریں');
      setLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے');
      setLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('پاس ورڈ اور تصدیقی پاس ورڈ مماثل نہیں ہیں');
      setLoading(false);
      return;
    }
    
    if (!formData.agreeToTerms) {
      setError('براہ کرم شرائط و ضوابط سے متفق ہوں');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'رجسٹریشن میں مسئلہ پیش آیا');
      }
      
      if (data.success) {
        setSuccess(data.message);
        
        // Redirect to verification page
        setTimeout(() => {
          router.push(\`/verify-email?email=\${encodeURIComponent(formData.email)}\`);
        }, 2000);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-center mb-4">
          {[1, 2].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div
                className={\`w-10 h-10 rounded-full flex items-center justify-center font-bold \${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}\`}
              >
                {stepNum}
              </div>
              {stepNum < 2 && (
                <div
                  className={\`w-24 h-1 mx-4 \${step > stepNum ? 'bg-blue-600' : 'bg-gray-200'}\`}
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-gray-600">
          مرحلہ {step} از 2: {step === 1 ? 'رول منتخب کریں' : 'معلومات درج کریں'}
        </p>
      </div>
      
      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 text-center font-medium">{success}</p>
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-center font-medium">{error}</p>
        </div>
      )}
      
      {/* Step 1: Role Selection */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            آپ کس رول کے ساتھ شامل ہونا چاہتے ہیں؟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roles.map((role) => {
              const Icon = role.icon;
              const isSelected = formData.role === role.id;
              
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => handleRoleSelect(role.id)}
                  className={\`p-6 border-2 rounded-xl text-right transition-all duration-300 \${isSelected ? \`border-\${role.color}-500 bg-\${role.color}-50 shadow-lg scale-105\` : 'border-gray-200 hover:border-gray-300 hover:shadow-md'}\`}
                >
                  <div className="flex justify-end mb-4">
                    <div
                      className={\`p-3 rounded-lg transition-colors \${isSelected ? \`bg-\${role.color}-100\` : 'bg-gray-100'}\`}
                    >
                      <Icon
                        className={\`h-6 w-6 transition-colors \${isSelected ? \`text-\${role.color}-600\` : 'text-gray-500'}\`}
                      />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{role.description}</p>
                  
                  {isSelected && (
                    <div className="flex items-center text-green-600 font-medium">
                      <CheckCircle className="h-4 w-4 ml-1" />
                      منتخب شدہ
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          
          <div className="text-center">
            <button
              onClick={handleNextStep}
              disabled={!formData.role}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              اگلا مرحلہ →
            </button>
          </div>
        </div>
      )}
      
      {/* Step 2: Registration Form */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            اکاؤنٹ کی معلومات درج کریں
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Role Display */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {(() => {
                    const role = roles.find(r => r.id === formData.role);
                    const Icon = role?.icon;
                    return (
                      <>
                        <Icon className="h-5 w-5 text-blue-600 ml-2" />
                        <span className="font-medium text-blue-800">
                          {role?.title} کے طور پر سائن اپ کر رہے ہیں
                        </span>
                      </>
                    );
                  })()}
                </div>
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  رول تبدیل کریں
                </button>
              </div>
            </div>
            
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                مکمل نام <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="اپنا مکمل نام درج کریں"
                  dir="auto"
                />
              </div>
            </div>
            
            {/* Email Input with Availability Check */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                ای میل ایڈریس <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleEmailChange}
                  required
                  className={\`w-full pr-12 pl-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition \${emailAvailable === false ? 'border-red-500' : emailAvailable === true ? 'border-green-500' : 'border-gray-300'}\`}
                  placeholder="example@gmail.com"
                  dir="ltr"
                />
                
                {/* Email Status Indicator */}
                {checkingEmail && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                  </div>
                )}
                
                {!checkingEmail && emailAvailable === true && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                )}
                
                {!checkingEmail && emailAvailable === false && (
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <XCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              
              {/* Email Status Text */}
              {checkingEmail && (
                <p className="mt-2 text-sm text-gray-500">ای میل چیک ہو رہی ہے...</p>
              )}
              
              {!checkingEmail && emailAvailable === true && (
                <p className="mt-2 text-sm text-green-600">✓ ای میل دستیاب ہے</p>
              )}
              
              {!checkingEmail && emailAvailable === false && (
                <p className="mt-2 text-sm text-red-600">✗ یہ ای میل پہلے سے استعمال ہو رہی ہے</p>
              )}
            </div>
            
            {/* Password Input */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                پاس ورڈ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                  className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="کم از کم 6 حروف"
                  dir="ltr"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے
              </p>
            </div>
            
            {/* Confirm Password Input */}
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                پاس ورڈ کی تصدیق کریں <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  minLength={6}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="پاس ورڈ دوبارہ درج کریں"
                  dir="ltr"
                />
              </div>
              
              {/* Password Match Indicator */}
              {formData.password && formData.confirmPassword && (
                <div className="mt-2">
                  {formData.password === formData.confirmPassword ? (
                    <p className="text-sm text-green-600 flex items-center">
                      <CheckCircle className="h-4 w-4 ml-1" />
                      پاس ورڈ مماثل ہیں
                    </p>
                  ) : (
                    <p className="text-sm text-red-600 flex items-center">
                      <XCircle className="h-4 w-4 ml-1" />
                      پاس ورڈ مماثل نہیں ہیں
                    </p>
                  )}
                </div>
              )}
            </div>
            
            {/* Terms Agreement */}
            <div className="pt-4">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ml-2"
                />
                <span className="text-gray-700">
                  میں{" "}
                  <a
                    href="/terms"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    target="_blank"
                  >
                    شرائط و ضوابط
                  </a>{" "}
                  اور{" "}
                  <a
                    href="/privacy"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    target="_blank"
                  >
                    رازداری کی پالیسی
                  </a>{" "}
                  سے متفق ہوں <span className="text-red-500">*</span>
                </span>
              </label>
            </div>
            
            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading || emailAvailable === false || !formData.agreeToTerms}
                className={\`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors \${loading || emailAvailable === false || !formData.agreeToTerms ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}\`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                    رجسٹریشن ہو رہی ہے...
                  </span>
                ) : (
                  'اکاؤنٹ بنائیں'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Already have account */}
      <div className="mt-8 text-center pt-6 border-t border-gray-200">
        <p className="text-gray-600">
          پہلے سے اکاؤنٹ ہے؟{' '}
          <a
            href="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            لاگ ان کریں
          </a>
        </p>
      </div>
    </div>
  );
}`;

  // Email Verification System
  const emailVerificationCode = `// lib/email.js - Email Service
import nodemailer from 'nodemailer';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Send verification email
export async function sendVerificationEmail(email, name, verificationUrl) {
  const mailOptions = {
    from: \`"پاکستان LMS" <\${process.env.EMAIL_FROM}>\`,
    to: email,
    subject: 'آپ کے LMS اکاؤنٹ کی تصدیق کریں',
    html: \`
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🌐 پاکستان LMS</h1>
          <p style="color: rgba(255, 255, 255, 0.9); margin-top: 10px; font-size: 16px;">
            آن لائن تعلیم کا بہترین پلیٹ فارم
          </p>
        </div>
        
        <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #374151; margin-bottom: 20px; font-size: 24px;">
            خوش آمدید \${name}!
          </h2>
          
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            آپ کے LMS اکاؤنٹ کی تصدیق کے لیے براہ کرم نیچے دیے گئے بٹن پر کلک کریں:
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="\${verificationUrl}" 
               style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                      color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;
                      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4); transition: all 0.3s ease;">
              اپنے اکاؤنٹ کی تصدیق کریں
            </a>
          </div>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 30px;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              <strong>مہربانی نوٹ:</strong>
            </p>
            <ul style="color: #6b7280; font-size: 14px; margin: 0; padding-right: 20px;">
              <li style="margin-bottom: 8px;">یہ لنک 24 گھنٹے تک فعال رہے گا</li>
              <li style="margin-bottom: 8px;">اگر آپ نے یہ اکاؤنٹ نہیں بنایا تو براہ کرم اس ای میل کو نظر انداز کریں</li>
              <li>تصدیق کے بعد آپ اپنے تمام کورسز اور فیچرز تک رسائی حاصل کر سکیں گے</li>
            </ul>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #9ca3af; font-size: 14px; text-align: center; margin: 0;">
              اگر آپ کو بٹن کام نہ کرے، تو براہ کرم اس لنک کو کاپی اور براؤزر میں پیسٹ کریں:<br>
              <a href="\${verificationUrl}" style="color: #667eea; word-break: break-all;">\${verificationUrl}</a>
            </p>
          </div>
        </div>
        
        <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
          <p style="margin: 0;">© 2024 پاکستان LMS. تمام حقوق محفوظ ہیں۔</p>
          <p style="margin: 5px 0 0 0;">
            <a href="\${process.env.NEXTAUTH_URL}/contact" style="color: #667eea; margin: 0 10px;">رابطہ</a> |
            <a href="\${process.env.NEXTAUTH_URL}/privacy" style="color: #667eea; margin: 0 10px;">رازداری</a> |
            <a href="\${process.env.NEXTAUTH_URL}/terms" style="color: #667eea; margin: 0 10px;">شرائط</a>
          </p>
        </div>
      </div>
    \`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('ای میل بھیجنے میں ناکامی');
  }
}

// Send welcome email
export async function sendWelcomeEmail(email, name) {
  const mailOptions = {
    from: \`"پاکستان LMS" <\${process.env.EMAIL_FROM}>\`,
    to: email,
    subject: 'پاکستان LMS میں خوش آمدید!',
    html: \`
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🎉 خوش آمدید!</h1>
        </div>
        
        <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px;">
          <h2 style="color: #374151; margin-bottom: 20px;">
            عزیز \${name},
          </h2>
          
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6;">
            آپ کا پاکستان LMS میں خیرمقدم ہے! آپ کی ای میل تصدیق ہو چکی ہے اور اب آپ اپنے تعلیمی سفر کا آغاز کر سکتے ہیں۔
          </p>
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="\${process.env.NEXTAUTH_URL}/dashboard" 
               style="display: inline-block; padding: 14px 35px; background: #10b981; color: white; 
                      text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              اپنا ڈیش بورڈ دیکھیں
            </a>
          </div>
          
          <div style="background: #f0fdf4; padding: 25px; border-radius: 8px; border-right: 4px solid #10b981;">
            <h3 style="color: #065f46; margin-top: 0;">🚀 آغاز کی تجاویز:</h3>
            <ul style="color: #047857; padding-right: 20px;">
              <li style="margin-bottom: 10px;">اپنا پروفائل مکمل کریں</li>
              <li style="margin-bottom: 10px;">اپنے دلچسپی کے کورسز تلاش کریں</li>
              <li style="margin-bottom: 10px;">ہمارے مفت introductory courses سے شروع کریں</li>
              <li>دوسرے طلبہ سے جڑیں اور سیکھیں</li>
            </ul>
          </div>
        </div>
      </div>
    \`,
  };

  return transporter.sendMail(mailOptions);
}`;

// Password Reset Email Template
const passwordResetEmailCode = `// lib/email.js میں اضافہ
export async function sendPasswordResetEmail(email, name, resetUrl) {
  const mailOptions = {
    from: \`"پاکستان LMS" <\${process.env.EMAIL_FROM}>\`,
    to: email,
    subject: 'آپ کے پاس ورڈ کو ریسیٹ کرنے کی درخواست',
    html: \`
      <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🔐 پاس ورڈ ریسیٹ</h1>
        </div>
        
        <div style="padding: 40px; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #374151; margin-bottom: 20px;">
            عزیز \${name},
          </h2>
          
          <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
            ہمیں آپ کے پاس ورڈ ریسیٹ کی درخواست موصول ہوئی ہے۔ براہ کرم نیچے دیے گئے بٹن پر کلک کر کے نیا پاس ورڈ سیٹ کریں:
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="\${resetUrl}" 
               style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
                      color: white; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 18px;
                      box-shadow: 0 4px 15px rgba(245, 158, 11, 0.4); transition: all 0.3s ease;">
              نیا پاس ورڈ سیٹ کریں
            </a>
          </div>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 8px; border-right: 4px solid #f59e0b;">
            <p style="color: #92400e; font-size: 14px; margin: 0;">
              <strong>⚠️ اہم معلومات:</strong><br>
              یہ لنک صرف 1 گھنٹے تک فعال رہے گا۔ اگر آپ نے یہ درخواست نہیں بھیجی، تو براہ کرم اس ای میل کو نظر انداز کریں۔
            </p>
          </div>
          
          <p style="color: #9ca3af; font-size: 14px; margin-top: 30px; text-align: center;">
            اگر بٹن کام نہ کرے، تو یہ لنک کاپی کریں:<br>
            <a href="\${resetUrl}" style="color: #f59e0b; word-break: break-all;">\${resetUrl}</a>
          </p>
        </div>
      </div>
    \`,
  };

  return transporter.sendMail(mailOptions);
}`;

// Password Reset API
const passwordResetAPICode = `// app/api/auth/forgot-password/route.js
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import crypto from 'crypto';
import { sendPasswordResetEmail } from "@/lib/email";

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
    
    if (!user) {
      // Security: Don't reveal that user doesn't exist
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
    
    // Save to database
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save();
    
    // Send reset email
    const resetUrl = \`\${process.env.NEXTAUTH_URL}/reset-password?token=\${resetToken}\`;
    
    try {
      await sendPasswordResetEmail(email, user.name, resetUrl);
    } catch (emailError) {
      console.error('Reset email failed:', emailError);
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
        data: {
          email: user.email,
          expiresIn: "1 گھنٹہ"
        }
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return Response.json(
      { success: false, message: "سرور ایرر" },
      { status: 500 }
    );
  }
}`;

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
          className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current"
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
        {/* Chapter Title */}
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          باب 19: Professional Authentication System
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600">
          NextAuth.js + MongoDB + Role-Based Access Control
        </p>

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 border border-blue-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-blue-400">
            🎯 باب کا مقصد
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>مکمل Professional Authentication System</strong> بنائیں گے جو <strong>Production-ready</strong> ہوگا۔ آپ اسے فوری طور پر اپنے <strong>Freelancing projects</strong> میں استعمال کر سکیں گے۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">مکمل سیکیورٹی</h3>
              <p className="text-sm">NextAuth.js + JWT + Bcrypt</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">👥</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">تین Role System</h3>
              <p className="text-sm">Student, Instructor, Admin</p>
            </div>
            
            <div className="bg-white-30/80 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">📧</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">ای میل تصدیق</h3>
              <p className="text-sm">مکمل verification system</p>
            </div>
          </div>
        </section>

        {/* Section 19.1: MongoDB Setup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
            19.1: MongoDB Atlas Database Setup
          </h2>

          <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-emerald-500/5 to-green-500/5 border border-emerald-500/20">
            <h3 className="text-xl font-bold mb-4 text-emerald-300">
              🚀 Step-by-Step MongoDB Cloud Setup
            </h3>
            <p className="mb-4">
              MongoDB Atlas ایک cloud database service ہے جو free tier میں دستیاب ہے۔
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white-30/10">
                <h4 className="font-bold mb-2 text-blue-300">✅ فوائد:</h4>
                <ul className="list-disc pr-6 space-y-2 text-sm">
                  <li>مفت 512MB storage</li>
                  <li>Auto-scaling</li>
                  <li>Backup & Recovery</li>
                  <li>Real-time monitoring</li>
                  <li>Global clusters</li>
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-white-30/10">
                <h4 className="font-bold mb-2 text-purple-300">📊 استعمال:</h4>
                <ul className="list-disc pr-6 space-y-2 text-sm">
                  <li>User authentication</li>
                  <li>Course management</li>
                  <li>Student progress tracking</li>
                  <li>Payment records</li>
                  <li>Analytics data</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400">
            📝 MongoDB Atlas Setup Code
          </h3>
          <CodeBlock 
            code={mongoDBCode} 
            colorClass="text-emerald-300"
            title="Terminal Commands & Configuration"
          />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🔗 Database Connection Code
          </h3>
          <CodeBlock 
            code={dbConnectionCode} 
            colorClass="text-blue-300"
            title="lib/database.js - Connection Management"
          />
        </section>

        {/* Section 19.2: User Model Design */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
            19.2: User Model Design & Schema
          </h2>

          <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
            <h3 className="text-xl font-bold mb-4 text-purple-300">
              🏗️ Complete User Schema Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-white-30/10">
                <div className="text-2xl mb-2">🔐</div>
                <h4 className="font-bold mb-2">Security</h4>
                <p className="text-sm">Password hashing, JWT tokens, Email verification</p>
              </div>
              
              <div className="p-4 rounded-lg bg-white-30/10">
                <div className="text-2xl mb-2">👤</div>
                <h4 className="font-bold mb-2">Profile</h4>
                <p className="text-sm">Complete user profile with bio, avatar, address</p>
              </div>
              
              <div className="p-4 rounded-lg bg-white-30/10">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-bold mb-2">Analytics</h4>
                <p className="text-sm">Learning hours, certificates, progress tracking</p>
              </div>
            </div>
          </div>

          <CodeBlock 
            code={userModelCode} 
            colorClass="text-purple-300"
            title="models/User.js - Complete User Model"
          />
        </section>

        {/* Section 19.3: User Registration */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            19.3: User Self-Registration System
          </h2>

          <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-sky-500/5 to-cyan-500/5 border border-sky-500/20">
            <h3 className="text-xl font-bold mb-4 text-sky-300">
              🎯 Registration Flow
            </h3>
            
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">1</span>
                </div>
                <p className="font-bold text-sky-400">Role Selection</p>
                <p className="text-sm">Student, Instructor, or Admin</p>
              </div>

              <div className="hidden md:block text-2xl">→</div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">2</span>
                </div>
                <p className="font-bold text-emerald-400">Form Fill</p>
                <p className="text-sm">Name, Email, Password</p>
              </div>

              <div className="hidden md:block text-2xl">→</div>

              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                  <span className="text-xl font-bold">3</span>
                </div>
                <p className="font-bold text-purple-400">Verification</p>
                <p className="text-sm">Email confirmation</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400">
            📡 Registration API Endpoint
          </h3>
          <CodeBlock 
            code={userRegistrationCode} 
            colorClass="text-sky-300"
            title="app/api/auth/register/route.js - Registration API"
          />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🎨 Registration Form Component
          </h3>
          <CodeBlock 
            code={registrationFormCode} 
            colorClass="text-cyan-300"
            title="components/auth/RegistrationForm.jsx - User Interface"
          />
        </section>

        {/* Section 19.4: Email Verification */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
            19.4: Email Verification System
          </h2>

          <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20">
            <h3 className="text-xl font-bold mb-4 text-amber-300">
              📧 Why Email Verification?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-green-400">✅ فوائد:</h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>User authenticity کی تصدیق</li>
                  <li>Spam accounts سے بچاؤ</li>
                  <li>Password reset کی سہولت</li>
                  <li>Important notifications بھیجنا</li>
                  <li>Security enhancement</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-blue-400">⚙️ Features:</h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>24-hour expiry tokens</li>
                  <li>Professional email templates</li>
                  <li>Resend verification option</li>
                  <li>Mobile responsive emails</li>
                  <li>Tracking & analytics</li>
                </ul>
              </div>
            </div>
          </div>

          <CodeBlock 
            code={emailVerificationCode} 
            colorClass="text-amber-300"
            title="lib/email.js - Complete Email Service"
          />
        </section>
        {/* Section 19.5: Password Reset System */}
<section className="mb-16">
  <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
    19.5: Password Reset & Recovery System
  </h2>

  <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
    <h3 className="text-xl font-bold mb-4 text-red-300">
      🔐 Secure Password Recovery
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-bold mb-2 text-green-300">✅ Security Features:</h4>
        <ul className="list-disc pr-6 space-y-2">
          <li>1-hour expiry tokens</li>
          <li>SHA-256 hashing</li>
          <li>Email confirmation required</li>
          <li>Rate limiting protection</li>
          <li>No user enumeration</li>
        </ul>
      </div>

      <div>
        <h4 className="font-bold mb-2 text-blue-300">📧 Email Flow:</h4>
        <ul className="list-disc pr-6 space-y-2">
          <li>User requests password reset</li>
          <li>System sends reset email</li>
          <li>User clicks reset link</li>
          <li>Sets new password</li>
          <li>Confirmation email sent</li>
        </ul>
      </div>
    </div>
  </div>

  <h3 className="text-xl font-bold mb-4 text-blue-400">
    📧 Password Reset Email Template
  </h3>
  <CodeBlock 
    code={passwordResetEmailCode} 
    colorClass="text-red-300"
    title="Password Reset Email Template"
  />

  <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
    🔄 Password Reset API
  </h3>
  <CodeBlock 
    code={passwordResetAPICode} 
    colorClass="text-orange-300"
    title="app/api/auth/forgot-password/route.js"
  />
</section>

        {/* Practice Section */}
        <section className="my-16 p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg text-center" dir="rtl">
            <p className="flex items-center justify-center gap-2">
              <span className="bg-blue-500 text-white p-2 rounded">1</span>
              MongoDB Atlas میں free database بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">2</span>
              User Model کو implement کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">3</span>
              Registration form بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">4</span>
              Email verification system test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-red-500 text-white p-2 rounded">5</span>
              Complete authentication flow test کریں
            </p>
          </div>
        </section>

        {/* Summary */}
        <section className="p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400 italic">
            📌 خلاصہ (Chapter 19 Summary)
          </h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li className="flex items-center gap-2">
              <span className="bg-blue-500 text-white p-1 rounded text-sm">✓</span>
              <strong>MongoDB Atlas Setup:</strong> Cloud database configuration
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-green-500 text-white p-1 rounded text-sm">✓</span>
              <strong>Database Connection:</strong> Professional connection management
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-purple-500 text-white p-1 rounded text-sm">✓</span>
              <strong>User Model Design:</strong> Complete schema with security
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-amber-500 text-white p-1 rounded text-sm">✓</span>
              <strong>Registration System:</strong> Self-registration with validation
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-red-500 text-white p-1 rounded text-sm">✓</span>
              <strong>Email Verification:</strong> Professional email templates
            </li>
            <li className="flex items-center gap-2">
              <span className="bg-indigo-500 text-white p-1 rounded text-sm">✓</span>
              <strong>Role-Based Access:</strong> Student, Instructor, Admin roles
            </li>
          </ul>
        </section>

        {/* Next Chapter Preview */}
        <section className="p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 dark:text-emerald-400 italic">
            🚀 اگلے باب میں
          </h2>
          <p className="mb-4 text-lg">
            اگلے باب میں ہم <strong>Complete NextAuth.js Integration</strong> سیکھیں گے:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>Google OAuth Configuration</li>
            <li>GitHub OAuth Setup</li>
            <li>Session Management</li>
            <li>Protected Routes Middleware</li>
            <li>JWT Token Handling</li>
            <li>Social Login Integration</li>
            <li>Password Reset System</li>
            <li>Security Best Practices</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 19: Professional Authentication System
          </p>
          <p className="text-sm mt-2">
            🚀 اگلے سبق میں ہم NextAuth.js مکمل integration سیکھیں گے!
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
        
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </div>
  );
}