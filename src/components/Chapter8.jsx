import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter8() {
  // تھیم اور سائیڈ بار کی اسٹیٹ
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
        <button onClick={toggleSidebar} className="p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current">
          <div className="space-y-1.5">
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        <button 
          onClick={toggleTheme} 
          className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-[#f97316] to-[#dc2626] text-white font-bold transition-transform active:scale-90"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-[#f97316] to-[#dc2626] pb-2">
            📘 سبق 8: Dynamic Routes میں Data Fetching اور Not Found Pages
          </h1>
          <div className="p-6 bg-orange-500/10 border-r-4 border-[#f97316] rounded-lg shadow-sm mb-8">
            <p className="text-xl font-bold italic underline decoration-orange-500/30 underline-offset-8">Next.js میں dynamic routing مکمل کرنے کے لیے، ہمیں سمجھنا ضروری ہے:</p>
            <ul className="mt-4 space-y-2 text-lg">
              <li>• URL سے parameter لینا</li>
              <li>• Parameter کے مطابق data fetch کرنا</li>
              <li>• اگر data نہ ملے تو Not Found Page دکھانا</li>
            </ul>
          </div>
        </section>

        {/* 🧠 1️⃣ URL سے parameter لینا */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400">🧠 1️⃣ URL سے parameter لینا (useParams یا context)</h2>
          <p className="text-lg mb-4 italic">تصور: Dynamic route: <code className="bg-slate-800 text-white p-1 rounded text-sm font-mono" dir="ltr">app/blog/[id]/page.js</code></p>
          <p className="text-lg mb-6">اگر URL ہے: <code className="text-emerald-500 font-mono">/blog/25</code> تو <code className="text-orange-500 font-mono">[id] → 25</code></p>
          
          <h3 className="text-xl font-bold mb-4 text-sky-400 underline">🔹 Server Component میں</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`// app/blog/[id]/page.js
export default function BlogPost({ params }) {
  const { id } = params;

  return <h1>Blog Post ID: {id}</h1>;
}`}
          </pre>
          <div className="p-4 bg-slate-800/40 rounded-xl mb-8">
            <h4 className="font-bold text-blue-700 mb-2 underline italic">اردو وضاحت:</h4>
            <p className="text-sm">params object میں تمام URL parameters آتے ہیں۔ [id] → params.id۔ یہ server side پر automatic آتا ہے۔</p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400 italic">🔹 Client Component میں (optional)</h3>
          <p className="mb-4 text-sm opacity-80">اگر آپ چاہتے ہیں client-side fetch:</p>
          <pre className="bg-black text-purple-300 p-4 rounded-xl text-[12px] text-left whitespace-pre-wrap border border-slate-800 mb-4" dir="ltr">
{`"use client";
import { useRouter } from "next/navigation";

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Blog ID: {id}</h1>;
}`}
          </pre>
          <p className="text-red-500 font-black italic">❌ لیکن App Router (Next.js 13+) میں server approach بہتر ہے۔</p>
        </section>

        

        {/* 🧠 2️⃣ Data Fetching based on Dynamic Parameter */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400 italic">🧠 2️⃣ Data Fetching based on Dynamic Parameter</h2>
          <h3 className="text-lg font-bold mb-3 italic">مثال: فرض کریں data array:</h3>
          <pre className="bg-black text-emerald-300 p-4 rounded-xl text-[12px] text-left border border-slate-800 mb-6" dir="ltr">
{`const blogs = [
  { id: "1", title: "Next.js Tutorial" },
  { id: "2", title: "React Basics" },
];`}
          </pre>

          <h3 className="text-lg font-bold mb-3">Page Component:</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export default function BlogPost({ params }) {
  const { id } = params;

  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <p>یہ blog ID: {id} کے لیے ہے</p>
    </div>
  );
}`}
          </pre>
        </section>

        {/* 🧩 3️⃣ Not Found Page */}
        <section className="mb-16 p-8 bg-red-600/5 border border-red-500/20 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 italic">🧩 3️⃣ Not Found Page</h2>
          <p className="text-lg mb-6">اگر user نے غلط URL دیا (مثلاً <code className="text-red-400">/blog/99</code>) اور ڈیٹا موجود نہیں، تو Next.js میں proper solution یہ ہے:</p>
          
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`import { notFound } from "next/navigation";

export default function BlogPost({ params }) {
  const blog = blogs.find((b) => b.id === params.id);

  if (!blog) {
    notFound(); // یہ خود 404 page دکھاتا ہے
  }

  return (
    <div>
      <h1>{blog.title}</h1>
    </div>
  );
}`}
          </pre>
          <div className="bg-red-500/10 p-4 rounded-lg">
            <h4 className="font-bold text-red-500 mb-2 italic underline underline-offset-4">اردو وضاحت:</h4>
            <ul className="text-sm space-y-1 font-bold">
              <li>• notFound() → built-in Next.js function</li>
              <li>• User کو automatic 404 page دکھاتا ہے</li>
              <li>• SEO friendly بھی ہے</li>
            </ul>
          </div>
        </section>

        

        {/* 🧠 4️⃣ Dynamic Metadata */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400">🧠 4️⃣ Dynamic Metadata</h2>
          <p className="text-lg mb-6 italic">ہر blog کے لیے title اور description مختلف رکھنا SEO کے لیے بہترین ہے:</p>
          <pre className="bg-black text-sky-300 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.id === params.id);

  if (!blog) {
    return { title: "Blog Not Found" };
  }

  return {
    title: blog.title,
    description: \`یہ \${blog.title} کے بارے میں ہے\`
  };
}`}
          </pre>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="p-3 bg-blue-500/10 rounded-lg text-sm italic">✅ یہ SEO کو enhance کرتا ہے</p>
            <p className="p-3 bg-emerald-500/10 rounded-lg text-sm italic">✅ Social media previews بہتر بنتے ہیں</p>
          </div>
        </section>

        {/* 🧭 5️⃣ Recap: Step by Step */}
        <section className="mb-16 p-8 bg-orange-500/5 border-2 border-orange-500/20 rounded-3xl shadow-xl">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-orange-500 italic">🧭 5️⃣ Recap: Step by Step</h2>
          <ul className="space-y-4 text-lg font-bold">
            <li className="flex items-center gap-2">📂 <strong>[id] folder</strong> → dynamic route</li>
            <li className="flex items-center gap-2">🔑 <strong>params.id</strong> → URL سے value لینا</li>
            <li className="flex items-center gap-2">📡 <strong>Data fetch</strong> → Array / Database</li>
            <li className="flex items-center gap-2">⚠️ <strong>اگر data نہ ملے</strong> → notFound()</li>
            <li className="flex items-center gap-2">🔍 <strong>Metadata set</strong> → SEO-friendly</li>
          </ul>
        </section>

        {/* عام غلطیاں */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 italic">⚠️ عام غلطیاں</h2>
          <ul className="space-y-4 text-xl list-none pr-4 border-r-4 border-red-500 opacity-90 font-bold">
            <li>❌ [id] folder نہ بنانا (بریکٹ لگانا ضروری ہے)</li>
            <li>❌ params کو destructure نہ کرنا</li>
            <li>❌ Client-side fetch جب server fetch بہتر ہو</li>
            <li>❌ NotFound handle نہ کرنا (جس سے سفید خالی صفحہ دکھ سکتا ہے)</li>
          </ul>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-8 border-4 border-dashed border-orange-500/40 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500">🎯 Practice Task</h2>
          <ul className="space-y-3 text-lg">
            <li>1️⃣ <code className="bg-slate-800 text-white p-1 rounded" dir="ltr">/blog/[id]/page.js</code> بنائیں</li>
            <li>2️⃣ 5 blog posts array create کریں</li>
            <li>3️⃣ Valid ID → blog show ہو</li>
            <li>4️⃣ Invalid ID → 404 page دکھائے</li>
            <li>5️⃣ ہر blog کے لیے <strong>dynamic metadata</strong> set کریں</li>
          </ul>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-[#dc2626] shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-orange-50'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#dc2626] italic">📌 خلاصہ (Theory Recap)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <p>• <strong>Dynamic route</strong> = [param]</p>
            <p>• <strong>params</strong> سے data لیں</p>
            <p>• <strong>notFound()</strong> → 404 page</p>
            <p>• <strong>Dynamic metadata</strong> → SEO-friendly</p>
          </div>
          <p className="mt-6 text-center font-black italic text-orange-600">Real-world websites اسی طریقے سے چلتی ہیں!</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 8 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}