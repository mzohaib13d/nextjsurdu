import React, { useState, useEffect } from "react";
import RightSidebar from "./RightSidebar";

export default function Chapter30() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("user-theme") || "light"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState("");

  useEffect(() => {
    localStorage.setItem("user-theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopySuccess("✅ کوڈ کاپی ہو گیا ہے!");
    setTimeout(() => setCopySuccess(""), 3000);
  };

  const CodeBlock = ({ code, colorClass = "text-emerald-400" }) => (
    <div className="relative my-8">
      <div className="flex justify-end mb-1">
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

  // Step 2 — Dockerfile
  const dockerfileCode = `# Step 1: Node image use کریں
FROM node:18

# Step 2: app folder container کے اندر بنائیں
WORKDIR /app

# Step 3: package.json copy کریں
COPY package*.json ./

# Step 4: dependencies install کریں
RUN npm install

# Step 5: باقی تمام files copy کریں
COPY . .

# Step 6: Next.js build کریں
RUN npm run build

# Step 7: port expose کریں
EXPOSE 3000

# Step 8: app start کریں
CMD ["npm", "run", "start"]`;

  // Step 3 — .dockerignore
  const dockerignoreCode = `node_modules
.next
.git
.env.local`;

  // Step 4 — .env.local
  const envLocalCode = `MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=mysecret123`;

  // Step 5 — db.js
  const dbCode = `import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};`;

  // Step 8 — docker-compose.yml
  const dockerComposeCode = `version: "3.9"

services:
  nextjs:
    build: .
    ports:
      - "3000:3000"
    env_file:
      - .env.local`;

  // Build command
  const buildCommand = `docker build -t nextjs-app .`;

  // Run command
  const runCommand = `docker run -p 3000:3000 nextjs-app`;

  // Compose command
  const composeCommand = `docker compose up --build`;

  // Check Windows file command
  const windowsCheckCommand = `dir`;

  // Step 1 — Folder Structure
  const folderStructureCode = `my-next-app/
│
├── app/
├── lib/                ← backend logic (database, helpers)
│    └── db.js
│
├── public/
├── package.json
├── next.config.js
├── .env.local
│
└── Dockerfile         ← (ہم یہ بنائیں گے)`;

  // Final Structure
  const finalStructureCode = `my-next-app/
│
├── app/
│
├── lib/
│    └── db.js
│
├── public/
│
├── .env.local
├── .dockerignore
├── Dockerfile
├── docker-compose.yml
├── package.json
└── next.config.js`;

  return (
   <div
  dir="rtl"
  className={`min-h-screen transition-all duration-500 font-sans ${
    theme === "dark"
      ? "bg-slate-900 text-gray-700" // Medium gray
      : "bg-white text-slate-900"
  }`}
>

      {copySuccess && (
        <div className="fixed top-24 right-0 z-[100] bg-green-600 text-white px-6 py-3 rounded-l-xl shadow-2xl animate-slide-in font-bold border-l-4 border-green-400 text-sm">
          {copySuccess}
        </div>
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-3 md:p-4 backdrop-blur-md bg-opacity-80 border-b border-slate-700/20">
        <button
          onClick={toggleSidebar}
          className="p-4 cursor-pointer rounded-full hover:bg-blue-500/10 transition-all z-[60] text-current"
        >
          <div className="space-y-1.5">
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
        <button
          onClick={toggleTheme}
          className="px-4 py-2 cursor-pointer rounded-full shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold active:scale-95 text-xs md:text-sm"
        >
          {theme === "light" ? "🌙 ڈارک موڈ" : "☀️ برائٹ موڈ"}
        </button>
      </header>

      <RightSidebar
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        theme={theme}
      />

      <main className="custom-page-border w-full max-w-6xl mx-auto px-4 md:px-12 pt-28 pb-20 leading-relaxed text-right overflow-x-hidden">
        {/* باب کا عنوان */}
        <h1 className="text-3xl md:text-5xl font-black mb-10 text-center text-sky-400 border-b-4 border-sky-500 pb-6">
          باب 30: Next.js + Docker Complete Tutorial (Urdu)
        </h1>

        {/* مقدمہ - پروجیکٹ کا تعارف */}
        <section className="mb-16 border-b border-slate-700 pb-10">
          <h2 className="text-2xl md:text-4xl font-bold mb-6 text-emerald-400">
            🐳 باب کا مقصد
          </h2>
          <p className="text-lg mb-6">
            اس باب میں ہم سیکھیں گے کہ Next.js پروجیکٹ کو Docker کے ساتھ کیسے 
            containerize کیا جاتا ہے۔ Docker آپ کی ایپلیکیشن کو package کرتا ہے اور 
            اسے کسی بھی سرور پر بالکل ایک جیسا environment فراہم کرتا ہے۔
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-blue-50"
              } border border-sky-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-sky-400">
                🔹 Dockerfile
              </h3>
              <p className="text-sm">ایپ کو container میں package کرتا ہے</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-emerald-50"
              } border border-emerald-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-emerald-400">
                🔹 .dockerignore
              </h3>
              <p className="text-sm">فائلیں جو container میں نہ جائیں</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-purple-50"
              } border border-purple-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                🔹 docker-compose
              </h3>
              <p className="text-sm">multi-container setup</p>
            </div>
            <div
              className={`p-6 rounded-2xl ${
                theme === "dark" ? "bg-slate-800" : "bg-amber-50"
              } border border-amber-500/30`}
            >
              <h3 className="text-xl font-bold mb-3 text-amber-400">
                🔹 Deployment
              </h3>
              <p className="text-sm">کسی بھی سرور پر فوری deploy</p>
            </div>
          </div>
        </section>

        {/* Step 1: Next.js Project Structure */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-sky-400 border-r-4 border-sky-500 pr-4">
            🌟 Step 1 — Next.js Project Structure سمجھیں
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-sky-50/50"
            }`}
          >
            <p className="mb-4 text-lg">
              فرض کریں آپ کا project نام ہے: <code className="bg-slate-200 px-2 py-1 rounded">my-next-app</code>
            </p>
            <p className="mb-4">
              Next.js کا structure عام طور پر ایسا ہوتا ہے:
            </p>
            <CodeBlock code={folderStructureCode} colorClass="text-amber-300" />
          </div>

          <div className={`p-6 rounded-2xl mt-6 ${
            theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"
          }`}>
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              📁 اہم فولڈرز کا کردار:
            </h3>
            <ul className="space-y-3 pr-4">
              <li><strong className="text-emerald-400">app/</strong> - Next.js 14 App Router</li>
              <li><strong className="text-emerald-400">lib/</strong> - Database connection اور helpers</li>
              <li><strong className="text-emerald-400">public/</strong> - Static assets</li>
              <li><strong className="text-emerald-400">Dockerfile</strong> - Docker configuration</li>
              <li><strong className="text-emerald-400">.env.local</strong> - Environment variables</li>
            </ul>
          </div>
        </section>

        {/* Step 2: Dockerfile بنائیں */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
            🌟 Step 2 — Dockerfile بنائیں (Root folder میں)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-emerald-50/50"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3 text-purple-400">
                ❓ کیوں extension نہیں ہوتا؟
              </h3>
              <p className="mb-4">
                Docker خود خاص طور پر "Dockerfile" نام کی file کو ڈھونڈتا ہے۔
                اگر آپ extension لگا دیں گے تو Docker اسے recognize نہیں کرے گا۔
              </p>
            </div>

            <div className="mb-8 border-t border-slate-700 pt-6">
              <h3 className="text-xl font-bold mb-3 text-red-400">
                ⚠️ Windows users کے لیے important warning
              </h3>
              <p className="mb-4">
                Windows میں اکثر یہ غلطی ہوتی ہے:
                File اصل میں ہوتی ہے: <code className="bg-slate-200 px-2 py-1 rounded">Dockerfile.txt</code>
                لیکن Windows دکھاتا ہے: <code className="bg-slate-200 px-2 py-1 rounded">Dockerfile</code>
              </p>
              <p className="mb-2"><strong>چیک کرنے کا طریقہ:</strong></p>
              <p>VS Code میں دیکھیں یا command چلائیں:</p>
              <CodeBlock code={windowsCheckCommand} colorClass="text-green-300" />
              <p className="mt-4">اگر .txt نظر آئے تو rename کریں: <code className="bg-slate-200 px-2 py-1 rounded">Dockerfile</code></p>
            </div>

            <div className="mb-8 border-t border-slate-700 pt-6">
              <h3 className="text-xl font-bold mb-3 text-blue-400">
                📝 VS Code میں Dockerfile بنانے کا صحیح طریقہ
              </h3>
              <ul className="list-disc pr-6 space-y-2">
                <li>Step 1: Right click → New File</li>
                <li>Step 2: Name لکھیں: <code className="bg-slate-200 px-2 py-1 rounded">Dockerfile</code></li>
                <li>بس، کوئی extension نہ لکھیں۔</li>
              </ul>
            </div>

            <div className="mb-8 border-t border-slate-700 pt-6">
              <h3 className="text-xl font-bold mb-3 text-amber-400">
                📋 یہی rule ان files پر بھی apply ہوتا ہے:
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p><strong className="text-blue-400">File name</strong></p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p><strong className="text-blue-400">Extension</strong></p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p>Dockerfile</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p className="text-red-400">❌ کوئی نہیں</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p>.dockerignore</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p className="text-red-400">❌ کوئی نہیں</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p>docker-compose.yml</p>
                </div>
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800" : "bg-slate-100"}`}>
                  <p className="text-green-400">✅ .yml ہوتا ہے</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-2"><strong>📁 Dockerfile Location:</strong> <code className="bg-slate-200 px-2 py-1 rounded">my-next-app/Dockerfile</code></p>
              <p className="mb-2"><strong>📄 File: Dockerfile</strong></p>
              <CodeBlock code={dockerfileCode} colorClass="text-blue-300" />
            </div>
          </div>
        </section>

        {/* Step 3: .dockerignore */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-purple-400 border-r-4 border-purple-500 pr-4">
            🌟 Step 3 — .dockerignore بنائیں
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-purple-50/50"
            }`}
          >
            <p className="mb-4"><strong>📁 Location:</strong> <code className="bg-slate-200 px-2 py-1 rounded">my-next-app/.dockerignore</code></p>
            <p className="mb-4"><strong>📄 File: .dockerignore</strong></p>
            <CodeBlock code={dockerignoreCode} colorClass="text-emerald-300" />
            <p className="mt-4 text-sm">یہ file Docker کو بتاتی ہے کہ یہ files container میں copy نہ کرے۔</p>
          </div>
        </section>

        {/* Step 4: Environment Variables */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-amber-400 border-r-4 border-amber-500 pr-4">
            🌟 Step 4 — Environment Variables (.env.local)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-amber-50/50"
            }`}
          >
            <p className="mb-4"><strong>📁 Location:</strong> <code className="bg-slate-200 px-2 py-1 rounded">my-next-app/.env.local</code></p>
            <p className="mb-4"><strong>📄 File: .env.local</strong></p>
            <CodeBlock code={envLocalCode} colorClass="text-green-300" />
          </div>
        </section>

        {/* Step 5: Next.js backend file */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-blue-400 border-r-4 border-blue-500 pr-4">
            🌟 Step 5 — Next.js backend file (lib/db.js)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-blue-50/50"
            }`}
          >
            <p className="mb-4"><strong>📁 Location:</strong> <code className="bg-slate-200 px-2 py-1 rounded">my-next-app/lib/db.js</code></p>
            <p className="mb-4"><strong>📄 File: db.js</strong></p>
            <CodeBlock code={dbCode} colorClass="text-purple-300" />
          </div>
        </section>

        {/* Step 6: Docker Image build */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-green-400 border-r-4 border-green-500 pr-4">
            🌟 Step 6 — Docker Image build کریں
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-green-50/50"
            }`}
          >
            <p className="mb-4">Terminal میں project folder کے اندر جائیں:</p>
            <CodeBlock code={`cd my-next-app`} colorClass="text-amber-300" />
            <p className="mb-4 mt-4">پھر لکھیں:</p>
            <CodeBlock code={buildCommand} colorClass="text-blue-300" />
          </div>
        </section>

        {/* Step 7: Docker Container run */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-red-400 border-r-4 border-red-500 pr-4">
            🌟 Step 7 — Docker Container run کریں
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-red-50/50"
            }`}
          >
            <CodeBlock code={runCommand} colorClass="text-green-300" />
            <p className="mt-4 mb-4">اب browser میں کھولیں:</p>
            <CodeBlock code={`http://localhost:3000`} colorClass="text-purple-300" />
            <p className="mt-4 text-emerald-400 font-bold">آپ کی Next.js app Docker میں چل رہی ہوگی 🎉</p>
          </div>
        </section>

        {/* Step 8: docker-compose.yml */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-indigo-400 border-r-4 border-indigo-500 pr-4">
            🌟 Step 8 — docker-compose.yml (Recommended)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-indigo-50/50"
            }`}
          >
            <p className="mb-4"><strong>📁 Location:</strong> <code className="bg-slate-200 px-2 py-1 rounded">my-next-app/docker-compose.yml</code></p>
            <p className="mb-4"><strong>📄 File: docker-compose.yml</strong></p>
            <CodeBlock code={dockerComposeCode} colorClass="text-emerald-300" />
            <p className="mb-4 mt-4"><strong>Run کریں:</strong></p>
            <CodeBlock code={composeCommand} colorClass="text-blue-300" />
          </div>
        </section>

        {/* Step 9: Complete Structure */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-pink-400 border-r-4 border-pink-500 pr-4">
            🌟 Step 9 — Next.js + MongoDB + Docker Complete Structure
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-pink-50/50"
            }`}
          >
            <p className="mb-4"><strong>Final structure:</strong></p>
            <CodeBlock code={finalStructureCode} colorClass="text-amber-300" />
          </div>
        </section>

        {/* Step 10: Deployment */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-teal-400 border-r-4 border-teal-500 pr-4">
            🌟 Step 10 — Deployment (Free servers)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-teal-50/50"
            }`}
          >
            <p className="mb-4">آپ یہی Docker project deploy کر سکتے ہیں:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"} border border-blue-500`}>
                <span className="text-2xl mb-2 block">🚂</span>
                <p className="font-bold">Railway</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-green-900/30" : "bg-green-50"} border border-green-500`}>
                <span className="text-2xl mb-2 block">🖼️</span>
                <p className="font-bold">Render</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-50"} border border-purple-500`}>
                <span className="text-2xl mb-2 block">🪰</span>
                <p className="font-bold">Fly.io</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-amber-900/30" : "bg-amber-50"} border border-amber-500`}>
                <span className="text-2xl mb-2 block">🖥️</span>
                <p className="font-bold">VPS</p>
              </div>
            </div>
          </div>
        </section>

        {/* Step 11: Golden Formula */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-cyan-400 border-r-4 border-cyan-500 pr-4">
            🌟 Step 11 — Golden Formula (Next.js Docker)
          </h2>

          <div
            className={`p-6 rounded-2xl mb-6 ${
              theme === "dark" ? "bg-slate-800/50" : "bg-cyan-50/50"
            }`}
          >
            <p className="mb-6 text-lg">ہر Next.js project میں یہی 5 چیزیں ضروری ہیں:</p>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-blue-900/30" : "bg-blue-50"} border border-blue-500`}>
                <span className="text-3xl mb-2 block">📄</span>
                <p className="font-bold">Dockerfile</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-emerald-900/30" : "bg-emerald-50"} border border-emerald-500`}>
                <span className="text-3xl mb-2 block">🚫</span>
                <p className="font-bold">.dockerignore</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-purple-900/30" : "bg-purple-50"} border border-purple-500`}>
                <span className="text-3xl mb-2 block">🔐</span>
                <p className="font-bold">.env.local</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-amber-900/30" : "bg-amber-50"} border border-amber-500`}>
                <span className="text-3xl mb-2 block">⚙️</span>
                <p className="font-bold">docker-compose.yml</p>
              </div>
              <div className={`p-4 text-center rounded-lg ${theme === "dark" ? "bg-red-900/30" : "bg-red-50"} border border-red-500`}>
                <span className="text-3xl mb-2 block">📦</span>
                <p className="font-bold">package.json</p>
              </div>
            </div>
          </div>
        </section>

        {/* Summary */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-emerald-400 border-r-4 border-emerald-500 pr-4">
            🌟 Summary (Students کے لیے)
          </h2>

          <div
            className={`p-8 rounded-3xl border-t-8 border-emerald-600 shadow-2xl ${
              theme === "dark" ? "bg-slate-800" : "bg-emerald-50"
            }`}
          >
            <p className="text-xl font-bold mb-6 text-emerald-600">
              Docker کرتا کیا ہے؟
            </p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-emerald-400 text-2xl ml-3">✔</span>
                <span>آپ کی Next.js app کو package کرتا ہے</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 text-2xl ml-3">✔</span>
                <span>database connection محفوظ رکھتا ہے</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 text-2xl ml-3">✔</span>
                <span>deployment آسان بناتا ہے</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-400 text-2xl ml-3">✔</span>
                <span>ہر server پر same environment دیتا ہے</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Practice Task */}
        <section className="my-16 p-6 md:p-8 border-4 border-dashed border-indigo-500 rounded-3xl bg-indigo-500/5">
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-indigo-400">
            🎯 Practice Task (مشق کے لیے)
          </h2>
          <div className="space-y-4 font-bold text-sm md:text-lg" dir="rtl">
            <p>1️⃣ ایک Next.js پروجیکٹ بنائیں</p>
            <p>2️⃣ Dockerfile بنائیں (صحیح نام کے ساتھ)</p>
            <p>3️⃣ .dockerignore بنا کر node_modules کو exclude کریں</p>
            <p>4️⃣ .env.local میں MongoDB URI سیٹ کریں</p>
            <p>5️⃣ lib/db.js میں database connection بنائیں</p>
            <p>6️⃣ Docker image build کریں</p>
            <p>7️⃣ Docker container run کر کے test کریں</p>
            <p>8️⃣ docker-compose.yml بنا کر compose up کریں</p>
          </div>
        </section>

        {/* خلاصہ */}
        <section
          className={`p-8 rounded-3xl border-t-8 border-blue-600 shadow-2xl mb-12 ${
            theme === "dark" ? "bg-slate-800" : "bg-blue-50"
          }`}
        >
          <h2 className="text-xl md:text-3xl font-bold mb-6 text-blue-600 italic">
            📌 خلاصہ (Chapter 30)
          </h2>
          <ul className="space-y-3 text-base md:text-lg">
            <li>• <strong>Dockerfile:</strong> بغیر extension کے بنائیں</li>
            <li>• <strong>.dockerignore:</strong> node_modules کو ignore کریں</li>
            <li>• <strong>Environment:</strong> .env.local میں credentials</li>
            <li>• <strong>Database:</strong> MongoDB connection lib/db.js میں</li>
            <li>• <strong>Build:</strong> docker build -t nextjs-app .</li>
            <li>• <strong>Run:</strong> docker run -p 3000:3000 nextjs-app</li>
            <li>• <strong>Compose:</strong> docker-compose.yml بہتر ہے</li>
            <li>• <strong>Deployment:</strong> Railway, Render, Fly.io</li>
          </ul>
        </section>

        <footer className="mt-20 pt-10 border-t border-slate-700 text-center opacity-70">
          <p>
            © 2025 Next.js اردو ٹیوٹوریل - باب 30: Next.js + Docker Complete Tutorial
          </p>
          <p className="text-sm mt-2">
            🐳 Docker سے اپنی Next.js app کو کسی بھی سرور پر چلائیں!
          </p>
        </footer>
      </main>

      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        ></div>
      )}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
      `}</style>
    </div>
  );
}