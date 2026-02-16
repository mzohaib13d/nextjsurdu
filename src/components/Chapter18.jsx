import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter18() {
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
    setCopySuccess("کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400" }) => (
    <div className="relative my-8">
      <div className="flex justify-end mb-1">
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

  // Home Page Code
  const homePageCode = `// app/page.js - Home Page
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import Features from '@/components/Features';
import CourseShowcase from '@/components/CourseShowcase';
import Instructors from '@/components/Instructors';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      
      <main>
        <HeroSection />
        <Features />
        <CourseShowcase />
        <Instructors />
        <Testimonials />
      </main>
      
      <Footer />
    </div>
  );
}`;

  // Header Component Code
  const headerCode = `// components/Header.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, BookOpen, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              پاکستان <span className="text-blue-600">LMS</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              گھر
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
              کورسز
            </Link>
            <Link href="/instructors" className="text-gray-700 hover:text-blue-600 font-medium">
              اساتذہ
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              ہمارے بارے میں
            </Link>
          </nav>

          <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
            <Search className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              placeholder="کورس تلاش کریں..."
              className="bg-transparent mr-2 outline-none w-64"
              dir="rtl"
            />
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="px-6 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50"
            >
              لاگ ان
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              سائن اپ
            </Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4" dir="rtl">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                گھر
              </Link>
              <Link href="/courses" className="text-gray-700 hover:text-blue-600">
                کورسز
              </Link>
              <Link href="/instructors" className="text-gray-700 hover:text-blue-600">
                اساتذہ
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600">
                ہمارے بارے میں
              </Link>
              
              <div className="pt-4 border-t">
                <Link href="/login" className="block py-2 text-blue-600">
                  لاگ ان
                </Link>
                <Link
                  href="/signup"
                  className="block mt-2 py-2 bg-blue-600 text-white text-center rounded-lg"
                >
                  سائن اپ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}`;

  // Hero Section Code
  const heroSectionCode = `// components/HeroSection.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlayCircle, Award, Users, Book } from 'lucide-react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50" />
      
      <div className="container relative mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div dir="rtl">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="block">سیکھیں آن لائن</span>
              <span className="text-blue-600">پاکستان کے بہترین اساتذہ سے</span>
            </h1>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              پاکستان کا پہلا مکمل آن لائن لرننگ مینجمنٹ سسٹم۔ 
              ہزاروں کورسز، تجربہ کار اساتذہ، اور جدید تعلیمی وسائل ایک ہی پلیٹ فارم پر۔
            </p>

            <form onSubmit={handleSearch} className="mb-8">
              <div className="flex shadow-lg rounded-full overflow-hidden">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="آپ کیا سیکھنا چاہتے ہیں؟"
                  className="flex-grow px-6 py-4 text-lg outline-none text-right"
                  dir="rtl"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 hover:bg-blue-700"
                >
                  تلاش کریں
                </button>
              </div>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="flex justify-center mb-2">
                  <Book className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold">500+</h3>
                <p className="text-gray-600">کورسز</p>
              </div>
              
              <div>
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold">50K+</h3>
                <p className="text-gray-600">طلبہ</p>
              </div>
              
              <div>
                <div className="flex justify-center mb-2">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold">200+</h3>
                <p className="text-gray-600">اساتذہ</p>
              </div>
              
              <div>
                <div className="flex justify-center mb-2">
                  <PlayCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold">5K+</h3>
                <p className="text-gray-600">لیکچرز</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-96 flex items-center justify-center">
                <div className="text-center p-8">
                  <PlayCircle className="h-20 w-20 text-white mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">
                    تعلیم مستقبل ہے
                  </h3>
                  <p className="text-blue-100">
                    دیکھیں ہمارے طلبہ کی کامیابی کی کہانیاں
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">99%</div>
                <div className="text-gray-600">مطمئن طلبہ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center" dir="rtl">
          <Link
            href="/courses"
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 text-center"
          >
            کورسز دیکھیں
          </Link>
          
          <Link
            href="/signup?role=instructor"
            className="px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 text-center"
          >
            بطور استاد شامل ہوں
          </Link>
        </div>
      </div>
    </section>
  );
}`;

  // Login Page Code
  const loginPageCode = `// app/login/page.js
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, BookOpen } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo redirect
      if (formData.email.includes('admin')) {
        router.push('/admin/dashboard');
      } else if (formData.email.includes('instructor')) {
        router.push('/instructor/dashboard');
      } else {
        router.push('/student/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">
              پاکستان <span className="text-blue-600">LMS</span>
            </span>
          </Link>
          <p className="text-gray-600 mt-2">اپنے اکاؤنٹ میں لاگ ان کریں</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                ای میل ایڈریس
              </label>
              <div className="relative">
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-2 font-medium">
                پاس ورڈ
              </label>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="••••••••"
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
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ml-2"
                />
                <span className="text-gray-700">مجھے یاد رکھیں</span>
              </label>
              
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                پاس ورڈ بھول گئے؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={\`w-full py-3 px-4 rounded-lg font-semibold text-white transition \${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}\`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 ml-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  لاگ ان ہو رہا ہے...
                </span>
              ) : (
                'لاگ ان کریں'
              )}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">یا</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center"
            >
              <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              </svg>
              Google کے ساتھ جاری رکھیں
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              اکاؤنٹ نہیں ہے؟{' '}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                سائن اپ کریں
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500" dir="rtl">
          <p className="mb-2">ڈیمو اکاؤنٹس:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
            <div className="bg-gray-100 p-2 rounded">
              <div className="font-medium">طلبہ</div>
              <div>student@demo.com</div>
              <div>پاس ورڈ: demo123</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div className="font-medium">استاد</div>
              <div>instructor@demo.com</div>
              <div>پاس ورڈ: demo123</div>
            </div>
            <div className="bg-gray-100 p-2 rounded">
              <div className="font-medium">منتظم</div>
              <div>admin@demo.com</div>
              <div>پاس ورڈ: demo123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Signup Page Code
// Signup Page Code - FIXED VERSION
const signupPageCode = `// app/signup/page.js - Signup Page Code - UPDATED VERSION with Google/GitHub
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { User, Mail, Lock, Eye, EyeOff, Book, GraduationCap, Shield, Github } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    role: 'student',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({ ...prev, role: roleId }));
  };

  const handleNextStep = () => {
    if (!formData.role) {
      setError('براہ کرم ایک رول منتخب کریں');
      return;
    }
    setStep(2);
    setError('');
  };

  // Google Signup
  const handleGoogleSignup = async () => {
    try {
      setLoading(true);
      await signIn('google', {
        callbackUrl: \`/signup/social?role=\${formData.role}\`,
      });
    } catch (error) {
      setError('Google سائن اپ میں مسئلہ پیش آیا');
    } finally {
      setLoading(false);
    }
  };

  // GitHub Signup
  const handleGitHubSignup = async () => {
    try {
      setLoading(true);
      await signIn('github', {
        callbackUrl: \`/signup/social?role=\${formData.role}\`,
      });
    } catch (error) {
      setError('GitHub سائن اپ میں مسئلہ پیش آیا');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

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
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect based on role
        if (formData.role === 'student') {
          router.push('/student/dashboard');
        } else if (formData.role === 'instructor') {
          router.push('/instructor/dashboard');
        } else {
          router.push('/admin/dashboard');
        }
      } else {
        setError(data.message || 'سائن اپ میں مسئلہ پیش آیا');
      }
    } catch (err) {
      setError('سائن اپ میں مسئلہ پیش آیا۔ براہ کرم دوبارہ کوشش کریں۔');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-4">
            {[1, 2].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={\`w-10 h-10 rounded-full flex items-center justify-center \${step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}\`}
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

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8" dir="rtl">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{error}</p>
            </div>
          )}

          {step === 1 ? (
            /* Step 1: Role Selection */
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
                      className={\`p-6 border-2 rounded-xl text-right transition-all \${isSelected ? \`border-\${role.color}-500 bg-\${role.color}-50\` : 'border-gray-200 hover:border-gray-300'}\`}
                    >
                      <div className="flex justify-end mb-4">
                        <div
                          className={\`p-3 rounded-lg \${isSelected ? \`bg-\${role.color}-100\` : 'bg-gray-100'}\`}
                        >
                          <Icon
                            className={\`h-6 w-6 \${isSelected ? \`text-\${role.color}-600\` : 'text-gray-500'}\`}
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                      <p className="text-gray-600 mb-4">{role.description}</p>
                      
                      {isSelected && (
                        <div className="flex items-center text-green-600">
                          <div className="h-2 w-2 bg-green-600 rounded-full ml-2" />
                          منتخب شدہ
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Social Signup Options */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-4 text-gray-500">یا سوشل اکاؤنٹ سے جاری رکھیں</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleGoogleSignup}
                    disabled={loading}
                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    </svg>
                    Google
                  </button>
                  
                  <button
                    onClick={handleGitHubSignup}
                    disabled={loading}
                    className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition disabled:opacity-50"
                  >
                    <Github className="w-5 h-5 ml-2" />
                    GitHub
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={handleNextStep}
                  disabled={!formData.role || loading}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'جاری ہے...' : 'اگلا مرحلہ'}
                </button>
              </div>
            </div>
          ) : (
            /* Step 2: Registration Form */
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                اکاؤنٹ کی معلومات درج کریں
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Selected Role Display */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    {(() => {
                      const role = roles.find(r => r.id === formData.role);
                      const Icon = role?.icon;
                      return (
                        <>
                          <Icon className="h-5 w-5 text-blue-600 ml-2" />
                          <span className="font-medium">
                            {role?.title} کے طور پر سائن اپ کر رہے ہیں
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    مکمل نام
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="اپنا مکمل نام درج کریں"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    ای میل ایڈریس
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="example@gmail.com"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    پاس ورڈ
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
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
                </div>

                {/* Confirm Password Input */}
                <div>
                  <label className="block text-gray-700 mb-2 font-medium">
                    پاس ورڈ کی تصدیق کریں
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={6}
                      className="w-full pr-12 pl-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      placeholder="پاس ورڈ دوبارہ درج کریں"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Terms Agreement */}
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 ml-2"
                  />
                  <span className="text-gray-700">
                    میں{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      شرائط و ضوابط
                    </Link>{" "}
                    اور{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      رازداری کی پالیسی
                    </Link>{" "}
                    سے متفق ہوں
                  </span>
                </label>

                {/* Continue with Social */}
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-center text-gray-600 mb-4">
                    یا سوشل اکاؤنٹ سے جاری رکھیں
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handleGoogleSignup}
                      className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      </svg>
                      Google
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleGitHubSignup}
                      className="flex items-center justify-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Github className="w-5 h-5 ml-2" />
                      GitHub
                    </button>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                  >
                    پیچھے جائیں
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className={\`px-8 py-3 rounded-lg font-semibold text-white \${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}\`}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        سائن اپ ہو رہا ہے...
                      </span>
                    ) : (
                      'سائن اپ کریں'
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Login Link */}
          <div className="mt-8 text-center pt-6 border-t border-gray-200">
            <p className="text-gray-600">
              پہلے سے اکاؤنٹ ہے؟{' '}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                لاگ ان کریں
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`;

  // Package.json Setup Code
  const packageSetupCode = `// package.json dependencies
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    
    // Authentication
    "next-auth": "^4.24.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    
    // Database
    "mongoose": "^8.0.3",
    
    // Forms & Validation
    "react-hook-form": "^7.50.1",
    "yup": "^1.3.3",
    "@hookform/resolvers": "^3.3.2",
    
    // UI Components
    "lucide-react": "^0.309.0",
    "react-icons": "^5.0.1",
    
    // State Management
    "zustand": "^4.5.2",
    
    // Payment
    "stripe": "^15.6.0",
    "@stripe/stripe-js": "^2.1.1",
    
    // File Upload
    "uploadthing": "^6.1.0",
    "@uploadthing/react": "^6.1.0",
    
    // Charts
    "recharts": "^2.10.3",
    
    // Date Handling
    "date-fns": "^3.3.1",
    
    // Styling
    "tailwindcss": "^4.1.0", // یا "tailwindcss@latest"
    "postcss": "^8.4.38",
    "autoprefixer": "^10.4.19"
  }
}`;

// NextAuth Configuration Code
const nextAuthCode = `// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/database";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "student",
          emailVerified: true,
        };
      },
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: "student",
          emailVerified: false,
        };
      },
    }),

    // Email/Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          throw new Error("ای میل یا پاس ورڈ غلط ہے");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("ای میل یا پاس ورڈ غلط ہے");
        }

        if (!user.emailVerified) {
          throw new Error("براہ کرم اپنی ای میل تصدیق کریں");
        }

        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },

    async signIn({ user, account }) {
      await connectDB();
      
      const existingUser = await User.findOne({ email: user.email });
      
      if (existingUser) {
        existingUser.name = user.name;
        existingUser.image = user.image;
        if (account.provider === "google") {
          existingUser.emailVerified = true;
        }
        await existingUser.save();
      } else {
        const newUser = new User({
          name: user.name,
          email: user.email,
          role: user.role || "student",
          emailVerified: account.provider === "google",
          authProvider: account.provider,
          createdAt: new Date(),
        });
        
        await newUser.save();
      }
      
      return true;
    },
  },

  pages: {
    signIn: "/login",
    signUp: "/signup",
    error: "/auth/error",
    verifyRequest: "/verify-email",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };`;


  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-green-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-green-400 text-sm">
          {copySuccess}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current"
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
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* باب کا عنوان */}
        <h1 className="text-3xl md:text-5xl font-black mb-10 text-center text-sky-400 border-b-4 border-sky-500 pb-6">
          باب 18: Professional LMS System (MERN Stack + Next.js 14)
        </h1>

        {/* مقدمہ */}
        <section className="mb-16 border-b border-slate-700 pb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-emerald-400">
            🎯 باب کا مقصد
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم ایک مکمل **Professional Learning Management System
            (LMS)** بنائیں گے جو کہ پاکستان کا سب سے بڑا Next.js پروجیکٹ ہوگا۔
            یہ سسٹم آپ کو Freelancing میں $500-$5000 تک کما سکتا ہے۔
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-blue-50"
              } border border-sky-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-sky-400">
                🔹 تین Role System
              </h3>
              <p className="text-sm">Student, Instructor, Admin</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-emerald-50"
              } border border-emerald-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                🔹 Course Management
              </h3>
              <p className="text-sm">Video Lectures, Quizzes, Assignments</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-purple-50"
              } border border-purple-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                🔹 Payment System
              </h3>
              <p className="text-sm">Stripe Integration, PKR Payments</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-amber-50"
              } border border-amber-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-amber-400">
                🔹 Admin Dashboard
              </h3>
              <p className="text-sm">Analytics, Reports, User Management</p>
            </div>
          </div>
        </section>

        {/* Section 18.1: LMS Introduction & Business Potential */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            18.1 LMS Introduction & Business Potential in Pakistan
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              📚 LMS کیا ہے؟
            </h3>
            <p className="mb-4">
              <strong>LMS</strong> یعنی{" "}
              <strong>Learning Management System</strong> ایک ایسا سافٹ ویئر ہے
              جو آن لائن تعلیم اور ٹریننگ کے انتظام کے لیے استعمال ہوتا ہے۔
            </p>

            <div className="bg-slate-800/50 p-4 rounded-lg mb-4">
              <h4 className="font-bold mb-2 text-sky-300">
                🌍 Global Examples:
              </h4>
              <ul className="list-disc pr-6 space-y-2">
                <li>Udemy - World's largest course marketplace</li>
                <li>Coursera - University partner courses</li>
                <li>DigiSkills.pk - Pakistan's national skills program</li>
                <li>مدرسہ - Urdu learning platform</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">
            💰 پاکستان میں Business Potential
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-green-900/30" : "bg-green-50"
              } border border-green-500`}
            >
              <h4 className="text-lg font-bold mb-3 text-green-400">
                🎯 Market Size
              </h4>
              <ul className="space-y-2">
                <li>📈 E-Learning Market: $100M+ by 2025</li>
                <li>👨‍🎓 60M+ students in Pakistan</li>
                <li>🎓 200+ universities & colleges</li>
                <li>💼 1000+ training institutes</li>
              </ul>
            </div>

            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"
              } border border-blue-500`}
            >
              <h4 className="text-lg font-bold mb-3 text-blue-400">
                🚀 Monetization
              </h4>
              <ul className="space-y-2">
                <li>💰 Freelancing: $500 - $5000 per project</li>
                <li>🏫 Own Academy: Monthly subscriptions</li>
                <li>🤝 Commission: 10-30% on course sales</li>
                <li>📦 SaaS: Monthly/Yearly plans</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">
            🎯 Why This LMS Will Be Different?
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-purple-50/50"
            }`}
          >
            <ul className="list-disc pr-6 space-y-3">
              <li>
                <strong>پاکستان کے لیے ڈیزائن:</strong> RTL support, Urdu
                interface, PKR payments
              </li>
              <li>
                <strong>Three-Tier Role System:</strong> Student, Instructor,
                Admin
              </li>
              <li>
                <strong>Complete Solution:</strong> From signup to certificate
                issuance
              </li>
              <li>
                <strong>Mobile Responsive:</strong> Works perfectly on all
                devices
              </li>
              <li>
                <strong>Real Income Potential:</strong> Freelancers can earn
                immediately
              </li>
            </ul>
          </div>
        </section>

        {/* Section 18.2: Project Setup & Folder Structure */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
            18.2 Project Setup & Folder Structure
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-emerald-50/50"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🚀 Step 1: Create Next.js 14 Project
            </h3>

            <div className="mb-6">
              <h4 className="font-bold mb-2 text-sky-300">Terminal Command:</h4>
              <CodeBlock
                code={`npx create-next-app@latest lms-system`}
                colorClass="text-amber-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <h5 className="font-bold mb-2 text-green-400">
                  During Setup Select:
                </h5>
                <ul className="space-y-1 text-sm">
                  <li>✔ TypeScript: No/Yes</li>
                  <li>✔ ESLint: Yes</li>
                  <li>✔ Tailwind CSS: Yes</li>
                  <li>✔ src/ directory: No</li>
                  <li>✔ App Router: Yes</li>
                  <li>✔ Import alias: No</li>
                </ul>
              </div>

              <div
                className={`p-4 rounded-lg ${
                  theme === "dark" ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <h5 className="font-bold mb-2 text-purple-400">
                  Go to Project:
                </h5>
                <CodeBlock
                  code={`cd lms-system`}
                  colorClass="text-purple-300"
                />
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400">
            📦 Step 2: Install Required Packages
          </h3>
          <CodeBlock code={packageSetupCode} colorClass="text-sky-300" />

          <h4 className="text-right font-bold mb-2 text-emerald-400 mt-6">
            📦 Required Packages
          </h4>
          <p dir="ltr">:پروجیکٹ فولڈر میں جائیں اور ضروری پیکیجز انسٹال کریں</p>
          <CodeBlock
  code={`cd lms-system

# Tailwind CSS v4.1 (Latest)
npm install tailwindcss@latest

# Authentication
npm install next-auth bcryptjs jsonwebtoken

# Database
npm install mongoose

# Forms & Validation
npm install react-hook-form yup @hookform/resolvers

# UI Components
npm install lucide-react react-icons

# State Management
npm install zustand

# Payment
npm install stripe @stripe/stripe-js

# File Upload
npm install uploadthing @uploadthing/react

# Charts
npm install recharts

# Date Handling
npm install date-fns`}
  colorClass="text-green-300"
/>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            📁 Step 3: Folder Structure Design
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"
            }`}
          >
            <h4 className="font-bold mb-3 text-purple-400">
              Complete Folder Structure:
            </h4>
            <CodeBlock
              code={`lms-system/
