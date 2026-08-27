"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type JourneyMotionState = "idle" | "active" | "reduced";

const CHAPTER_COUNT = 4;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function useJourneyExperienceMotion<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);
  const [motionState, setMotionState] = useState<JourneyMotionState>("idle");
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nextState: JourneyMotionState = reducedMotion.matches ? "reduced" : "active";

    if (typeof globalThis.IntersectionObserver === "undefined") {
      const frame = globalThis.requestAnimationFrame(() => setMotionState(nextState));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setMotionState(nextState);
        observer.disconnect();
      },
      {
        threshold: 0.08,
        rootMargin: "8% 0px -8% 0px",
      }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    let frame = 0;
    let lastChapter = -1;

    const commitScroll = () => {
      frame = 0;

      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const progress = clamp(-bounds.top / scrollable);
      const chapter = Math.min(
        CHAPTER_COUNT - 1,
        Math.floor(progress * CHAPTER_COUNT)
      );

      section.style.setProperty("--journey-progress", progress.toFixed(4));
      section.style.setProperty(
        "--journey-progress-pct",
        `${(progress * 100).toFixed(2)}%`
      );

      if (chapter !== lastChapter) {
        lastChapter = chapter;
        setActiveChapter(chapter);
      }
    };

    const scheduleScroll = () => {
      if (!frame) {
        frame = globalThis.requestAnimationFrame(commitScroll);
      }
    };

    commitScroll();
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll, { passive: true });

    return () => {
      if (frame) {
        globalThis.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", scheduleScroll);
      window.removeEventListener("resize", scheduleScroll);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || motionState === "reduced") {
      return;
    }

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;

    const commitPointer = () => {
      frame = 0;
      section.style.setProperty("--journey-pointer-x", pointerX.toFixed(4));
      section.style.setProperty("--journey-pointer-y", pointerY.toFixed(4));
    };

    const schedulePointer = () => {
      if (!frame) {
        frame = globalThis.requestAnimationFrame(commitPointer);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const bounds = section.getBoundingClientRect();
      pointerX = clamp((event.clientX - bounds.left) / bounds.width, 0, 1) - 0.5;
      pointerY = clamp((event.clientY - bounds.top) / Math.max(bounds.height, 1), 0, 1) - 0.5;
      schedulePointer();
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;
      schedulePointer();
    };

    section.addEventListener("pointermove", handlePointerMove, { passive: true });
    section.addEventListener("pointerleave", resetPointer, { passive: true });

    return () => {
      if (frame) {
        globalThis.cancelAnimationFrame(frame);
      }

      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", resetPointer);
    };
  }, [motionState]);

  const jumpToChapter = useCallback((index: number) => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const safeIndex = Math.max(0, Math.min(CHAPTER_COUNT - 1, index));
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
    const targetProgress = safeIndex / CHAPTER_COUNT + 0.02;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: sectionTop + scrollable * targetProgress,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, []);

  return {
    sectionRef,
    motionState,
    activeChapter,
    jumpToChapter,
  };
}
