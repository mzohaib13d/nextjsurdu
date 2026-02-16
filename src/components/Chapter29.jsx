// Chapter29.jsx - React 19 and Next.js Routing Complete Tutorial
// With Copy Code Button inside at top right and Urdu confirmation message
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RightSidebar from "./RightSidebar";

export default function Chapter29() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeSection, setActiveSection] = useState("react");
  const location = useLocation(); 

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

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("🎉 کوڈ کاپی ہو گیا! بس پیسٹ کریں!");
    setTimeout(() => setCopySuccess(""), 3000);
  };
 // ریسپانسیو چیک
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ہوور ہینڈلرز
  const handleMouseEnter = (e, isDark) => {
    const hoverStyle = isDark ? styles.navLinkHoverDark : styles.navLinkHover;
    Object.assign(e.currentTarget.style, hoverStyle);
  };

  const handleMouseLeave = (e, isDark, isActive) => {
    const baseStyle = isDark ? styles.navLinkDark : styles.navLink;
    const activeStyle = isDark ? styles.navLinkActiveDark : styles.navLinkActive;
    
    Object.assign(e.currentTarget.style, isActive ? activeStyle : baseStyle);
  };
  const SuperSimpleCode = ({ code, title, steps }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-green-600 dark:text-green-400">
          {title}
        </h3>
        <button
          onClick={() => handleCopy(code)}
          className="cursor-pointer px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 active:scale-95"
        >
          📋 کاپی کریں
        </button>
      </div>
      <pre
        dir="ltr"
        className="bg-gray-900 text-green-300 p-4 rounded-xl text-xs overflow-x-auto border-2 border-green-800 dark:border-green-600 text-left"
      >
        {code}
      </pre>
      {steps && (
        <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
          <p className="font-bold text-green-700 dark:text-green-300 mb-1">
            کیسے استعمال کریں:
          </p>
          <ol className="list-decimal pr-6 text-base text-gray-800 dark:text-gray-200">
            {steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );

  const tabs = [
    { id: "react", label: "⚛️ React Router", icon: "🔄" },
    { id: "pages", label: "📄 Pages Router", icon: "📑" },
    { id: "app", label: "🚀 App Router", icon: "⚡" },
    { id: "reference", label: "📚 Quick Reference", icon: "🎯" },
  ];

  return (
    <div
      dir="rtl"
      className={`min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
    >
      {/* Copy Success Message in Urdu */}
      {copySuccess && (
        <div className="fixed top-20 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl font-bold border-l-4 border-yellow-400 animate-bounce">
          {copySuccess}
        </div>
      )}
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={toggleSidebar}
          className="p-3 cursor-pointer rounded-full hover:text-blue-500 transition-all focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <div className="space-y-1">
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}
            ></span>
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}
            ></span>
          </div>
        </button>

        <button
          onClick={toggleTheme}
          className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ لائٹ موڈ"}
        </button>
      </header>
      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />
      <div className="h-14"></div>
      <div className="text-center mb-2">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-l from-orange-500 to-pink-500 pb-2">
          سبق 29: React 19 + Next.js Routing
        </h1>
        <p className="text-sm lg:text-[1.3rem] text-gray-600 dark:text-gray-400">
          React Router • Pages Router • App Router • Quick Reference
        </p>
      </div>
      {/* 👇 ADD THIS NEW DEMO SECTION HERE 👇 */}
      <div className="pt-4 pb-4 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-3 rounded-lg transition-all ${
                activeSection === tab.id
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-bold whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      <main className="pb-20 px-4 max-w-6xl mx-auto">
        
        {/* React Router Section */}
        {activeSection === "react" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                ⚛️ React 19 + React Router Dom
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  Active Link Highlight
                </span>{" "}
                اور{" "}
                <span className="bg-green-200 text-black px-2 py-1 rounded">
                  Slide Animation
                </span>{" "}
                کے ساتھ
              </p>
            </div>

            {/* Installation Section */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                  انسٹالیشن
                </h2>
              </div>

              <SuperSimpleCode
                title="React 19 + React Router Installation"
                code={`📦 React 19 انسٹالیشن اور react-router-dom سیٹ اپ
✅ مرحلہ 1: React 19 پروجیکٹ بنائیں
bash
npm create vite@latest react-router-app -- --template react
cd react-router-app
✅ مرحلہ 2: React Router انسٹال کریں
bash
npm install react-router-dom
✅ مرحلہ 3: پروجیکٹ چلائیں
bash
npm run dev`}
                steps={[
                  "یہ کمانڈز اپنے ٹرمینل میں کاپی کریں",
                  "پہلے React پروجیکٹ بنائیں",
                  "پھر React Router انسٹال کریں",
                  "آخری میں پروجیکٹ چلائیں",
                ]}
              />
            </section>

            {/* Folder Structure */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  فولڈر سٹرکچر
                </h2>
              </div>

              <SuperSimpleCode
                title="Project Structure"
                code={`📁 فولڈر سٹرکچر (React Router)
txt
src/
├── components/
│   ├── Navbar.jsx
│   └── Navbar.css
├── pages/
│   ├── Home.jsx
│   ├── Courses.jsx
│   ├── Teachers.jsx
│   └── Contact.jsx
├── App.jsx
├── main.jsx
└── index.css`}
                steps={[
                  "یہ فولڈر سٹرکچر بنا ئیں",
                  "components فولڈر میں Navbar files ہوں گی",
                  "pages فولڈر میں تمام pages ہوں گے",
                  "App.jsx میں routing سیٹ اپ کریں",
                ]}
              />
            </section>

            {/* Global CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Global Styles (index.css)
                </h2>
              </div>

              <SuperSimpleCode
                title="src/index.css"
                code={`🎨 src/index.css (Global Styles)
css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}`}
                steps={[
                  "src/index.css میں یہ styles شامل کریں",
                  "یہ global styles ہیں پوری app کے لیے",
                  "background gradient ہے",
                ]}
              />
            </section>

            {/* Navbar CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  Navbar.css (Cool Effects)
                </h2>
              </div>

              <SuperSimpleCode
                title="src/components/Navbar.css"
                code={`🧩 src/components/Navbar.css (Cool Effects کے ساتھ)
css
.navbar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
  position: relative;
}

.nav-item {
  position: relative;
}

.nav-link {
  text-decoration: none;
  color: #2d3748;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: block;
  position: relative;
  z-index: 1;
}

/* Active Link Cool Effect */
.nav-link.active {
  color: #4299e1;
  background: rgba(66, 153, 225, 0.1);
}

/* Left Border Animation */
.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  animation: slideBorder 0.3s ease-out;
}

/* Slide Animation for Sidebar (بعد میں استعمال ہوگا) */
@keyframes slideBorder {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}

/* Hover Effect */
.nav-link:hover {
  background: rgba(66, 153, 225, 0.05);
  color: #2c5282;
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .nav-menu {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .nav-link.active::before {
    height: 80%;
  }
}

/* Slide-in Animation for Pages */
.page-enter {
  opacity: 0;
  transform: translateX(30px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 300ms, transform 300ms;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 300ms, transform 300ms;
}`}
                steps={[
                  "components فولڈر میں Navbar.css بنائیں",
                  "یہ styles active link کو highlight کریں گے",
                  "Left border animation ہے",
                  "Page transitions بھی شامل ہیں",
                ]}
              />
            </section>

            <section className="mb-16">
              {/* Header with Lightbulb */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  💡
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-purple-600 to-pink-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-pink-400">
                  📘 Cool Active Link Effect - مکمل اردو وضاحت
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
              </div>

              {/* Main Container with Glow Effect */}
              <div className="relative group">
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-900/50 shadow-xl overflow-hidden">
                  {/* What is this? */}
                  <div className="mb-10 p-6 bg-white dark:bg-gray-800 rounded-2xl border-r-8 border-purple-500 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">🎯</div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        یہ Effect کیا ہے؟
                      </h3>
                    </div>

                    <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">
                      جب بھی کوئی لنک{" "}
                      <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full font-bold mx-1">
                        Active
                      </span>{" "}
                      ہوتا ہے (یعنی اسی صفحے پر ہیں)، تو اس کے بائیں جانب ایک
                      خوبصورت نیلی لکیر آ جاتی ہے۔
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-gray-700 rounded-xl">
                        <span className="text-3xl">1️⃣</span>
                        <span className="font-medium">لکیر بائیں طرف</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-pink-50 dark:bg-gray-700 rounded-xl">
                        <span className="text-3xl">2️⃣</span>
                        <span className="font-medium">
                          اوپر سے نیچے پوری اونچائی
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-50 dark:bg-gray-700 rounded-xl">
                        <span className="text-3xl">3️⃣</span>
                        <span className="font-medium">
                          رنگ بدلتا ہوا (Gradient)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Example */}
                  <div className="mb-10 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                    <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="text-3xl">👁️</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Visual Example - یوں دکھتا ہے
                      </span>
                    </h4>

                    {/* Demo Links */}
                    <div className="space-y-4 max-w-md mx-auto">
                      {/* Normal Link */}
                      <div className="relative p-5 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-gray-300 dark:border-gray-600">
                        <span className="mr-8 text-gray-700 dark:text-gray-300 font-medium block">
                          📄 Normal Link (غیر فعال)
                        </span>
                      </div>

                      {/* Active Link with Border */}
                      <div className="relative p-5 bg-blue-50 dark:bg-gray-700 rounded-xl border-2 border-blue-300 dark:border-blue-800 overflow-hidden">
                        {/* Left Border - The Star of the Show */}
                        <div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-lg animate-border-pulse"
                          style={{
                            height: "100%",
                            boxShadow:
                              "0 0 20px rgba(66, 153, 225, 0.8), 0 0 40px rgba(102, 126, 234, 0.4)",
                          }}
                        ></div>
                        <span className="mr-8 text-blue-700 dark:text-blue-300 font-bold block flex items-center gap-2">
                          <span>🔵 Active Link (فعال)</span>
                          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">
                            ← یہ دیکھیں
                          </span>
                        </span>
                      </div>
                    </div>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                      active link کے بائیں جانب 4px کی نیلی لکیر بنتی ہے
                    </p>
                  </div>

                  {/* CSS Code */}
                  <div className="mb-10">
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">📝</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        CSS Code - یہ ہے اصل جادو
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* CSS Code Block */}
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-5 border-2 border-purple-500/30">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-purple-400 font-mono text-sm">
                              Active Link CSS
                            </span>
                            <button
                              onClick={() =>
                                handleCopy(`.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  animation: slideBorder 0.3s ease-out;
}

@keyframes slideBorder {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}`)
                              }
                              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg font-bold flex items-center gap-1"
                            >
                              <span>📋</span> کاپی کریں
                            </button>
                          </div>
                          <pre className="text-green-300 text-sm font-mono overflow-x-auto leading-relaxed">
                            {`.nav-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  animation: slideBorder 0.3s ease-out;
}

@keyframes slideBorder {
  0% {
    height: 0;
    opacity: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}`}
                          </pre>
                        </div>
                      </div>

                      {/* Line by Line Explanation */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-purple-500">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-purple-600 text-xl">📌</span>
                          <h5 className="font-bold text-gray-900 dark:text-white">
                            لائن بہ لائن وضاحت
                          </h5>
                        </div>

                        <div className="space-y-4">
                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-purple-600 dark:text-purple-400">
                              .nav-link.active::before
                            </code>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              active کلاس والے لنک سے پہلے ایک نیا عنصر بناؤ
                            </p>
                          </div>

                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-purple-600 dark:text-purple-400">
                              content: ''
                            </code>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              عنصر کو خالی رکھو - صرف دکھنے کے لیے ہے
                            </p>
                          </div>

                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-purple-600 dark:text-purple-400">
                              position: absolute
                            </code>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                              عنصر کو لنک کے اندر آزاد کرو
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                left: 0
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                بائیں طرف رکھو
                              </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                top: 50%
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                اوپر سے 50% نیچے
                              </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                translateY(-50%)
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                بالکل درمیان میں لاؤ
                              </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                width: 4px
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                موٹائی 4px
                              </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                height: 100%
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                پوری اونچائی
                              </p>
                            </div>
                            <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                              <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded text-blue-600 dark:text-blue-400">
                                gradient
                              </code>
                              <p className="text-xs text-gray-600 dark:text-gray-400">
                                رنگ بدلتا ہوا
                              </p>
                            </div>
                          </div>

                          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                            <p className="text-sm font-medium text-purple-800 dark:text-purple-300">
                              <span className="font-bold">✨ نتیجہ:</span> ایک
                              خوبصورت لکیر جو active ہونے پر اوپر سے نیچے پھیلتی
                              ہے
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Animation Keyframes */}
                  <div className="mb-10 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900">
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">⚡</span>
                      <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        Animation - کیسے کام کرتی ہے؟
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl text-center">
                        <div className="text-4xl mb-2 text-red-500">0%</div>
                        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-0 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          height: 0 (چھپی ہوئی)
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl text-center">
                        <div className="text-4xl mb-2 text-yellow-500">50%</div>
                        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          height: 70% (آدھی)
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl text-center">
                        <div className="text-4xl mb-2 text-green-500">100%</div>
                        <div className="w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          height: 100% (مکمل)
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-4">
                      <pre className="text-green-300 text-sm font-mono">
                        {`@keyframes slideBorder {
  0% {
    height: 0;      /* شروع میں پوشیدہ */
    opacity: 0;
  }
  100% {
    height: 100%;   /* آخر میں مکمل */
    opacity: 1;
  }
}`}
                      </pre>
                      <p className="text-yellow-400 text-xs mt-2">
                        *یہ animation 0.3 سیکنڈ میں مکمل ہوتی ہے*
                      </p>
                    </div>
                  </div>

                  {/* Practical Example with JSX */}
                  <div className="mb-10 p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900">
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">💻</span>
                      <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        React/Next.js میں استعمال
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* React Router */}
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border-l-8 border-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">⚛️</span>
                          <span className="font-bold">React Router</span>
                        </div>
                        <pre className="text-xs bg-gray-900 text-green-300 p-3 rounded-lg overflow-x-auto">
                          {`<NavLink 
  to="/"
  className={({isActive}) => 
    isActive ? 'nav-link active' : 'nav-link'
  }
>
  Home
</NavLink>`}
                        </pre>
                      </div>

                      {/* Pages Router */}
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border-l-8 border-purple-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">📄</span>
                          <span className="font-bold">Pages Router</span>
                        </div>
                        <pre className="text-xs bg-gray-900 text-green-300 p-3 rounded-lg overflow-x-auto">
                          {`<Link 
  href="/"
  className={\`nav-link \${router.pathname === '/' ? 'active' : ''}\`}
>
  Home
</Link>`}
                        </pre>
                      </div>

                      {/* App Router */}
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border-l-8 border-green-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">🚀</span>
                          <span className="font-bold">App Router</span>
                        </div>
                        <pre className="text-xs bg-gray-900 text-green-300 p-3 rounded-lg overflow-x-auto">
                          {`<Link 
  href="/"
  className={\`nav-link \${pathname === '/' ? 'active' : ''}\`}
>
  Home
</Link>`}
                        </pre>
                      </div>
                    </div>

                    <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                      تینوں routers میں بس active لگنے کا طریقہ مختلف ہے، CSS
                      ایک جیسی ہے
                    </p>
                  </div>

                  {/* Key Points Table */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-800 rounded-xl text-center">
                      <span className="text-3xl block mb-2">📍</span>
                      <span className="font-bold text-sm">
                        position: absolute
                      </span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-xl text-center">
                      <span className="text-3xl block mb-2">📏</span>
                      <span className="font-bold text-sm">width: 4px</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-gray-700 dark:to-gray-800 rounded-xl text-center">
                      <span className="text-3xl block mb-2">📐</span>
                      <span className="font-bold text-sm">height: 100%</span>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-orange-100 to-red-100 dark:from-gray-700 dark:to-gray-800 rounded-xl text-center">
                      <span className="text-3xl block mb-2">🌈</span>
                      <span className="font-bold text-sm">gradient</span>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl">✨</span>
                      <h4 className="text-3xl font-bold">خلاصہ</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                        <p className="text-2xl font-bold mb-2">🎯 مقصد</p>
                        <p className="text-lg">
                          صارف کو بتانا کہ وہ کس صفحے پر ہے
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                        <p className="text-2xl font-bold mb-2">⚙️ طریقہ</p>
                        <p className="text-lg">::before سے مصنوعی border</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                        <p className="text-2xl font-bold mb-2">⏱️ وقت</p>
                        <p className="text-lg">0.3 سیکنڈ میں سلائیڈ</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6">
                        <p className="text-2xl font-bold mb-2">🌈 رنگ</p>
                        <p className="text-lg">نیلا → ہلکا نیلا (gradient)</p>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-white/20 backdrop-blur-lg rounded-xl text-center">
                      <p className="text-2xl font-bold">
                        یہ Effect ویب سائٹ کو پیشہ ورانہ لک دیتا ہے
                      </p>
                    </div>
                  </div>

                  {/* Teacher's Note */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-4 border-amber-300 dark:border-amber-700">
                    <div className="flex items-center gap-4">
                      <span className="text-6xl">👨‍🏫</span>
                      <div>
                        <p className="text-2xl font-bold text-amber-800 dark:text-amber-300 mb-2">
                          استاد کا نوٹ:
                        </p>
                        <p className="text-xl text-gray-800 dark:text-gray-200">
                          "یہ سمجھ گئے تو React/Next.js میں Active Link
                          Highlighting آ گئی۔ باقی بس practice ہے۔"
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Final Tip */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <span className="px-4 py-2 bg-blue-200 dark:bg-blue-900/40 rounded-full text-blue-800 dark:text-blue-300">
                      ⚡ active کلاس لگانا
                    </span>
                    <span className="px-4 py-2 bg-purple-200 dark:bg-purple-900/40 rounded-full text-purple-800 dark:text-purple-300">
                      🎯 ::before pseudo-element
                    </span>
                    <span className="px-4 py-2 bg-pink-200 dark:bg-pink-900/40 rounded-full text-pink-800 dark:text-pink-300">
                      ✨ animation
                    </span>
                    <span className="px-4 py-2 bg-indigo-200 dark:bg-indigo-900/40 rounded-full text-indigo-800 dark:text-indigo-300">
                      📱 responsive
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Navbar Component */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Navbar Component (Active Link Logic)
                </h2>
              </div>

              <SuperSimpleCode
                title="src/components/Navbar.jsx"
                code={`🧩 src/components/Navbar.jsx (Active Link Logic)
jsx
import { NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/courses" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Courses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/teachers" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Teachers
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}`}
                steps={[
                  "components/Navbar.jsx بنائیں",
                  "NavLink استعمال کریں React Router سے",
                  "isActive prop سے active class لگائیں",
                  "end prop home page کے لیے ضروری ہے",
                ]}
              />
            </section>

            {/* Home Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  6
                </div>
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  Home Page
                </h2>
              </div>

              <SuperSimpleCode
                title="src/pages/Home.jsx"
                code={`📄 src/pages/Home.jsx
jsx
export default function Home() {
  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
      animation: 'slideIn 0.5s ease'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '20px'
      }}>
        🚀 Bright Future Academy
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px',
        marginTop: '30px'
      }}>
        <div style={{
          padding: '25px',
          background: '#f7fafc',
          borderRadius: '12px',
          transition: 'transform 0.3s',
          cursor: 'pointer',
          ':hover': { transform: 'translateY(-5px)' }
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>📚 Quality Education</h3>
          <p style={{ color: '#718096' }}>Learn from industry experts with 10+ years experience</p>
        </div>
        
        <div style={{
          padding: '25px',
          background: '#f7fafc',
          borderRadius: '12px'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>🎯 Practical Learning</h3>
          <p style={{ color: '#718096' }}>Hands-on projects and real-world applications</p>
        </div>
        
        <div style={{
          padding: '25px',
          background: '#f7fafc',
          borderRadius: '12px'
        }}>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>⏰ Flexible Schedule</h3>
          <p style={{ color: '#718096' }}>Learn at your own pace with lifetime access</p>
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/Home.jsx بنائیں",
                  "یہ home page کا مواد ہے",
                  "Gradient text اور cards ہیں",
                  "Animation بھی شامل ہے",
                ]}
              />
            </section>

            {/* Courses Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  Courses Page
                </h2>
              </div>

              <SuperSimpleCode
                title="src/pages/Courses.jsx"
                code={`📄 src/pages/Courses.jsx
jsx
export default function Courses() {
  const courses = [
    { id: 1, name: 'Web Development', duration: '6 months', students: 1200, rating: 4.8 },
    { id: 2, name: 'React & Next.js', duration: '4 months', students: 850, rating: 4.9 },
    { id: 3, name: 'Backend Development', duration: '5 months', students: 600, rating: 4.7 },
    { id: 4, name: 'Mobile App Development', duration: '6 months', students: 750, rating: 4.8 },
  ];

  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        color: '#2d3748',
        marginBottom: '30px',
        borderBottom: '4px solid #4299e1',
        paddingBottom: '15px',
        display: 'inline-block'
      }}>
        📖 Our Courses
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px'
      }}>
        {courses.map(course => (
          <div
            key={course.id}
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 100%)',
              borderRadius: '16px',
              padding: '25px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(66, 153, 225, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3 style={{ color: '#2d3748', fontSize: '1.5rem', marginBottom: '15px' }}>
              {course.name}
            </h3>
            <p style={{ color: '#718096', marginBottom: '10px' }}>
              ⏱️ Duration: {course.duration}
            </p>
            <p style={{ color: '#718096', marginBottom: '10px' }}>
              👥 Students: {course.students}+
            </p>
            <p style={{ color: '#f6ad55', fontWeight: 'bold' }}>
              ⭐ {course.rating}/5.0
            </p>
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              background: '#4299e1',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '0 16px 0 16px',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}>
              Popular
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/Courses.jsx بنائیں",
                  "courses array سے data map کریں",
                  "Hover effects ہیں",
                  "Popular badge بھی ہے",
                ]}
              />
            </section>

            {/* Teachers Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  8
                </div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  Teachers Page
                </h2>
              </div>

              <SuperSimpleCode
                title="src/pages/Teachers.jsx"
                code={`📄 src/pages/Teachers.jsx
jsx
export default function Teachers() {
  const teachers = [
    { id: 1, name: 'Dr. Sarah Ahmed', subject: 'Web Development', experience: '12 years', image: '👩🏫' },
    { id: 2, name: 'Prof. Ali Raza', subject: 'React & Next.js', experience: '8 years', image: '👨🏫' },
    { id: 3, name: 'Ms. Fatima Khan', subject: 'Backend Development', experience: '10 years', image: '👩💼' },
    { id: 4, name: 'Mr. Usman Malik', subject: 'Mobile Apps', experience: '7 years', image: '👨💻' },
  ];

  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        color: '#2d3748',
        marginBottom: '30px'
      }}>
        👨🏫 Expert Teachers
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px'
      }}>
        {teachers.map(teacher => (
          <div
            key={teacher.id}
            style={{
              textAlign: 'center',
              padding: '30px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '20px',
              color: 'white',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              fontSize: '4rem',
              marginBottom: '15px'
            }}>
              {teacher.image}
            </div>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '10px'
            }}>
              {teacher.name}
            </h3>
            <p style={{
              background: 'rgba(255,255,255,0.2)',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              marginBottom: '10px'
            }}>
              {teacher.subject}
            </p>
            <p style={{
              marginTop: '10px',
              opacity: 0.9
            }}>
              ⏳ {teacher.experience}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/Teachers.jsx بنائیں",
                  "teachers array سے data map کریں",
                  "Gradient backgrounds ہیں",
                  "Scale animation on hover",
                ]}
              />
            </section>

            {/* Contact Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  9
                </div>
                <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  Contact Page with Form
                </h2>
              </div>

              <SuperSimpleCode
                title="src/pages/Contact.jsx"
                code={`📄 src/pages/Contact.jsx (Real Look)
jsx
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent successfully! We will contact you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div style={{
      background: 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem',
        color: '#2d3748',
        marginBottom: '10px'
      }}>
        📞 Contact Us
      </h1>
      
      <p style={{
        color: '#718096',
        fontSize: '1.1rem',
        marginBottom: '40px'
      }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px'
      }}>
        {/* Contact Form */}
        <form onSubmit={handleSubmit} style={{
          background: '#f7fafc',
          padding: '30px',
          borderRadius: '16px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#4a5568',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="John Doe"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#4a5568',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="john@example.com"
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#4a5568',
              fontWeight: '600',
              marginBottom: '8px'
            }}>
              Message
            </label>
            <textarea
              required
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                resize: 'vertical'
              }}
              onFocus={(e) => e.target.style.borderColor = '#4299e1'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="Your message here..."
            />
          </div>
          
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Send Message
          </button>
        </form>
        
        {/* Contact Info */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '30px',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h3 style={{
            fontSize: '1.8rem',
            marginBottom: '30px',
            borderBottom: '2px solid rgba(255,255,255,0.3)',
            paddingBottom: '15px'
          }}>
            Get in Touch
          </h3>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>📍</span>
              <div>
                <h4 style={{ marginBottom: '5px', fontWeight: '600' }}>Address</h4>
                <p style={{ opacity: 0.9 }}>123 Education Street, Tech City, 12345</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>📞</span>
              <div>
                <h4 style={{ marginBottom: '5px', fontWeight: '600' }}>Phone</h4>
                <p style={{ opacity: 0.9 }}>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>✉️</span>
              <div>
                <h4 style={{ marginBottom: '5px', fontWeight: '600' }}>Email</h4>
                <p style={{ opacity: 0.9 }}>info@academy.com</p>
              </div>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem', marginRight: '15px' }}>⏰</span>
              <div>
                <h4 style={{ marginBottom: '5px', fontWeight: '600' }}>Working Hours</h4>
                <p style={{ opacity: 0.9 }}>Mon-Fri: 9:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          
          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '1.1rem', fontWeight: '600' }}>
              🎓 Join 5000+ successful students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/Contact.jsx بنائیں",
                  "useState سے form data handle کریں",
                  "Two column layout ہے",
                  "Form اور contact info دونوں sides پر",
                ]}
              />
            </section>

            {/* App.jsx */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  10
                </div>
                <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  App.jsx - Main Router
                </h2>
              </div>

              <SuperSimpleCode
                title="src/App.jsx"
                code={`🧩 src/App.jsx
jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Teachers from './pages/Teachers';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;`}
                steps={[
                  "src/App.jsx میں routing سیٹ اپ کریں",
                  "BrowserRouter سے wrap کریں",
                  "Routes اور Route components استعمال کریں",
                  "Navbar سب pages پر common ہے",
                ]}
              />
            </section>

            {/* main.jsx */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold">
                  11
                </div>
                <h2 className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  main.jsx - Entry Point
                </h2>
              </div>

              <SuperSimpleCode
                title="src/main.jsx"
                code={`🎯 src/main.jsx
jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`}
                steps={[
                  "src/main.jsx میں App render کریں",
                  "index.css import کریں",
                  "React.StrictMode میں wrap کریں",
                ]}
              />
            </section>
          </section>
        )}

        {/* Pages Router Section */}
        {activeSection === "pages" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple-600 dark:text-purple-400">
                📄 Next.js Pages Router
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  Active Link Highlight
                </span>{" "}
                اور{" "}
                <span className="bg-green-200 text-black px-2 py-1 rounded">
                  Cool Sidebar Animation
                </span>{" "}
                کے ساتھ
              </p>
            </div>

            {/* Pages Router Installation */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  Pages Router Installation
                </h2>
              </div>

              <SuperSimpleCode
                title="Next.js Pages Router Installation"
                code={`🎯 حصہ دوم: Next.js Pages Router
Active Link Highlight + Cool Sidebar Animation
________________________________________
📦 Next.js Pages Router انسٹالیشن
bash
npx create-next-app@latest nextjs-pages-router -- --js --no-tailwind --eslint
cd nextjs-pages-router
جب سوال آئے:
•	TypeScript → No
•	App Router → No (Pages Router چاہیے)
bash
npm run dev`}
                steps={[
                  "یہ کمانڈ چلائیں",
                  "TypeScript کے لیے No کریں",
                  "App Router کے لیے No کریں (Pages Router کے لیے)",
                  "npm run dev سے پروجیکٹ چلائیں",
                ]}
              />
            </section>

            {/* Pages Router Folder Structure */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  Pages Router Folder Structure
                </h2>
              </div>

              <SuperSimpleCode
                title="Pages Router Structure"
                code={`📁 فولڈر سٹرکچر (Pages Router)
txt
pages/
├── index.js
├── courses.js
├── teachers.js
├── contact.js
├── _app.js
components/
├── Sidebar.js
├── Sidebar.css
styles/
├── globals.css
public/
└── images/`}
                steps={[
                  "pages فولڈر میں تمام pages کی files",
                  "_app.js سب pages کو wrap کرتا ہے",
                  "components فولڈر میں Sidebar",
                  "styles فولڈر میں globals.css",
                ]}
              />
            </section>

            {/* Pages Router Global CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  styles/globals.css
                </h2>
              </div>

              <SuperSimpleCode
                title="styles/globals.css"
                code={`🎨 styles/globals.css
css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* Slide Animation for Sidebar */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}

.sidebar-slide-in {
  animation: slideIn 0.5s ease-out forwards;
}

.sidebar-slide-out {
  animation: slideOut 0.5s ease-out forwards;
}

.content-area {
  flex: 1;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 20px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Page Transitions */
.page-enter {
  opacity: 0;
  transform: translateX(30px);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 0.4s, transform 0.4s;
}

/* Responsive */
@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  
  .content-area {
    margin: 10px;
    padding: 20px;
  }
}`}
                steps={[
                  "styles/globals.css میں یہ styles شامل کریں",
                  "Sidebar animations ہیں",
                  "Page transitions بھی ہیں",
                  "Responsive design ہے",
                ]}
              />
            </section>

            {/* Sidebar CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                  components/Sidebar.css
                </h2>
              </div>

              <SuperSimpleCode
                title="components/Sidebar.css"
                code={`🎨 components/Sidebar.css (Cool Active Link Effect)
css
.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.sidebar-header h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 5px;
}

.sidebar-header p {
  color: #718096;
  font-size: 0.9rem;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.sidebar-link span {
  margin-right: 12px;
  font-size: 1.2rem;
}

/* Cool Active Link Effect - Left Border Animation */
.sidebar-link.active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(102, 126, 234, 0.05) 100%);
  color: #4299e1;
  font-weight: 600;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  animation: expandBorder 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.5);
}

@keyframes expandBorder {
  0% {
    height: 0;
    opacity: 0;
  }
  50% {
    height: 70%;
    opacity: 0.8;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}

/* Hover Effect */
.sidebar-link:hover {
  background: rgba(66, 153, 225, 0.08);
  transform: translateX(5px);
  color: #2c5282;
}

.sidebar-link:hover span {
  transform: scale(1.1);
}

/* Sidebar Footer */
.sidebar-footer {
  margin-top: auto;
  padding-top: 30px;
  border-top: 2px solid #e2e8f0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details h4 {
  color: #2d3748;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.user-details p {
  color: #718096;
  font-size: 0.8rem;
}

/* Toggle Button for Mobile */
.sidebar-toggle {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
  background: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  color: #4a5568;
}

@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    box-shadow: 20px 0 40px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
  
  .sidebar-toggle {
    display: block;
  }
}`}
                steps={[
                  "components/Sidebar.css بنائیں",
                  "Active link پر left border animation ہے",
                  "Hover effects ہیں",
                  "Mobile responsive بھی ہے",
                ]}
              />
            </section>

            {/* Sidebar Component */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Sidebar Component (useRouter)
                </h2>
              </div>

              <SuperSimpleCode
                title="components/Sidebar.js"
                code={`🧩 components/Sidebar.js (Slide Animation + Active Link)
jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const navItems = [
    { href: '/', icon: '🏠', label: 'Dashboard' },
    { href: '/courses', icon: '📚', label: 'Courses' },
    { href: '/teachers', icon: '👨🏫', label: 'Teachers' },
    { href: '/contact', icon: '📞', label: 'Contact' },
  ];

  const isActive = (path) => {
    if (path === '/') {
      return router.pathname === path;
    }
    return router.pathname.startsWith(path);
  };

  // Slide animation on mount
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <button 
        className={\`sidebar-toggle \${isOpen ? 'open' : ''}\`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={\`sidebar \${isOpen ? 'open' : ''} \${isAnimating ? 'sidebar-slide-in' : ''}\`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Bright Future Academy</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={\`sidebar-link \${isActive(item.href) ? 'active' : ''}\`}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div className="user-details">
              <h4>Admin User</h4>
              <p>admin@academy.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}`}
                steps={[
                  "components/Sidebar.js بنائیں",
                  "useRouter سے current path پتہ کریں",
                  "isActive function سے active link چیک کریں",
                  "Mobile toggle بھی ہے",
                ]}
              />
            </section>

            {/* Sidebar Explanation */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  6
                </div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  📘 Pages Router Sidebar - مکمل اردو وضاحت
                </h2>
              </div>

              <SuperSimpleCode
                title="فرق سمجھیں: App Router vs Pages Router"
                code={`📘 Pages Router Sidebar Component - مکمل اردو وضاحت
فرق سمجھیں: App Router vs Pages Router
________________________________________
🎯 یہ Component کیا ہے؟
یہ Pages Router والا Sidebar ہے۔ پہلے جو Component آپ نے دیکھا وہ App Router کے لیے تھا۔
فرق صرف اتنا ہے:
•	App Router میں usePathname() استعمال ہوتا ہے
•	Pages Router میں useRouter() استعمال ہوتا ہے
باقی سب کچھ بالکل ویسا ہی ہے۔
________________________________________
📝 لائن بہ لائن وضاحت
لائن 1-4: Import Statements
jsx
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import './Sidebar.css';
سیدھی بات:
Import	کام
Link	لنک بنانے کے لیے (بغیر پیج ریفریش کے)
useRouter	Pages Router کا خاص ہک - Current URL بتاتا ہے
useState	چیزیں یاد رکھنے کے لیے (مینو کھلا ہے یا بند)
useEffect	ایک بار کام کرنے کے لیے (اینیمیشن)
./Sidebar.css	خوبصورتی والی فائل
________________________________________
لائن 6: Component Definition
jsx
export default function Sidebar() {
سیدھی بات:
•	export default - یہ فنکشن باہر استعمال کر سکتے ہیں
•	Sidebar - اس Component کا نام
________________________________________
لائن 7: useRouter Hook
jsx
const router = useRouter();
سیدھی بات:
•	useRouter() - Pages Router میں current URL جاننے کا طریقہ
•	router.pathname - ابھی کونسا صفحہ کھلا ہے (مثلاً /courses)
فرق یاد رکھیں:
•	✅ App Router: usePathname()
•	✅ Pages Router: useRouter().pathname
________________________________________
لائن 8-9: State Variables
jsx
const [isOpen, setIsOpen] = useState(false);
const [isAnimating, setIsAnimating] = useState(false);
سیدھی بات:
Variable	کام	شروع میں
isOpen	موبائل میں مینو کھلا ہے یا بند؟	false (بند ہے)
isAnimating	اینیمیشن چل رہی ہے؟	false (نہیں چل رہی)
________________________________________
لائن 11-16: NavItems Array
jsx
const navItems = [
  { href: '/', icon: '🏠', label: 'Dashboard' },
  { href: '/courses', icon: '📚', label: 'Courses' },
  { href: '/teachers', icon: '👨🏫', label: 'Teachers' },
  { href: '/contact', icon: '📞', label: 'Contact' },
];
سیدھی بات:
•	یہ ہے ہمارا مینو
•	4 آئٹمز ہیں
•	ہر آئٹم میں:
o	href - کہاں جائے گا
o	icon - کونسا ایموجی
o	label - کیا لکھا ہوگا
________________________________________
لائن 18-22: isActive Function
jsx
const isActive = (path) => {
  if (path === '/') {
    return router.pathname === path;
  }
  return router.pathname.startsWith(path);
};
سیدھی بات:
یہ چیک کرتا ہے کہ یہ لنک Active ہے یا نہیں
دو حالات:
1.	ہوم پیج (/) کے لیے:
o	بالکل برابر ہونا چاہیے
o	router.pathname === '/'
2.	باقی صفحات کے لیے:
o	شروع میں یہ لنک آئے تو Active
o	مثال: /courses/123 بھی /courses کو Active کرے
________________________________________
لائن 25-30: useEffect Animation
jsx
useEffect(() => {
  setIsAnimating(true);
  const timer = setTimeout(() => setIsAnimating(false), 500);
  return () => clearTimeout(timer);
}, []);
سیدھی بات:
•	یہ کام صرف 1 بار ہوگا - جب Component پہلی بار لوڈ ہو
•	اسٹیپ 1: setIsAnimating(true) - اینیمیشن شروع کرو
•	اسٹیپ 2: 500ms (آدھے سیکنڈ) بعد اینیمیشن بند کرو
•	اسٹیپ 3: اگر Component غائب ہو جائے تو ٹائمر صاف کرو
________________________________________
لائن 32-39: Mobile Toggle Button
jsx
<button 
  className={\`sidebar-toggle \${isOpen ? 'open' : ''}\`}
  onClick={() => setIsOpen(!isOpen)}
>
  {isOpen ? '✕' : '☰'}
</button>
سیدھی بات:
className:
•	ہمیشہ sidebar-toggle کلاس رہے گی
•	اگر isOpen = true تو open کلاس بھی شامل ہوگی
onClick:
•	مینو کھلا ہے تو بند کرو
•	مینو بند ہے تو کھولو
Button Text:
•	مینو کھلا ہے تو ✕ (Close)
•	مینو بند ہے تو ☰ (Hamburger)
________________________________________
لائن 41: Main Sidebar
jsx
<aside className={\`sidebar \${isOpen ? 'open' : ''} \${isAnimating ? 'sidebar-slide-in' : ''}\`}>
سیدھی بات:
یہاں تین کلاسز ہو سکتی ہیں:
کلاس	کب آئے گی
sidebar	ہمیشہ (بنیادی کلاس)
open	جب isOpen = true (موبائل میں مینو کھلا ہو)
sidebar-slide-in	جب isAnimating = true (شروع میں اینیمیشن)
________________________________________
لائن 42-45: Sidebar Header
jsx
<div className="sidebar-header">
  <h2>Admin Panel</h2>
  <p>Bright Future Academy</p>
</div>
سیدھی بات:
•	اوپر والا حصہ
•	بڑی ہیڈنگ: "Admin Panel"
•	چھوٹی ہیڈنگ: "Bright Future Academy"
________________________________________
لائن 47-57: Navigation Links
jsx
<nav className="sidebar-nav">
  {navItems.map((item) => (
    <Link
      key={item.href}
      href={item.href}
      className={\`sidebar-link \${isActive(item.href) ? 'active' : ''}\`}
      onClick={() => setIsOpen(false)}
    >
      <span>{item.icon}</span>
      {item.label}
    </Link>
  ))}
</nav>
سیدھی بات:
یہ لوپ ہے - 4 بار چلے گا، ہر بار ایک لنک بنائے گا
ہر لنک میں:
پراپرٹی	کام
key	React کو پہچاننے کے لیے
href	کہاں جائے گا
className	اگر Active ہے تو active کلاس بھی شامل ہوگی
onClick	لنک دبائیں تو موبائل مینو بند ہو جائے
اندر:
•	<span> میں آئیکن (🏠, 📚, وغیرہ)
•	اس کے بعد لیبل (Dashboard, Courses, وغیرہ)
________________________________________
لائن 59-69: Sidebar Footer
jsx
<div className="sidebar-footer">
  <div className="user-info">
    <div className="user-avatar">AD</div>
    <div className="user-details">
      <h4>Admin User</h4>
      <p>admin@academy.com</p>
    </div>
  </div>
</div>
سیدھی بات:
•	سب سے نیچے والا حصہ
•	Avatar - "AD" (Admin کے پہلے دو حروف)
•	نام - "Admin User"
•	ای میل - "admin@academy.com"
________________________________________
🆚 بڑا فرق: App Router vs Pages Router
App Router والا Sidebar:
jsx
import { usePathname } from 'next/navigation';  // فرق یہ ہے
const pathname = usePathname();                  // فرق یہ ہے

const isActive = (href) => {
  if (href === '/') {
    return pathname === href;                     // یہاں pathname
  }
  return pathname.startsWith(href);               // یہاں pathname
};
Pages Router والا Sidebar:
jsx
import { useRouter } from 'next/router';         // فرق یہ ہے
const router = useRouter();                       // فرق یہ ہے

const isActive = (path) => {
  if (path === '/') {
    return router.pathname === path;               // یہاں router.pathname
  }
  return router.pathname.startsWith(path);         // یہاں router.pathname
};
________________________________________
📊 دونوں میں فرق ٹیبل کی شکل میں
فیچر	App Router	Pages Router
Import	from 'next/navigation'	from 'next/router'
Hook	usePathname()	useRouter()
Current URL	pathname	router.pathname
شروع میں	'use client' لکھنا ہوتا ہے	'use client' نہیں لکھتے
________________________________________
🎯 Pages Router Sidebar - مکمل کام
یہ Sidebar کیا کرتا ہے؟
1.	Desktop پر - ہمیشہ کھلا رہتا ہے (بائیں طرف)
2.	Mobile پر - بٹن دبائیں تو کھلتا ہے، دبائیں تو بند
3.	Active Link - جس صفحے پر ہیں، وہ نمایاں
4.	Animation - پہلی بار کھلے تو سلائیڈ ان
5.	User Info - نیچے ایڈمن کا نام اور ای میل
________________________________________
✅ یاد رکھنے کی باتیں
1. useRouter
Pages Router میں current URL جاننے کا طریقہ
jsx
const router = useRouter();
console.log(router.pathname); // مثلاً "/courses"
2. isActive Function
چیک کرتا ہے کونسا لنک Active ہے
jsx
className={\`sidebar-link \${isActive('/courses') ? 'active' : ''}\`}
3. Mobile Menu
jsx
<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? '✕' : '☰'}
</button>
4. Animation
jsx
useEffect(() => {
  setIsAnimating(true);
  setTimeout(() => setIsAnimating(false), 500);
}, []);
________________________________________
🏁 آخر میں
استاد کی نصیحت:
"Pages Router اور App Router میں صرف ایک لائن کا فرق ہے۔
•	ایک میں useRouter استعمال ہوتا ہے
•	دوسرے میں usePathname استعمال ہوتا ہے
باقی سارا کوڈ ایک جیسا ہے۔"`}
                steps={[
                  "یہ مکمل اردو وضاحت ہے",
                  "App Router اور Pages Router کا فرق سمجھیں",
                  "ہر لائن کی تفصیل پڑھیں",
                  "عملی طور پر سمجھنے کی کوشش کریں",
                ]}
              />
            </section>

            {/* _app.js */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  pages/_app.js - Layout
                </h2>
              </div>

              <SuperSimpleCode
                title="pages/_app.js"
                code={`🧠 pages/_app.js
jsx
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="content-area">
        <Component {...pageProps} />
      </main>
    </div>
  );
}`}
                steps={[
                  "pages/_app.js میں یہ layout بنائیں",
                  "Sidebar کو include کریں",
                  "Component سے current page render ہوگا",
                  "pageProps میں page کے props ہوں گے",
                ]}
              />
            </section>

            {/* Dashboard Page (app/page.js) */}
            {/* Dashboard Explanation - Beautiful Urdu Explanation UI */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                  📘
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-l from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
                  Dashboard Page - مکمل اردو وضاحت
                </h2>
              </div>

              {/* Main Explanation Card */}
              <div className="relative group">
                {/* Rainbow Border Animation */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 animate-rainbow-border"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-orange-200 dark:border-orange-900/50 overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 dark:opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full filter blur-3xl"></div>
                  </div>

                  {/* Content */}
                  <div className="relative space-y-8">
                    {/* Title with Icon */}
                    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-r-8 border-orange-500">
                      <div className="text-6xl animate-bounce">🎯</div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                          یہ صفحہ کیا ہے؟
                        </h3>
                        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                          یہ{" "}
                          <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full font-bold">
                            ایڈمن پینل کا ہوم پیج
                          </span>{" "}
                          ہے۔ جب بھی کوئی ایڈمن ویب سائٹ کھولے گا، سب سے پہلے
                          یہی صفحہ دیکھے گا۔
                        </p>
                      </div>
                    </div>

                    {/* Two Column Layout for Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-l-8 border-blue-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-4xl">1️⃣</div>
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                            اعداد و شمار
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-lg pr-8">
                          اوپر والے 4 باکسز میں پوری اکیڈمی کا خلاصہ
                        </p>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-l-8 border-green-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="text-4xl">2️⃣</div>
                          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                            حالیہ سرگرمیاں
                          </h4>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-lg pr-8">
                          نیچے والی لسٹ میں بتایا گیا ہے کہ کیا کیا ہو رہا ہے
                        </p>
                      </div>
                    </div>

                    {/* Line by Line Explanation */}
                    <div className="space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 pb-4 border-b-2 border-orange-200 dark:border-orange-800">
                        <span className="text-4xl">📝</span>
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          لائن بہ لائن وضاحت
                        </span>
                      </h3>

                      {/* Component Definition */}
                      <div className="relative group/card">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-green-200 dark:border-green-900">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                              1
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3 flex items-center gap-2">
                                <span>Component Definition</span>
                                <span className="text-sm bg-green-100 dark:bg-green-900/40 px-3 py-1 rounded-full">
                                  لائن 1
                                </span>
                              </h4>
                              <div className="bg-gray-900 rounded-xl p-4 font-mono text-green-300 text-lg mb-4 border-l-8 border-green-500">
                                export default function Dashboard() {"{"}
                              </div>
                              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-base pr-4">
                                <p className="flex items-start gap-3">
                                  <span className="text-green-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-green-600">
                                      export default
                                    </span>{" "}
                                    - یہ فنکشن دوسری جگہوں پر استعمال کر سکتے
                                    ہیں
                                  </span>
                                </p>
                                <p className="flex items-start gap-3">
                                  <span className="text-green-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-green-600">
                                      Dashboard
                                    </span>{" "}
                                    - اس صفحہ کا نام
                                  </span>
                                </p>
                                <p className="flex items-start gap-3">
                                  <span className="text-green-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-green-600">
                                      {"() {"}
                                    </span>{" "}
                                    - فنکشن شروع ہو رہا ہے
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Return Statement */}
                      <div className="relative group/card">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-blue-200 dark:border-blue-900">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                              2
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-2">
                                <span>Return Statement</span>
                                <span className="text-sm bg-blue-100 dark:bg-blue-900/40 px-3 py-1 rounded-full">
                                  لائن 2
                                </span>
                              </h4>
                              <div className="bg-gray-900 rounded-xl p-4 font-mono text-green-300 text-lg mb-4 border-l-8 border-blue-500">
                                return (
                              </div>
                              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-base pr-4">
                                <p className="flex items-start gap-3">
                                  <span className="text-blue-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-blue-600">
                                      return
                                    </span>{" "}
                                    - یہ بتاتا ہے کہ اسکرین پر کیا دکھانا ہے
                                  </span>
                                </p>
                                <p className="flex items-start gap-3">
                                  <span className="text-blue-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-blue-600">
                                      (
                                    </span>{" "}
                                    - JSX شروع ہو رہا ہے (HTML جیسی زبان)
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Container */}
                      <div className="relative group/card">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl border-2 border-purple-200 dark:border-purple-900">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                              3
                            </div>
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3 flex items-center gap-2">
                                <span>Main Container</span>
                                <span className="text-sm bg-purple-100 dark:bg-purple-900/40 px-3 py-1 rounded-full">
                                  لائن 3
                                </span>
                              </h4>
                              <div className="bg-gray-900 rounded-xl p-4 font-mono text-green-300 text-lg mb-4 border-l-8 border-purple-500">
                                {'<div className="page-enter">'}
                              </div>
                              <div className="space-y-3 text-gray-700 dark:text-gray-300 text-base pr-4">
                                <p className="flex items-start gap-3">
                                  <span className="text-purple-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-purple-600">
                                      {"<div>"}
                                    </span>{" "}
                                    - ایک ڈبہ ہے
                                  </span>
                                </p>
                                <p className="flex items-start gap-3">
                                  <span className="text-purple-600 font-bold text-xl">
                                    •
                                  </span>
                                  <span>
                                    <span className="font-bold text-purple-600">
                                      className="page-enter"
                                    </span>{" "}
                                    - یہ CSS کلاس ہے
                                  </span>
                                </p>
                                <p className="flex items-start gap-3 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-xl">
                                  <span className="text-purple-600 font-bold text-2xl">
                                    ✨
                                  </span>
                                  <span className="font-medium">
                                    یہ کلاس کیا کرتی ہے؟ جب یہ صفحہ کھلے تو
                                    آہستہ آہستہ اندر آئے (Animation)
                                  </span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats Cards Explanation */}
                    <div className="mt-8 space-y-6">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 pb-4 border-b-2 border-orange-200 dark:border-orange-800">
                        <span className="text-4xl">📊</span>
                        <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          Stats Cards - اعداد و شمار
                        </span>
                      </h3>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Grid Container */}
                        <div className="p-5 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-8 border-amber-500 hover:shadow-xl transition-all">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">📐</span>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              Grid Container
                            </h4>
                            <span className="text-xs bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-full">
                              لائن 19-24
                            </span>
                          </div>
                          <div className="bg-gray-900 p-3 rounded-lg font-mono text-xs text-green-300 mb-3 overflow-x-auto">
                            display: 'grid',
                            <br />
                            gridTemplateColumns: 'repeat(auto-fit, minmax(240px,
                            1fr))',
                            <br />
                            gap: '25px',
                            <br />
                            marginBottom: '40px'
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <span className="font-bold text-amber-600">
                              display: 'grid'
                            </span>{" "}
                            - باکسز کو گرڈ میں لگاؤ (جیسے صفیں)
                          </p>
                        </div>

                        {/* Stats Data Array */}
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-8 border-blue-500 hover:shadow-xl transition-all">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">📋</span>
                            <h4 className="font-bold text-gray-900 dark:text-white">
                              Stats Data Array
                            </h4>
                            <span className="text-xs bg-blue-100 dark:bg-blue-900/40 px-2 py-1 rounded-full">
                              لائن 25-30
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            4 آئٹمز پر مشتمل Array
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2 bg-white dark:bg-gray-900 rounded border border-blue-200 dark:border-blue-800">
                              <span className="font-bold text-blue-600">
                                👥 Total Students
                              </span>
                              <br />
                              2,547 | +12%
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-900 rounded border border-green-200 dark:border-green-800">
                              <span className="font-bold text-green-600">
                                📚 Active Courses
                              </span>
                              <br />
                              24 | +4
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-900 rounded border border-orange-200 dark:border-orange-800">
                              <span className="font-bold text-orange-600">
                                👨🏫 Teachers
                              </span>
                              <br />
                              18 | +2
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-900 rounded border border-purple-200 dark:border-purple-800">
                              <span className="font-bold text-purple-600">
                                💰 Revenue
                              </span>
                              <br />
                              $45.2K | +23%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Colors Table */}
                    <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600">
                      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                        <span className="text-4xl">🎨</span>
                        <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          استعمال شدہ رنگ
                        </span>
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#2d3748" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #2d3748
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            ہیڈنگز - گہرا سرمئی
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#718096" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #718096
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            ذیلی متن - درمیانی سرمئی
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#4299e1" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #4299e1
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            طلباء کارڈ - نیلا
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#48bb78" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #48bb78
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            کورسز کارڈ - سبز
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#ed8936" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #ed8936
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            اساتذہ کارڈ - نارنجی
                          </p>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all transform hover:-translate-y-1">
                          <div
                            className="w-full h-12 rounded-lg mb-3"
                            style={{ backgroundColor: "#9f7aea" }}
                          ></div>
                          <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                            #9f7aea
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            ریونیو کارڈ - جامنی
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Summary Card */}
                    <div className="mt-8 p-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl text-white shadow-2xl transform hover:scale-105 transition-all duration-500">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-7xl animate-bounce">🎯</div>
                        <h3 className="text-4xl font-bold">
                          آسان الفاظ میں خلاصہ
                        </h3>
                      </div>

                      <p className="text-2xl mb-6 leading-relaxed">
                        یہ{" "}
                        <span className="bg-white/30 px-4 py-1 rounded-full font-black">
                          ایڈمن کا ڈیش بورڈ
                        </span>{" "}
                        ہے۔
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xl">
                        <div className="p-6 bg-white/20 backdrop-blur-lg rounded-2xl border-2 border-white/30">
                          <div className="text-5xl mb-3">📈</div>
                          <p className="font-bold">اوپر</p>
                          <p>پوری اکیڈمی کا خلاصہ</p>
                        </div>
                        <div className="p-6 bg-white/20 backdrop-blur-lg rounded-2xl border-2 border-white/30">
                          <div className="text-5xl mb-3">📋</div>
                          <p className="font-bold">نیچے</p>
                          <p>کیا کیا ہو رہا ہے</p>
                        </div>
                      </div>

                      <div className="mt-6 p-6 bg-yellow-400 text-gray-900 rounded-2xl">
                        <p className="text-2xl font-bold mb-2">
                          جیسے کسی اسکول پرنسپل کے کمرے میں لگا نوٹس بورڈ:
                        </p>
                        <p className="text-xl">
                          بورڈ پر لکھا ہو - کل طلباء 2547، نئے داخلے 12% وغیرہ
                        </p>
                        <p className="text-xl">
                          ساتھ میں لگی ہو - آج کیا ہوا، کون نیا آیا
                        </p>
                      </div>
                    </div>

                    {/* Teacher's Final Message */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-4 border-purple-300 dark:border-purple-700 animate-pulse">
                      <div className="flex items-center gap-4">
                        <div className="text-6xl">📢</div>
                        <div>
                          <p className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-2">
                            استاد کا آخری پیغام:
                          </p>
                          <p className="text-xl text-gray-800 dark:text-gray-200 font-medium">
                            "یہ صفحہ سمجھ گئے تو React میں ڈیٹا ڈسپلے کرنا،
                            Arrays پر map لگانا، اور Hover Effects لگانا آ گیا۔"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Courses Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold">
                  10
                </div>
                <h2 className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  pages/courses.js
                </h2>
              </div>

              <SuperSimpleCode
                title="pages/courses.js"
                code={`📄 pages/courses.js
jsx
export default function Courses() {
  const courses = [
    { id: 1, name: 'Web Development', instructor: 'Dr. Sarah Ahmed', students: 450, progress: 75 },
    { id: 2, name: 'React & Next.js', instructor: 'Prof. Ali Raza', students: 320, progress: 60 },
    { id: 3, name: 'Backend Development', instructor: 'Ms. Fatima Khan', students: 280, progress: 45 },
    { id: 4, name: 'Mobile App Development', instructor: 'Mr. Usman Malik', students: 190, progress: 30 },
    { id: 5, name: 'UI/UX Design', instructor: 'Ms. Ayesha Ahmed', students: 210, progress: 55 },
    { id: 6, name: 'Data Science', instructor: 'Dr. Kamran Hasan', students: 150, progress: 25 },
  ];

  return (
    <div className="page-enter">
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
      }}>
        <h1 style={{ 
          fontSize: '2.2rem',
          color: '#2d3748'
        }}>
          📚 Course Management
        </h1>
        
        <button style={{
          padding: '12px 24px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s'
        }}
        onMouseEnter={e => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 10px 20px rgba(102, 126, 234, 0.4)';
        }}
        onMouseLeave={e => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'none';
        }}
        >
          + Add New Course
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '25px'
      }}>
        {courses.map(course => (
          <div
            key={course.id}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(66, 153, 225, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '15px'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                color: '#2d3748',
                marginBottom: '8px'
              }}>
                {course.name}
              </h3>
              <span style={{
                background: '#ebf8ff',
                color: '#4299e1',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                Active
              </span>
            </div>
            
            <p style={{ color: '#718096', marginBottom: '8px' }}>
              👨🏫 {course.instructor}
            </p>
            
            <p style={{ color: '#718096', marginBottom: '15px' }}>
              👥 {course.students} students
            </p>
            
            <div style={{ marginBottom: '10px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ color: '#4a5568', fontSize: '0.9rem' }}>Progress</span>
                <span style={{ color: '#4299e1', fontWeight: '600' }}>{course.progress}%</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: \`\${course.progress}%\`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '10px',
              marginTop: '20px'
            }}>
              <button style={{
                padding: '8px 16px',
                background: '#4299e1',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.target.style.background = '#3182ce'}
              onMouseLeave={e => e.target.style.background = '#4299e1'}
              >
                Edit
              </button>
              <button style={{
                padding: '8px 16px',
                background: 'white',
                color: '#4a5568',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => {
                e.target.style.background = '#f7fafc';
                e.target.style.borderColor = '#cbd5e0';
              }}
              onMouseLeave={e => {
                e.target.style.background = 'white';
                e.target.style.borderColor = '#e2e8f0';
              }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/courses.js بنائیں",
                  "courses array سے data map کریں",
                  "Progress bar بھی ہے",
                  "Hover effects ہیں",
                ]}
              />
            </section>

            {/* Teachers Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  11
                </div>
                <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  pages/teachers.js
                </h2>
              </div>

              <SuperSimpleCode
                title="pages/teachers.js"
                code={`📄 pages/teachers.js
jsx
export default function Teachers() {
  const teachers = [
    { id: 1, name: 'Dr. Sarah Ahmed', subject: 'Web Development', experience: '12 years', students: 1200, rating: 4.9, status: 'Online' },
    { id: 2, name: 'Prof. Ali Raza', subject: 'React & Next.js', experience: '8 years', students: 850, rating: 4.8, status: 'Busy' },
    { id: 3, name: 'Ms. Fatima Khan', subject: 'Backend Development', experience: '10 years', students: 600, rating: 4.7, status: 'Online' },
    { id: 4, name: 'Mr. Usman Malik', subject: 'Mobile Apps', experience: '7 years', students: 550, rating: 4.8, status: 'Away' },
  ];

  return (
    <div className="page-enter">
      <h1 style={{ 
        fontSize: '2.2rem',
        color: '#2d3748',
        marginBottom: '30px'
      }}>
        👨🏫 Faculty Management
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '30px'
      }}>
        {teachers.map(teacher => (
          <div
            key={teacher.id}
            style={{
              background: 'white',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(66, 153, 225, 0.15)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '30px',
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{
                fontSize: '4rem',
                marginBottom: '15px'
              }}>
                👨🏫
              </div>
              <h3 style={{
                fontSize: '1.5rem',
                marginBottom: '5px'
              }}>
                {teacher.name}
              </h3>
              <p style={{ opacity: 0.9 }}>{teacher.subject}</p>
            </div>
            
            <div style={{ padding: '25px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '15px'
              }}>
                <div>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>Experience</p>
                  <p style={{ color: '#2d3748', fontWeight: '600' }}>{teacher.experience}</p>
                </div>
                <div>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>Students</p>
                  <p style={{ color: '#2d3748', fontWeight: '600' }}>{teacher.students}+</p>
                </div>
                <div>
                  <p style={{ color: '#718096', fontSize: '0.9rem' }}>Rating</p>
                  <p style={{ color: '#f6ad55', fontWeight: '600' }}>⭐ {teacher.rating}</p>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '20px'
              }}>
                <span style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  background: teacher.status === 'Online' ? '#f0fff4' : 
                             teacher.status === 'Busy' ? '#fff5f5' : '#feebc8',
                  color: teacher.status === 'Online' ? '#48bb78' : 
                         teacher.status === 'Busy' ? '#f56565' : '#ed8936'
                }}>
                  {teacher.status}
                </span>
                
                <button style={{
                  padding: '8px 20px',
                  background: 'transparent',
                  color: '#4299e1',
                  border: '2px solid #4299e1',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => {
                  e.target.style.background = '#4299e1';
                  e.target.style.color = 'white';
                }}
                onMouseLeave={e => {
                  e.target.style.background = 'transparent';
                  e.target.style.color = '#4299e1';
                }}
                >
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/teachers.js بنائیں",
                  "teachers array سے data map کریں",
                  "Status badges ہیں",
                  "Hover effects ہیں",
                ]}
              />
            </section>

            {/* Contact Page */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                  12
                </div>
                <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                  pages/contact.js (Real Professional Look)
                </h2>
              </div>

              <SuperSimpleCode
                title="pages/contact.js"
                code={`📄 pages/contact.js (Real Professional Look)
jsx
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="page-enter">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '30px'
      }}>
        {/* Left Column - Contact Form */}
        <div>
          <h1 style={{ 
            fontSize: '2.2rem',
            color: '#2d3748',
            marginBottom: '10px'
          }}>
            📞 Contact Us
          </h1>
          
          <p style={{
            color: '#718096',
            fontSize: '1.1rem',
            marginBottom: '30px'
          }}>
            Have questions about our courses? Need help with your enrollment? 
            We're here to help!
          </p>

          <form onSubmit={handleSubmit} style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#4a5568',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4299e1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#4a5568',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4299e1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="your.email@example.com"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                color: '#4a5568',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4299e1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="What's this about?"
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'block',
                color: '#4a5568',
                fontWeight: '600',
                marginBottom: '8px'
              }}>
                Message *
              </label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  resize: 'vertical',
                  transition: 'all 0.3s'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#4299e1';
                  e.target.style.boxShadow = '0 0 0 3px rgba(66, 153, 225, 0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }}
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Column - Contact Information */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '35px',
            borderRadius: '20px',
            color: 'white',
            marginBottom: '25px'
          }}>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '20px',
              borderBottom: '2px solid rgba(255,255,255,0.2)',
              paddingBottom: '15px'
            }}>
              Get in Touch
            </h2>
            
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '15px' }}>📍</span>
                <div>
                  <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Visit Us</h4>
                  <p style={{ opacity: 0.9, lineHeight: '1.6' }}>
                    123 Education Street<br />
                    Tech City, TC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '15px' }}>📞</span>
                <div>
                  <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Call Us</h4>
                  <p style={{ opacity: 0.9, marginBottom: '5px' }}>Main: +1 (555) 123-4567</p>
                  <p style={{ opacity: 0.9 }}>Support: +1 (555) 765-4321</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '25px' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '15px' }}>✉️</span>
                <div>
                  <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Email Us</h4>
                  <p style={{ opacity: 0.9, marginBottom: '5px' }}>info@academy.com</p>
                  <p style={{ opacity: 0.9 }}>support@academy.com</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.8rem', marginRight: '15px' }}>⏰</span>
                <div>
                  <h4 style={{ marginBottom: '5px', fontSize: '1.1rem' }}>Working Hours</h4>
                  <p style={{ opacity: 0.9, marginBottom: '5px' }}>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p style={{ opacity: 0.9 }}>Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              color: '#2d3748',
              marginBottom: '20px'
            }}>
              🌟 Why Choose Us?
            </h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px'
            }}>
              <div>
                <div style={{
                  fontSize: '2rem',
                  color: '#4299e1',
                  marginBottom: '5px'
                }}>
                  5,000+
                </div>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>Students</p>
              </div>
              
              <div>
                <div style={{
                  fontSize: '2rem',
                  color: '#4299e1',
                  marginBottom: '5px'
                }}>
                  50+
                </div>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>Courses</p>
              </div>
              
              <div>
                <div style={{
                  fontSize: '2rem',
                  color: '#4299e1',
                  marginBottom: '5px'
                }}>
                  98%
                </div>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>Success Rate</p>
              </div>
              
              <div>
                <div style={{
                  fontSize: '2rem',
                  color: '#4299e1',
                  marginBottom: '5px'
                }}>
                  24/7
                </div>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>Support</p>
              </div>
            </div>
            
            <div style={{
              marginTop: '25px',
              padding: '20px',
              background: '#f7fafc',
              borderRadius: '12px'
            }}>
              <p style={{ color: '#4a5568', fontStyle: 'italic' }}>
                "Best decision I made for my career. The instructors are amazing!"
              </p>
              <p style={{ color: '#4299e1', marginTop: '10px', fontWeight: '600' }}>
                — Sarah Ahmed, Web Development Graduate
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "pages/contact.js بنائیں",
                  "Form handling ہے",
                  "Two column layout ہے",
                  "Stats card بھی ہے",
                ]}
              />
            </section>
          </section>
        )}

        {/* App Router Section */}
        {activeSection === "app" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                🚀 Next.js App Router
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">
                  Active Link Highlight
                </span>{" "}
                اور{" "}
                <span className="bg-green-200 text-black px-2 py-1 rounded">
                  Slide Animations
                </span>{" "}
                کے ساتھ
              </p>
            </div>

            {/* App Router Installation */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  1
                </div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  App Router Installation
                </h2>
              </div>

              <SuperSimpleCode
                title="Next.js App Router Installation"
                code={`🎯 حصہ سوم: Next.js App Router
Active Link Highlight + Sidebar Animation
________________________________________
📦 Next.js App Router انسٹالیشن
bash
npx create-next-app@latest nextjs-app-router -- --js --no-tailwind --eslint
cd nextjs-app-router
جب سوال آئے:
•	TypeScript → No
•	App Router → Yes (یہ بہت ضروری ہے)
bash
npm run dev`}
                steps={[
                  "یہ کمانڈ چلائیں",
                  "TypeScript کے لیے No کریں",
                  "App Router کے لیے Yes کریں (ضروری ہے)",
                  "npm run dev سے پروجیکٹ چلائیں",
                ]}
              />
            </section>

            {/* App Router Folder Structure */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                  2
                </div>
                <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  App Router Folder Structure
                </h2>
              </div>

              <SuperSimpleCode
                title="App Router Structure"
                code={`📁 فولڈر سٹرکچر (App Router)
txt
app/
├── layout.js
├── page.js
├── dashboard/
│   └── page.js
├── courses/
│   └── page.js
├── teachers/
│   └── page.js
├── contact/
│   └── page.js
components/
├── Sidebar.js
├── Sidebar.css
styles/
└── globals.css`}
                steps={[
                  "app فولڈر میں تمام routes",
                  "layout.js سب pages کو wrap کرتا ہے",
                  "ہر folder کی اپنی page.js",
                  "components فولڈر میں Sidebar",
                ]}
              />
            </section>

            {/* App Router Global CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                  3
                </div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  styles/globals.css (App Router)
                </h2>
              </div>

              <SuperSimpleCode
                title="styles/globals.css"
                code={`🎨 styles/globals.css (App Router کے لیے)
css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.app-layout {
  display: flex;
  min-height: 100vh;
  position: relative;
}

.content-area {
  flex: 1;
  padding: 30px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 20px;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* Slide Animations */
@keyframes slideInFromLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.sidebar-slide-in {
  animation: slideInFromLeft 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Page Transitions */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
  }
  
  .content-area {
    margin: 10px;
    padding: 20px;
  }
}`}
                steps={[
                  "styles/globals.css میں یہ styles شامل کریں",
                  "App Router کے لیے animations ہیں",
                  "slideInFromLeft اور fadeInUp animations",
                  "Responsive design بھی ہے",
                ]}
              />
            </section>

            {/* App Router Sidebar CSS */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                  4
                </div>
                <h2 className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  components/Sidebar.css (App Router)
                </h2>
              </div>

              <SuperSimpleCode
                title="components/Sidebar.css"
                code={`🧩 components/Sidebar.css (App Router کے لیے - Cool Effects)
css
.sidebar {
  width: 280px;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  padding: 30px 20px;
  box-shadow: 10px 0 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  border-right: 1px solid rgba(226, 232, 240, 0.5);
}

.sidebar-header {
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.sidebar-header h2 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.sidebar-header p {
  color: #718096;
  font-size: 0.9rem;
  letter-spacing: 1px;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  padding: 14px 20px;
  color: #4a5568;
  text-decoration: none;
  border-radius: 14px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.sidebar-link span {
  margin-right: 14px;
  font-size: 1.3rem;
  transition: transform 0.3s;
}

/* Cool Active Link Effect - Animated Left Border */
.sidebar-link.active {
  background: linear-gradient(90deg, rgba(102, 126, 234, 0.12) 0%, rgba(102, 126, 234, 0.06) 100%);
  color: #4299e1;
  font-weight: 600;
}

.sidebar-link.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 0;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  animation: expandActiveBorder 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.6);
}

@keyframes expandActiveBorder {
  0% {
    height: 0;
    opacity: 0;
  }
  50% {
    height: 80%;
    opacity: 0.9;
  }
  100% {
    height: 65%;
    opacity: 1;
  }
}

/* Hover Effect */
.sidebar-link:hover {
  background: rgba(66, 153, 225, 0.1);
  transform: translateX(8px);
  color: #2c5282;
}

.sidebar-link:hover span {
  transform: scale(1.15) rotate(5deg);
}

/* Active Link Glow Effect */
.sidebar-link.active {
  box-shadow: 0 4px 12px rgba(66, 153, 225, 0.15);
}

/* Sidebar Footer */
.sidebar-footer {
  margin-top: auto;
  padding-top: 30px;
  border-top: 2px solid #e2e8f0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 12px;
  background: #f7fafc;
  border-radius: 16px;
  transition: all 0.3s;
}

.user-info:hover {
  background: #edf2f7;
}

.user-avatar {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details h4 {
  color: #2d3748;
  font-size: 0.95rem;
  margin-bottom: 4px;
}

.user-details p {
  color: #718096;
  font-size: 0.8rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    transform: translateX(-100%);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 20px 0 40px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar.open {
    transform: translateX(0);
  }
}`}
                steps={[
                  "components/Sidebar.css بنائیں",
                  "Active link پر animated left border",
                  "Hover effects (translateX, scale, rotate)",
                  "Mobile responsive بھی ہے",
                ]}
              />
            </section>

            {/* App Router Sidebar Component */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                  5
                </div>
                <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  Sidebar Component (usePathname)
                </h2>
              </div>

              <SuperSimpleCode
                title="components/Sidebar.js - App Router"
                code={`🧩 components/Sidebar.js (App Router - usePathname Hook)
jsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Sidebar.css';

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const navItems = [
    { href: '/', icon: '🏠', label: 'Dashboard' },
    { href: '/courses', icon: '📚', label: 'Courses' },
    { href: '/teachers', icon: '👨🏫', label: 'Teachers' },
    { href: '/contact', icon: '📞', label: 'Contact' },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    // Sidebar slide-in animation on mount
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1100,
          background: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          cursor: 'pointer'
        }}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <aside className={\`sidebar \${isOpen ? 'open' : ''} \${isAnimating ? 'sidebar-slide-in' : ''}\`}>
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Bright Future Academy</p>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={\`sidebar-link \${isActive(item.href) ? 'active' : ''}\`}
              onClick={() => setIsOpen(false)}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">AD</div>
            <div className="user-details">
              <h4>Admin User</h4>
              <p>admin@academy.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}`}
                steps={[
                  "components/Sidebar.js بنائیں",
                  "'use client' directive لازمی ہے",
                  "usePathname سے current URL پتہ کریں",
                  "isActive function سے active link چیک کریں",
                ]}
              />
            </section>

            {/* Sidebar Explanation - Beautiful Urdu Explanation UI */}
            <section className="mb-10">
              {/* Header with Number 6 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  6
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400">
                  📘 Next.js Sidebar - اردو وضاحت
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"></div>
              </div>

              {/* Main Container with Glow Effect */}
              <div className="relative group">
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-teal-200 dark:border-teal-900/50 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/5 rounded-full -ml-20 -mb-20"></div>

                  {/* What we're building */}
                  <div className="mb-10 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-r-8 border-teal-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">🎯</div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        سب سے پہلے سمجھیں - یہ کیا بنا رہے ہیں؟
                      </h3>
                    </div>

                    <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">
                      یہ ایک{" "}
                      <span className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1 rounded-full font-bold mx-1">
                        سائیڈبار
                      </span>{" "}
                      ہے جو ویب سائٹ کے بائیں طرف ہوتا ہے۔ جیسے:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <span className="text-3xl">📘</span>
                        <span className="text-gray-800 dark:text-gray-200">
                          Facebook میں بائیں طرف مینو ہوتا ہے
                        </span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl shadow-sm">
                        <span className="text-3xl">✉️</span>
                        <span className="text-gray-800 dark:text-gray-200">
                          Gmail میں بائیں طرف Inbox, Sent وغیرہ ہوتے ہیں
                        </span>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h4 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                        ہمارے سائیڈبار میں 4 چیزیں ہیں:
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-center border-l-4 border-blue-500">
                          <span className="text-3xl block mb-1">🏠</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            Dashboard
                          </span>
                          <span className="text-xs block text-gray-500">
                            ہوم پیج
                          </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-center border-l-4 border-green-500">
                          <span className="text-3xl block mb-1">📚</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            Courses
                          </span>
                          <span className="text-xs block text-gray-500">
                            کورسز
                          </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-center border-l-4 border-orange-500">
                          <span className="text-3xl block mb-1">👨🏫</span>
                          <span className="font-bold text-orange-600 dark:text-orange-400">
                            Teachers
                          </span>
                          <span className="text-xs block text-gray-500">
                            اساتذہ
                          </span>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-900 rounded-xl text-center border-l-4 border-purple-500">
                          <span className="text-3xl block mb-1">📞</span>
                          <span className="font-bold text-purple-600 dark:text-purple-400">
                            Contact
                          </span>
                          <span className="text-xs block text-gray-500">
                            رابطہ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Line by Line Explanation */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 pb-4 border-b-2 border-teal-200 dark:border-teal-800">
                      <span className="text-3xl">📝</span>
                      <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                        کوڈ شروع کرتے ہیں - لائن بہ لائن
                      </span>
                    </h3>

                    {/* Line 1: 'use client' */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-purple-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 font-mono text-sm">
                              لائن 1
                            </span>
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                              'use client'
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                            {"'use client';"}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-purple-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-purple-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>
                              یہ Next.js کو بتا رہے ہیں کہ یہ کمپیوٹر والا کام
                              ہے
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>
                              جو بھی متحرک (Interactive) چیز ہوگی، وہ یہاں لکھیں
                              گے
                            </span>
                          </li>
                          <li className="flex items-start gap-2 bg-white dark:bg-gray-900 p-2 rounded-lg">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>جیسے بٹن دبانا، مینو کھولنا، وغیرہ</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Lines 2-4: Import Statements */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-blue-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-mono text-sm">
                              لائن 2-4
                            </span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                              Import Statements
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                            {`import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import './Sidebar.css';`}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-blue-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300 font-mono text-sm">
                              Link
                            </span>
                            <span>- لنک بنانے کے لیے (بغیر پیج ریفریش کے)</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300 font-mono text-sm">
                              usePathname
                            </span>
                            <span>
                              - بتاتا ہے کہ ابھی کونسا صفحہ کھلا ہے (مثلاً
                              /courses)
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300 font-mono text-sm">
                              useState, useEffect
                            </span>
                            <span>- React کے ہکس ہیں۔ یاد رکھنے والے کام</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300 font-mono text-sm">
                              CSS
                            </span>
                            <span>- خوبصورتی والی فائل</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Line 6: Component Definition */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-mono text-sm">
                              لائن 6
                            </span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              Component Definition
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm">
                            {"export default function Sidebar() {"}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-green-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <span className="font-bold">export default</span>{" "}
                              - یہ فنکشن باہر استعمال کر سکتے ہیں
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <span className="font-bold">Sidebar</span> - اس
                              Component کا نام
                            </span>
                          </li>
                          <li className="flex items-start gap-2 bg-white dark:bg-gray-900 p-2 rounded-lg">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              یہ ہے ہمارا مین فنکشن۔ جب بھی سائیڈبار استعمال
                              کریں گے، یہ چلے گا
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Line 7: usePathname */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-yellow-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-400 font-mono text-sm">
                              لائن 7
                            </span>
                            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                              usePathname Hook
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm">
                            {"const pathname = usePathname();"}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-yellow-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-yellow-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <p className="mb-2">
                          پتہ کر رہے ہیں کہ ابھی کونسا صفحہ کھلا ہے
                        </p>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                          <p className="font-mono text-sm">
                            اگر URL ہے localhost:3000/courses
                          </p>
                          <p className="font-mono text-sm text-green-600">
                            تو pathname میں "/courses" آئے گا
                          </p>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          یہ کیوں چاہیے؟ تاکہ بتا سکیں کہ کونسا لنک Active ہے
                        </p>
                      </div>
                    </div>

                    {/* Lines 8-9: State Variables */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-orange-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-400 font-mono text-sm">
                              لائن 8-9
                            </span>
                            <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                              State Variables
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm">
                            {`const [isOpen, setIsOpen] = useState(false);
const [isAnimating, setIsAnimating] = useState(true);`}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-orange-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-orange-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <p className="mb-2">State یعنی یاد رکھنے والی چیزیں</p>
                        <div className="space-y-3">
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <p>
                              <span className="font-bold text-orange-600">
                                isOpen
                              </span>{" "}
                              - موبائل میں مینو کھلا ہے یا بند؟
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              false = بند ہے (پہلے سے بند) | true = کھلا ہے
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <p>
                              <span className="font-bold text-orange-600">
                                isAnimating
                              </span>{" "}
                              - اینیمیشن چل رہی ہے؟
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              true = ہاں، چل رہی ہے | false = نہیں، ختم ہوگئی
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lines 11-16: NavItems Array */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-pink-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-pink-400 font-mono text-sm">
                              لائن 11-16
                            </span>
                            <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded-full">
                              NavItems Array
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-xs overflow-x-auto">
                            {`const navItems = [
  { href: '/', icon: '🏠', label: 'Dashboard' },
  { href: '/courses', icon: '📚', label: 'Courses' },
  { href: '/teachers', icon: '👨🏫', label: 'Teachers' },
  { href: '/contact', icon: '📞', label: 'Contact' },
];`}
                          </pre>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-pink-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-pink-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            سیدھی بات:
                          </h4>
                        </div>
                        <p className="mb-2">یہ ہے ہمارے مینو کی اشیاء</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-white dark:bg-gray-900 p-2 rounded-lg text-center">
                            <span className="text-2xl">🏠</span>
                            <p className="font-bold text-sm">Dashboard</p>
                            <p className="text-xs text-gray-500">href: '/'</p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-2 rounded-lg text-center">
                            <span className="text-2xl">📚</span>
                            <p className="font-bold text-sm">Courses</p>
                            <p className="text-xs text-gray-500">
                              href: '/courses'
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-2 rounded-lg text-center">
                            <span className="text-2xl">👨🏫</span>
                            <p className="font-bold text-sm">Teachers</p>
                            <p className="text-xs text-gray-500">
                              href: '/teachers'
                            </p>
                          </div>
                          <div className="bg-white dark:bg-gray-900 p-2 rounded-lg text-center">
                            <span className="text-2xl">📞</span>
                            <p className="font-bold text-sm">Contact</p>
                            <p className="text-xs text-gray-500">
                              href: '/contact'
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">
                          فائدہ: اگر نیا لنک شامل کرنا ہو تو بس یہاں لکھ دیں،
                          خودبخود بن جائے گا
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CSS Effects Summary */}
                  <div className="mt-10 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-indigo-300 dark:border-indigo-700">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="text-3xl">🎨</span>
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        CSS Effects کا خلاصہ
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      {/* Active Link Effect */}
                      <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-3 text-center">🔵</div>
                        <h4 className="font-bold text-lg mb-2 text-center">
                          Active Link Effect
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>بائیں طرف ایک نیلی لکیر آئے</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>لکیر درمیان سے شروع ہو</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-blue-500">•</span>
                            <span>اوپر نیچے پھیلے</span>
                          </li>
                        </ul>
                      </div>

                      {/* Hover Effect */}
                      <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-3 text-center">🖱️</div>
                        <h4 className="font-bold text-lg mb-2 text-center">
                          Hover Effect
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>پس منظر ہلکا نیلا ہو جائے</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>لنک تھوڑا دائیں سرک جائے</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-500">•</span>
                            <span>آئیکن تھوڑا گھومے اور بڑا ہو</span>
                          </li>
                        </ul>
                      </div>

                      {/* Mobile Animation */}
                      <div className="p-5 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-lg transition-all">
                        <div className="text-4xl mb-3 text-center">📱</div>
                        <h4 className="font-bold text-lg mb-2 text-center">
                          Mobile Animation
                        </h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>بٹن دبائیں تو سائیڈبار اندر آئے</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>سائیڈبار باہر جائے تو غائب ہو جائے</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-500">•</span>
                            <span>سب کچھ ہموار (Smooth) ہو</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Simple Analogy */}
                  <div className="mt-10 p-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl text-white shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-6xl">🏁</span>
                      <h3 className="text-3xl font-bold">
                        بالکل آسان الفاظ میں
                      </h3>
                    </div>

                    <p className="text-2xl mb-6">
                      یہ سائیڈبار ایک الماری کی طرح ہے:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
                        <div className="text-5xl mb-3">🖥️</div>
                        <h4 className="text-xl font-bold mb-2">Desktop</h4>
                        <p>الماری ہمیشہ کھلی رہتی ہے (بڑے کمرے میں)</p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-6 border-2 border-white/30">
                        <div className="text-5xl mb-3">📱</div>
                        <h4 className="text-xl font-bold mb-2">Mobile</h4>
                        <p>
                          الماری بند رہتی ہے، بٹن دبائیں تو کھلتی ہے (چھوٹے کمرے
                          میں)
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
                        <span className="text-3xl block mb-2">🎯</span>
                        <p className="font-bold">Active Link</p>
                        <p className="text-sm">
                          جس ڈبے کی ضرورت ہے، اس پر روشنی پڑی ہوئی ہے
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
                        <span className="text-3xl block mb-2">👆</span>
                        <p className="font-bold">Hover</p>
                        <p className="text-sm">
                          جب ہاتھ لے جائیں تو ڈبہ تھوڑا باہر نکل آئے
                        </p>
                      </div>
                      <div className="bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center">
                        <span className="text-3xl block mb-2">✨</span>
                        <p className="font-bold">Animation</p>
                        <p className="text-sm">
                          سب کچھ آہستہ آہستہ ہو، اچانک نہ ہو
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Points Table */}
                  <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">✅</span>
                      <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent dark:from-gray-300 dark:to-gray-100">
                        یاد رکھنے کی باتیں
                      </span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">🎭</span>
                        <p className="font-bold text-sm">'use client'</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          متحرک کام کے لیے
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">📍</span>
                        <p className="font-bold text-sm">usePathname</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          بتاتا ہے کونسا صفحہ کھلا ہے
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">💾</span>
                        <p className="font-bold text-sm">useState</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          چیزیں یاد رکھتا ہے
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">⚡</span>
                        <p className="font-bold text-sm">useEffect</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          ایک بار کام کرتا ہے
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">🔍</span>
                        <p className="font-bold text-sm">isActive</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          چیک کرتا ہے Active ہے یا نہیں
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">🔄</span>
                        <p className="font-bold text-sm">map</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          لوپ لگاتا ہے
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-lg text-center">
                        <span className="text-2xl mb-1 block">🎨</span>
                        <p className="font-bold text-sm">className</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          CSS کلاسز بدلتا ہے
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Final Message */}
                  <div className="mt-10 p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white text-center shadow-2xl">
                    <div className="text-6xl mb-4 animate-pulse">🎁</div>
                    <h3 className="text-3xl font-bold mb-3">آخر میں</h3>
                    <p className="text-xl mb-4">
                      یہ سائیڈبار پیشہ ور ویب سائٹ کی پہچان ہے:
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full">
                        📱 موبائل کے لیے علیحدہ ڈیزائن
                      </span>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full">
                        ✨ خوبصورت اینیمیشنز
                      </span>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full">
                        🧹 صاف ستھرا کوڈ
                      </span>
                      <span className="px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full">
                        🔄 دوبارہ استعمال کرنے کے قابل
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* App Router Layout */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  7
                </div>
                <h2 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  app/layout.js - Root Layout
                </h2>
              </div>

              <SuperSimpleCode
                title="app/layout.js"
                code={`🧠 app/layout.js (App Router Root Layout)
jsx
import '../styles/globals.css';
import Sidebar from '../components/Sidebar';

export const metadata = {
  title: 'Bright Future Academy',
  description: 'Quality education for modern students',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-layout">
          <Sidebar />
          <main className="content-area">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}`}
                steps={[
                  "app/layout.js میں یہ layout بنائیں",
                  "metadata سے SEO data",
                  "Sidebar شامل کریں",
                  "children سے current page render ہوگا",
                ]}
              />
            </section>

            {/* App Router Dashboard */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  8
                </div>
                <h2 className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                  app/page.js - Dashboard
                </h2>
              </div>

              <SuperSimpleCode
                title="app/page.js"
                code={`📄 app/page.js (Dashboard)
jsx
export default function Dashboard() {
  return (
    <div className="page-enter">
      <h1 style={{ 
        fontSize: '2.2rem',
        color: '#2d3748',
        marginBottom: '10px'
      }}>
        👋 Welcome to Dashboard!
      </h1>
      
      <p style={{
        color: '#718096',
        fontSize: '1.1rem',
        marginBottom: '30px'
      }}>
        Your academy management overview
      </p>

      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '25px',
        marginBottom: '40px'
      }}>
        {[
          { title: 'Total Students', value: '2,547', change: '+12%', icon: '👥', color: '#4299e1' },
          { title: 'Active Courses', value: '24', change: '+4', icon: '📚', color: '#48bb78' },
          { title: 'Teachers', value: '18', change: '+2', icon: '👨🏫', color: '#ed8936' },
          { title: 'Revenue', value: '$45.2K', change: '+23%', icon: '💰', color: '#9f7aea' }
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s',
              cursor: 'pointer',
              borderTop: \`4px solid \${stat.color}\`
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = \`0 20px 40px \${stat.color}20\`;
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '15px'
            }}>
              <span style={{ fontSize: '2rem' }}>{stat.icon}</span>
              <span style={{
                color: stat.change.startsWith('+') ? '#48bb78' : '#f56565',
                background: stat.change.startsWith('+') ? '#f0fff4' : '#fff5f5',
                padding: '4px 8px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                {stat.change}
              </span>
            </div>
            <h3 style={{
              fontSize: '1.8rem',
              color: '#2d3748',
              marginBottom: '5px'
            }}>
              {stat.value}
            </h3>
            <p style={{ color: '#718096' }}>{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        padding: '25px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          color: '#2d3748',
          marginBottom: '20px'
        }}>
          📊 Recent Activity
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {[
            'New student enrolled in Web Development',
            'Course completion certificate issued',
            'Teacher performance review completed',
            'New feedback received from students',
            'Monthly report generated'
          ].map((activity, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                background: '#f7fafc',
                borderRadius: '12px',
                transition: 'background 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#edf2f7'}
              onMouseLeave={e => e.currentTarget.style.background = '#f7fafc'}
            >
              <span style={{ fontSize: '1.2rem', marginRight: '12px' }}>📝</span>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#2d3748', fontWeight: '500' }}>{activity}</p>
                <p style={{ color: '#718096', fontSize: '0.9rem' }}>
                  {i + 1} hour{i !== 0 ? 's' : ''} ago
                </p>
              </div>
              <span style={{
                background: '#ebf8ff',
                color: '#4299e1',
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '600'
              }}>
                New
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "app/page.js میں Dashboard بنائیں",
                  "page-enter کلاس سے animation",
                  "stats cards میں hover effects",
                  "Recent activity list ہے",
                ]}
              />
            </section>

            {/* Dashboard Explanation - Beautiful UI with Code Blocks */}
            <section className="mb-10">
              {/* Header with Number 9 */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  9
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-l from-orange-600 to-red-600 bg-clip-text text-transparent dark:from-orange-400 dark:to-red-400">
                  📘 Dashboard Page - مکمل اردو وضاحت
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
              </div>

              {/* Main Container with Glow Effect */}
              <div className="relative group">
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-orange-200 dark:border-orange-900/50 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full -ml-20 -mb-20"></div>

                  {/* What this page shows */}
                  <div className="mb-10 p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-r-8 border-orange-500">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-5xl">🎯</div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        یہ Page کیا دکھاتا ہے؟
                      </h3>
                    </div>

                    <p className="text-xl text-gray-800 dark:text-gray-200 mb-4">
                      یہ{" "}
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full font-bold mx-1">
                        ایڈمن پینل کا ہوم پیج
                      </span>{" "}
                      ہے۔ جب بھی کوئی ایڈمن ویب سائٹ کھولے گا، سب سے پہلے یہی
                      صفحہ دیکھے گا۔
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Stats Cards Section */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-lg border-l-8 border-blue-500">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">1️⃣</span>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Stats Cards (اعداد و شمار)
                          </h4>
                        </div>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex justify-between items-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span>کل طلباء</span>
                            <span className="font-bold text-blue-600 dark:text-blue-400">
                              2,547 (+12%)
                            </span>
                          </li>
                          <li className="flex justify-between items-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span>فعال کورسز</span>
                            <span className="font-bold text-green-600 dark:text-green-400">
                              24 (+4)
                            </span>
                          </li>
                          <li className="flex justify-between items-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <span>اساتذہ</span>
                            <span className="font-bold text-orange-600 dark:text-orange-400">
                              18 (+2)
                            </span>
                          </li>
                          <li className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <span>آمدنی</span>
                            <span className="font-bold text-purple-600 dark:text-purple-400">
                              $45.2K (+23%)
                            </span>
                          </li>
                        </ul>
                      </div>

                      {/* Recent Activity Section */}
                      <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-lg border-l-8 border-green-500">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl">2️⃣</span>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Recent Activity (حالیہ سرگرمیاں)
                          </h4>
                        </div>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <span className="text-green-500">✓</span> نئے طلباء
                            اندراج
                          </li>
                          <li className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <span className="text-blue-500">✓</span> سرٹیفکیٹ
                            جاری ہونا
                          </li>
                          <li className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <span className="text-purple-500">✓</span> اساتذہ کی
                            کارکردگی
                          </li>
                          <li className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                            <span className="text-yellow-500">✓</span> فیڈبیک
                            وغیرہ
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Line by Line Explanation */}
                  <div className="space-y-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3 pb-4 border-b-2 border-orange-200 dark:border-orange-800">
                      <span className="text-3xl">📝</span>
                      <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                        لائن بہ لائن وضاحت
                      </span>
                    </h3>

                    {/* Component Definition */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Code Block */}
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-green-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-mono text-sm">
                              لائن 1-3
                            </span>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                              Component Definition
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                            {`export default function Dashboard() {
  return (
    <div className="page-enter">`}
                          </pre>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-green-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-green-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            وضاحت
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <span className="font-bold text-green-600">
                                export default
                              </span>{" "}
                              - یہ Component باہر استعمال کر سکتے ہیں
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">•</span>
                            <span>
                              <span className="font-bold text-green-600">
                                Dashboard
                              </span>{" "}
                              - اس Page کا نام
                            </span>
                          </li>
                          <li className="flex items-start gap-2 bg-white dark:bg-gray-900 p-3 rounded-lg">
                            <span className="text-green-600 font-bold text-lg">
                              ✨
                            </span>
                            <div>
                              <p>
                                <span className="font-bold text-green-600">
                                  className="page-enter"
                                </span>{" "}
                                - یہ CSS کلاس ہے جو Animation دیتی ہے
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                جب Page کھلے تو آہستہ آہستہ اندر آئے، اچانک نہ
                                آئے، بلکہ Smoothly آئے
                              </p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Welcome Heading */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Code Block */}
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-blue-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-mono text-sm">
                              لائن 4-12
                            </span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                              Welcome Heading
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                            {`<h1 style={{ 
  fontSize: '2.2rem',
  color: '#2d3748',
  marginBottom: '10px'
}}>
  👋 Welcome to Dashboard!
</h1>

<p style={{
  color: '#718096',
  fontSize: '1.1rem',
  marginBottom: '30px'
}}>
  Your academy management overview
</p>`}
                          </pre>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-blue-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-blue-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            وضاحت
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <p className="font-bold text-gray-900 dark:text-white mb-2">
                              بڑی ہیڈنگ:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              "👋 Welcome to Dashboard!"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              fontSize: 2.2rem, color: #2d3748 (گہرا سرمئی)
                            </p>
                          </div>
                          <div className="p-3 bg-white dark:bg-gray-900 rounded-lg">
                            <p className="font-bold text-gray-900 dark:text-white mb-2">
                              چھوٹی ہیڈنگ:
                            </p>
                            <p className="text-gray-700 dark:text-gray-300">
                              "Your academy management overview"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              fontSize: 1.1rem, color: #718096 (ہلکا سرمئی)
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Grid Container */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Code Block */}
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-purple-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 font-mono text-sm">
                              لائن 15-20
                            </span>
                            <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                              Grid Container
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-sm overflow-x-auto">
                            {`<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '25px',
  marginBottom: '40px'
}}>`}
                          </pre>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-purple-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-purple-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            وضاحت
                          </h4>
                        </div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>
                              <span className="font-bold">display: 'grid'</span>{" "}
                              - باکسز کو گرڈ میں لگاؤ (جیسے صفیں)
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>
                              <span className="font-bold">
                                gridTemplateColumns
                              </span>{" "}
                              - باکسز کی چوڑائی بتاؤ
                            </span>
                          </li>
                          <li className="mr-4 text-sm text-gray-600 dark:text-gray-400">
                            auto-fit: جتنی جگہ ہو، باکسز خود کو ایڈجسٹ کریں
                            <br />
                            minmax(240px, 1fr): کم از کم 240px، زیادہ سے زیادہ
                            برابر حصے
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-purple-600 font-bold">•</span>
                            <span>
                              <span className="font-bold">gap: '25px'</span> -
                              باکسز کے درمیان فاصلہ
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Stats Data Array */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Code Block */}
                      <div className="relative group/code">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl opacity-0 group-hover/code:opacity-100 blur transition-all duration-500"></div>
                        <div className="relative bg-gray-900 rounded-xl p-4 border-2 border-amber-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-amber-400 font-mono text-sm">
                              لائن 21-28
                            </span>
                            <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-1 rounded-full">
                              Stats Data Array
                            </span>
                          </div>
                          <pre className="text-green-300 font-mono text-xs overflow-x-auto">
                            {`{[
  { title: 'Total Students', value: '2,547', change: '+12%', icon: '👥', color: '#4299e1' },
  { title: 'Active Courses', value: '24', change: '+4', icon: '📚', color: '#48bb78' },
  { title: 'Teachers', value: '18', change: '+2', icon: '👨🏫', color: '#ed8936' },
  { title: 'Revenue', value: '$45.2K', change: '+23%', icon: '💰', color: '#9f7aea' }
].map((stat, index) => (`}
                          </pre>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-amber-500">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-amber-600 text-xl">📌</span>
                          <h4 className="font-bold text-gray-900 dark:text-white">
                            وضاحت
                          </h4>
                        </div>
                        <p className="mb-3">یہ ہے ہمارا ڈیٹا - 4 کارڈز کا</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-blue-500">
                            <span className="font-bold text-blue-600">
                              👥 Total
                            </span>
                            <br />
                            2,547 | +12%
                          </div>
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-green-500">
                            <span className="font-bold text-green-600">
                              📚 Courses
                            </span>
                            <br />
                            24 | +4
                          </div>
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-orange-500">
                            <span className="font-bold text-orange-600">
                              👨🏫 Teachers
                            </span>
                            <br />
                            18 | +2
                          </div>
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-lg border-l-4 border-purple-500">
                            <span className="font-bold text-purple-600">
                              💰 Revenue
                            </span>
                            <br />
                            $45.2K | +23%
                          </div>
                        </div>
                        <p className="text-sm mt-3">
                          <span className="font-bold">.map()</span> - ہر آئٹم کے
                          لیے ایک کارڈ بنائے گا
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Colors Table */}
                  <div className="mt-10 p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-gray-300 dark:border-gray-600">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="text-3xl">🎨</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        استعمال شدہ رنگ
                      </span>
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#2d3748" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #2d3748
                        </p>
                        <p className="font-bold text-sm">ہیڈنگز - گہرا سرمئی</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#718096" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #718096
                        </p>
                        <p className="font-bold text-sm">
                          ذیلی متن - درمیانی سرمئی
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#4299e1" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #4299e1
                        </p>
                        <p className="font-bold text-sm">طلباء کارڈ - نیلا</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#48bb78" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #48bb78
                        </p>
                        <p className="font-bold text-sm">کورسز کارڈ - سبز</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#ed8936" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #ed8936
                        </p>
                        <p className="font-bold text-sm">
                          اساتذہ کارڈ - نارنجی
                        </p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#9f7aea" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #9f7aea
                        </p>
                        <p className="font-bold text-sm">ریونیو کارڈ - جامنی</p>
                      </div>
                      <div className="p-3 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition-all">
                        <div
                          className="w-full h-12 rounded-lg mb-2"
                          style={{ backgroundColor: "#ebf8ff" }}
                        ></div>
                        <p className="font-mono text-xs text-gray-600 dark:text-gray-400">
                          #ebf8ff
                        </p>
                        <p className="font-bold text-sm">
                          New بیج - بہت ہلکا نیلا
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Summary Cards */}
                  <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-8 border-blue-500">
                      <div className="text-4xl mb-3">📱</div>
                      <h4 className="font-bold text-lg mb-2">Responsive</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        موبائل پر خود کو ایڈجسٹ کر لیتا ہے
                      </p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-8 border-green-500">
                      <div className="text-4xl mb-3">🖱️</div>
                      <h4 className="font-bold text-lg mb-2">Interactive</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Hover Effects ہیں
                      </p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl border-l-8 border-purple-500">
                      <div className="text-4xl mb-3">🌈</div>
                      <h4 className="font-bold text-lg mb-2">Color Coding</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        ہر کارڈ کا اپنا رنگ
                      </p>
                    </div>
                  </div>

                  {/* Formulas */}
                  <div className="mt-10 p-6 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-yellow-300 dark:border-yellow-700">
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">📝</span>
                      <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">
                        یاد رکھنے کے فارمولے
                      </span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl">
                        <div className="font-mono text-sm bg-gray-900 text-green-300 p-2 rounded mb-2">
                          display: 'grid',
                          <br />
                          gridTemplateColumns: 'repeat(auto-fit, minmax(240px,
                          1fr))'
                        </div>
                        <p className="text-sm">
                          مطلب: باکسز خود کو ایڈجسٹ کریں
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl">
                        <div className="font-mono text-sm bg-gray-900 text-green-300 p-2 rounded mb-2">
                          onMouseEnter={"{"}e =&gt;
                          e.currentTarget.style.transform = 'translateY(-5px)'
                          {"}"}
                        </div>
                        <p className="text-sm">
                          مطلب: ماؤس لے جائیں تو اوپر اٹھے
                        </p>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl">
                        <div className="font-mono text-sm bg-gray-900 text-green-300 p-2 rounded mb-2">
                          color: stat.change.startsWith('+') ? '#48bb78' :
                          '#f56565'
                        </div>
                        <p className="text-sm">
                          مطلب: اگر + ہے تو سبز، ورنہ سرخ
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Teacher's Final Message */}
                  <div className="mt-10 p-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white text-center shadow-2xl">
                    <div className="text-7xl mb-4 animate-bounce">📢</div>
                    <p className="text-2xl font-bold mb-2">
                      استاد کا آخری پیغام:
                    </p>
                    <p className="text-xl">
                      "یہ صفحہ پڑھ لیا تو سمجھو React میں ڈیٹا ڈسپلے کرنا آ گیا۔
                      باقی مشق ہے۔"
                    </p>
                    <div className="mt-4 flex justify-center gap-2">
                      <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
                      <span
                        className="w-2 h-2 bg-white rounded-full animate-ping"
                        style={{ animationDelay: "0.2s" }}
                      ></span>
                      <span
                        className="w-2 h-2 bg-white rounded-full animate-ping"
                        style={{ animationDelay: "0.4s" }}
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Other App Router Pages */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-lime-500 rounded-full flex items-center justify-center text-white font-bold">
                  10
                </div>
                <h2 className="text-2xl font-bold text-lime-600 dark:text-lime-400">
                  Other App Router Pages
                </h2>
              </div>

              <SuperSimpleCode
                title="app/courses/page.js"
                code={`📄 app/courses/page.js
jsx
export default function Courses() {
  return (
    <div className="page-enter">
      <h1 style={{ 
        fontSize: '2.2rem',
        color: '#2d3748',
        marginBottom: '30px'
      }}>
        📚 Courses Management
      </h1>
      
      {/* Copy the courses page content from Pages Router example */}
      <div style={{ color: '#4a5568' }}>
        Courses page content here...
      </div>
    </div>
  );
}`}
                steps={[]}
              />

              <SuperSimpleCode
                title="app/teachers/page.js"
                code={`📄 app/teachers/page.js
jsx
export default function Teachers() {
  return (
    <div className="page-enter">
      <h1 style={{ 
        fontSize: '2.2rem',
        color: '#2d3748',
        marginBottom: '30px'
      }}>
        👨🏫 Teachers Management
      </h1>
      
      {/* Copy the teachers page content from Pages Router example */}
      <div style={{ color: '#4a5568' }}>
        Teachers page content here...
      </div>
    </div>
  );
}`}
                steps={[]}
              />

              <SuperSimpleCode
                title="app/contact/page.js"
                code={`📄 app/contact/page.js
jsx
'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="page-enter">
      <h1 style={{ 
        fontSize: '2.2rem',
        color: '#2d3748',
        marginBottom: '10px'
      }}>
        📞 Contact Us
      </h1>
      
      <p style={{
        color: '#718096',
        fontSize: '1.1rem',
        marginBottom: '30px'
      }}>
        Have questions? We'd love to hear from you.
      </p>

      {/* Copy the contact form from Pages Router example */}
      <div style={{ color: '#4a5568' }}>
        Contact form content here...
      </div>
    </div>
  );
}`}
                steps={[]}
              />
            </section>

            {/* Router Comparison - Beautiful Parallel Comparison */}
            <section className="mb-10">
              {/* Header with Number */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  11
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-l from-purple-600 to-indigo-600 bg-clip-text text-transparent dark:from-purple-400 dark:to-indigo-400">
                  🎯 فرق: Pages Router vs App Router
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></div>
              </div>

              {/* Two Column Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Pages Router Card */}
                <div className="relative group">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200 dark:border-blue-900/50 hover:shadow-3xl transition-all transform hover:-translate-y-2">
                    {/* Card Header with Diagonal Pattern */}
                    <div className="relative h-32 bg-gradient-to-r from-blue-600 to-indigo-600 overflow-hidden">
                      {/* Decorative circles */}
                      <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full"></div>
                      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-black/10 rounded-full"></div>

                      <div className="absolute inset-0 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-4xl shadow-2xl border-2 border-white/30">
                            📄
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-white">
                              Pages Router
                            </h3>
                            <p className="text-blue-100">
                              Traditional Approach
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-white/30">
                          <span className="text-white font-bold text-lg">
                            🔵 Legacy
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-8 space-y-6">
                      {/* Routing Type */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-blue-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center text-white text-xl">
                            📁
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Routing System
                          </h4>
                        </div>
                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2">
                          <span className="text-blue-500 text-2xl">•</span>
                          <span className="bg-blue-100 dark:bg-blue-900/40 px-4 py-2 rounded-lg flex-1">
                            فائل پر مبنی routing
                          </span>
                        </p>
                      </div>

                      {/* Layout */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-indigo-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🏗️
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Layout
                          </h4>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 inline-block">
                          <code className="text-green-300 font-mono text-lg">
                            _app.js
                          </code>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                          تمام pages کو wrap کرتا ہے
                        </p>
                      </div>

                      {/* Hook */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-purple-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🎣
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Hook
                          </h4>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 inline-block">
                          <code className="text-green-300 font-mono text-lg">
                            useRouter()
                          </code>
                        </div>
                      </div>

                      {/* Component Update */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-pink-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🔄
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Component Update
                          </h4>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                          Page component بدلتا ہے
                        </p>
                      </div>

                      {/* Features Tags */}
                      <div className="mt-6 pt-4 border-t-2 border-blue-200 dark:border-blue-800">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> فائل-based
                          </span>
                          <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> _app.js
                          </span>
                          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> useRouter
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center mt-2">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                            فائل
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            based
                          </div>
                        </div>
                        <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                            _app
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            layout
                          </div>
                        </div>
                        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                            SPA
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            style
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Router Card */}
                <div className="relative group">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border-2 border-green-200 dark:border-green-900/50 hover:shadow-3xl transition-all transform hover:-translate-y-2">
                    {/* Card Header with Diagonal Pattern */}
                    <div className="relative h-32 bg-gradient-to-r from-green-600 to-emerald-600 overflow-hidden">
                      {/* Decorative circles */}
                      <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/10 rounded-full"></div>
                      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-black/10 rounded-full"></div>

                      <div className="absolute inset-0 flex items-center justify-between px-8">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center text-4xl shadow-2xl border-2 border-white/30">
                            🚀
                          </div>
                          <div>
                            <h3 className="text-3xl font-black text-white">
                              App Router
                            </h3>
                            <p className="text-green-100">Modern Approach</p>
                          </div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-5 py-3 rounded-full border-2 border-white/30">
                          <span className="text-white font-bold text-lg">
                            🟢 Modern
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-8 space-y-6">
                      {/* Routing Type */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-green-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center text-white text-xl">
                            📂
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Routing System
                          </h4>
                        </div>
                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium flex items-center gap-2">
                          <span className="text-green-500 text-2xl">•</span>
                          <span className="bg-green-100 dark:bg-green-900/40 px-4 py-2 rounded-lg flex-1">
                            فولڈر پر مبنی routing
                          </span>
                        </p>
                      </div>

                      {/* Layout */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-teal-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🏗️
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Layout
                          </h4>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 inline-block">
                          <code className="text-green-300 font-mono text-lg">
                            layout.js
                          </code>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                          تمام pages کو wrap کرتا ہے
                        </p>
                      </div>

                      {/* Hook */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-cyan-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🎣
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Hook
                          </h4>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 inline-block">
                          <code className="text-green-300 font-mono text-lg">
                            usePathname()
                          </code>
                        </div>
                      </div>

                      {/* Component Update */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-amber-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl">
                            🔄
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Component Update
                          </h4>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 text-lg font-medium">
                          صرف children بدلتے ہیں
                        </p>
                      </div>

                      {/* Special Requirement */}
                      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border-l-8 border-orange-500">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xl">
                            ⚠️
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Special Requirement
                          </h4>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-3 inline-block">
                          <code className="text-green-300 font-mono text-lg">
                            'use client'
                          </code>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                          directive ضروری ہے
                        </p>
                      </div>

                      {/* Features Tags */}
                      <div className="mt-6 pt-4 border-t-2 border-green-200 dark:border-green-800">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> فولڈر-based
                          </span>
                          <span className="px-4 py-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> layout.js
                          </span>
                          <span className="px-4 py-2 bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> usePathname
                          </span>
                          <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-sm rounded-full font-medium flex items-center gap-1">
                            <span>✅</span> 'use client'
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center mt-2">
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            فولڈر
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            based
                          </div>
                        </div>
                        <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                            layout
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            root
                          </div>
                        </div>
                        <div className="p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                          <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                            RSC
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            ready
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparison Summary */}
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-purple-300 dark:border-purple-700">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    ⚡
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                    خلاصہ
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
                      1
                    </div>
                    <div>
                      <p className="font-bold text-blue-700 dark:text-blue-300">
                        Pages Router
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        فائل پر مبنی، _app.js، useRouter
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white text-sm font-bold shrink-0">
                      2
                    </div>
                    <div>
                      <p className="font-bold text-green-700 dark:text-green-300">
                        App Router
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        فولڈر پر مبنی، layout.js، usePathname، 'use client'
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-center text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      💡 یاد رکھیں:
                    </span>{" "}
                    دونوں میں Active Link Highlight ممکن ہے، فرق صرف hooks اور
                    file/folder structure میں ہے
                  </p>
                </div>
              </div>
            </section>

            {/* Final Result - What You've Learned */}
            <section className="mb-10">
              {/* Header with Number 12 - FIXED */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl transform hover:scale-110 transition-all duration-300">
                  12
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-l from-yellow-600 to-amber-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-amber-400">
                  🏁 نتیجہ - آپ نے کیا سیکھا؟
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
              </div>

              {/* Main Achievement Card with Trophy Animation */}
              <div className="relative group">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-all duration-1000 animate-pulse"></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border-2 border-yellow-200 dark:border-yellow-900/50 overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 text-8xl opacity-5 dark:opacity-10 transform rotate-12">
                    🏆
                  </div>
                  <div className="absolute bottom-0 left-0 text-8xl opacity-5 dark:opacity-10 transform -rotate-12">
                    🎓
                  </div>

                  {/* Trophy Header */}
                  <div className="flex flex-col md:flex-row items-center justify-between mb-10 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-b-4 border-yellow-400">
                    <div className="flex items-center gap-4">
                      <div className="text-7xl animate-bounce">🏆</div>
                      <div>
                        <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-2">
                          مبارک ہو! 🎉
                        </h3>
                        <p className="text-xl text-gray-700 dark:text-gray-300">
                          آپ نے تینوں Routing Systems پر کمانڈ کر لی ہے
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full text-white font-bold text-xl shadow-lg animate-pulse">
                      ★ ماہر بن گئے ★
                    </div>
                  </div>

                  {/* Learning Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {/* React Router Card */}
                    <div className="relative group/card">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-blue-200 dark:border-blue-800 hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                            ⚛️
                          </div>
                          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full font-bold">
                            ✅ سیکھ لیا
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          React Router
                        </h4>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500">●</span> Top
                            Navigation
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500">●</span> Cool Active
                            Link
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-blue-500">●</span> isActive
                            prop
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                          <code className="text-sm bg-gray-900 text-green-300 px-3 py-1 rounded">
                            NavLink
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* Pages Router Card */}
                    <div className="relative group/card">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-purple-200 dark:border-purple-800 hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                            📄
                          </div>
                          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full font-bold">
                            ✅ سیکھ لیا
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          Pages Router
                        </h4>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-purple-500">●</span> Sidebar
                            with Animation
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-purple-500">●</span> Left
                            Border Effect
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-purple-500">●</span> useRouter
                            hook
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-800">
                          <code className="text-sm bg-gray-900 text-green-300 px-3 py-1 rounded">
                            router.pathname
                          </code>
                        </div>
                      </div>
                    </div>

                    {/* App Router Card */}
                    <div className="relative group/card">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover/card:opacity-100 blur transition-all duration-500"></div>
                      <div className="relative p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-2 border-green-200 dark:border-green-800 hover:shadow-xl transition-all transform hover:-translate-y-2">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-3xl shadow-lg">
                            🚀
                          </div>
                          <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full font-bold">
                            ✅ سیکھ لیا
                          </span>
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                          App Router
                        </h4>
                        <div className="space-y-2">
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-green-500">●</span> Modern
                            Routing
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-green-500">●</span> Slide
                            Animations
                          </p>
                          <p className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <span className="text-green-500">●</span>{" "}
                            usePathname hook
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800">
                          <code className="text-sm bg-gray-900 text-green-300 px-3 py-1 rounded">
                            usePathname()
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Achievements Timeline */}
                  <div className="mb-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl">
                    <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <span className="text-3xl">📋</span>
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        آپ کی کامیابیاں
                      </span>
                    </h4>

                    <div className="space-y-4">
                      <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          1
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            React 19 + react-router-dom
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Top Navigation اور Cool Active Link کے ساتھ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          2
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Next.js Pages Router
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Sidebar اور Left Border Animation کے ساتھ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          3
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Next.js App Router
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Modern Routing اور Slide Animations کے ساتھ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          4
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Active Link Highlight
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            دونوں جانب border effect کے ساتھ
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md hover:shadow-xl transition-all">
                        <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                          5
                        </div>
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                            Slide Animations
                          </p>
                          <p className="text-gray-700 dark:text-gray-300">
                            Sidebar اور page transitions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What You Can Do Now */}
                  <div className="mb-10 p-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white shadow-2xl">
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">🚀</span>
                      <span>اب آپ کیا کر سکتے ہیں؟</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                        <span className="text-3xl">✅</span>
                        <p className="text-lg font-medium">
                          تینوں routing systems استعمال کر سکتے ہیں
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                        <span className="text-3xl">✅</span>
                        <p className="text-lg font-medium">
                          Professional looking UI بنا سکتے ہیں
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                        <span className="text-3xl">✅</span>
                        <p className="text-lg font-medium">
                          Active link effects اور animations شامل کر سکتے ہیں
                        </p>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30">
                        <span className="text-3xl">✅</span>
                        <p className="text-lg font-medium">
                          Pages Router اور App Router کا فرق سمجھ سکتے ہیں
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="mb-10 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl border-l-8 border-yellow-500">
                    <h4 className="text-2xl font-bold mb-4 flex items-center gap-3">
                      <span className="text-3xl">📌</span>
                      <span className="text-gray-900 dark:text-white">
                        یاد رکھیں
                      </span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
                        <div className="text-3xl mb-2 text-purple-600">📄</div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          Pages Router
                        </p>
                        <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-2 inline-block">
                          useRouter()
                        </code>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
                        <div className="text-3xl mb-2 text-green-600">🚀</div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          App Router
                        </p>
                        <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-2 inline-block">
                          usePathname()
                        </code>
                      </div>
                      <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
                        <div className="text-3xl mb-2 text-blue-600">⚛️</div>
                        <p className="font-bold text-gray-900 dark:text-white">
                          React Router
                        </p>
                        <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-2 inline-block">
                          isActive
                        </code>
                      </div>
                    </div>

                    <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 text-center p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                      تینوں میں active link کا طریقہ مختلف ہے، لیکن آپ نے تینوں
                      سیکھ لیے ✅
                    </p>
                  </div>

                  {/* Final Celebration */}
                  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-1">
                    <div className="relative bg-white dark:bg-gray-900 rounded-2xl p-8">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-green-400 rounded-full opacity-20 animate-ping animation-delay-500"></div>
                      </div>

                      <div className="relative text-center">
                        <div className="text-8xl mb-4 animate-bounce">
                          🎉🎉🎉
                        </div>
                        <h3 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                          مبارک ہو!
                        </h3>
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                          آپ Next Routing کے ماہر بن گئے ہیں
                        </p>

                        {/* Confetti Effect */}
                        <div className="flex justify-center gap-4 mt-8">
                          <div
                            className="w-4 h-4 bg-red-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0s" }}
                          ></div>
                          <div
                            className="w-4 h-4 bg-yellow-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-4 h-4 bg-green-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.3s" }}
                          ></div>
                          <div
                            className="w-4 h-4 bg-purple-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                          <div
                            className="w-4 h-4 bg-pink-500 rounded-full animate-bounce"
                            style={{ animationDelay: "0.5s" }}
                          ></div>
                        </div>

                        {/* Share Button */}
                        <button className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto">
                          <span>🎓</span>
                          <span>اپنی کامیابی شیئر کریں</span>
                          <span>🚀</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {/* Quick Reference Section */}
        {activeSection === "reference" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-green-600 dark:text-green-400">
                📚 Quick Reference Card
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                تینوں Routing Systems کا خلاصہ ایک صفحے میں
              </p>
            </div>

            {/* Quick Reference - Beautiful Reference Cards */}
            <section className="mb-10">
              {/* Header */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl flex items-center justify-center text-white text-3xl shadow-xl transform hover:rotate-6 transition-all duration-300">
                  📝
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-l from-yellow-600 to-amber-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-amber-400">
                  Quick Reference Card
                </h2>
                <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full"></div>
              </div>
              {/* Three Column Reference Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* React Router Card */}
                <div className="relative group h-full">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-red-200 dark:border-red-900/50 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    {/* Card Header with Diagonal Split */}
                    <div className="relative h-24 bg-gradient-to-r from-red-500 to-orange-500 overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full"></div>
                      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl filter drop-shadow-lg">
                            ⚛️
                          </span>
                          <div>
                            <h3 className="text-2xl font-black text-white">
                              React Router
                            </h3>
                            <p className="text-sm text-white/80">
                              react-router-dom
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white font-bold text-sm">
                            🔴 v6+
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-6">
                      {/* Install Section */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <span className="text-xl">📦</span>
                          <span className="font-bold">Installation</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 relative group/code">
                          <div className="absolute -top-2 -right-2 opacity-0 group-hover/code:opacity-100 transition-opacity">
                            <button className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                              کاپی کریں
                            </button>
                          </div>
                          <code className="text-green-300 text-sm font-mono block">
                            npm install react-router-dom
                          </code>
                        </div>
                      </div>

                      {/* App.js Example */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <span className="text-xl">🏗️</span>
                          <span className="font-bold">App.js Setup</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono overflow-x-auto">
                          &lt;BrowserRouter&gt;
                          <br />
                          &nbsp;&nbsp;&lt;Routes&gt;
                          <br />
                          &nbsp;&nbsp;&nbsp;&nbsp;&lt;Route path="/" element=
                          {"{<Home />}"} /&gt;
                          <br />
                          &nbsp;&nbsp;&lt;/Routes&gt;
                          <br />
                          &lt;/BrowserRouter&gt;
                        </div>
                      </div>

                      {/* Active Link */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                          <span className="text-xl">🔗</span>
                          <span className="font-bold">Active Link</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          &lt;NavLink className=
                          {"{({isActive}) => isActive ? 'active' : ''}"}&gt;
                          <br />
                          &nbsp;&nbsp;Home
                          <br />
                          &lt;/NavLink&gt;
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="mt-4 pt-4 border-t-2 border-red-200 dark:border-red-800">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                            ✅ isActive prop
                          </span>
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                            ✅ Client Side
                          </span>
                          <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium">
                            ✅ SPA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pages Router Card */}
                <div className="relative group h-full">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-blue-200 dark:border-blue-900/50 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    {/* Card Header with Diagonal Split */}
                    <div className="relative h-24 bg-gradient-to-r from-blue-500 to-indigo-500 overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full"></div>
                      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl filter drop-shadow-lg">
                            📄
                          </span>
                          <div>
                            <h3 className="text-2xl font-black text-white">
                              Pages Router
                            </h3>
                            <p className="text-sm text-white/80">
                              Next.js (legacy)
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white font-bold text-sm">
                            🔵 v12-
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-6">
                      {/* File Structure */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <span className="text-xl">📁</span>
                          <span className="font-bold">فائل بناؤ → URL</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          pages/index.js &nbsp;&nbsp;&nbsp; → &nbsp;/
                          <br />
                          pages/about.js &nbsp;&nbsp;&nbsp; → &nbsp;/about
                        </div>
                      </div>

                      {/* Active Link */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <span className="text-xl">🔗</span>
                          <span className="font-bold">Active Link</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          import {"{ useRouter }"} from 'next/router'
                          <br />
                          const router = useRouter()
                          <br />
                          router.pathname === '/' ? 'active' : ''
                        </div>
                      </div>

                      {/* Layout */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                          <span className="text-xl">🏗️</span>
                          <span className="font-bold">Layout</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          _app.js تمام pages کو wrap کرتا ہے
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="mt-4 pt-4 border-t-2 border-blue-200 dark:border-blue-800">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                            ✅ useRouter()
                          </span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                            ✅ Server Side
                          </span>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                            ✅ File-based
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* App Router Card */}
                <div className="relative group h-full">
                  {/* Animated border glow */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 dark:border-green-900/50 hover:shadow-2xl transition-all transform hover:-translate-y-2">
                    {/* Card Header with Diagonal Split */}
                    <div className="relative h-24 bg-gradient-to-r from-green-500 to-emerald-500 overflow-hidden">
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/20 rounded-full"></div>
                      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/10 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-between px-6">
                        <div className="flex items-center gap-3">
                          <span className="text-5xl filter drop-shadow-lg">
                            🚀
                          </span>
                          <div>
                            <h3 className="text-2xl font-black text-white">
                              App Router
                            </h3>
                            <p className="text-sm text-white/80">
                              Next.js (modern)
                            </p>
                          </div>
                        </div>
                        <div className="bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                          <span className="text-white font-bold text-sm">
                            🟢 v13+
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-6">
                      {/* Folder Structure */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <span className="text-xl">📂</span>
                          <span className="font-bold">فولڈر بناؤ → URL</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          app/page.js &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          → &nbsp;/
                          <br />
                          app/about/page.js &nbsp; → &nbsp;/about
                        </div>
                      </div>

                      {/* Active Link */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <span className="text-xl">🔗</span>
                          <span className="font-bold">Active Link</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          'use client'
                          <br />
                          import {"{ usePathname }"} from 'next/navigation'
                          <br />
                          const pathname = usePathname()
                          <br />
                          pathname === '/' ? 'active' : ''
                        </div>
                      </div>

                      {/* Layout */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <span className="text-xl">🏗️</span>
                          <span className="font-bold">Layout</span>
                        </div>
                        <div className="bg-gray-900 rounded-xl p-3 text-green-300 text-xs font-mono">
                          layout.js تمام pages کو wrap کرتا ہے
                          <br />
                          children صرف بدلتا ہے
                        </div>
                      </div>

                      {/* Key Points */}
                      <div className="mt-4 pt-4 border-t-2 border-green-200 dark:border-green-800">
                        <div className="flex flex-wrap gap-2">
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                            ✅ usePathname()
                          </span>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                            ✅ 'use client'
                          </span>
                          <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full font-medium">
                            ✅ Folder-based
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Cool Active Link Effect Section */}
              <div className="relative group mt-8">
                {/* Animated border glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-100 blur transition-all duration-700"></div>

                {/* Starting div with animated border glow and cool active link effect */}
                {/* Starting div with cool active link effect - STATIC VERSION */}
                <div className="relative bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-8 border-2 border-purple-200 dark:border-purple-900/50 shadow-xl">
                  {/* Header with Lightbulb - STATIC */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg">
                      💡
                    </div>

                    <div className="flex-1">
                      <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Cool Active Link Effect
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        جو آپ نے سیکھا - Left Border Animation
                      </p>
                    </div>
                  </div>

                  {/* Demo Box - STATIC example showing the effect */}
                  <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-200 dark:border-purple-800 mb-6 overflow-hidden">
                    {/* Static left border example - always visible to demonstrate */}
                    <div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-lg"
                      style={{
                        boxShadow: "0 0 20px rgba(66, 153, 225, 0.6)",
                        height: "100%",
                        top: "100%",
                        transform: "translateY(-50%)",
                        transformOrigin: "center",
                      }}
                    ></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 mr-4">
                        {" "}
                        {/* Added mr-4 for right margin */}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                          🎯
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                            Example of Active Link
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            یہ ہے active link کی حالت
                          </p>
                        </div>
                      </div>

                      <div className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-bold">
                        Active State
                      </div>
                    </div>

                    {/* CSS Code Display */}
                    <div className="mt-4 p-4 bg-gray-900 rounded-lg">
                      <pre className="text-green-300 text-sm font-mono">
                        {`.active-link {
  position: relative;
}

.active-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.3);
}`}
                      </pre>
                      <p className="text-yellow-400 text-xs mt-2">
                        *یہ CSS active link پر لگائی جاتی ہے*
                      </p>
                    </div>
                  </div>

                  {/* CSS Explanation Section */}
                  <div className="mt-8 p-5 bg-purple-50 dark:bg-gray-700/50 rounded-xl border border-purple-200 dark:border-purple-800">
                    <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-3 flex items-center gap-2">
                      <span>🎯</span> یہ Effect کیسے کام کرتا ہے؟
                    </h4>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">1.</span>
                        <span>
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            ::before
                          </code>{" "}
                          pseudo-element سے مصنوعی عنصر بنایا
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">2.</span>
                        <span>
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            left: 0
                          </code>{" "}
                          سے بائیں طرف رکھا
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">3.</span>
                        <span>
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            top: 50%
                          </code>{" "}
                          اور{" "}
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            translateY(-50%)
                          </code>{" "}
                          سے بالکل درمیان میں رکھا
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">4.</span>
                        <span>
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            height: 100%
                          </code>{" "}
                          سے اس کی اونچائی مقرر کی
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-purple-500 font-bold">5.</span>
                        <span>
                          <code className="bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded">
                            transform-origin: center
                          </code>{" "}
                          سے درمیان سے پھیلاؤ ممکن ہے
                        </span>
                      </li>
                    </ul>

                    <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        <span className="font-bold">✨ نتیجہ:</span> active link
                        کے بائیں طرف ایک خوبصورت گرادیئنٹ لکیر بن جاتی ہے
                      </p>
                    </div>
                  </div>

                  {/* Two Column Layout - CSS Code and Visual Guide */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                    {/* CSS Code Column */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                        <span className="text-2xl">🎨</span>
                        <span className="font-bold text-lg">CSS Code</span>
                      </div>

                      <div className="bg-gray-900 rounded-xl p-5 shadow-2xl border-2 border-purple-500/30 relative group/code">
                        {/* Copy button */}
                        <div className="absolute -top-3 -right-3 opacity-0 group-hover/code:opacity-100 transition-opacity z-10">
                          <button
                            onClick={() =>
                              handleCopy(`.active-link {
  position: relative;
}

.active-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.3);
}`)
                            }
                            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-3 py-2 rounded-lg shadow-lg font-bold flex items-center gap-1"
                          >
                            <span>📋</span> کاپی کریں
                          </button>
                        </div>

                        <pre className="text-green-300 text-xs font-mono overflow-x-auto leading-relaxed">
                          {`.active-link {
  position: relative;
}

