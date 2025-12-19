export default function ThemeToggle({ theme, setTheme }) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="hidden w-16 h-8 flex items-center rounded-full bg-gray-400 p-1"
    >
      <div
        className={`w-6 h-6 rounded-full transition-transform duration-300
        ${theme === "dark" ? "translate-x-8 bg-cyan-400" : "bg-green-600"}`}
      ></div>
    </button>
  );
}