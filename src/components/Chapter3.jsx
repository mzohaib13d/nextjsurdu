import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";

export default function Chapter3() {
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
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-white text-slate-900"
      }`}
    >
      {/* ہیڈر (نیوبار) */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        {/* بائیں طرف مینیو بٹن */}
        <button
          onClick={toggleSidebar}
          className="p-2 md:p-3 cursor-pointer rounded-full hover:bg-blue-500/10 hover:text-blue-500 transition-all focus:outline-none z-[60] relative text-current"
        >
          <div className="space-y-1 md:space-y-1.5">
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 md:w-8 h-1 bg-current transition-all ${
                sidebarOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* دائیں طرف تھیم ٹوگل بٹن */}
        <button
          onClick={toggleTheme}
          className="px-3 md:px-4 py-1.5 md:py-2 rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold transition-transform active:scale-95 text-sm md:text-base"
        >
          {theme === "light" ? "🌙 ڈارک" : "☀️ برائٹ"}
        </button>
      </header>

      {/* سائیڈ بار کمپوننٹ */}
      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      {/* مین مواد */}
      <main className="w-full max-w-6xl mx-auto px-4 md:px-12 pt-24 md:pt-20 pb-20 leading-relaxed text-right overflow-x-hidden">
        <section className="mb-12">
          <h1 className="text-2xl md:text-6xl font-black mb-6 md:mb-8 bg-clip-text text-transparent bg-gradient-to-l from-sky-400 to-emerald-400 pb-2 leading-tight">
            📘 سبق 3: Client Components اور Server Components
          </h1>
          <p className="text-xl md:text-2xl font-bold italic text-indigo-400 mb-6">
            ("use client" کیا ہے اور کیوں ضروری ہے؟)
          </p>

          <div
            className={`p-5 md:p-6 rounded-2xl border-r-8 border-sky-500 shadow-sm ${
              theme === "dark" ? "bg-slate-800" : "bg-sky-50"
            }`}
          >
            <h2 className="text-lg md:text-2xl font-bold mb-4">
              🤔 Next.js میں دو قسم کے Components ہوتے ہیں:
            </h2>
            <div className="flex flex-col gap-3 text-base md:text-xl">
              <span className="flex items-center gap-2">
                1️⃣{" "}
                <strong className="text-emerald-500">
                  Server Components (Default)
                </strong>
              </span>
              <span className="flex items-center gap-2">
                2️⃣ <strong className="text-sky-500">Client Components</strong>
              </span>
            </div>
          </div>
        </section>

        {/* سرور کمپوننٹ سیکشن */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-emerald-400">
            🖥️ Server Component کیا ہوتا ہے؟
          </h2>
          <ul className="list-disc pr-5 space-y-3 mb-8 text-base md:text-lg">
            <li>
              یہ <strong>server</strong> پر render ہوتا ہے
            </li>
            <li>Default طور پر ہر component server component ہوتا ہے</li>
            <li>Browser میں JavaScript کم جاتی ہے</li>
            <li>Website تیز ہوتی ہے</li>
          </ul>

          <h3 className="text-lg font-bold mb-3 italic">
            🧾 Example: Server Component
          </h3>
          <pre
            className="bg-black text-white p-4 md:p-6 rounded-2xl text-left font-mono overflow-x-auto mb-6 text-xs md:text-sm"
            dir="ltr"
          >
            {`export default function Page() {
  return <h1>یہ Server Component ہے</h1>;
}`}
          </pre>

          <div className="bg-emerald-500/10 p-5 md:p-6 rounded-xl border border-emerald-500/20">
            <h4 className="font-bold text-emerald-500 mb-2 underline">
              اردو وضاحت:
            </h4>
            <p className="text-sm md:text-base">
              یہاں <strong>"use client"</strong> نہیں لکھا۔ کوئی event، state یا
              hook استعمال نہیں ہوا۔ یہ code براہِ راست server پر چلتا ہے۔
            </p>
          </div>
        </section>

        {/* کلائنٹ کمپوننٹ سیکشن */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400">
            🧑‍💻 Client Component کیا ہوتا ہے؟
          </h2>
          <ul className="list-disc pr-5 space-y-3 mb-6 text-base md:text-lg">
            <li>Browser میں چلتا ہے</li>
            <li>User interaction کے لیے ضروری</li>
            <li>Button, input, click, state وغیرہ</li>
          </ul>

          <div className="p-4 bg-red-500/10 border-r-4 border-red-500 mb-8 font-bold text-sm md:text-base">
            ⚠️ شرط: Client component بنانے کے لیے فائل کے سب سے اوپر{" "}
            <code className="text-red-500">"use client"</code> لکھنا ضروری ہے۔
          </div>

          <h3 className="text-lg font-bold mb-3 italic">
            🧾 Example: Client Component
          </h3>
          <pre
            className="bg-black text-sky-300 p-4 md:p-6 rounded-2xl text-left font-mono overflow-x-auto mb-4 text-xs md:text-sm"
            dir="ltr"
          >
            {`"use client";

