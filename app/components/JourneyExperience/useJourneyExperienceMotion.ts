"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type JourneyMotionState = "idle" | "active" | "reduced";

const CHAPTER_COUNT = 4;

const CAMERA_TARGETS = [
  { x: -9, y: 7, scale: 1.016, rotate: -0.25 },
  { x: 10, y: -8, scale: 1.032, rotate: 0.32 },
  { x: -7, y: 10, scale: 1.024, rotate: -0.2 },
  { x: 11, y: -6, scale: 1.04, rotate: 0.28 },
] as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function smoothstep(value: number) {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
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

    const trajectoryPath = section.querySelector<SVGPathElement>("[data-journey-path]");
    const trajectoryLength = trajectoryPath?.getTotalLength() ?? 0;
    let frame = 0;
    let lastChapter = -1;

    const commitScroll = () => {
      frame = 0;

      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const progress = clamp(-bounds.top / scrollable);
      const rawChapter = progress * CHAPTER_COUNT;
      const chapter = Math.min(
        CHAPTER_COUNT - 1,
        Math.floor(rawChapter)
      );
      const chapterProgress = clamp(rawChapter - chapter);
      const cameraBlend = smoothstep(chapterProgress);
      const currentCamera = CAMERA_TARGETS[chapter];
      const nextCamera = CAMERA_TARGETS[Math.min(CHAPTER_COUNT - 1, chapter + 1)];

      section.style.setProperty("--journey-progress", progress.toFixed(4));
      section.style.setProperty(
        "--journey-progress-pct",
        `${(progress * 100).toFixed(2)}%`
      );
      section.style.setProperty(
        "--journey-chapter-progress",
        chapterProgress.toFixed(4)
      );
      section.style.setProperty(
        "--journey-camera-x",
        `${lerp(currentCamera.x, nextCamera.x, cameraBlend).toFixed(2)}px`
      );
      section.style.setProperty(
        "--journey-camera-y",
        `${lerp(currentCamera.y, nextCamera.y, cameraBlend).toFixed(2)}px`
      );
      section.style.setProperty(
        "--journey-camera-scale",
        lerp(currentCamera.scale, nextCamera.scale, cameraBlend).toFixed(4)
      );
      section.style.setProperty(
        "--journey-camera-rotate",
        `${lerp(currentCamera.rotate, nextCamera.rotate, cameraBlend).toFixed(3)}deg`
      );

      if (trajectoryPath && trajectoryLength > 0) {
        const distance = trajectoryLength * progress;
        const point = trajectoryPath.getPointAtLength(distance);
        const tangentPoint = trajectoryPath.getPointAtLength(
          Math.min(trajectoryLength, distance + Math.max(1, trajectoryLength * 0.0025))
        );
        const tracerX = 4 + (point.x / 1000) * 92;
        const tracerY = 8 + (point.y / 600) * 83;
        const deltaX = (tangentPoint.x - point.x) * (92 / 1000);
        const deltaY = (tangentPoint.y - point.y) * (83 / 600);
        const tracerAngle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

        section.style.setProperty("--journey-tracer-x", `${tracerX.toFixed(3)}%`);
        section.style.setProperty("--journey-tracer-y", `${tracerY.toFixed(3)}%`);
        section.style.setProperty("--journey-tracer-angle", `${tracerAngle.toFixed(2)}deg`);
      }

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

      pointerX = clamp(event.clientX / Math.max(window.innerWidth, 1), 0, 1) - 0.5;
      pointerY = clamp(event.clientY / Math.max(window.innerHeight, 1), 0, 1) - 0.5;
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