.active-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #4299e1, #667eea);
  border-radius: 0 4px 4px 0;
  box-shadow: 0 0 15px rgba(66, 153, 225, 0.3);
}`}
                        </pre>
                      </div>
                    </div>

                    {/* Visual Guide Column */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-pink-600 dark:text-pink-400">
                        <span className="text-2xl">✨</span>
                        <span className="font-bold text-lg">Visual Guide</span>
                      </div>

                      {/* Visual Preview Box */}
                      <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl border-2 border-purple-200 dark:border-purple-800">
                        <div className="relative w-full py-6 px-4 bg-purple-50 dark:bg-gray-700 rounded-lg">
                          {/* Border example */}
                          <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-r-lg"
                            style={{
                              boxShadow: "0 0 15px rgba(66, 153, 225, 0.6)",
                              height: "100%",
                            }}
                          ></div>

                          <div className="mr-4">
                            {" "}
                            {/* Added right margin to text */}
                            <span className="text-purple-700 dark:text-purple-300 font-bold text-lg block">
                              Active Link Example
                            </span>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              بائیں طرف کی نیلی لکیر (100% height)
                            </p>
                          </div>
                        </div>

                        {/* CSS Properties Explained */}
                        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <span className="font-bold text-blue-600">
                              left: 0
                            </span>
                            <p className="text-gray-600 dark:text-gray-400">
                              بائیں طرف
                            </p>
                          </div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <span className="font-bold text-purple-600">
                              top: 50%
                            </span>
                            <p className="text-gray-600 dark:text-gray-400">
                              درمیان میں
                            </p>
                          </div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <span className="font-bold text-green-600">
                              height: 100%
                            </span>
                            <p className="text-gray-600 dark:text-gray-400">
                              اونچائی
                            </p>
                          </div>
                          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
                            <span className="font-bold text-pink-600">
                              gradient
                            </span>
                            <p className="text-gray-600 dark:text-gray-400">
                              رنگ
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Summary */}
                      <div className="bg-purple-100 dark:bg-purple-900/30 rounded-xl p-4 border-l-8 border-purple-500">
                        <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-2">
                          <span>📌</span> خلاصہ
                        </h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          active link پر بائیں طرف ایک خوبصورت لکیر لگتی ہے جو
                          درمیان سے شروع ہو کر اوپر نیچے پھیلتی ہے
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Tips */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    <div className="px-4 py-2 bg-purple-200 dark:bg-purple-900/40 rounded-full text-purple-800 dark:text-purple-300 text-sm font-medium flex items-center gap-2">
                      <span>⚡</span> ::before pseudo-element
                    </div>
                    <div className="px-4 py-2 bg-pink-200 dark:bg-pink-900/40 rounded-full text-pink-800 dark:text-pink-300 text-sm font-medium flex items-center gap-2">
                      <span>🎯</span> translateY(-50%)
                    </div>
                    <div className="px-4 py-2 bg-orange-200 dark:bg-orange-900/40 rounded-full text-orange-800 dark:text-orange-300 text-sm font-medium flex items-center gap-2">
                      <span>✨</span> gradient border
                    </div>
                  </div>
                </div>
              </div>
              {/* Ending section  */}
              {/* Footer Note */}
              <div className="mt-6 text-center p-4 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-yellow-300 dark:border-yellow-700">
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    💡 یاد رکھیں:
                  </span>{" "}
                  تینوں routers میں active link کا طریقہ مختلف ہے، لیکن CSS
                  effect ایک جیسا لگا سکتے ہیں
                </p>
              </div>
            </section>

            {/* Comparison Table - Beautiful Parallel Comparison */}
            <section className="mb-10 p-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-xl border border-blue-200 dark:border-blue-900/50">
              {/* Header with Icon */}
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg transform hover:rotate-3 transition-transform">
                  🚀
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-l from-blue-600 to-cyan-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                  تینوں میں فرق - ایک نظر میں
                </h2>
              </div>

              {/* Comparison Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* React Router Card */}
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-blue-200 dark:border-blue-900 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-blue-200 dark:border-blue-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-md">
                        ⚛️
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          React Router
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          react-router-dom
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          📦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Install
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            npm i react-router-dom
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          🏗️
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Layout
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            manual
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          🔗
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Active Link
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            isActive
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          📁
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            File vs Folder
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            Component
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                          ✨
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Animation
                          </p>
                          <p className="text-base font-medium text-green-600 dark:text-green-400">
                            ✅
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-blue-200 dark:border-blue-800 text-center">
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm rounded-full font-medium shadow-md">
                        Client Side
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pages Router Card */}
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-900 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-purple-200 dark:border-purple-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-md">
                        📄
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Pages Router
                        </h3>
                        <p className="text-sm text-purple-600 dark:text-purple-400">
                          Next.js (legacy)
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                          📦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Install
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            built-in
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                          🏗️
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Layout
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            _app.js
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                          🔗
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Active Link
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            router.pathname
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                          📁
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            File vs Folder
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            File
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold text-sm">
                          ✨
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Animation
                          </p>
                          <p className="text-base font-medium text-green-600 dark:text-green-400">
                            ✅
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-purple-200 dark:border-purple-800 text-center">
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm rounded-full font-medium shadow-md">
                        Server Side
                      </span>
                    </div>
                  </div>
                </div>

                {/* App Router Card */}
                <div className="relative group">
                  {/* Glow effect on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500"></div>

                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border-2 border-green-200 dark:border-green-900 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                    {/* Card Header */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-green-200 dark:border-green-800">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-md">
                        🚀
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          App Router
                        </h3>
                        <p className="text-sm text-green-600 dark:text-green-400">
                          Next.js (modern)
                        </p>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                          📦
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Install
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            built-in
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                          🏗️
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Layout
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            layout.js
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                          🔗
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Active Link
                          </p>
                          <code className="text-sm bg-gray-900 text-green-300 px-2 py-1 rounded mt-1 inline-block">
                            usePathname()
                          </code>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                          📁
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            File vs Folder
                          </p>
                          <p className="text-base font-medium text-gray-900 dark:text-white">
                            Folder
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                          ✨
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
                            Animation
                          </p>
                          <p className="text-base font-medium text-green-600 dark:text-green-400">
                            ✅
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="mt-6 pt-4 border-t border-green-200 dark:border-green-800 text-center">
                      <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm rounded-full font-medium shadow-md">
                        Server & Client
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Row */}
              <div className="mt-8 p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-900/50">
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      React Router: manual layout
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      Pages Router: _app.js layout
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      App Router: layout.js
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">
                      تینوں میں animations ہیں
                    </span>
                  </div>
                </div>
              </div>

              {/* Note */}
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-bold text-blue-600 dark:text-blue-400">
                    💡 نوٹ:
                  </span>{" "}
                  ہر router کا اپنا طریقہ کار ہے، لیکن تینوں میں Active Link
                  Highlight ممکن ہے
                </p>
              </div>
            </section>
          </section>
        )}

        {/* Navigation Buttons */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeSection,
                );
                if (currentIndex > 0) {
                  setActiveSection(tabs[currentIndex - 1].id);
                }
              }}
              className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-800 rounded-lg hover:bg-gray-500 dark:hover:bg-gray-700 transition-colors"
            >
              ← پچھلا ٹاپک
            </button>

            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(
                  (tab) => tab.id === activeSection,
                );
                if (currentIndex < tabs.length - 1) {
                  setActiveSection(tabs[currentIndex + 1].id);
                }
              }}
              className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-colors"
            >
              اگلا ٹاپک →
            </button>
          </div>
        </div>
      </main>
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-30"
        ></div>
      )}
      <style jsx global>{`
        .dark {
          color-scheme: dark;
        }

        * {
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }

        pre {
          font-family: "Courier New", monospace;
          line-height: 1.5;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease forwards;
        }

        .dark ::-webkit-scrollbar {
          width: 10px;
        }

        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 5px;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        /* ADD THESE NEW ANIMATIONS 👇 */
        @keyframes expandBorder {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 70%;
            opacity: 0.8;
          }
          100% {
            height: 100%;
            opacity: 1;
          }
        }

        .animate-border-expand {
          animation: expandBorder 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .dark ::-webkit-scrollbar {
          width: 10px;
        }

        .dark ::-webkit-scrollbar-track {
          background: #1f2937;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 5px;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
        @keyframes expandBorder {
          0% {
            height: 0;
            opacity: 0;
          }
          50% {
            height: 70%;
            opacity: 0.8;
          }
          100% {
            height: 100%;
            opacity: 1;
          }
        }

        .animate-border-expand {
          animation: expandBorder 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        /* موجودہ animations کے ساتھ یہ شامل کریں */

        @keyframes slideBorder {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: 100%;
            opacity: 1;
          }
        }

        @keyframes borderPulse {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(66, 153, 225, 0.8);
          }
          50% {
            box-shadow: 0 0 40px rgba(66, 153, 225, 1);
          }
        }

        .animate-border-pulse {
          animation: borderPulse 2s ease-in-out infinite;
        }
             .dark {
          color-scheme: dark;
        }

        @keyframes slideBorder {
          0% {
            height: 0;
            opacity: 0;
          }
          100% {
            height: 100%;
            opacity: 1;
          }
        }

        .page-enter {
          opacity: 0;
          transform: translateX(30px);
        }

        .page-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }

        .page-exit {
          opacity: 1;
          transform: translateX(0);
        }

        .page-exit-active {
          opacity: 0;
          transform: translateX(-30px);
          transition: opacity 300ms, transform 300ms;
        }
      `}</style>
    </div>
  );
}