├── app/
│   ├── layout.js
│   ├── page.js                    # Home Page
│   ├── login/
│   │   └── page.js               # Login Page
│   ├── signup/
│   │   └── page.js               # Signup Page
│   ├── courses/
│   │   └── page.js               # Course Listing
│   ├── admin/
│   │   └── dashboard/
│   │       └── page.js           # Admin Dashboard
│   ├── instructor/
│   │   └── dashboard/
│   │       └── page.js           # Instructor Dashboard
│   └── student/
│       └── dashboard/
│           └── page.js           # Student Dashboard
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── HeroSection.js
│   ├── Features.js
│   ├── CourseCard.js
│   ├── Auth/
│   │   ├── LoginForm.js
│   │   └── SignupForm.js
│   ├── Dashboard/
│   │   ├── StudentDashboard.js
│   │   ├── InstructorDashboard.js
│   │   └── AdminDashboard.js
│   └── UI/
│       ├── Button.js
│       ├── Input.js
│       └── Card.js
├── lib/
│   ├── auth.js                  # Authentication logic
│   ├── database.js              # MongoDB connection
│   ├── jwt.js                   # JWT functions
│   └── utils.js                 # Utility functions
├── models/
│   ├── User.js                  # User model
│   ├── Course.js                # Course model
│   ├── Enrollment.js            # Enrollment model
│   ├── Lecture.js               # Lecture model
│   └── Payment.js               # Payment model
├── public/
│   ├── logo.png
│   └── favicon.ico
├── styles/
│   └── globals.css
├── .env.local                   # Environment variables
├── middleware.js               # Next.js middleware
├── next.config.js
├── package.json
└── README.md`}
              colorClass="text-amber-300"
            />
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            ⚙️ Step 4: Environment Variables (.env.local)
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-green-50/50"
            }`}
          >
            <CodeBlock
              code={`# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lms_database

# Authentication
NEXTAUTH_SECRET=your-secret-key-here-make-it-strong
NEXTAUTH_URL=http://localhost:3000

# JWT
JWT_SECRET=your-jwt-secret-key

# Stripe Payments
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Cloudinary (for video uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Uploadthing
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id

# Next.js
NODE_ENV=development`}
              colorClass="text-green-300"
            />

            <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <p className="text-amber-400 font-bold">⚠️ Important:</p>
              <p className="text-sm">
                .env.local کو .gitignore میں include کریں تاکہ یہ GitHub پر نہ
                جائے۔
              </p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🎨 Step 5: Simplified globals.css for v4.1:
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-purple-50/50"
            }`}
          >
            <h4 className="font-bold mb-2 text-purple-400" dir="ltr">
              globals.css Content:
            </h4>
            <CodeBlock code={`/* app/globals.css - Tailwind CSS v4.1 */
