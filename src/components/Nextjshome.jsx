import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 
import VisitorCounter from "./VisitorCounter";

export default function Nextjshome() {
  // تھیم کو محفوظ کرنے اور لوڈ کرنے کا لاجک
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
      {/* ٹاپ بار (ہیڈر) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        
        {/* بائیں طرف اینیمیٹڈ مینیو بٹن */}
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current"
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
          className="px-4 py-2 rounded-full cursor-pointer shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition-transform active:scale-90"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      {/* سائیڈ بار کمپوننٹ */}
      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      {/* مین مواد */}
      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-20 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* سیکشن: تعارف */}
        <section className="mb-12">

  {/* Header Row: Heading + Visitor Counter */}
  <div className="flex items-center justify-between w-full mb-8">

    {/* Left: Gradient Heading */}
    <h1 className="text-3xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-l from-blue-500 to-emerald-500 leading-tight">
      Next.js: ایک جامع تعارف اور ارتقاء
    </h1>

    {/* Right: Visitor Counter */}
    <div className="flex items-center gap-2">
      <VisitorCounter />
    </div>

  </div>

  {/* Description */}
  <p className="text-xl md:text-2xl mb-6">
    Next.js ایک جدید اور طاقتور React فریم ورک ہے جس کا آغاز <strong>2016</strong> میں <strong>Vercel</strong> (سابقہ نام Zeit) کمپنی کی جانب سے ہوا۔ اسے بنانے کا بنیادی مقصد React ایپلیکیشنز کو <strong>مکمل اور پروڈکشن ریڈی</strong> بنانا تھا۔
  </p>

</section>

        {/* سیکشن: مسائل کا حل */}
        <section className="mb-12">
          <div className={`p-6 md:p-8 rounded-2xl border-r-8 border-blue-500 shadow-sm ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
            <h2 className="text-2xl font-bold mb-6">مسائل کا حل:</h2>
            <p className="mb-6">React صرف کلائنٹ سائیڈ (فرنٹ اینڈ) کے لیے تھا، جس سے SEO، لوڈنگ اسپیڈ اور پرفارمنس میں چیلنجز تھے۔ Next.js نے ان مسائل کو حل کرنے کے لیے درج ذیل کلیدی خصوصیات متعارف کرائیں:</p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-blue-600">1. سرور سائیڈ رینڈرنگ (SSR)</h3>
                <ul className="list-disc pr-6">
                  <li>پہلے سے رینڈر شدہ صفحات سرور پر</li>
                  <li>بہتر SEO اور تیز لوڈنگ</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600">2. سٹیٹک سائٹ جنریشن (SSG)</h3>
                <ul className="list-disc pr-6">
                  <li>بلڈ ٹائم پر صفحات کی تیاری</li>
                  <li>بے مثال اسپیڈ اور سیکیورٹی</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-600">3. انٹیگریٹڈ روٹنگ سسٹم</h3>
                <ul className="list-disc pr-6">
                  <li>فائل بیسڈ روٹنگ</li>
                  <li>بغیر اضافی لائبریری کے</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ارتقاء اور جدید خصوصیات */}
        <section className="mb-12 space-y-6">
          <h2 className="text-3xl font-bold border-b-2 border-slate-500 pb-2">ارتقاء اور جدید خصوصیات:</h2>
          <p>وقت کے ساتھ Next.js نے مزید خصوصیات شامل کیں:</p>
          <ul className="list-disc pr-6 space-y-2">
            <li>API روٹس (بیک اینڈ API کی ضرورت ختم)</li>
            <li>انکریمنٹل اسٹیٹک ری جنریشن (ISR)</li>
            <li>امیج آپٹیمائزیشن</li>
            <li>انٹرنیشنلائزیشن (ملٹی لینگویج سپورٹ)</li>
          </ul>

          <h2 className="text-3xl font-bold border-b-2 border-slate-500 pb-2 mt-12">موجودہ استعمال:</h2>
          <p>آج Next.js دنیا بھر کی بڑی کمپنیوں اور پراجیکٹس میں استعمال ہو رہا ہے، جن میں شامل ہیں:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-bold text-blue-500">
            <div>• ای کامرس پلیٹ فارمز</div>
            <div>• بلاگنگ اور میگزین سائٹس</div>
            <div>• کارپوریٹ ویب سائٹس</div>
            <div>• SaaS ایپلیکیشنز</div>
            <div>• موبائل ایپس (React Native کے ساتھ)</div>
          </div>
        </section>

        <section className="p-6 rounded-xl border-2 border-emerald-500 mb-16 italic text-lg">
          <strong>ختمہ:</strong> Next.js نہ صرف React کی حدود کو وسیع کرتا ہے بلکہ ڈویلپرز کو جدید ویب ڈویلپمنٹ کے تمام ضروری ٹولز ایک ہی جگہ فراہم کرتا ہے، جس سے تیز تر، محفوظ اور قابلِ توسیع ویب ایپلیکیشنز کی تخلیق ممکن ہوتی ہے۔
        </section>

        {/* ٹیوٹوریل سیکشن */}
        <div className="space-y-20">
          
          {/* سبق a */}
          <article>
            <h2 className="text-3xl font-bold text-emerald-500 mb-6">🧩 سبق (a): Next.js کی انسٹالیشن (نیا اور درست طریقہ)</h2>
            <div className={`p-6 rounded-xl space-y-4 ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}`}>
              <p className="font-bold">📌 ضروری چیزیں:</p>
              <ul className="pr-6 list-disc">
                <li>Node.js 18 یا اس سے نیا</li>
                <li>Internet</li>
                <li>Terminal / CMD</li>
              </ul>
              <p className="font-bold mt-4">🔍 Node.js چیک کریں:</p>
              <code className="block bg-black text-emerald-400 p-4 rounded-lg font-mono text-left overflow-x-auto" dir="ltr">node -v</code>
              <p className="text-sm">اگر version آ جائے تو Node install ہے۔</p>
              
              <p className="font-bold text-blue-500 text-xl mt-6">🚀 Next.js انسٹال کرنے کا نیا طریقہ (Recommended):</p>
              <code className="block bg-black text-blue-400 p-4 rounded-lg font-mono text-left overflow-x-auto" dir="ltr">npx create-next-app@latest nextjs-urdu</code>
              
              <div className="mt-6 p-4 border border-slate-500 rounded-lg bg-white/5 overflow-hidden">
                <p className="font-bold mb-2">انسٹالیشن کے دوران سوالات:</p>
                <pre className="text-xs md:text-base leading-relaxed whitespace-pre overflow-x-auto custom-scrollbar pb-2" dir="ltr">
                  {`✔ TypeScript?        → No / Yes (شروع میں No بہتر) \n✔ ESLint?            → Yes \n✔ Tailwind CSS?      → Yes (بہت ضروری) \n✔ src/ directory?    → Yes \n✔ App Router?        → Yes (نیا طریقہ) \n✔ Import alias?      → Yes`}
                </pre>
              </div>

              <p className="font-bold mt-6">▶️ پروجیکٹ چلائیں:</p>
              <div className="space-y-2 font-mono text-left" dir="ltr">
                <code className="block bg-black text-yellow-400 p-3 rounded overflow-x-auto">cd nextjs-urdu</code>
                <code className="block bg-black text-yellow-400 p-3 rounded overflow-x-auto">npm run dev</code>
              </div>
              <p className="mt-4">براؤزر میں کھولیں: <span className="text-blue-500 font-bold">http://localhost:3000</span></p>
              <p className="text-emerald-500 font-bold">🎉 آپ کی پہلی Next.js ویب سائٹ تیار ہے!</p>
            </div>
          </article>

          {/* سبق: فولڈر اسٹرکچر */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-6">📁 Next.js Folder Structure (سمجھنا بہت ضروری)</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <pre className="bg-black text-white p-6 rounded-xl text-left font-mono overflow-x-auto custom-scrollbar" dir="ltr">
{`app/
 ├─ page.js        → Homepage
 ├─ layout.js      → Root layout
 ├─ globals.css    → Global CSS
 └─ favicon.ico

