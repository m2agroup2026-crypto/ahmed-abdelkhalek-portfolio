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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        section.dataset.motion = "active";
        observer.disconnect();
      }
    }, { threshold: .14 });
    observer.observe(section);

    const pointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      section.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
      section.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
    };
    section.addEventListener("pointermove", pointer, { passive: true });
    return () => { observer.disconnect(); section.removeEventListener("pointermove", pointer); };
  }, []);

  return sectionRef;
}
