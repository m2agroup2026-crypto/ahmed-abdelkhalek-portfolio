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

    const precisePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const renderPointer = () => {
      root.style.setProperty("--systems-x", `${pointerX}px`);
      root.style.setProperty("--systems-y", `${pointerY}px`);
      frame = 0;
    };

    const updatePointer = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = root.getBoundingClientRect();
      pointerX = event.clientX - bounds.left;
      pointerY = event.clientY - bounds.top;
      if (!frame) frame = window.requestAnimationFrame(renderPointer);
    };

    if (precisePointer.matches) {
      root.addEventListener("pointermove", updatePointer, { passive: true });
    }

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      root.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return rootRef;
}