export default function Counter() {
  let count = 0;

  return (
    <button onClick={() => count++}>
      Click Me
    </button>
  );
}`}
          </pre>
          <p className="text-red-500 font-bold mb-10 text-center text-sm">
            ❌ یہ کام نہیں کرے گا کیونکہ state استعمال نہیں ہو رہی!
          </p>

          <h3 className="text-lg font-bold mb-3 italic">
            ✅ درست Client Component (useState کے ساتھ)
          </h3>
          <pre
            className="bg-black text-emerald-400 p-4 md:p-6 rounded-2xl text-left font-mono overflow-x-auto text-xs md:text-sm"
            dir="ltr"
          >
            {`"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
          </pre>
        </section>

        {/* کیوں ضروری ہے؟ */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">
            🧠 "use client" کیوں ضروری ہے؟
          </h2>
          <p className="mb-4 text-sm md:text-base">اگر آپ درج ذیل چیزیں استعمال کرنا چاہتے ہیں:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 font-mono text-center mb-6 text-xs md:text-sm">
            <div className="p-3 bg-slate-800 text-sky-400 rounded-lg border border-sky-400/30">
              useState
            </div>
            <div className="p-3 bg-slate-800 text-sky-400 rounded-lg border border-sky-400/30">
              useEffect
            </div>
            <div className="p-3 bg-slate-800 text-sky-400 rounded-lg border border-sky-400/30">
              onClick
            </div>
            <div className="p-3 bg-slate-800 text-sky-400 rounded-lg border border-sky-400/30">
              onChange
            </div>
            <div className="p-3 bg-slate-800 text-sky-400 rounded-lg border border-sky-400/30">
              onSubmit
            </div>
          </div>
          <p className="text-lg md:text-xl font-bold text-center text-blue-500 italic">
            👉 تو "use client" لازمی ہے
          </p>

          <div className="mt-12 p-6 md:p-8 bg-red-600 text-white rounded-3xl shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              ❌ عام Error جو سب کو آتا ہے
            </h3>
            <code
              className="block bg-black/40 p-3 md:p-4 rounded-lg mb-4 text-left font-mono text-xs md:text-sm overflow-x-auto whitespace-pre-wrap"
              dir="ltr"
            >
              Error: useState can only be used in Client Components
            </code>
            <p className="text-sm md:text-lg">
              <strong>وجہ:</strong> Component server ہے لیکن hook client والا
              استعمال ہو رہا ہے۔
            </p>
            <p className="text-sm md:text-lg">
              <strong>حل:</strong> فائل کے سب سے اوپر{" "}
              <code className="bg-white/20 px-2 rounded">"use client";</code>{" "}
              لکھیں۔
            </p>
          </div>
        </section>

        {/* مکس استعمال */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-400">
            🔄 Server اور Client ایک ساتھ کیسے استعمال کریں؟
          </h2>
          <p className="text-base md:text-xl font-bold border-b-2 border-indigo-500 pb-2 mb-6">
            📌 Rule: Server کے اندر Client آ سکتا ہے، لیکن Client کے اندر Server
            نہیں۔
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-full">
              <p className="font-bold mb-2 text-sm md:text-base">Server Page:</p>
              <pre
                className="bg-black text-white p-4 rounded-xl text-xs md:text-sm overflow-x-auto h-full text-left"
                dir="ltr"
              >
                {`import Counter from "./Counter";

export default function Page() {
  return (
    <div>
      <h1>Server Page</h1>
      <Counter />
    </div>
  );
}`}
              </pre>
            </div>
            <div className="h-full">
              <p className="font-bold mb-2 text-sm md:text-base">Client Component:</p>
              <pre
                className="bg-black text-indigo-400 p-4 rounded-xl text-xs md:text-sm overflow-x-auto h-full text-left"
                dir="ltr"
              >
                {`"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count+1)}>
      {count}
    </button>
  );
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* موازنہ ٹیبل */}
        <section className="mb-16">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400 text-center">
            📋 Server vs Client (آسان فرق)
          </h2>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-center border-collapse min-w-[300px]">
              <thead>
                <tr className="bg-indigo-600 text-white text-sm md:text-base">
                  <th className="p-3 md:p-4 border border-indigo-700">چیز</th>
                  <th className="p-3 md:p-4 border border-indigo-700">Server</th>
                  <th className="p-3 md:p-4 border border-indigo-700">Client</th>
                </tr>
              </thead>
              <tbody
                className={`${theme === "dark" ? "bg-slate-800" : "bg-slate-50"} text-xs md:text-base`}
              >
                <tr>
                  <td className="p-3 md:p-4 border border-slate-600 font-bold">
                    Render کہاں؟
                  </td>
                  <td className="p-3 md:p-4 border border-slate-600 italic">Server</td>
                  <td className="p-3 md:p-4 border border-slate-600 italic">
                    Browser
                  </td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 border border-slate-600 font-bold">
                    useState
                  </td>
                  <td className="p-3 md:p-4 border border-slate-600">❌</td>
                  <td className="p-3 md:p-4 border border-slate-600">✅</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 border border-slate-600 font-bold">SEO</td>
                  <td className="p-3 md:p-4 border border-slate-600">بہترین</td>
                  <td className="p-3 md:p-4 border border-slate-600">ٹھیک</td>
                </tr>
                <tr>
                  <td className="p-3 md:p-4 border border-slate-600 font-bold">
                    Performance
                  </td>
                  <td className="p-3 md:p-4 border border-slate-600">تیز</td>
                  <td className="p-3 md:p-4 border border-slate-600">نسبتاً کم</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* پریکٹس ٹاسک */}
        <section className="mb-16 p-6 md:p-8 border-4 border-dashed border-sky-500 rounded-3xl">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-500">
            🎯 Practice Task
          </h2>
          <div className="space-y-4 text-base md:text-xl">
            <p>
              1️⃣ ایک <strong>server page</strong> بنائیں
            </p>
            <p>
              2️⃣ اس میں <strong>client counter</strong> import کریں
            </p>
            <p>3️⃣ Button click پر number change کریں</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section
          className={`p-6 md:p-8 rounded-3xl border-t-8 border-sky-600 shadow-2xl ${
            theme === "dark" ? "bg-slate-800" : "bg-sky-50"
          }`}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-sky-600 italic">
            📌 خلاصہ
          </h2>
          <ul className="space-y-4 text-base md:text-lg">
            <li>
              • Default component = <strong>Server</strong>
            </li>
            <li>
              • Interaction چاہیے → <strong>Client</strong>
            </li>
            <li>
              • <strong>"use client"</strong> ہمیشہ فائل کے سب سے اوپر ہوگا
            </li>
            <li>• Server + Client کو ضرورت کے مطابق mix کر سکتے ہیں</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p className="text-sm md:text-base">© 2025 Next.js اردو ٹیوٹوریل - باب 3 مکمل</p>
        </footer>
      </main>

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}
    </div>
  );
}