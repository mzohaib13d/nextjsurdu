import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";

export default function Chapter6() {
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
      className={`min-h-screen transition-all duration-500 font-sans overflow-x-hidden ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"
      }`}
    >
      {/* ہیڈر */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button
          onClick={toggleSidebar}
          className="p-2 md:p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>

        <button
          onClick={toggleTheme}
          className="px-3 md:px-4 cursor-pointer py-1.5 md:py-2 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition-transform active:scale-95 text-xs md:text-sm"
        >
          {theme === "light" ? "🌙 ڈارک" : "☀️ برائٹ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 sm:px-12 pt-24 md:pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-2xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-l from-blue-600 to-indigo-400 pb-2 leading-tight">
            📘 سبق 6: Styling in Next.js
          </h1>
          <p className="text-lg md:text-xl font-bold text-indigo-500 mb-6 italic">
            (Tailwind CSS، globals.css، CSS Modules)
          </p>
          <div className="p-4 md:p-6 bg-blue-500/10 border-r-4 border-blue-500 rounded-lg">
            <p className="text-base md:text-lg">Next.js میں styling کے تین بڑے طریقے ہیں، جنہیں ہم اردو مثالوں کے ساتھ سیکھیں گے۔</p>
          </div>
        </section>

        {/* 1. Tailwind CSS */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400">1️⃣ Tailwind CSS (سب سے زیادہ استعمال)</h2>
          <p className="text-base mb-4 italic text-slate-400">اگر آپ نے انسٹالیشن کے وقت Tailwind = Yes کیا تھا تو یہ پہلے سے موجود ہے۔ ✅</p>
          
          <h3 className="text-lg font-bold mb-3 italic">🧾 Example: Tailwind کے ساتھ Page</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] md:text-[13px] text-left overflow-x-auto whitespace-pre border border-slate-800" dir="ltr">
{`export default function Home() {
  return (
    <div className="p-6 bg-gray-100 text-right">
      <h1 className="text-2xl font-bold text-blue-600">
        Next.js اردو ٹیوٹوریل
      </h1>
      <p className="mt-4 text-gray-700">
        Tailwind CSS کے ساتھ آسان Styling
      </p>
    </div>
  );
}`}
          </pre>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-xs md:text-sm"><strong>p-6:</strong> padding</div>
            <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-xs md:text-sm"><strong>bg-gray-100:</strong> پس منظر</div>
            <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-xs md:text-sm"><strong>text-right:</strong> RTL سیدھ</div>
            <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-xs md:text-sm"><strong>text-2xl:</strong> فونٹ سائز</div>
            <div className="p-3 bg-slate-800/40 rounded border border-slate-700 text-xs md:text-sm"><strong>mt-4:</strong> اوپر سے فاصلہ</div>
          </div>
        </section>

        {/* RTL Styling */}
        <section className="mb-16 p-4 md:p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-indigo-400">📐 RTL (Right to Left) Styling</h2>
          <p className="mb-4 font-bold italic text-sm md:text-base">layout.js میں لازمی سیٹ کریں:</p>
          <code className="block bg-black text-emerald-400 p-2 rounded text-center mb-6 text-xs md:text-base" dir="ltr">
            {`<html lang="ur" dir="rtl">`}
          </code>
          <p className="mb-2 text-sm md:text-base">Tailwind میں دائیں طرف سے لکھنے کے لیے:</p>
          <pre className="bg-black text-white p-3 rounded text-xs md:text-sm text-left overflow-x-auto" dir="ltr">
            {`<div className="text-right">یہ اردو متن ہے</div>`}
          </pre>
        </section>

        {/* 2. Global CSS */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400">2️⃣ Global CSS (globals.css)</h2>
          <p className="mb-4 italic text-sm md:text-base text-slate-400">📁 فائل: app/globals.css</p>
          <pre className="bg-black text-emerald-300 p-4 rounded-xl text-[11px] md:text-[13px] text-left overflow-x-auto border border-slate-800 mb-6" dir="ltr">
{`body {
  font-family: "Noto Nastaliq Urdu", serif;
  background-color: #f9fafb;
}

h1 {
  color: #1d4ed8;
}`}
          </pre>
          <p className="p-4 bg-emerald-500/10 text-emerald-500 rounded-lg font-bold text-center text-sm md:text-base">
            📌 یہ CSS پوری ویب سائٹ (ہر page) پر لاگو ہوگی۔
          </p>
        </section>

        {/* 3. CSS Modules */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-purple-400 italic">3️⃣ CSS Modules (Specific Styling)</h2>
          <p className="text-base md:text-lg mb-6">CSS Module صرف اسی ایک component پر اثر کرتا ہے جہاں اسے امپورٹ کیا جائے۔</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-bold mb-2 italic text-xs md:text-sm">📁 app/about/about.module.css</p>
              <pre className="bg-black text-purple-300 p-4 rounded-xl text-[11px] text-left border border-slate-800" dir="ltr">
{`.title {
  color: green;
  font-size: 28px;
}`}
              </pre>
            </div>
            <div>
              <p className="font-bold mb-2 italic text-xs md:text-sm">🧾 Component Code:</p>
              <pre className="bg-black text-white p-4 rounded-xl text-[11px] text-left border border-slate-800" dir="ltr">
{`import styles from "./about.module.css";

export default function About() {
  return (
    <h1 className={styles.title}>
      ہمارے بارے میں
    </h1>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400 text-center">🎯 Tailwind vs CSS Module</h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-center border-collapse border border-slate-700 min-w-[400px]">
              <thead>
                <tr className="bg-blue-600 text-white font-bold text-sm">
                  <th className="p-3 border border-slate-700">چیز</th>
                  <th className="p-3 border border-slate-700">Tailwind</th>
                  <th className="p-3 border border-slate-700">CSS Module</th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-sm">
                <tr className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-700 font-bold">رفتار</td>
                  <td className="p-3 border border-slate-700 text-emerald-500 font-bold">بہت تیز</td>
                  <td className="p-3 border border-slate-700">درمیانی</td>
                </tr>
                <tr className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}>
                  <td className="p-3 border border-slate-700 font-bold">RTL سیٹنگ</td>
                  <td className="p-3 border border-slate-700">آسان</td>
                  <td className="p-3 border border-slate-700">Manual</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* عام غلطیاں */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-red-500 italic">⚠️ عام غلطیاں</h2>
          <ul className="space-y-4 text-base md:text-xl list-none pr-4 border-r-4 border-red-500">
            <li>❌ <strong>Tailwind</strong> کنفیگ فائل میں پاتھ کا غلط ہونا۔</li>
            <li>❌ <strong>RTL</strong> سیٹ نہ کرنا (اردو ویب سائٹ الٹی لگے گی)۔</li>
            <li>❌ <strong>globals.css</strong> کا بے جا استعمال۔</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p className="text-xs md:text-sm">© 2025 Next.js اردو ٹیوٹوریل - باب 6 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}