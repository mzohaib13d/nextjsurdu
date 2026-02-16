// 📁 src/components/Chapter27.jsx - مکمل باب 27 (ای میل سسٹم، اینالیٹکس، ڈیپلائمنٹ)
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RightSidebar from "./RightSidebar";
import {
  Mail, Send, Inbox, MailOpen, AlertCircle,
  Settings, Users, Clock, CheckCircle, XCircle,
  BarChart3, TrendingUp, TrendingDown, PieChart, LineChart,
  Calendar, Download, Share2, Award, Target, Activity,
  Rocket, Server, Globe, Lock, Shield, Zap, Database,
  Github, Terminal, CheckCircle2, AlertTriangle, Cloud,
  Copy, Check, Loader2, ChevronRight, BookOpen, ExternalLink,
  ArrowLeft, ArrowRight, PlayCircle, RefreshCw,
  DollarSign
} from "lucide-react";

export default function Chapter27() {
  const navigate = useNavigate();

  // اسٹیٹ مینجمنٹ
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeTab, setActiveTab] = useState("email");
  
  // ای میل سسٹم کی اسٹیٹس
  const [emailConfig, setEmailConfig] = useState({
    provider: "sendgrid",
    apiKey: "",
    fromEmail: "noreply@yourlms.com",
    fromName: "پاکستان ایل ایم ایس",
    templates: [],
  });

  const [emailLogs, setEmailLogs] = useState([]);
  const [emailStats, setEmailStats] = useState({
    sent: 1250,
    delivered: 1245,
    opened: 987,
    clicked: 654,
    bounced: 5,
  });

  // اینالیٹکس کی اسٹیٹس
  const [dateRange, setDateRange] = useState("7d");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);

  // تھیم کو سنبھالنا
  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // اینالیٹکس ڈیٹا حاصل کریں
  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  // کوڈ کاپی کرنے کا فنکشن
  const handleCopy = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("🎉 کوڈ کاپی ہو گیا! اب استعمال کریں!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  // تھیم تبدیل کریں
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // سائیڈبار کھولیں/بند کریں
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // اینالیٹکس ڈیٹا حاصل کرنے کا فنکشن
  const fetchAnalyticsData = async () => {
    setLoadingAnalytics(true);

    try {
      // اے پی آئی کال کی نقلی صورت
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setAnalyticsData({
        users: {
          total: 12547,
          active: 8934,
          new: 342,
          growth: 12.5,
          chart: [
            { date: "2024-01-01", value: 11200 },
            { date: "2024-01-02", value: 11350 },
            { date: "2024-01-03", value: 11500 },
            { date: "2024-01-04", value: 11700 },
            { date: "2024-01-05", value: 11900 },
            { date: "2024-01-06", value: 12200 },
            { date: "2024-01-07", value: 12547 },
          ],
        },
        courses: {
          total: 87,
          published: 72,
          drafts: 15,
          enrollments: 45678,
          popular: [
            { name: "ری ایکٹ ماسٹرکلاس", enrollments: 3456, revenue: 1728000 },
            {
              name: "نیکسٹ جے ایس مکمل کورس",
              enrollments: 2890,
              revenue: 1445000,
            },
            { name: "مونگو ڈی بی ماہر", enrollments: 2345, revenue: 1172500 },
            { name: "ٹائپ اسکرپٹ گائیڈ", enrollments: 1987, revenue: 993500 },
          ],
        },
        revenue: {
          total: 8567000,
          monthly: 1245000,
          growth: 15.8,
          breakdown: {
            subscriptions: 4560000,
            oneTime: 3245000,
            bundles: 762000,
          },
        },
        engagement: {
          avgTimeSpent: 47,
          completionRate: 68,
          returnRate: 82,
          activeUsers: 3421,
        },
      });
    } catch (error) {
      console.error("اینالیٹکس ڈیٹا حاصل کرنے میں خرابی:", error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  // SuperSimpleCode Component - بالکل آپ کے نمونے کی طرح
  const SuperSimpleCode = ({ code, title, steps }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-green-600 dark:text-green-400">{title}</h3>
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
          <p className="font-bold text-green-700 dark:text-green-300 mb-1">کیسے استعمال کریں:</p>
          <ol className="list-decimal pr-6 text-base text-gray-800 dark:text-gray-200">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  // ای میل سسٹم کا کوڈ
  const emailSystemCode = {
    config: `// 📁 lib/email/config.js
/**
 * 🔧 ای میل سروس کنفیگریشن
 * یہ فائل ای میل بھیجنے کے لیے ترتیبات فراہم کرتی ہے
 */

import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

class EmailService {
  constructor() {
    this.provider = process.env.EMAIL_PROVIDER || 'sendgrid';
    this.fromEmail = process.env.EMAIL_FROM || 'noreply@yourlms.com';
    this.fromName = process.env.EMAIL_FROM_NAME || 'پاکستان ایل ایم ایس';
    
    this.initializeProvider();
  }

  /**
   * 🚀 منتخب کردہ فراہم کنندہ کو ترتیب دیں
   */
  initializeProvider() {
    switch (this.provider) {
      case 'sendgrid':
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        break;
      case 'smtp':
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD
          }
        });
        break;
    }
  }

  /**
   * 📧 ای میل بھیجنے کا مرکزی فنکشن
   */
  async sendEmail(options) {
    try {
      const emailOptions = {
        from: \`"\${this.fromName}" <\${this.fromEmail}>\`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        attachments: options.attachments || []
      };

      switch (this.provider) {
        case 'sendgrid':
          return await this.sendViaSendGrid(emailOptions);
        case 'smtp':
          return await this.sendViaSMTP(emailOptions);
        default:
          throw new Error('ای میل فراہم کنندہ ترتیب نہیں دیا گیا');
      }
    } catch (error) {
      console.error('ای میل بھیجنے میں ناکامی:', error);
      throw error;
    }
  }

  /**
   * ✉️ سینڈ گرڈ کے ذریعے ای میل بھیجیں
   */
  async sendViaSendGrid(options) {
    const msg = {
      ...options,
      from: {
        email: this.fromEmail,
        name: this.fromName
      }
    };
    
    const response = await sgMail.send(msg);
    return {
      success: true,
      messageId: response[0]?.headers['x-message-id'],
      provider: 'sendgrid'
    };
  }

  /**
   * 📨 ایس ایم ٹی پی کے ذریعے ای میل بھیجیں
   */
  async sendViaSMTP(options) {
    const info = await this.transporter.sendMail(options);
    return {
      success: true,
      messageId: info.messageId,
      provider: 'smtp'
    };
  }
}

// واحد مثال (سنگلٹن) بنا کر برآمد کریں
export const emailService = new EmailService();`,

    templates: `// 📁 lib/email/templates.js
/**
 * 📝 ای میل سانچے (Templates)
 * مختلف مواقع کے لیے پیشہ ورانہ ای میل سانچے
 */

export const emailTemplates = {
  /**
   * 👋 نئے صارف کا خیرمقدم
   */
  welcome: (user) => ({
    subject: 'پاکستان ایل ایم ایس میں خوش آمدید! 🎉',
    html: \`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; }
          .header h1 { color: white; margin: 0; }
          .content { padding: 30px; background: #f9f9f9; }
          .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎓 پاکستان ایل ایم ایس</h1>
          </div>
          <div class="content">
            <h2>السلام علیکم \${user.name}!</h2>
            <p>پاکستان ایل ایم ایس میں خوش آمدید۔ آپ کا اکاؤنٹ کامیابی سے بن گیا ہے۔</p>
            <p>اب آپ مندرجہ ذیل خصوصیات سے فائدہ اٹھا سکتے ہیں:</p>
            <ul>
              <li>📚 80+ معیاری کورسز</li>
              <li>👨‍🏫 تجربہ کار اساتذہ</li>
              <li>🎥 ویڈیو لیکچرز</li>
              <li>📝 عملی کوئزز اور اسائنمنٹس</li>
              <li>🏆 سرٹیفیکیشن</li>
            </ul>
            <p>اپنا سیکھنے کا سفر شروع کریں:</p>
            <p><a href="\${process.env.REACT_APP_URL}/courses" class="button">کورسز دیکھیں</a></p>
          </div>
          <div class="footer">
            <p>© 2024 پاکستان ایل ایم ایس۔ جملہ حقوق محفوظ ہیں۔</p>
            <p>یہ ای میل خودکار نظام نے بھیجی ہے، براہ کرم اس کا جواب نہ دیں۔</p>
          </div>
        </div>
      </body>
      </html>
    \`
  }),

  /**
   * 📚 کورس کے اندراج کی تصدیق
   */
  enrollment: (user, course) => ({
    subject: \`کورس میں اندراج کی تصدیق: \${course.title}\`,
    html: \`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .success-badge { background: #10b981; color: white; padding: 10px; text-align: center; border-radius: 5px; }
          .course-info { background: #f3f4f6; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .button { background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-badge">
            <h2>✅ کامیابی! آپ کا اندراج ہو گیا ہے</h2>
          </div>
          
          <div class="course-info">
            <h3>\${course.title}</h3>
            <p><strong>استاد:</strong> \${course.instructor}</p>
            <p><strong>دورانیہ:</strong> \${course.duration} گھنٹے</p>
            <p><strong>اقساط:</strong> \${course.lectures} اسباق</p>
            <p><strong>سطح:</strong> \${course.level}</p>
          </div>
          
          <p style="text-align: center;">
            <a href="\${process.env.REACT_APP_URL}/my-courses/\${course.id}" class="button">
              🎬 ابھی سیکھنا شروع کریں
            </a>
          </p>
        </div>
      </body>
      </html>
    \`
  }),

  /**
   * 🏆 سرٹیفکیٹ جاری ہونا
   */
  certificate: (user, course, certificate) => ({
    subject: 'مبارک ہو! آپ کا سرٹیفکیٹ جاری ہو گیا ہے 🏆',
    html: \`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .certificate-badge { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 20px; text-align: center; }
          .certificate-info { border: 2px dashed #f59e0b; padding: 30px; margin: 20px 0; text-align: center; }
          .button { background: #f59e0b; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="certificate-badge">
            <h1>🏆 سرٹیفکیٹ آف کمپلیشن</h1>
          </div>
          
          <div class="certificate-info">
            <h2>\${user.name}</h2>
            <p>نے کامیابی سے کورس مکمل کیا ہے:</p>
            <h3>"\${course.title}"</h3>
            <p>تاریخ: \${new Date().toLocaleDateString('ur-PK')}</p>
            <p>سرٹیفکیٹ آئی ڈی: \${certificate.id}</p>
          </div>
          
          <p style="text-align: center;">
            <a href="\${process.env.REACT_APP_URL}/certificates/\${certificate.id}" class="button">
              📄 سرٹیفکیٹ ڈاؤن لوڈ کریں
            </a>
          </p>
        </div>
      </body>
      </html>
    \`
  }),

  /**
   * 🔑 پاس ورڈ دوبارہ ترتیب دینا
   */
  resetPassword: (user, resetToken) => ({
    subject: 'پاس ورڈ دوبارہ ترتیب دیں',
    html: \`
      <!DOCTYPE html>
      <html dir="rtl">
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .warning { background: #fef3c7; border-right: 4px solid #f59e0b; padding: 15px; }
          .button { background: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>پاس ورڈ دوبارہ ترتیب دینے کی درخواست</h2>
          
          <div class="warning">
            <p>آپ نے پاس ورڈ دوبارہ ترتیب دینے کی درخواست کی ہے۔</p>
            <p>اگر آپ نے یہ درخواست نہیں کی تو براہ کرم اس ای میل کو نظر انداز کریں۔</p>
          </div>
          
          <p>نیا پاس ورڈ ترتیب دینے کے لیے نیچے دیے گئے بٹن پر کلک کریں:</p>
          
          <p style="text-align: center;">
            <a href="\${process.env.REACT_APP_URL}/reset-password?token=\${resetToken}" class="button">
              🔑 پاس ورڈ ترتیب دیں
            </a>
          </p>
          
          <p>یہ لنک 1 گھنٹے کے لیے کارآمد ہے۔</p>
        </div>
      </body>
      </html>
    \`
  })
};`,

    api: `// 📁 app/api/email/send/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { emailService } from '@/lib/email/config';
import { emailTemplates } from '@/lib/email/templates';
import connectDB from '@/lib/database';
import EmailLog from '@/models/EmailLog';

/**
 * 📧 ای میل بھیجنے کا اے پی آئی
 */
export async function POST(request) {
  try {
    await connectDB();
    
    // صارف کی توثیق
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'پہلے لاگ ان کریں' },
        { status: 401 }
      );
    }
    
    const { type, to, data } = await request.json();
    
    // ای میل کی قسم چیک کریں
    if (!emailTemplates[type]) {
      return NextResponse.json(
        { success: false, message: 'غلط ای میل کی قسم' },
        { status: 400 }
      );
    }
    
    // سانچہ حاصل کریں
    const template = emailTemplates[type](data, data);
    
    // ای میل بھیجیں
    const result = await emailService.sendEmail({
      to,
      subject: template.subject,
      html: template.html
    });
    
    // لاگ محفوظ کریں
    await EmailLog.create({
      type,
      to,
      subject: template.subject,
      status: 'sent',
      messageId: result.messageId,
      sentBy: session.user.id
    });
    
    return NextResponse.json({
      success: true,
      message: 'ای میل کامیابی سے بھیج دی گئی',
      data: result
    }, { status: 200 });
    
  } catch (error) {
    console.error('ای میل بھیجنے میں خرابی:', error);
    
    // ناکام لاگ محفوظ کریں
    await EmailLog.create({
      type: request.type,
      to: request.to,
      subject: 'ناکام',
      status: 'failed',
      error: error.message
    });
    
    return NextResponse.json(
      { success: false, message: 'سرور کی خرابی' },
      { status: 500 }
    );
  }
}

/**
 * 📨 ای میل لاگز حاصل کریں
 */
export async function GET(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'اختیار نہیں' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;
    
    // لاگز حاصل کریں
    const logs = await EmailLog.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('sentBy', 'name email');
    
    const total = await EmailLog.countDocuments();
    
    // اعداد و شمار
    const stats = {
      total: await EmailLog.countDocuments(),
      sent: await EmailLog.countDocuments({ status: 'sent' }),
      failed: await EmailLog.countDocuments({ status: 'failed' }),
      pending: await EmailLog.countDocuments({ status: 'pending' })
    };
    
    return NextResponse.json({
      success: true,
      data: {
        logs,
        stats,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('لاگز حاصل کرنے میں خرابی:', error);
    return NextResponse.json(
      { success: false, message: 'سرور کی خرابی' },
      { status: 500 }
    );
  }
}`,

    model: `// 📁 models/EmailLog.js
import mongoose from 'mongoose';

/**
 * 📧 ای میل لاگ ماڈل
 * بھیجی گئی تمام ای میلز کا ریکارڈ رکھتا ہے
 */
const emailLogSchema = new mongoose.Schema({
  // ای میل کی قسم
  type: {
    type: String,
    enum: ['welcome', 'enrollment', 'certificate', 'resetPassword', 'notification', 'promotional'],
    required: true,
    index: true
  },
  
  // وصول کنندہ
  to: {
    type: String,
    required: true,
    index: true
  },
  
  // ای میل کا موضوع
  subject: {
    type: String,
    required: true
  },
  
  // حیثیت
  status: {
    type: String,
    enum: ['pending', 'sent', 'delivered', 'opened', 'clicked', 'failed', 'bounced'],
    default: 'pending',
    index: true
  },
  
  // میسج آئی ڈی (فراہم کنندہ سے)
  messageId: String,
  
  // ٹریکنگ ڈیٹا
  tracking: {
    opened: { type: Boolean, default: false },
    openedAt: Date,
    openedCount: { type: Number, default: 0 },
    clicked: { type: Boolean, default: false },
    clickedAt: Date,
    clickedCount: { type: Number, default: 0 },
    links: [{
      url: String,
      clickedAt: Date
    }]
  },
  
  // میٹا ڈیٹا
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // خرابی کا پیغام (اگر ناکام ہو)
  error: String,
  
  // بھیجنے والا (صارف)
  sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  
  // متعلقہ دستاویزات
  relatedTo: {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' },
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  }
}, {
  timestamps: true
});

// انڈیکسز
emailLogSchema.index({ createdAt: -1 });
emailLogSchema.index({ status: 1, createdAt: -1 });
emailLogSchema.index({ 'relatedTo.user': 1, createdAt: -1 });

// ورچوئل فیلڈز
emailLogSchema.virtual('isSuccess').get(function() {
  return ['sent', 'delivered', 'opened', 'clicked'].includes(this.status);
});

emailLogSchema.virtual('deliveryTime').get(function() {
  if (this.createdAt && this.tracking.openedAt) {
    return (this.tracking.openedAt - this.createdAt) / 1000;
  }
  return null;
});

// سٹیٹک میتھڈز
emailLogSchema.statics.getStats = async function(days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  const stats = await this.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    { $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      total: { $sum: 1 },
      sent: { $sum: { $cond: [{ $in: ['$status', ['sent', 'delivered', 'opened', 'clicked']] }, 1, 0] } },
      failed: { $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] } },
      opened: { $sum: { $cond: [{ $eq: ['$tracking.opened', true] }, 1, 0] } },
      clicked: { $sum: { $cond: [{ $eq: ['$tracking.clicked', true] }, 1, 0] } }
    }},
    { $sort: { _id: 1 } }
  ]);
  
  return stats;
};

export default mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema);`,

    webhook: `// 📁 app/api/email/webhook/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import EmailLog from '@/models/EmailLog';

/**
 * 🔔 سینڈ گرڈ ویب ہُک
 * ای میل کی ترسیل کی معلومات حاصل کرتا ہے
 */
export async function POST(request) {
  try {
    await connectDB();
    
    const events = await request.json();
    
    // سینڈ گرڈ ایک سے زیادہ واقعات بھیج سکتا ہے
    for (const event of events) {
      const { 
        sg_message_id, 
        event: eventType,
        email,
        timestamp,
        url,
        reason,
        response
      } = event;
      
      // میسج آئی ڈی سے لاگ تلاش کریں
      const log = await EmailLog.findOne({ messageId: sg_message_id });
      
      if (!log) continue;
      
      // واقعہ کی بنیاد پر لاگ اپ ڈیٹ کریں
      switch (eventType) {
        case 'delivered':
          log.status = 'delivered';
          break;
          
        case 'open':
          log.tracking.opened = true;
          log.tracking.openedAt = new Date(timestamp * 1000);
          log.tracking.openedCount += 1;
          break;
          
        case 'click':
          log.tracking.clicked = true;
          log.tracking.clickedAt = new Date(timestamp * 1000);
          log.tracking.clickedCount += 1;
          log.tracking.links.push({ url, clickedAt: new Date(timestamp * 1000) });
          break;
          
        case 'bounce':
          log.status = 'bounced';
          log.error = reason || 'بوُنس ہو گئی';
          break;
          
        case 'dropped':
          log.status = 'failed';
          log.error = reason || response || 'گرا دی گئی';
          break;
          
        case 'spamreport':
          log.metadata.spamReported = true;
          log.metadata.spamReportedAt = new Date(timestamp * 1000);
          break;
      }
      
      await log.save();
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
    
  } catch (error) {
    console.error('ویب ہُک خرابی:', error);
    return NextResponse.json(
      { success: false, message: 'سرور کی خرابی' },
      { status: 500 }
    );
  }
}`,

    env: `# 📁 .env.local - ای میل کنفیگریشن

# سینڈ گرڈ (انتخاب 1)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_PROVIDER=sendgrid

# ایس ایم ٹی پی (انتخاب 2)
# EMAIL_PROVIDER=smtp
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASSWORD=your-app-password

# عام ترتیبات
EMAIL_FROM=noreply@yourlms.com
EMAIL_FROM_NAME="پاکستان ایل ایم ایس"

# ویب ہُک سیکرٹ (اختیاری)
SENDGRID_WEBHOOK_SECRET=your-webhook-secret`,
  };

  // اینالیٹکس کوڈ
  const analyticsCode = {
    dashboard: `// 📁 components/analytics/AnalyticsDashboard.jsx
'use client';

import { useState, useEffect } from 'react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell, Area, AreaChart
} from 'recharts';
import {
  Users, BookOpen, DollarSign, TrendingUp,
  Calendar, Download, RefreshCw, Filter
} from 'lucide-react';

/**
 * 📊 مکمل اینالیٹکس ڈیش بورڈ
 */
export default function AnalyticsDashboard({ initialData, dateRange = '7d' }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('users');
  const [timeRange, setTimeRange] = useState(dateRange);
  
  // رنگوں کی ترتیب
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
  
  // میٹرک کارڈز
  const metrics = [
    {
      id: 'users',
      label: 'کل صارفین',
      value: data?.users?.total?.toLocaleString() || '0',
      icon: Users,
      change: data?.users?.growth || 0,
      color: 'blue'
    },
    {
      id: 'courses',
      label: 'کل کورسز',
      value: data?.courses?.total?.toString() || '0',
      icon: BookOpen,
      change: 8.2,
      color: 'green'
    },
    {
      id: 'revenue',
      label: 'کل آمدنی',
      value: \`₹\${(data?.revenue?.total / 1000000).toFixed(1)}M\`,
      icon: DollarSign,
      change: data?.revenue?.growth || 0,
      color: 'purple'
    },
    {
      id: 'engagement',
      label: 'مصروفیت',
      value: \`\${data?.engagement?.activeUsers || 0}%\`,
      icon: TrendingUp,
      change: 5.4,
      color: 'orange'
    }
  ];
  
  // ڈیٹا ریفریش کریں
  const refreshData = async () => {
    setLoading(true);
    try {
      const response = await fetch(\`/api/analytics?range=\${timeRange}\`);
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error('ڈیٹا ریفریش میں خرابی:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      {/* سرخی اور کنٹرولز */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            📊 تفصیلی تجزیاتی رپورٹ
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            آپ کے پلیٹ فارم کی کارکردگی کا جائزہ
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* وقت کی حد */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="7d">آخری 7 دن</option>
            <option value="30d">آخری 30 دن</option>
            <option value="90d">آخری 90 دن</option>
            <option value="1y">آخری سال</option>
          </select>
          
          {/* ریفریش بٹن */}
          <button
            onClick={refreshData}
            disabled={loading}
            className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <RefreshCw className={\`w-5 h-5 \${loading ? 'animate-spin' : ''}\`} />
          </button>
          
          {/* ڈاؤن لوڈ بٹن */}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">رپورٹ ڈاؤن لوڈ</span>
          </button>
        </div>
      </div>
      
      {/* اہم اعداد و شمار */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
            purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
            orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
          };
          
          return (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div className={\`p-3 rounded-lg \${colorClasses[metric.color]}\`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={\`text-sm font-medium px-2 py-1 rounded-full \${metric.change >= 0 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'}\`}>
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {metric.label}
              </p>
            </div>
          );
        })}
      </div>
      
      {/* صارفین کی ترقی کا چارٹ */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          صارفین میں ترقی
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data?.users?.chart || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                fill="#93c5fd" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* دو کالم والے چارٹ */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* آمدنی کی تقسیم */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            آمدنی کی تقسیم
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'سبسکرپشن', value: data?.revenue?.breakdown?.subscriptions || 0 },
                    { name: 'ایک بار', value: data?.revenue?.breakdown?.oneTime || 0 },
                    { name: 'بنڈل', value: data?.revenue?.breakdown?.bundles || 0 }
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => \`\${name} \${(percent * 100).toFixed(0)}%\`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data?.revenue?.breakdown && Object.values(data.revenue.breakdown).map((entry, index) => (
                    <Cell key={\`cell-\${index}\`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* مصروفیت میٹرکس */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            مصروفیت میٹرکس
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  اوسط وقت (منٹ)
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {data?.engagement?.avgTimeSpent || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: \`\${((data?.engagement?.avgTimeSpent || 0) / 60) * 100}%\` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  تکمیل کی شرح
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {data?.engagement?.completionRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: \`\${data?.engagement?.completionRate || 0}%\` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  واپسی کی شرح
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {data?.engagement?.returnRate || 0}%
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: \`\${data?.engagement?.returnRate || 0}%\` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  فعال صارفین
                </span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">
                  {data?.engagement?.activeUsers?.toLocaleString() || 0}
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-orange-600 h-2.5 rounded-full" 
                  style={{ width: \`\${((data?.engagement?.activeUsers || 0) / (data?.users?.total || 1)) * 100}%\` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* مقبول کورسز */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          مقبول ترین کورسز
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">کورس</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">اندراجات</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">آمدنی</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">کارکردگی</th>
              </tr>
            </thead>
            <tbody>
              {data?.courses?.popular?.map((course, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900 dark:text-white">{course.name}</div>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {course.enrollments.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    ₹{(course.revenue / 100000).toFixed(1)}L
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: \`\${Math.min(100, (course.enrollments / 4000) * 100)}%\` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {Math.round((course.enrollments / 4000) * 100)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}`,

    api: `// 📁 app/api/analytics/route.js
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import connectDB from '@/lib/database';
import User from '@/models/User';
import Course from '@/models/Course';
import Enrollment from '@/models/Enrollment';
import Payment from '@/models/Payment';

/**
 * 📊 اینالیٹکس ڈیٹا حاصل کرنے کا اے پی آئی
 */
export async function GET(request) {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'اختیار نہیں' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';
    
    // تاریخ کی حد مقرر کریں
    const endDate = new Date();
    const startDate = new Date();
    
    switch (range) {
      case '7d':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(startDate.getDate() - 90);
        break;
      case '1y':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }
    
    // متوازی ڈیٹا حاصل کریں
    const [
      totalUsers,
      newUsers,
      totalCourses,
      totalEnrollments,
      completedEnrollments,
      revenue,
      userGrowth,
      popularCourses
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $gte: startDate } }),
      Course.countDocuments({ status: 'published' }),
      Enrollment.countDocuments(),
      Enrollment.countDocuments({ status: 'completed' }),
      Payment.aggregate([
        { $match: { status: 'completed', createdAt: { $gte: startDate } } },
        { $group: { _id: null, total: { $sum: '$amount' } } }
      ]),
      getUserGrowthData(startDate, endDate),
      getPopularCourses(5)
    ]);
    
    // مصروفیت کا ڈیٹا
    const engagement = await calculateEngagement(startDate, endDate);
    
    return NextResponse.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          new: newUsers,
          growth: ((newUsers / totalUsers) * 100) || 0,
          chart: userGrowth
        },
        courses: {
          total: totalCourses,
          enrollments: totalEnrollments,
          completions: completedEnrollments,
          popular: popularCourses
        },
        revenue: {
          total: revenue[0]?.total || 0,
          monthly: await calculateMonthlyRevenue(),
          growth: await calculateRevenueGrowth(),
          breakdown: await getRevenueBreakdown(startDate, endDate)
        },
        engagement
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('اینالیٹکس خرابی:', error);
    return NextResponse.json(
      { success: false, message: 'سرور کی خرابی' },
      { status: 500 }
    );
  }
}

/**
 * 📈 صارفین کی ترقی کا ڈیٹا
 */
async function getUserGrowthData(startDate, endDate) {
  const pipeline = [
    {
      $match: {
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 }
      }
    },
    { $sort: { _id: 1 } }
  ];
  
  const data = await User.aggregate(pipeline);
  
  // سارے دنوں کو بھریں
  const filledData = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const existing = data.find(d => d._id === dateStr);
    
    filledData.push({
      date: dateStr,
      value: existing?.count || 0
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return filledData;
}

/**
 * 🏆 مقبول ترین کورسز
 */
async function getPopularCourses(limit = 5) {
  return await Enrollment.aggregate([
    {
      $group: {
        _id: '$course',
        enrollments: { $sum: 1 },
        revenue: { $sum: '$amount' }
      }
    },
    { $sort: { enrollments: -1 } },
    { $limit: limit },
    {
      $lookup: {
        from: 'courses',
        localField: '_id',
        foreignField: '_id',
        as: 'course'
      }
    },
    { $unwind: '$course' },
    {
      $project: {
        name: '$course.title',
        enrollments: 1,
        revenue: 1,
        rating: '$course.rating'
      }
    }
  ]);
}

/**
 * ⏱️ مصروفیت کا حساب
 */
async function calculateEngagement(startDate, endDate) {
  // یہاں آپ اپنے ٹریکنگ سسٹم سے ڈیٹا حاصل کریں گے
  // مثال کے طور پر:
  
  return {
    avgTimeSpent: 47,
    completionRate: 68,
    returnRate: 82,
    activeUsers: 3421
  };
}

async function calculateMonthlyRevenue() {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  
  const result = await Payment.aggregate([
    { $match: { status: 'completed', createdAt: { $gte: startOfMonth } } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ]);
  
  return result[0]?.total || 0;
}

async function calculateRevenueGrowth() {
  const thisMonth = new Date();
  thisMonth.setDate(1);
  thisMonth.setHours(0, 0, 0, 0);
  
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  lastMonth.setDate(1);
  lastMonth.setHours(0, 0, 0, 0);
  
  const [thisMonthRevenue, lastMonthRevenue] = await Promise.all([
    Payment.aggregate([
      { $match: { status: 'completed', createdAt: { $gte: thisMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]),
    Payment.aggregate([
      { 
        $match: { 
          status: 'completed', 
          createdAt: { 
            $gte: lastMonth, 
            $lt: thisMonth 
          } 
        } 
      },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ])
  ]);
  
  const current = thisMonthRevenue[0]?.total || 0;
  const previous = lastMonthRevenue[0]?.total || 0;
  
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

async function getRevenueBreakdown(startDate, endDate) {
  const pipeline = [
    {
      $match: {
        status: 'completed',
        createdAt: { $gte: startDate, $lte: endDate }
      }
    },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' }
      }
    }
  ];
  
  const breakdown = await Payment.aggregate(pipeline);
  
  return {
    subscriptions: breakdown.find(b => b._id === 'subscription')?.total || 0,
    oneTime: breakdown.find(b => b._id === 'one-time')?.total || 0,
    bundles: breakdown.find(b => b._id === 'bundle')?.total || 0
  };
}`,

    charts: `// 📁 components/analytics/RevenueChart.jsx
'use client';

import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend
} from 'recharts';

/**
 * 💰 آمدنی کا چارٹ
 */
export function RevenueChart({ data, type = 'line' }) {
  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  }
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

/**
 * 👥 صارفین کا چارٹ
 */
export function UsersChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area 
          type="monotone" 
          dataKey="users" 
          stroke="#10b981" 
          fill="#a7f3d0" 
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/**
 * 📚 کورسز کا چارٹ
 */
export function CoursesChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={150} />
        <Tooltip />
        <Legend />
        <Bar dataKey="enrollments" fill="#f59e0b" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}`,
  };

  // ڈیپلائمنٹ کوڈ
  const deploymentCode = {
    vercel: `// 📁 vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/nextjs"
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb_uri",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "NEXTAUTH_URL": "@nextauth_url",
    "SENDGRID_API_KEY": "@sendgrid_api_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}`,

    docker: `# 📁 Dockerfile
FROM node:18-alpine AS base

# انحصار کی تنصیب
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# تعمیر
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# چلانے کا مرحلہ
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]`,

    compose: `# 📁 docker-compose.yml
version: '3.8'

services:
  # نیکسٹ جے ایس ایپلی کیشن
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/lms
      - REDIS_URL=redis://redis:6379
    depends_on:
      - mongodb
      - redis
    restart: unless-stopped
    networks:
      - lms-network

  # مونگو ڈی بی
  mongodb:
    image: mongo:6
    container_name: lms_mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=your_password
    restart: unless-stopped
    networks:
      - lms-network

  # ریڈیس (کیشنگ کے لیے)
  redis:
    image: redis:7-alpine
    container_name: lms_redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    restart: unless-stopped
    networks:
      - lms-network

  # این جینکس (لوڈ بیلنسر)
  nginx:
    image: nginx:alpine
    container_name: lms_nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
    networks:
      - lms-network

volumes:
  mongodb_data:
  redis_data:

networks:
  lms-network:
    driver: bridge`,

    nginx: `# 📁 nginx.conf
events {
    worker_connections 1024;
}

http {
    upstream lms_app {
        server app:3000;
    }

    server {
        listen 80;
        server_name yourlms.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name yourlms.com;

        ssl_certificate /etc/nginx/ssl/cert.pem;
        ssl_certificate_key /etc/nginx/ssl/key.pem;
        
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;

        # سیکیورٹی ہیڈرز
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header Referrer-Policy "strict-origin-when-cross-origin" always;
        add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';" always;

        location / {
            proxy_pass http://lms_app;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }

        location /_next/static {
            proxy_cache STATIC;
            proxy_pass http://lms_app/_next/static;
            expires 365d;
        }

        location /api {
            proxy_pass http://lms_app/api;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
}`,

    github: `# 📁 .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Node.js نصب کریں
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: انحصار نصب کریں
        run: npm ci
        
      - name: کوڈ چیک کریں
        run: npm run lint
        
      - name: ٹیسٹ چلائیں
        run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v3
      
      - name: ویرسل کو تعینات کریں
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: \${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: \${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: \${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'`,

    env: `# 📁 .env.production
# ڈیٹا بیس
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms

# تصدیق
NEXTAUTH_SECRET=your_super_secret_key_at_least_32_chars
NEXTAUTH_URL=https://yourlms.com

# ای میل
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=noreply@yourlms.com
EMAIL_FROM_NAME="پاکستان ایل ایم ایس"

# ادائیگیاں
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxx

# کلاؤڈ سٹوریج
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# اینالیٹکس
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# سیکیورٹی
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW=900000

# کیشنگ
REDIS_URL=redis://localhost:6379`,

    script: `# 📁 scripts/deploy.sh
#!/bin/bash

# رنگین آؤٹ پٹ کے لیے
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

echo -e "\${BLUE}========================================\${NC}"
echo -e "\${GREEN}🚀 پروڈکشن ڈیپلائمنٹ شروع ہو رہی ہے\${NC}"
echo -e "\${BLUE}========================================\${NC}"

# 1. انحصار چیک کریں
echo -e "\${YELLOW}[1/6] انحصار چیک کر رہا ہے...\${NC}"
if ! command -v node &> /dev/null; then
    echo -e "\${RED}❌ Node.js نہیں ملا\${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "\${RED}❌ npm نہیں ملا\${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "\${RED}❌ Docker نہیں ملا\${NC}"
    exit 1
fi

echo -e "\${GREEN}✅ تمام انحصار موجود ہیں\${NC}"

# 2. ماحولی متغیرات چیک کریں
echo -e "\${YELLOW}[2/6] ماحولی متغیرات چیک کر رہا ہے...\${NC}"
if [ ! -f .env.production ]; then
    echo -e "\${RED}❌ .env.production فائل نہیں ملی\${NC}"
    exit 1
fi
echo -e "\${GREEN}✅ ماحولی متغیرات تیار ہیں\${NC}"

# 3. پروجیکٹ تعمیر کریں
echo -e "\${YELLOW}[3/6] پروجیکٹ تعمیر کر رہا ہے...\${NC}"
npm ci
npm run build

if [ $? -ne 0 ]; then
    echo -e "\${RED}❌ تعمیر ناکام\${NC}"
    exit 1
fi
echo -e "\${GREEN}✅ تعمیر کامیاب\${NC}"

# 4. موجودہ کنٹینرز ہٹائیں
echo -e "\${YELLOW}[4/6] پرانے کنٹینرز ہٹا رہا ہے...\${NC}"
docker-compose down || true
docker system prune -f
echo -e "\${GREEN}✅ پرانے کنٹینرز ہٹا دیے گئے\${NC}"

# 5. نئے کنٹینرز تعمیر کریں
echo -e "\${YELLOW}[5/6] نئے کنٹینرز تعمیر کر رہا ہے...\${NC}"
docker-compose build --no-cache
docker-compose up -d

if [ $? -ne 0 ]; then
    echo -e "\${RED}❌ ڈیپلائمنٹ ناکام\${NC}"
    exit 1
fi
echo -e "\${GREEN}✅ ڈیپلائمنٹ کامیاب\${NC}"

# 6. ہیلتھ چیک
echo -e "\${YELLOW}[6/6] ہیلتھ چیک کر رہا ہے...\${NC}"
sleep 10

HEALTH_CHECK=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/api/health)

if [ "$HEALTH_CHECK" = "200" ]; then
    echo -e "\${GREEN}✅ ایپلیکیشن صحیح طریقے سے چل رہی ہے\${NC}"
else
    echo -e "\${RED}❌ ہیلتھ چیک ناکام\${NC}"
    docker-compose logs app --tail=50
    exit 1
fi

echo -e "\${BLUE}========================================\${NC}"
echo -e "\${GREEN}🎉 ڈیپلائمنٹ مکمل! ایپ چل رہی ہے: http://localhost:3000\${NC}"
echo -e "\${BLUE}========================================\${NC"`,

    health: `// 📁 app/api/health/route.js
import { NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import mongoose from 'mongoose';

/**
 * 🏥 ہیلتھ چیک اے پی آئی
 */
export async function GET() {
  const healthcheck = {
    uptime: process.uptime(),
    timestamp: Date.now(),
    status: 'ok',
    services: {
      database: 'pending',
      memory: 'pending',
      disk: 'pending'
    }
  };

  try {
    // ڈیٹا بیس کنکشن چیک کریں
    await connectDB();
    healthcheck.services.database = mongoose.connection.readyState === 1 ? 'ok' : 'error';
  } catch (error) {
    healthcheck.services.database = 'error';
    healthcheck.status = 'error';
  }

  // میموری چیک کریں
  const memoryUsage = process.memoryUsage();
  healthcheck.services.memory = {
    status: memoryUsage.heapUsed / memoryUsage.heapTotal < 0.9 ? 'ok' : 'warning',
    heapUsed: \`\${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB\`,
    heapTotal: \`\${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB\`,
    rss: \`\${Math.round(memoryUsage.rss / 1024 / 1024)}MB\`
  };

  // اگر کوئی خرابی ہو
  if (healthcheck.status === 'error') {
    return NextResponse.json(healthcheck, { status: 503 });
  }

  return NextResponse.json(healthcheck, { status: 200 });
}`,
  };

  const tabs = [
    { id: "email", label: "📧 ای میل سسٹم", icon: "📧" },
    { id: "analytics", label: "📊 اینالیٹکس ڈیش بورڈ", icon: "📊" },
    { id: "deployment", label: "🚀 پروڈکشن ڈیپلائمنٹ", icon: "🚀" },
  ];

  return (
    <div dir="rtl" className={`min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      
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
    className="p-5 cursor-pointer rounded-full hover:text-blue-500 transition-all focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
  >
    <div className="space-y-1.5">
      <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
      <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "opacity-0" : ""}`}></span>
      <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
    </div>
  </button>
  
  {/* EMPTY DIV to maintain spacing */}
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
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />
      <div className="pt-16"> </div> {/* Add padding-top to avoid overlap with fixed header */}
{/* MAIN CHAPTER HEADING - ADDED HERE */}
  <div className="text-center mb-8 pt-4"> 
    <h1 className="text-center text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-cyan-600 pb-2">
      🚀 چیپٹر 27: ای میل سسٹم • اینالیٹکس • ڈیپلائمنٹ
    </h1>
    <p className="text-sm lg:text-[1.3rem] text-gray-600 dark:text-gray-400 mb-6">
      مکمل ای میل سسٹم • اینالیٹکس ڈیش بورڈ • پروڈکشن ڈیپلائمنٹ
    </p>
  </div>

      {/* ٹیبز */}
      <div className="pt-4 pb-4 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-3 rounded-lg transition-all ${activeTab === tab.id 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700"}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-bold whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

        {/* مرکزی مواد */}
<main className="pb-20 px-4 max-w-6xl mx-auto">
  
        {/* ای میل سسٹم ٹیب */}
        {activeTab === "email" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                📧 مکمل ای میل سسٹم
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">پیشہ ورانہ</span> ای میل سسٹم سیٹ اپ کریں
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">⏱️ وقت:</span> 45 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">📊 Level:</span> Intermediate
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">🎯 مقصد:</span> مکمل ای میل انٹیگریشن
                </div>
              </div>
            </div>

            {/* تعارف */}
            <section className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">
                🎯 اس حصے میں ہم سیکھیں گے
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>سینڈ گرڈ اور ایس ایم ٹی پی سیٹ اپ</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>پیشہ ورانہ ای میل سانچے</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>خوش آمدید، اندراج، اور سرٹیفکیٹ ای میلز</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ای میل ٹریکنگ اور لاگز</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ویب ہُک انٹیگریشن</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ای میل تجزیات اور رپورٹس</p>
                  </div>
                </div>
              </div>
            </section>

            {/* کنفیگریشن فائل */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">ای میل کنفیگریشن</h2>
              </div>
              
              <SuperSimpleCode
                title="lib/email/config.js"
                code={emailSystemCode.config}
                steps={[
                  "lib/email فولڈر بنائیں",
                  "config.js فائل بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "اپنی .env فائل میں API keys شامل کریں"
                ]}
              />
            </section>

            {/* ای میل سانچے */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ای میل سانچے</h2>
              </div>
              
              <SuperSimpleCode
                title="lib/email/templates.js"
                code={emailSystemCode.templates}
                steps={[
                  "lib/email فولڈر میں templates.js بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "اپنے برانڈ کے مطابق customize کریں"
                ]}
              />
            </section>

            {/* ای میل API */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">ای میل API</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/email/send/route.js"
                code={emailSystemCode.api}
                steps={[
                  "app/api/email/send فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "ای میل بھیجنے کے لیے API استعمال کریں"
                ]}
              />
            </section>

            {/* ای میل ماڈل */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">ای میل لاگ ماڈل</h2>
              </div>
              
              <SuperSimpleCode
                title="models/EmailLog.js"
                code={emailSystemCode.model}
                steps={[
                  "models فولڈر میں EmailLog.js بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "ای میل ٹریکنگ کے لیے استعمال کریں"
                ]}
              />
            </section>

            {/* ویب ہُک */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">ویب ہُک انٹیگریشن</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/email/webhook/route.js"
                code={emailSystemCode.webhook}
                steps={[
                  "app/api/email/webhook فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "SendGrid ڈیش بورڈ میں ویب ہُک سیٹ اپ کریں"
                ]}
              />
            </section>

            {/* ماحولی متغیرات */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">6</div>
                <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">ماحولی متغیرات</h2>
              </div>
              
              <SuperSimpleCode
                title=".env.local"
                code={emailSystemCode.env}
                steps={[
                  ".env.local فائل بنائیں",
                  "اپنی API keys شامل کریں",
                  "کبھی بھی .env.local کو گیٹ ہب پر push نہ کریں"
                ]}
              />
            </section>

            {/* ای میل سٹیٹس */}
            <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📊 ای میل کے اعداد و شمار
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {emailStats.sent}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    بھیجی گئیں
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {emailStats.delivered}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    پہنچ گئیں
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <MailOpen className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {emailStats.opened}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    کھولی گئیں
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <Activity className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {emailStats.clicked}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    کلک کیا گیا
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg text-center">
                  <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {emailStats.bounced}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    واپس آئیں
                  </p>
                </div>
              </div>
            </section>
          </section>
        )}
        
        {/* اینالیٹکس ٹیب */}
        {activeTab === "analytics" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                📊 مکمل اینالیٹکس ڈیش بورڈ
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">پیشہ ورانہ</span> تجزیاتی ڈیش بورڈ بنائیں
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">⏱️ وقت:</span> 45 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">📊 Level:</span> Intermediate
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">🎯 مقصد:</span> مکمل تجزیات
                </div>
              </div>
            </div>

            {/* تعارف */}
            <section className="mb-10 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-purple-700 dark:text-purple-300">
                🎯 اس حصے میں ہم سیکھیں گے
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>صارفین کی ترقی کا تجزیہ</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>آمدنی کا تجزیہ اور چارٹس</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>مقبول ترین کورسز</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>مصروفیت میٹرکس</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>تکمیل کی شرح</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>رپورٹ ڈاؤن لوڈ</p>
                  </div>
                </div>
              </div>
            </section>

            {/* اہم اعداد و شمار */}
            {analyticsData && !loadingAnalytics && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        +{analyticsData.users.growth}%
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                      {analyticsData.users.total.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      کل صارفین
                    </p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        {analyticsData.courses.published}/{analyticsData.courses.total}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                      {analyticsData.courses.total}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">کل کورسز</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span className="text-sm font-medium px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                        +{analyticsData.revenue.growth}%
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                      ₹{(analyticsData.revenue.total / 1000000).toFixed(1)}M
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">کل آمدنی</p>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <span className="text-sm font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 rounded-full">
                        {analyticsData.engagement.completionRate}%
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-1">
                      {analyticsData.engagement.activeUsers.toLocaleString()}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      فعال صارفین
                    </p>
                  </div>
                </div>

                {/* چارٹس */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <LineChart className="w-5 h-5 text-blue-600" />
                      <span>صارفین کی ترقی</span>
                    </h3>
                    <div className="h-64">
                      <div className="w-full h-full flex items-end gap-2">
                        {analyticsData.users.chart.map((item, index) => (
                          <div
                            key={index}
                            className="flex-1 flex flex-col items-center"
                          >
                            <div
                              className="w-full bg-gradient-to-t from-blue-500 to-blue-300 dark:from-blue-600 dark:to-blue-400 rounded-t-lg"
                              style={{
                                height: `${(item.value / 13000) * 100}%`,
                              }}
                            ></div>
                            <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                              {new Date(item.date).getDate()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <PieChart className="w-5 h-5 text-purple-600" />
                      <span>آمدنی کی تقسیم</span>
                    </h3>
                    <div className="h-64 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-4 w-full">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            ₹
                            {(
                              analyticsData.revenue.breakdown.subscriptions /
                              100000
                            ).toFixed(1)}
                            L
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            سبسکرپشن
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            ₹
                            {(
                              analyticsData.revenue.breakdown.oneTime / 100000
                            ).toFixed(1)}
                            L
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            ایک بار
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-orange-500 rounded-full mx-auto mb-2"></div>
                          <p className="text-sm font-bold text-gray-900 dark:text-white">
                            ₹
                            {(
                              analyticsData.revenue.breakdown.bundles / 100000
                            ).toFixed(1)}
                            L
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            بنڈل
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* مقبول کورسز */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    مقبول ترین کورسز
                  </h3>
                  <div className="space-y-4">
                    {analyticsData.courses.popular.map((course, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            {course.name}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {course.enrollments.toLocaleString()} طلباء • ₹
                            {(course.revenue / 100000).toFixed(1)}L آمدنی
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">
                            {Math.round((course.enrollments / 4000) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* مصروفیت میٹرکس تفصیل */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    مصروفیت میٹرکس تفصیل
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">اوسط سیشن دورانیہ</span>
                          <span className="text-sm font-bold">{analyticsData.engagement.avgTimeSpent} منٹ</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">کورس مکمل کرنے کی شرح</span>
                          <span className="text-sm font-bold">{analyticsData.engagement.completionRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${analyticsData.engagement.completionRate}%` }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">واپس آنے والے صارفین</span>
                          <span className="text-sm font-bold">{analyticsData.engagement.returnRate}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${analyticsData.engagement.returnRate}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">📈 رجحانات</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex justify-between">
                          <span>گزشتہ ہفتے کے مقابلے میں:</span>
                          <span className="text-green-600">+12.5%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>گزشتہ ماہ کے مقابلے میں:</span>
                          <span className="text-green-600">+23.8%</span>
                        </li>
                        <li className="flex justify-between">
                          <span>متوقع اگلے ماہ:</span>
                          <span className="text-blue-600">+15.2%</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}

            {loadingAnalytics && (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            )}

            {/* اینالیٹکس ڈیش بورڈ کوڈ */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">اینالیٹکس ڈیش بورڈ کوڈ</h2>
              </div>
              
              <SuperSimpleCode
                title="components/analytics/AnalyticsDashboard.jsx"
                code={analyticsCode.dashboard}
                steps={[
                  "components/analytics فولڈر بنائیں",
                  "AnalyticsDashboard.jsx فائل بنائیں",
                  "recharts انسٹال کریں: npm install recharts",
                  "یہ کوڈ کاپی کریں اور استعمال کریں"
                ]}
              />
            </section>

            {/* اینالیٹکس API */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">اینالیٹکس API</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/analytics/route.js"
                code={analyticsCode.api}
                steps={[
                  "app/api/analytics فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "یہ کوڈ کاپی کریں",
                  "اپنے ماڈلز کے مطابق ایڈجسٹ کریں"
                ]}
              />
            </section>

            {/* چارٹس کمپوننٹس */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">چارٹس کمپوننٹس</h2>
              </div>
              
              <SuperSimpleCode
                title="components/analytics/RevenueChart.jsx"
                code={analyticsCode.charts}
                steps={[
                  "components/analytics میں یہ فائل بنائیں",
                  "مختلف چارٹس کے لیے استعمال کریں",
                  "اپنے ڈیٹا کے مطابق customize کریں"
                ]}
              />
            </section>
          </section>
        )}
        
        {/* ڈیپلائمنٹ ٹیب */}
        {activeTab === "deployment" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
                🚀 پروڈکشن ڈیپلائمنٹ
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">پیشہ ورانہ</span> ڈیپلائمنٹ گائیڈ
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">⏱️ وقت:</span> 45 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">📊 Level:</span> Advanced
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">🎯 مقصد:</span> پروڈکشن ریڈی
                </div>
              </div>
            </div>

            {/* تعارف */}
            <section className="mb-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-green-300 dark:border-green-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-green-700 dark:text-green-300">
                🎯 اس حصے میں ہم سیکھیں گے
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ویرسل ڈیپلائمنٹ</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ڈوکر کنٹینرائزیشن</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ڈوکر کمپوز سیٹ اپ</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>این جینکس لوڈ بیلنسنگ</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>گٹ ہب ایکشنز سی آئی/سی ڈی</p>
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="flex items-center gap-3">
                    <span className="text-green-500">✅</span>
                    <p>ہیلتھ چیک اور مانیٹرنگ</p>
                  </div>
                </div>
              </div>
            </section>

            {/* ویرسل ڈیپلائمنٹ */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ویرسل ڈیپلائمنٹ</h2>
              </div>
              
              <SuperSimpleCode
                title="vercel.json"
                code={deploymentCode.vercel}
                steps={[
                  "ورژن کنٹرول میں تمام تبدیلیاں محفوظ کریں",
                  "vercel CLI انسٹال کریں: npm i -g vercel",
                  "vercel کمانڈ چلائیں اور ہدایات پر عمل کریں",
                  "پروڈکشن کے لیے: vercel --prod"
                ]}
              />
            </section>

            {/* ڈوکر فائل */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">ڈوکر کنٹینرائزیشن</h2>
              </div>
              
              <SuperSimpleCode
                title="Dockerfile"
                code={deploymentCode.docker}
                steps={[
                  "Dockerfile بنائیں",
                  "docker build -t lms-app .",
                  "docker run -p 3000:3000 lms-app"
                ]}
              />
            </section>

            {/* ڈوکر کمپوز */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">ڈوکر کمپوز</h2>
              </div>
              
              <SuperSimpleCode
                title="docker-compose.yml"
                code={deploymentCode.compose}
                steps={[
                  "docker-compose.yml فائل بنائیں",
                  "docker-compose up -d",
                  "docker-compose down"
                ]}
              />
            </section>

            {/* این جینکس کنفیگریشن */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">این جینکس کنفیگریشن</h2>
              </div>
              
              <SuperSimpleCode
                title="nginx.conf"
                code={deploymentCode.nginx}
                steps={[
                  "nginx.conf فائل بنائیں",
                  "SSL سرٹیفکیٹس شامل کریں",
                  "ڈومین کو کنفیگر کریں"
                ]}
              />
            </section>

            {/* گٹ ہب ایکشنز */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-700 rounded-full flex items-center justify-center text-white font-bold">5</div>
                <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">گٹ ہب ایکشنز</h2>
              </div>
              
              <SuperSimpleCode
                title=".github/workflows/deploy.yml"
                code={deploymentCode.github}
                steps={[
                  ".github/workflows فولڈر بنائیں",
                  "deploy.yml فائل بنائیں",
                  "گٹ ہب سیکرٹس شامل کریں"
                ]}
              />
            </section>

            {/* ماحولی متغیرات */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center text-white font-bold">6</div>
                <h2 className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">پروڈکشن ماحولی متغیرات</h2>
              </div>
              
              <SuperSimpleCode
                title=".env.production"
                code={deploymentCode.env}
                steps={[
                  ".env.production فائل بنائیں",
                  "حقیقی پروڈکشن ویلیوز شامل کریں",
                  "کبھی بھی یہ فائل گیٹ ہب پر push نہ کریں"
                ]}
              />
            </section>

            {/* ڈیپلائمنٹ اسکرپٹ */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">7</div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">ڈیپلائمنٹ اسکرپٹ</h2>
              </div>
              
              <SuperSimpleCode
                title="scripts/deploy.sh"
                code={deploymentCode.script}
                steps={[
                  "scripts فولڈر بنائیں",
                  "deploy.sh فائل بنائیں",
                  "chmod +x scripts/deploy.sh",
                  "./scripts/deploy.sh چلائیں"
                ]}
              />
            </section>

            {/* ہیلتھ چیک */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">8</div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">ہیلتھ چیک API</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/health/route.js"
                code={deploymentCode.health}
                steps={[
                  "app/api/health فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "ڈیپلائمنٹ کے بعد ہیلتھ چیک کریں"
                ]}
              />
            </section>

            {/* ڈیپلائمنٹ چیک لسٹ */}
            <section className="mb-10 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <span>✅ ڈیپلائمنٹ چیک لسٹ</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2">🟢 ضروری اقدامات:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>.env.production فائل بنائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>ویرسل اکاؤنٹ بنائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>مونگو ڈی بی ایٹلس کلسٹر بنائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>ڈومین خرید کر کنیکٹ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>ایس ایس ایل سرٹیفکیٹ انسٹال کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>گٹ ہب ریپوزٹری بنائیں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded" />
                      <span>ورژن کنٹرول میں تمام فائلیں شامل کریں</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-gray-300 mb-2">🟠 اختیاری لیکن مفید:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>سی ڈی این (Cloudinary) سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>گٹ ہب ایکشنز سی آئی/سی ڈی سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>ڈوکر کنٹینرائزیشن</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>مونگو ڈی بی آٹومیٹک بیک اپ سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>اینالیٹکس (Google Analytics) سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>ای میل سروس (SendGrid) سیٹ اپ کریں</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4 text-orange-500 rounded" />
                      <span>ایرر مانیٹرنگ (Sentry) سیٹ اپ کریں</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* ڈیپلائمنٹ کمانڈز */}
            <section className="mb-10 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-blue-200 dark:border-blue-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                📝 ڈیپلائمنٹ کمانڈز
              </h3>
              <div className="space-y-2" dir="ltr">
                <div className="bg-gray-900 text-green-300 p-3 rounded-lg font-mono text-sm">
                  # Vercel Deployment
                  npm i -g vercel
                  vercel
                  vercel --prod
                </div>
                <div className="bg-gray-900 text-green-300 p-3 rounded-lg font-mono text-sm">
                  # Docker Deployment
                  docker build -t lms-app .
                  docker run -p 3000:3000 lms-app
                </div>
                <div className="bg-gray-900 text-green-300 p-3 rounded-lg font-mono text-sm">
                  # Docker Compose
                  docker-compose up -d
                  docker-compose down
                  docker-compose logs -f
                </div>
                <div className="bg-gray-900 text-green-300 p-3 rounded-lg font-mono text-sm">
                  # Health Check
                  curl http://localhost:3000/api/health
                </div>
              </div>
            </section>
          </section>
        )}

        {/* نیچے نیویگیشن - صرف تین ٹیبز کے درمیان */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
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
                const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
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
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        pre {
          font-family: 'Courier New', monospace;
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