public/
 └─ images

package.json
next.config.js`}
              </pre>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold underline decoration-blue-500">اردو وضاحت:</h3>
                <p><strong>app/page.js</strong> → ہر route کی main فائل</p>
                <p><strong>layout.js</strong> → header, footer, sidebar</p>
                <p><strong>public/</strong> → images, icons</p>
              </div>
            </div>
          </article>

          {/* سبق b: روٹنگ */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">🧭 سبق (b): Routing (Pages کیسے بنتے ہیں)</h2>
            <p className="mb-4 text-lg">صرف ایک فولڈر بنائیں اور اس میں page.js رکھ دیں۔ مثال کے طور پر:</p>
            <code className="block bg-black text-blue-300 p-4 rounded-lg font-mono text-left overflow-x-auto" dir="ltr">app/about/page.js</code>
            <pre className="bg-black text-emerald-400 p-4 rounded-lg mt-2 text-left overflow-x-auto custom-scrollbar" dir="ltr">
{`export default function About() {
  return <h1>ہمارے بارے میں</h1>;
}`}
            </pre>
            <p className="font-bold text-pink-500 mt-2">🔗 URL: /about</p>
            <p className="italic mt-2">👉 Next.js میں routing folder کے نام سے بنتی ہے</p>
          </article>

          {/* سبق c: لنک نیویگیشن */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">🔗 سبق (c): Link Navigation</h2>
            <pre className="bg-black text-pink-400 p-6 rounded-xl mb-4 overflow-x-auto text-left font-mono custom-scrollbar" dir="ltr">
{`import Link from "next/link";

