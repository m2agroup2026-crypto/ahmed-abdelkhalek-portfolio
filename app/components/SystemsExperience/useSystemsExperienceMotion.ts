"use client";

import { useEffect, useRef } from "react";

export function useSystemsExperienceMotion() {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          root.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(root);

    const updatePointer = (event: PointerEvent) => {
      const bounds = root.getBoundingClientRect();
      root.style.setProperty("--systems-x", `${event.clientX - bounds.left}px`);
      root.style.setProperty("--systems-y", `${event.clientY - bounds.top}px`);
    };

    root.addEventListener("pointermove", updatePointer, { passive: true });
    return () => {
      observer.disconnect();
      root.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return rootRef;
}
