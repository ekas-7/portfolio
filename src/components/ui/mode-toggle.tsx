"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme(); // Destructure theme and setTheme from useTheme hook
  const [mounted, setMounted] = React.useState(false);

  // Ensure that the theme is only accessed after the component has mounted
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // If the component is not yet mounted, avoid rendering it
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Toggle between dark and light themes
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="relative w-12 h-12 flex items-center justify-center rounded-full bg-transparent hover:scale-110 transition-transform focus:outline-none"
    >
      <Sun
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"
        }`}
      />
      <Moon
        className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      />
    </button>
  );
}
