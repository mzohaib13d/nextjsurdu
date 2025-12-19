import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter10() {
  // تھیم سیٹنگز
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
      className={`min-h-screen transition-all duration-500 font-sans overflow-x-hidden ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* ہیڈر (نیوبار) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        
        {/* بائیں طرف مینیو بٹن */}
        <button
          onClick={toggleSidebar}
          className="p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        {/* دائیں طرف تھیم ٹوگل بٹن */}
        <button
          onClick={toggleTheme}
          className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold transition-transform active:scale-90"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-violet-600 pb-2 leading-tight">
            📘 سبق 10: Error Handling، Loading اور UX Optimizations
          </h1>
          
          <div className="p-6 bg-indigo-500/10 border-r-4 border-indigo-500 rounded-lg mb-8 shadow-sm">
            <p className="text-xl font-bold italic underline decoration-indigo-500/30 underline-offset-8">Next.js میں Professional websites بنانے کے لیے ضروری ہے:</p>
            <ul className="mt-4 space-y-2 text-lg">
              <li>• Errors کو properly handle کرنا</li>
              <li>• Loading states دکھانا</li>
              <li>• User Experience (UX) بہتر بنانا</li>
              <li>• Performance اور SEO کے ساتھ integration</li>
            </ul>
          </div>
        </section>

        {/* 🧠 1️⃣ Error Handling */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-500 underline underline-offset-8">🧠 1️⃣ Error Handling (تھیوری)</h2>
          <p className="text-lg mb-4 italic font-bold">تصور:</p>
          <p className="mb-6">ہر ایکشن یا ڈیٹا فیچ میں ایرر آ سکتی ہے۔ اگر اسے ہینڈل نہ کریں تو یوزر ویب سائٹ چھوڑ سکتا ہے۔ Next.js میں <code className="text-indigo-400 italic">error.js</code> فائل آٹومیٹک ایرر پکڑتی ہے۔</p>
          
          <h3 className="text-xl font-bold mb-3 italic">Basic Error Component:</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left overflow-x-auto whitespace-pre border border-slate-800 mb-6 custom-scrollbar" dir="ltr">
{`// app/error.js
"use client";

export default function Error({ error, reset }) {
  return (
    <div className="p-4 text-red-700">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}`}
          </pre>
          <div className="p-4 bg-slate-800/40 rounded-xl mb-8 border-r-4 border-indigo-500">
            <h4 className="font-bold text-indigo-400 mb-2 italic">اردو وضاحت:</h4>
            <p className="text-sm"><strong>error</strong> → ایرر کی معلومات فراہم کرتا ہے۔<br/><strong>reset</strong> → یوزر کو دوبارہ کوشش (Retry) کرنے کا موقع دیتا ہے۔</p>
          </div>
        </section>

        

        {/* 🧩 2️⃣ Loading State */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-emerald-500">🧩 2️⃣ Loading State</h2>
          <p className="text-lg mb-4 italic">جب ڈیٹا فیچ ہو رہا ہو تو یوزر کو خالی اسکرین دکھانے کے بجائے لوڈنگ دکھانا بہتر UX ہے۔</p>
          <h3 className="font-bold mb-3 italic">📁 فائل: app/loading.js</h3>
          <pre className="bg-black text-emerald-400 p-4 rounded-xl text-[12px] text-left overflow-x-auto whitespace-pre border border-slate-800 mb-6 custom-scrollbar" dir="ltr">
{`// app/loading.js
export default function Loading() {
  return (
    <div className="text-center p-4">
      <p className="animate-pulse">Loading...</p>
    </div>
  );
}`}
          </pre>
        </section>

        {/* 🧠 3️⃣ try/catch for Server Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-sky-400 italic">🧠 3️⃣ try/catch for Server Actions</h2>
          <pre className="bg-black text-sky-300 p-4 rounded-xl text-[11px] sm:text-[13px] text-left overflow-x-auto whitespace-pre border border-slate-800 custom-scrollbar" dir="ltr">
{`"use server";

export async function addBlog(data) {
  try {
    await connectToDB();
    const newBlog = new Blog(data);
    await newBlog.save();
    return newBlog;
  } catch (err) {
    throw new Error("Blog save failed: " + err.message);
  }
}`}
          </pre>
          <p className="mt-4 p-3 bg-sky-500/10 rounded-lg text-sm italic font-bold">📌 Errors جب تھرو (throw) ہوں گی، تو Next.js خود بخود Error component دکھائے گا۔</p>
        </section>

        {/* 🧭 4️⃣ UX Improvements */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-orange-400">🧭 4️⃣ UX Improvements</h2>
          
          <div className="space-y-6">
            <div className="p-5 border border-slate-700/30 rounded-2xl">
              <h4 className="font-bold text-lg text-pink-500 mb-2">4.1 Toast Notifications</h4>
              <p className="text-sm mb-3">یوزر کو کامیابی یا ناکامی کا پیغام دکھانے کے لیے:</p>
              <code className="bg-black text-pink-400 p-2 rounded block text-xs mb-2 overflow-x-auto" dir="ltr">toast.success("Blog added successfully");</code>
            </div>

            <div className="p-5 border border-slate-700/30 rounded-2xl">
              <h4 className="font-bold text-lg text-emerald-500 mb-2">4.2 Skeleton Loading</h4>
              <p className="text-sm mb-3 italic underline">Tailwind کے ذریعے Placeholder بنانا:</p>
              <pre className="bg-black text-emerald-400 p-3 rounded text-[11px] text-left overflow-x-auto whitespace-pre custom-scrollbar" dir="ltr">
{`<div className="animate-pulse space-y-2">
  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
</div>`}
              </pre>
            </div>
          </div>
        </section>

        

        {/* ⚡ 5️⃣ Performance Optimizations */}
        <section className="mb-16 p-8 bg-violet-600/5 border border-violet-500/20 rounded-3xl">
          <h2 className="text-3xl font-black mb-6 text-violet-500">⚡ 5️⃣ Performance Optimizations</h2>
          <ul className="grid md:grid-cols-2 gap-4 text-lg">
            <li className="p-3 bg-beige dark:bg-slate-800 rounded-xl shadow-sm italic border border-slate-700/10">🚀 next/image → optimized images</li>
            <li className="p-3 bg-beige dark:bg-slate-800 rounded-xl shadow-sm italic border border-slate-700/10">💤 Lazy loading → components load when needed</li>
            <li className="p-3 bg-beige dark:bg-slate-800 rounded-xl shadow-sm italic border border-slate-700/10">📦 Proper Tailwind purge → small CSS size</li>
            <li className="p-3 bg-beige dark:bg-slate-800 rounded-xl shadow-sm italic border border-slate-700/10">💾 caching → speed up data fetch</li>
          </ul>
        </section>

        {/* 🧩 6️⃣ Error + Loading + Data Fetch Integration */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-indigo-400 italic">🧩 6️⃣ Combined UX Integration</h2>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] sm:text-[13px] text-left overflow-x-auto whitespace-pre border border-slate-800 custom-scrollbar" dir="ltr">
{`if (loading) return <SkeletonUI />;
if (error) return <p className="text-red-700">{error.message}</p>;

return (
  <ul>
    {blogs.map((b) => <li key={b._id}>{b.title}</li>)}
  </ul>
);`}
          </pre>
        </section>

        {/* ⚠️ Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-red-500 italic underline underline-offset-8">⚠️ Common Mistakes</h2>
          <ul className="space-y-4 text-xl list-none pr-4 border-r-4 border-red-500 opacity-90 font-bold">
            <li>❌ Loading state نہ دینا (یوزر سمجھتا ہے سائٹ ہینگ ہو گئی)</li>
            <li>❌ Error catch نہ کرنا</li>
            <li>❌ Client اور Server fetch کو مکس کرنا</li>
            <li>❌ RTL فیڈ بیک نہ دینا (اردو یوزرز کے لیے)</li>
          </ul>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-8 border-4 border-dashed border-indigo-500/40 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6 text-indigo-500">🎯 Practice Task</h2>
          <div className="space-y-3 text-lg font-bold">
            <p>1️⃣ Blog list page پر loading state لگائیں</p>
            <p>2️⃣ ایک غلط API کال کر کے ایرر ہینڈل کریں</p>
            <p>3️⃣ Toast notifications لائبریری انسٹال کریں</p>
            <p>4️⃣ Skeleton UI کارڈز ڈیزائن کریں</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-indigo-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}`}>
          <h2 className="text-3xl font-bold mb-6 text-indigo-600 italic">📌 خلاصہ (Final Thoughts)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg font-bold">
            <p>• <strong>Error Handling</strong> → user-friendly design</p>
            <p>• <strong>Loading States</strong> → بہتر UX</p>
            <p>• <strong>Toast + Skeleton</strong> → modern web feel</p>
            <p>• <strong>Optimizations</strong> → speed and SEO</p>
          </div>
          <p className="mt-6 text-center text-xl font-black italic text-indigo-600">مبارک ہو! آپ نے Next.js کے تمام بنیادی اور اہم ابواب مکمل کر لیے ہیں۔</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 10 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}