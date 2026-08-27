"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type CaseStudyMotionState = "idle" | "active" | "reduced";

const LAYER_COUNT = 6;
const PHASE_COUNT = 4;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function useCaseStudyExperienceMotion<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);
  const [motionState, setMotionState] = useState<CaseStudyMotionState>("idle");
  const [activeLayer, setActiveLayer] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nextState: CaseStudyMotionState = media.matches ? "reduced" : "active";

    if (typeof globalThis.IntersectionObserver === "undefined") {
      const frame = globalThis.requestAnimationFrame(() => setMotionState(nextState));
      return () => globalThis.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setMotionState(nextState);
        observer.disconnect();
      },
      { threshold: 0.06, rootMargin: "10% 0px -8% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let frame = 0;
    let lastLayer = -1;
    let lastPhase = -1;

    const commit = () => {
      frame = 0;
      const bounds = section.getBoundingClientRect();
      const scrollable = Math.max(1, bounds.height - window.innerHeight);
      const progress = clamp(-bounds.top / scrollable);
      const layer = Math.min(LAYER_COUNT - 1, Math.floor(progress * LAYER_COUNT));
      const phase = Math.min(PHASE_COUNT - 1, Math.floor(progress * PHASE_COUNT));
      const localLayerProgress = clamp(progress * LAYER_COUNT - layer);

      section.style.setProperty("--case-progress", progress.toFixed(4));
      section.style.setProperty("--case-progress-pct", `${(progress * 100).toFixed(2)}%`);
      section.style.setProperty("--case-layer-progress", localLayerProgress.toFixed(4));

      if (layer !== lastLayer) {
        lastLayer = layer;
        setActiveLayer(layer);
      }
      if (phase !== lastPhase) {
        lastPhase = phase;
        setActivePhase(phase);
      }
    };

    const schedule = () => {
      if (!frame) frame = globalThis.requestAnimationFrame(commit);
    };

    commit();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) globalThis.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || motionState === "reduced") return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const commit = () => {
      frame = 0;
      section.style.setProperty("--case-pointer-x", x.toFixed(4));
      section.style.setProperty("--case-pointer-y", y.toFixed(4));
    };

    const schedule = () => {
      if (!frame) frame = globalThis.requestAnimationFrame(commit);
    };

    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = section.getBoundingClientRect();
      x = clamp((event.clientX - bounds.left) / Math.max(bounds.width, 1)) - 0.5;
      y = clamp((event.clientY - bounds.top) / Math.max(window.innerHeight, 1)) - 0.5;
      schedule();
    };

    const reset = () => {
      x = 0;
      y = 0;
      schedule();
    };

    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset, { passive: true });

    return () => {
      if (frame) globalThis.cancelAnimationFrame(frame);
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
    };
  }, [motionState]);

  const jumpToLayer = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;

    const safeIndex = Math.max(0, Math.min(LAYER_COUNT - 1, index));
    const sectionTop = window.scrollY + section.getBoundingClientRect().top;
    const scrollable = Math.max(0, section.offsetHeight - window.innerHeight);
    const target = (safeIndex + 0.12) / LAYER_COUNT;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: sectionTop + scrollable * target,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return {
    sectionRef,
    motionState,
    activeLayer,
    activePhase,
    jumpToLayer,
  };
}
