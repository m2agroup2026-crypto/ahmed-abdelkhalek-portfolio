"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  getPortfolioHomePath,
  getPortfolioLanguageFromPath,
  getPortfolioSectionFromId,
  getPortfolioSectionFromPath,
  getPortfolioSectionPath,
  portfolioSectionIds,
} from "@/app/content/portfolio-navigation";

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

export default function CleanUrlController() {
  const pathname = usePathname();

  useEffect(() => {
    const section =
      getPortfolioSectionFromPath(pathname);

    if (!section) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      scrollToTarget(portfolioSectionIds[section]);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  useEffect(() => {
    const language =
      getPortfolioLanguageFromPath(pathname);
    const homePath = getPortfolioHomePath(language);
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
      const section =
        getPortfolioSectionFromId(targetId);
      const cleanHref =
        targetId === "top"
          ? homePath
          : section
            ? getPortfolioSectionPath(
                section,
                language
              )
            : pathname;

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

      const section =
        getPortfolioSectionFromId(targetId);
      const cleanPath =
        targetId === "top"
          ? homePath
          : section
            ? getPortfolioSectionPath(
                section,
                language
              )
            : pathname;

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

  return null;
}
