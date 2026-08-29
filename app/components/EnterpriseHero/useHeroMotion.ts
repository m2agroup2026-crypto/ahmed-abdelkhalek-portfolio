"use client";

import { useEffect, useRef, useState } from "react";

export type HeroMotionState =
  | "idle"
  | "active"
  | "reduced";

export function useHeroMotion<T extends HTMLElement>() {
  const heroRef = useRef<T>(null);
  const [motionState, setMotionState] =
    useState<HeroMotionState>("idle");

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (window.matchMedia("(max-width: 900px)").matches) {
      setMotionState("active");
      return;
    }

    let firstFrame = 0;
    let secondFrame = 0;

    const activateMotion = () => {
      if (reducedMotionQuery.matches) {
        setMotionState("reduced");
        return;
      }

      setMotionState("idle");

      firstFrame = window.requestAnimationFrame(() => {
        secondFrame = window.requestAnimationFrame(() => {
          setMotionState("active");
        });
      });
    };

    const handleMotionPreferenceChange = () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      activateMotion();
    };

    activateMotion();

    reducedMotionQuery.addEventListener(
      "change",
      handleMotionPreferenceChange
    );

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);

      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
    };
  }, []);

  return {
    heroRef,
    motionState,
  };
}
