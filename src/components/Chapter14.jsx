import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter14() {
  const [theme, setTheme] = useState(() => localStorage.getItem("user-theme") || "light");
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
      <div className="flex justify-start mb-1">
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

  return (
    <div dir="rtl" className={`min-h-screen transition-all duration-500 font-sans ${theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-white text-slate-900"}`}>
      
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-green-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-green-400 text-sm">
          {copySuccess}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button onClick={toggleSidebar} className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current">
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button onClick={toggleTheme} className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* Header Section */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-l from-sky-400 to-indigo-400 pb-2">
            📦 Chapter 14: Next.js Deployment
          </h1>
          <p className="text-xl font-bold text-blue-500 mb-4">(Vercel & Environment Variables)</p>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            ابھی تک ہم نے اپنے Next.js ایپ کو صرف لوکل میشین پر چلایا ہے۔ اب ہم سیکھیں گے کہ اسے انٹرنیٹ پر ڈپلائی کرنے کے لیے کیا کرنا ہے۔
          </p>
        </section>

        {/* What we will learn */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-sky-400 underline decoration-sky-800">ہم سیکھیں گے:</h2>
          <ul className="space-y-4 text-lg pr-6">
            <li className="flex items-center gap-3">🔹 Deployment کیا ہوتی ہے؟</li>
            <li className="flex items-center gap-3">🔹 Next.js کو Vercel پر کیسے deploy کرتے ہیں</li>
            <li className="flex items-center gap-3">🔹 Environment Variables کیا ہوتے ہیں اور کیوں ضروری ہیں</li>
            <li className="flex items-center gap-3">🔹 .env فائل کیسے بناتے ہیں</li>
            <li className="flex items-center gap-3">🔹 Common mistakes اور ان کا حل</li>
          </ul>
        </section>

        {/* 1. What is Deployment */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400">🔹 Deployment کیا ہوتی ہے؟</h2>
          <p className="text-xl mb-4 italic">"اپنی ویب سائٹ یا ایپ کو اپنے کمپیوٹر سے نکال کر انٹرنیٹ پر live کرنا"</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">لوکل ہوسٹ ❌ (localhost:3000)</div>
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">پوری دنیا کے لیے قابلِ رسائی ✅ (example.vercel.app)</div>
          </div>
          <p className="font-bold mb-2">جب تک آپ deploy نہیں کریں گے:</p>
          <ul className="list-disc pr-8 mb-6">
            <li>صرف آپ ہی اپنی website دیکھ سکتے ہیں</li>
            <li>دوسرے لوگ نہیں ❌</li>
          </ul>
        </section>

        {/* 2. Why Vercel */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400">🔹 Next.js کے لیے Vercel کیوں؟</h2>
          <p className="text-lg mb-6">Vercel وہ کمپنی ہے جس نے Next.js بنایا ہے۔ اسی لیے:</p>
          <div className="text-center p-6 bg-beige-300 rounded-3xl mb-8 border border-slate-700 shadow-xl">
            <h3 className="text-2xl md:text-4xl font-black">Next.js + Vercel = ❤️ Perfect Match</h3>
          </div>
          <h4 className="font-bold mb-4">Vercel کے فائدے:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">✔️ Free ہے (start کے لیے)</div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">✔️ GitHub سے direct connect</div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">✔️ Automatic deploy</div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">✔️ Fast servers</div>
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">✔️ SSL (https) خود بخود</div>
          </div>
        </section>

        {/* Step 1: GitHub */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-sky-400">🔹 Step 1: GitHub پر Code Upload کریں</h2>
          <p className="mb-4">❓ کیوں ضروری ہے؟ Vercel آپ کا code GitHub سے اٹھا کر deploy کرتا ہے۔</p>
          <h4 className="font-bold mb-2">✔️ Steps:</h4>
          <ul className="list-disc pr-8 mb-6 space-y-1">
            <li>GitHub پر جائیں</li>
            <li>New Repository بنائیں</li>
            <li>Repo کا نام لکھیں (مثلاً: nextjs-blog)</li>
            <li>Public رکھیں</li>
            <li>Create Repository پر click کریں</li>
          </ul>
          <p className="font-bold mb-2">🧠 اب Terminal میں:</p>
          <CodeBlock code={`git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/username/repo-name.git
git push -u origin main`} colorClass="text-sky-300" />
        </section>

        {/* Step 2 & 3: Vercel Setup */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">🔹 Step 2 & 3: Vercel Account اور Project Import</h2>
          <div className="space-y-6">
            <div className="p-6 bg-slate-200/40 rounded-2xl">
              <h4 className="font-bold mb-2">اکاؤنٹ بنائیں:</h4>
              <p>https://vercel.com پر جائیں، GitHub کے ساتھ login کریں (recommended)۔</p>
            </div>
            <div className="p-6 bg-slate-200/40 rounded-2xl">
              <h4 className="font-bold mb-2">پروجیکٹ امپورٹ کریں:</h4>
              <ul className="list-decimal pr-8 space-y-2">
                <li>Vercel Dashboard کھولیں</li>
                <li>Add New → Project</li>
                <li>GitHub Repository select کریں</li>
                <li>Import پر click کریں</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Step 4: Deploy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-green-500">🔹 Step 4: Deploy Button دبائیں</h2>
          <p className="mb-4">بس! Deploy پر click کریں اور 1–2 منٹ انتظار کریں ⏳</p>
          <div className="p-6 bg-green-500/10 border-r-4 border-green-500 rounded-xl">
             🎉 مبارک ہو! آپ کی Next.js website live ہو گئی
          </div>
        </section>

        {/* Env Variables */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-orange-400">🔹 Environment Variables کیا ہوتے ہیں؟</h2>
          <p className="mb-6">Environment Variables وہ secret values ہوتی ہیں جو ہم code میں direct نہیں لکھتے۔</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-red-500 font-bold mb-2">❌ غلط طریقہ:</p>
              <CodeBlock code={`const apiKey = "123456SECRET";`} colorClass="text-red-300" />
            </div>
            <div>
              <p className="text-green-500 font-bold mb-2">✅ صحیح طریقہ:</p>
              <CodeBlock code={`const apiKey = process.env.API_KEY;`} colorClass="text-green-300" />
            </div>
          </div>
          <p className="mt-4 font-bold">❓ کیوں؟ سیکیورٹی کے لیے اور GitHub پر leak سے بچنے کے لیے۔</p>
        </section>

        {/* .env File Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4 text-emerald-400">🔹 .env.local فائل کیا ہے؟</h2>
          <p className="mb-4">یہ فائل Secrets store کرتی ہے اور GitHub پر upload نہیں ہوتی۔</p>
          <CodeBlock code={`# Example:
NEXT_PUBLIC_API_URL=https://api.example.com
API_SECRET=mysupersecret`} />
          <p className="p-3 bg-blue-500/10 rounded-lg text-sm italic">📌 NEXT_PUBLIC_: Browser میں use ہونے والی values کے لیے ضروری۔</p>
        </section>

        {/* Vercel Env Settings */}
        <section className="mb-16 p-8 bg-indigo-500/5 rounded-3xl border border-indigo-500/20 shadow-inner">
          <h2 className="text-2xl font-bold mb-6 text-indigo-400 text-center">⚙️ Vercel پر Environment Variables کیسے add کریں؟</h2>
          <ol className="list-decimal pr-8 space-y-4 text-lg">
            <li>Vercel Dashboard → Project کھولیں</li>
            <li>Settings پر جائیں</li>
            <li>Environment Variables کا بٹن تلاش کریں</li>
            <li>Key اور Value add کریں (مثلاً Key: NEXT_PUBLIC_API_URL)</li>
            <li>Save کریں اور Project دوبارہ deploy کریں 🔁</li>
          </ol>
        </section>

        {/* Mistakes & Checklist */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <section className="p-6 bg-red-500/5 border border-red-500/20 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-red-500">🔹 Common Mistakes ❌</h2>
            <ul className="space-y-4">
              <li>❌ env file GitHub پر push کرنا (حل: .gitignore استعمال کریں)</li>
              <li>❌ NEXT_PUBLIC نہ لگانا (حل: Client side پر لازمی لگائیں)</li>
              <li>❌ Deploy کے بعد env بدلنا مگر ری ڈپلائے نہ کرنا</li>
            </ul>
          </section>

          <section className="p-6 bg-green-500/5 border border-green-500/20 rounded-3xl shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-green-500">🔹 Final Checklist ✅</h2>
            <ul className="space-y-4">
              <li>✅ GitHub repo ready</li>
              <li>✅ Vercel account setup</li>
              <li>✅ Project imported</li>
              <li>✅ Env variables set</li>
              <li>✅ Website live 🎉</li>
            </ul>
          </section>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 14 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>}

      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
}