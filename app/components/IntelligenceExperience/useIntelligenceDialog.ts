"use client";

import {
  useEffect,
  useRef,
} from "react";

type UseIntelligenceDialogOptions = {
  open: boolean;
  onClose: () => void;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function useIntelligenceDialog({
  open,
  onClose,
}: UseIntelligenceDialogOptions) {
  const dialogRef =
    useRef<HTMLDivElement>(null);

  const composerRef =
    useRef<HTMLTextAreaElement>(null);

  const openerRef =
    useRef<HTMLElement | null>(null);

  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) {
      return;
    }

    openerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight =
      body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth -
      document.documentElement.clientWidth;

    body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      body.style.paddingRight =
        `${scrollbarWidth}px`;
    }

    const focusFrame =
      window.requestAnimationFrame(() => {
        composerRef.current?.focus();
      });

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (
        event.key !== "Tab" ||
        !dialogRef.current
      ) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<
          HTMLElement
        >(FOCUSABLE_SELECTOR)
      ).filter(
        (element) =>
          !element.hasAttribute("disabled") &&
          element.getAttribute("aria-hidden") !== "true"
      );

      if (!focusable.length) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (
        event.shiftKey &&
        (active === first ||
          active === dialogRef.current)
      ) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (
        !event.shiftKey &&
        active === last
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.cancelAnimationFrame(focusFrame);

      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      body.style.overflow = previousOverflow;
      body.style.paddingRight =
        previousPaddingRight;

      openerRef.current?.focus();
    };
  }, [open]);

  return {
    dialogRef,
    composerRef,
  };
}
