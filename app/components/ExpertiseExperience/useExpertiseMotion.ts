"use client";

import { useEffect, useRef } from "react";

export function useExpertiseMotion() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      section.dataset.motion = "reduced";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.dataset.motion = "active";
          observer.disconnect();
        }
      },
      { threshold: 0.14 }
    );

    observer.observe(section);

    const precisePointer = matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (!precisePointer.matches) {
      return () => observer.disconnect();
    }

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const commitPointer = () => {
      frame = 0;
      section.style.setProperty("--pointer-x", `${pointerX}px`);
      section.style.setProperty("--pointer-y", `${pointerY}px`);
    };

    const pointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      pointerX = event.clientX - rect.left;
      pointerY = event.clientY - rect.top;

      if (!frame) {
        frame = requestAnimationFrame(commitPointer);
      }
    };

    section.addEventListener("pointermove", pointer, { passive: true });

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", pointer);
    };
  }, []);

  return sectionRef;
}