@import "tailwindcss";


/* Custom Theme */
@theme {
  --color-primary: #3b82f6;
  --color-primary-dark: #1d4ed8;
  --font-urdu: "Noto Nastaliq Urdu", serif;
}

/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

/* Urdu Font Class */
.urdu {
  font-family: var(--font-urdu);
  direction: rtl;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
  }
}`} colorClass="text-blue-300" />
          </div>

          <div
            className={`p-6 rounded-2xl mt-8 ${
              theme === "dark" ? "bg-emerald-900/30" : "bg-emerald-50"
            } border-2 border-emerald-500`}
          >
            <h4 className="text-xl font-bold mb-4 text-emerald-400">
              ✅ Section 18.2 Summary
            </h4>
            <ul className="list-disc pr-6 space-y-2">
              <li>✅ Next.js 14 project created</li>
              <li>✅ All required packages installed</li>
              <li>✅ Proper folder structure designed</li>
              <li>✅ Environment variables configured</li>
              <li>✅ Tailwind CSS set up with RTL support</li>
              <li>✅ Ready for development</li>
            </ul>
          </div>
        </section>

        {/* Section 18.3: Home Page Design with Hero Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
            18.3 Home Page Design with Hero Section
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-purple-50/50"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🏠 Main Home Page
            </h3>
            <p className="mb-4">ہماری home page کو چار حصوں میں بنائیں گے:</p>
            <ol className="list-decimal pr-6 space-y-2 mb-6">
              <li>
                <strong>Header:</strong> Navigation bar with search
              </li>
              <li>
                <strong>Hero Section:</strong> Main banner with CTA buttons
              </li>
              <li>
                <strong>Features:</strong> System highlights
              </li>
              <li>
                <strong>Footer:</strong> Contact and links
              </li>
            </ol>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400">
            🔧 Home Page Structure
          </h3>
          <CodeBlock code={homePageCode} colorClass="text-sky-300" />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🎯 Header Component
          </h3>
          <p className="mb-4">
            Header میں navigation, search bar, اور authentication buttons ہوں
            گے:
          </p>
          <CodeBlock code={headerCode} colorClass="text-emerald-300" />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🌟 Hero Section
          </h3>
          <p className="mb-4">
            Hero section میں main title, description, search, statistics, اور
            CTA buttons:
          </p>
          <CodeBlock code={heroSectionCode} colorClass="text-purple-300" />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            📱 Responsive Design Tips
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-2 text-green-400">
                  Mobile First Approach:
                </h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>Default styling for mobile</li>
                  <li>md: prefix for tablet</li>
                  <li>lg: prefix for desktop</li>
                  <li>xl: prefix for large screens</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold mb-2 text-amber-400">RTL Support:</h4>
                <ul className="list-disc pr-6 space-y-2">
                  <li>
                    Use <code>dir="rtl"</code> on containers
                  </li>
                  <li>Right padding instead of left</li>
                  <li>Flex row-reverse for layouts</li>
                  <li>Text alignment right</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🎨 Color Scheme for LMS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center">
              <div className="h-12 w-full bg-blue-600 rounded mb-2"></div>
              <p className="text-sm">Primary Blue</p>
              <p className="text-xs">#3B82F6</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-full bg-emerald-600 rounded mb-2"></div>
              <p className="text-sm">Success Green</p>
              <p className="text-xs">#10B981</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-full bg-amber-500 rounded mb-2"></div>
              <p className="text-sm">Warning Amber</p>
              <p className="text-xs">#F59E0B</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-full bg-purple-600 rounded mb-2"></div>
              <p className="text-sm">Premium Purple</p>
              <p className="text-xs">#8B5CF6</p>
            </div>
            <div className="text-center">
              <div className="h-12 w-full bg-slate-800 rounded mb-2"></div>
              <p className="text-sm">Dark Background</p>
              <p className="text-xs">#1E293B</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            📝 Features Component (Example)
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-amber-50/50"
            }`}
          >
            <CodeBlock
              code={`// components/Features.js
import { Video, FileText, Award, Users, Globe, Shield } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Video,
      title: 'ویڈیو لیکچرز',
      description: 'ہائی کوالٹی ویڈیوز سے سیکھیں'
    },
    {
      icon: FileText,
      title: 'PDF نوٹس',
      description: 'ڈاؤن لوڈ ایبل اسٹڈی میٹریل'
    },
    {
      icon: Award,
      title: 'سرٹیفکیٹس',
      description: 'کورس مکمل کرنے پر سرٹیفکیٹ'
    },
    {
      icon: Users,
      title: 'کمیونٹی',
      description: 'طلبہ اور اساتذہ کے ساتھ بات چیت'
    },
    {
      icon: Globe,
      title: 'آن لائن',
      description: 'کہیں سے بھی، کسی بھی وقت'
    },
    {
      icon: Shield,
      title: 'محفوظ',
      description: 'آپ کا ڈیٹا مکمل محفوظ'
    }
  ];

  return (
    <section className="py-20 bg-white" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            خصوصیات جو ہمیں منفرد بناتی ہیں
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            پاکستان کا واحد مکمل LMS جو آپ کی تمام تعلیمی ضروریات پوری کرتا ہے
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-2xl hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-lg mb-6">
                  <Icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`}
              colorClass="text-amber-300"
            />

            
          </div>

          <div
            className={`p-6 rounded-2xl mt-8 ${
              theme === "dark" ? "bg-purple-900/30" : "bg-purple-50"
            } border-2 border-purple-500`}
          >
            <h4 className="text-xl font-bold mb-4 text-purple-400">
              ✅ Section 18.3 Summary
            </h4>
            <ul className="list-disc pr-6 space-y-2">
              <li>✅ Home page structure created</li>
              <li>✅ Header with navigation and search</li>
              <li>✅ Hero section with statistics and CTA</li>
              <li>✅ Features section highlighting LMS benefits</li>
              <li>✅ RTL support implemented</li>
              <li>✅ Responsive design ready</li>
              <li>✅ Color scheme defined</li>
            </ul>
          </div>
        </section>

        {/* Section 18.4: Login Page Design */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            18.4 Login Page Design
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-sky-50/50"
            }`}
          >
            <h3 className="text-xl font-bold mb-4 text-emerald-400">
              🔐 Login Requirements
            </h3>
            <ul className="list-disc pr-6 space-y-2 mb-4">
              <li>Email and password validation</li>
              <li>Remember me functionality</li>
              <li>Password show/hide toggle</li>
              <li>Social login options (Google, Facebook)</li>
              <li>Forgot password link</li>
              <li>Signup redirect link</li>
              <li>Demo accounts for testing</li>
            </ul>
          </div>

          <h3 className="text-xl font-bold mb-4 text-emerald-400">
            📝 Login Page Code
          </h3>
          <p className="mb-4">
            یہ مکمل login page ہے جو social login اور demo accounts کے ساتھ:
          </p>
          <CodeBlock code={loginPageCode} colorClass="text-blue-300" />

          <h3 className="text-xl font-bold mb-4 text-emerald-400 mt-8">
            🎨 Login Page Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-slate-800" : "bg-green-50"
              } border border-green-500/30`}
            >
              <h4 className="font-bold mb-3 text-green-400">
                ✅ Form Validation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Email format validation</li>
                <li>Required field validation</li>
                <li>Password length check</li>
                <li>Real-time error display</li>
                <li>Loading states</li>
              </ul>
            </div>

            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-slate-800" : "bg-blue-50"
              } border border-blue-500/30`}
            >
              <h4 className="font-bold mb-3 text-blue-400">
                🔄 User Experience
              </h4>
              <ul className="space-y-2 text-sm">
                <li>Password visibility toggle</li>
                <li>Remember me checkbox</li>
                <li>Social login options</li>
                <li>Demo accounts for testing</li>
                <li>Responsive design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 18.5: Signup Page with Role Selection */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
            18.5 Signup Page with Role Selection
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-emerald-50/50"
            }`}
          >
   
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              👥 Three User Roles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div
                className={`p-4 rounded-lg text-center ${
                  theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"
                } border border-blue-500`}
              >
                <div className="text-2xl mb-2">👨‍🎓</div>
                <h4 className="font-bold text-blue-400">Student</h4>
                <p className="text-sm">کورسز خریدیں اور سیکھیں</p>
              </div>

              <div
                className={`p-4 rounded-lg text-center ${
                  theme === "dark" ? "bg-green-900/30" : "bg-green-50"
                } border border-green-500`}
              >
                <div className="text-2xl mb-2">👨‍🏫</div>
                <h4 className="font-bold text-green-400">Instructor</h4>
                <p className="text-sm">کورسز بنائیں اور کمائیں</p>
              </div>

              <div
                className={`p-4 rounded-lg text-center ${
                  theme === "dark" ? "bg-purple-900/30" : "bg-purple-50"
                } border border-purple-500`}
              >
                <div className="text-2xl mb-2">👑</div>
                <h4 className="font-bold text-purple-400">Admin</h4>
                <p className="text-sm">سسٹم کا انتظام کریں</p>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-blue-400">
            📝 Signup Page Code
          </h3>
          <p className="mb-4" dir="ltr">Signup Page Code - UPDATED VERSION with Google/GitHub & Email Verification:</p>
          <CodeBlock code={signupPageCode} colorClass="text-emerald-300" />

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🎯 Signup Flow Steps
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    theme === "dark" ? "bg-blue-600" : "bg-blue-100"
                  }`}
                >
                  <span className="text-xl font-bold">1</span>
                </div>
                <p className="font-bold text-blue-400">Role Selection</p>
                <p className="text-sm">Choose student, instructor, or admin</p>
              </div>

              <div className="hidden md:block text-2xl">→</div>

              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    theme === "dark" ? "bg-emerald-600" : "bg-emerald-100"
                  }`}
                >
                  <span className="text-xl font-bold">2</span>
                </div>
                <p className="font-bold text-emerald-400">Information</p>
                <p className="text-sm">Enter name, email, and password</p>
              </div>

              <div className="hidden md:block text-2xl">→</div>

              <div className="text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                    theme === "dark" ? "bg-purple-600" : "bg-purple-100"
                  }`}
                >
                  <span className="text-xl font-bold">3</span>
                </div>
                <p className="font-bold text-purple-400">Dashboard</p>
                <p className="text-sm">Redirect to role-specific dashboard</p>
              </div>
            </div>
          </div>
                   {/* حصہ 18.6 کے بعد یہ نیا section شامل کریں */}
                   <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
                    🚀 18.6 NextAuth Integration</h2>
<h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">🔐  Social Login Integration</h3>
<div className={`p-6 rounded-2xl mb-6 ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-blue-50/50'}`}>
  <p className="mb-4">Signup page میں Google اور GitHub login شامل کریں:</p>
  <CodeBlock code={nextAuthCode} colorClass="text-purple-300" />
