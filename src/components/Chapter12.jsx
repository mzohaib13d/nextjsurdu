import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter12() {
  const [theme, setTheme] = useState(() => localStorage.getItem("user-theme") || "light");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // کاپی فنکشن
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  // کوڈ بلاک کمپوننٹ - بٹن اب باہر ہے
  const CodeBlock = ({ code, colorClass = "text-emerald-400" }) => (
    <div className="relative my-8">
      {/* کاپی بٹن کارڈ سے باہر اوپر بائیں طرف */}
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
      
      {/* نوٹیفیکیشن میسج - دائیں سے اسکرول ہو کر آئے گا */}
      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-green-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-green-400">
          {copySuccess}
        </div>
      )}

      {/* ہیڈر */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button onClick={toggleSidebar} className="p-2 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current">
          <div className="space-y-1.5">
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 md:w-8 h-1 bg-current transition-all ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        <button onClick={toggleTheme} className="px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm transition-transform">
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        
        {/* ٹائٹل سیکشن */}
        <section className="mb-12">
          <h1 className="text-2xl md:text-5xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-l from-sky-400 to-indigo-400 pb-2 leading-tight">
            📘 سبق 12: Forms, Inputs اور Form Handling in Next.js
          </h1>
          <p className="text-lg md:text-xl mb-6">Next.js میں forms بنیادی ہیں کیونکہ زیادہ تر websites user data collect کرتی ہیں:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm md:text-base mb-8">
            {["Login / Signup", "Contact form", "Blog comments", "Surveys"].map((item, i) => (
              <div key={i} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl font-bold shadow-sm">{item}</div>
            ))}
          </div>
        </section>

        {/* 1. Form Components */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400">🧠 1️⃣ Form Components (Theory)</h2>
          <p className="font-bold mb-3">HTML Form Basics:</p>
          <CodeBlock code={`<form>
  <input type="text" name="username" />
  <input type="password" name="password" />
  <button type="submit">Submit</button>
</form>`} />

          <div className="my-8 p-5 bg-indigo-500/5 border-r-4 border-indigo-500 rounded-lg">
            <h3 className="font-bold mb-2">Next.js / React Theory:</h3>
            <ul className="list-disc pr-5 space-y-2">
              <li>React / Next.js میں <strong>Controlled Component</strong> بہتر ہے</li>
              <li>Controlled Component → input value state سے control</li>
            </ul>
          </div>

          <h3 className="font-bold mb-3 italic">Controlled Component مثال</h3>
          <CodeBlock code={`"use client";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // Page reload stop
    console.log("Username:", username, "Password:", password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 rounded mt-2"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 mt-2 rounded">
        Login
      </button>
    </form>
  );
}`} colorClass="text-sky-300" />

          <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700 text-sm md:text-base">
            <h4 className="font-bold text-sky-400 mb-2 underline">اردو وضاحت:</h4>
            <p><strong>useState</strong> → input value کو track کرتا ہے</p>
            <p><strong>onChange</strong> → ہر input کی value update</p>
            <p><strong>handleSubmit</strong> → form submit event</p>
            <p><strong>e.preventDefault()</strong> → page reload نہیں ہوتا</p>
          </div>
        </section>

        {/* 2. Validation */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400">🧩 2️⃣ Form Validation</h2>
          <div className="p-4 bg-emerald-500/10 border-r-4 border-emerald-500 mb-6">
            <p><strong>Validation</strong> = user input correct ہے یا نہیں check کرنا</p>
            <p>Client-side validation → JavaScript</p>
            <p>Server-side validation → Server Actions / API</p>
          </div>

          <h3 className="font-bold mb-3">Example: Simple Validation</h3>
          <CodeBlock code={`const handleSubmit = (e) => {
  e.preventDefault();
  if (!username || !password) {
    alert("تمام فیلڈز پر کریں");
    return;
  }
  console.log("Form submitted:", { username, password });
};`} />

          <div className="mt-4 text-sm md:text-base space-y-1 opacity-80">
            <p>• اگر کوئی فیلڈ empty → alert show</p>
            <p>• Simple validation → beginner-friendly</p>
            <p>• Advanced → regex, email validation</p>
          </div>
        </section>

        {/* 3. Server Actions */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">🧠 3️⃣ Form Handling with Server Actions (Next.js 13+)</h2>
          <h3 className="font-bold mb-3 italic">Server-side form submit:</h3>
          <CodeBlock code={`"use client";
import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        setMessage("");
      }
    } catch (err) {
      setStatus("Error sending message");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="پیغام لکھیں"
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-green-600 text-white p-2 mt-2 rounded">
        Send
      </button>
      <p>{status}</p>
    </form>
  );
}`} colorClass="text-indigo-300" />

          <h3 className="font-bold mb-3 mt-8 italic text-emerald-400">Server API Route:</h3>
          <CodeBlock code={`// app/api/contact/route.js
export async function POST(request) {
  const data = await request.json();
  console.log("Received message:", data.message);
  return new Response(JSON.stringify({ message: "Message received" }));
}`} colorClass="text-emerald-300" />
        </section>

        {/* 4. RTL Design */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400 text-center md:text-right">🧩 4️⃣ RTL Form Design</h2>
          <p className="mb-4">Urdu forms کے لیے <strong>text-right</strong> اور <strong>dir="rtl"</strong> ضروری</p>
          <CodeBlock code={`<form className="text-right" dir="rtl">
  <input placeholder="نام" />
  <textarea placeholder="پیغام" />
</form>`} />
        </section>

        {/* 5. Error Handling */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-red-500 italic">🧠 5️⃣ Error Handling in Forms</h2>
          <ul className="list-disc pr-5 space-y-2 mb-6">
            <li>Input validation errors show کریں</li>
            <li>Server errors catch کریں</li>
            <li>Toast / inline messages استعمال کریں</li>
          </ul>
          <CodeBlock code={`{error && <p className="text-red-600">{error}</p>}`} colorClass="text-red-400" />
        </section>

        {/* 6. Handling Flow */}
        <section className="mb-16 p-6 rounded-2xl bg-slate-800 border border-slate-700 shadow-xl overflow-x-auto">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-yellow-400">⚡ 6️⃣ Full Form Handling Flow</h2>
          <div className="space-y-4 text-base md:text-lg min-w-[300px]">
            {[
              "User fills form", 
              "Client-side validation", 
              "Submit → API / Server Action", 
              "Server validates → stores / logs", 
              "Response → success / error", 
              "Display feedback"
            ].map((step, index) => (
              <div key={index} className="flex items-center gap-3 text-yellow-100">
                <span className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full text-sm flex-shrink-0">{index + 1}</span> 
                {step}
              </div>
            ))}
          </div>
        </section>

        {/* Practice Task */}
        <section className="mb-16 p-6 md:p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center md:text-right">🎯 Practice Task</h2>
          <div className="space-y-4 font-bold text-sm md:text-lg">
            <p>1️⃣ Login form بنائیں (username + password)</p>
            <p>2️⃣ Contact form بنائیں (message textarea)</p>
            <p>3️⃣ Client validation add کریں</p>
            <p>4️⃣ Server-side submit API بنائیں</p>
            <p>5️⃣ RTL styling کے ساتھ Urdu placeholders</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section className={`p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-blue-50'}`}>
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 italic">📌 خلاصہ</h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li>• <strong>Forms</strong> = Controlled Components + useState</li>
            <li>• <strong>Client-side validation</strong> ضروری</li>
            <li>• <strong>Server Actions / API route</strong> سے submit</li>
            <li>• <strong>RTL</strong> اور Urdu-friendly placeholders</li>
            <li>• <strong>Feedback</strong> (success / error) enhance UX</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>© 2025 Next.js اردو ٹیوٹوریل - باب 12 مکمل</p>
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