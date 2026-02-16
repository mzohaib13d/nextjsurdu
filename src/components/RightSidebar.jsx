import React from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Sparkles } from "lucide-react";

export default function RightSidebar({ isOpen, toggleSidebar, theme }) {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "چیپٹر 1 - ہوم پیج - جامع تعارف" },
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
    { path: "/Chapter13", label: "چیپٹر 13 - Authentication in Next.js" },
    { path: "/Chapter14", label: "چیپٹر 14 - Next.js Deployment" },
    { path: "/Chapter15", label: "چیپٹر 15 - MongoDB, Middleware, and JWT" },
    {
      path: "/Chapter16",
      label: "چیپٹر 16 - Authentication + MongoDB + Mongoose",
    },
    { path: "/Chapter17", label: "چیپٹر 17 - Picture Upload System" },
    {
      path: "/Chapter18",
      label: "چیپٹر 18 - Professional LMS System - MERN Stack + Next.js",
    },
    {
      path: "/Chapter19",
      label: "چیپٹر 19 - Professional Authentication System in LMS",
    },
    {
      path: "/Chapter20",
      label: "چیپٹر 20 - NextAuth.js Complete Integration in LMS",
    },
    {
      path: "/Chapter21",
      label: "چیپٹر 21 - LMS Production-Ready Security System",
    },
    {
      path: "/Chapter22",
      label: "چیپٹر 22 - Complete Course Management System in LMS",
    },
    { path: "/Chapter23", label: "چیپٹر 23 - Student Dashboard System in LMS" },
    { path: "/Chapter24", label: "چیپٹر 24 - Video Upload & Streaming System" },
    {
      path: "/Chapter25",
      label: "چیپٹر 25 - Complete Admin Dashboard & Payment Integration",
    },
    {
      path: "/Chapter26",
      label: "چیپٹر 26 - Real-time Features with Socket.io in LMS",
    },
    {
      path: "/Chapter27",
      label: "چیپٹر 27 - E-mail System & Analytics & SEO Optimization in LMS",
    },
    {
      path: "/Chapter28",
      label:
        "28 چیپٹر - 🔒 Security & 🔍 SEO Optimization & 🚀 Complete Project",
    },
    {
      path: "/Chapter29",
      label: "چیپٹر 29 - React JS & Next.js Page Routing  & App Routing",
    },
    {
      path: "/Chapter30",
      label: "چیپٹر 30 -  : Next.js + Docker Complete Tutorial (Urdu)",
    },
    {
      path: "/Chapter31",
      label: "چیپٹر 31 -  : Next.js + Docker Complete Production Deployment (Urdu)",
    },
  ];

  return (
    <>
      {/* Main sidebar container */}
      <div
        className={`fixed top-0 right-0 h-full w-80 z-[70] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } ${
          theme === "dark"
            ? "bg-slate-900 text-white"
            : "bg-white text-slate-900"
        }`}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center p-5 border-b border-slate-700/20">
          <button
            onClick={toggleSidebar}
            className="p-2 cursor-pointer rounded-full hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <X size={28} />
          </button>

          <div className="flex items-center gap-2">
            <span className="relative inline-flex items-center justify-center p-1 rounded-xl">
              <span
                className="absolute inset-0 rounded-xl"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ff0000, #ff9900, #ffff00, #00ff00, #0099ff, #6600ff, #ff0000)",
                  backgroundSize: "400% 100%",
                  filter: "blur(8px)",
                  animation: "rainbowBorder 3s linear infinite",
                }}
              ></span>
              {/* Theme-aware background */}
              <span
                className={`absolute inset-1 rounded-lg ${
                  theme === "dark" ? "bg-slate-800" : "bg-white"
                }`}
              ></span>
              {/* Theme-aware text color */}
              <span
                className={`relative text-sm font-medium italic px-5 py-3 z-10 ${
                  theme === "dark"
                    ? "text-white opacity-90"
                    : "text-slate-900 opacity-70"
                }`}
              >
                Next.js Urdu Course
              </span>
            </span>
            <div className="animate-rainbow-move">
              <Sparkles size={24} fill="currentColor" />
            </div>
          </div>
        </div>

        {/* Navigation links with animated LEFT border effect for RTL */}
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
                className={`
                  block p-4 rounded-xl text-base border-2 transition-all duration-400 relative overflow-hidden
                  group
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-500/10 text-blue-500 shadow-md"
                      : `border-transparent hover:border-slate-400/30 hover:bg-slate-400/10 ${
                          theme === "dark"
                            ? "hover:text-[#4952EC]" // Bright blue for dark mode
                            : "hover:text-[#3a42b8]" // Darker blue variant for light mode (better contrast)
                        }`
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

<div className="relative p-4 text-center text-xs sm:text-sm md:text-base lg:text-lg overflow-hidden group">
  {/* قوس قزح کے سات رنگ */}
  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-violet-500 rounded-lg animate-spin-slow opacity-90"></div>
  <div className="relative bg-white rounded-lg p-3 m-[2px] shadow-md transform group-hover:scale-[0.99] transition-transform duration-300">
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-bold">
      Next.js Urdu Series - v1.0
    </div>
    <div className="text-gray-600 text-sm mt-1">
  Zohaib Farooq &copy; Copyright 2026
</div>
  </div>
</div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity"
        ></div>
      )}

      {/* CSS for scrollbar and animations */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3b82f6;
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #3b82f6 transparent;
        }

        /* Rainbow animation for the course title */
        @keyframes rainbowBorder {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 400% 50%;
          }
        }

        /* Left border animation on HOVER (like in the sample code) */
        nav a {
          position: relative;
          overflow: hidden;
        }

        nav a::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background: #4952ec;
          transform: scaleY(0);
          transform-origin: center;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        nav a:hover::before {
          transform: scaleY(1);
        }

        /* Active state with permanent left border */
        nav a.border-blue-500::before {
          transform: scaleY(1);
          background: #3b82f6;
        }

        /* Active state styling */
        nav a.border-blue-500 {
          border-left: 3px solid #3b82f6;
        }
      `}</style>
    </>
  );
}
