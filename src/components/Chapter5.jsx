import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter5() {
  // تھیم کی حالت (State)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div
      dir="rtl"
      className={`min-h-screen transition-all duration-500 font-sans ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* ہیڈر (نیوبار) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button onClick={toggleSidebar} className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative">
          <div className="space-y-1.5">
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        <button onClick={toggleTheme} className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold transition-transform active:scale-90">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-orange-500 to-pink-500 pb-2">
            📘 سبق 5: Metadata، SEO اور &lt;head&gt; (Next.js میں)
          </h1>
          <div className="p-6 bg-orange-500/10 border-r-4 border-orange-500 rounded-lg mb-8">
            <p className="text-xl font-bold">Next.js میں SEO کے لیے ہمیں:</p>
            <p className="text-lg mt-2 italic text-red-500">❌ &lt;head&gt; manually لکھنے کی ضرورت نہیں</p>
            <p className="text-lg mt-1 italic text-emerald-500 font-bold">✅ Next.js کا Metadata API استعمال کرتے ہیں</p>
          </div>
        </section>

        {/* Metadata کیا ہوتا ہے؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-400">🤔 Metadata کیا ہوتا ہے؟</h2>
          <p className="text-lg mb-6 text-slate-400 italic font-bold">Metadata وہ معلومات ہوتی ہیں جو:</p>
          <ul className="list-disc pr-6 space-y-4 text-lg">
            <li>Google کو بتاتی ہیں کہ page کس بارے میں ہے</li>
            <li>Browser tab میں <strong>title</strong> دکھاتی ہیں</li>
            <li>Social media پر link share کرنے پر نظر آتی ہیں</li>
          </ul>
        </section>

        

        {/* Page Title اور Description */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400 underline decoration-sky-500/30 underline-offset-8">🏷️ Page Title اور Description</h2>
          <p className="mb-4 italic">📁 فائل: app/page.js</p>
          <h3 className="text-lg font-bold mb-3 italic">🧾 Code:</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export const metadata = {
  title: "Next.js اردو ٹیوٹوریل",
  description: "Next.js مکمل کورس اردو زبان میں"
};

export default function Home() {
  return <h1>خوش آمدید</h1>;
}`}
          </pre>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-sky-300' : 'bg-slate-50 border-slate-200'}`}>
              <strong>title</strong> → Browser tab اور Google title
            </div>
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-emerald-400' : 'bg-slate-50 border-slate-200'}`}>
              <strong>description</strong> → Google search میں short text
            </div>
          </div>
        </section>

        {/* ہر پیج کا الگ SEO */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400 italic">📄 ہر Page کا الگ SEO</h2>
          <p className="mb-4 italic">📁 فائل: app/about/page.js</p>
          <pre className="bg-black text-emerald-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export const metadata = {
  title: "ہمارے بارے میں | Next.js اردو",
  description: "Next.js اردو ویب سائٹ کے بارے میں معلومات"
};

export default function About() {
  return <h1>ہمارے بارے میں</h1>;
}`}
          </pre>
        </section>

        {/* Layout میں Default Metadata */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400 italic">🌍 Layout میں Default Metadata</h2>
          <p className="mb-4 italic">📁 فائل: app/layout.js</p>
          <pre className="bg-black text-indigo-300 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`export const metadata = {
  title: {
    default: "NextjsUrdu",
    template: "%s | NextjsUrdu"
  },
  description: "اردو میں Next.js سیکھیں"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ur" dir="rtl">
      <body>{children}</body>
    </html>
  );
}`}
          </pre>
          <p className="p-4 bg-indigo-500/10 rounded-lg text-sm italic">
            <strong>نکتہ:</strong> <code className="text-indigo-400">template</code> کا فائدہ یہ ہے کہ ہر پیج کے ٹائٹل کے ساتھ آپ کی ویب سائٹ کا نام خود بخود جڑ جائے گا۔
          </p>
        </section>

        {/* اردو ٹپس */}
        <section className="mb-16 p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500">📌 اردو ویب سائٹس کے لیے SEO Tips</h2>
          <ul className="space-y-6 text-lg">
            <li>
              <p className="font-bold">✅ RTL ضروری ہے:</p>
              <code className="block bg-black text-white p-2 rounded mt-2 text-center" dir="ltr">{`<html lang="ur" dir="rtl">`}</code>
            </li>
            <li>
              <p className="font-bold">✅ Keywords قدرتی رکھیں:</p>
              <p className="text-red-500">❌ keyword stuffing نہ کریں</p>
            </li>
            <li>
              <p className="font-bold">✅ آسان اردو جملے استعمال کریں</p>
            </li>
          </ul>
        </section>

        {/* Open Graph */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-400">📱 Open Graph (Social Media Preview)</h2>
          <p className="mb-4 text-slate-400 italic font-bold">جب آپ لنک فیس بک یا واٹس ایپ پر شیئر کریں تو کیسا نظر آئے گا:</p>
          <pre className="bg-black text-blue-300 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export const metadata = {
  title: "Next.js اردو",
  description: "اردو میں جدید ویب ڈیولپمنٹ",
  openGraph: {
    title: "Next.js اردو",
    description: "اردو میں مکمل Next.js کورس",
    url: "https://nextjsurdu.com",
    siteName: "NextjsUrdu",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "ur_PK",
    type: "website",
  },
};`}
          </pre>
        </section>

        

        {/* Dynamic Metadata */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400 italic">🧪 Dynamic Metadata (Advanced)</h2>
          <pre className="bg-black text-purple-300 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export async function generateMetadata({ params }) {
  return {
    title: \`\${params.slug} | بلاگ\`,
    description: "بلاگ تفصیل"
  };
}`}
          </pre>
        </section>

        {/* عام غلطیاں */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 italic">⚠️ عام غلطیاں</h2>
          <ul className="space-y-4 text-xl list-none pr-4 border-r-4 border-red-500">
            <li>❌ <strong>&lt;head&gt;</strong> خود لکھنا</li>
            <li>❌ <strong>title</strong> ہر page پر same رکھنا</li>
            <li>❌ <strong>lang="ur"</strong> نہ لگانا</li>
          </ul>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-8 border-4 border-dashed border-orange-500/40 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500">🎯 Practice Task</h2>
          <ul className="space-y-4 text-xl">
            <li>1️⃣ Home اور About کا الگ title رکھیں</li>
            <li>2️⃣ layout میں <strong>RTL enable</strong> کریں</li>
            <li>3️⃣ Social share <strong>image</strong> add کریں</li>
          </ul>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-orange-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-orange-50'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-600 italic">📌 خلاصہ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold">
            <p className="flex items-center gap-2">🔹 Next.js کا Metadata API بہترین SEO دیتا ہے</p>
            <p className="flex items-center gap-2">🔹 Urdu sites کے لیے RTL اور lang ضروری</p>
            <p className="flex items-center gap-2">🔹 ہر page کا اپنا SEO ہونا چاہیے</p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 5 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}