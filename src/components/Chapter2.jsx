import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter2() {
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
          className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition-transform active:scale-90 text-sm md:text-base"
        >
          {theme === "light" ? "🌙 ڈارک" : "☀️ برائٹ"}
        </button>
      </header>

      {/* سائیڈ بار */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="w-full leading-relaxed max-w-6xl mx-auto px-4 md:px-12 pt-20 pb-20 custom-page-border text-right overflow-x-hidden">
        
        <section className="mb-12">
          <h1 className="text-2xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-indigo-500 to-purple-600 pb-2 leading-tight">
            📘 سبق 2: Next.js Folder Structure اور Routing (تفصیل سے)
          </h1>
          
          <div className="p-5 bg-red-500/10 border-r-4 border-red-500 rounded-lg mb-8">
            <p className="text-lg md:text-xl font-bold">یہ سبق بہت اہم ہے کیونکہ:</p>
            <p className="text-base md:text-lg mt-2 italic">👉 80٪ beginners یہاں confused ہوتے ہیں۔</p>
          </div>
        </section>

        {/* فولڈر اسٹرکچر */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500">📂 Next.js کا بنیادی Folder Structure</h2>
          <p className="mb-6">جب آپ Next.js install کرتے ہیں تو یہ structure بنتا ہے:</p>
          
          <pre className="bg-black text-white p-5 rounded-2xl text-left font-mono overflow-x-auto mb-8 text-sm md:text-base" dir="ltr">
{`app/
├── page.js
├── layout.js
├── globals.css
└── favicon.ico

public/
└── images/

package.json
next.config.js`}
          </pre>

          <div className={`p-6 md:p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <h3 className="text-xl md:text-2xl font-bold mb-4">🧠 app فولڈر کیا ہے؟</h3>
            <p className="text-base md:text-lg">app فولڈر پورے website کا دل ہے، جتنے بھی pages ہوں گے:</p>
            <p className="font-bold text-blue-500 mt-2">👉 سب app کے اندر ہوں گے</p>
          </div>
        </section>

        {/* page.js کی وضاحت */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500">🏠 page.js کیا کرتا ہے؟</h2>
          <code className="block bg-black text-white p-4 rounded-lg font-mono text-left mb-4 text-sm md:text-base overflow-x-auto" dir="ltr">
            app/page.js
          </code>
          <pre className="bg-black text-blue-400 p-5 rounded-xl text-left font-mono mb-6 text-sm md:text-base overflow-x-auto" dir="ltr">
{`export default function Home() {
  return <h1>ہوم پیج</h1>;
}`}
          </pre>
          <div className="space-y-2 border-r-4 border-emerald-500 pr-4">
            <p className="text-lg md:text-xl font-bold underline">اردو وضاحت</p>
            <p><strong>page.js</strong> = ایک page</p>
            <p><strong>app/page.js</strong> = homepage</p>
            <p className="font-mono text-blue-500 text-sm md:text-base" dir="ltr">URL: http://localhost:3000</p>
          </div>
        </section>

        {/* روٹنگ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500">🌐 Routing کیسے کام کرتی ہے؟ (بہت آسان)</h2>
          <p className="text-lg md:text-xl font-bold mb-4">📌 اصول: Folder کا نام = URL</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className="font-bold mb-2">📁 About Page بنائیں</h3>
              <code className="block bg-black text-pink-400 p-3 rounded mb-2 font-mono text-xs md:text-sm overflow-x-auto" dir="ltr">app/about/page.js</code>
              <pre className="bg-black text-white p-3 rounded text-left text-xs overflow-x-auto" dir="ltr">
{`export default function About() {
  return <h1>ہمارے بارے میں</h1>;
}`}
              </pre>
              <p className="mt-2 font-bold text-blue-500">🔗 URL: /about</p>
            </div>

            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className="font-bold mb-2">📁 Contact Page</h3>
              <code className="block bg-black text-pink-400 p-3 rounded mb-2 font-mono text-xs md:text-sm overflow-x-auto" dir="ltr">app/contact/page.js</code>
              <pre className="bg-black text-white p-3 rounded text-left text-xs overflow-x-auto" dir="ltr">
{`export default function Contact() {
  return <h1>رابطہ کریں</h1>;
}`}
              </pre>
              <p className="mt-2 font-bold text-blue-500">🔗 URL: /contact</p>
            </div>
          </div>
        </section>

        {/* نیسٹڈ روٹنگ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-500">🔄 Nested Routing (Folder کے اندر Folder)</h2>
          <p className="mb-4 text-lg">مثال کے طور پر:</p>
          <pre className="bg-black text-yellow-400 p-5 rounded-xl text-left font-mono text-xs md:text-base overflow-x-auto" dir="ltr">
{`app/blog/page.js         -> /blog
app/blog/post/page.js    -> /blog/post`}
          </pre>
          <p className="mt-4 font-bold text-blue-500">📌 کوئی router-config نہیں لکھنا پڑتا، بس folder بنا دو ✔</p>
        </section>

        {/* لنک کمپوننٹ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500">🔗 Page سے Page جانا (Link Component)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-red-500/5 border border-red-500/20 rounded-xl">
              <h3 className="font-bold text-red-500 mb-2">❌ غلط طریقہ</h3>
              <code className="block bg-black text-white p-3 rounded mb-2 text-xs md:text-sm overflow-x-auto" dir="ltr">{`<a href="/about">About</a>`}</code>
              <p className="text-xs md:text-sm">اس سے Page reload ہوتا ہے جو کہ غلط ہے۔</p>
            </div>
            <div className="p-5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
              <h3 className="font-bold text-emerald-500 mb-2">✅ صحیح طریقہ</h3>
              <pre className="bg-black text-white p-3 rounded text-left text-xs md:text-sm overflow-x-auto" dir="ltr">
{`import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
    </div>
  );
}`}
              </pre>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-2 md:gap-4">
            <span className="px-3 py-1.5 bg-blue-500/10 rounded-full text-blue-500 font-bold text-xs md:text-sm">✓ No Reload</span>
            <span className="px-3 py-1.5 bg-blue-500/10 rounded-full text-blue-500 font-bold text-xs md:text-sm">✓ Fast Speed</span>
            <span className="px-3 py-1.5 bg-blue-500/10 rounded-full text-blue-500 font-bold text-xs md:text-sm">✓ Better SEO</span>
          </div>
        </section>

        {/* لے آؤٹ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500">🧱 layout.js کیا ہے؟</h2>
          <p className="mb-4 text-lg text-blue-500 font-bold italic">ایک بار لکھتے ہیں، ہر page پر خود آ جاتا ہے۔</p>
          
          <pre className="bg-black text-white p-5 rounded-2xl text-left font-mono text-xs md:text-base overflow-x-auto" dir="ltr">
{`export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        <header>میرا ہیڈر</header>
        <hr />
        {children}
        <hr />
        <footer>میرا فُوٹر</footer>
      </body>
    </html>
  );
}`}
          </pre>

          <div className={`mt-8 p-6 md:p-8 rounded-3xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <h3 className="text-xl md:text-2xl font-bold mb-4 underline decoration-orange-500">اردو وضاحت</h3>
            <p className="text-base md:text-lg"><strong>{"{children}"}</strong> → جو بھی page open ہوگا، یہاں show ہوگا اور layout اسے automatic wrap کر لے گا۔</p>
          </div>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-6 md:p-8 border-4 border-dashed border-blue-500 rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-blue-500">🎯 Practice Task</h2>
          <div className="space-y-4 text-lg md:text-xl">
            <p>1️⃣ <strong>/services</strong> page بنائیں</p>
            <p>2️⃣ <strong>/blog/news</strong> page بنائیں</p>
            <p>3️⃣ Home page سے Link کے ذریعے سب pages پر جائیں</p>
          </div>
        </section>

        {/* عام غلطیاں */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500 italic underline underline-offset-8">⚠️ عام غلطیاں</h2>
          <ul className="space-y-4 text-base md:text-lg pr-6 list-none">
            <li>❌ page.jsx کو <strong>pages.js</strong> لکھ دینا</li>
            <li>❌ Link کی جگہ <strong>{"<a>"}</strong> استعمال کرنا</li>
            <li>❌ <strong>app</strong> کے باہر page بنانا</li>
          </ul>
        </section>

        {/* خلاصہ */}
        <section className={`p-6 md:p-8 rounded-3xl border-t-8 border-indigo-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 italic">📌 خلاصہ</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="p-4 text-cyan-500 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-sm font-bold">Folder Routing</div>
            <div className="p-4 text-cyan-500 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-sm font-bold">page.js = Unique</div>
            <div className="p-4 text-cyan-500 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-sm font-bold">layout.js = Global UI</div>
            <div className="p-4 text-cyan-500 bg-white dark:bg-slate-900 rounded-xl shadow-sm text-sm font-bold">Link = Fast Nav</div>
          </div>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 2 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}