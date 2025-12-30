import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RightSidebar from "./RightSidebar";

export default function Chapter17() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user-theme") || "light";
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");
  const [activeSection, setActiveSection] = useState("basics");

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

  const SuperSimpleCode = ({ code, title, steps }) => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-green-600 dark:text-green-400">{title}</h3>
        <button
          onClick={() => handleCopy(code)}
          className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 active:scale-95"
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
          <p className="font-bold text-green-700 dark:text-green-300 mb-1">کیسے استعمال کریں:</p>
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
    { id: "basics", label: "🚀 بنیادی اپلوڈ", icon: "📸" },
    { id: "profile", label: "📊 پروفائل پکچر", icon: "👤" },
    { id: "multiple", label: "👥 ملٹی پل اپلوڈ", icon: "🖼️" },
    { id: "delete", label: "🗑️ ڈیلیٹ فیچر", icon: "❌" },
  ];

  return (
    <div dir="rtl" className={`min-h-screen font-sans transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      
      {copySuccess && (
        <div className="fixed top-20 right-0 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-l-xl shadow-2xl font-bold border-l-4 border-yellow-400 animate-bounce">
          {copySuccess}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <button onClick={toggleSidebar} className="p-3 cursor-pointer rounded-full hover:text-blue-500 transition-all focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-700">
          <div className="space-y-1">
            <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "rotate-45 translate-y-2" : ""}`}></span>
            <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "opacity-0" : ""}`}></span>
            <span className={`block w-6 h-1 bg-gray-800 dark:bg-white ${sidebarOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
          </div>
        </button>
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">سبق 17: تصویر اپلوڈ سسٹم</h1>
        </div>
        
        <button 
          onClick={toggleTheme}
          className="cursor-pointer px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ لائٹ موڈ"}
        </button>
      </header>

      <RightSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} theme={theme} />

      <div className="pt-20 pb-4 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex cursor-pointer items-center gap-2 px-4 py-3 rounded-lg transition-all ${activeSection === tab.id 
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-700"}`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-bold whitespace-nowrap">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="pb-20 px-4 max-w-6xl mx-auto">
        
        {activeSection === "basics" && (
          <section className="animate-fadeIn">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-600 dark:text-blue-400">
                📸 سبق 17: تصویر اپلوڈ کرنا سیکھیں!
              </h1>
              <p className="text-lg mb-6 dark:text-gray-300">
                <span className="bg-yellow-200 text-black px-2 py-1 rounded">بہت آسان</span> طریقے سے اپنی ویب سائٹ پر تصویریں اپلوڈ کریں
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <div className="px-4 py-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                  <span className="font-bold text-green-700 dark:text-green-300">⏱️ وقت:</span> 30 منٹ
                </div>
                <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                  <span className="font-bold text-blue-700 dark:text-blue-300">📊 Level:</span> Beginner
                </div>
                <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                  <span className="font-bold text-purple-700 dark:text-purple-300">🎯 مقصد:</span> Profile Picture بنانا
                </div>
              </div>
            </div>

            <section className="mb-10 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-blue-300 dark:border-blue-700">
              <h2 className="text-2xl font-bold mb-4 text-center text-blue-700 dark:text-blue-300">
                🎬 جو ہم بنائیں گے
              </h2>
              <div className="text-center">
                <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="w-64 h-48 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📁</div>
                      <p className="font-bold text-white">فائل منتخب کریں</p>
                      <p className="text-sm mt-2 text-white">→ اپلوڈ کریں → ✅</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">پہلا قدم: Cloudinary Account بنائیں</h2>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/30 p-5 rounded-xl mb-4">
                <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">🎯 کیا کرنا ہے؟</h3>
                <p className="mb-3 text-gray-800 dark:text-gray-300">ایک مفت کلاؤڈ اکاؤنٹ بنائیں جہاں آپ کی تصویریں محفوظ ہوں گی</p>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">①</span>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-300">ویب سائٹ پر جائیں:</p>
                      <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" 
                         className="text-blue-600  dark:text-blue-400 underline font-mono bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                        cloudinary.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">②</span>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-300">سائن اپ کریں:</p>
                      <p className="text-sm text-gray-800 dark:text-gray-400">"Sign Up For Free" پر کلک کریں → Google سے سائن اپ کریں</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <span className="text-green-600 dark:text-green-400 font-bold">③</span>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-300">Credentials کاپی کریں:</p>
                      <div 
                        dir="ltr" 
                        className="bg-gray-800 text-green-300 p-2 rounded text-xs font-mono mt-1 text-left"
                      >
                        Cloud Name: your_cloud_name<br/>
                        API Key: 123456789<br/>
                        API Secret: xyz-abc-123
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <p className="font-bold text-yellow-700 dark:text-yellow-300">💡 ٹپ:</p>
                <p className="text-sm  text-gray-800 dark:text-gray-300">یہ credentials کہیں لکھ لیں یا screenshot لے لیں!</p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">دوسرا قدم: Environment Variables</h2>
              </div>
              
              <SuperSimpleCode
                title=".env.local فائل بنائیں"
                code={`# .env.local - یہ فائل بنائیں
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here`}
                steps={[
                  "اپنے project میں .env.local فائل بنائیں",
                  "اوپر والا کوڈ کاپی کریں",
                  "your_cloud_name کی جگہ اپنا Cloud Name لکھیں",
                  "باقی keys بھی اپنی والی لکھیں"
                ]}
              />
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="font-bold text-blue-700 dark:text-blue-300">⚠️ اہم:</p>
                <p className="text-sm text-gray-800 dark:text-gray-300">یہ فائل کبھی کسی کے ساتھ شیئر نہ کریں!</p>
              </div>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">تیسرا قدم: اپلوڈ کامپوننٹ (بہت آسان!)</h2>
              </div>
              
              <p className="mb-4 dark:text-gray-300">یہ کوڈ کاپی کریں اور اپنے project میں paste کریں:</p>
              
              <SuperSimpleCode
                title="SimpleUpload.js - بس یہی فائل بنانی ہے"
                code={`// components/SimpleUpload.js
"use client";
import { useState } from "react";

export default function SimpleUpload() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  // فائل منتخب کریں
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
      
      // تصویر دکھائیں
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("صرف تصویریں اپلوڈ کریں!");
    }
  };

  // اپلوڈ کریں
  const handleUpload = async () => {
    if (!image) {
      alert("پہلے تصویر منتخب کریں!");
      return;
    }

    setLoading(true);
    
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "ml_default"); // Cloudinary preset

    try {
      const response = await fetch(
        \`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload\`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      
      if (data.secure_url) {
        alert(\`✅ کامیاب! تصویر کا لنک: \${data.secure_url}\`);
        // یہ لنک آپ MongoDB میں save کر سکتے ہیں
      } else {
        alert("اپلوڈ میں مسئلہ!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("نٹ ورک ایرر!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4 text-center dark:text-white">📸 اپنی تصویر اپلوڈ کریں</h3>
      
      {/* فائل منتخب کریں */}
      <div className="mb-4">
        <label className="block mb-2 font-bold dark:text-gray-300">تصویر منتخب کریں:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="w-full p-2 border dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded"
        />
      </div>

      {/* تصویر دکھائیں */}
      {imageUrl && (
        <div className="mb-4 text-center">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg mx-auto border dark:border-gray-600"
          />
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {image.name} ({(image.size / 1024).toFixed(1)} KB)
          </p>
        </div>
      )}

      {/* اپلوڈ بٹن */}
      <button
        onClick={handleUpload}
        disabled={loading || !image}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {loading ? "⏳ اپلوڈ ہو رہا ہے..." : "🚀 اپلوڈ کریں"}
      </button>

      {/* ہدایات */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <p className="text-sm dark:text-gray-300">
          <span className="font-bold dark:text-blue-300">💡 یاد رکھیں:</span><br/>
          1. صرف تصویریں اپلوڈ کریں<br/>
          2. سائز 5MB سے کم رکھیں<br/>
          3. لنک کاپی کر کے محفوظ کر لیں
        </p>
      </div>
    </div>
  );
}`}
                steps={[
                  "پورا کوڈ کاپی کریں",
                  "components فولڈر میں SimpleUpload.js فائل بنائیں",
                  "YOUR_CLOUD_NAME کی جگہ اپنا Cloud Name لکھیں",
                  "کسی بھی page میں <SimpleUpload /> استعمال کریں"
                ]}
              />
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">چوتھا قدم: استعمال کرنا</h2>
              </div>
              
              <SuperSimpleCode
                title="Page.js میں استعمال کریں"
                code={`// app/page.js یا کوئی بھی page
import SimpleUpload from "@/components/SimpleUpload";

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">میری ویب سائٹ</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">📸 اپنی تصویر اپلوڈ کریں</h2>
        <SimpleUpload />
      </div>
      
      <p className="text-gray-600 dark:text-gray-400">
        اوپر والے box میں اپنی تصویر select کریں اور اپلوڈ کریں!
      </p>
    </div>
  );
}`}
                steps={[
                  "یہ کوڈ کاپی کریں",
                  "اپنی page.js فائل میں paste کریں",
                  "npm run dev سے چلائیں",
                  "تصویر اپلوڈ کر کے test کریں"
                ]}
              />
            </section>

            <section className="mb-10 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">🆘 اگر مسئلہ ہو تو؟</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: CORS policy</p>
                  <p className="text-sm text-gray-800 dark:text-gray-300">Cloudinary dashboard میں CORS settings چیک کریں</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: Invalid Cloud Name</p>
                  <p className="text-sm text-gray-800 dark:text-gray-300">YOUR_CLOUD_NAME صحیح لکھیں (dashboard سے دیکھیں)</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ تصویر اپلوڈ نہیں ہو رہی</p>
                  <p className="text-sm text-gray-800 dark:text-gray-300">تصویر کا سائز چیک کریں (5MB سے کم ہو)</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">📞 مدد چاہیے؟</p>
                  <p  className="text-sm text-gray-800 dark:text-gray-300">WhatsApp پر تصویر بھیجیں: <span className="font-mono" dir="ltr">0345-2478754</span></p>
                </div>
              </div>
            </section>

            <section className="mb-10 text-center p-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl text-white">
              <h2 className="text-3xl font-bold mb-4">🎉 مبارک ہو!</h2>
              <p className="text-xl mb-6">آپ نے file upload system بنا لیا! 🚀</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Cloudinary</p>
                  <p className="text-sm">اکاؤنٹ بنایا</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Component</p>
                  <p className="text-sm">بنا لیا</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">اپلوڈ</p>
                  <p className="text-sm">کر لیا</p>
                </div>
              </div>
              
              <button 
                onClick={() => setActiveSection("profile")}
                className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
              >
                🎬 اگلا سبق: MongoDB میں Save کرنا
              </button>
            </section>

            <section className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">👉 اگلا کیا سیکھیں؟</h3>
              <div className="space-y-3">
                <div 
                  onClick={() => setActiveSection("profile")}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-blue-500 text-xl">📊</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Profile Picture System</p>
                    <p className="text-sm text-gray-900 dark:text-gray-400">اپنی تصویر کو profile میں save کریں</p>
                  </div>
                </div>
                <div 
                  onClick={() => setActiveSection("multiple")}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-green-500 text-xl">👥</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Multiple Uploads</p>
                    <p className="text-sm text-gray-900 dark:text-gray-400">ایک سے زیادہ تصویریں اپلوڈ کریں</p>
                  </div>
                </div>
                <div 
                  onClick={() => setActiveSection("delete")}
                  className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="text-purple-500 text-xl">🗑️</span>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">Delete Feature</p>
                    <p className="text-sm text-gray-900 dark:text-gray-400">تصویر delete کرنا سیکھیں</p>
                  </div>
                </div>
              </div>
            </section>
          </section>
        )}

        {activeSection === "profile" && (
          <section className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl">📊</div>
              <div>
                <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">پروفائل پکچر سسٹم</h1>
                <p className="text-gray-600 dark:text-gray-400">اپنی تصویر کو profile میں save کریں</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-xs rounded">⏱️ وقت: 20 منٹ</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-300 text-xs rounded">📊 Level: Easy</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">🎯 کیا بنائیں گے؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="text-4xl mb-3">👤</div>
                  <h3 className="font-bold text-gray-900 mb-2 dark:text-white">User Profile</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">ہر user کی الگ profile picture ہوگی</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
                  <div className="text-4xl mb-3">💾</div>
                  <h3 className="font-bold text-gray-900 mb-2 dark:text-white">Database Save</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">تصویر کا لنک MongoDB میں save ہوگا</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">MongoDB Schema بنائیں</h2>
              </div>
              
              <SuperSimpleCode
                title="models/User.js - User Schema میں profile picture field شامل کریں"
                code={`// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  // نیا فیلڈ شامل کریں
  profilePicture: {
    type: String,
    default: '' // خالی سٹرنگ ڈیفالٹ ہے
  },
  // آپ اور فیلڈز بھی add کر سکتے ہیں
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// اگر پہلے سے schema ہے تو اس میں field add کر دیں
// profilePicture: { type: String, default: '' }

export default mongoose.models.User || mongoose.model('User', userSchema);`}
                steps={[
                  "models فولڈر میں User.js فائل کھولیں",
                  "profilePicture فیلڈ شامل کریں",
                  "مونگو ڈی بی کو ری اسٹارٹ کریں",
                  "نیا user save کریں"
                ]}
              />
              
              <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                <p className="font-bold text-purple-700 dark:text-purple-300">💡 نوٹ:</p>
                <p className="text-lg text-gray-900 dark:text-gray-300">اگر آپ نے پہلے user schema بنایا ہے تو صرف profilePicture فیلڈ شامل کریں</p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">Profile Component بنائیں</h2>
              </div>
              
              <SuperSimpleCode
                title="components/ProfilePicture.js - مکمل کامپوننٹ"
                code={`// components/ProfilePicture.js
"use client";
import { useState, useEffect } from 'react';

export default function ProfilePicture({ userId, initialImage }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(initialImage || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // فائل منتخب کرنے پر
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMessage('❌ تصویر 5MB سے چھوٹی ہونی چاہیے');
        return;
      }
      
      setImage(file);
      
      // Preview بنائیں
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setMessage('');
    }
  };

  // اپلوڈ اور ڈیٹا بیس میں سیو کرنے کا فنکشن
  const handleUpload = async () => {
    if (!image || !userId) {
      setMessage('❌ تصویر اور user ID ضروری ہے');
      return;
    }

    setLoading(true);
    setMessage('⏳ اپلوڈ ہو رہا ہے...');

    try {
      // پہلے Cloudinary پر اپلوڈ کریں
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'profile_pictures');

      const uploadRes = await fetch(
        \`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload\`,
        { method: 'POST', body: formData }
      );

      const uploadData = await uploadRes.json();
      
      if (uploadData.secure_url) {
        // اب MongoDB میں save کریں
        const saveRes = await fetch('/api/user/update-profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId: userId,
            profilePicture: uploadData.secure_url
          })
        });

        const saveData = await saveRes.json();
        
        if (saveData.success) {
          setMessage('✅ تصویر کامیابی سے سیو ہو گئی!');
          // اگر آپ state management استعمال کر رہے ہیں تو وہاں بھی update کریں
        } else {
          setMessage('❌ ڈیٹا بیس میں سیو نہیں ہو سکی');
        }
      } else {
        setMessage('❌ اپلوڈ ناکام ہوا');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('❌ سرور ایرر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-center dark:text-white">👤 پروفائل پکچر</h3>
      
      {/* Current Profile Picture */}
      <div className="text-center mb-6">
        <div className="relative w-32 h-32 mx-auto mb-3">
          {preview ? (
            <img
              src={preview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-blue-500"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-4xl">
              👤
            </div>
          )}
          <label className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600">
            <span className="text-sm">✏️</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </label>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {image ? image.name : 'کوئی تصویر منتخب نہیں'}
        </p>
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={loading || !image}
        className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
      >
        {loading ? '⏳ سیو ہو رہا ہے...' : '💾 پروفائل میں سیو کریں'}
      </button>

      {/* Message */}
      {message && (
        <div className={\`mt-4 p-3 rounded-lg text-center \${message.includes('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'}\`}>
          {message}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-bold mb-2 dark:text-blue-300">📝 ہدایات:</h4>
        <ul className="text-sm space-y-1 dark:text-gray-300">
          <li>1. تصویر منتخب کرنے کے لیے پنسل آئیکن پر کلک کریں</li>
          <li>2. تصویر 5MB سے چھوٹی ہونی چاہیے</li>
          <li>3. سیو بٹن دبائیں - یہ Cloudinary اور MongoDB دونوں میں سیو ہوگی</li>
          <li>4. اگر user logged in نہیں ہے تو پہلے login کرائیں</li>
        </ul>
      </div>
    </div>
  );
}`}
                steps={[
                  "یہ پورا کوڈ کاپی کریں",
                  "components فولڈر میں ProfilePicture.js بنائیں",
                  "YOUR_CLOUD_NAME اپنے cloud name سے تبدیل کریں",
                  "اپنی profile page میں استعمال کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">API Route بنائیں</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/user/update-profile/route.js - User update API"
                code={`// app/api/user/update-profile/route.js
import { NextResponse } from 'next/server';
import User from '@/models/User';
import connectDB from '@/lib/mongodb';

export async function POST(request) {
  try {
    // ڈیٹا بیس سے کنیکٹ کریں
    await connectDB();

    // Request سے ڈیٹا لیں
    const { userId, profilePicture } = await request.json();

    // Validation
    if (!userId || !profilePicture) {
      return NextResponse.json(
        { success: false, error: 'User ID اور تصویر ضروری ہے' },
        { status: 400 }
      );
    }

    // User کو update کریں
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: profilePicture },
      { new: true } // updated document واپس ملے گا
    );

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, error: 'User نہیں ملا' },
        { status: 404 }
      );
    }

    // کامیابی کا جواب
    return NextResponse.json({
      success: true,
      message: 'پروفائل پکچر اپڈیٹ ہو گیا',
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        profilePicture: updatedUser.profilePicture
      }
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'سرور ایرر' },
      { status: 500 }
    );
  }
}`}
                steps={[
                  "app/api/user/update-profile فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "اوپر والا کوڈ پیسٹ کریں",
                  "User model کا راستہ چیک کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">استعمال کرنے کا طریقہ</h2>
              </div>
              
              <SuperSimpleCode
                title="profile/page.js - Profile page میں استعمال کریں"
                code={`// app/profile/page.js
"use client";
import { useState, useEffect } from 'react';
import ProfilePicture from '@/components/ProfilePicture';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // User data fetch کریں (example)
  useEffect(() => {
    // یہاں آپ auth سے user data لے سکتے ہیں
    const fetchUser = async () => {
      try {
        // Example: localStorage سے user data
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 dark:text-gray-300">لوڈ ہو رہا ہے...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">👤 میرا پروفائل</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Profile Info */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">معلومات</h2>
            {user ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">نام:</p>
                  <p className="text-lg font-bold dark:text-white">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ای میل:</p>
                  <p className="text-lg dark:text-white">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">رکنیت:</p>
                  <p className="text-lg dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString('ur-PK')}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">براہ کرم login کریں</p>
            )}
          </div>

          {/* Right: Profile Picture */}
          <div>
            <ProfilePicture 
              userId={user?._id} 
              initialImage={user?.profilePicture}
            />
            
            {/* Current Picture Info */}
            {user?.profilePicture && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="font-bold text-green-600 dark:text-green-400 mb-2">
                  ✅ پروفائل پکچر موجود ہے
                </p>
                <p className="text-sm dark:text-gray-300">
                  آپ کی پروفائل پکچر سیو ہو چکی ہے۔ نیا اپلوڈ کرنے سے پرانا تبدیل ہو جائے گا۔
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
          <h3 className="text-xl font-bold mb-3 dark:text-white">🚀 کامیابی کے اقدامات</h3>
          <ol className="list-decimal pr-6 space-y-2 dark:text-gray-300">
            <li>پہلے Cloudinary اکاؤنٹ بنائیں</li>
            <li>MongoDB میں User schema update کریں</li>
            <li>ProfilePicture component انسٹال کریں</li>
            <li>API route بنائیں</li>
            <li>Profile page میں استعمال کریں</li>
            <li>تصویر اپلوڈ کر کے test کریں</li>
          </ol>
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "اپنی profile page میں یہ کوڈ استعمال کریں",
                  "userId کو اپنے auth system سے connect کریں",
                  "ProfilePicture component include کریں",
                  "Test کریں کہ تصویر save ہو رہی ہے یا نہیں"
                ]}
              />
            </div>

            <div className="mb-10 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">🆘 اگر مسئلہ ہو تو؟</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: User not found</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">User ID چیک کریں۔ login system ٹھیک ہے یا نہیں</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ تصویر اپلوڈ ہوتی ہے لیکن ڈیٹا بیس میں نہیں سیو ہوتی</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">API route چیک کریں۔ console میں error دیکھیں</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ 404 Error: API not found</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">API route کا راستہ چیک کریں۔ فولڈر کا نام اور فائل کا نام درست ہونا چاہیے</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">✅ Test کرنے کا طریقہ</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">Postman میں API test کریں: POST request بھیجیں user ID اور image URL کے ساتھ</p>
                </div>
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl text-white mb-10">
              <h2 className="text-3xl font-bold mb-4">🎉 کامیابی!</h2>
              <p className="text-xl mb-6">آپ نے پروفائل پکچر سسٹم بنا لیا! 🚀</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Cloudinary</p>
                  <p className="text-sm">تصویر اپلوڈ ہو گئی</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">MongoDB</p>
                  <p className="text-sm">لنک save ہو گیا</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Profile</p>
                  <p className="text-sm">پکچر دکھ رہی ہے</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "multiple" && (
          <section className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">👥</div>
              <div>
                <h1 className="text-3xl font-bold text-purple-600 dark:text-purple-400">ملٹی پل اپلوڈ سسٹم</h1>
                <p className="text-gray-600 dark:text-gray-400">ایک سے زیادہ تصویریں ایک ساتھ اپلوڈ کریں</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-xs rounded">⏱️ وقت: 30 منٹ</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300 text-xs rounded">📊 Level: Medium</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">🎯 کیا بنائیں گے؟</h2>
              <p className="mb-4 dark:text-gray-300">Gallery system جس میں ایک ساتھ کئی تصویریں اپلوڈ کر سکیں</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">🖼️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Gallery</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">تصویروں کی گیلری</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">📁</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Multiple Select</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">ایک سے زیادہ فائلیں</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">⏳</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Progress Bar</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">اپلوڈ کی پیشرفت</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">ملٹی پل اپلوڈ کامپوننٹ</h2>
              </div>
              
              <SuperSimpleCode
                title="components/MultipleUpload.js - مکمل کامپوننٹ"
                code={`// components/MultipleUpload.js
"use client";
import { useState } from 'react';

export default function MultipleUpload() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  // Multiple files select کرنے کا فنکشن
  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // صرف تصویریں allow کریں
    const imageFiles = selectedFiles.filter(file => 
      file.type.startsWith('image/')
    );
    
    if (imageFiles.length === 0) {
      alert('❌ صرف تصویریں اپلوڈ کریں');
      return;
    }
    
    // File size check (ہر فائل 5MB سے چھوٹی ہو)
    const validFiles = imageFiles.filter(file => file.size <= 5 * 1024 * 1024);
    
    if (validFiles.length < imageFiles.length) {
      alert('❌ کچھ تصویریں 5MB سے بڑی ہیں');
    }
    
    setFiles(validFiles);
    
    // Previews بنائیں
    const newPreviews = [];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push({
          id: Math.random(),
          url: e.target.result,
          name: file.name,
          size: (file.size / 1024).toFixed(1)
        });
        
        if (newPreviews.length === validFiles.length) {
          setPreviews(newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // سب فائلیں اپلوڈ کریں
  const handleUploadAll = async () => {
    if (files.length === 0) {
      alert('❌ پہلے تصویریں منتخب کریں');
      return;
    }

    setUploading(true);
    setProgress(0);
    const urls = [];

    // ہر فائل کو الگ الگ اپلوڈ کریں
    for (let i = 0; i < files.length; i++) {
      try {
        const formData = new FormData();
        formData.append('file', files[i]);
        formData.append('upload_preset', 'multiple_images');

        const response = await fetch(
          \`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload\`,
          { method: 'POST', body: formData }
        );

        const data = await response.json();
        
        if (data.secure_url) {
          urls.push(data.secure_url);
          
          // Progress update کریں
          const newProgress = Math.round(((i + 1) / files.length) * 100);
          setProgress(newProgress);
        }
      } catch (error) {
        console.error(\`فائل \${files[i].name} اپلوڈ نہیں ہو سکی:\`, error);
      }
    }

    setUploadedUrls(urls);
    setUploading(false);
    
    if (urls.length > 0) {
      alert(\`✅ \${urls.length} میں سے \${urls.length} تصویریں اپلوڈ ہو گئیں!\`);
    }
  };

  // ایک فائل ڈیلیٹ کریں
  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  // تمام فائلیں کلئیر کریں
  const clearAll = () => {
    setFiles([]);
    setPreviews([]);
    setUploadedUrls([]);
    setProgress(0);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">🖼️ ملٹی پل اپلوڈ</h2>
      
      {/* File Input */}
      <div className="mb-6">
        <label className="block mb-2 font-bold dark:text-gray-300">
          تصویریں منتخب کریں (ایک سے زیادہ):
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="w-full p-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 cursor-pointer hover:border-blue-500 dark:hover:border-blue-500"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          آپ ایک ساتھ کئی تصویریں select کر سکتے ہیں (Ctrl+Click یا Shift+Click)
        </p>
      </div>

      {/* Progress Bar */}
      {uploading && (
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="font-bold dark:text-gray-300">اپلوڈ ہو رہا ہے...</span>
            <span className="font-bold dark:text-white">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: \`\${progress}%\` }}
            ></div>
          </div>
          <p className="text-sm text-center mt-2 dark:text-gray-400">
            {Math.round(files.length * (progress / 100))} / {files.length} تصویریں مکمل
          </p>
        </div>
      )}

      {/* Selected Files Preview */}
      {previews.length > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold dark:text-gray-300">
              منتخب شدہ تصویریں: ({previews.length})
            </h3>
            <button
              onClick={clearAll}
              className="px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
            >
              ❌ سب ڈیلیٹ کریں
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={preview.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => removeFile(index)}
                    className="bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ❌
                  </button>
                </div>
                <div className="mt-1">
                  <p className="text-xs truncate dark:text-gray-300">{preview.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{preview.size} KB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleUploadAll}
          disabled={uploading || files.length === 0}
          className="flex-1 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
        >
          {uploading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              اپلوڈ ہو رہا ہے...
            </span>
          ) : (
            \`🚀 سب اپلوڈ کریں (\${files.length})\`
          )}
        </button>
        
        <button
          onClick={() => document.querySelector('input[type="file"]').click()}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:opacity-90"
        >
          ➕ مزید شامل کریں
        </button>
      </div>

      {/* Uploaded URLs */}
      {uploadedUrls.length > 0 && (
        <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <h3 className="font-bold mb-3 text-green-700 dark:text-green-300">
            ✅ کامیابی سے اپلوڈ ہو گئیں ({uploadedUrls.length})
          </h3>
          <div className="space-y-2">
            {uploadedUrls.map((url, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="flex-1 p-2 text-sm bg-white dark:bg-gray-900 border dark:border-gray-700 rounded dark:text-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(url)}
                  className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                >
                  کاپی
                </button>
              </div>
            ))}
          </div>
          <p className="text-sm mt-3 dark:text-gray-300">
            💡 یہ URLs آپ MongoDB میں save کر سکتے ہیں gallery کے لیے
          </p>
        </div>
      )}

      {/* Instructions */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-bold mb-2 dark:text-blue-300">📋 ہدایات:</h4>
        <ul className="text-sm space-y-1 dark:text-gray-300">
          <li>1. "تصویریں منتخب کریں" پر کلک کر کے کئی تصویریں select کریں</li>
          <li>2. Preview میں آپ ہر تصویر دیکھ سکتے ہیں اور ڈیلیٹ کر سکتے ہیں</li>
          <li>3. "سب اپلوڈ کریں" بٹن دبائیں - تمام تصویریں اپلوڈ ہو جائیں گی</li>
          <li>4. Progress bar اپلوڈ کی پیشرفت دکھائے گی</li>
          <li>5. اپلوڈ کے بعد URLs کاپی کر کے استعمال کر سکتے ہیں</li>
        </ul>
      </div>
    </div>
  );
}`}
                steps={[
                  "یہ پورا کوڈ کاپی کریں",
                  "components/MultipleUpload.js فائل بنائیں",
                  "YOUR_CLOUD_NAME اپنے cloud name سے تبدیل کریں",
                  "کسی بھی page میں استعمال کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">گیلری ڈسپلے کامپوننٹ</h2>
              </div>
              
              <SuperSimpleCode
                title="components/ImageGallery.js - اپلوڈ شدہ تصویروں کو دکھائیں"
                code={`// components/ImageGallery.js
"use client";
import { useState } from 'react';

export default function ImageGallery({ images = [] }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  // تصویر کو fullscreen میں دکھائیں
  const openFullscreen = (image) => {
    setSelectedImage(image);
  };

  // تصویر ڈیلیٹ کریں
  const deleteImage = async (imageUrl, index) => {
    if (!confirm('کیا آپ واقعی اس تصویر کو ڈیلیٹ کرنا چاہتے ہیں؟')) {
      return;
    }

    try {
      alert('❌ ڈیلیٹ فیچر اگلے سیکشن میں سیکھیں گے');
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  // تصویر ڈاؤنلوڈ کریں
  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imageName || 'image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  // اگر کوئی تصویر نہ ہو
  if (images.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <div className="text-5xl mb-4">🖼️</div>
        <h3 className="text-xl font-bold mb-2 dark:text-gray-300">کوئی تصویر نہیں</h3>
        <p className="text-gray-600 dark:text-gray-400">
          ابھی تک کوئی تصویر اپلوڈ نہیں کی گئی۔ پہلے تصویریں اپلوڈ کریں۔
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">📸 میری گیلری</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {images.length} تصویریں
          </p>
        </div>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700"
          >
            <option value="all">سب تصویریں</option>
            <option value="recent">تازہ ترین</option>
            <option value="old">پرانی</option>
          </select>
          
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            🖨️ پرنٹ
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="group relative overflow-hidden rounded-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300"
          >
            {/* تصویر */}
            <div 
              className="aspect-square cursor-pointer"
              onClick={() => openFullscreen(image)}
            >
              <img
                src={image.url || image}
                alt={\`Image \${index + 1}\`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            {/* Overlay Actions */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
              <button
                onClick={() => openFullscreen(image)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                title="بڑا دیکھیں"
              >
                🔍
              </button>
              <button
                onClick={() => downloadImage(image.url || image, \`image-\${index + 1}.jpg\`)}
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30"
                title="ڈاؤنلوڈ کریں"
              >
                ⬇️
              </button>
              <button
                onClick={() => deleteImage(image.url || image, index)}
                className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full hover:bg-red-600"
                title="ڈیلیٹ کریں"
              >
                ❌
              </button>
            </div>

            {/* Image Info */}
            <div className="p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <p className="text-xs truncate dark:text-gray-300">
                تصویر #{index + 1}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date().toLocaleDateString('ur-PK')}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage.url || selectedImage}
              alt="Fullscreen"
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 left-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              ❌ بند کریں
            </button>
            
            {/* Download Button */}
            <button
              onClick={() => downloadImage(selectedImage.url || selectedImage, 'image-full.jpg')}
              className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              ⬇️ ڈاؤنلوڈ
            </button>
            
            {/* Image Info */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="text-sm">تصویر کا سائز: 1920×1080</p>
              <p className="text-xs opacity-75">کلک کر کے بند کریں</p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
        <h3 className="font-bold mb-2 dark:text-white">📊 گیلری کے اعداد و شمار</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{images.length}</p>
            <p className="text-sm dark:text-gray-300">کل تصویریں</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">0</p>
            <p className="text-sm dark:text-gray-300">آج اپلوڈ</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">∞</p>
            <p className="text-sm dark:text-gray-300">سٹوریج</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">100%</p>
            <p className="text-sm dark:text-gray-300">کوالٹی</p>
          </div>
        </div>
      </div>
    </div>
  );
}`}
                steps={[
                  "یہ کامپوننٹ MultipleUpload کے ساتھ استعمال کریں",
                  "images prop میں URLs کی array پاس کریں",
                  "گیلری کو اپنے design کے مطابق customize کریں",
                  "API calls کو implement کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ایک ساتھ استعمال کریں</h2>
              </div>
              
              <SuperSimpleCode
                title="app/gallery/page.js - مکمل گیلری پیج"
                code={`// app/gallery/page.js
"use client";
import { useState } from 'react';
import MultipleUpload from '@/components/MultipleUpload';
import ImageGallery from '@/components/ImageGallery';

export default function GalleryPage() {
  const [images, setImages] = useState([
    // Example images - آپ MongoDB سے fetch کریں گے
    { url: 'https://example.com/image1.jpg', name: 'تصویر 1' },
    { url: 'https://example.com/image2.jpg', name: 'تصویر 2' },
  ]);

  // نئی اپلوڈ شدہ تصویریں شامل کریں
  const handleNewUpload = (newUrls) => {
    const newImages = newUrls.map(url => ({ url, name: 'نیا اپلوڈ' }));
    setImages([...images, ...newImages]);
    
    // یہاں آپ MongoDB میں بھی save کر سکتے ہیں
    console.log('نئی تصویریں:', newUrls);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🖼️ میری تصویریں
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            اپنی پسندیدہ تصویریں اپلوڈ کریں، دیکھیں اور شیئر کریں
          </p>
        </header>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{images.length}</p>
            <p className="text-sm dark:text-gray-400">کل تصویریں</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">∞</p>
            <p className="text-sm dark:text-gray-400">سٹوریج</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">5 MB</p>
            <p className="text-sm dark:text-gray-400">فی تصویر</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow text-center">
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">100%</p>
            <p className="text-sm dark:text-gray-400">کوالٹی</p>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left: Upload Section */}
          <div>
            <div className="sticky top-24">
              <MultipleUpload />
              
              {/* Instructions */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                <h3 className="font-bold mb-2 dark:text-green-300">💡 ملٹی پل اپلوڈ کی خصوصیات:</h3>
                <ul className="text-sm space-y-1 dark:text-gray-300">
                  <li>✓ ایک ساتھ کئی تصویریں اپلوڈ کریں</li>
                  <li>✓ Progress bar دیکھیں</li>
                  <li>✓ ہر تصویر کا preview دیکھیں</li>
                  <li>✓ ناپسندیدہ تصویر ڈیلیٹ کریں</li>
                  <li>✓ URLs خود بخود کاپی ہو جائیں</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Gallery Section */}
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold dark:text-white">📸 میری گیلری</h2>
                <button
                  onClick={() => setImages([])}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                >
                  ❌ سب ڈیلیٹ کریں
                </button>
              </div>
              
              <ImageGallery images={images} />
              
              {/* Gallery Tips */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
                <h3 className="font-bold mb-2 dark:text-blue-300">🎯 گیلری کے استعمال کے ٹپس:</h3>
                <ul className="text-sm space-y-1 dark:text-gray-300">
                  <li>🔍 تصویر پر hover کریں - action buttons نظر آئیں گے</li>
                  <li>📱 تصویر پر کلک کریں - fullscreen mode میں دیکھیں</li>
                  <li>⬇️ ڈاؤنلوڈ بٹن - تصویر اپنے کمپیوٹر میں save کریں</li>
                  <li>❌ ڈیلیٹ بٹن - تصویر گیلری سے ہٹائیں</li>
                  <li>🖨️ پرنٹ بٹن - گیلری کو پرنٹ کریں</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="text-center p-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white">
          <h3 className="text-2xl font-bold mb-2">🎉 کامیابی!</h3>
          <p className="mb-4">آپ نے ملٹی پل اپلوڈ سسٹم بنا لیا ہے!</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100">
              📚 Documentation
            </button>
            <button className="px-6 py-2 bg-black/30 text-white rounded-lg font-bold hover:bg-black/40">
              🎬 Video Tutorial
            </button>
            <button className="px-6 py-2 bg-white text-purple-600 rounded-lg font-bold hover:bg-gray-100">
              💬 Community
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}`}
                steps={[
                  "ایک نئی page بنائیں: app/gallery/page.js",
                  "اوپر والا کوڈ paste کریں",
                  "MultipleUpload اور ImageGallery components import کریں",
                  "npm run dev سے test کریں"
                ]}
              />
            </div>

            <div className="mb-10 p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center text-orange-600 dark:text-orange-400">🆘 اگر مسئلہ ہو تو؟</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: Too many files selected</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">فائل limit لگائیں: if (files.length > 10) alert('زیادہ سے زیادہ 10 تصویریں')</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: Some images failed to upload</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">loop میں try-catch استعمال کریں تاکہ ایک فائل fail ہو تو باقی چلتی رہیں</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-red-600 dark:text-red-400 mb-2">❌ Error: Preview not showing</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">FileReader async ہے، state update synchronous نہیں ہے۔ await استعمال کریں</p>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                  <p className="font-bold text-green-600 dark:text-green-400 mb-2">✅ بہترین طریقہ</p>
                  <p className="text-sm text-gray-900 dark:text-gray-300">Progress bar کے لیے Promise.allSettled استعمال کریں تاکہ تمام فائلیں process ہوں</p>
                </div>
              </div>
            </div>

            <div className="text-center p-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl text-white mb-10">
              <h2 className="text-3xl font-bold mb-4">🚀 کامیابی!</h2>
              <p className="text-xl mb-6">آپ نے ملٹی پل اپلوڈ سسٹم بنا لیا!</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Multiple Upload</p>
                  <p className="text-sm">کئی تصویریں ایک ساتھ</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Progress Bar</p>
                  <p className="text-sm">اپلوڈ کی پیشرفت</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">✅</div>
                  <p className="font-bold">Gallery</p>
                  <p className="text-sm">تمام تصویریں دیکھیں</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {activeSection === "delete" && (
          <section className="animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl">🗑️</div>
              <div>
                <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">تصویر ڈیلیٹ کرنا</h1>
                <p className="text-gray-600 dark:text-gray-400">Cloudinary اور MongoDB سے تصویر ڈیلیٹ کرنا سیکھیں</p>
                <div className="flex gap-2 mt-2">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-300 text-xs rounded">⏱️ وقت: 25 منٹ</span>
                  <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-300 text-xs rounded">📊 Level: Medium</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-2xl mb-8">
              <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-300">🎯 کیا سیکھیں گے؟</h2>
              <p className="mb-4 text-gray-800 dark:text-gray-300">تصویر کو مکمل طور پر delete کرنا - Cloudinary سے اور MongoDB سے</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">☁️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Cloudinary</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">تصویر ڈیلیٹ کریں</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">🗄️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">MongoDB</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">لنک ڈیلیٹ کریں</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <div className="text-4xl mb-2">⚠️</div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Confirmation</h3>
                  <p className="text-sm text-gray-900 dark:text-gray-300">ڈیلیٹ کنفرم کریں</p>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Cloudinary سے ڈیلیٹ کریں</h2>
              </div>
              
              <SuperSimpleCode
                title="utils/cloudinary.js - ڈیلیٹ فنکشن"
                code={`// utils/cloudinary.js
/**
 * Cloudinary سے تصویر ڈیلیٹ کرنے کا فنکشن
 * @param {string} publicId - تصویر کا public ID
 * @returns {Promise} - Delete operation کا result
 */
export async function deleteImageFromCloudinary(publicId) {
  try {
    // Cloudinary API credentials
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    
    if (!cloudName || !apiKey || !apiSecret) {
      throw new Error('Cloudinary credentials missing');
    }

    // Public ID extract کریں URL سے
    // URL: https://res.cloudinary.com/demo/image/upload/v1234567/sample.jpg
    // Public ID: sample
    let actualPublicId = publicId;
    
    if (publicId.includes('cloudinary.com')) {
      // URL سے public ID نکالیں
      const urlParts = publicId.split('/');
      const uploadIndex = urlParts.indexOf('upload');
      if (uploadIndex !== -1) {
        // upload کے بعد کا حصہ public ID ہے
        actualPublicId = urlParts.slice(uploadIndex + 2).join('/').split('.')[0];
      }
    }

    // API signature بنائیں (security کے لیے)
    const timestamp = Math.round((new Date()).getTime() / 1000);
    const signature = generateSignature(actualPublicId, timestamp);

    // API request بھیجیں
    const response = await fetch(
      \`https://api.cloudinary.com/v1_1/\${cloudName}/image/destroy\`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_id: actualPublicId,
          signature: signature,
          api_key: apiKey,
          timestamp: timestamp,
        }),
      }
    );

    const result = await response.json();

    if (result.result === 'ok') {
      return {
        success: true,
        message: 'تصویر Cloudinary سے ڈیلیٹ ہو گئی',
        data: result
      };
    } else {
      return {
        success: false,
        error: 'Cloudinary delete failed',
        details: result
      };
    }

  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Cloudinary API signature generate کریں
 * Security کے لیے ضروری ہے
 */
function generateSignature(publicId, timestamp) {
  const crypto = require('crypto');
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  
  const signatureString = \`public_id=\${publicId}&timestamp=\${timestamp}\${apiSecret}\`;
  
  return crypto
    .createHash('sha1')
    .update(signatureString)
    .digest('hex');
}

/**
 * بہت آسان ڈیلیٹ فنکشن (بغیر signature کے)
 * صرف test کے لیے
 */
export async function simpleDeleteImage(imageUrl) {
  try {
    // Public ID extract کریں
    const urlParts = imageUrl.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    
    if (uploadIndex === -1) {
      throw new Error('Invalid Cloudinary URL');
    }
    
    const publicIdWithVersion = urlParts.slice(uploadIndex + 1).join('/');
    const publicId = publicIdWithVersion.split('.')[0];
    
    // Cloudinary delete request
    const response = await fetch(\`/api/cloudinary/delete?publicId=\${publicId}\`, {
      method: 'DELETE',
    });
    
    return await response.json();
    
  } catch (error) {
    console.error('Simple delete error:', error);
    return { success: false, error: error.message };
  }
}`}
                steps={[
                  "utils فولڈر میں cloudinary.js فائل بنائیں",
                  "اوپر والے دونوں فنکشن کاپی کریں",
                  ".env میں credentials شامل کریں",
                  "server side پر ہی استعمال کریں"
                ]}
              />
              
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
                <p className="font-bold text-red-700 dark:text-red-300">⚠️ اہم نوٹ:</p>
                <p className="text-base text-gray-800 dark:text-gray-300">
                  Cloudinary delete API کو server side پر ہی call کریں۔ 
                  API keys client side پر نہ بھیجیں۔
                </p>
              </div>
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400">API Route بنائیں</h2>
              </div>
              
              <SuperSimpleCode
                title="app/api/images/delete/route.js - مکمل ڈیلیٹ API"
                code={`// app/api/images/delete/route.js
import { NextResponse } from 'next/server';
import { deleteImageFromCloudinary } from '@/utils/cloudinary';
import ImageModel from '@/models/Image'; // آپ کا Image model
import connectDB from '@/lib/mongodb';

export async function DELETE(request) {
  try {
    // 1. Connect to database
    await connectDB();

    // 2. Get data from request
    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');
    const imageId = searchParams.get('imageId');
    
    // 3. Validate input
    if (!publicId && !imageId) {
      return NextResponse.json(
        { success: false, error: 'Public ID یا Image ID ضروری ہے' },
        { status: 400 }
      );
    }

    let imageToDelete = null;
    
    // 4. اگر imageId دیا گیا ہے تو database سے تصویر تلاش کریں
    if (imageId) {
      imageToDelete = await ImageModel.findById(imageId);
      
      if (!imageToDelete) {
        return NextResponse.json(
          { success: false, error: 'تصویر نہیں ملی' },
          { status: 404 }
        );
      }
    }

    // 5. Cloudinary سے تصویر ڈیلیٹ کریں
    const cloudinaryResult = await deleteImageFromCloudinary(
      publicId || imageToDelete?.url
    );

    if (!cloudinaryResult.success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Cloudinary delete failed',
          details: cloudinaryResult.error 
        },
        { status: 500 }
      );
    }

    // 6. اگر database میں ہے تو وہاں سے بھی ڈیلیٹ کریں
    if (imageId && imageToDelete) {
      await ImageModel.findByIdAndDelete(imageId);
      
      return NextResponse.json({
        success: true,
        message: 'تصویر Cloudinary اور Database دونوں سے ڈیلیٹ ہو گئی',
        deletedImage: {
          id: imageToDelete._id,
          url: imageToDelete.url
        }
      });
    }

    // 7. صرف Cloudinary سے ڈیلیٹ کا response
    return NextResponse.json({
      success: true,
      message: 'تصویر Cloudinary سے ڈیلیٹ ہو گئی',
      details: cloudinaryResult.data
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // 8. Error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'سرور ایرر',
        message: error.message 
      },
      { status: 500 }
    );
  }
}

// POST method بھی (optional)
export async function POST(request) {
  try {
    const body = await request.json();
    const { imageUrl, imageId } = body;

    // Validate
    if (!imageUrl && !imageId) {
      return NextResponse.json(
        { success: false, error: 'تصویر کا لنک یا ID ضروری ہے' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Database سے ڈیلیٹ
    if (imageId) {
      const deletedImage = await ImageModel.findByIdAndDelete(imageId);
      
      if (!deletedImage) {
        return NextResponse.json(
          { success: false, error: 'تصویر نہیں ملی' },
          { status: 404 }
        );
      }

      // Cloudinary سے بھی ڈیلیٹ کریں
      const cloudinaryResult = await deleteImageFromCloudinary(deletedImage.url);

      return NextResponse.json({
        success: cloudinaryResult.success,
        message: cloudinaryResult.success 
          ? 'تصویر مکمل طور پر ڈیلیٹ ہو گئی' 
          : 'تصویر database سے ڈیلیٹ ہو گئی لیکن Cloudinary میں رہ گئی',
        deletedImage: {
          id: deletedImage._id,
          url: deletedImage.url
        },
        cloudinaryResult
      });
    }

    // صرف URL دیا گیا ہے
    const cloudinaryResult = await deleteImageFromCloudinary(imageUrl);
    
    return NextResponse.json({
      success: cloudinaryResult.success,
      message: cloudinaryResult.success 
        ? 'تصویر Cloudinary سے ڈیلیٹ ہو گئی' 
        : 'ڈیلیٹ ناکام',
      details: cloudinaryResult
    });

  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, error: 'سرور ایرر' },
      { status: 500 }
    );
  }
}`}
                steps={[
                  "app/api/images/delete فولڈر بنائیں",
                  "route.js فائل بنائیں",
                  "اوپر والا کوڈ paste کریں",
                  "Image model کا راستہ درست کریں",
                  "utils/cloudinary.js import کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">ڈیلیٹ کامپوننٹ بنائیں</h2>
              </div>
              
              <SuperSimpleCode
                title="components/DeleteImage.js - محفوظ طریقے سے ڈیلیٹ کریں"
                code={`// components/DeleteImage.js
"use client";
import { useState } from 'react';

export default function DeleteImage({ imageId, imageUrl, onDelete, showPreview = true }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState('');
  const [deleteType, setDeleteType] = useState('both'); // 'both', 'cloudinary', 'database'

  // ڈیلیٹ کا عمل شروع کریں
  const handleDelete = async () => {
    if (!imageId && !imageUrl) {
      setMessage('❌ ڈیلیٹ کے لیے تصویر کا لنک یا ID ضروری ہے');
      return;
    }

    setIsDeleting(true);
    setMessage('⏳ ڈیلیٹ ہو رہا ہے...');

    try {
      let response;
      
      // API call کا انتخاب deleteType کے مطابق
      if (deleteType === 'both' || deleteType === 'database') {
        // مکمل ڈیلیٹ - database اور cloudinary دونوں سے
        response = await fetch('/api/images/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            imageId: imageId,
            imageUrl: imageUrl 
          }),
        });
      } else {
        // صرف Cloudinary سے ڈیلیٹ
        response = await fetch(\`/api/images/delete?publicId=\${encodeURIComponent(imageUrl)}\`, {
          method: 'DELETE',
        });
      }

      const result = await response.json();

      if (result.success) {
        setMessage('✅ تصویر کامیابی سے ڈیلیٹ ہو گئی!');
        
        // Parent component کو inform کریں
        if (onDelete) {
          onDelete(imageId || imageUrl);
        }
        
        // 3 سیکنڈ بعد message clear کریں
        setTimeout(() => {
          setMessage('');
          setShowConfirm(false);
        }, 3000);
      } else {
        setMessage(\`❌ ڈیلیٹ ناکام: \${result.error || result.message}\`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      setMessage('❌ نیٹ ورک ایرر۔ دوبارہ کوشش کریں');
    } finally {
      setIsDeleting(false);
    }
  };

  // ڈیلیٹ کی تصدیق
  const confirmDelete = () => {
    setShowConfirm(true);
    setMessage('کیا آپ واقعی اس تصویر کو ڈیلیٹ کرنا چاہتے ہیں؟');
  };

  // ڈیلیٹ کینسل کریں
  const cancelDelete = () => {
    setShowConfirm(false);
    setMessage('');
  };

  return (
    <div className="inline-block">
      {/* ڈیلیٹ بٹن */}
      {!showConfirm ? (
        <button
          onClick={confirmDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
          title="تصویر ڈیلیٹ کریں"
        >
          <span>🗑️</span>
          <span>ڈیلیٹ کریں</span>
        </button>
      ) : (
        /* تصدیق کا ڈائیلاگ */
        <div className="bg-white dark:bg-gray-800 border-2 border-red-300 dark:border-red-700 rounded-xl p-4 shadow-xl min-w-[300px]">
          <h3 className="font-bold text-lg mb-3 text-red-600 dark:text-red-400">
            ⚠️ ڈیلیٹ کی تصدیق
          </h3>
          
          {showPreview && imageUrl && (
            <div className="mb-3">
              <img
                src={imageUrl}
                alt="To delete"
                className="w-full h-32 object-cover rounded-lg"
              />
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-center">
                کیا آپ واقعی یہ تصویر ڈیلیٹ کرنا چاہتے ہیں؟
              </p>
            </div>
          )}
          
          {/* ڈیلیٹ کے اختیارات */}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 dark:text-gray-300">
              ڈیلیٹ کا طریقہ:
            </label>
            <div className="flex flex-wrap gap-2">
              {['both', 'cloudinary', 'database'].map((type) => (
                <button
                  key={type}
                  onClick={() => setDeleteType(type)}
                  className={\`px-3 py-1 text-sm rounded \${deleteType === type ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}\`}
                >
                  {type === 'both' && 'دونوں سے'}
                  {type === 'cloudinary' && 'صرف Cloudinary'}
                  {type === 'database' && 'صرف Database'}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {deleteType === 'both' && 'تصویر مکمل طور پر ڈیلیٹ ہو جائے گی'}
              {deleteType === 'cloudinary' && 'صرف Cloudinary سے ڈیلیٹ ہوگی، database میں رہے گی'}
              {deleteType === 'database' && 'صرف database سے ڈیلیٹ ہوگی، Cloudinary میں رہے گی'}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  ڈیلیٹ ہو رہا ہے...
                </>
              ) : (
                '✅ جی، ڈیلیٹ کریں'
              )}
            </button>
            
            <button
              onClick={cancelDelete}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50"
            >
              ❌ کینسل
            </button>
          </div>
          
          {/* Delete Type Warning */}
          {deleteType !== 'both' && (
            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded text-sm">
              <p className="text-yellow-700 dark:text-yellow-300">
                ⚠️ Warning: Partial delete ممکن ہے data inconsistency کا باعث بنے
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* Message Display */}
      {message && !showConfirm && (
        <div className={\`mt-2 p-2 rounded text-sm \${message.includes('✅') ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : message.includes('❌') ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'}\`}>
          {message}
        </div>
      )}
      
      {/* Instructions */}
      <div className="mt-3 text-xs text-gray-600 dark:text-gray-400">
        <p>🗑️ ڈیلیٹ کرنے سے تصویر مکمل طور پر حذف ہو جائے گی</p>
      </div>
    </div>
  );
}`}
                steps={[
                  "یہ کامپوننٹ کاپی کریں",
                  "components/DeleteImage.js فائل بنائیں",
                  "اپنے gallery میں استعمال کریں",
                  "imageId یا imageUrl prop پاس کریں"
                ]}
              />
            </div>

            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400">مکمل مثال: Gallery میں ڈیلیٹ فیچر</h2>
              </div>
              
              <SuperSimpleCode
                title="components/EnhancedGallery.js - ڈیلیٹ فیچر کے ساتھ گیلری"
                code={`// components/EnhancedGallery.js
"use client";
import { useState } from 'react';
import DeleteImage from './DeleteImage';

export default function EnhancedGallery() {
  // Example images array
  const [images, setImages] = useState([
    {
      id: '1',
      url: 'https://res.cloudinary.com/demo/image/upload/v1234567/image1.jpg',
      name: 'پہلی تصویر',
      uploadedAt: '2024-01-15'
    },
    {
      id: '2', 
      url: 'https://res.cloudinary.com/demo/image/upload/v1234567/image2.jpg',
      name: 'دوسری تصویر',
      uploadedAt: '2024-01-16'
    },
    {
      id: '3',
      url: 'https://res.cloudinary.com/demo/image/upload/v1234567/image3.jpg',
      name: 'تیسری تصویر',
      uploadedAt: '2024-01-17'
    }
  ]);

  // ڈیلیٹ ہونے والی تصویر
  const [deletingImage, setDeletingImage] = useState(null);

  // تصویر ڈیلیٹ کرنے کا فنکشن
  const handleDeleteImage = (deletedId) => {
    // State سے تصویر ہٹائیں
    setImages(prev => prev.filter(img => img.id !== deletedId));
    
    // Deleting state reset کریں
    setDeletingImage(null);
    
    // Success message (optional)
    alert('✅ تصویر کامیابی سے ڈیلیٹ ہو گئی!');
  };

  // Bulk delete
  const handleBulkDelete = async (imageIds) => {
    if (!imageIds.length) {
      alert('❌ ڈیلیٹ کے لیے تصویریں منتخب کریں');
      return;
    }

    if (!confirm(\`کیا آپ واقعی \${imageIds.length} تصویریں ڈیلیٹ کرنا چاہتے ہیں؟\`)) {
      return;
    }

    try {
      // ہر تصویر کو الگ الگ ڈیلیٹ کریں
      for (const imageId of imageIds) {
        const image = images.find(img => img.id === imageId);
        if (image) {
          await fetch('/api/images/delete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ imageId: image.id, imageUrl: image.url })
          });
        }
      }

      // State update کریں
      setImages(prev => prev.filter(img => !imageIds.includes(img.id)));
      alert(\`✅ \${imageIds.length} تصویریں ڈیلیٹ ہو گئیں\`);
      
    } catch (error) {
      console.error('Bulk delete error:', error);
      alert('❌ ڈیلیٹ میں مسئلہ آیا');
    }
  };

  // Single image delete handler
  const deleteSingleImage = async (image) => {
    setDeletingImage(image.id);
    
    try {
      const response = await fetch('/api/images/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId: image.id, imageUrl: image.url })
      });

      const result = await response.json();
      
      if (result.success) {
        handleDeleteImage(image.id);
      } else {
        alert(\`❌ ڈیلیٹ ناکام: \${result.error}\`);
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('❌ نیٹ ورک ایرر');
    } finally {
      setDeletingImage(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold dark:text-white">🗑️ ڈیلیٹ فیچر کے ساتھ گیلری</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {images.length} تصویریں | ڈیلیٹ کا اختیار
          </p>
        </div>
        
        <button
          onClick={() => {
            const selectedIds = images.map(img => img.id);
            handleBulkDelete(selectedIds);
          }}
          className="mt-4 sm:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          ❌ تمام تصویریں ڈیلیٹ کریں
        </button>
      </div>

      {/* Gallery Grid with Delete */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image) => (
          <div 
            key={image.id}
            className={\`relative group border-2 rounded-xl overflow-hidden transition-all \${deletingImage === image.id ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-gray-200 dark:border-gray-700'}\`}
          >
            {/* تصویر */}
            <div className="aspect-video overflow-hidden">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold mb-1">{image.name}</h3>
                <p className="text-white/80 text-sm">
                  {new Date(image.uploadedAt).toLocaleDateString('ur-PK')}
                </p>
              </div>
            </div>
            
            {/* Delete Button */}
            <div className="absolute top-3 right-3">
              <DeleteImage
                imageId={image.id}
                imageUrl={image.url}
                onDelete={handleDeleteImage}
                showPreview={false}
              />
            </div>
            
            {/* Loading State */}
            {deletingImage === image.id && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                  <p className="text-white mt-2">ڈیلیٹ ہو رہا ہے...</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* اگر کوئی تصویر نہ ہو */}
      {images.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">🖼️</div>
          <h3 className="text-xl font-bold mb-2 dark:text-gray-300">کوئی تصویر نہیں</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            تمام تصویریں ڈیلیٹ ہو چکی ہیں
          </p>
          <button
            onClick={() => {
              // Example images واپس لوڈ کریں
              setImages([
                {
                  id: '1',
                  url: 'https://res.cloudinary.com/demo/image/upload/v1234567/sample1.jpg',
                  name: 'نمونہ تصویر 1',
                  uploadedAt: new Date().toISOString()
                },
                {
                  id: '2',
                  url: 'https://res.cloudinary.com/demo/image/upload/v1234567/sample2.jpg',
                  name: 'نمونہ تصویر 2', 
                  uploadedAt: new Date().toISOString()
                }
              ]);
            }}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            ➕ نمونہ تصویریں لوڈ کریں
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
        <h3 className="font-bold mb-3 dark:text-white">📊 ڈیلیٹ کے اعداد و شمار</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{images.length}</p>
            <p className="text-sm dark:text-gray-300">موجودہ تصویریں</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{3 - images.length}</p>
            <p className="text-sm dark:text-gray-300">ڈیلیٹ شدہ</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">3</p>
            <p className="text-sm dark:text-gray-300">کل تصویریں</p>
          </div>
          <div className="text-center p-3 bg-white dark:bg-gray-800 rounded">
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">100%</p>
            <p className="text-sm dark:text-gray-300">ڈیلیٹ کی سہولت</p>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-lg">
        <h3 className="font-bold mb-2 text-red-600 dark:text-red-400">⚠️ ڈیلیٹ کے متعلق اہم معلومات</h3>
        <ul className="text-sm space-y-1 dark:text-gray-300">
          <li>1. ڈیلیٹ ہونے والی تصویر واپس نہیں لائی جا سکتی</li>
          <li>2. Cloudinary اور database دونوں سے ڈیلیٹ ہوتی ہے</li>
          <li>3. ڈیلیٹ کرنے سے پہلے تصدیق ضرور کریں</li>
          <li>4. Bulk delete صرف advanced users کے لیے</li>
          <li>5. Always backup important images</li>
        </ul>
      </div>
    </div>
  );
}`}
                steps={[
                  "یہ مکمل گیلری کاپی کریں",
                  "components/EnhancedGallery.js فائل بنائیں",
                  "DeleteImage component import کریں",
                  "اپنی ویب سائٹ میں test کریں"
                ]}
              />
            </div>

            <div className="text-center p-8 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-2xl text-white mb-10">
              <h2 className="text-3xl font-bold mb-4">🎉 مکمل کامیابی!</h2>
              <p className="text-xl mb-6">آپ نے مکمل Image Upload System بنا لیا ہے! 🚀</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">📸</div>
                  <p className="font-bold">اپلوڈ</p>
                  <p className="text-sm">Single & Multiple</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">👤</div>
                  <p className="font-bold">پروفائل</p>
                  <p className="text-sm">Picture System</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">🖼️</div>
                  <p className="font-bold">گیلری</p>
                  <p className="text-sm">View & Manage</p>
                </div>
                <div className="p-4 bg-white/20 rounded-lg">
                  <div className="text-3xl mb-2">🗑️</div>
                  <p className="font-bold">ڈیلیٹ</p>
                  <p className="text-sm">Secure Delete</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.open('https://youtube.com', '_blank')}
                  className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  🎬 Video Tutorial
                </button>
                <button className="px-6 py-3 bg-black/30 text-white font-bold rounded-lg hover:bg-black/40 transition-colors">
                  📚 Documentation
                </button>
                <button 
                  onClick={() => {
                    const code = document.querySelector('pre')?.innerText;
                    if (code) {
                      navigator.clipboard.writeText(code);
                      alert('تمام کوڈ کاپی ہو گیا!');
                    }
                  }}
                  className="px-6 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
                >
                  💾 Download Code
                </button>
              </div>
            </div>
          </section>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <button
              onClick={() => {
                const currentIndex = tabs.findIndex(tab => tab.id === activeSection);
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
                const currentIndex = tabs.findIndex(tab => tab.id === activeSection);
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
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        pre {
          font-family: 'Courier New', monospace;
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
      `}</style>
    </div>
  );
}