import usePreventDevTools from "./hooks/usePreventDevTools";
import ThemeToggle from "./components/ThemeToggle";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"; // 👈 یہاں سے Router ہٹا دیا گیا ہے
import Nextjshome from "./components/Nextjshome";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";
import Chapter4 from "./components/Chapter4";
import Chapter5 from "./components/Chapter5";
import Chapter6 from "./components/Chapter6";
import Chapter7 from "./components/Chapter7";
import Chapter8 from "./components/Chapter8";
import Chapter9 from "./components/Chapter9";
import Chapter10 from "./components/Chapter10";
import Chapter11 from "./components/Chapter11";
import Chapter12 from "./components/Chapter12";
import Chapter13 from "./components/Chapter13";
import Chapter14 from "./components/Chapter14";

export default function App() {
  // Theme state
  const savedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
 usePreventDevTools();
  return (
    // یہاں ہم نے <Router> کا ٹیگ ہٹا دیا ہے کیونکہ وہ main.jsx میں ہے
    <div
      className={`min-h-screen transition-colors duration-500 font-urdu
      ${
        theme === "dark"
          ? "bg-[#020617] text-white"
          : "bg-[#f0fdf4] text-[#052e16]"
      }`}
      dir="rtl"
    >

      {/* Theme Toggle */}
      <div className="fixed top-24 right-6 z-50">
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </div>
      {/* Main Content */}
      <main className="p-6 md:p-10 text-lg md:text-xl leading-loose">
        <Routes>
          {/* اب سوئچنگ بالکل صحیح کام کرے گی */}
          <Route path="/" element={<Nextjshome />} />
          <Route path="/Chapter2" element={<Chapter2 />} />
          <Route path="/Chapter3" element={<Chapter3 />} />
          <Route path="/Chapter4" element={<Chapter4 />} />
          <Route path="/Chapter5" element={<Chapter5 />} />
          <Route path="/Chapter6" element={<Chapter6 />} />
          <Route path="/Chapter7" element={<Chapter7 />} />
          <Route path="/Chapter8" element={<Chapter8 />} />
          <Route path="/Chapter9" element={<Chapter9 />} />
          <Route path="/Chapter10" element={<Chapter10 />} />
          <Route path="/Chapter11" element={<Chapter11 />} />
          <Route path="/Chapter12" element={<Chapter12 />} />
          <Route path="/Chapter13" element={<Chapter13 />} />
          <Route path="/Chapter14" element={<Chapter14 />} />
        </Routes>
      </main>
    </div>
  );
}
