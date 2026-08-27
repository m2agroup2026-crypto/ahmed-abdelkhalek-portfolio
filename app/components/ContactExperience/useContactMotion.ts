"use client";

import { useEffect, useRef } from "react";

export function useContactMotion() {
  const sectionRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { section.dataset.motion = "reduced"; return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { section.dataset.motion = "active"; observer.disconnect(); }
    }, { threshold: .12 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);
  return sectionRef;
}
