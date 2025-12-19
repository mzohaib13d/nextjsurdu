import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar"; 

export default function Chapter11() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
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
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:bg-rose-500/10 hover:text-rose-500 transition-all z-[60] relative text-current"
        >
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2.5" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2.5" : ""}`}></span>
          </div>
        </button>

        <button
          onClick={toggleTheme}
          className="px-4 cursor-pointer py-2 rounded-full shadow-lg bg-gradient-to-r from-rose-600 to-orange-600 text-white font-bold transition-transform active:scale-90 text-sm md:text-base"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-20 pb-20 leading-relaxed text-right">
        
        {/* ٹائٹل اور انٹرو */}
        <section className="mb-12">
          <h1 className="text-3xl md:text-6xl font-black mb-8 bg-clip-text text-transparent bg-gradient-to-l from-rose-500 to-orange-500 pb-2">
            📘 سبق 11: Image Optimization، Caching اور Lazy Loading
          </h1>
          <p className="text-lg mb-4">Next.js میں Performance اور SEO بہتر بنانے کے لیے یہ تین چیزیں سب سے اہم ہیں:</p>
          <ul className="space-y-2 text-lg font-bold text-rose-500 list-disc pr-6">
            <li>Optimized Images (next/image)</li>
            <li>Data Caching</li>
            <li>Lazy Loading Components / Images</li>
          </ul>
        </section>

        {/* 1️⃣ Image Optimization */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-500 underline underline-offset-8">🧠 1️⃣ Next.js Image Optimization (next/image)</h2>
          <h3 className="text-xl font-bold mb-3 italic text-orange-500">نظریہ</h3>
          <p className="mb-4">Traditional {"<img>"} tag کے مقابلے میں Next.js کا {"<Image>"} component:</p>
          <ul className="space-y-2 mb-6 pr-6 list-none">
            <li>✅ Auto image resizing</li>
            <li>✅ Lazy loading by default</li>
            <li>✅ WebP support</li>
            <li>✅ SEO-friendly attributes (alt)</li>
          </ul>

          <h3 className="text-xl font-bold mb-3 italic">Basic Example</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar mb-6" dir="ltr">
{`import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Next.js اردو Tutorial</h1>
      <Image
        src="/blog-image.jpg"
        width={600}
        height={400}
        alt="Blog Image"
        priority={true} // critical images
      />
    </div>
  );
}`}
          </pre>

          <div className="p-6 bg-rose-500/5 border-r-4 border-rose-500 rounded-lg">
            <h3 className="text-xl font-bold mb-3 italic text-rose-500">اردو وضاحت</h3>
            <ul className="space-y-2 text-base md:text-lg">
              <li><strong>src</strong> → image کا path</li>
              <li><strong>width / height</strong> → layout control</li>
              <li><strong>alt</strong> → SEO اور accessibility</li>
              <li><strong>priority</strong> → important images کے لیے</li>
            </ul>
          </div>
        </section>

        

        {/* 2️⃣ Lazy Loading */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-orange-500">🧭 2️⃣ Lazy Loading</h2>
          <h3 className="text-xl font-bold mb-3 italic">Lazy loading مطلب:</h3>
          <p className="mb-4">جب تک user image یا component کو scroll نہ کرے، browser اسے load نہ کرے</p>
          <ul className="space-y-2 mb-6 pr-6 list-disc">
            <li>Next.js {"<Image>"} میں default lazy loading</li>
            <li>Non-critical images کے لیے <code className="bg-slate-300 text-slate-900 p-1 rounded">priority={"{false}"}</code> رکھیں</li>
          </ul>

          <h3 className="text-xl font-bold mb-3 italic">Example</h3>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar mb-4" dir="ltr">
{`<Image
  src="/gallery/photo1.jpg"
  width={400}
  height={300}
  alt="Gallery Photo"
