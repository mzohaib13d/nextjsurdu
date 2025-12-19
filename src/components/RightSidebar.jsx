import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Sparkles } from "lucide-react"; // آئیکنز امپورٹ کیے

export default function RightSidebar({ isOpen, toggleSidebar, theme }) {
  const location = useLocation(); // موجودہ پیج معلوم کرنے کے لیے

  // لنکس کی لسٹ تاکہ کوڈ صاف رہے
  const menuItems = [
    { path: "/", label: "چیپٹر 1 - ہوم پیج" },
    { path: "/Chapter2", label: "چیپٹر 2 - Folder Structure" },
    { path: "/Chapter3", label: "چیپٹر 3 - Client & Server Components" },
    { path: "/Chapter4", label: "چیپٹر 4 - Layout & Headers" },
    { path: "/Chapter5", label: "چیپٹر 5 - Metadata & SEO" },
    { path: "/Chapter6", label: "چیپٹر 6 - CSS & Tailwind" },
    { path: "/Chapter7", label: "چیپٹر 7 - Routing Theory" },
    { path: "/Chapter8", label: "چیپٹر 8 - Dynamic Routing" },
    { path: "/Chapter9", label: "چیپٹر 9 - Data Fetching & CRUD" },
    { path: "/Chapter10", label: "چیپٹر 10 - API Routes" },
    { path: "/Chapter11", label: "چیپٹر 11 - Error Handling" },
    { path: "/Chapter12", label: "چیپٹر 12 - Form Handling & Authentication" },
    { path: "/Chapter13", label: "چیپٹر 13 - Authentication in Next.js (Login / Signup / User Management)" },
    { path: "/Chapter14", label: "چیپٹر 14 - Next.js Deployment (Vercel & Environment Variables)" },
  ];

  return (
    <>
      {/* مین سائیڈ بار کنٹینر */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        {/* ٹاپ بار: کراس بٹن اور اینیمیٹڈ آئیکن */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700/20">
          {/* ٹاپ لیفٹ: کراس آئیکن (بند کرنے کے لیے) */}
          <button
            onClick={toggleSidebar}
            className="p-2 cursor-pointer rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <X size={28} />
          </button>

          {/* ٹاپ رائٹ: اینیمیٹڈ ڈیکوریٹو آئیکن */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium opacity-70 italic">
              Next.js Course
            </span>
            {/* اب یہ آئیکن اوپر نیچے حرکت کرے گا اور رنگ بدلے گا */}
            <div className="animate-rainbow-move">
              <Sparkles size={24} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* نیویگیشن لنکس (Scrollable Area) */}
        <nav
          className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar"
          dir="rtl"
        >
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggleSidebar}
                className={`block p-4 rounded-xl border-2 transition-all duration-300 ${
                  isActive
                    ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-md"
                    : "border-transparent hover:border-slate-400/30 hover:bg-slate-400/10"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* فوٹر (آپشنل) */}
        <div className="p-4 text-center text-xs opacity-50">
          v1.0 - Next.js Urdu Series
        </div>
      </div>

      {/* اوورلے */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
        ></div>
      )}

      {/* CSS برائے ماڈرن اسکرول بار (Chrome & Firefox) */}
      <style italic>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6; /* Blue-500 */
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 transparent;
        }
      `}</style>
    </>
  );
}
