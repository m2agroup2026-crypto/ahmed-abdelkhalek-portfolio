"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getPortfolioHomePath,
  getPortfolioLanguageFromPath,
  getPortfolioSectionFromId,
  getPortfolioSectionFromPath,
  getPortfolioSectionPath,
  isPortfolioSection,
  portfolioSectionIds,
} from "@/app/content/portfolio-navigation";

const LANGUAGE_SWITCH_SECTION_KEY =
  "ahmed-portfolio-language-switch-section";

function prefersReducedMotion() {
  return window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
}

function scrollToTarget(targetId: string) {
  if (targetId === "top") {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion()
        ? "auto"
        : "smooth",
    });
    return;
  }

  document.getElementById(targetId)?.scrollIntoView({
    block: "start",
    behavior: prefersReducedMotion()
      ? "auto"
      : "smooth",
  });
}

function getCleanPathForTarget(
  targetId: string,
  pathname: string
) {
  const language =
    getPortfolioLanguageFromPath(pathname);
  const homePath = getPortfolioHomePath(language);
  const section =
    getPortfolioSectionFromId(targetId);

  if (targetId === "top") {
    return homePath;
  }

  if (section) {
    return getPortfolioSectionPath(
      section,
      language
    );
  }

  return pathname;
}

function isFormControl(
  target: EventTarget | null
): target is
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement {
  return (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

export default function CleanUrlController() {
  const pathname = usePathname();

  useEffect(() => {
    const section =
      getPortfolioSectionFromPath(pathname);

    if (section) {
      const frame = window.requestAnimationFrame(() => {
        scrollToTarget(portfolioSectionIds[section]);
      });

      return () => {
        window.cancelAnimationFrame(frame);
      };
    }

    const language =
      getPortfolioLanguageFromPath(pathname);
    const homePath = getPortfolioHomePath(language);

    if (pathname !== homePath) {
      return;
    }

    const pendingSection = sessionStorage.getItem(
      LANGUAGE_SWITCH_SECTION_KEY
    );

    if (
      !pendingSection ||
      !isPortfolioSection(pendingSection)
    ) {
      return;
    }

    sessionStorage.removeItem(
      LANGUAGE_SWITCH_SECTION_KEY
    );

    const cleanPath = getPortfolioSectionPath(
      pendingSection,
      language
    );

    window.history.replaceState(
      null,
      "",
      cleanPath
    );

    const frame = window.requestAnimationFrame(() => {
      scrollToTarget(
        portfolioSectionIds[pendingSection]
      );
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const rememberLanguageSwitchSection = (
      event: MouseEvent
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const languageButton = target.closest(
        "button.language-rail"
      );

      if (!languageButton) {
        return;
      }

      const section = getPortfolioSectionFromPath(
        window.location.pathname
      );

      if (section) {
        sessionStorage.setItem(
          LANGUAGE_SWITCH_SECTION_KEY,
          section
        );
      } else {
        sessionStorage.removeItem(
          LANGUAGE_SWITCH_SECTION_KEY
        );
      }
    };

    document.addEventListener(
      "click",
      rememberLanguageSwitchSection,
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        rememberLanguageSwitchSection,
        true
      );
    };
  }, []);

  useEffect(() => {
    const normalizeLegacyHash = () => {
      const targetId = window.location.hash.slice(1);

      if (!targetId) {
        return;
      }

      const cleanPath = getCleanPathForTarget(
        targetId,
        window.location.pathname
      );

      window.history.replaceState(
        null,
        "",
        cleanPath
      );

      window.requestAnimationFrame(() => {
        scrollToTarget(targetId);
      });
    };

    normalizeLegacyHash();

    window.addEventListener(
      "hashchange",
      normalizeLegacyHash
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        normalizeLegacyHash
      );
    };
  }, [pathname]);

  useEffect(() => {
    const anchors = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(
        'a[href^="#"]'
      )
    );

    const originals = anchors.map((anchor) => ({
      anchor,
      href: anchor.getAttribute("href"),
    }));

    for (const anchor of anchors) {
      const href = anchor.getAttribute("href");

      if (!href || href === "#") {
        continue;
      }

      const targetId = href.slice(1);
      const cleanHref = getCleanPathForTarget(
        targetId,
        pathname
      );

      anchor.dataset.cleanScrollTarget = targetId;
      anchor.setAttribute("href", cleanHref);
    }

    const handleCleanAnchorClick = (
      event: MouseEvent
    ) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest<HTMLAnchorElement>(
        "a[data-clean-scroll-target]"
      );

      if (!anchor) {
        return;
      }

      const targetId =
        anchor.dataset.cleanScrollTarget;

      if (!targetId) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const cleanPath = getCleanPathForTarget(
        targetId,
        window.location.pathname
      );

      if (
        cleanPath !== window.location.pathname ||
        window.location.hash
      ) {
        window.history.pushState(
          null,
          "",
          cleanPath
        );
      }

      scrollToTarget(targetId);
    };

    document.addEventListener(
      "click",
      handleCleanAnchorClick,
      true
    );

    return () => {
      document.removeEventListener(
        "click",
        handleCleanAnchorClick,
        true
      );

      for (const { anchor, href } of originals) {
        delete anchor.dataset.cleanScrollTarget;

        if (href === null) {
          anchor.removeAttribute("href");
        } else {
          anchor.setAttribute("href", href);
        }
      }
    };
  }, [pathname]);

  useEffect(() => {
    const language =
      getPortfolioLanguageFromPath(pathname);
    const requiredMessage =
      language === "ar"
        ? "يرجى تعبئة هذا الحقل."
        : "Please complete this field.";
    const emailMessage =
      language === "ar"
        ? "يرجى إدخال بريد إلكتروني صالح."
        : "Please enter a valid email address.";

    const handleInvalid = (event: Event) => {
      if (!isFormControl(event.target)) {
        return;
      }

      const control = event.target;

      control.setCustomValidity("");

      if (control.validity.valueMissing) {
        control.setCustomValidity(requiredMessage);
        return;
      }

      if (
        control instanceof HTMLInputElement &&
        control.type === "email" &&
        control.validity.typeMismatch
      ) {
        control.setCustomValidity(emailMessage);
      }
    };

    const clearValidation = (event: Event) => {
      if (!isFormControl(event.target)) {
        return;
      }

      event.target.setCustomValidity("");
    };

    document.addEventListener(
      "invalid",
      handleInvalid,
      true
    );
    document.addEventListener(
      "input",
      clearValidation,
      true
    );
    document.addEventListener(
      "change",
      clearValidation,
      true
    );

    return () => {
      document.removeEventListener(
        "invalid",
        handleInvalid,
        true
      );
      document.removeEventListener(
        "input",
        clearValidation,
        true
      );
      document.removeEventListener(
        "change",
        clearValidation,
        true
      );
    };
  }, [pathname]);

  return null;
}
