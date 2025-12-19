import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter7() {
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
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        <section className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-purple-500 to-indigo-500 pb-2">
            📘 سبق 7: Next.js میں Routing کا مکمل نظریاتی مطالعہ
          </h1>
          <p className="text-xl font-bold text-indigo-500 mb-6 italic">
            (Static, Nested اور Dynamic Routing — تفصیل سے)
          </p>
          <div className="p-6 bg-purple-500/10 border-r-4 border-purple-500 rounded-lg shadow-inner">
            <p className="text-lg font-bold italic">یہ سبق Next.js کی بنیاد ہے۔ اگر Routing سمجھ آ گئی تو Next.js کا آدھا سفر طے ہو جاتا ہے۔</p>
          </div>
        </section>

        {/* 🧠 Routing کیا ہوتی ہے؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400">🧠 Routing کیا ہوتی ہے؟ (بنیادی تصور)</h2>
          <p className="text-lg mb-4 italic text-slate-400">Routing کا مطلب ہے:</p>
          <p className="text-xl font-bold bg-slate-800/20 p-4 rounded-xl mb-6">
            جب user براؤزر میں کوئی URL کھولے → تو ویب سائٹ یہ فیصلہ کرے کہ کون سا صفحہ (page) دکھانا ہے۔
          </p>
          <div className="flex flex-wrap gap-4 font-mono text-sm">
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">/ → ہوم پیج</span>
            <span className="bg-slate-800 text-green-400 p-2 rounded border border-slate-700">/about → ہمارے بارے میں</span>
            <span className="bg-slate-800  text-green-400 p-2 rounded border border-slate-700">/blog → بلاگ</span>
          </div>
        </section>

        

        {/* 🔴 React اور Next.js میں فرق */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-red-500">🔴 React اور Next.js میں فرق (نظریاتی)</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5">
              <h3 className="text-xl font-bold mb-4 text-red-400 underline decoration-red-500/30">React (SPA)</h3>
              <ul className="space-y-3 opacity-90">
                <li>• Routing کے لیے: react-router-dom</li>
                <li>• Routes manually define کرنے پڑتے ہیں</li>
                <li>• SEO کمزور ہوتی ہے</li>
                <li>• Configuration زیادہ ہوتی ہے</li>
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5">
              <h3 className="text-xl font-bold mb-4 text-emerald-400 underline decoration-emerald-500/30">Next.js</h3>
              <ul className="space-y-3 opacity-90 font-bold">
                <li>• Routing خودکار (automatic) ہوتی ہے</li>
                <li>• SEO-friendly ہے</li>
                <li>• Folder = URL کا اصول</li>
                <li>• کوئی اضافی لائبریری نہیں چاہیے</li>
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-xl font-black italic text-emerald-500">👉 یہی Next.js کی سب سے بڑی طاقت ہے۔</p>
        </section>

        {/* 📂 Next.js میں Routing کیسے کام کرتی ہے؟ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400 italic">📂 Next.js میں Routing کیسے کام کرتی ہے؟</h2>
          <div className="p-6 border-r-4 border-indigo-500 bg-indigo-500/5 mb-8">
            <p className="text-lg font-bold">اصول: Folder کا نام = URL | page.js = وہ صفحہ جو دکھے گا</p>
          </div>

          <h3 className="text-2xl font-black mb-4 text-sky-400">🏠 Static Routing (سادہ Routing)</h3>
          <p className="text-lg mb-4 italic font-bold text-slate-400">نظریہ: Static route وہ ہوتا ہے جس کا URL پہلے سے طے شدہ ہو۔</p>
          <div className="grid grid-cols-2 gap-2 mb-6 text-sm font-mono text-center">
            <div className="bg-slate-800 p-2 rounded text-blue-400">/about</div>
            <div className="bg-slate-800 p-2 rounded text-blue-400">/contact</div>
          </div>

          <h4 className="text-lg font-bold mb-3">Folder-based تصور:</h4>
          <pre className="bg-black text-white p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap break-words border border-slate-800 mb-6" dir="ltr">
{`// اگر آپ یہ folder بنائیں:
app/about/page.js

// تو Next.js خود سمجھ لیتا ہے:
URL: /about`}
          </pre>
          <p className="p-4 bg-slate-800/40 rounded-lg text-sm italic">
            <strong>📌 یہاں:</strong> about → route ہے اور page.js → اس route کا مخصوص صفحہ۔
          </p>
        </section>

        {/* 🧱 Nested Routing */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-400 italic">🧱 Nested Routing (درجہ وار Routing)</h2>
          <p className="text-lg mb-6">Nested routing کا مطلب ہے: ایک route کے اندر مزید routes ہونا۔</p>
          <p className="text-lg font-bold mb-4 underline decoration-indigo-500 underline-offset-4">یہ بالکل ایسے ہی ہے جیسے: کتاب → باب → ذیلی عنوان</p>
          
          <pre className="bg-black text-sky-400 p-4 rounded-xl text-[12px] sm:text-[13px] text-left whitespace-pre-wrap border border-slate-800 mb-6" dir="ltr">
{`Folder structure کے ذریعے:

app/blog/page.js
app/blog/news/page.js
app/blog/tutorials/page.js`}
          </pre>
          
          <div className="p-6 bg-purple-500/5 rounded-2xl border-l-4 border-purple-500">
            <h4 className="font-bold mb-4">👉 Next.js خود یہ URLs بنا دے گا:</h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>• /blog</li>
              <li>• /blog/news</li>
              <li>• /blog/tutorials</li>
            </ul>
            <p className="mt-4 text-emerald-500 font-bold italic">کوئی اضافی code نہیں، کوئی router file نہیں!</p>
          </div>
        </section>

        [Image showing Nested directory structure for Next.js app directory]

        {/* 🧭 Dynamic Routing */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-emerald-400">🧭 Dynamic Routing کیا ہے؟ (اہم ترین تصور)</h2>
          <div className="p-6 bg-red-500/5 rounded-2xl border-r-4 border-red-500 mb-8">
            <h3 className="text-xl font-bold mb-4 text-red-500">❓ مسئلہ (Real-world scenario)</h3>
            <p>فرض کریں آپ کے پاس 100 بلاگ پوسٹس ہیں۔ کیا آپ 100 folders بنائیں گے؟ ❌</p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-sky-400 italic">✅ حل: Dynamic Routing</h3>
          <p className="text-lg mb-6 font-bold italic text-slate-300">نظریہ: ایسا route جو runtime پر بدلتا رہے لیکن code ایک ہی ہو۔</p>
          
          <h4 className="text-lg font-bold mb-2">🧠 Next.js میں Dynamic Route کا نظریہ:</h4>
          <div className="p-4 bg-black text-yellow-400 rounded-xl font-mono text-center mb-6 text-sm border border-yellow-500/20">
            folder کا نام [ ] میں لکھتے ہیں
          </div>

          <pre className="bg-black text-sky-300 p-4 rounded-xl text-[12px] text-left border border-slate-800 mb-6" dir="ltr">
{`app/blog/[id]/page.js`}
          </pre>
          <p className="text-lg mb-6">یہ ایک ہی folder تمام URLs جیسے <code className="text-emerald-500 font-bold">/blog/1</code>، <code className="text-emerald-500 font-bold">/blog/25</code> وغیرہ کو handle کر سکتا ہے۔</p>

          <h4 className="text-xl font-bold mb-4 text-purple-400 italic">🧩 [id] اصل میں کیا ہے؟</h4>
          <p className="text-lg">[id] ایک placeholder ہے۔ id = کوئی بھی value جو URL سے آئے گی۔</p>
          
          <div className="mt-8 p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
            <h4 className="text-xl font-black mb-4 text-emerald-500 italic">🧠 Dynamic Routes کیوں ضروری ہیں؟</h4>
            <div className="grid grid-cols-2 gap-4 text-sm font-bold">
              <div className="p-2 bg-slate-800/50 rounded">Blog posts</div>
              <div className="p-2 bg-slate-800/50 rounded">Product pages</div>
              <div className="p-2 bg-slate-800/50 rounded">User profiles</div>
              <div className="p-2 bg-slate-800/50 rounded">Articles</div>
            </div>
            <p className="mt-4 text-center font-black italic">📌 90٪ real websites dynamic routing استعمال کرتی ہیں۔</p>
          </div>
        </section>

        

        {/* 🧭 URL Parameters */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-400">🧭 URL Parameters (نظریہ)</h2>
          <p className="text-lg mb-4 italic">Dynamic route کے ساتھ جو value آتی ہے اسے <strong>URL Parameter</strong> کہتے ہیں۔</p>
          <pre className="bg-black text-white p-3 rounded text-center mb-6 text-xs" dir="ltr">
            /product/iphone-15 → iphone-15 (Parameter)
          </pre>
          <h4 className="text-xl font-black mb-4 text-center text-purple-500 italic">🧠 Route Parameters کی ذہنی تصویر:</h4>
          <div className="p-6 bg-slate-800/50 rounded-full text-center text-sm font-black border border-indigo-500/30">
            URL → folder → parameter → page
          </div>
        </section>

        {/* Static vs Dynamic Table */}
        <section className="mb-16 overflow-x-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-sky-400 underline underline-offset-8">🧠 Static vs Dynamic (گہرا فرق)</h2>
          <table className="w-full text-center border-collapse border border-slate-700">
            <thead>
              <tr className="bg-indigo-600 text-white font-bold">
                <th className="p-3 border border-slate-700">پہلو</th>
                <th className="p-3 border border-slate-700">Static Route</th>
                <th className="p-3 border border-slate-700">Dynamic Route</th>
              </tr>
            </thead>
            <tbody className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-50'}>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">URL</td>
                <td className="p-3 border border-slate-700">fix</td>
                <td className="p-3 border border-slate-700 text-emerald-500 font-bold">بدلتا ہے</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">Pages</td>
                <td className="p-3 border border-slate-700">زیادہ</td>
                <td className="p-3 border border-slate-700 font-bold italic">صرف ایک</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">SEO</td>
                <td className="p-3 border border-slate-700">اچھا</td>
                <td className="p-3 border border-slate-700 font-black text-sky-500">بہت اچھا</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-700 font-bold">استعمال</td>
                <td className="p-3 border border-slate-700 italic">limited</td>
                <td className="p-3 border border-slate-700 font-bold italic">real-world</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Beginner Trap */}
        <section className="mb-16 p-8 bg-red-600/10 border-2 border-red-500/20 rounded-3xl">
          <h2 className="text-2xl font-bold mb-4 text-red-500">⚠️ اہم بات (Beginner trap)</h2>
          <ul className="space-y-3 text-lg font-bold">
            <li>❌ Dynamic route کا مطلب JavaScript logic نہیں</li>
            <li>❌ یہ صرف folder naming convention ہے</li>
            <li className="text-emerald-500">✔ Next.js باقی کام خود کرتا ہے</li>
          </ul>
        </section>

        {/* SEO and Summary */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-emerald-500 italic">🧠 Routing اور SEO کا تعلق</h2>
          <p className="text-lg italic">Next.js routing کلین URLs دیتا ہے، جو سرچ انجن کے لیے بہترین ہیں۔</p>
          <pre className="bg-black text-sky-400 p-3 rounded mt-4 text-center text-xs" dir="ltr">
            /urdu/nextjs/routing
          </pre>
        </section>

        <section className={`p-8 rounded-3xl border-t-8 border-indigo-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-indigo-50'}`}>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 italic">📌 خلاصہ (Theory Recap)</h2>
          <ul className="space-y-4 text-lg">
            <li>🔹 <strong>Routing</strong> = URL سے صفحہ دکھانا</li>
            <li>🔹 Next.js میں routing مکمل طور پر <strong>folder-based</strong> ہے</li>
            <li>🔹 <strong>page.js</strong> ہر route کاentry point ہوتا ہے</li>
            <li>🔹 <strong>Nested routing</strong> = folder کے اندر folder</li>
            <li>🔹 <strong>Dynamic routing</strong> = [param] کے ذریعے بدلتے ہوئے URLs</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 7 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}