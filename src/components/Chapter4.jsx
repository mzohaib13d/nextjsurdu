import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter4() {
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
        <button onClick={toggleSidebar} className="p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current">
          <div className="space-y-1.5">
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        <button onClick={toggleTheme} className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold transition-transform active:scale-90">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-blue-500 to-emerald-500 pb-2">
            📘 سبق 4: Layout, Header, Footer اور Nested Layouts
          </h1>
          <div className="p-6 bg-blue-500/10 border-r-4 border-blue-500 rounded-lg mb-8">
            <p className="text-xl font-bold">Next.js میں layout کا مطلب ہے:</p>
            <p className="text-lg mt-2 italic">👉 ایک ایسا common ڈھانچہ جو ہر page پر خود بخود apply ہو جائے</p>
          </div>
        </section>

        {/* layout.js کیا ہے؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400 underline underline-offset-8 decoration-sky-500/30">🧱 layout.js کیا ہے؟</h2>
          <p className="text-lg mb-4">layout.js ہر page کو wrap کرتا ہے۔ Header، Footer، Sidebar جیسے حصے ایک بار لکھیں → ہر page پر نظر آئیں گے۔</p>
          <p className="font-bold text-indigo-400 mb-4 italic">📁 Root Layout کی جگہ: app/layout.js</p>
          
          <h3 className="text-lg font-bold mb-3">🧾 Basic Root Layout Code:</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] overflow-x-auto h-full text-left whitespace-pre-wrap break-words border border-slate-800" dir="ltr">
{`export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        <header>
          <h1>Next.js اردو</h1>
        </header>

        <main>
          {children}
        </main>

        <footer>
          <p>© 2025 NextjsUrdu</p>
        </footer>
      </body>
    </html>
  );
}`}
          </pre>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <strong className="text-emerald-500 underline">children</strong>
              <p className="text-sm mt-2">جو بھی page open ہوگا وہ یہاں آئے گا</p>
            </div>
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <strong className="text-blue-500 underline">header</strong>
              <p className="text-sm mt-2">ہر page پر common رہے گا</p>
            </div>
            <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
              <strong className="text-purple-500 underline">footer</strong>
              <p className="text-sm mt-2">ہر page کے آخر میں نظر آئے گا</p>
            </div>
          </div>
        </section>

        

        {/* Nested Layout */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-400">🧭 Nested Layout کیا ہوتا ہے؟</h2>
          <p className="text-lg mb-6">کسی خاص section کے لیے الگ layout بنانے کو Nested layout کہتے ہیں۔</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <p className="p-3 bg-slate-800/50 rounded border-r-4 border-emerald-500 italic">مثال: Blog pages کا layout مختلف</p>
            <p className="p-3 bg-slate-800/50 rounded border-r-4 border-sky-500 italic">مثال: Dashboard کا layout مختلف</p>
          </div>

          <h3 className="text-lg font-bold mb-3">📁 Folder Structure (Blog Layout):</h3>
          <pre className="bg-black text-yellow-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left mb-8 border border-slate-800" dir="ltr">
{`app/
 ├─ layout.js        → Root layout
 ├─ page.js          → Home
 └─ blog/
     ├─ layout.js    → Blog layout
     └─ page.js      → Blog home`}
          </pre>

          <h3 className="text-lg font-bold mb-3 italic">🧾 Blog Layout Code:</h3>
          <pre className="bg-black text-sky-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`export default function BlogLayout({ children }) {
  return (
    <section>
      <aside>
        <h3>Blog Menu</h3>
      </aside>

      <div>
        {children}
      </div>
    </section>
  );
}`}
          </pre>

          <h3 className="text-lg font-bold mb-3 italic text-pink-500">🧾 Blog Page:</h3>
          <pre className="bg-black text-pink-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left border border-slate-800" dir="ltr">
{`export default function BlogPage() {
  return <h2>یہ بلاگ پیج ہے</h2>;
}`}
          </pre>
        </section>

        {/* Layout Application */}
        <section className="mb-16 p-8 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border border-indigo-500/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400">🔁 Layout کیسے Apply ہوتا ہے؟</h2>
          <p className="text-lg mb-4 underline underline-offset-4 decoration-indigo-500">اگر آپ /blog کھولیں تو ترتیب یہ ہوگی:</p>
          <ol className="list-decimal pr-6 space-y-3 text-lg font-bold">
            <li>پہلے <span className="text-blue-500">root layout</span> لوڈ ہوگا</li>
            <li>پھر اس کے اندر <span className="text-emerald-500">blog layout</span> آئے گا</li>
            <li>آخر میں <span className="text-pink-500">blog/page.js</span> کا مواد شو ہوگا</li>
          </ol>
          <p className="mt-6 p-3 bg-indigo-500/10 text-center rounded-full font-bold">📌 Layouts nest ہو جاتے ہیں</p>
        </section>

        {/* Styling Layout */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-400">🎨 Styling Layout</h2>
          <p className="mb-4">آپ Tailwind CSS، globals.css یا CSS modules استعمال کر سکتے ہیں:</p>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800" dir="ltr">
{`<header className="bg-black text-white p-4">
  ہیڈر
</header>`}
          </pre>
        </section>

        {/* عام غلطیاں */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 italic">⚠️ عام غلطیاں (Important)</h2>
          <ul className="space-y-4 text-lg">
            <li className="flex items-center gap-2">❌ <code className="bg-red-500/10 px-2 rounded">{"{children}"}</code> لکھنا بھول جانا</li>
            <li className="flex items-center gap-2">❌ layout کو <strong className="text-red-500 italic">client</strong> بنانے کی کوشش کرنا</li>
            <li className="flex items-center gap-2">❌ layout میں <strong className="text-red-500">useState</strong> استعمال کرنا</li>
          </ul>
          <p className="mt-8 p-6 bg-red-600 text-white rounded-2xl text-center font-black text-xl shadow-lg">📌 Layout ہمیشہ Server Component ہونا چاہیے</p>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-8 border-4 border-dashed border-sky-500/40 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500">🎯 Practice Task</h2>
          <ul className="space-y-4 text-xl list-none">
            <li>1️⃣ <strong>Root layout</strong> میں header + footer بنائیں</li>
            <li>2️⃣ <strong>/dashboard</strong> کے لیے nested layout بنائیں</li>
            <li>3️⃣ <strong>Sidebar</strong> add کریں</li>
          </ul>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-emerald-50'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-600 italic">📌 خلاصہ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
            <p>• <strong>layout.js</strong> = common structure</p>
            <p>• <strong>Nested layout</strong> = section-specific design</p>
            <p>• <strong>{"{children}"}</strong> = سب سے اہم حصہ</p>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 4 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}