export default function Home() {
  return (
    <Link href="/about">
      About Page
    </Link>
  );
}`}
            </pre>
            <div className="p-4 bg-emerald-500/10 border-r-4 border-emerald-500">
              <p className="font-bold text-emerald-600">فائدہ:</p>
              <p>Page reload نہیں ہوتا اور ویب سائٹ تیز چلتی ہے۔</p>
            </div>
          </article>

          {/* سبق d: لے آؤٹ */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">🎨 سبق (d): Layout (Header / Footer)</h2>
            <pre className="bg-black text-yellow-400 p-6 rounded-xl overflow-x-auto text-left font-mono custom-scrollbar" dir="ltr">
{`// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="ur">
      <body>
        <header>ہیڈر</header>
        {children}
        <footer>فُوٹر</footer>
      </body>
    </html>
  );
}`}
            </pre>
          </article>

          {/* سبق e: کلائنٹ بمقابلہ سرور */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">⚙️ سبق (e): Client vs Server Components</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="p-6 border border-slate-600 rounded-xl overflow-hidden">
                <p className="font-bold mb-2">Server Component (Default):</p>
                <code className="block text-emerald-400 bg-black p-3 rounded text-left overflow-x-auto" dir="ltr">
                  {`export default function Page() {\n  return <p>Server Component</p>;\n}`}
                </code>
              </div>
              <div className="p-6 border border-blue-500 rounded-xl overflow-hidden">
                <p className="font-bold mb-2">Client Component:</p>
                <code className="block text-emerald-400 bg-black p-3 rounded text-left font-mono overflow-x-auto" dir="ltr">
                  {`"use client";\nexport default function Page() {\n  return <button>Click</button>;\n}`}
                </code>
              </div>
            </div>
            <p className="mt-4 text-red-500 font-bold">📌 useState, onClick → ہمیشہ client component میں استعمال ہوتے ہیں۔</p>
          </article>

          {/* سبق f: فارمز */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">🧮 سبق (f): Forms اور User Input</h2>
            <ul className="list-disc pr-6 space-y-2">
              <li>Input فیلڈز کا استعمال</li>
              <li>Button اور onClick ایونٹس</li>
              <li>onChange اور useState کے ذریعے ڈیٹا ہینڈلنگ</li>
              <li>Form Submit کا طریقہ</li>
            </ul>
          </article>

          {/* سبق g: ڈیٹا فیچنگ */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">🌐 سبق (g): Data Fetching (API سے ڈیٹا)</h2>
            <pre className="bg-black text-blue-300 p-6 rounded-xl overflow-x-auto text-left font-mono custom-scrollbar" dir="ltr">
{`async function getData() {
  const res = await fetch("https://api.example.com");
  return res.json();
}

export default async function Page() {
  const data = await getData();
  return <pre>{JSON.stringify(data)}</pre>;
}`}
            </pre>
          </article>

          {/* سبق h: اے پی آئی روٹس */}
          <article>
            <h2 className="text-3xl font-bold text-blue-500 mb-4">📦 سبق (h): API Routes (Backend Next.js میں)</h2>
            <code className="block bg-black text-white p-4 rounded-lg font-mono text-left mb-2 overflow-x-auto" dir="ltr">app/api/users/route.js</code>
            <pre className="bg-black text-emerald-400 p-6 rounded-xl text-left font-mono overflow-x-auto custom-scrollbar" dir="ltr">
{`export async function GET() {
  return Response.json({ name: "Ali" });
}`}
            </pre>
            <p className="font-bold text-pink-500 mt-2">URL: /api/users</p>
          </article>

          {/* سبق i سے k تک */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className="font-bold text-xl mb-3">🎨 سبق (i): Styling</h3>
              <p>Next.js میں اسٹائلنگ کے لیے Tailwind CSS، Global CSS، اور CSS Modules استعمال کیے جاتے ہیں۔</p>
            </div>
            <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'border-slate-700' : 'border-slate-200'}`}>
              <h3 className="font-bold text-xl mb-3">🔐 سبق (j): Env Variables</h3>
              <code className="block bg-black text-yellow-400 p-2 rounded text-left mb-2 overflow-x-auto" dir="ltr">NEXT_PUBLIC_API_URL=https://...</code>
              <p>سیکیور ڈیٹا اور API کیز کے لیے .env فائل کا استعمال۔</p>
            </div>
          </article>

          {/* ڈپلائمنٹ */}
          <article className="p-8 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <h2 className="text-3xl font-bold mb-6 italic underline underline-offset-8">🚀 سبق (k): Build & Deployment</h2>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 font-mono text-left" dir="ltr">
                <code className="block bg-black/30 p-3 rounded overflow-x-auto">npm run build</code>
                <code className="block bg-black/30 p-3 rounded overflow-x-auto">npm run start</code>
              </div>
              <div className="space-y-2">
                <p className="font-bold">بہترین پلیٹ فارمز:</p>
                <ul className="list-disc pr-6">
                  <li>Vercel (Recommended)</li>
                  <li>Firebase</li>
                  <li>VPS (Hostinger/AWS)</li>
                </ul>
              </div>
            </div>
          </article>
        </div>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - تمام حقوق محفوظ ہیں۔</p>
        </footer>
      </main>

      {/* اوورلے جب سائیڈ بار کھلا ہو */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}
    </div>
  );
}