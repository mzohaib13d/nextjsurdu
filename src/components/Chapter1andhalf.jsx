import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter1andhalf() {
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
      {/* ہیڈر */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button onClick={toggleSidebar} className="p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current">
          <div className="space-y-1.5">
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        <button onClick={toggleTheme} className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-transform active:scale-90">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 to-indigo-500 pb-2">
            📘 سبق 1.5: Next.js پروجیکٹ بنانے کا شارٹ کمانڈ
          </h1>
          <p className="text-xl font-bold text-indigo-500 mb-6 italic" dir="ltr">
  npx create-next-app@latest zohaib-blog --typescript --tailwind --eslint --app --import-alias '@/*' 
</p>
<div className="bg-yellow-500/20 p-3 rounded-lg mb-6">
  <p className="font-bold">⚠️ نوٹ: '@/*' --import-alias flag کی value ہے، app کا نام نہیں!</p>
  <p className="text-sm">یہ import shortcut بناتا ہے، نہ کہ کوئی folder. اگر ایرر دے تو مت لکھیں۔</p>
</div>
          <div className="p-6 bg-purple-500/10 border-r-4 border-purple-500 rounded-lg shadow-inner">
            <p className="text-lg font-bold italic">یہ سبق Next.js کی بنیاد ہے۔ اگر یہ کمانڈ سمجھ آ گئی تو Next.js کا آدھا سفر طے ہو جاتا ہے۔</p>
          </div>
        </section>

        {/* 🧠 npx */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">🧠 npx</h2>
          <p className="text-lg mb-4 italic text-slate-400">یہ Node.js کا ایک ٹول ہے۔</p>
          <p className="text-xl font-bold bg-slate-800/20 p-4 rounded-xl mb-6">
            اس کا کام:
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">• package کو عارضی طور پر چلانا</span>
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">• globally install کیے بغیر command execute کرنا</span>
          </div>
          <p className="mt-6 p-4 bg-slate-800/40 rounded-lg text-sm italic">
            <strong>📌 یعنی:</strong> “پہلے package ڈھونڈو، پھر اسے چلا دو۔”
          </p>
        </section>

        {/* create-next-app */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500">create-next-app</h2>
          <p className="text-lg mb-6">یہ Next.js کا official starter tool ہے۔</p>
          <p className="text-lg font-bold mb-4 underline decoration-indigo-500 underline-offset-4">اس کا کام:</p>
          
          <div className="p-6 bg-purple-500/5 rounded-2xl border-r-4 border-purple-500 mb-8">
            <ul className="space-y-3 opacity-90">
              <li>• نئی Next.js application بنانا</li>
              <li>• folder structure تیار کرنا</li>
              <li>• ضروری dependencies install کرنا</li>
            </ul>
          </div>
        </section>

        {/* @latest */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400 italic">@latest</h2>
          <p className="text-lg mb-6">اس کا مطلب:</p>
          <div className="p-4 bg-black text-yellow-400 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20">
            package کا سب سے نیا version استعمال کرو۔
          </div>
          <div className="p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
            <h4 className="text-xl font-black mb-4 text-emerald-500 italic">مثال:</h4>
            <p className="text-lg font-mono">create-next-app@latest</p>
            <div className="grid grid-cols-1 gap-4 text-sm font-bold mt-4">
              <div className="p-2 bg-slate-800/50 rounded">• پرانا version نہیں</div>
              <div className="p-2 bg-slate-800/50 rounded">• latest stable version install ہوگا</div>
            </div>
          </div>
        </section>

        {/* my-app */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400 underline underline-offset-8">my-app</h2>
          <p className="text-lg mb-6">یہ آپ کے project کا نام ہے۔</p>
          
          <pre className="bg-black text-sky-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
{`مثال:
zohaib-blog

تو ایک folder بنے گا:
zohaib-blog/`}
          </pre>
          <p className="text-lg">آپ کوئی بھی نام رکھ سکتے ہیں:</p>
          <div className="flex flex-wrap gap-2 mt-4 font-mono text-sm">
            <span className="bg-slate-800 p-2 rounded text-blue-400">blog-app</span>
            <span className="bg-slate-800 p-2 rounded text-blue-400">portfolio</span>
            <span className="bg-slate-800 p-2 rounded text-blue-400">reacturdu</span>
          </div>
        </section>

        {/* --typescript */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-emerald-400">--typescript</h2>
          <div className="p-6 bg-red-500/5 rounded-2xl border-r-4 border-red-500 mb-8">
            <h3 className="text-xl font-bold mb-4 text-red-500">❓ یہ flag TypeScript enable کرتا ہے۔</h3>
            <p>اس کے بعد:</p>
          </div>

          <div className="p-4 bg-black text-yellow-400 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20">
            • .tsx • .ts فائلیں بنیں گی۔
          </div>
          
          <div className="mt-8 p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
            <h4 className="text-xl font-black mb-4 text-emerald-500 italic">اور project میں:</h4>
            <div className="grid grid-cols-1 gap-4 text-sm font-bold">
              <div className="p-2 bg-slate-800/50 rounded">• type safety</div>
              <div className="p-2 bg-slate-800/50 rounded">• بہتر autocomplete</div>
              <div className="p-2 bg-slate-800/50 rounded">• errors جلدی پکڑنا</div>
            </div>
            <p className="mt-4 text-center font-black italic">📌 ممکن ہوگا۔</p>
          </div>
        </section>

        {/* --tailwind */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400">--tailwind</h2>
          <p className="text-lg mb-4 italic">یہ Tailwind CSS install کرتا ہے۔</p>
          <p className="text-xl font-bold bg-slate-800/20 p-4 rounded-xl mb-6">
            یعنی command خود:
          </p>
          <pre className="bg-black text-white p-3 rounded text-center mb-6 text-xs" dir="ltr">
            • Tailwind setup • configuration • CSS integration
          </pre>
          <div className="p-6 bg-slate-800/50 rounded-full text-center text-sm font-black border border-indigo-500/30">
            سب کچھ کر دیتی ہے۔ آپ کو manually install نہیں کرنا پڑتا۔
          </div>
          <p className="mt-6 text-emerald-500 font-bold italic">یہ Tailwind CSS کو project کے ساتھ جوڑ دیتا ہے۔</p>
        </section>

        {/* --eslint */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400 italic">--eslint</h2>
          <p className="text-lg mb-6">یہ ESLint install کرتا ہے۔</p>
          <p className="text-lg font-bold mb-4 underline decoration-indigo-500 underline-offset-4">ESLint کا کام:</p>
          
          <div className="p-6 bg-purple-500/5 rounded-2xl border-r-4 border-purple-500">
            <ul className="space-y-2 font-mono text-sm">
              <li>• code mistakes پکڑنا</li>
              <li>• formatting بہتر بنانا</li>
              <li>• bad practices detect کرنا</li>
            </ul>
            <p className="mt-4 text-emerald-500 font-bold italic">مثال: • unused variables • غلط syntax • potential bugs</p>
          </div>
        </section>

        {/* --app */}
        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-sky-400 underline underline-offset-8">--app</h2>
          <p className="text-lg mb-6 text-center">یہ App Router enable کرتا ہے۔</p>
          <p className="text-lg font-bold mb-4 text-center">یعنی project میں:</p>
          <div className="p-4 bg-black text-yellow-400 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20">
            app/ folder استعمال ہوگا۔
          </div>
          <p className="text-center">یہ جدید Next.js structure ہے۔</p>
          <div className="grid grid-cols-1 gap-4 text-sm font-bold mt-6">
            <div className="p-2 bg-slate-800/50 rounded text-center">اس میں: • layouts • server components • nested routing بہتر طریقے سے کام کرتے ہیں۔</div>
          </div>
        </section>

        {/* --import-alias '@/' */}
        <section className="mb-16 p-8 bg-red-600/10 border-2 border-red-500/20 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-red-500">⚠️ --import-alias '@/' سمجھیں</h2>
          <p className="text-lg font-bold">یہ components نہیں بناتا۔</p>
          <p className="text-lg italic mt-2">یہ صرف import کا shortcut بناتا ہے۔</p>
        </section>

        {/* پہلے بغیر alias کے */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500 italic">پہلے بغیر alias کے</h2>
          <p className="text-lg italic">فرض کریں file یہاں ہے:</p>
          <pre className="bg-black text-sky-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            app/page.tsx
          </pre>
          <p className="text-lg italic mt-4">اور component یہاں:</p>
          <pre className="bg-black text-sky-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            components/Button.tsx
          </pre>
          <p className="text-lg italic mt-4">تو import شاید ایسا لکھنا پڑے:</p>
          <pre className="bg-black text-green-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            import Button from "../components/Button";
          </pre>
          <p className="text-lg italic mt-4">اگر file اندر ہو:</p>
          <pre className="bg-black text-green-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            app/dashboard/settings/page.tsx
          </pre>
          <p className="text-lg italic mt-4">تو:</p>
          <pre className="bg-black text-green-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            import Button from "../../../components/Button";
          </pre>
          <p className="mt-6 p-4 bg-slate-800/40 rounded-lg text-sm italic">
            <strong>📌 یہ ugly اور confusing ہو جاتا ہے۔</strong>
          </p>
        </section>

        {/* Alias استعمال کرنے کے بعد */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400">Alias استعمال کرنے کے بعد</h2>
          <p className="text-lg mb-6">آپ simply لکھ سکتے ہیں:</p>
          <pre className="bg-black text-yellow-400 p-4 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20" dir="ltr">
            import Button from "@/components/Button";
          </pre>
          <p className="text-lg">یہاں:</p>
          <div className="p-4 bg-black text-sky-300 rounded-xl text-left border border-slate-800 mb-6" dir="ltr">
            @ کا مطلب ہے: project کی root directory
          </div>
        </section>

        {/* یہ internally کیسے کام کرتا ہے؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400 italic">📂 یہ internally کیسے کام کرتا ہے؟</h2>
          <p className="text-lg mb-6">یہ command:</p>
          <div className="p-4 bg-black text-yellow-400 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20">
            --import-alias '@/'
          </div>
          <p className="text-lg mb-6">automatically configuration بنا دیتی ہے۔</p>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
{`tsconfig.json میں:
{
  "paths": {
    '@/': ["./*"]
  }
}`}
          </pre>
        </section>

        {/* اس کا مطلب */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">اس کا مطلب</h2>
          <pre className="bg-black text-emerald-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
            @/components/Button
اصل میں بن جاتا ہے:
./components/Button
          </pre>
        </section>

        {/* Important بات */}
        <section className="mb-16 p-8 bg-red-600/10 border-2 border-red-500/20 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-red-500">⚠️ Important بات</h2>
          <ul className="space-y-3 text-lg font-bold">
            <li>❌ component generate نہیں کرتا</li>
            <li>❌ folder create نہیں کرتا</li>
            <li className="text-emerald-500">✔ صرف import آسان بناتا ہے</li>
          </ul>
        </section>

        {/* Example */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500 italic">Example</h2>
          <h3 className="text-xl font-bold mb-4 text-indigo-500">Component بنائیں</h3>
          <pre className="bg-black text-sky-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
{`// components/Button.tsx

export default function Button() {
  return <button>Click Me</button>;
}`}
          </pre>
          
          <h3 className="text-xl font-bold mb-4 text-indigo-500 mt-8">Use کریں</h3>
          <pre className="bg-black text-sky-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
{`// app/page.tsx

import Button from "@/components/Button";

export default function Home() {
  return (
    <div>
      <Button />
    </div>
  );
}`}
          </pre>
        </section>

        {/* اگر alias نہ ہو تو */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-400">اگر alias نہ ہو تو</h2>
          <pre className="bg-black text-green-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
            import Button from "../components/Button";
یا:
import Button from "../../../components/Button";
لکھنا پڑتا۔
          </pre>
        </section>

        {/* مختصر یاد رکھنے والی بات */}
        <section className="mb-16 p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 italic">📌 مختصر یاد رکھنے والی بات</h2>
          <div className="grid grid-cols-1 gap-4 text-lg">
            <p><strong>--src-dir</strong> 👉 src/ folder بناتا ہے</p>
            <p><strong>--import-alias '@/'</strong> 👉 imports کو clean بناتا ہے</p>
            <p className="text-emerald-500">👉 components create نہیں کرتا</p>
            <p className="text-emerald-500">👉 صرف shortcut path دیتا ہے</p>
          </div>
        </section>

        {/* مکمل نتیجہ */}
        <section className="mb-16 p-8 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-3xl border-t-8 border-indigo-600 shadow-2xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 italic">📌 مکمل نتیجہ</h2>
          <p className="text-lg mb-4">یہ ایک ہی command:</p>
          <ul className="space-y-3 text-lg">
            <li>✅ Next.js install کرتی ہے</li>
            <li>✅ TypeScript setup کرتی ہے</li>
            <li>✅ Tailwind 4 support دیتی ہے</li>
            <li>✅ ESLint add کرتی ہے</li>
            <li>✅ App Router enable کرتی ہے</li>
            <li className="text-emerald-500 font-bold">✅ import alias configure کرتی ہے</li>
          </ul>
          <p className="mt-6 text-center font-black italic text-emerald-500">سب کچھ automatically۔</p>
        </section>

        {/* Project Run کرنے کی Commands */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400">Project Run کرنے کی Commands</h2>
          
          <h3 className="text-xl font-bold mb-4 text-purple-400">Folder میں جانا</h3>
          <pre className="bg-black text-green-400 p-3 rounded text-center mb-6 text-sm" dir="ltr">
            cd zohaib-blog
          </pre>
          <p className="text-lg mb-6 italic">cd کا مطلب: change directory</p>

          <h3 className="text-xl font-bold mb-4 text-purple-400">Development Server چلانا</h3>
          <pre className="bg-black text-green-400 p-3 rounded text-center mb-6 text-sm" dir="ltr">
            npm run dev
          </pre>
          <p className="text-lg mb-6 italic">اس کا مطلب:</p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">• local server start کرو</span>
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">• development mode میں app چلاؤ</span>
          </div>

          <h3 className="text-xl font-bold mb-4 text-purple-400 mt-8">Browser میں کھولنا</h3>
          <pre className="bg-black text-yellow-400 p-3 rounded text-center mb-6 text-sm" dir="ltr">
            http://localhost:3000
          </pre>
          <p className="text-lg italic">یہاں آپ کی Next.js app نظر آئے گی۔</p>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 1.5 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}