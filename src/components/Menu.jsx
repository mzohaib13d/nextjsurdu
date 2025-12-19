export default function Menu({ open, theme }) {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 p-6 transition-transform duration-500
      ${open ? "translate-x-0" : "translate-x-full"}
      ${theme === "dark" ? "bg-[#020617]" : "bg-[#dcfce7]"}`}
    >
      <h2 className="text-2xl mb-4 neon-text">مینو</h2>
      <ul className="space-y-4">
        <li>ہوم</li>
        <li>کورسز</li>
        <li>رابطہ</li>
      </ul>
    </div>
  );
}