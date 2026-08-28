"use client";

import { useEffect, useRef } from "react";

export function useFooterMotion() {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const footer = ref.current;
    if (!footer) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { footer.dataset.motion = "reduced"; return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { footer.dataset.motion = "active"; observer.disconnect(); }
    }, { threshold: .1 });
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);
  return ref;
}
