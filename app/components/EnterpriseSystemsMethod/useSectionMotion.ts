"use client";

import { useEffect, useRef, useState } from "react";

export type SectionMotionState = "idle" | "active" | "reduced";

export function useSectionMotion<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);
  const [motionState, setMotionState] =
    useState<SectionMotionState>("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const scheduleMotionState = (
      nextState: SectionMotionState
    ) => {
      const frame = requestAnimationFrame(() => {
        setMotionState(nextState);
      });

      return () => cancelAnimationFrame(frame);
    };

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotionQuery.matches) {
      return scheduleMotionState("reduced");
    }

    const supportsIntersectionObserver =
      typeof window.IntersectionObserver === "function";

    if (!supportsIntersectionObserver) {
      return scheduleMotionState("active");
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setMotionState("active");
        observer.disconnect();
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -12% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return {
    sectionRef,
    motionState,
  };
}
