import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter25() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("admin-dashboard");

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

  // Tabs for different sections
  const tabs = [
    { id: "admin-dashboard", label: "👑 ایڈمن ڈیش بورڈ", color: "purple" },
    { id: "pakistani-payments", label: "🇵🇰 پاکستانی پے منٹس", color: "green" },
    { id: "international-payments", label: "🌍 انٹرنیشنل پے منٹس", color: "blue" },
    { id: "payment-api", label: "💳 پے منٹ API", color: "red" }
  ];

  // Section 25.1: Complete Admin Dashboard
  const adminDashboardCode = `// 📁 app/admin/dashboard/page.jsx - Complete Admin Dashboard
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  Users, Video, BookOpen, DollarSign,
  TrendingUp, ShoppingCart, CreditCard, Shield,
  BarChart3, Package, Clock, Award,
  AlertCircle, CheckCircle, XCircle, Download
} from "lucide-react";

// Server Component - Admin Dashboard
export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  // ✅ ایڈمن چیک
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  // 📊 ڈیٹا fetch کریں (حقیقی پروجیکٹ میں database سے)
  const stats = await fetchDashboardStats();
  const recentOrders = await getRecentOrders();
  const topCourses = await getTopCourses();
  const userGrowth = await getUserGrowthData();

  return (
    <AdminLayout user={session.user}>
      {/* 🎯 ڈیش بورڈ ہیڈر */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          ایڈمن ڈیش بورڈ
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          خوش آمدید، {session.user.name}! آپ سسٹم کا انتظام کر سکتے ہیں۔
        </p>
      </div>

      {/* 📊 اہم اعداد و شمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* کل صارفین */}
        <DashboardCard
          title="کل صارفین"
          value={stats.totalUsers.toLocaleString()}
          icon={<Users className="h-8 w-8 text-blue-600" />}
          change="+12% گزشتہ ماہ"
          changeType="positive"
          bgColor="bg-blue-100 dark:bg-blue-900/30"
        />

        {/* کل آمدنی */}
        <DashboardCard
          title="کل آمدنی"
          value={\`₹\${stats.totalRevenue.toLocaleString()}\`}
          icon={<DollarSign className="h-8 w-8 text-green-600" />}
          change="+25% گزشتہ ماہ"
          changeType="positive"
          bgColor="bg-green-100 dark:bg-green-900/30"
        />

        {/* کل کورسز */}
        <DashboardCard
          title="کل کورسز"
          value={stats.totalCourses.toString()}
          icon={<Video className="h-8 w-8 text-purple-600" />}
          change={\`\${stats.activeCourses} فعال\`}
          changeType="neutral"
          bgColor="bg-purple-100 dark:bg-purple-900/30"
        />

        {/* زیر التواء آرڈرز */}
        <DashboardCard
          title="زیر التواء آرڈرز"
          value={stats.pendingOrders.toString()}
          icon={<ShoppingCart className="h-8 w-8 text-amber-600" />}
          change="تصدیق کا انتظار"
          changeType="warning"
          bgColor="bg-amber-100 dark:bg-amber-900/30"
        />
      </div>

      {/* 📈 چارٹس اور ڈیٹا */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* آمدنی کا چارٹ */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              آمدنی کا چارٹ
            </h2>
            <select className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700">
              <option>آخری 7 دن</option>
              <option>آخری 30 دن</option>
              <option>آخری 90 دن</option>
            </select>
          </div>
          <div className="h-64">
            {/* Revenue Chart Component */}
            <RevenueChart data={userGrowth} />
          </div>
        </div>

        {/* حالیہ آرڈرز */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              حالیہ آرڈرز
            </h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
              تمام دیکھیں →
            </button>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        </div>
      </div>

      {/* 📋 ٹاپ کورسز اور صارفین */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* مقبول کورسز */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            مقبول کورسز
          </h2>
          <div className="space-y-4">
            {topCourses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* حالیہ صارفین */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            حالیہ صارفین
          </h2>
          <div className="space-y-4">
            {stats.recentUsers.map(user => (
              <UserItem key={user.id} user={user} />
            ))}
          </div>
        </div>
      </div>

      {/* ⚡ فوری اقدامات */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          فوری اقدامات
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickAction
            icon={<Users className="h-6 w-6" />}
            label="صارفین کا انتظام"
            color="blue"
            href="/admin/users"
          />
          
          <QuickAction
            icon={<Video className="h-6 w-6" />}
            label="کورسز کا انتظام"
            color="purple"
            href="/admin/courses"
          />
          
          <QuickAction
            icon={<CreditCard className="h-6 w-6" />}
            label="آرڈرز دیکھیں"
            color="green"
            href="/admin/orders"
          />
          
          <QuickAction
            icon={<Shield className="h-6 w-6" />}
            label="سیکورٹی"
            color="red"
            href="/admin/security"
          />
        </div>
      </div>

      {/* 📊 سسٹم اسٹیٹس */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <span className="font-medium">سسٹم لوڈ</span>
          </div>
          <div className="mt-2 h-2 bg-blue-200 dark:bg-blue-800 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600" style={{ width: '65%' }}></div>
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">65% استعمال</span>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium">سسٹم اسٹیٹس</span>
          </div>
          <p className="mt-2 text-green-700 dark:text-green-400 text-sm">
            تمام سسٹمز معمول پر ہیں
          </p>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-600" />
            <span className="font-medium">آخری بیک اپ</span>
          </div>
          <p className="mt-2 text-amber-700 dark:text-amber-400 text-sm">
            2 گھنٹے پہلے
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

// 🎴 ڈیش بورڈ کارڈ کمپوننٹ
function DashboardCard({ title, value, icon, change, changeType, bgColor }) {
  const changeColors = {
    positive: "text-green-600 dark:text-green-400",
    negative: "text-red-600 dark:text-red-400",
    warning: "text-amber-600 dark:text-amber-400",
    neutral: "text-blue-600 dark:text-blue-400"
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          <p className={\`text-sm mt-1 flex items-center \${changeColors[changeType]}\`}>
            <TrendingUp className="inline w-4 h-4 mr-1" />
            {change}
          </p>
        </div>
        <div className={\`p-3 rounded-lg \${bgColor}\`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// 🛒 آرڈر آئٹم کمپوننٹ
function OrderItem({ order }) {
  const statusConfig = {
    "کامیاب": { bg: "bg-green-100 dark:bg-green-900/30", text: "text-green-800 dark:text-green-400" },
    "زیر التواء": { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-800 dark:text-amber-400" },
    "ناکام": { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-800 dark:text-red-400" },
    "پروسیسنگ": { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-800 dark:text-blue-400" }
  };

  const config = statusConfig[order.status] || statusConfig["پروسیسنگ"];

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">{order.user}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{order.course}</p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          {new Date(order.date).toLocaleDateString('ur-PK')}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-gray-900 dark:text-white">{order.amount}</p>
        <span className={\`text-xs px-2 py-1 rounded-full \${config.bg} \${config.text}\`}>
          {order.status}
        </span>
      </div>
    </div>
  );
}

// 📚 کورس آئٹم کمپوننٹ
function CourseItem({ course }) {
  return (
    <div className="flex items-center gap-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
        <BookOpen className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{course.title}</h4>
        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600 dark:text-gray-400">
          <span>👨‍🎓 {course.enrollments}</span>
          <span>⭐ {course.rating}</span>
          <span>💰 {course.revenue}</span>
        </div>
      </div>
      <Award className="h-5 w-5 text-amber-500" />
    </div>
  );
}

// 👤 صارف آئٹم کمپوننٹ
function UserItem({ user }) {
  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
        {user.name.charAt(0)}
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900 dark:text-white">{user.name}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
      </div>
      <span className={\`text-xs px-2 py-1 rounded-full \${user.role === 'admin' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'}\`}>
        {user.role}
      </span>
    </div>
  );
}

// ⚡ فوری ایکشن کمپوننٹ
function QuickAction({ icon, label, color, href }) {
  const colorClasses = {
    blue: "hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    purple: "hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    green: "hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800",
    red: "hover:bg-red-50 dark:hover:bg-red-900/20 border-red-200 dark:border-red-800"
  };

  return (
    <a
      href={href}
      className={\`p-4 border rounded-lg text-center transition-all duration-200 \${colorClasses[color]}\`}
    >
      <div className={\`mb-2 \${color === 'blue' ? 'text-blue-600' : color === 'purple' ? 'text-purple-600' : color === 'green' ? 'text-green-600' : 'text-red-600'}\`}>
        {icon}
      </div>
      <span className="font-medium text-gray-900 dark:text-white">{label}</span>
    </a>
  );
}

// 📊 Revenue Chart Component (مثال کے طور پر)
function RevenueChart({ data }) {
  return (
    <div className="h-full flex items-end gap-2">
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center">
          <div
            className="w-full bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 rounded-t-lg"
            style={{ height: \`\${item.value}%\` }}
          ></div>
          <span className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// 🗂️ ڈیٹا fetch کرنے والے functions (مثال)
async function fetchDashboardStats() {
  // حقیقی پروجیکٹ میں یہاں database query ہوگی
  return {
    totalUsers: 1254,
    activeUsers: 893,
    totalCourses: 56,
    activeCourses: 42,
    totalRevenue: 452500,
    monthlyRevenue: 125000,
    pendingOrders: 23,
    completedOrders: 456,
    recentUsers: [
      { id: 1, name: "احمد رضا", email: "ahmed@example.com", role: "student" },
      { id: 2, name: "فاطمہ علی", email: "fatima@example.com", role: "instructor" },
      { id: 3, name: "عمران خان", email: "imran@example.com", role: "student" }
    ]
  };
}

async function getRecentOrders() {
  return [
    { id: 1, user: "احمد رضا", course: "React JS", amount: "₹5,000", status: "کامیاب", date: "2024-01-15" },
    { id: 2, user: "فاطمہ علی", course: "Next.js", amount: "₹7,000", status: "زیر التواء", date: "2024-01-14" },
    { id: 3, user: "عمران خان", course: "Node.js", amount: "₹6,500", status: "کامیاب", date: "2024-01-14" },
    { id: 4, user: "سارہ احمد", course: "MongoDB", amount: "₹4,500", status: "ناکام", date: "2024-01-13" },
    { id: 5, user: "محمد علی", course: "TypeScript", amount: "₹3,500", status: "پروسیسنگ", date: "2024-01-13" }
  ];
}

async function getTopCourses() {
  return [
    { id: 1, title: "React JS Complete Guide", enrollments: 245, rating: 4.8, revenue: "₹1,225,000" },
    { id: 2, title: "Next.js Masterclass", enrollments: 189, rating: 4.9, revenue: "₹945,000" },
    { id: 3, title: "Node.js Backend Development", enrollments: 156, rating: 4.7, revenue: "₹780,000" },
    { id: 4, title: "MongoDB Database Design", enrollments: 134, rating: 4.6, revenue: "₹670,000" }
  ];
}

async function getUserGrowthData() {
  return [
    { label: "جون", value: 40 },
    { label: "جولائی", value: 60 },
    { label: "اگست", value: 80 },
    { label: "ستمبر", value: 90 },
    { label: "اکتوبر", value: 75 },
    { label: "نومبر", value: 85 },
    { label: "دسمبر", value: 95 }
  ];
}`;

  // Section 25.2: Pakistani Payment Integration
  const pakistaniPaymentsCode = `// 📁 lib/payments/pakistani-payments.js
// Complete Pakistani Payment Gateway Integration
// پاکستان کے تمام اہم پے منٹ گیٹ ویز کی مکمل انٹیگریشن

import crypto from 'crypto';
import axios from 'axios';

/**
 * 🏦 JazzCash - پاکستان کا مقبول پے منٹ گیٹ وے
 * JazzCash 35 ملین صارفین کے ساتھ پاکستان کا سب سے بڑا پے منٹ پلیٹ فارم ہے
 */
export class JazzCashPayment {
  constructor(config) {
    this.merchantId = config.merchantId;
    this.password = config.password;
    this.integeritySalt = config.integeritySalt;
    this.returnUrl = config.returnUrl;
    this.isSandbox = config.isSandbox || false;
    
    // JazzCash API URLs
    this.baseUrl = this.isSandbox 
      ? 'https://sandbox.jazzcash.com.pk/ApplicationAPI/API'
      : 'https://payments.jazzcash.com.pk/ApplicationAPI/API';
  }

  /**
   * ✅ نیا پے منٹ بنائیں
   * @param {Object} order - آرڈر کی تفصیلات
   * @returns {Object} - پے منٹ ڈیٹا
   */
  async createPayment(order) {
    const { 
      amount, 
      orderId, 
      description,
      customerName,
      customerEmail,
      customerMobile,
      customerCNIC
    } = order;
    
    // ✅ صحیح فارمیٹ میں ڈیٹا چیک کریں
    this.validatePaymentData(order);
    
    // 🔒 سکیور ہیش بنائیں
    const secureHash = this.generateSecureHash(orderId, amount);
    
    // 📦 پے منٹ ڈیٹا تیار کریں
    const paymentData = {
      pp_MerchantID: this.merchantId,
      pp_Password: this.password,
      pp_Amount: amount * 100, // پیسوں میں کنورٹ کریں
      pp_TxnRefNo: \`TXN\${Date.now()}\${Math.floor(Math.random() * 1000)}\`,
      pp_Description: description.substring(0, 100), // زیادہ سے زیادہ 100 حروف
      pp_TxnCurrency: 'PKR',
      pp_TxnDateTime: new Date().toISOString().replace(/[^0-9]/g, '').slice(0, 14),
      pp_BillReference: orderId,
      pp_ReturnURL: this.returnUrl,
      pp_SecureHash: secureHash,
      ppmpf_1: customerName || '',
      ppmpf_2: customerEmail || '',
      ppmpf_3: customerMobile || '',
      ppmpf_4: customerCNIC || '',
      ppmpf_5: description.substring(0, 50) || '',
      ppmpf_6: 'web',
      ppmpf_7: '1.0'
    };

    // ✅ JazzCash API کو کال کریں
    try {
      const response = await axios.post(
        \`\${this.baseUrl}/Payment/DoTransaction\`,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.pp_ResponseCode === '000') {
        return {
          success: true,
          transactionId: response.data.pp_TxnRefNo,
          amount: amount,
          paymentUrl: response.data.pp_RedirectURL,
          message: 'پے منٹ لینک تیار ہے'
        };
      } else {
        throw new Error(response.data.pp_ResponseMessage || 'پے منٹ ناکام ہوا');
      }
    } catch (error) {
      console.error('JazzCash API Error:', error.response?.data || error.message);
      throw new Error('JazzCash کنکشن ناکام: ' + (error.response?.data?.message || error.message));
    }
  }

  /**
   * ✅ پے منٹ کی تصدیق کریں
   * @param {Object} responseData - JazzCash سے واپس آنے والا ڈیٹا
   * @returns {Object} - تصدیق شدہ نتیجہ
   */
  verifyPayment(responseData) {
    const {
      pp_ResponseCode,
      pp_ResponseMessage,
      pp_TxnRefNo,
      pp_Amount,
      pp_AuthCode,
      pp_SecureHash,
      pp_RetreivalReferenceNo
    } = responseData;

    // 🔒 ہیش کی تصدیق کریں
    const expectedHash = this.generateSecureHash(
      responseData.pp_BillReference,
      responseData.pp_Amount / 100
    );

    if (pp_SecureHash !== expectedHash) {
      return {
        success: false,
        errorCode: 'SECURITY_ERROR',
        message: 'غیر محفوظ ٹرانزیکشن'
      };
    }

    // ✅ پے منٹ اسٹیٹس چیک کریں
    if (pp_ResponseCode === '000') {
      return {
        success: true,
        transactionId: pp_TxnRefNo,
        amount: pp_Amount / 100,
        authCode: pp_AuthCode,
        retrievalRefNo: pp_RetreivalReferenceNo,
        message: 'پے منٹ کامیاب'
      };
    }

    // ❌ پے منٹ ناکام ہونے پر
    const errorMessages = {
      '001': 'ٹرانزیکشن کینسل ہوئی',
      '002': 'ٹرانزیکشن ناکام ہوئی',
      '003': 'ان سفی شیئنٹ اکاؤنٹ',
      '004': 'ناکافی بیلنس',
      '005': 'غیر معروف مرچنٹ'
    };

    return {
      success: false,
      errorCode: pp_ResponseCode,
      message: errorMessages[pp_ResponseCode] || pp_ResponseMessage || 'پے منٹ ناکام'
    };
  }

  /**
   * 🔒 سکیور ہیش جنریٹ کریں
   * @private
   */
  generateSecureHash(orderId, amount) {
    const data = \`\${this.integeritySalt}|\${this.merchantId}|\${orderId}|\${amount * 100}|\${this.returnUrl}\`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  /**
   * ✅ ڈیٹا کی تصدیق کریں
   * @private
   */
  validatePaymentData(order) {
    const errors = [];

    if (!order.amount || order.amount <= 0) {
      errors.push('غلط رقم');
    }

    if (!order.orderId) {
      errors.push('آرڈر آئی ڈی درکار ہے');
    }

    if (order.customerMobile && !/^03[0-9]{9}$/.test(order.customerMobile)) {
      errors.push('غلط موبائل نمبر۔ فارمیٹ: 03XXXXXXXXX');
    }

    if (order.customerCNIC && !/^[0-9]{13}$/.test(order.customerCNIC)) {
      errors.push('غلط شناختی کارڈ نمبر۔ 13 ہندسے ہونے چاہئیں');
    }

    if (errors.length > 0) {
      throw new Error(\`غلط ڈیٹا: \${errors.join(', ')}\`);
    }
  }

  /**
   * 📊 پے منٹ کی تفصیلات حاصل کریں
   */
  async getTransactionDetails(transactionId) {
    try {
      const response = await axios.post(
        \`\${this.baseUrl}/Payment/Inquiry\`,
        {
          pp_MerchantID: this.merchantId,
          pp_Password: this.password,
          pp_TxnRefNo: transactionId
        }
      );

      return response.data;
    } catch (error) {
      throw new Error('ٹرانزیکشن ڈیٹیلز نہیں مل سکیں');
    }
  }
}

/**
 * 📱 EasyPaisa - پاکستان کا دوسرا بڑا پے منٹ پلیٹ فارم
 */
export class EasyPaisaPayment {
  constructor(config) {
    this.storeId = config.storeId;
    this.accountNum = config.accountNum;
    this.secureHashKey = config.secureHashKey;
    this.isSandbox = config.isSandbox || false;
    
    this.baseUrl = this.isSandbox
      ? 'https://easypay.easypaisa.com.pk/tpaytest/'
      : 'https://easypay.easypaisa.com.pk/tpay/';
  }

  async createPayment(order) {
    const { amount, orderId, customerMobile, description } = order;
    
    // ✅ ڈیٹا کی تصدیق
    if (!customerMobile || !/^03[0-9]{9}$/.test(customerMobile)) {
      throw new Error('درست موبائل نمبر درکار ہے');
    }

    // 🔒 سکیور ہیش بنائیں
    const secureHash = this.generateSecureHash(orderId, amount, customerMobile);
    
    return {
      url: \`\${this.baseUrl}index.jsf\`,
      method: 'POST',
      formData: {
        storeId: this.storeId,
        orderId: orderId,
        transactionAmount: amount,
        transactionType: 'MA',
        mobileAccountNo: customerMobile,
        emailAddress: order.customerEmail || '',
        merchantEmail: '',
        merchantHashedReq: secureHash,
        bankIdentificationNumber: '',
        expiryDate: '',
        successUrl: \`\${process.env.APP_URL}/payment/success?gateway=easypaisa\`,
        failureUrl: \`\${process.env.APP_URL}/payment/failure?gateway=easypaisa\`,
        basketId: orderId,
        productId: 'course_purchase',
        productDesc: description || 'کورس خریداری'
      }
    };
  }

  generateSecureHash(orderId, amount, mobile) {
    const data = \`\${this.storeId}|\${orderId}|\${amount}|\${mobile}|\${this.secureHashKey}\`;
    return crypto.createHash('sha256').update(data).digest('hex');
  }

  verifyPayment(responseData) {
    const {
      responseCode,
      responseDesc,
      orderId,
      transactionId,
      amount,
      msidn
    } = responseData;

    if (responseCode === '0000') {
      return {
        success: true,
        transactionId: transactionId,
        orderId: orderId,
        amount: amount,
        mobile: msidn,
        message: 'پے منٹ کامیاب'
      };
    }

    return {
      success: false,
      errorCode: responseCode,
      message: responseDesc || 'پے منٹ ناکام'
    };
  }
}

/**
 * 🏦 بینک ٹرانسفر - پاکستانی بینکس
 * تمام پاکستانی بینکس کے لیے
 */
export class BankTransferPayment {
  static getBankDetails() {
    return {
      banks: [
        {
          name: 'HBL',
          logo: '/banks/hbl.png',
          accountTitle: process.env.BANK_HBL_TITLE || 'آپ کا ادارہ',
          accountNumber: process.env.BANK_HBL_ACCOUNT || '1234-5678901-2',
          iban: process.env.BANK_HBL_IBAN || 'PK36HABB0012345678901234',
          branch: process.env.BANK_HBL_BRANCH || 'مین برانچ، کراچی',
          branchCode: '1001',
          swiftCode: 'HABBPKKA'
        },
        {
          name: 'UBL',
          logo: '/banks/ubl.png',
          accountTitle: process.env.BANK_UBL_TITLE || 'آپ کا ادارہ',
          accountNumber: process.env.BANK_UBL_ACCOUNT || '9876543210',
          iban: process.env.BANK_UBL_IBAN || 'PK36UNIL0109001002345678',
          branch: process.env.BANK_UBL_BRANCH || 'گلشن برانچ، لاہور',
          branchCode: '1090',
          swiftCode: 'UNILPKKA'
        },
        {
          name: 'MCB',
          logo: '/banks/mcb.png',
          accountTitle: process.env.BANK_MCB_TITLE || 'آپ کا ادارہ',
          accountNumber: process.env.BANK_MCB_ACCOUNT || '0123456789',
          iban: process.env.BANK_MCB_IBAN || 'PK36MUCB0001002003456789',
          branch: process.env.BANK_MCB_BRANCH || 'بلیو ایریا، اسلام آباد',
          branchCode: '0100',
          swiftCode: 'MUCBPKKA'
        },
        {
          name: 'Allied Bank',
          logo: '/banks/abl.png',
          accountTitle: process.env.BANK_ABL_TITLE || 'آپ کا ادارہ',
          accountNumber: process.env.BANK_ABL_ACCOUNT || '1122334455',
          iban: process.env.BANK_ABL_IBAN || 'PK36ABPA0012345678901234',
          branch: process.env.BANK_ABL_BRANCH || 'فیصل برانچ، لاہور',
          branchCode: '1122',
          swiftCode: 'ABPAPKKA'
        }
      ],
      instructions: [
        'مطلوبہ بینک میں مخصوص رقم ٹرانسفر کریں',
        'بینک کی رسید کی واضح تصویر اپلوڈ کریں',
        'آرڈر آئی ڈی رسید پر لکھیں (ضروری)',
        'اپنی موبائل نمبر رسید پر لکھیں',
        '2 سے 24 گھنٹے میں تصدیق ہو جائے گی',
        'تصدیق کے بعد کورس تک رسائی مل جائے گی'
      ],
      importantNotes: [
        'صرف درست بینک اکاؤنٹ نمبر استعمال کریں',
        'رسید میں تاریخ اور وقت واضح ہونا چاہیے',
        'ایم ٹی این آر (ٹرانزیکشن نمبر) ضرور نوٹ کریں',
        'راؤنڈ فگر میں ٹرانسفر کریں',
        'بینک چارجز آپ کے ذمہ ہوں گے'
      ]
    };
  }

  static generatePaymentSlip(order) {
    const dueDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 گھنٹے
    const referenceNumber = \`BANK\${Date.now()}\${Math.floor(Math.random() * 10000)}\`.slice(0, 16);

    return {
      orderId: order.orderId,
      amount: order.amount,
      dueDate: dueDate,
      referenceNumber: referenceNumber,
      customerName: order.customerName,
      customerEmail: order.customerEmail,
      customerMobile: order.customerMobile,
      productName: order.productName,
      banks: this.getBankDetails().banks,
      instructions: this.getBankDetails().instructions,
      importantNotes: this.getBankDetails().importantNotes,
      status: 'pending',
      createdAt: new Date()
    };
  }

  static validateReceipt(receiptData) {
    const errors = [];
    
    if (!receiptData.transactionId) {
      errors.push('ٹرانزیکشن آئی ڈی درکار ہے');
    }
    
    if (!receiptData.bankName) {
      errors.push('بینک کا نام درکار ہے');
    }
    
    if (!receiptData.receiptImage) {
      errors.push('رسید کی تصویر درکار ہے');
    }
    
    if (!receiptData.transactionDate) {
      errors.push('ٹرانزیکشن کی تاریخ درکار ہے');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }
}

/**
 * 💰 Cash on Delivery - پاکستان کے لیے
 */
export class CashOnDelivery {
  static getCODDetails() {
    return {
      availableCities: [
        'کراچی', 'لاہور', 'اسلام آباد', 'راولپنڈی', 'فیصل آباد',
        'ملتان', 'حیدرآباد', 'پشاور', 'کوئٹہ', 'سرگودھا'
      ],
      charges: {
        karachi: 200,
        lahore: 200,
        islamabad: 250,
        rawalpindi: 250,
        other: 300
      },
      process: [
        'آرڈر دیں',
        'ہماری ٹیم آپ سے رابطہ کرے گی',
        'اپنا پتہ اور وقت بتائیں',
        'کیش آن ڈیلیوری پر ادائیگی کریں',
        'فوری رسائی حاصل کریں'
      ],
      terms: [
        'صرف انتخاب شدہ شہروں میں دستیاب',
        'مینجمنٹ کو رابطہ کرنے کا حق حاصل ہے',
        'غلط پتہ پر آرڈر منسوخ ہو سکتا ہے',
        'پہلے سے کنفرم شدہ وقت پر ہی ڈیلیوری'
      ]
    };
  }

  static calculateCharges(city, amount) {
    const codDetails = this.getCODDetails();
    const cityCharge = codDetails.charges[city.toLowerCase()] || codDetails.charges.other;
    
    return {
      productAmount: amount,
      deliveryCharges: cityCharge,
      totalAmount: amount + cityCharge,
      estimatedDelivery: '1-2 کاروباری دن'
    };
  }
}

/**
 * 🔄 پے منٹ گیٹ وے فیکٹری
 * آسانی سے مختلف گیٹ ویز استعمال کرنے کے لیے
 */
export class PaymentGatewayFactory {
  static createGateway(gatewayName, config) {
    switch (gatewayName.toLowerCase()) {
      case 'jazzcash':
        return new JazzCashPayment(config);
      
      case 'easypaisa':
        return new EasyPaisaPayment(config);
      
      case 'banktransfer':
        return BankTransferPayment;
      
      case 'cod':
        return CashOnDelivery;
      
      default:
        throw new Error(\`نامعلوم پے منٹ گیٹ وے: \${gatewayName}\`);
    }
  }

  static getAllAvailableGateways() {
    return [
      {
        id: 'jazzcash',
        name: 'JazzCash',
        logo: '/payment-gateways/jazzcash.png',
        description: 'پاکستان کا سب سے بڑا پے منٹ پلیٹ فارم',
        features: ['تیز', 'محفوظ', 'ملک بھر میں دستیاب'],
        transactionFee: '2%',
        minAmount: 100,
        maxAmount: 50000
      },
      {
        id: 'easypaisa',
        name: 'EasyPaisa',
        logo: '/payment-gateways/easypaisa.png',
        description: 'آسان اور محفوظ پے منٹ سروس',
        features: ['موبائل والٹ', 'انلائن ادائیگی', '24/7 سپورٹ'],
        transactionFee: '2.5%',
        minAmount: 100,
        maxAmount: 100000
      },
      {
        id: 'banktransfer',
        name: 'بینک ٹرانسفر',
        logo: '/payment-gateways/bank-transfer.png',
        description: 'تمام پاکستانی بینکس',
        features: ['کم فیس', 'محفوظ', 'تمام بینکس'],
        transactionFee: 'بینک کے مطابق',
        minAmount: 500,
        maxAmount: 1000000
      },
      {
        id: 'cod',
        name: 'کیش آن ڈیلیوری',
        logo: '/payment-gateways/cod.png',
        description: 'گھر بیٹھے ادائیگی',
        features: ['ادائیگی ڈیلیوری پر', 'آسان', 'بھروسہ مند'],
        transactionFee: 'ڈیلیوری چارجز',
        minAmount: 1000,
        maxAmount: 50000
      }
    ];
  }
}`;

  // Section 25.3: International Payment Integration
  const internationalPaymentsCode = `// 📁 lib/payments/international-payments.js
// Complete International Payment Integration
// تمام بین الاقوامی پے منٹ گیٹ ویز کی مکمل انٹیگریشن

import Stripe from 'stripe';

/**
 * 💳 Stripe Integration - بین الاقوامی ادائیگیوں کے لیے
 * Stripe دنیا کا سب سے مشہور پے منٹ پلیٹ فارم ہے
 */
export class StripePayment {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      maxNetworkRetries: 3,
      timeout: 20000
    });
  }

  /**
   * 🛒 Checkout Session بنائیں
   * @param {Object} order - آرڈر کی تفصیلات
   * @returns {Object} - چیک آؤٹ سیشن
   */
  async createCheckoutSession(order) {
    try {
      const { 
        items, 
        customerEmail, 
        successUrl, 
        cancelUrl,
        userId,
        orderId,
        currency = 'usd'
      } = order;

      // ✅ آئٹمز کی تصدیق
      this.validateItems(items);

      // 🛍️ لائن آئٹمز تیار کریں
      const lineItems = items.map(item => ({
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: item.name,
            description: item.description,
            images: item.images || ['/default-course-image.jpg'],
            metadata: {
              courseId: item.courseId,
              type: item.type || 'course'
            }
          },
          unit_amount: Math.round(item.price * 100), // سینٹس میں کنورٹ کریں
        },
        quantity: item.quantity || 1,
      }));

      // 📝 سیشن کی تفصیلات
      const session = await this.stripe.checkout.sessions.create({
        customer_email: customerEmail,
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: \`\${successUrl}?session_id={CHECKOUT_SESSION_ID}\`,
        cancel_url: cancelUrl,
        client_reference_id: orderId,
        metadata: {
          orderId: orderId,
          userId: userId,
          platform: 'lms',
          country: order.country || 'PK'
        },
        shipping_address_collection: {
          allowed_countries: order.shippingCountries || ['US', 'CA', 'GB', 'AU', 'PK']
        },
        billing_address_collection: 'required',
        allow_promotion_codes: true,
        expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 گھنٹہ
        payment_intent_data: {
          description: \`کورس خریداری - \${orderId}\`,
          metadata: {
            orderId: orderId,
            userId: userId
          }
        }
      });

      return {
        success: true,
        sessionId: session.id,
        url: session.url,
        paymentStatus: session.payment_status,
        expiresAt: session.expires_at,
        message: 'چیک آؤٹ سیشن تیار ہے'
      };

    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      throw new Error(\`Stripe چیک آؤٹ ناکام: \${error.message}\`);
    }
  }

  /**
   * 🔔 ویب ہک پراسیس کریں
   * @param {Buffer} requestBody - ویب ہک کا ڈیٹا
   * @param {string} signature - سٹرائپ سگنیچر
   * @returns {Object} - پروسیس کا نتیجہ
   */
  async handleWebhook(requestBody, signature) {
    try {
      // 🔒 ویب ہک کی تصدیق
      const event = this.stripe.webhooks.constructEvent(
        requestBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      console.log(\`Stripe Webhook Event: \${event.type}\`);

      // 🎯 ایونٹ کے مطابق پروسیس کریں
      switch (event.type) {
        case 'checkout.session.completed':
          await this.handleSuccessfulPayment(event.data.object);
          break;
          
        case 'payment_intent.succeeded':
          await this.handlePaymentIntentSuccess(event.data.object);
          break;
          
        case 'payment_intent.payment_failed':
          await this.handlePaymentFailure(event.data.object);
          break;
          
        case 'charge.refunded':
          await this.handleRefund(event.data.object);
          break;
          
        case 'customer.subscription.created':
          await this.handleSubscriptionCreated(event.data.object);
          break;
          
        case 'invoice.payment_succeeded':
          await this.handleInvoicePayment(event.data.object);
          break;
      }

      return { 
        success: true, 
        event: event.type,
        message: 'ویب ہک پروسیس ہو گیا' 
      };

    } catch (error) {
      console.error('Stripe Webhook Error:', error);
      throw new Error(\`ویب ہک پروسیس ناکام: \${error.message}\`);
    }
  }

  /**
   * ✅ کامیاب پے منٹ ہینڈل کریں
   * @private
   */
  async handleSuccessfulPayment(session) {
    const orderId = session.metadata.orderId;
    const userId = session.metadata.userId;
    const amount = session.amount_total / 100;

    // 📊 ڈیٹا بیس میں اپڈیٹ کریں
    await this.updateOrderStatus(orderId, 'completed', {
      transactionId: session.payment_intent,
      paymentMethod: 'stripe',
      amount: amount,
      currency: session.currency,
      customerEmail: session.customer_email
    });

    // 📧 کنفرمیشن ای میل بھیجیں
    await this.sendConfirmationEmail(
      session.customer_email,
      orderId,
      amount,
      session.currency
    );

    // 🎓 کورس تک رسائی دیں
    await this.grantCourseAccess(userId, orderId);

    console.log(\`آرڈر \${orderId} کی ادائیگی کامیاب ہوئی۔ صارف: \${userId}\`);
  }

  /**
   * 💳 کریڈٹ کارڈ سے براہ راست ادائیگی
   */
  async createDirectPayment(paymentData) {
    try {
      const {
        amount,
        currency,
        customerEmail,
        description,
        metadata,
        paymentMethodId
      } = paymentData;

      // 💳 پے منٹ انٹینٹ بنائیں
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: currency || 'usd',
        payment_method: paymentMethodId,
        confirm: true,
        customer_email: customerEmail,
        description: description,
        metadata: metadata,
        return_url: \`\${process.env.APP_URL}/payment-success\`,
        payment_method_types: ['card']
      });

      return {
        success: paymentIntent.status === 'succeeded',
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        clientSecret: paymentIntent.client_secret,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency
      };

    } catch (error) {
      console.error('Direct Payment Error:', error);
      throw new Error(\`براہ راست ادائیگی ناکام: \${error.message}\`);
    }
  }

  /**
   * 💰 ریفنڈ پروسیس کریں
   */
  async processRefund(chargeId, amount, reason) {
    try {
      const refund = await this.stripe.refunds.create({
        charge: chargeId,
        amount: Math.round(amount * 100),
        reason: reason || 'requested_by_customer',
        metadata: {
          refundDate: new Date().toISOString()
        }
      });

      return {
        success: refund.status === 'succeeded',
        refundId: refund.id,
        amount: refund.amount / 100,
        status: refund.status,
        reason: refund.reason
      };

    } catch (error) {
      console.error('Refund Error:', error);
      throw new Error(\`ریفنڈ ناکام: \${error.message}\`);
    }
  }

  /**
   * 📊 پے منٹ کی تفصیلات حاصل کریں
   */
  async getPaymentDetails(paymentIntentId) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId, {
        expand: ['customer', 'payment_method']
      });

      return {
        id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        customer: paymentIntent.customer,
        paymentMethod: paymentIntent.payment_method,
        created: new Date(paymentIntent.created * 1000),
        description: paymentIntent.description,
        metadata: paymentIntent.metadata
      };

    } catch (error) {
      throw new Error(\`پے منٹ تفصیلات نہیں مل سکیں: \${error.message}\`);
    }
  }

  /**
   * ✅ آئٹمز کی تصدیق
   * @private
   */
  validateItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error('کم از کم ایک آئٹم درکار ہے');
    }

    items.forEach(item => {
      if (!item.name || !item.price) {
        throw new Error('ہر آئٹم کا نام اور قیمت درکار ہے');
      }

      if (item.price <= 0) {
        throw new Error('قیمت مثبت ہونی چاہیے');
      }
    });
  }

  /**
   * 🗂️ آرڈر اسٹیٹس اپڈیٹ کریں
   * @private
   */
  async updateOrderStatus(orderId, status, paymentInfo) {
    // ڈیٹا بیس میں اپڈیٹ کریں
    // یہاں آپ کا ڈیٹا بیس لاجک ہوگا
    console.log(\`آرڈر \${orderId} کی اسٹیٹس \${status} ہو گئی\`, paymentInfo);
  }

  /**
   * 📧 کنفرمیشن ای میل بھیجیں
   * @private
   */
  async sendConfirmationEmail(email, orderId, amount, currency) {
    // ای میل سروس سے کنکشن
    console.log(\`کنفرمیشن ای میل \${email} کو بھیجی گئی\`);
  }

  /**
   * 🎓 کورس تک رسائی دیں
   * @private
   */
  async grantCourseAccess(userId, orderId) {
    // کورس رسائی کا لاجک
    console.log(\`صارف \${userId} کو آرڈر \${orderId} کی کورس تک رسائی دی گئی\`);
  }

  // دیگر ایونٹ ہینڈلرز...
  async handlePaymentIntentSuccess(paymentIntent) {
    console.log('پے منٹ انٹینٹ کامیاب:', paymentIntent.id);
  }

  async handlePaymentFailure(paymentIntent) {
    console.log('پے منٹ ناکام:', paymentIntent.id);
  }

  async handleRefund(charge) {
    console.log('ریفنڈ ہوا:', charge.id);
  }

  async handleSubscriptionCreated(subscription) {
    console.log('سبسکرپشن بنی:', subscription.id);
  }

  async handleInvoicePayment(invoice) {
    console.log('انوائس پے منٹ:', invoice.id);
  }
}

/**
 * 🔵 PayPal Integration - دنیا بھر میں مقبول
 */
export class PayPalPayment {
  constructor() {
    this.clientId = process.env.PAYPAL_CLIENT_ID;
    this.clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    this.baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://api.paypal.com' 
      : 'https://api.sandbox.paypal.com';
    this.webhookId = process.env.PAYPAL_WEBHOOK_ID;
  }

  async getAccessToken() {
    try {
      const auth = Buffer.from(\`\${this.clientId}:\${this.clientSecret}\`).toString('base64');
      
      const response = await fetch(\`\${this.baseUrl}/v1/oauth2/token\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Basic \${auth}\`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        throw new Error(\`ایکسیس ٹوکن ناکام: \${response.statusText}\`);
      }

      const data = await response.json();
      return data.access_token;

    } catch (error) {
      console.error('PayPal Access Token Error:', error);
      throw new Error(\`PayPal کنکشن ناکام: \${error.message}\`);
    }
  }

  async createOrder(order) {
    try {
      const accessToken = await this.getAccessToken();
      const { amount, currency = 'USD', description, orderId } = order;
      
      const response = await fetch(\`\${this.baseUrl}/v2/checkout/orders\`, {
        method: 'POST',
        headers: {
          'Authorization': \`Bearer \${accessToken}\`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            amount: {
              currency_code: currency,
              value: amount.toString()
            },
            description: description,
            custom_id: orderId,
            invoice_id: \`INV-\${orderId}\`,
            soft_descriptor: 'Course Purchase'
          }],
          application_context: {
            brand_name: process.env.APP_NAME || 'Learning Management System',
            landing_page: 'BILLING',
            user_action: 'PAY_NOW',
            return_url: \`\${process.env.APP_URL}/payment-success?gateway=paypal\`,
            cancel_url: \`\${process.env.APP_URL}/payment-cancel\`,
            shipping_preference: 'NO_SHIPPING'
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(\`PayPal آرڈر ناکام: \${errorData.message}\`);
      }

      const data = await response.json();
      
      return {
        success: true,
        orderId: data.id,
        status: data.status,
        links: data.links,
        message: 'PayPal آرڈر تیار ہے'
      };

    } catch (error) {
      console.error('PayPal Order Creation Error:', error);
      throw new Error(\`PayPal آرڈر ناکام: \${error.message}\`);
    }
  }

  async capturePayment(orderId) {
    try {
      const accessToken = await this.getAccessToken();
      
      const response = await fetch(
        \`\${this.baseUrl}/v2/checkout/orders/\${orderId}/capture\`,
        {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${accessToken}\`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(\`پے منٹ کپچر ناکام: \${errorData.message}\`);
      }

      const data = await response.json();
      
      return {
        success: data.status === 'COMPLETED',
        paymentId: data.purchase_units[0].payments.captures[0].id,
        status: data.status,
        amount: data.purchase_units[0].payments.captures[0].amount.value,
        currency: data.purchase_units[0].payments.captures[0].amount.currency_code,
        payer: data.payer,
        message: 'پے منٹ کامیابی سے کپچر ہو گیا'
      };

    } catch (error) {
      console.error('PayPal Capture Error:', error);
      throw new Error(\`پے منٹ کپچر ناکام: \${error.message}\`);
    }
  }

  async handleWebhook(requestBody, headers) {
    try {
      const accessToken = await this.getAccessToken();
      
      // 🔒 ویب ہک کی تصدیق
      const verificationResponse = await fetch(
        \`\${this.baseUrl}/v1/notifications/verify-webhook-signature\`,
        {
          method: 'POST',
          headers: {
            'Authorization': \`Bearer \${accessToken}\`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            webhook_id: this.webhookId,
            transmission_id: headers['paypal-transmission-id'],
            transmission_time: headers['paypal-transmission-time'],
            transmission_sig: headers['paypal-transmission-sig'],
            cert_url: headers['paypal-cert-url'],
            auth_algo: headers['paypal-auth-algo'],
            webhook_event: requestBody
          })
        }
      );

      const verificationData = await verificationResponse.json();
      
      if (verificationData.verification_status !== 'SUCCESS') {
        throw new Error('غیر تصدیق شدہ ویب ہک');
      }

      const event = requestBody;
      console.log(\`PayPal Webhook Event: \${event.event_type}\`);

      // 🎯 ایونٹ کے مطابق پروسیس کریں
      switch (event.event_type) {
        case 'CHECKOUT.ORDER.APPROVED':
          await this.handleOrderApproved(event.resource);
          break;
          
        case 'CHECKOUT.ORDER.COMPLETED':
          await this.handleOrderCompleted(event.resource);
          break;
          
        case 'PAYMENT.CAPTURE.COMPLETED':
          await this.handlePaymentCompleted(event.resource);
          break;
          
        case 'PAYMENT.CAPTURE.REFUNDED':
          await this.handleRefund(event.resource);
          break;
      }

      return { 
        success: true, 
        event: event.event_type,
        message: 'ویب ہک پروسیس ہو گیا' 
      };

    } catch (error) {
      console.error('PayPal Webhook Error:', error);
      throw new Error(\`PayPal ویب ہک ناکام: \${error.message}\`);
    }
  }

  async handleOrderApproved(order) {
    console.log('آرڈر منظور ہوا:', order.id);
  }

  async handleOrderCompleted(order) {
    console.log('آرڈر مکمل ہوا:', order.id);
  }

  async handlePaymentCompleted(payment) {
    console.log('پے منٹ مکمل ہوا:', payment.id);
  }

  async handleRefund(refund) {
    console.log('ریفنڈ ہوا:', refund.id);
  }
}

/**
 * 🌍 ملٹی کرنسی سپورٹ
 * مختلف ممالک کے لیے کرنسی کنورژن
 */
export class MultiCurrencyPayment {
  static currencies = {
    PKR: { 
      symbol: '₹', 
      name: 'Pakistani Rupee', 
      decimal: 2,
      countries: ['PK'],
      paymentGateways: ['jazzcash', 'easypaisa', 'banktransfer']
    },
    USD: { 
      symbol: '$', 
      name: 'US Dollar', 
      decimal: 2,
      countries: ['US'],
      paymentGateways: ['stripe', 'paypal']
    },
    EUR: { 
      symbol: '€', 
      name: 'Euro', 
      decimal: 2,
      countries: ['EU'],
      paymentGateways: ['stripe', 'paypal']
    },
    GBP: { 
      symbol: '£', 
      name: 'British Pound', 
      decimal: 2,
      countries: ['GB'],
      paymentGateways: ['stripe', 'paypal']
    },
    AED: { 
      symbol: 'د.إ', 
      name: 'UAE Dirham', 
      decimal: 2,
      countries: ['AE'],
      paymentGateways: ['stripe', 'paypal']
    },
    SAR: { 
      symbol: '﷼', 
      name: 'Saudi Riyal', 
      decimal: 2,
      countries: ['SA'],
      paymentGateways: ['stripe', 'paypal']
    },
    INR: { 
      symbol: '₹', 
      name: 'Indian Rupee', 
      decimal: 2,
      countries: ['IN'],
      paymentGateways: ['stripe']
    }
  };

  static formatAmount(amount, currency) {
    const config = this.currencies[currency] || this.currencies.USD;
    const formattedAmount = amount.toFixed(config.decimal);
    return \`\${config.symbol}\${formattedAmount}\`;
  }

  static async convertCurrency(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;
    
    try {
      // حقیقی API استعمال کریں، یہ مثال کے لیے ہے
      const rates = {
        PKR: { USD: 0.0036, EUR: 0.0033, GBP: 0.0028, AED: 0.013, SAR: 0.014 },
        USD: { PKR: 277.5, EUR: 0.92, GBP: 0.79, AED: 3.67, SAR: 3.75 },
        EUR: { PKR: 301.5, USD: 1.09, GBP: 0.86, AED: 4.0, SAR: 4.08 },
        GBP: { PKR: 351.2, USD: 1.27, EUR: 1.16, AED: 4.66, SAR: 4.75 }
      };
      
      const rate = rates[fromCurrency]?.[toCurrency];
      if (!rate) {
        // حقیقی API کال
        const response = await fetch(
          \`https://api.exchangerate-api.com/v4/latest/\${fromCurrency}\`
        );
        const data = await response.json();
        return amount * data.rates[toCurrency];
      }
      
      return amount * rate;
      
    } catch (error) {
      console.error('Currency Conversion Error:', error);
      throw new Error('کرنسی کنورژن ناکام');
    }
  }

  static getSupportedCurrencies(countryCode) {
    return Object.entries(this.currencies)
      .filter(([_, config]) => config.countries.includes(countryCode))
      .map(([code, config]) => ({
        code,
        symbol: config.symbol,
        name: config.name
      }));
  }

  static getAvailableGateways(currency, country) {
    const currencyConfig = this.currencies[currency];
    if (!currencyConfig) return [];
    
    return currencyConfig.paymentGateways.map(gateway => ({
      id: gateway,
      name: this.getGatewayName(gateway),
      icon: \`/gateways/\${gateway}.png\`
    }));
  }

  static getGatewayName(gateway) {
    const names = {
      stripe: 'Stripe',
      paypal: 'PayPal',
      jazzcash: 'JazzCash',
      easypaisa: 'EasyPaisa',
      banktransfer: 'بینک ٹرانسفر'
    };
    return names[gateway] || gateway;
  }
}`;

  // Section 25.4: Payment API Routes
  const paymentApiCode = `// 📁 app/api/payment/create/route.js
// Complete Payment API with All Pakistani & International Gateways

import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/database';
import Order from '@/models/Order';
import User from '@/models/User';
import Course from '@/models/Course';
import { 
  PaymentGatewayFactory,
  JazzCashPayment,
  EasyPaisaPayment,
  BankTransferPayment,
  CashOnDelivery 
} from '@/lib/payments/pakistani-payments';
import { 
  StripePayment,
  PayPalPayment,
  MultiCurrencyPayment 
} from '@/lib/payments/international-payments';

// ✅ نیا پے منٹ بنائیں
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { 
      orderId, 
      amount, 
      paymentMethod, 
      customerInfo,
      courseId,
      currency = 'PKR',
      country = 'PK'
    } = body;

    // ✅ ضروری فیلڈز کی تصدیق
    const validationErrors = validatePaymentRequest(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'غلط ڈیٹا',
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // ✅ آرڈر کی موجودگی چیک کریں
    const existingOrder = await Order.findById(orderId);
    if (existingOrder && existingOrder.status === 'completed') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'یہ آرڈر پہلے ہی مکمل ہو چکا ہے' 
        },
        { status: 409 }
      );
    }

    // ✅ صارف کی تصدیق
    const user = await User.findById(customerInfo.userId);
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'صارف نہیں ملا' 
        },
        { status: 404 }
      );
    }

    // ✅ کورس کی تصدیق
    const course = await Course.findById(courseId);
    if (!course || course.status !== 'published') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'کورس دستیاب نہیں ہے' 
        },
        { status: 404 }
      );
    }

    // 💰 کرنسی کنورژن اگر ضروری ہو
    let finalAmount = amount;
    let finalCurrency = currency;
    
    if (currency !== 'PKR' && paymentMethod === 'banktransfer') {
      // بینک ٹرانسفر صرف PKR میں
      finalAmount = await MultiCurrencyPayment.convertCurrency(amount, currency, 'PKR');
      finalCurrency = 'PKR';
    }

    // 🏦 پے منٹ گیٹ وے چنیں
    let paymentResponse;
    let gatewayInstance;

    switch (paymentMethod) {
      case 'jazzcash':
        gatewayInstance = new JazzCashPayment({
          merchantId: process.env.JAZZCASH_MERCHANT_ID,
          password: process.env.JAZZCASH_PASSWORD,
          integeritySalt: process.env.JAZZCASH_INTEGRITY_SALT,
          returnUrl: \`\${process.env.APP_URL}/api/payment/callback/jazzcash\`,
          isSandbox: process.env.NODE_ENV !== 'production'
        });
        
        paymentResponse = await gatewayInstance.createPayment({
          orderId,
          amount: finalAmount,
          description: \`\${course.title} - کورس خریداری\`,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerMobile: customerInfo.mobile,
          customerCNIC: customerInfo.cnic
        });
        break;

      case 'easypaisa':
        if (!customerInfo.mobile) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'EasyPaisa کے لیے موبائل نمبر درکار ہے' 
            },
            { status: 400 }
          );
        }
        
        gatewayInstance = new EasyPaisaPayment({
          storeId: process.env.EASYPAISA_STORE_ID,
          accountNum: process.env.EASYPAISA_ACCOUNT_NUM,
          secureHashKey: process.env.EASYPAISA_SECURE_HASH_KEY,
          isSandbox: process.env.NODE_ENV !== 'production'
        });
        
        paymentResponse = await gatewayInstance.createPayment({
          orderId,
          amount: finalAmount,
          customerMobile: customerInfo.mobile,
          description: course.title
        });
        break;

      case 'stripe':
        if (!['USD', 'EUR', 'GBP', 'CAD', 'AUD'].includes(currency)) {
          return NextResponse.json(
            { 
              success: false, 
              message: 'Stripe صرف انٹرنیشنل کرنسیز سپورٹ کرتا ہے' 
            },
            { status: 400 }
          );
        }
        
        gatewayInstance = new StripePayment();
        
        paymentResponse = await gatewayInstance.createCheckoutSession({
          orderId,
          items: [{
            name: course.title,
            description: course.shortDescription || 'کورس خریداری',
            price: amount,
            courseId: courseId,
            type: 'course'
          }],
          customerEmail: customerInfo.email,
          successUrl: \`\${process.env.APP_URL}/payment-success?orderId=\${orderId}\`,
          cancelUrl: \`\${process.env.APP_URL}/payment-cancel?orderId=\${orderId}\`,
          userId: customerInfo.userId,
          currency: currency,
          country: country
        });
        break;

      case 'paypal':
        gatewayInstance = new PayPalPayment();
        
        paymentResponse = await gatewayInstance.createOrder({
          orderId,
          amount: amount,
          currency: currency,
          description: \`کورس خریداری: \${course.title}\`
        });
        break;

      case 'bank_transfer':
        paymentResponse = BankTransferPayment.generatePaymentSlip({
          orderId,
          amount: finalAmount,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
          customerMobile: customerInfo.mobile,
          productName: course.title,
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000)
        });
        break;

      case 'cod':
        if (!CashOnDelivery.getCODDetails().availableCities.includes(customerInfo.city)) {
          return NextResponse.json(
            { 
              success: false, 
              message: \`کیش آن ڈیلیوری آپ کے شہر \${customerInfo.city} میں دستیاب نہیں ہے\` 
            },
            { status: 400 }
          );
        }
        
        const codCharges = CashOnDelivery.calculateCharges(
          customerInfo.city,
          amount
        );
        
        paymentResponse = {
          type: 'cod',
          charges: codCharges,
          instructions: CashOnDelivery.getCODDetails().process,
          terms: CashOnDelivery.getCODDetails().terms
        };
        break;

      default:
        return NextResponse.json(
          { 
            success: false, 
            message: 'غلط پے منٹ طریقہ' 
          },
          { status: 400 }
        );
    }

    // 💾 ڈیٹا بیس میں پے منٹ ریکارڈ محفوظ کریں
    const paymentRecord = await createPaymentRecord({
      orderId,
      userId: customerInfo.userId,
      courseId,
      amount: finalAmount,
      currency: finalCurrency,
      paymentMethod,
      gatewayData: paymentResponse,
      status: paymentResponse.success ? 'pending' : 'failed',
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email,
        mobile: customerInfo.mobile,
        city: customerInfo.city,
        country: customerInfo.country || country
      }
    });

    // ✅ آرڈر اسٹیٹس اپڈیٹ کریں
    await Order.findByIdAndUpdate(orderId, {
      status: 'pending_payment',
      paymentMethod: paymentMethod,
      paymentRecord: paymentRecord._id,
      updatedAt: new Date()
    });

    return NextResponse.json({
      success: true,
      paymentMethod,
      data: paymentResponse,
      paymentId: paymentRecord._id,
      message: getSuccessMessage(paymentMethod)
    }, { status: 201 });

  } catch (error) {
    console.error('Payment creation error:', error);
    
    // ✅ صارف دوست غلطی پیغامات
    let errorMessage = 'پے منٹ بنانے میں مسئلہ پیش آیا';
    let statusCode = 500;
    
    if (error.message.includes('غلط ڈیٹا')) {
      errorMessage = error.message;
      statusCode = 400;
    } else if (error.message.includes('کنکشن ناکام')) {
      errorMessage = 'پے منٹ سروس دستیاب نہیں ہے۔ براہ کرم بعد میں کوشش کریں۔';
      statusCode = 503;
    } else if (error.message.includes('ناکافی بیلنس')) {
      errorMessage = 'ناکافی بیلنس';
      statusCode = 402;
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.message : undefined 
      },
      { status: statusCode }
    );
  }
}

// ✅ پے منٹ کی تصدیق کریں
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const paymentId = searchParams.get('paymentId');
    
    if (!orderId && !paymentId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'آرڈر آئی ڈی یا پے منٹ آئی ڈی درکار ہے' 
        },
        { status: 400 }
      );
    }
    
    // 🔍 پے منٹ ریکارڈ تلاش کریں
    let paymentRecord;
    if (paymentId) {
      paymentRecord = await Payment.findById(paymentId)
        .populate('userId', 'name email')
        .populate('courseId', 'title thumbnail');
    } else {
      paymentRecord = await Payment.findOne({ orderId })
        .populate('userId', 'name email')
        .populate('courseId', 'title thumbnail');
    }
    
    if (!paymentRecord) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'پے منٹ ریکارڈ نہیں ملا' 
        },
        { status: 404 }
      );
    }
    
    // 📊 پے منٹ کی تفصیلات
    const paymentDetails = {
      id: paymentRecord._id,
      orderId: paymentRecord.orderId,
      amount: paymentRecord.amount,
      currency: paymentRecord.currency,
      paymentMethod: paymentRecord.paymentMethod,
      status: paymentRecord.status,
      createdAt: paymentRecord.createdAt,
      customer: {
        name: paymentRecord.customerInfo.name,
        email: paymentRecord.customerInfo.email
      },
      course: paymentRecord.courseId ? {
        title: paymentRecord.courseId.title,
        thumbnail: paymentRecord.courseId.thumbnail
      } : null
    };
    
    // 🏦 گیٹ وے کے مطابق اضافی تفصیلات
    if (paymentRecord.gatewayData) {
      switch (paymentRecord.paymentMethod) {
        case 'jazzcash':
          if (paymentRecord.gatewayData.transactionId) {
            const jazzcash = new JazzCashPayment({
              merchantId: process.env.JAZZCASH_MERCHANT_ID,
              password: process.env.JAZZCASH_PASSWORD,
              integeritySalt: process.env.JAZZCASH_INTEGRITY_SALT,
              returnUrl: \`\${process.env.APP_URL}/api/payment/callback/jazzcash\`
            });
            
            try {
              const txDetails = await jazzcash.getTransactionDetails(
                paymentRecord.gatewayData.transactionId
              );
              paymentDetails.gatewayDetails = txDetails;
            } catch (error) {
              console.error('JazzCash details fetch error:', error);
            }
          }
          break;
          
        case 'stripe':
          if (paymentRecord.gatewayData.paymentIntentId) {
            const stripe = new StripePayment();
            
            try {
              const stripeDetails = await stripe.getPaymentDetails(
                paymentRecord.gatewayData.paymentIntentId
              );
              paymentDetails.gatewayDetails = stripeDetails;
            } catch (error) {
              console.error('Stripe details fetch error:', error);
            }
          }
          break;
      }
    }
    
    return NextResponse.json({
      success: true,
      payment: paymentDetails,
      message: 'پے منٹ کی تفصیلات'
    });
    
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'پے منٹ کی تصدیق میں مسئلہ' 
      },
      { status: 500 }
    );
  }
}

// 🔄 پے منٹ کینسل کریں
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const paymentId = searchParams.get('paymentId');
    
    if (!paymentId) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'پے منٹ آئی ڈی درکار ہے' 
        },
        { status: 400 }
      );
    }
    
    const paymentRecord = await Payment.findById(paymentId);
    
    if (!paymentRecord) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'پے منٹ ریکارڈ نہیں ملا' 
        },
        { status: 404 }
      );
    }
    
    // ✅ صرف pending پے منٹس کینسل کی جا سکتی ہیں
    if (paymentRecord.status !== 'pending') {
      return NextResponse.json(
        { 
          success: false, 
          message: 'صرف زیر التواء پے منٹس کینسل کی جا سکتی ہیں' 
        },
        { status: 400 }
      );
    }
    
    // 🏦 گیٹ وے کے مطابق کینسل کریں
    let cancellationResult;
    
    switch (paymentRecord.paymentMethod) {
      case 'stripe':
        if (paymentRecord.gatewayData?.paymentIntentId) {
          const stripe = new StripePayment();
          cancellationResult = await stripe.cancelPaymentIntent(
            paymentRecord.gatewayData.paymentIntentId
          );
        }
        break;
        
      case 'paypal':
        if (paymentRecord.gatewayData?.orderId) {
          const paypal = new PayPalPayment();
          cancellationResult = await paypal.cancelOrder(
            paymentRecord.gatewayData.orderId
          );
        }
        break;
    }
    
    // 💾 اسٹیٹس اپڈیٹ کریں
    paymentRecord.status = 'cancelled';
    paymentRecord.cancelledAt = new Date();
    paymentRecord.cancellationReason = 'user_cancelled';
    await paymentRecord.save();
    
    // 📦 آرڈر اسٹیٹس بھی اپڈیٹ کریں
    await Order.findByIdAndUpdate(paymentRecord.orderId, {
      status: 'cancelled',
      updatedAt: new Date()
    });
    
    return NextResponse.json({
      success: true,
      message: 'پے منٹ کینسل ہو گئی',
      cancellationId: paymentRecord._id,
      details: cancellationResult
    });
    
  } catch (error) {
    console.error('Payment cancellation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'پے منٹ کینسل ناکام' 
      },
      { status: 500 }
    );
  }
}

// 🛠️ Helper Functions

function validatePaymentRequest(data) {
  const errors = [];
  
  if (!data.orderId) {
    errors.push('آرڈر آئی ڈی درکار ہے');
  }
  
  if (!data.amount || data.amount <= 0) {
    errors.push('درست رقم درکار ہے');
  }
  
  if (!data.paymentMethod) {
    errors.push('پے منٹ طریقہ منتخب کریں');
  }
  
  if (!data.customerInfo) {
    errors.push('صارف کی معلومات درکار ہیں');
  } else {
    if (!data.customerInfo.userId) {
      errors.push('صارف آئی ڈی درکار ہے');
    }
    
    if (!data.customerInfo.email) {
      errors.push('ای میل درکار ہے');
    }
  }
  
  if (!data.courseId) {
    errors.push('کورس آئی ڈی درکار ہے');
  }
  
  return errors;
}

async function createPaymentRecord(data) {
  const Payment = require('@/models/Payment');
  
  const payment = new Payment({
    orderId: data.orderId,
    userId: data.userId,
    courseId: data.courseId,
    amount: data.amount,
    currency: data.currency,
    paymentMethod: data.paymentMethod,
    gatewayData: data.gatewayData,
    status: data.status,
    customerInfo: data.customerInfo,
    metadata: {
      ip: data.ip || 'unknown',
      userAgent: data.userAgent || 'unknown',
      timestamp: new Date()
    }
  });
  
  await payment.save();
  return payment;
}

function getSuccessMessage(paymentMethod) {
  const messages = {
    jazzcash: 'JazzCash پے منٹ لینک تیار ہے',
    easypaisa: 'EasyPaisa پے منٹ لینک تیار ہے',
    stripe: 'Stripe چیک آؤٹ تیار ہے',
    paypal: 'PayPal آرڈر تیار ہے',
    bank_transfer: 'بینک کی تفصیلات حاصل کریں',
    cod: 'کیش آن ڈیلیوری آرڈر مکمل ہوا'
  };
  
  return messages[paymentMethod] || 'پے منٹ لینک تیار ہے';
}

// 📁 models/Payment.js - پے منٹ ماڈل
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    index: true
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
    index: true
  },
  
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  
  currency: {
    type: String,
    required: true,
    default: 'PKR'
  },
  
  paymentMethod: {
    type: String,
    required: true,
    enum: ['jazzcash', 'easypaisa', 'stripe', 'paypal', 'bank_transfer', 'cod']
  },
  
  gatewayData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'cancelled', 'refunded'],
    default: 'pending',
    index: true
  },
  
  customerInfo: {
    name: String,
    email: String,
    mobile: String,
    city: String,
    country: String,
    address: String
  },
  
  metadata: {
    ip: String,
    userAgent: String,
    timestamp: Date
  },
  
  completedAt: Date,
  failedAt: Date,
  cancelledAt: Date,
  refundedAt: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// انڈیکسز
paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ createdAt: -1 });
paymentSchema.index({ paymentMethod: 1, status: 1 });

// ورچوئل فیلڈز
paymentSchema.virtual('formattedAmount').get(function() {
  const symbols = {
    PKR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  return \`\${symbols[this.currency] || ''}\${this.amount.toFixed(2)}\`;
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);`;

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
          className="p-4 cursor-pointer rounded-full hover:text-white bg-opacity-90 text-purple-400 hover:bg-purple-100/80 hover:text-blue-500 transition-all z-[60] text-current"
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
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          باب 25: Complete Admin Dashboard & Payment Integration 💳
        </h1>
        <p className="text-center text-lg mb-10 text-gray-600 dark:text-gray-300">
          مکمل ایڈمن ڈیش بورڈ اور پاکستان کے تمام پے منٹ گیٹ ویز کی انٹیگریشن
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

        {/* Introduction */}
        <section className="mb-16 p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-purple-400">
            🎓 باب کا مقصد: Production-Ready LMS بنانا
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم <strong>حقیقی منافع کمانے والا LMS</strong> بنائیں گے جو پاکستان اور دنیا بھر میں کام کرے گا۔
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="text-3xl mb-3">👑</div>
              <h3 className="text-xl font-bold mb-2 text-purple-600 dark:text-purple-400">Admin Dashboard</h3>
              <p className="text-sm">مکمل انتظامی کنٹرول پینل</p>
            </div>
            
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-green-200 dark:border-green-800">
              <div className="text-3xl mb-3">🇵🇰</div>
              <h3 className="text-xl font-bold mb-2 text-green-600 dark:text-green-400">Pakistani Payments</h3>
              <p className="text-sm">JazzCash, EasyPaisa, Bank Transfer</p>
            </div>
            
            <div className="bg-white/30 dark:bg-slate-800/80 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
              <div className="text-3xl mb-3">🌍</div>
              <h3 className="text-xl font-bold mb-2 text-blue-600 dark:text-blue-400">International Payments</h3>
              <p className="text-sm">Stripe, PayPal, Multi-currency</p>
            </div>
          </div>
        </section>

        {/* Section 25.1: Admin Dashboard */}
        {activeTab === "admin-dashboard" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
              25.1: Complete Admin Dashboard
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">
                👑 Why Admin Dashboard is Essential?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-purple-300">✅ Dashboard Features:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Real-time statistics & analytics</li>
                    <li>User management & activity tracking</li>
                    <li>Course management & enrollment reports</li>
                    <li>Revenue tracking & financial reports</li>
                    <li>Order management & payment monitoring</li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg bg-white/10 dark:bg-slate-800/50">
                  <h4 className="font-bold mb-2 text-pink-300">🚀 Technical Features:</h4>
                  <ul className="list-disc pr-6 space-y-2 text-sm">
                    <li>Server Components for better performance</li>
                    <li>Role-based access control (RBAC)</li>
                    <li>Responsive design for all devices</li>
                    <li>Real-time updates with WebSocket</li>
                    <li>Export functionality for reports</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={adminDashboardCode} 
              colorClass="text-purple-300"
              title="app/admin/dashboard/page.jsx - Complete Admin Dashboard with All Features"
            />
          </section>
        )}

        {/* Section 25.2: Pakistani Payments */}
        {activeTab === "pakistani-payments" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
              25.2: Pakistani Payment Gateways Integration
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-green-500/5 to-emerald-500/5 border border-green-500/20">
              <h3 className="text-xl font-bold mb-4 text-green-300">
                🇵🇰 پاکستان کے لیے مکمل پے منٹ سسٹم
              </h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">💳</span>
                  </div>
                  <p className="font-bold text-green-400">JazzCash</p>
                  <p className="text-sm">35 ملین صارفین</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">📱</span>
                  </div>
                  <p className="font-bold text-blue-400">EasyPaisa</p>
                  <p className="text-sm">موبائل والٹ سسٹم</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">🏦</span>
                  </div>
                  <p className="font-bold text-purple-400">Bank Transfer</p>
                  <p className="text-sm">تمام پاکستانی بینکس</p>
                </div>

                <div className="hidden md:block text-2xl">→</div>

                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center mx-auto mb-2">
                    <span className="text-xl font-bold">💰</span>
                  </div>
                  <p className="font-bold text-amber-400">Cash on Delivery</p>
                  <p className="text-sm">گھر بیٹھے ادائیگی</p>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={pakistaniPaymentsCode} 
              colorClass="text-green-300"
              title="lib/payments/pakistani-payments.js - Complete Pakistani Payment Gateway Integration"
            />
          </section>
        )}

        {/* Section 25.3: International Payments */}
        {activeTab === "international-payments" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
              25.3: International Payment Integration
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20">
              <h3 className="text-xl font-bold mb-4 text-blue-300">
                🌍 Global Payment Solutions for Worldwide Students
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ Stripe Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Credit/Debit Card payments</li>
                    <li>Apple Pay & Google Pay</li>
                    <li>Recurring subscriptions</li>
                    <li>Advanced fraud protection</li>
                    <li>Real-time reporting</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-purple-300">🔧 PayPal Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Global payment acceptance</li>
                    <li>One-click payments</li>
                    <li>Buyer & seller protection</li>
                    <li>Multi-currency support</li>
                    <li>Invoice system</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={internationalPaymentsCode} 
              colorClass="text-blue-300"
              title="lib/payments/international-payments.js - Complete International Payment Integration"
            />
          </section>
        )}

        {/* Section 25.4: Payment API */}
        {activeTab === "payment-api" && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
              25.4: Complete Payment API System
            </h2>

            <div className="p-6 rounded-2xl mb-6 bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20">
              <h3 className="text-xl font-bold mb-4 text-red-300">
                💳 Unified Payment Processing System
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-2 text-green-300">✅ API Endpoints:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>POST /api/payment/create - New payment</li>
                    <li>GET /api/payment/verify - Payment verification</li>
                    <li>DELETE /api/payment/cancel - Cancel payment</li>
                    <li>GET /api/payment/methods - Available methods</li>
                    <li>POST /api/payment/webhook - Webhook handling</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 text-blue-300">📊 Database Features:</h4>
                  <ul className="list-disc pr-6 space-y-2">
                    <li>Complete payment tracking</li>
                    <li>Multi-currency support</li>
                    <li>Customer information storage</li>
                    <li>Gateway response logging</li>
                    <li>Analytics and reporting</li>
                  </ul>
                </div>
              </div>
            </div>

            <CodeBlock 
              code={paymentApiCode} 
              colorClass="text-red-300"
              title="app/api/payment/create/route.js - Complete Payment API with All Features"
            />
          </section>
        )}

        {/* Installation Guide */}
        <section className="my-16 p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
            📦 Installation & Setup Guide
          </h2>
          
          <div className="space-y-4" dir="ltr">
            <pre dir="ltr" className="text-left bg-gray-900 text-green-300 p-4 rounded-lg overflow-x-auto">
{`# Install required packages
npm install stripe @stripe/stripe-js
npm install crypto axios
npm install pdfkit html-pdf-node

# Pakistani Payment Gateway APIs (Development)
# Note: These require business registration in Pakistan
# JazzCash: https://sandbox.jazzcash.com.pk/
# EasyPaisa: https://www.easypaisa.com.pk/

# Environment Variables (.env.local)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Pakistani Payments
JAZZCASH_MERCHANT_ID=your_merchant_id
JAZZCASH_PASSWORD=your_password
JAZZCASH_INTEGRITY_SALT=your_salt
EASYPAISA_STORE_ID=your_store_id
EASYPAISA_ACCOUNT_NUM=your_account_num
EASYPAISA_SECURE_HASH_KEY=your_hash_key

# International Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_secret
PAYPAL_WEBHOOK_ID=your_webhook_id

# Database
MONGODB_URI=your_mongodb_uri`}
            </pre>
          </div>
        </section>

        {/* Practice Section */}
        <section className="my-16 p-8 border-4 border-dashed border-emerald-500 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-green-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400 text-center">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg text-center" dir="rtl">
            <p className="flex items-center justify-center gap-2">
              <span className="bg-purple-500 text-white p-2 rounded">1</span>
              ایڈمن ڈیش بورڈ بنائیں اور test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-green-500 text-white p-2 rounded">2</span>
              JazzCash sandbox account بنائیں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-blue-500 text-white p-2 rounded">3</span>
              Stripe test payments implement کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-red-500 text-white p-2 rounded">4</span>
              مکمل پے منٹ flow test کریں
            </p>
            <p className="flex items-center justify-center gap-2">
              <span className="bg-amber-500 text-white p-2 rounded">5</span>
              Multi-currency system test کریں
            </p>
          </div>
        </section>

       {/* Next Chapter Preview - Detailed Version */}
