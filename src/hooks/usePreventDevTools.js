import { useEffect } from "react";

const usePreventDevTools = () => {
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();

      if (
        (e.ctrlKey && e.shiftKey && (key === "i" || key === "j")) ||
        (e.ctrlKey && key === "u") ||
        key === "f12"
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    // ✅ cleanup (VERY important)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
};

export default usePreventDevTools;