"use client";

import { useEffect, useState } from "react";
import type { InsightLanguage } from "../../content/insights/types";
import styles from "./InsightsThemeToggle.module.css";

type InsightsThemeToggleProps = {
  language: InsightLanguage;
};

export default function InsightsThemeToggle({
  language,
}: InsightsThemeToggleProps) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("ahmed-portfolio-theme");
    const nextDark = saved
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;

    setDark(nextDark);
    document.documentElement.dataset.theme =
      nextDark ? "dark" : "light";
  }, []);

  const toggleTheme = () => {
    const nextDark = !dark;

    setDark(nextDark);
    document.documentElement.dataset.theme =
      nextDark ? "dark" : "light";

    localStorage.setItem(
      "ahmed-portfolio-theme",
      nextDark ? "dark" : "light"
    );
  };

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={
        language === "ar"
          ? dark
            ? "تفعيل الوضع الفاتح"
            : "تفعيل الوضع الداكن"
          : dark
            ? "Switch to light mode"
            : "Switch to dark mode"
      }
      title={
        language === "ar"
          ? dark
            ? "الوضع الفاتح"
            : "الوضع الداكن"
          : dark
            ? "Light mode"
            : "Dark mode"
      }
    >
      <span className={styles.halo} aria-hidden="true" />

      <svg
        className={`${styles.icon} ${styles.sun}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>

      <svg
        className={`${styles.icon} ${styles.moon}`}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.5 15.4A8.5 8.5 0 0 1 8.6 3.5 8.5 8.5 0 1 0 20.5 15.4Z" />
      </svg>
    </button>
  );
}
