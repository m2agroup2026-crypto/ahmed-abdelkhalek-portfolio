"use client";

import { useEffect, type RefObject } from "react";

export function usePointerField<T extends HTMLElement>(
  targetRef: RefObject<T | null>,
  enabled = true
) {
  useEffect(() => {
    const target = targetRef.current;

    if (!target || !enabled) {
      return;
    }

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const precisePointerQuery = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    if (
      reducedMotionQuery.matches ||
      !precisePointerQuery.matches
    ) {
      return;
    }

    let animationFrame = 0;
    let pointerX = 0.5;
    let pointerY = 0.5;

    const renderPointerPosition = () => {
      const normalizedX = (pointerX - 0.5) * 2;
      const normalizedY = (pointerY - 0.5) * 2;

      target.style.setProperty(
        "--hero-pointer-x",
        `${pointerX * 100}%`
      );

      target.style.setProperty(
        "--hero-pointer-y",
        `${pointerY * 100}%`
      );

      target.style.setProperty(
        "--hero-shift-x",
        normalizedX.toFixed(4)
      );

      target.style.setProperty(
        "--hero-shift-y",
        normalizedY.toFixed(4)
      );

      target.style.setProperty(
        "--hero-tilt-x",
        `${(-normalizedY * 2.4).toFixed(3)}deg`
      );

      target.style.setProperty(
        "--hero-tilt-y",
        `${(normalizedX * 3.2).toFixed(3)}deg`
      );

      target.style.setProperty(
        "--hero-depth-x",
        `${(normalizedX * 10).toFixed(2)}px`
      );

      target.style.setProperty(
        "--hero-depth-y",
        `${(normalizedY * 8).toFixed(2)}px`
      );

      animationFrame = 0;
    };

    const requestPointerRender = () => {
      if (animationFrame !== 0) {
        return;
      }

      animationFrame = window.requestAnimationFrame(
        renderPointerPosition
      );
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (
        event.pointerType === "touch" ||
        reducedMotionQuery.matches
      ) {
        return;
      }

      const bounds = target.getBoundingClientRect();

      if (bounds.width === 0 || bounds.height === 0) {
        return;
      }

      pointerX = Math.min(
        1,
        Math.max(0, (event.clientX - bounds.left) / bounds.width)
      );

      pointerY = Math.min(
        1,
        Math.max(0, (event.clientY - bounds.top) / bounds.height)
      );

      requestPointerRender();
    };

    const resetPointerPosition = () => {
      pointerX = 0.5;
      pointerY = 0.5;
      requestPointerRender();
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotionQuery.matches) {
        resetPointerPosition();
      }
    };

    target.addEventListener(
      "pointermove",
      handlePointerMove,
      { passive: true }
    );

    target.addEventListener(
      "pointerleave",
      resetPointerPosition
    );

    reducedMotionQuery.addEventListener(
      "change",
      handleMotionPreferenceChange
    );

    return () => {
      window.cancelAnimationFrame(animationFrame);

      target.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      target.removeEventListener(
        "pointerleave",
        resetPointerPosition
      );

      reducedMotionQuery.removeEventListener(
        "change",
        handleMotionPreferenceChange
      );
    };
  }, [enabled, targetRef]);
}
