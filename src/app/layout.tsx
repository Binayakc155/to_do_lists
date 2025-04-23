"use client"; // This marks the file as a client component

import { useState } from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className="min-h-screen bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-3xl shadow-2xl p-8 flex flex-col h-[90vh]">
          {/* Header */}
          <header className="mb-4 text-center">
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white">
              ✅ To-Do App
            </h1>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              Plan. Do. Achieve.
            </p>
          </header>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="self-end mb-4 text-sm text-gray-500 dark:text-gray-400"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* Task List */}
          <main className="flex-1 overflow-auto mt-4">{children}</main>

          {/* Footer */}
          <footer className="pt-4 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Your Productivity Buddy
          </footer>
        </div>
      </body>
    </html>
  );
}
