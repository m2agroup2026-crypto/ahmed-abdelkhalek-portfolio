"use client";

import {
  useEffect,
  useState,
} from "react";
import FloatingIntelligenceAssistant from
  "../../components/FloatingIntelligenceAssistant/FloatingIntelligenceAssistant";
import IntelligenceModal from
  "../../components/IntelligenceExperience/IntelligenceModal";
import type { FloatingAssistantLanguage } from
  "../../components/FloatingIntelligenceAssistant/content";
import styles from "./preview.module.css";

type PreviewTheme = "light" | "dark";

export default function PreviewClient() {
  const [language, setLanguage] =
    useState<FloatingAssistantLanguage>("ar");

  const [theme, setTheme] =
    useState<PreviewTheme>("dark");

  const [intelligenceOpen, setIntelligenceOpen] =
    useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const previousTheme =
      root.getAttribute("data-theme");

    root.setAttribute("data-theme", theme);

    return () => {
      if (previousTheme === null) {
        root.removeAttribute("data-theme");
        return;
      }

      root.setAttribute(
        "data-theme",
        previousTheme
      );
    };
  }, [theme]);

  const isArabic = language === "ar";

  return (
    <main
      className={styles.preview}
      dir={isArabic ? "rtl" : "ltr"}
      data-preview-theme={theme}
    >
      <div
        className={styles.toolbar}
        aria-label="Floating assistant preview controls"
        dir="ltr"
      >
        <strong>Assistant Preview</strong>

        <div>
          <button
            type="button"
            aria-pressed={language === "ar"}
            onClick={() => setLanguage("ar")}
          >
            عربي
          </button>

          <button
            type="button"
            aria-pressed={language === "en"}
            onClick={() => setLanguage("en")}
          >
            English
          </button>
        </div>

        <div>
          <button
            type="button"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>

          <button
            type="button"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
        </div>
      </div>

      <section
        id="top"
        className={styles.hero}
      >
        <p>ENTERPRISE HERO / TEST BOUNDARY</p>

        <h1>
          {isArabic
            ? "ابدأ من هنا ثم مرّر إلى أسفل"
            : "Start here, then scroll down"}
        </h1>

        <span>
          {isArabic
            ? "لن يظهر المساعد أثناء وجودك داخل الهيرو."
            : "The assistant remains hidden while the hero is visible."}
        </span>
      </section>

      <section className={styles.journey}>
        <p>POST-HERO VISIBILITY TEST</p>

        <h2>
          {isArabic
            ? "يظهر المساعد الآن في الجهة المقابلة لسهم الصعود."
            : "The assistant now appears opposite the back-to-top control."}
        </h2>

        <span>
          {isArabic
            ? "اختبر التوسّع، لوحة المفاتيح، تغيير الاتجاه وحجم الشاشة."
            : "Test expansion, keyboard focus, direction, and viewport size."}
        </span>
      </section>

      <section
        id="contact"
        className={styles.contact}
      >
        <p>CONTACT / INVITATION TEST</p>

        <h2>
          {isArabic
            ? "عند الوصول إلى هنا تظهر الدعوة الذكية."
            : "The intelligent invitation appears when you reach this section."}
        </h2>

        <span>
          {isArabic
            ? "يمكن فتح المحادثة أو إخفاء الدعوة مع بقاء النواة العائمة."
            : "Open the conversation or dismiss the invitation while keeping the floating core."}
        </span>
      </section>

      <FloatingIntelligenceAssistant
        language={language}
        open={intelligenceOpen}
        onOpen={() => setIntelligenceOpen(true)}
      />

      <IntelligenceModal
        open={intelligenceOpen}
        language={language}
        onClose={() => setIntelligenceOpen(false)}
      />
    </main>
  );
}