</div>

          <h3 className="text-xl font-bold mb-4 text-blue-400 mt-8">
            🔧 Form Validation Rules
          </h3>
          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-amber-50/50"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className={`border-b ${
                      theme === "dark" ? "border-slate-700" : "border-slate-300"
                    }`}
                  >
                    <th className="py-2 pr-4 text-right">Field</th>
                    <th className="py-2 pr-4 text-right">Validation Rules</th>
                    <th className="py-2 pr-4 text-right">Error Messages</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`border-b ${
                      theme === "dark" ? "border-slate-700" : "border-slate-300"
                    }`}
                  >
                    <td className="py-3 pr-4 font-medium">Name</td>
                    <td className="py-3 pr-4">
                      Required, min 2 chars, max 50 chars
                    </td>
                    <td className="py-3 pr-4 text-red-400">نام درکار ہے</td>
                  </tr>
                  <tr
                    className={`border-b ${
                      theme === "dark" ? "border-slate-700" : "border-slate-300"
                    }`}
                  >
                    <td className="py-3 pr-4 font-medium">Email</td>
                    <td className="py-3 pr-4">
                      Required, valid email format, unique
                    </td>
                    <td className="py-3 pr-4 text-red-400">
                      درست ای میل درج کریں
                    </td>
                  </tr>
                  <tr
                    className={`border-b ${
                      theme === "dark" ? "border-slate-700" : "border-slate-300"
                    }`}
                  >
                    <td className="py-3 pr-4 font-medium">Password</td>
                    <td className="py-3 pr-4">
                      Required, min 6 chars, matches confirm
                    </td>
                    <td className="py-3 pr-4 text-red-400">
                      پاس ورڈ مماثل نہیں
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium">Terms</td>
                    <td className="py-3 pr-4">Must be checked</td>
                    <td className="py-3 pr-4 text-red-400">
                      شرائط سے متفق ہوں
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Practice Task */}
        <section className="my-16 p-6 md:p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg" dir="rtl">
            <p>1️⃣ Next.js 14 میں LMS پروجیکٹ بنائیں</p>
            <p>2️⃣ تمام required packages انسٹال کریں</p>
            <p>3️⃣ Home page بنائیں (Header + Hero Section)</p>
            <p>4️⃣ Login page بنائیں (Form + Validation)</p>
            <p>5️⃣ Signup page بنائیں (Role Selection + Multi-step)</p>
            <p>6️⃣ RTL support شامل کریں</p>
            <p>7️⃣ Responsive design کریں</p>
            <p>8️⃣ Demo accounts کے ساتھ test کریں</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section
          className={`p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 ${
            theme === "dark" ? "bg-slate-800" : "bg-blue-50"
          }`}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 italic">
            📌 خلاصہ (Chapter 18 - Part 1)
          </h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li>
              • <strong>LMS Introduction:</strong> Learning Management System کا
              مکمل تعارف
            </li>
            <li>
              • <strong>Project Setup:</strong> Next.js 14 + تمام packages
            </li>
            <li>
              • <strong>Folder Structure:</strong> Professional organization
            </li>
            <li>
              • <strong>Home Page:</strong> Header + Hero + Features + Footer
            </li>
            <li>
              • <strong>Login Page:</strong> Form validation + social login
            </li>
            <li>
              • <strong>Signup Page:</strong> Role selection + multi-step form
            </li>
            <li>
              • <strong>RTL Support:</strong> Urdu interface + right-to-left
            </li>
            <li>
              • <strong>Responsive Design:</strong> Mobile-first approach
            </li>
          </ul>
        </section>

        {/* Next Steps */}
        <section
          className={`p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl mb-12 ${
            theme === "dark" ? "bg-slate-800" : "bg-emerald-50"
          }`}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-600 italic">
            🚀 اگلے اسباق میں
          </h2>
          <p className="mb-4 text-lg">
            اگلے اسباق میں ہم درج ذیل چیزیں سیکھیں گے:
          </p>
          <ul className="list-disc pr-6 space-y-2">
            <li>NextAuth.js Authentication Setup</li>
            <li>MongoDB Database Design</li>
            <li>User Models and Schemas</li>
            <li>Role-Based Access Control (RBAC)</li>
            <li>Student Dashboard Design</li>
            <li>Instructor Dashboard Design</li>
            <li>Admin Dashboard Design</li>
            <li>Course Creation System</li>
            <li>Video Upload with Cloudinary</li>
            <li>Stripe Payment Integration</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 18: Professional LMS System (Part
            1)
          </p>
          <p className="text-sm mt-2">
            🚀 اگلے سبق میں ہم Authentication اور Database design سیکھیں گے!
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
      `}</style>
    </div>
  );
}