/>`}
          </pre>
          <p className="text-orange-500 font-bold italic">یہ image user کے viewport میں آنے پر load ہوگی</p>
        </section>

        {/* 3️⃣ Caching Data */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-sky-500">🧠 3️⃣ Caching Data (Server + Client)</h2>
          <h3 className="text-xl font-bold mb-3 italic">تصور</h3>
          <ul className="space-y-2 mb-8 pr-6 list-disc">
            <li>Repeated requests کو fast بنانا</li>
            <li>Server load کم کرنا</li>
            <li>SEO-friendly caching</li>
          </ul>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-2 text-sky-400">3.1 Static Site Generation (SSG)</h4>
              <p className="mb-3 text-sx italic">Data fetch build time پر | Page static generate | Fast load</p>
              <pre className="bg-black text-sky-300 p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar" dir="ltr">
{`export async function generateStaticParams() {
  const res = await fetch("https://api.example.com/blogs");
  const blogs = await res.json();

  return blogs.map((b) => ({ id: b.id }));
}`}
              </pre>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2 text-emerald-500">3.2 Incremental Static Regeneration (ISR)</h4>
              <p className="mb-3 text-sx italic">Page static generate | Background میں revalidate</p>
              <pre className="bg-black text-emerald-400 p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar mb-4" dir="ltr">
{`export const revalidate = 60; // 60 seconds`}
              </pre>
              <p className="italic font-black">Page ہر 60 سیکنڈ بعد update ہوگا</p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-2 text-pink-500">3.3 Client-side caching</h4>
              <pre className="bg-black text-pink-300 p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar mb-4" dir="ltr">
{`const res = await fetch("/api/blog", { cache: "force-cache" });`}
              </pre>
              <p className="italic font-bold">Browser / Next.js automatically caching manage کرتا ہے</p>
            </div>
          </div>
        </section>

        

        {/* 4️⃣ Lazy Load Components */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-500">🧩 4️⃣ Lazy Load Components</h2>
          <p className="mb-4">Big components یا charts / tables lazy load کریں</p>
          <pre className="bg-black text-white p-4 rounded-xl text-[11px] md:text-[14px] text-left overflow-x-auto whitespace-pre custom-scrollbar mb-4" dir="ltr">
{`import dynamic from "next/dynamic";

const Chart = dynamic(() => import("./Chart"), { ssr: false });

export default function Home() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Chart />
    </div>
  );
}`}
          </pre>
          <p className="italic font-bold text-purple-400">ssr: false → component only client-side load</p>
        </section>

        {/* 5️⃣ SEO & Performance Benefits */}
        <section className="mb-16 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl shadow-sm">
          <h2 className="text-2xl md:text-3xl font-black mb-6 text-rose-600">⚡ 5️⃣ SEO & Performance Benefits</h2>
          <ul className="space-y-4 text-lg font-bold">
            <li>🚀 Faster page load → better Google ranking</li>
            <li>🖼️ Optimized images → reduced bandwidth</li>
            <li>💤 Lazy loading → faster initial render</li>
            <li>💾 Caching → repeated visits fast</li>
          </ul>
        </section>

        {/* ⚠️ Common Mistakes */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-red-500 italic underline decoration-2 underline-offset-8">⚠️ Common Mistakes</h2>
          <ul className="space-y-3 text-lg pr-6 list-none font-medium">
            <li>❌ {"<img>"} tag use کرنا</li>
            <li>❌ Images کو optimize نہ کرنا</li>
            <li>❌ Lazy load disable کرنا بغیر ضرورت</li>
            <li>❌ Caching ignore کرنا</li>
          </ul>
        </section>

        {/* 🎯 Practice Task */}
        <section className="mb-16 p-8 border-4 border-dashed border-rose-500/40 rounded-3xl">
          <h2 className="text-3xl font-bold mb-6 text-rose-500">🎯 Practice Task</h2>
          <div className="space-y-4 text-lg md:text-xl font-bold">
            <p>1️⃣ /blog page پر 5 optimized images add کریں</p>
            <p>2️⃣ Gallery images lazy load کریں</p>
            <p>3️⃣ Client-side fetch data cache کریں</p>
            <p>4️⃣ Dashboard component lazy load کریں</p>
          </div>
        </section>

        {/* 📌 خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-rose-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-rose-50'}`}>
          <h2 className="text-3xl font-bold mb-6 text-rose-600 italic">📌 خلاصہ</h2>
          <ul className="space-y-3 text-lg font-bold">
            <li>• <strong>{"<Image>"}</strong> → optimized, lazy, SEO-friendly</li>
            <li>• <strong>Lazy loading</strong> → viewport efficiency</li>
            <li>• <strong>Caching</strong> → SSR / ISR / client-side</li>
            <li>• <strong>Lazy load components</strong> → UX اور performance better</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 11 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div onClick={toggleSidebar} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"></div>
      )}
    </div>
  );
}