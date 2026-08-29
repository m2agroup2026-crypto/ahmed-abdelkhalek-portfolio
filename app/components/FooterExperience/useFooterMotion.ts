"use client";

import { useEffect, useRef } from "react";

export function useFooterMotion() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const footer = ref.current;

    if (!footer) {
      return;
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches
    ) {
      footer.dataset.motion = "reduced";
      return;
    }

    const isMobile = window.matchMedia(
      "(max-width: 900px)"
    ).matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        footer.dataset.motion = "active";
        observer.disconnect();
      },
      {
        threshold: isMobile ? 0 : 0.1,
      }
    );

    observer.observe(footer);

    if (isMobile) {
      const rect = footer.getBoundingClientRect();

      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0
      ) {
        footer.dataset.motion = "active";
        observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, []);

  return ref;
}