<section className="p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30">
  <div className="flex items-center gap-4 mb-6">
    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </div>
    <h2 className="text-2xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
      اگلا باب: Real-time Features with Socket.io
    </h2>
  </div>
  
  <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
    آپ کا LMS اب تک بہت اچھا ہے، لیکن حقیقی تعامل کے لیے Real-time فیچرز ضروری ہیں۔ اگلے باب میں ہم Socket.io استعمال کرتے ہوئے حقیقی وقت کی کمیونیکیشن بنائیں گے۔
  </p>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
      <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-3">🎯 سیکھنے کے مقاصد:</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Socket.io setup in Next.js
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Real-time chat implementation
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Live notifications system
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
          Collaborative features
        </li>
      </ul>
    </div>
    
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-green-200 dark:border-green-800">
      <h3 className="font-bold text-green-600 dark:text-green-400 mb-3">🚀 پروجیکٹ آؤٹ پٹ:</h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          Course-specific chat rooms
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          Live instructor Q&A sessions
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
          Real-time progress updates
        </li>
        <li className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          Study group collaboration
        </li>
      </ul>
    </div>
  </div>
  
  <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl border border-blue-300 dark:border-blue-700">
    <div className="flex items-center gap-3">
      <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="font-bold text-blue-800 dark:text-blue-300">
        پروڈکشن ریڈی: Socket.io آپ کے LMS کو حقیقی وقت میں متحرک بنا دے گا!
      </p>
    </div>
    <p className="text-blue-700 dark:text-blue-400 text-sm mt-2">
      طلباء انسٹرکٹرز سے براہ راست بات کریں گے، گروپ اسٹڈی کریں گے، اور Real-time فیڈ بیک حاصل کریں گے۔
    </p>
  </div>
</section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 25: Complete Admin Dashboard & Payment Integration
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