"use client";

import { useEffect, useRef, useState } from "react";

export type ProfessionalIdentityMotionState =
  | "idle"
  | "active"
  | "reduced";

export function useProfessionalIdentityMotion<
  T extends HTMLElement,
>() {
  const sectionRef = useRef<T>(null);
  const [motionState, setMotionState] =
    useState<ProfessionalIdentityMotionState>("idle");

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const scheduleState = (
      nextState: ProfessionalIdentityMotionState
    ) => {
      const frame = requestAnimationFrame(() => {
        setMotionState(nextState);
      });

      return () => cancelAnimationFrame(frame);
    };

    if (reducedMotion.matches) {
      return scheduleState("reduced");
    }

    const supportsObserver =
      typeof IntersectionObserver !== "undefined";

    if (!supportsObserver) {
      return scheduleState("active");
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
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
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
      section.style.setProperty(
        "--pi-pointer-x",
        `${pointerX}px`
      );
      section.style.setProperty(
        "--pi-pointer-y",
        `${pointerY}px`
      );
      section.style.setProperty(
        "--pi-tilt-x",
        `${pointerY * -2.8}deg`
      );
      section.style.setProperty(
        "--pi-tilt-y",
        `${pointerX * 3.8}deg`
      );
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }

      const bounds = section.getBoundingClientRect();
      const normalizedX =
        (event.clientX - bounds.left) / bounds.width - 0.5;
      const normalizedY =
        (event.clientY - bounds.top) / bounds.height - 0.5;

      pointerX = Math.max(-0.5, Math.min(0.5, normalizedX));
      pointerY = Math.max(-0.5, Math.min(0.5, normalizedY));

      if (!frame) {
        frame = requestAnimationFrame(commitPointer);
      }
    };

    const resetPointer = () => {
      pointerX = 0;
      pointerY = 0;

      if (!frame) {
        frame = requestAnimationFrame(commitPointer);
      }
    };

    section.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );
    section.addEventListener(
      "pointerleave",
      resetPointer,
      { passive: true }
    );

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }

      section.removeEventListener(
        "pointermove",
        handlePointerMove
      );
      section.removeEventListener(
        "pointerleave",
        resetPointer
      );
    };
  }, [motionState]);

  return {
    sectionRef,
    motionState,
  };
}
